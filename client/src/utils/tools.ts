export const getTingkat = (value: number) => {
    if (value <= 3) return 'Rendah'
    if (value <= 6) return 'Sedang'
    return 'Tinggi'
}
