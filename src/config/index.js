const convict = require('convict');

// Define a schema
const config = convict({
    
    port: {
        doc: "The port to bind.",
        format: "port",
        default: 8001,
        env: "PORT",
        arg: "port"
    },
    redisHost: {
        doc: "Redis host to be used",
        format: String,
        default: "localhost:6379",
        env:"REDIS_HOST"
    },
    validOperators: {
        doc: "valid operators for expression",
        format: Object,
        default: ["AND", "OR", "NOT", ">", "<", "=="],
        env: "VALID_OPERATORS"
    },
    validOperands: {
        doc: "valid operators for expression",
        format: Object,
        default: ["depositted_users", "number_of_deposits", "wallet_balance"],
        env: "VALID_OPERANDS"
    },
    logLevel: {
        doc: "log level for logging",
        format: String,
        default: "debug",
        env: "LOG_LEVEL"
    },
    logPath: {
        doc: "folder to be used for logging",
        format: String,
        default: "/var/log/rules-engine-log.log",
        env: "LOG_PATH"
    },
    logMaxLife: {
        doc: "folder to be used for logging",
        format: Number,
        default: 5,
        env: "LOG_MAX_LIFE"
    },
});

module.exports = config;