module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    slug: DataTypes.STRING,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    banner: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {});
  Article.associate = (models) => {
  };
  return Article;
};