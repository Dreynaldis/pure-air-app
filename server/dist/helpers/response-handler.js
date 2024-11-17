"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseJSON = void 0;
const EXCEPTION_MESSAGE_1 = require("../exceptions/EXCEPTION_MESSAGE");
const logger_1 = __importDefault(require("./logger"));
const serialize_error_1 = require("serialize-error");
const responseJSON = (req, res, responseHandler, isFailed = false) => {
    if (isFailed) {
        let statusCode = 500;
        let level = EXCEPTION_MESSAGE_1.LEVEL.ERROR;
        const shortMessage = responseHandler.obj
            ? responseHandler.obj.message
            : 'UNIDENTIFIED_ERROR';
        if (responseHandler.obj) {
            statusCode = responseHandler.obj.code;
            level = responseHandler.obj.level;
            res.status(responseHandler.obj.code).json({
                status: 'FAILED',
                message: responseHandler.obj.message,
                traceId: req.body.traceId,
                data: responseHandler.systemLog,
            });
        }
        else {
            res.status(500).json({
                status: 'FAILED',
                message: EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.PROCESSING_ERROR.message,
                traceId: req.body.traceId,
                data: responseHandler.systemLog,
            });
        }
        logger_1.default.log(level, shortMessage, {
            traceId: req.body.traceId,
            statusCode: statusCode,
            message: responseHandler.obj
                ? JSON.stringify(responseHandler.systemLog)
                : JSON.stringify((0, serialize_error_1.serializeError)(responseHandler)),
        });
    }
    else {
        res
            .status(200)
            .json({
            status: 'SUCCESS',
            message: 'SUCCESS',
            data: Array.isArray(responseHandler) ? responseHandler : [responseHandler]
        });
        logger_1.default.log(EXCEPTION_MESSAGE_1.LEVEL.INFO, 'SUCCESS', {
            traceId: req.body.traceId,
            statusCode: 200,
            message: responseHandler,
        });
    }
};
exports.responseJSON = responseJSON;
//# sourceMappingURL=response-handler.js.map