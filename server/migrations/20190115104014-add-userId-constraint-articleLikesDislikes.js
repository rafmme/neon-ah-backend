export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('ArticleLikesDislikes', ['userId'], {
    type: 'foreign key',
    name: 'articleLikesDislikesUserId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ArticleLikesDislikes', 'articleLikesDislikesUserId_FK')
  }
};
