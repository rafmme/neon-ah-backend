module.exports = (sequelize, DataTypes) => {
  const FollowedTags = sequelize.define(
    'FollowedTags',
    {
      tagId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      tagName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      followerId: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {}
  );
  FollowedTags.associate = (models) => {
    const { Tag, User } = models;
    FollowedTags.belongsTo(Tag, {
      foreignKey: 'tagId',
      onDelete: 'CASCADE'
    });
    FollowedTags.belongsTo(User, {
      foreignKey: 'followerId',
      onDelete: 'CASCADE'
    });
  };
  return FollowedTags;
};
