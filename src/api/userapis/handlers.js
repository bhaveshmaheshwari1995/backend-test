const util = require('./helper');

export let getUser = (request, h) => {
    return util.getUserDetails(request.params.user_id)
};

export let deleteUser = (request, h) => {
    return util.deleteUser(request.params.user_id)
};

export let editUser = (request, h) => {
    return util.updateUserDetails(request.params.user_id, request.payload)
};