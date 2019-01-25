export default (sequelize, DataTypes) => {
  const UserFollow = sequelize.define(
    'UserFollow',
    {
      followersId: DataTypes.UUID,
      usersId: DataTypes.UUID
    },
    {}
  );
  return UserFollow;
};
