export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticleLikesDislikes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    articleId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    reaction: {
      type: Sequelize.ENUM('like', 'dislike'),
      allowNull: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ArticleLikesDislikes')
};
