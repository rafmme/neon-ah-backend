module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your full name'
        }
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: 'Username has been taken'
        },
        allowNull: {
          args: false,
          msg: 'Please enter your username'
        }
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
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter a password'
        }
      },
      bio: DataTypes.STRING,
      image: DataTypes.STRING,
      following: DataTypes.BOOLEAN
    },
    {}
  );
  User.associate = function (models) {
  };
  return User;
};
