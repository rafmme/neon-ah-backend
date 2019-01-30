import TimeToRead from '../helpers/TimeToRead';

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
      timeToRead: {
        type: DataTypes.INTEGER,
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
    {
      hooks: {
        beforeCreate: (article) => {
          article.timeToRead = TimeToRead.readTime(article);
        },
        beforeUpdate(article) {
          article.timeToRead = TimeToRead.readTime(article.dataValues);
        }
      }
    }
  );
  Article.associate = (models) => {
    const {
      User,
      Tag,
      Comment,
      ArticleLikesDislike,
      Bookmark,
      Share,
      ReadingStats,
      Report
    } = models;
    Article.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'author'
    });
    Article.belongsToMany(User, {
      through: 'Rating',
      as: 'ratings',
      foreignKey: 'articleId',
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
    Article.hasMany(Report, {
      foreignKey: 'articleId',
      as: 'report'
    });
    Article.belongsToMany(User, {
      through: 'Report',
      as: 'reports',
      foreignKey: 'articleId'
    });
    Article.belongsToMany(User, {
      through: 'ArticleLikesDislike',
      as: 'likes',
      foreignKey: 'articleId',
    });
    Article.hasMany(ArticleLikesDislike, {
      foreignKey: 'articleId',
      as: 'like'
    });
    Article.hasOne(Bookmark, {
      foreignKey: 'articleId',
      as: 'bookmark'
    });
    Article.hasMany(Share, {
      foreignKey: 'articleId',
      as: 'share'
    });
    Article.hasMany(ReadingStats, {
      foreignKey: 'articleId'
    });
  };
  return Article;
};
