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
exports.deleteUserSvc = exports.updateUserSvc = exports.createUserSvc = exports.getUserByIdSvc = exports.getAllUsersSvc = void 0;
const tools_1 = require("../../helpers/tools");
const user_repository_1 = require("./user.repository");
const getAllUsersSvc = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_repository_1.getAllUsersRpo)();
});
exports.getAllUsersSvc = getAllUsersSvc;
const getUserByIdSvc = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_repository_1.getUserByIdRpo)(id);
});
exports.getUserByIdSvc = getUserByIdSvc;
const createUserSvc = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, tools_1.generatePassword)(data.email, data.password);
    const tempData = Object.assign(Object.assign({}, data), { password: hashedPassword.password });
    return yield (0, user_repository_1.createUserRpo)(tempData);
});
exports.createUserSvc = createUserSvc;
const updateUserSvc = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_repository_1.updateUserRpo)(id, data);
});
exports.updateUserSvc = updateUserSvc;
const deleteUserSvc = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_repository_1.deleteUserRpo)(id);
});
exports.deleteUserSvc = deleteUserSvc;
//# sourceMappingURL=user.service.js.map