import { validationResult, checkSchema } from 'express-validator/check';


const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(422).send({
      status: 'failure',
      data: {
        statusCode: 422,
        error: validationErrors.array().map(err => (
          err.msg
        ))
      }
    });
  }
  next();
};

const searchSchema = checkSchema({
  searchBar: {
    in: 'body',
    customSanitizer: {
      options: content => content.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'content cannot be empty'
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'content is too short'
    }
  }
});

export { handleValidationErrors, searchSchema };
