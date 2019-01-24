module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define(
    'Report',
    {
      articleId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  return Report;
};
