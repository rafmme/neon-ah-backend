import checkSchema from 'express-validator/check';

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

export default searchSchema;
