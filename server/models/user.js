/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
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
    // associations can be defined here
  };
  return User;
};
