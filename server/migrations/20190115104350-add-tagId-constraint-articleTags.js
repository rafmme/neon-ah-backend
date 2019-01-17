export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('ArticleTags', ['tagId'], {
    type: 'foreign key',
    name: 'articleTagTagId_FK',
    references: {
      table: 'Tags',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('ArticleTags', 'articleTagTagId_FK')
  }
};
