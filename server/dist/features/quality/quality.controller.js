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
exports.deleteAirQuality = exports.updateAirQuality = exports.filterAirQuality = exports.getAllAirQuality = exports.createAirQuality = void 0;
const quality_validation_1 = require("./quality.validation");
const quality_service_1 = require("./quality.service");
const response_handler_1 = require("../../helpers/response-handler");
const CustomException_1 = require("../../exceptions/CustomException");
const EXCEPTION_MESSAGE_1 = require("../../exceptions/EXCEPTION_MESSAGE");
const logger_1 = __importDefault(require("../../helpers/logger"));
const quality_dto_1 = require("./quality.dto");
const createAirQuality = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = quality_validation_1.createQualitySchema.validate(req.body, { allowUnknown: true });
    if (validation.error) {
        throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA);
    }
    try {
        const { daerah, value } = validation.value;
        const existingEntry = yield (0, quality_service_1.checkExistingDaerahSvc)(daerah);
        if (existingEntry) {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.DUPLICATE_DATA);
        }
        const tingkat = (0, quality_service_1.getTingkat)(value);
        const newData = yield (0, quality_service_1.createQualitySvc)({ daerah, value, tingkat });
        return (0, response_handler_1.responseJSON)(req, res, newData);
    }
    catch (error) {
        logger_1.default.error(`Error Creating daerah : ${error.message}`, {
            error: error,
            requestBody: req.body,
        });
        console.log('halo');
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.createAirQuality = createAirQuality;
const getAllAirQuality = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, quality_service_1.getAllAirQualitySvc)();
        return (0, response_handler_1.responseJSON)(req, res, data);
    }
    catch (error) {
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.getAllAirQuality = getAllAirQuality;
const filterAirQuality = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) {
        throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.INVALID_INPUT);
    }
    try {
        const airQualityData = yield (0, quality_service_1.filterAirQualitySvc)(Number(id));
        if (!airQualityData) {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.DATA_NOT_FOUND);
        }
        return (0, response_handler_1.responseJSON)(req, res, airQualityData);
    }
    catch (error) {
        logger_1.default.error("Error filtering Air Quality by ID", error);
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.filterAirQuality = filterAirQuality;
const updateAirQuality = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validation = quality_validation_1.updateQualitySchema.validate(req.body, {
            allowUnknown: true
        });
        if (!validation.error) {
            const airQuality = yield (0, quality_service_1.updateAirQualityDataSvc)(req.params.id, req.body);
            return (0, response_handler_1.responseJSON)(req, res, { data: (0, quality_dto_1.qualityRes)(airQuality) });
        }
        else {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA, validation.error);
        }
    }
    catch (error) {
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.updateAirQuality = updateAirQuality;
const deleteAirQuality = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const airQuality = yield (0, quality_service_1.deleteAirQualityDataSvc)(req.params.id);
        if (!airQuality) {
            throw new CustomException_1.CustomException(EXCEPTION_MESSAGE_1.EXCEPTION_MESSAGE.DATA_NOT_FOUND);
        }
        return (0, response_handler_1.responseJSON)(req, res, { data: (0, quality_dto_1.qualityRes)(airQuality) });
    }
    catch (error) {
        return (0, response_handler_1.responseJSON)(req, res, error, true);
    }
});
exports.deleteAirQuality = deleteAirQuality;
//# sourceMappingURL=quality.controller.js.map