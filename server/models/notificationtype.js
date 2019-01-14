module.exports = (sequelize, DataTypes) => {
  const Notificationtype = sequelize.define('Notificationtype', {
    type: DataTypes.STRING
  }, {});
  return Notificationtype;
};
