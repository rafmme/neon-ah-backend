export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Follows', [{
    followersId: '92745c78-7b1a-81e8-9c9c-9d42b21b1a3e',
    userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
  }
], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Follows', null, {})
};
