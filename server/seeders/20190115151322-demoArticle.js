export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Articles',
    [
      {
        slug: 'What-a-mighty-God',
        title: 'Mighty God',
        content: 'Hallelujah',
        banner: 'banner_url',
        userId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
};
