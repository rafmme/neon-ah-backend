export default (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    articleId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    complaint: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});
  Report.associate = (models) => {
    Report.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'Complainant'
    });
    Report.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });
  };
  return Report;
};
