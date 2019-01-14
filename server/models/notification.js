module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    senderid: DataTypes.INTEGER,
    type: DataTypes.STRING,
    receiverid: DataTypes.INTEGER
  }, {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.Users, {
      as: 'sender',
      foreignKey: 'senderid',
      onDelete: 'CASCADE'
    });
    Notification.belongsTo(models.Users, {
      as: 'receiver',
      foreignKey: 'receiverid',
      onDelete: 'CASCADE'
    });
  };
  return Notification;
};
