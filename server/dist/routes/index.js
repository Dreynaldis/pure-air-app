"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = __importDefault(require("../features/users/user.router"));
const jwt_1 = require("../middleware/jwt");
const auth_router_1 = __importDefault(require("../features/auth/auth.router"));
const quality_router_1 = __importDefault(require("../features/quality/quality.router"));
const router = (0, express_1.Router)();
router.use('/users', jwt_1.authenticateToken, user_router_1.default);
router.use('/auth', auth_router_1.default);
router.use('/quality', quality_router_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map