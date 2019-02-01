export default {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() => queryInterface.createTable('Highlights', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    articleId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Articles',
        key: 'id'
      }
    },
    commentId: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Comments',
        key: 'id'
      }
    },
    highlightedText: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Highlights')
};
