import db from '../models';

const { Tag, ArticleTag } = db;

/**
 * @class TagHelper
 */
class TagHelper {
  /**
    * @static
    * @description a function to insert tags into the db
    * @param {number} articleId id for article
    * @param {object} arrayOfTags tags array
    * @returns {object} api route response with created article info
    */
  static async findOrAddTag(articleId, arrayOfTags) {
    const tagsAdded = [];
    const tagData = await Promise.all(arrayOfTags.map(name => Tag.findOrCreate({
      where: { name, },
      defaults: {
        name,
      }
    })));
    tagData.forEach(async (tag) => {
      await ArticleTag.create({
        articleId,
        tagId: tag[0].id,
      });
      tagsAdded.push(tag[0].id);
    });
    return tagsAdded;
  }
}
export default TagHelper;
