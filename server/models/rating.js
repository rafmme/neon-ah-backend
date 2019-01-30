export default (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    'Rating',
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    }, {}
  );

  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'rater',
      onDelete: 'CASCADE'
    });
    Rating.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return Rating;
};
