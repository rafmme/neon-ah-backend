export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('ArticleLikesDislikes', ['articleId'], {
    type: 'foreign key',
    name: 'articleLikesDislikesArticleId_FK',
    references: {
      table: 'Articles',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ArticleLikesDislikes', 'articleLikesDislikesArticleId_FK')
  }
};
