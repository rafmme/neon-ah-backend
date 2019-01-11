'use strict';
module.exports = (sequelize, DataTypes) => {
  const authtype = sequelize.define('Authtype', {
    type: DataTypes.STRING
  }, {});
  authtype.associate = function(models) {
    // associations can be defined here
  };
  return authtype;
};