export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Notifications', [{
    id: '10a3e55b-30b2-4d0f-8f04-2d0838e6f44f',
    senderId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    message: 'jesseinit just published a new article',
    isRead: false,
    receiverId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4'
  },
  {
    id: '67e8b42d-a3c3-456f-81f1-667172965556',
    senderId: '45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
    message: 'jesseinit just followed you.',
    isRead: true,
    receiverId: 'aba396bd-7ac4-42c3-b442-cf10dd73e4f4'
  }
], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Notifications', null, {})
};
