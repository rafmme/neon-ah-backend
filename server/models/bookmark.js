module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    userid: DataTypes.INTEGER,
    articleid: DataTypes.INTEGER
  }, {});
  Bookmark.associate = (models) => {
    Bookmark.belongsTo(models.Users, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };
  return Bookmark;
};
