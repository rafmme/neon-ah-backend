module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    userid: DataTypes.INTEGER,
    articleid: DataTypes.INTEGER
  }, {});
  Comment.associate = (models) => {
    const {
      Reply,
      Article,
      Users,
      Commentlike,
    } = models;
    Comment.hasMany(Reply, {
      foreignKey: 'commentid',
      as: 'replies'
    });
    Comment.belongsTo(Article, {
      foreignKey: 'articleid',
      onDelete: 'CASCADE'
    });
    Comment.hasMany(Commentlike, {
      foreignKey: 'commentid',
      as: 'likes'
    });
    Comment.belongsTo(Users, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };
  return Comment;
};
