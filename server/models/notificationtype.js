'use strict';
module.exports = (sequelize, DataTypes) => {
  const notificationtype = sequelize.define('Notificationtype', {
    type: DataTypes.STRING
  }, {});
  notificationtype.associate = function(models) {
    // associations can be defined here
  };
  return notificationtype;
};