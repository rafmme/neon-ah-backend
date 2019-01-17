export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Replies', ['commentId'], {
    type: 'foreign key',
    name: 'replyCommentId_FK',
    references: {
      table: 'Comments',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Replies', 'replyCommentId_FK')
};
