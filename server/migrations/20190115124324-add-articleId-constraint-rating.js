export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Ratings', ['articleId'], {
    type: 'foreign key',
    name: 'ratingArticleId_FK',
    references: {
      table: 'Articles',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Ratings', 'ratingArticleId_FK')
};
