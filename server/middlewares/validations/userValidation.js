import { checkSchema } from 'express-validator/check';


const signUpSchema = checkSchema({
  fullName: {
    in: 'body',
    customSanitizer: {
      options: fullName => fullName.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'fullname cannot be empty'
    },
    isString: {
      errorMessage: 'fullname has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'fullname is too short'
    }
  },
  userName: {
    in: 'body',
    customSanitizer: {
      options: UserName => UserName.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Username cannot be empty'
    },
    isString: {
      errorMessage: 'Username has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'Username is too short'
    }
  },
  email: {
    in: 'body',
    customSanitizer: {
      options: email => email.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Email cannot be empty'
    },
    isEmail: {
      errorMessage: 'Please provide a valid email'
    },
    errorMessage: 'email is too short'
  },
  password: {
    in: 'body',
    customSanitizer: {
      options: password => password.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Password cannot be empty'
    },
    isLength: {
      options: {
        min: 6
      },
      errorMessage: 'Password cannot be less than 6 Characters'
    }
  },
  confirmPassword: {
    in: 'body',
    isEmpty: {
      negated: true,
      errorMessage: 'Password cannot be empty'
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        } else {
          return value;
        }
      }
    }
  }
});

const logInSchema = checkSchema({
  user: {
    in: 'body',
    customSanitizer: {
      options: user => user.trim()
    },
    isString: {
      errorMessage: 'Username or Email has to be a string'
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Username or Email field cannot be empty'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'Username or Email is too short'
    }
  },
  password: {
    in: 'body',
    customSanitizer: {
      options: password => password.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Password cannot be empty'
    },
    isLength: {
      options: {
        min: 6
      },
      errorMessage: 'Password cannot be less than 6 Characters'
    }
  }
});


const editProfileSchema = checkSchema({
  fullName: {
    in: 'body',
    customSanitizer: {
      options: fullName => fullName.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'fullname cannot be empty'
    },
    isString: {
      errorMessage: 'fullname has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'fullname is too short'
    }
  },
  userName: {
    in: 'body',
    customSanitizer: {
      options: UserName => UserName.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Username cannot be empty'
    },
    isString: {
      errorMessage: 'Username has to be a string'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'Username is too short'
    }
  },
  email: {
    in: 'body',
    customSanitizer: {
      options: email => email.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Email cannot be empty'
    },
    isEmail: {
      errorMessage: 'Please provide a valid email'
    },
    errorMessage: 'email is too short'
  },
  password: {
    in: 'body',
    customSanitizer: {
      options: password => password.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Password cannot be empty'
    },
    isLength: {
      options: {
        min: 6
      },
      errorMessage: 'Password cannot be less than 6 Characters'
    }
  },
  bio: {
    in: 'body',
    customSanitizer: {
      options: bio => bio.trim()
    },
    isString: {
      errorMessage: 'Bio can only be string'
    }
  },
  notifySettings: {
    in: 'body',
    isEmpty: {
      negated: true,
      errorMessage: 'Notification settings cannot be empty'
    },
    isBoolean: {
      errorMessage: 'Notification settings must be a Boolean'
    }
  },
  img: {
    in: 'body',
    customSanitizer: {
      options: img => img.trim()
    },
    isString: {
      errorMessage: 'image has to be a string'
    }
  }
});

export {
  signUpSchema,
  logInSchema,
  editProfileSchema
};
