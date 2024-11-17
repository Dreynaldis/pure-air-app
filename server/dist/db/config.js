"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require('dotenv').config();
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASS,
//   {
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     pool: {max: 5},
//     logging: `${process.env.ENV}` === 'production' ? false : console.log,
//     dialect: 'mysql',
//     dialectOptions: {
//       timezone: '+07:00',
//       connectTimeout: 10000,
//     },
//   },
// );
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    pool: { max: 5 },
    logging: `${process.env.ENV}` === 'production' ? false : console.log,
    dialect: 'postgres',
    dialectOptions: { application_name: process.env.APP_NAME, ssl: {
            require: true,
            rejectUnauthorized: false
        } },
    timezone: '+07:00',
});
exports.default = sequelize;
//# sourceMappingURL=config.js.map