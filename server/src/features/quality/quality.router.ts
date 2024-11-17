import { Router } from "express";
import { createAirQuality, getAllAirQuality,filterAirQuality, updateAirQuality, deleteAirQuality } from "./quality.controller";
import { authenticateToken } from "../../middleware/jwt";

const airQualityRouter = Router()

airQualityRouter.post('/create', authenticateToken, createAirQuality)
airQualityRouter.get('/', getAllAirQuality)
airQualityRouter.get('/:id', filterAirQuality)
airQualityRouter.put('/:id',authenticateToken, updateAirQuality)
airQualityRouter.delete('/:id',authenticateToken, deleteAirQuality)


export default airQualityRouter