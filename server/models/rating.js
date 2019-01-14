module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    articleid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
  Rating.associate = (models) => {
    Rating.belongsTo(models.Users, {});
  };
  return Rating;
};
