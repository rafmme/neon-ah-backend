export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Ratings', ['userId'], {
    type: 'foreign key',
    name: 'ratingUserId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Ratings', 'ratingUserId_FK')
};
