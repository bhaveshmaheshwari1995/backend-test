const config = require('./../../config')
const logger = require('./../../logger')

import * as expr from 'expression-eval';
import * as Response from './util/response-helper';


module.exports = {
    
    /**
     * Validate user for the given expression
     *
     * @param String key
     * @param String field
     * 
     * @return {*} h.response
     */
    validateUser: async (payload, h) => {
        try{
            logger.info("Validating user %s for expression %s ", payload.user_id, payload.expr)
            let expression = payload.expr;
            
            if(!validateExpression(expression)){
                logger.error("Invalid expression %s for user %s ", payload.expr, payload.user_id)
                return h.response(Response.invalidResponse).code(400);
            }

            let userDetail = await redisClient.hgetall(`user-info-${payload.user_id}`);

            let finalExpression = prepareExpression(expression, userDetail);
            
            userDetail.depositted_users =  userDetail.has_depositted === 'true'
            userDetail.number_of_deposits =  userDetail.number_of_deposits ? userDetail.number_of_deposits : 0 
            userDetail.wallet_balance =  userDetail.wallet_balance ? userDetail.wallet_balance : 0 

            const ast = expr.parse(finalExpression);
            let value = expr.eval(ast, {
                depositted_users: userDetail.depositted_users, 
                number_of_deposits: userDetail.number_of_deposits, 
                wallet_balance: userDetail.wallet_balance
            });

            if(value == undefined || typeof value != 'boolean') {
                logger.error("invalid Expression %s ", expression)
                return h.response(Response.invalidResponse).code(400);
            } else{
                logger.error("Sending response %s expression %s user %j", value, expression, userDetail)
                return Response.validResponse(value);
            }
        }
        catch (err){
            console.log(err);
        }
    }
}

let validateExpression = (expression) => {
    let tokens = expression.split(" ");
    const validOperators = config.get('validOperators');
    const validOperands = config.get('validOperands');
    const acceptedTokens = validOperators.concat(validOperands);
    tokens = tokens.filter(token => isNaN(token));
    
    for (let token of tokens) {
        if(!acceptedTokens.includes(token)){
            return false;
        }    
    }
    return true;
}

let prepareExpression = (expression) => {
    expression = expression.replace(/AND/g, "&&");
    expression = expression.replace(/OR/g, "||");
    expression = expression.replace(/NOT/g, "!");
    return expression;
}