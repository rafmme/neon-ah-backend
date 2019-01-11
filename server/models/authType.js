export default (sequelize, DataTypes) => {
  const AuthType = sequelize.define(
    'AuthType',
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  AuthType.associate = (models) => {
    AuthType.hasMany(models.User, {
      foreignKey: 'authTypeId'
    });
  };
  return AuthType;
};
