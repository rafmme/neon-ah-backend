export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Articles', ['userId'], {
    type: 'foreign key',
    name: 'articlesUserId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Articles', 'articlesUserId_FK')
  }
};
