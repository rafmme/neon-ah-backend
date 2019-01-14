module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Reply.associate = (models) => {
    const {
      User,
      Comment
    } = models;
    Reply.belongsTo(User, {
      foreignKey: 'userId'
    });
    Reply.belongsTo(Comment, {
      foreignKey: 'commentId'
    });
  };
  return Reply;
};
