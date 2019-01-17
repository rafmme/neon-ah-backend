export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
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
