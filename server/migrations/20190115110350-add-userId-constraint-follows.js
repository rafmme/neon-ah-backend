export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Follows', ['followersId'], {
    type: 'foreign key',
    name: 'followsFollowersId_FK',
    references: {
      table: 'Users',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Follows', 'followsFollowersId_FK')
};
