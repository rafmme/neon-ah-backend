module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isverified: DataTypes.BOOLEAN,
    bio: DataTypes.STRING,
    img: DataTypes.STRING,
    notifysettings: DataTypes.BOOLEAN,
    roleid: DataTypes.INTEGER,
    authtypeid: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
  };
  return User;
};
