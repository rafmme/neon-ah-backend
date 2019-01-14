export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Replies', ['articleId'], {
    type: 'foreign key',
    name: 'replyArticleId_FK',
    references: {
      table: 'Articles',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Replies', 'replyArticleId_FK')
};
