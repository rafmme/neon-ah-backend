module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    userid: DataTypes.INTEGER,
    articleid: DataTypes.INTEGER,
    commentid: DataTypes.INTEGER
  }, {});
  Reply.associate = (models) => {
    const { Users, Comment } = models;
    Reply.belongsTo(Users, {
      foreignKey: 'userid'
    });
    Reply.belongsTo(Comment, {
      foreignKey: 'commentid'
    });
  };
  return Reply;
};
