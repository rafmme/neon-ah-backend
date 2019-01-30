module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'Tag',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {}
  );
  Tag.associate = (models) => {
    const { Article, User } = models;
    Tag.belongsToMany(Article, {
      through: 'ArticleTag',
      as: 'articles',
      foreignKey: 'tagId'
    });
    Tag.belongsToMany(User, {
      through: 'FollowedTags',
      foreignKey: 'tagId'
    });
  };
  return Tag;
};
