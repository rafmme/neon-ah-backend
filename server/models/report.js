module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    articleid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  return Report;
};
