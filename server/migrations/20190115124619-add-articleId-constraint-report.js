export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Reports', ['articleId'], {
    type: 'foreign key',
    name: 'reportsArticleId_FK',
    references: {
      table: 'Articles',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Reports', 'reportsArticleId_FK')
};
