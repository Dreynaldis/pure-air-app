import Air_Quality from "../../db/models/Air_Quality";
import { Op } from "sequelize";
import { getTingkat } from "./quality.service";

export const createQualityRpo = async (data: {
    daerah: string,
    value: number,
    tingkat:string
}) => {
    const newQuality = await Air_Quality.create(data)
    return newQuality.toJSON()
}

export const checkExistingDaerahRpo = async (daerah: string) => {
    const existingEntry = await Air_Quality.findOne({
        where: {
            daerah: {
        [Op.iLike]:daerah
    }}})
    return existingEntry ? existingEntry.toJSON() : null
}

export const getAllAirQualityRpo = async () => {
    return await Air_Quality.findAll()
}

export const filterAirQualityRpo = async (id: number) => {
    const airQualityData = await Air_Quality.findOne({where : {id}})
    return airQualityData ? airQualityData.toJSON() : null
}

export const updateAirQualityDataRpo = async(id : number, newData : {daerah: string, value: number}) => {
    const airQualityData = await Air_Quality.findOne({ where: { id } })
    if (!airQualityData) {
        throw new Error('Data not found')
    }

    const newTingkat = getTingkat(newData.value)

    const updatedData = {
        daerah: newData.daerah,
        value: newData.value,
        tingkat : newTingkat
     }

    await airQualityData.update(updatedData)
    return airQualityData?.toJSON()
}

export const deleteAirQualityDataRpo = async (id: number) => {
    const airQualityData = await Air_Quality.findOne({where: {id}})
    if (!airQualityData) {
        throw new Error('Data not found')
    }

    await airQualityData.destroy()
    return airQualityData.toJSON()
}