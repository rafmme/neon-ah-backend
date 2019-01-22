export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'AuthTypes',
      [
        {
          id: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
          type: 'local'
        },
        {
          id: '25745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
          type: 'google'
        },
        {
          id: '35745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
          type: 'facebook'
        },
        {
          id: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
          type: 'twitter'
        },
        {
          id: '55745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
          type: 'linkedin'
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('AuthTypes', null, {})
};
