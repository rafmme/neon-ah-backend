export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() => {
        return queryInterface.createTable('Articles', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          slug: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
          },
          title: {
            type: Sequelize.TEXT,
            allowNull: {
              args: false,
              msg: 'Please enter a title for your article'
            },
          },
          content: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          banner: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          timeToRead: {
            type: Sequelize.INTEGER
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
            type: Sequelize.UUID
          },
          averageRating: {
            type: Sequelize.INTEGER,
            defaultValue: 0
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
        });
      });
  },
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Articles')
};
