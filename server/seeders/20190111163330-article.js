module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [{
      slug: 'What-a-mighty-God',
      title: 'Mighty God',
      content: 'Hallelujah',
      banner: 'banner_url',
      userid: 1,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authtypes', null, {});
  }
};