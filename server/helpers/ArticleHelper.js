import randomString from 'randomstring';
/**
 * @class ArticleHelper
 */
class ArticleHelper {
  /**
   * @static
   * @description a function for generating article slug
   * @param {string} title
   * @returns {string} returns the generated slug
   */
  static generateArticleSlug(title) {
    if (typeof title !== 'string' || title.trim() === '') {
      throw new TypeError('Passed in title argument is not valid, expects it to be a string');
    } else {
      const generatedRandomString = randomString.generate(8);
      const slug = `${title.trim().toLowerCase().replace(/[ ]+/g, '-')}-${generatedRandomString}`;
      return slug;
    }
  }
}

export default ArticleHelper;
