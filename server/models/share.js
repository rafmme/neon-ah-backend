module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define('Share', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Share.associate = (models) => {
    const {
      User,
      Article
    } = models;
    Share.belongsTo(User, {
      foreignKey: 'userId'
    });
    Share.belongsTo(Article, {
      foreignKey: 'articleId'
    });
  };
  return Share;
};
