export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    fullName: 'Jesse',
    userName: 'jesseinit',
    email: 'jesseinit@now.com',
    bio: 'Gitting Started',
    password: 'Blahblah',
    authTypeId: 1
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
