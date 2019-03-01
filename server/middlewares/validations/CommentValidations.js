import { checkSchema } from 'express-validator/check';

const commentSchema = checkSchema({
  content: {
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
  },
  highlightedText: {
    in: 'body',
    customSanitizer: {
      options: content => content.trim()
    },
    optional: true,
    isString: {
      errorMessage: 'Highlighted text must be a string'
    },
    isEmpty: {
      negated: true,
      errorMessage: 'Highlighted text cannot be empty'
    }
  }
});

export default commentSchema;
