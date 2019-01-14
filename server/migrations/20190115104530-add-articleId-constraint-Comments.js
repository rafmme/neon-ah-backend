export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Comments', ['userId'], {
    type: 'foreign key',
    name: 'commentsUserId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Comments', 'commentsUserId_FK')
};
