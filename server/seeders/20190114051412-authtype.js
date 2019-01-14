export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('AuthTypes', [{
    type: 'twitter',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('AuthTypes', null, {})
};
