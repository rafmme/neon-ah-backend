
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [{
    type: 'user',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
