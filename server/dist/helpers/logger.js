"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const fileTransport = new winston_daily_rotate_file_1.default({
    filename: './logs/' + process.env.APP_NAME + '-%DATE%.log',
    datePattern: 'DD-MM-YYYY',
    zippedArchive: true, // OPTIONAL. set the log file to gzip archived
    maxSize: '15m', // OPTIONAL. max size of the file (k, m, g for the suffix). (default: null)
    maxFiles: '14d', // REQUIRED. max number of logs to keep. This can be a number of files or number of days. If using days, add 'd' as the suffix. (default: null)
});
const logger = winston_1.default.createLogger({
    exitOnError: false,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss.SSS+07:00' }), winston_1.default.format.json()),
    defaultMeta: {},
    transports: [new winston_1.default.transports.Console({}), fileTransport],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map