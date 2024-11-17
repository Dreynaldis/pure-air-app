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
exports.check = exports.refreshToken = exports.profile = exports.login = exports.register = void 0;
const response_handler_1 = require("../../helpers/response-handler");
const CustomException_1 = require("../../exceptions/CustomException");
const EXCEPTION_MESSAGE_1 = require("../../exceptions/EXCEPTION_MESSAGE");
const auth_validation_1 = require("./auth.validation");
const user_service_1 = require("../users/user.service");
const user_repository_1 = require("../users/user.repository");
const tools_1 = require("../../helpers/tools");
const user_dto_1 = require("../users/user.dto");
const { JWT_SECRET, JWT_EXPIRES_IN, REFRESH_JWT_SECRET, REFRESH_JWT_EXPIRES_IN } = process.env;
const jwt = require('jsonwebtoken');
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = auth_validation_1.registerSchema.validate(req.body, {
            allowUnknown: true,
        });
        if (validation.error) {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA, validation.error);
        }
        if (yield (0, user_repository_1.getUserByEmailRpo)(validation.value.email)) {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.EMAIL_ALREADY_EXISTS);
        }
        const user = yield (0, user_service_1.createUserSvc)(req.body);
        return (0, response_handler_1.responseJSON)(req, res, { data: (0, user_dto_1.userRes)(user) });
    }
    catch (error) {
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = auth_validation_1.loginSchema.validate(req.body, {
        allowUnknown: true,
    });
    if (validation.error) {
        throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA, validation.error);
    }
    try {
        const user = yield (0, user_repository_1.getUserByEmailRpo)(validation.value.email);
        if (!user) {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.USER_NOT_FOUND);
        }
        const isPasswordValid = (0, tools_1.verifyPassword)(validation.value.password, user.password, validation.value.email);
        if (!isPasswordValid) {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.NOT_AUTHORIZED);
        }
        const name = user.name;
        const token = jwt.sign({
            userId: user.id,
            email: user.email,
        }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        const refreshToken = jwt.sign({
            userId: user.id,
            email: user.email,
        }, REFRESH_JWT_SECRET, { expiresIn: REFRESH_JWT_EXPIRES_IN });
        return (0, response_handler_1.responseJSON)(req, res, { token, refreshToken, name });
    }
    catch (error) {
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.login = login;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = yield (0, user_repository_1.getUserByEmailRpo)(decoded.email);
        return (0, response_handler_1.responseJSON)(req, res, { data: (0, user_dto_1.userRes)(user) });
    }
    catch (error) {
        return res.status(401).json({ status: 'FAILED', message: 'Unauthorized' });
    }
});
exports.profile = profile;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.body.refreshToken;
        const decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET);
        const token = jwt.sign({
            userId: decoded.userId,
            email: decoded.email,
        }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return (0, response_handler_1.responseJSON)(req, res, { token });
    }
    catch (error) {
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.refreshToken = refreshToken;
const check = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('inside the check function');
        return (0, response_handler_1.responseJSON)(req, res, null);
    }
    catch (error) {
        console.error('Error in checking', error);
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.check = check;
//# sourceMappingURL=auth.controller.js.map