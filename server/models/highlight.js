export default (sequelize, DataTypes) => {
  const Highlight = sequelize.define(
    'Highlight',
    {
      articleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Article',
          key: 'id'
        }
      },
      commentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Comment',
          key: 'id'
        }
      },
      highlightedText: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    { timestamps: false }
  );
  return Highlight;
};
