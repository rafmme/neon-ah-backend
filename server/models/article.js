module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
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
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ispublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isreported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {});
  Article.associate = (models) => {
    const {
      Users,
      Tag,
      Comment,
      Articlelikesdislike,
      Bookmark,
      Rating,
      Share
    } = models;
    Article.belongsTo(Users, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
    Article.belongsToMany(Users, {
      through: 'Report',
      as: 'reports',
      foreignKey: 'articleid',
    });
    Article.belongsToMany(Tag, {
      through: 'Articletag',
      as: 'tags',
      foreignKey: 'articleid',
    });
    Article.hasMany(Comment, {
      foreignKey: 'articleid',
      as: 'comments'
    });
    Article.hasMany(Articlelikesdislike, {
      foreignKey: 'articleid',
      as: 'likes'
    });
    Article.hasOne(Bookmark, {
      foreignKey: 'articleid',
      as: 'bookmark',
    });
    Article.hasOne(Rating, {
      foreignKey: 'articleid',
      as: 'rating',
    });
    Article.hasMany(Share, {
      foreignKey: 'articleid',
      as: 'share',
    });
  };
  return Article;
};
