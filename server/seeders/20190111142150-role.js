
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [{
    type: 'admin',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
