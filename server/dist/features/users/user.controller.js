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
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.store = exports.show = exports.index = void 0;
const user_service_1 = require("./user.service");
const response_handler_1 = require("../../helpers/response-handler");
const CustomException_1 = require("../../exceptions/CustomException");
const EXCEPTION_MESSAGE_1 = require("../../exceptions/EXCEPTION_MESSAGE");
const user_validation_1 = require("./user.validation");
const user_dto_1 = require("./user.dto");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.getAllUsersSvc)();
        return (0, response_handler_1.responseJSON)(req, res, { data: users.map((user) => (0, user_dto_1.userRes)(user)) });
    }
    catch (err) {
        return (0, response_handler_1.responseJSON)(req, res, { message: err.message }, true);
    }
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.getUserByIdSvc)(req.params.id);
        if (user) {
            return (0, response_handler_1.responseJSON)(req, res, { data: (0, user_dto_1.userRes)(user) });
        }
        else {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE);
        }
    }
    catch (error) {
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.show = show;
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = user_validation_1.userUpdateSchema.validate(req.body, {
            allowUnknown: true,
        });
        if (!validation.error) {
            const user = yield (0, user_service_1.createUserSvc)(req.body);
            return (0, response_handler_1.responseJSON)(req, res, { data: (0, user_dto_1.userRes)(user) });
        }
        else {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA, validation.error);
        }
    }
    catch (error) {
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.store = store;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = user_validation_1.userUpdateSchema.validate(req.body, {
            allowUnknown: true,
        });
        if (!validation.error) {
            const user = yield (0, user_service_1.updateUserSvc)(req.params.id, req.body);
            return (0, response_handler_1.responseJSON)(req, res, { data: (0, user_dto_1.userRes)(user) });
        }
        else {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA, validation.error);
        }
    }
    catch (error) {
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.deleteUserSvc)(req.params.id);
        if (!user) {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.USER_NOT_FOUND);
        }
        return (0, response_handler_1.responseJSON)(req, res, { data: (0, user_dto_1.userRes)(user) });
    }
    catch (error) {
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.destroy = destroy;
//# sourceMappingURL=user.controller.js.map