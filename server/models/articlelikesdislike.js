module.exports = (sequelize, DataTypes) => {
  const Articlelikesdislike = sequelize.define('Articlelikesdislike', {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reaction: {
      type: DataTypes.ENUM('like', 'dislike'),
      allowNull: false
    }
  }, {});
  Articlelikesdislike.associate = (models) => {
    Articlelikesdislike.belongsTo(models.Article, {
      foreignKey: 'articleid'
    });
  };
  return Articlelikesdislike;
};
