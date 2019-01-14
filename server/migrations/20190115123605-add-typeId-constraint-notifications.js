export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Notifications', ['typeId'], {
    type: 'foreign key',
    name: 'notificationsTypeId_FK',
    references: {
      table: 'NotificationTypes',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Notifications', 'notificationsTypeId_FK')
};
