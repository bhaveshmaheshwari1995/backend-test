const util = require('./helper');

export let validateUser = (request, h) => {
    return util.validateUser(request.payload, h)
};