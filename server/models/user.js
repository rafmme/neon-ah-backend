module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your full name'
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a username'
      },
      unique: {
        args: true,
        msg: 'Username has been taken'
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address'
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      },
      validate: {
        isNotShort: (value) => {
          if (value.length < 8) {
            throw new Error('Password should be at least 8 characters');
          }
        },
        isUpperCase: (value) => {
          if (!/[A-Z]/.test(value)) {
            throw new Error('Password should contain at least one uppercase letter');
          }
        },
      }
    },
    isverified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notifysettings: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authtype: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  User.associate = (models) => {
    const {
      Article,
      Authtype,
      Comment,
      Reply,
      Commentlike,
      Notification,
      Bookmark,
      Share,
      Role,
      Users
    } = models;
    User.hasMany(Article, {
      as: 'articles',
      foreignKey: 'userid'
    });
    User.belongsTo(Authtype, {
      as: 'authtypes',
      foreignKey: 'authtype',
      targetKey: 'type'
    });
    User.hasMany(Comment, {
      foreignKey: 'userid',
      as: 'comments'
    });
    User.hasMany(Reply, {
      as: 'replies',
      foreignKey: 'userid'
    });
    User.hasMany(Commentlike, {
      foreignKey: 'userId',
    });
    User.hasMany(Notification, {
      as: 'sender',
      foreignKey: 'senderid',
    });
    User.hasMany(Notification, {
      as: 'receiver',
      foreignKey: 'receiverid'
    });
    User.hasMany(Bookmark, {
      foreignKey: 'userid',
    });
    User.hasMany(Share, {
      foreignKey: 'userid',
    });
    User.belongsTo(Role, {
      foreignKey: 'role',
      targetKey: 'type'
    });
    User.belongsToMany(Users, {
      through: 'Follow',
      as: 'followers',
      foreignKey: 'followersid',
    });
    User.belongsToMany(Users, {
      through: 'Follow',
      as: 'following',
      foreignKey: 'userid',
    });
  };
  return User;
};
