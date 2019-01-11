'use strict';
module.exports = (sequelize, DataTypes) => {
  const Articlelike = sequelize.define('Articlelike', {
    userid: DataTypes.INTEGER,
    articleid: DataTypes.INTEGER
  }, {});
  Articlelike.associate = function(models) {
    // associations can be defined here
  };
  return Articlelike;
};
