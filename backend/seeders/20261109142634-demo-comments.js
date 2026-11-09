'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const articles = await queryInterface.sequelize.query(
        'SELECT id FROM articles;'
    );

    const articlesId = articles[0].map(a => a.id );

    await queryInterface.bulkInsert('comments', [
      {
        content: '1 Comment for articles 1',
        articleId: articlesId[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: '2 Comment for articles 1',
        articleId: articlesId[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: '1 Comment for articles 2',
        articleId: articlesId[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
