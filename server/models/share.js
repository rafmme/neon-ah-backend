module.exports = (sequelize, DataTypes) => {
  const Share = sequelize.define('Share', {
    articleid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {});
  Share.associate = (models) => {
    const { Users, Article } = models;
    Share.belongsTo(Users, {
      foreignKey: 'userid'
    });
    Share.belongsTo(Article, {
      foreignKey: 'articleid'
    });
  };
  return Share;
};
