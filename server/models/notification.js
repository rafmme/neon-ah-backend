export default (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      senderId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      receiverId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      as: 'sender',
      foreignKey: 'senderId',
      onDelete: 'CASCADE'
    });
    Notification.belongsTo(models.User, {
      as: 'receiver',
      foreignKey: 'receiverId',
      onDelete: 'CASCADE'
    });
  };
  return Notification;
};
