export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Notifications', ['receiverId'], {
    type: 'foreign key',
    name: 'notificationReceiverId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Notifications', 'notificationReceiverId_FK')
};
