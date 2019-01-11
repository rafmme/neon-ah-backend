'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    userid: DataTypes.INTEGER,
    articleid: DataTypes.INTEGER,
    commentid: DataTypes.INTEGER
  }, {});
  Reply.associate = function(models) {
    // associations can be defined here
  };
  return Reply;
};