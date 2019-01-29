export default (sequelize, DataTypes) => {
  const ReadingStats = sequelize.define(
    'ReadingStats',
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
  ReadingStats.associate = (models) => {
    const { User, Article } = models;
    ReadingStats.belongsTo(User, {
      foreignKey: 'userId'
    });
    ReadingStats.belongsTo(Article, {
      foreignKey: 'articleId'
    });
  };
  return ReadingStats;
};
