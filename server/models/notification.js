'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    senderid: DataTypes.INTEGER,
    type: DataTypes.STRING,
    receiverid: DataTypes.INTEGER
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
  };
  return Notification;
};