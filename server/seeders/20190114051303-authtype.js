export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('AuthTypes', [{
    type: 'facebook',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('AuthTypes', null, {})
};
