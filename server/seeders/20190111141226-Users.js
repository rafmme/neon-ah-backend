module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      fullname: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'password',
      isverified: false,
      bio: 'I am cool',
      img: 'img_url',
      notifysettings: true,
      roleid: 1,
      authtypeid: 1
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
