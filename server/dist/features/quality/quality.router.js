"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quality_controller_1 = require("./quality.controller");
const jwt_1 = require("../../middleware/jwt");
const airQualityRouter = (0, express_1.Router)();
airQualityRouter.post('/create', jwt_1.authenticateToken, quality_controller_1.createAirQuality);
airQualityRouter.get('/', quality_controller_1.getAllAirQuality);
airQualityRouter.get('/:id', quality_controller_1.filterAirQuality);
airQualityRouter.put('/:id', jwt_1.authenticateToken, quality_controller_1.updateAirQuality);
airQualityRouter.delete('/:id', jwt_1.authenticateToken, quality_controller_1.deleteAirQuality);
exports.default = airQualityRouter;
//# sourceMappingURL=quality.router.js.map