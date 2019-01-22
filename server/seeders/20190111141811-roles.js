export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Roles',
    [
      {
        id: '3ceb546e-054d-4c1d-8860-e27c209d4ae3',
        type: 'user',
      },
      {
        id: '3ceb546e-054d-4c1d-8860-e27c209d4ae4',
        type: 'admin'
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
