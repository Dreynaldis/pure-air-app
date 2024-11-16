'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Air_Quality', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      daerah: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      value: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tingkat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Air_Quality');
  }
};
