export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('AuthTypes', [{
    type: 'linkedin',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('AuthTypes', null, {})
};
