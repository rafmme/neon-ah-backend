'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
    userid: DataTypes.INTEGER,
    articleid: DataTypes.INTEGER
  }, {});
  Bookmark.associate = function(models) {
    // associations can be defined here
  };
  return Bookmark;
};