export default (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followersId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {});
  Follow.associate = (models) => {
    const { User } = models;
    Follow.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'followedUser'
    });
    Follow.belongsTo(User, {
      foreignKey: 'followersId',
      onDelete: 'CASCADE',
      as: 'followingUser'
    });
  };

  return Follow;
};
