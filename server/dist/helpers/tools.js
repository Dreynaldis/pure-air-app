"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.addZeroes = exports.thousandSeparator = exports.hashPassword = exports.base64Decode = exports.base64Encode = exports.sha256 = exports.generatePassword = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const generatePassword = (email, password) => {
    const salt = email;
    const crypt = crypto_js_1.default.PBKDF2(password, salt, {
        keySize: 128 / 32,
        iterations: 1000,
    }).toString();
    return { password: crypt, salt: salt };
};
exports.generatePassword = generatePassword;
const sha256 = (value) => {
    return crypto_js_1.default.SHA256(value).toString();
};
exports.sha256 = sha256;
const base64Encode = (value) => {
    return Buffer.from(value).toString('base64');
};
exports.base64Encode = base64Encode;
const base64Decode = (value) => {
    return Buffer.from(value, 'base64').toString();
};
exports.base64Decode = base64Decode;
const hashPassword = (password, salt) => {
    return crypto_js_1.default.PBKDF2(password, salt, { keySize: 256 / 32 }).toString();
};
exports.hashPassword = hashPassword;
const thousandSeparator = (x, isCurrency = true) => {
    try {
        let dec = x.split('.');
        let len = dec && dec.length > 2 ? dec.length : 2;
        let num = Number(x).toFixed(len);
        let parts = num.split(',');
        if (isCurrency)
            parts[0] = 'Rp ' + parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        else
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return parts.join(',');
    }
    catch (e) {
        return null;
    }
};
exports.thousandSeparator = thousandSeparator;
const addZeroes = (num) => {
    const dec = num.split('.')[1];
    const len = dec && dec.length > 2 ? dec.length : 2;
    return Number(num).toFixed(len);
};
exports.addZeroes = addZeroes;
const verifyPassword = (inputPassword, storedHash, email) => {
    const salt = email;
    const inputHash = crypto_js_1.default.PBKDF2(inputPassword, salt, {
        keySize: 128 / 32,
        iterations: 1000,
    }).toString();
    return inputHash === storedHash;
};
exports.verifyPassword = verifyPassword;
//# sourceMappingURL=tools.js.map