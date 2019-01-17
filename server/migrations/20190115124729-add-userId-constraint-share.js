export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Shares', ['userId'], {
    type: 'foreign key',
    name: 'sharesUserId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Shares', 'sharesUserId_FK')
};
