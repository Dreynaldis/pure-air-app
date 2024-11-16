import { Router } from "express";
import { createAirQuality, getAllAirQuality,filterAirQuality, updateAirQuality, deleteAirQuality } from "./quality.controller";

const airQualityRouter = Router()

airQualityRouter.post('/create', createAirQuality)
airQualityRouter.get('/', getAllAirQuality)
airQualityRouter.get('/:id', filterAirQuality)
airQualityRouter.put('/:id', updateAirQuality)
airQualityRouter.delete('/:id', deleteAirQuality)


export default airQualityRouter