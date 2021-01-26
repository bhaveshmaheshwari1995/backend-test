const logger = require('./../../logger')
const ResponseHelper = require('./util/response-helper');

module.exports = {
    
    getUserDetails: async (userId) => {
        try{
            logger.info("fetching user details for userId %s", userId);
            let userDetail = await redisClient.hgetall(`user-info-${userId}`);
            logger.info("user details for user %s", userDetail);
            return userDetail;
        }
        catch (err){
            console.log(err);
        }
    },
    
    updateUserDetails: async (userId, user) => {
        try{
            let keys = Object.keys(user);
            logger.info("updating user details  userId %s value %j", userId, user);
            for(let key of keys){
                await redisClient.hset(`user-info-${userId}`, key, user[key]);
            }
            return ResponseHelper.editResponse;
        }
        catch (err){
            console.log(err);
        }
    },
    
    deleteUser: async (userId) => {
        logger.info("deleting user details  userId %s", userId);
        await redisClient.delete(`user-info-${userId}`);
        return ResponseHelper.deleteResponse;
    }
}