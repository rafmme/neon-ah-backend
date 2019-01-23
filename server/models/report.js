module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  return Report;
};
