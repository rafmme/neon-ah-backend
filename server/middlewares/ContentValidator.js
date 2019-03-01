import response from '../helpers/response';

const ContentValidate = (req, res, next) => {
  const { content } = req.body;
  if (content.trim().length > 0) {
    next();
  } else {
    return response(res, 400, 'failure', 'Comment content must not be empty', null, null);
  }
};

export default ContentValidate;
