module.exports = {
  up : async(queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Air_Quality', [
      {
        daerah: "Jakarta",
        value: 5,
        tingkat: "Sedang",
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        daerah: "Tangerang",
        value: 8,
        tingkat: "Tinggi",
        created_at: new Date(),
        updated_at: new Date()
      }

    ])

  },

  down : async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Air_Quality', null, {})
  }
};
