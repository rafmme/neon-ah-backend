import { checkSchema } from 'express-validator/check';

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

export default ratingsSchema;
