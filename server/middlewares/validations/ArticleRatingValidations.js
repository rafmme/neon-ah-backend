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

const ratingsSchema = checkSchema({
  rating: {
    in: 'body',
    customSanitizer: {
      options: content => content.trim()
    },
    isEmpty: {
      negated: true,
      errorMessage: 'No rating provided'
    },
    isLength: {
      options: {
        min: 1,
        max: 5
      },
      errorMessage: 'Rating can only be between 1 and 5'
    }
  }
});

export { handleValidationErrors, ratingsSchema };
