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
      },
    }, {}
  );
  ArticleTag.associate = (models) => {
    ArticleTag.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
    ArticleTag.belongsTo(models.Tag, {
      foreignKey: 'tagId',
      onDelete: 'CASCADE'
    });
  };
  return ArticleTag;
};
