var Redis = require('ioredis');

class RedisClient {

    constructor (options, logger){
        
        const hostPortTokens = options.hostPortString.split(':');
        this.connection = new Redis({
            host: hostPortTokens[0],
            port: hostPortTokens[1]
        });
        this.connection.on("connect", () => logger.info("Redis Connected"))
    }
    
    /**
     * delete
     * delete the key from redis
     *
     * @param String key
     * @return Promise
     */
    delete (key) {
        var that = this ;
        return new Promise(function (resolve, reject) {
            that.connection.del(key, function (err, numRemoved) {
                if (!err) {
                    resolve(numRemoved);
                } else {
                    reject(err);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    /**
     * Gets the value for the given hash key
     *
     * @param String key
     * @param String field
     * 
     * @return Promise
     */
    hget (key, field) {
        var that = this ;
        return new Promise(function (resolve, reject) {
            that.connection.hget(key, field).then(function (response) {
                resolve(parseResponse(response));
            }).catch(function (error) {
                reject(error);
            });
        });
    }
    
    /**
     * Sets the given value for the given hash key
     *
     * @param String key
     * @param String field
     * @param mixed value
     * @param Number ttl
     * 
     * @return Promise
     */
    hset (key, field, value, ttl) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.connection.hset(key, field, buildCacheValue(value)).then(function (response) {
                if (ttl) {
                    this.connection.expire(key, ttl);
                }
                resolve(response);
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    /**
     * delete field for the given hash key
     *
     * @param String key
     * @param String field
     * 
     * @return Promise
     */
    hdel (key, field) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.connection.hdel(key, field, function (err, numRemoved) {
                if (!err) {
                    resolve(numRemoved);
                } else {
                    reject(err);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    hgetall (key) {
        var that = this;
        return new Promise(function (resolve, reject) {
            that.connection.hgetall(key ,function (err, response) {
                if(err){
                    reject(err);
                } else {
                    resolve(parseResponse(response));
                }
            })
        });
    }
}

/**
 * Parses the response returned by the cache
 * @param {*} value
 * @return {*}
 */
function parseResponse(response) {
    let parsedResposne = null;
    if (response instanceof Array) {
        parsedResposne = [];
        response.forEach(function (element) {
            parsedResposne.push(parseResponseElement(element));
        });
        return parsedResposne;
    } else {
        return parseResponseElement(response);
    }
}

/**
 * Parses single element returned by the cache
 * @param {*} value
 * @return {*}
 */
function parseResponseElement(value) {
    try {
        if (value) {
            value = JSON.parse(value);
        }
    } catch (error) {

    }

    return value;
}

/**
 * Builds the cache value
 *
 * @param {*} value
 * @return {*}
 */
function buildCacheValue(value)
{
    if (value) {
        value = JSON.stringify(value);
    }
    return value;
}

module.exports = RedisClient