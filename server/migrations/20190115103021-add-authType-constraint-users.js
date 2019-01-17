export default {
  up: (queryInterface, Sequelize) => queryInterface.addConstraint('Users', ['authTypeId'], {
    type: 'foreign key',
    name: 'usersAuthType_FK',
    references: {
      table: 'AuthTypes',
      field: 'id'
    },
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),

  down: (queryInterface, Sequelize) => queryInterface.removeConstraint('Users', 'usersAuthType_FK')
};
