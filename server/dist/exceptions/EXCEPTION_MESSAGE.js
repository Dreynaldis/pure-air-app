"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXCEPTION_MESSAGE = exports.LEVEL = void 0;
var LEVEL;
(function (LEVEL) {
    LEVEL["INFO"] = "info";
    LEVEL["DEBUG"] = "debug";
    LEVEL["WARN"] = "warn";
    LEVEL["ERROR"] = "error";
})(LEVEL || (exports.LEVEL = LEVEL = {}));
exports.EXCEPTION_MESSAGE = {
    MISSING_REQUIRED_DATA: {
        message: 'MISSING_REQUIRED_DATA',
        code: 400,
        level: LEVEL.WARN,
    },
    DATA_NOT_FOUND: { message: 'DATA_NOT_FOUND', code: 400, level: LEVEL.WARN },
    INVALID_CREDENTIAL: {
        message: 'INVALID_CREDENTIAL',
        code: 400,
        level: LEVEL.ERROR,
    },
    DUPLICATE_DATA: { message: 'DUPLICATE_DATA', code: 400, level: LEVEL.WARN },
    UNPROCESSABLE_ENTITY: {
        message: 'UNPROCESSABLE_ENTITY',
        code: 400,
        level: LEVEL.WARN,
    },
    NOT_AUTHORIZED: { message: 'NOT_AUTHORIZED', code: 401, level: LEVEL.WARN },
    SESSION_EXPIRED: { message: 'SESSION_EXPIRED', code: 401, level: LEVEL.WARN },
    PROCESSING_ERROR: {
        message: 'PROCESSING_ERROR',
        code: 500,
        level: LEVEL.ERROR,
    },
    USER_NOT_FOUND: { message: 'USER_NOT_FOUND', code: 400, level: LEVEL.WARN },
    EMAIL_ALREADY_EXISTS: {
        message: 'EMAIL_ALREADY_EXISTS',
        code: 400,
        level: LEVEL.WARN,
    },
    INVALID_INPUT: { message: 'INVALID_USER_INPUT', code: 400, level: LEVEL.WARN }
};
//# sourceMappingURL=EXCEPTION_MESSAGE.js.map