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
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./db/config"));
require('dotenv').config();
const { neon } = require('@neondatabase/serverless');
const app = (0, express_1.default)().disable('x-powered-by');
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)({ threshold: 0 }));
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '100mb' }));
app.use('/api/v1', routes_1.default);
app.get('/api', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = yield sql `SELECT version()`;
    const { version } = response[0];
    res.json({ version });
}));
// Check database connection
try {
    config_1.default.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`${process.env.APP_NAME} running on port ${port}`);
exports.default = (req, res) => {
    app(req, res);
};
//# sourceMappingURL=index.js.map