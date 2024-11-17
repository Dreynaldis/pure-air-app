"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceMiddleware = serviceMiddleware;
const EXCEPTION_MESSAGE_1 = require("../exceptions/EXCEPTION_MESSAGE");
const logger_1 = __importDefault(require("../helpers/logger"));
const uuid_1 = require("uuid");
function serviceMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const traceId = (0, uuid_1.v4)();
        if (!req.body.traceId)
            req.body.traceId = traceId;
        const message = JSON.stringify({
            headers: req.headers,
            body: req.body,
        });
        logger_1.default.log(EXCEPTION_MESSAGE_1.LEVEL.INFO, 'REQUEST_DATA', {
            traceId: traceId,
            statusCode: null,
            message: message,
        });
        checkAuthentication(req, res, next);
    });
}
function checkAuthentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // try {
        //   const apiKey = req.headers['x-api-key'];
        //   if (apiKey !== undefined && apiKey !== '') {
        //     const decodedKey = base64Decode(apiKey.toString());
        //     const decodedKeyObject = decodedKey.split(':');
        //     const verifyKey: PartnerAttributes = await getPartner({
        //       clientId: decodedKeyObject[0],
        //       clientSecret: decodedKeyObject[1],
        //     });
        //     if (!verifyKey) {
        //       throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHORIZED, {
        //         message: 'Invalid api key',
        //       });
        //     }
        //     // req.body.partnerId = verifyKey.id;
        //     next();
        //   } else {
        //     throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHORIZED, {
        //       message: 'Invalid api key',
        //     });
        //   }
        // } catch (e) {
        //   if (e instanceof CustomException) {
        //     if (e.obj.code >= 500) {
        //       logger.log(LEVEL.ERROR, '[ERROR]', {
        //         traceId: req.body.traceId,
        //         statusCode: null,
        //         message: e,
        //       });
        //     }
        //   } else {
        //     logger.log(LEVEL.ERROR, '[ERROR]', {
        //       traceId: req.body.traceId,
        //       statusCode: null,
        //       message: e,
        //     });
        //   }
        //   responseJSON(req, res, e, true);
        // }
    });
}
//# sourceMappingURL=middleware.js.map