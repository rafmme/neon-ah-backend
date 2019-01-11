'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followersid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
  };
  return Follow;
};