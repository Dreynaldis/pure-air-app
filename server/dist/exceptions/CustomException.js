"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
const EXCEPTION_MESSAGE_1 = require("./EXCEPTION_MESSAGE");
class CustomException {
    constructor(obj = EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.PROCESSING_ERROR, systemLog) {
        this.obj = obj;
        this.systemLog = systemLog;
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=CustomException.js.map