export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Articles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a title for your article'
      },
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    banner: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isPublished: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isReported: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    userId: {
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
