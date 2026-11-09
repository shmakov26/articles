'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('articles', [
      {
        title: 'Title1',
        content: 'Content 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Title2',
        content: 'Content 2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
        ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('articles', null, {});
  }
};
