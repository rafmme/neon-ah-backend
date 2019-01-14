export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Comments', ['articleId'], {
    type: 'foreign key',
    name: 'commentsArticleId_FK',
    references: {
      table: 'Articles',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Comments', 'commentsArticleId_FK')
};
