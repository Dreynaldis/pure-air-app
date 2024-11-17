"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRes = void 0;
const userRes = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
    };
};
exports.userRes = userRes;
//# sourceMappingURL=user.dto.js.map