export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Replies', ['userId'], {
    type: 'foreign key',
    name: 'replyUserId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Replies', 'replyUserId_FK')
};
