module.exports = (sequelize, DataTypes) => {
  const Commentlike = sequelize.define('Commentlike', {
    userid: DataTypes.INTEGER,
    commentid: DataTypes.INTEGER
  }, {});
  Commentlike.associate = (models) => {
    const { Users, Comment } = models;
    Commentlike.belongsTo(Comment, {
      foreignKey: 'commentid',
      onDelete: 'CASCADE'
    });
    Commentlike.belongsTo(Users, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };
  return Commentlike;
};
