export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('CommentLikes', ['userId'], {
    type: 'foreign key',
    name: 'commentLikesUserId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('CommentLikes', 'commentLikesUserId_FK')
};
