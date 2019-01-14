/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Users',
      [
        {
          fullname: 'John Doe',
          username: 'johndoe',
          email: 'johndoe@gmail.com',
          password: 'password',
          bio: 'I am cool',
          img: 'img_url',
          roleId: 2,
          authTypeId: 2
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Users', null, {})
};
