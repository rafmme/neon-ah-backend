export default (sequelize, DataTypes) => {
  const ArticleTag = sequelize.define('ArticleTag', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  return ArticleTag;
};
