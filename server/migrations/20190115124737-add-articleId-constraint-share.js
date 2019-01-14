export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Shares', ['articleId'], {
    type: 'foreign key',
    name: 'sharesArticleId_FK',
    references: {
      table: 'Articles',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Shares', 'sharesArticleId_FK')
};
