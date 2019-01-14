export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Notifications', ['senderId'], {
    type: 'foreign key',
    name: 'notificationsSenderId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Notifications', 'notificationsSenderId_FK')
};
