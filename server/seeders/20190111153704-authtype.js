export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('AuthTypes', [{
    type: 'regular',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('AuthTypes', null, {})
};
