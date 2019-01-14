export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'AuthTypes',
    [
      {
        type: 'local'
      },
      {
        type: 'google'
      },
      {
        type: 'facebook'
      },
      {
        type: 'twitter'
      },
      {
        type: 'linkedin'
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('AuthTypes', null, {})
};
