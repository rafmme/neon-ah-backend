export default (sequelize, DataTypes) => {
  const NotificationType = sequelize.define('NotificationType', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  return NotificationType;
};
