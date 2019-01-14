export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Follows', ['userId'], {
    type: 'foreign key',
    name: 'followsUserId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Follows', 'followsUserId_FK')
};
