export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('AuthTypes', [{
    type: 'email',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('AuthTypes', null, {})
};
