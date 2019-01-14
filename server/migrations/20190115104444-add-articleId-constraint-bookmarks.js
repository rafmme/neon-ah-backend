export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Bookmarks', ['articleId'], {
    type: 'foreign key',
    name: 'BookmarksArticleId_FK',
    references: {
      table: 'Articles',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Bookmarks', 'BookmarksArticleId_FK')
  }
};
