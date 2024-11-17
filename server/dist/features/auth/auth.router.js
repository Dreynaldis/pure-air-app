"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("../../middleware/jwt");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', auth_controller_1.register);
authRouter.post('/login', auth_controller_1.login);
authRouter.get('/profile', auth_controller_1.profile);
authRouter.get('/refresh-token', auth_controller_1.refreshToken);
authRouter.get('/check', jwt_1.authenticateToken, auth_controller_1.check);
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map