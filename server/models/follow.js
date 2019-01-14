export default (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followersId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  return Follow;
};
