module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = (models) => {
    Tag.belongsToMany(models.Article, {
      through: 'ArticleTag',
      as: 'articles',
      foreignKey: 'tagid'
    });
  };
  return Tag;
};
