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
exports.getUserByEmailRpo = exports.deleteUserRpo = exports.updateUserRpo = exports.createUserRpo = exports.getUserByIdRpo = exports.getAllUsersRpo = void 0;
const Users_1 = __importDefault(require("../../db/models/Users"));
const getAllUsersRpo = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users_1.default.findAll();
    return users.map((user) => user.toJSON());
});
exports.getAllUsersRpo = getAllUsersRpo;
const getUserByIdRpo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.default.findOne({
        where: { id },
    });
    if (!user) {
        throw new Error('User not found');
    }
    return user === null || user === void 0 ? void 0 : user.toJSON();
});
exports.getUserByIdRpo = getUserByIdRpo;
const createUserRpo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.default.create(data);
    return user.toJSON();
});
exports.createUserRpo = createUserRpo;
const updateUserRpo = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.default.findOne({ where: { id } });
    if (!user) {
        throw new Error('User not found');
    }
    yield user.update(data);
    return user.toJSON();
});
exports.updateUserRpo = updateUserRpo;
const deleteUserRpo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.default.findOne({ where: { id } });
    if (!user) {
        throw new Error('User not found');
    }
    yield user.destroy();
    return user.toJSON();
});
exports.deleteUserRpo = deleteUserRpo;
const getUserByEmailRpo = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.default.findOne({ where: { email } });
    return user === null || user === void 0 ? void 0 : user.toJSON();
});
exports.getUserByEmailRpo = getUserByEmailRpo;
//# sourceMappingURL=user.repository.js.map