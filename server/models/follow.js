module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followersid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
  return Follow;
};
