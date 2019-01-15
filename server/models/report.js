module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    articleid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
  return Report;
};
