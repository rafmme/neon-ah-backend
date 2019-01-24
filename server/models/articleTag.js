export default (sequelize, DataTypes) => {
  const ArticleTag = sequelize.define(
    'ArticleTag',
    {
      articleId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      tagId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  return ArticleTag;
};
