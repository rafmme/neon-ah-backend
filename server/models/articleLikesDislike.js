export default (sequelize, DataTypes) => {
  const ArticleLikesDislike = sequelize.define(
    'ArticleLikesDislike',
    {
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      articleId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      reaction: {
        type: DataTypes.ENUM('like', 'dislike'),
        allowNull: false
      }
    },
    {}
  );
  ArticleLikesDislike.associate = (models) => {
    ArticleLikesDislike.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return ArticleLikesDislike;
};
