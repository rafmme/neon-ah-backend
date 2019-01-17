import uuidv4 from 'uuid/v4';

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('NotificationTypes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidv4()
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('NotificationTypes')
};
