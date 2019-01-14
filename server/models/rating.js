export default (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {});
  };
  return Rating;
};
