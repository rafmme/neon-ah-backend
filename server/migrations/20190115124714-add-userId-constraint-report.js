export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Reports', ['userId'], {
    type: 'foreign key',
    name: 'reportsUserId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Reports', 'reportsUserId_FK')
};
