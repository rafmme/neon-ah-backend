/* eslint-disable no-unused-vars */


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe234',
    email: 'johndoe@demo.com',
    password: '1234567',
    bio: 'indian cowboy',
    image: 'http://imageUrl.com/example.jpg',
    following: true
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
