/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      isverified: {
        type: Sequelize.BOOLEAN
      },
      bio: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      notifysettings: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      authTypeId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Users')
};
