export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        id: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        fullName: 'Jesse',
        userName: 'jesseinit',
        email: 'jesseinit@now.com',
        bio: 'Gitting Started',
        password: 'Blahblah',
        authTypeId: '15745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
