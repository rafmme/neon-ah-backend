module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
        is: (value) => {
          if (!/[a-z]/.test(value)) {
            return 'Your password must contain at least one lowercase letter';
          } if (!/[A-Z]/.test(value)) {
            return 'Your password must contain at least one uppercase letter';
          } if (!/\d/.test(value)) {
            return 'Your password must contain at least one number';
          } if (!/[@$!%*?&]/.test(value)) {
            return 'Your password must contain at least one of these special characters: @, $, !, %, *, ?, &';
          } if (value.length < 6) {
            return 'Your password must be composed of at least 6 characters';
          }
          return 'true';
        }
      },
    },
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    following: DataTypes.BOOLEAN
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
