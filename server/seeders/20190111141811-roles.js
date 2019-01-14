export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Roles',
    [
      {
        type: 'user',
      },
      {
        type: 'admin'
      }
    ],
    {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
