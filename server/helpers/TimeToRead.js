/**
 *
 *
 * @class TimeToRead
 */
class TimeToRead {
  /**
   * @static
   * @description a function to calculate the time to read an article
   * @param {string} article
   * @returns {string} timeToRead
   * @memberof TimeToRead
   */
  static readTime(article) {
    const timeToReadAverage = 250;

    const articleWordCount = article.content.split(' ').length;
    const timeToReadValue = articleWordCount / timeToReadAverage;

    return Math.ceil(timeToReadValue);
  }
}

export default TimeToRead;
