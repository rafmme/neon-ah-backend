export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles', [{
    slug: 'What-a-mighty-God',
    title: 'Mighty God',
    content: 'Hallelujah',
    banner: 'banner_url',
    userId: 1,
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
};
