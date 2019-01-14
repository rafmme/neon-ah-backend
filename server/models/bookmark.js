export default (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Bookmark.associate = (models) => {
    Bookmark.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Bookmark;
};
