export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('FollowedTags', [{
    id: '1ee5810b-ea28-42d1-9c5d-83fd704ee61f',
    tagName: 'music',
    tagId: '00126d60-6b1a-11e8-9c9c-2d42b21b1a3e',
    followerId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e'
  }
], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('FollowedTags', null, {})
};
