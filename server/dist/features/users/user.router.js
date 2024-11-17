"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const userRouter = (0, express_1.Router)();
userRouter.get('/', user_controller_1.index);
userRouter.get('/:id', user_controller_1.show);
userRouter.post('/', user_controller_1.store);
userRouter.put('/:id', user_controller_1.update);
userRouter.delete('/:id', user_controller_1.destroy);
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map