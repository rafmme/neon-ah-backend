export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Users', ['roleId'], {
    type: 'foreign key',
    name: 'usersRole_FK',
    references: {
      table: 'Roles',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Users', 'usersRole_FK')
};
