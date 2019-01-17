import uuidv4 from 'uuid/v4';

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ArticleLikesDislikes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidv4()
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    articleId: {
      type: Sequelize.UUID,
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
