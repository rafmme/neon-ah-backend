export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Comments', [{
    id: '09543c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    content: 'Hallelujah',
    userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    articleId: '95745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
  }, {
    id: '09543c60-7b1a-11e8-9c9c-2d42b21b1a31',
    content: 'Hallelujah',
    userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    articleId: '85745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
  }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Comments', null, {})
};
