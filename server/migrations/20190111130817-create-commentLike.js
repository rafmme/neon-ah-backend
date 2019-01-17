import uuidv4 from 'uuid/v4';

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('CommentLikes', {
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
    commentId: {
      type: Sequelize.UUID,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('CommentLikes')
};
