module.exports = (sequelize, DataTypes) => {
  const Authtype = sequelize.define(
    'Authtype',
    {
      type: DataTypes.STRING
    },
    {}
  );
  Authtype.associate = models => {
    Authtype.hasMany(models.Users, {
      foreignKey: 'authTypeId'
    });
  };
  return Authtype;
};
