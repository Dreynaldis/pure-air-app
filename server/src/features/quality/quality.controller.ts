import { Request, Response } from "express";
import { createQualitySchema, updateQualitySchema } from "./quality.validation";
import { checkExistingDaerahSvc, createQualitySvc, deleteAirQualityDataSvc, filterAirQualitySvc, getAllAirQualitySvc, getTingkat, updateAirQualityDataSvc } from "./quality.service";
import { responseJSON } from "../../helpers/response-handler";
import { CustomException } from "../../exceptions/CustomException";
import { EXCEPTION_MESSAGE } from "../../exceptions/EXCEPTION_MESSAGE";
import logger from "../../helpers/logger";
import { qualityRes } from "./quality.dto";

export const createAirQuality = async (req: Request, res: Response) => {
    const validation = createQualitySchema.validate(req.body, { allowUnknown: true })
    
    if (validation.error) {
        throw new CustomException(EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA)
    }

    try {
        const { daerah, value } = validation.value
        
        const existingEntry = await checkExistingDaerahSvc(daerah)
        if (existingEntry) {
            throw new CustomException(EXCEPTION_MESSAGE.DUPLICATE_DATA)
        }

        const tingkat = getTingkat(value)
        const newData = await createQualitySvc({daerah, value, tingkat})
        return responseJSON(req, res, newData)

    } catch (error) {
        logger.error(`Error Creating daerah : ${error.message}`, {
            error: error,
            requestBody: req.body,
        })
        console.log('halo');
        
        return responseJSON(req, res, error, true)
    }
}

export const getAllAirQuality = async (req: Request, res: Response) => {
    try {
        const data = await getAllAirQualitySvc()
        return responseJSON(req, res, data)
    } catch (error) {
        return responseJSON(req, res, error, true)
    }
}

export const filterAirQuality = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id || isNaN(Number(id))) {
        throw new CustomException(EXCEPTION_MESSAGE.INVALID_INPUT)
    }

    try {
        const airQualityData = await filterAirQualitySvc(Number(id))
        if (!airQualityData) {
            throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND)
        }
        return responseJSON(req,res, airQualityData)

    } catch (error) {
        logger.error("Error filtering Air Quality by ID", error)
        return responseJSON(req, res, error, true)
    }
}

export const updateAirQuality = async (req: Request, res: Response) => {
    try {
        const validation = updateQualitySchema.validate(req.body, {
            allowUnknown: true
        })
        if (!validation.error) {
            const airQuality = await updateAirQualityDataSvc(req.params.id, req.body)
            return responseJSON(req, res, {data: qualityRes(airQuality)})
        } else {
            throw new CustomException(
                EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA, validation.error
            )
        }
    } catch (error) {
        return responseJSON(req, res, error, true)
    }
}

export const deleteAirQuality = async (req: Request, res: Response) => {
    try {
        const airQuality = await deleteAirQualityDataSvc(req.params.id)

        if (!airQuality) {
            throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND)
        }
        return responseJSON(req, res, {data: qualityRes(airQuality)})
    } catch (error) {
        return responseJSON(req, res, error, true)
    }
}