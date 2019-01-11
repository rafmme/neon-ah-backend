'use strict';
module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define('Share', {
    articleid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
  Share.associate = function(models) {
    // associations can be defined here
  };
  return Share;
};