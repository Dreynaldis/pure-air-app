"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.verifyToken = exports.token = exports.getSecret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tools_1 = require("../helpers/tools");
const getSecret = () => {
    return (0, tools_1.base64Decode)(process.env.JWT_SECRET);
};
exports.getSecret = getSecret;
const token = (token) => {
    const encodedToken = jsonwebtoken_1.default.sign({
        data: {
            accessToken: token,
        },
    }, (0, exports.getSecret)(), { expiresIn: '1h' });
    return encodedToken;
};
exports.token = token;
const verifyToken = (token) => {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, (0, exports.getSecret)());
        if (Date.now() >= decodedToken.exp * 1000) {
            return 'expired';
        }
        return decodedToken.data;
    }
    catch (e) {
        return 'error';
    }
};
exports.verifyToken = verifyToken;
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    // console.log('THIS IS AUTH HEADER :', authHeader);
    // const token = authHeader && authHeader.split(' ')[1]; // Mengambil token dari header Authorization
    if (!token) {
        return res
            .status(401)
            .json({ status: 'FAILED', message: 'Token is required' }); // Jika token tidak ada
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log('THIS IS TOKEN IN VERIFY', token);
        if (err) {
            return res.status(403).json({ status: 'FAILED', message: 'Invalid token' }); // Jika token tidak valid
        }
        req.user = user; // Menyimpan data user ke dalam req
        next(); // Melanjutkan ke middleware atau route selanjutnya
    });
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=jwt.js.map