'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentlike = sequelize.define('Commentlike', {
    userid: DataTypes.INTEGER,
    commentid: DataTypes.INTEGER
  }, {});
  Commentlike.associate = function(models) {
    // associations can be defined here
  };
  return Commentlike;
};