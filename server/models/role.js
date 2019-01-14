module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    'Role',
    {
      type: DataTypes.STRING
    },
    {}
  );
  Role.associate = models => {
    Role.hasMany(models.Users, {
      foreignKey: 'roleId'
    });
  };
  return Role;
};
