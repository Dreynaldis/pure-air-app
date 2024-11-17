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
exports.registerUserRpo = exports.getAllUsersRpo = void 0;
const Users_1 = __importDefault(require("../../db/models/Users"));
const getAllUsersRpo = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users_1.default.findAll();
    return users.map((user) => user.toJSON());
});
exports.getAllUsersRpo = getAllUsersRpo;
const registerUserRpo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // hashing password
});
exports.registerUserRpo = registerUserRpo;
//# sourceMappingURL=auth.repository.js.map