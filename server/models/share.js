export default (sequelize, DataTypes) => {
  const Share = sequelize.define(
    'Share',
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
  Share.associate = (models) => {
    const { User, Article } = models;
    Share.belongsTo(User, {
      foreignKey: 'userId'
    });
    Share.belongsTo(Article, {
      foreignKey: 'articleId'
    });
  };
  return Share;
};
