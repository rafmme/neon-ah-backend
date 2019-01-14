export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('ArticleTags', ['articleId'], {
    type: 'foreign key',
    name: 'articleTagsArticleId_FK',
    references: {
      table: 'Articles',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ArticleTags', 'articleTagsArticleId_FK')
  }
};
