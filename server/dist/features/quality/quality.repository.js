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
exports.deleteAirQualityDataRpo = exports.updateAirQualityDataRpo = exports.filterAirQualityRpo = exports.getAllAirQualityRpo = exports.checkExistingDaerahRpo = exports.createQualityRpo = void 0;
const Air_Quality_1 = __importDefault(require("../../db/models/Air_Quality"));
const sequelize_1 = require("sequelize");
const quality_service_1 = require("./quality.service");
const createQualityRpo = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newQuality = yield Air_Quality_1.default.create(data);
    return newQuality.toJSON();
});
exports.createQualityRpo = createQualityRpo;
const checkExistingDaerahRpo = (daerah) => __awaiter(void 0, void 0, void 0, function* () {
    const existingEntry = yield Air_Quality_1.default.findOne({
        where: {
            daerah: {
                [sequelize_1.Op.iLike]: daerah
            }
        }
    });
    return existingEntry ? existingEntry.toJSON() : null;
});
exports.checkExistingDaerahRpo = checkExistingDaerahRpo;
const getAllAirQualityRpo = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Air_Quality_1.default.findAll();
});
exports.getAllAirQualityRpo = getAllAirQualityRpo;
const filterAirQualityRpo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const airQualityData = yield Air_Quality_1.default.findOne({ where: { id } });
    return airQualityData ? airQualityData.toJSON() : null;
});
exports.filterAirQualityRpo = filterAirQualityRpo;
const updateAirQualityDataRpo = (id, newData) => __awaiter(void 0, void 0, void 0, function* () {
    const airQualityData = yield Air_Quality_1.default.findOne({ where: { id } });
    if (!airQualityData) {
        throw new Error('Data not found');
    }
    const newTingkat = (0, quality_service_1.getTingkat)(newData.value);
    const updatedData = {
        daerah: newData.daerah,
        value: newData.value,
        tingkat: newTingkat
    };
    yield airQualityData.update(updatedData);
    return airQualityData === null || airQualityData === void 0 ? void 0 : airQualityData.toJSON();
});
exports.updateAirQualityDataRpo = updateAirQualityDataRpo;
const deleteAirQualityDataRpo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const airQualityData = yield Air_Quality_1.default.findOne({ where: { id } });
    if (!airQualityData) {
        throw new Error('Data not found');
    }
    yield airQualityData.destroy();
    return airQualityData.toJSON();
});
exports.deleteAirQualityDataRpo = deleteAirQualityDataRpo;
//# sourceMappingURL=quality.repository.js.map