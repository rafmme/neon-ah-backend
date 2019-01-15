export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        fullName: 'John Doe',
        userName: 'johndoe',
        email: 'johndoe@gmail.com',
        password: 'password',
        bio: 'I am cool',
        img: 'img_url',
        roleId: 1,
        authTypeId: 1
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
