import { createQualityRpo, checkExistingDaerahRpo, getAllAirQualityRpo, filterAirQualityRpo, updateAirQualityDataRpo, deleteAirQualityDataRpo } from "./quality.repository"

export const getTingkat = (value: number) => {
    if (value <= 3) return 'Rendah'
    if (value <= 6) return 'Sedang'
    return 'Tinggi'
}

export const createQualitySvc = async (data: {
    daerah: string,
    value: number,
    tingkat: string
}) => {
    return await createQualityRpo(data)
}

export const checkExistingDaerahSvc = async (daerah:string) => {
    return await checkExistingDaerahRpo(daerah)
}

export const getAllAirQualitySvc = async () => {
    return await getAllAirQualityRpo()
}

export const filterAirQualitySvc = async (id: number) => {
    return await filterAirQualityRpo(id)
}

export const updateAirQualityDataSvc = async (id, data) => {
    return await updateAirQualityDataRpo(id, data)
}

export const deleteAirQualityDataSvc = async (id) => {
    return await deleteAirQualityDataRpo(id)
}