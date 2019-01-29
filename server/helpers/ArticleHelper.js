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

  /**
   * @static
   * @description a function for filtering an array of articles
   * @param {array} arrayOfArticles
   * @param {string} filteringOption { tag or drafts or published }
   * @param {string} tagKeyword tag word
   * @returns {array} returns the the filtered array
   */
  static filterAuthorArticle(arrayOfArticles, filteringOption, tagKeyword) {
    let filteredArray = [];
    switch (filteringOption) {
      case 'tag':
        filteredArray = arrayOfArticles
          .filter(articleArray => articleArray.tags
            .map(tag => tag.toLowerCase())
            .indexOf(tagKeyword.toLowerCase()) !== -1);
        return filteredArray;
      case 'drafts':
        filteredArray = arrayOfArticles.filter(articleArray => articleArray.isPublished === false);
        return filteredArray;
      case 'published':
        filteredArray = arrayOfArticles.filter(articleArray => articleArray.isPublished === true);
        return filteredArray;
      default:
        return arrayOfArticles;
    }
  }
  
  /**
   * @static
   * @description a function for generating social share link
   * @param {object} contentData
   * @returns {string} returns the social share link
   */
  static generateSocialShareLink(contentData) {
    let shareLink = '';
    const {
      platform,
      title,
      body,
      url,
      imageUrl
    } = contentData;
    switch (`${platform}`.toLowerCase()) {
      case 'twitter':
        shareLink = `https://twitter.com/share?url=${url}&text=${title}\n${body.slice(0, 25)}...\n${imageUrl}\n`;
        break;
      case 'facebook':
      case 'fb':
        shareLink = `https://facebook.com/sharer.php?&u=${url}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me?text=*${title}*\n\`\`\`${body.slice(0, 300)}...\`\`\`\n${url}`;
        break;
      case 'linkedin':
        shareLink = `https://linkedin.com/shareArticle?&url=${url}&title=${title}&summary=${body.slice(0, 300)}...`;
        break;
      default:
        shareLink = '';
        break;
    }
    return shareLink;
  }
}

export default ArticleHelper;
