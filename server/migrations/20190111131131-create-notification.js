import uuidv4 from 'uuid/v4';

export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: uuidv4()
    },
    senderId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    typeId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    receiverId: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Notifications')
};
