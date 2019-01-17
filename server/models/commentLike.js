export default (sequelize, DataTypes) => {
  const CommentLike = sequelize.define('CommentLike', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    commentId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {});
  CommentLike.associate = (models) => {
    const {
      User,
      Comment
    } = models;
    CommentLike.belongsTo(Comment, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE'
    });
    CommentLike.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return CommentLike;
};
