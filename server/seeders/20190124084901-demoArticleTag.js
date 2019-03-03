export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('ArticleTags', [{
    id: '00143c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    articleId: '95745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    tagId: '00143c60-7b1a-11e8-9c9c-2d42b21b1a3e'
  }
], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('ArticleTags', null, {})
};
