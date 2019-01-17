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
  return Follow;
};
