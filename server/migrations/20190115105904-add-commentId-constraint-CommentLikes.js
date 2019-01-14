export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('CommentLikes', ['commentId'], {
    type: 'foreign key',
    name: 'commentLikesCommentId_FK',
    references: {
      table: 'Comments',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('CommentLikes', 'commentLikesCommentId_FK')
};
