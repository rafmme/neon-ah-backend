/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    slug: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    },
    banner: {
      type: Sequelize.STRING
    },
    ispublished: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isreported: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    userid: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Articles')
};
