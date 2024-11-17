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
exports.deleteAirQualityDataSvc = exports.updateAirQualityDataSvc = exports.filterAirQualitySvc = exports.getAllAirQualitySvc = exports.checkExistingDaerahSvc = exports.createQualitySvc = exports.getTingkat = void 0;
const quality_repository_1 = require("./quality.repository");
const getTingkat = (value) => {
    if (value <= 3)
        return 'Rendah';
    if (value <= 6)
        return 'Sedang';
    return 'Tinggi';
};
exports.getTingkat = getTingkat;
const createQualitySvc = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, quality_repository_1.createQualityRpo)(data);
});
exports.createQualitySvc = createQualitySvc;
const checkExistingDaerahSvc = (daerah) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, quality_repository_1.checkExistingDaerahRpo)(daerah);
});
exports.checkExistingDaerahSvc = checkExistingDaerahSvc;
const getAllAirQualitySvc = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, quality_repository_1.getAllAirQualityRpo)();
});
exports.getAllAirQualitySvc = getAllAirQualitySvc;
const filterAirQualitySvc = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, quality_repository_1.filterAirQualityRpo)(id);
});
exports.filterAirQualitySvc = filterAirQualitySvc;
const updateAirQualityDataSvc = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, quality_repository_1.updateAirQualityDataRpo)(id, data);
});
exports.updateAirQualityDataSvc = updateAirQualityDataSvc;
const deleteAirQualityDataSvc = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, quality_repository_1.deleteAirQualityDataRpo)(id);
});
exports.deleteAirQualityDataSvc = deleteAirQualityDataSvc;
//# sourceMappingURL=quality.service.js.map