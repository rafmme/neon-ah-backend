import { checkSchema } from 'express-validator/check';

const reportArticleSchema = checkSchema({
  complaint: {
    in: 'body',
    customSanitizer: {
      options: complaint => complaint.trim()
    },
    isLength: {
      options: {
        min: 2
      },
      errorMessage: 'complaint is too short'
    }
  }
});

export default reportArticleSchema;
