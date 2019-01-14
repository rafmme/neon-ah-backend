export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Bookmarks', ['userId'], {
    type: 'foreign key',
    name: 'bookmarksUserId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Bookmarks', 'bookmarksUserId_FK')
  }
};
