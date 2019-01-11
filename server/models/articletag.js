'use strict';
module.exports = (sequelize, DataTypes) => {
  const Articletag = sequelize.define('Articletag', {
    articleid: DataTypes.INTEGER,
    tagid: DataTypes.INTEGER
  }, {});
  Articletag.associate = function(models) {
    // associations can be defined here
  };
  return Articletag;
};