export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('FollowedTags', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          tagId: {
            type: Sequelize.UUID,
            allowNull: false
          },
          tagName: {
            type: Sequelize.STRING,
            allowNull: false
          },
          followerId: {
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
        })
      })
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('FollowedTags')
};
