export default (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter a title for your article'
        }
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      banner: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isReported: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  Article.associate = (models) => {
    const {
      User, Tag, Comment, ArticleLikesDislike, Bookmark, Rating, Share
    } = models;
    Article.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Article.belongsToMany(User, {
      through: 'Report',
      as: 'reports',
      foreignKey: 'articleId'
    });
    Article.belongsToMany(User, {
      through: 'Rating',
      as: 'ratings',
      foreignKey: 'articleId'
    });
    Article.belongsToMany(Tag, {
      through: 'ArticleTag',
      as: 'tags',
      foreignKey: 'articleId'
    });
    Article.hasMany(Comment, {
      foreignKey: 'articleId',
      as: 'comments'
    });
    Article.hasMany(ArticleLikesDislike, {
      foreignKey: 'articleId',
      as: 'likes'
    });
    Article.hasOne(Bookmark, {
      foreignKey: 'articleId',
      as: 'bookmark'
    });
    Article.hasOne(Rating, {
      foreignKey: 'articleId',
      as: 'rating'
    });
    Article.hasMany(Share, {
      foreignKey: 'articleId',
      as: 'share'
    });
  };
  return Article;
};
