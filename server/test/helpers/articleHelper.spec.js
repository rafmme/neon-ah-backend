import { expect } from 'chai';
import ArticleHelper from '../../helpers/ArticleHelper';


describe('ArticleHelpers Test', () => {

  describe('generateArticleSlug function test', () => {
    it('it should successfully generate an article slug', (done) => {
      const firstSlugPattern = /how-to-train-your-dragon-[a-zA-Z0-9]{8}/i;
      const secondSlugPattern = /5-steps-to-learn-riding-a-bike-[a-zA-Z0-9]{8}/i;
      const firstArticleSlug = ArticleHelper.generateArticleSlug('How to train your dragon');

      const secondArticleSlug = ArticleHelper.generateArticleSlug(' 5 steps to learn riding a bike ');
      expect(firstSlugPattern.test(firstArticleSlug)).to.equals(true);
      expect(secondSlugPattern.test(secondArticleSlug)).to.equals(true);
      expect(typeof firstArticleSlug).to.be.equals('string');
      expect(typeof secondArticleSlug).to.be.equals('string');
      done();
    });

    it('it should throw an error if article title is invalid', (done) => {
      expect(() => ArticleHelper.generateArticleSlug(' ')).to
        .throw(TypeError, 'Passed in title argument is not valid, expects it to be a string');
      expect(() => ArticleHelper.generateArticleSlug(9)).to
        .throw(TypeError, 'Passed in title argument is not valid, expects it to be a string');
      expect(ArticleHelper.generateArticleSlug).to
        .throw(TypeError, 'Passed in title argument is not valid, expects it to be a string');
      done();
    });

    it('it should successfully generate different article slugs for same title', (done) => {
      const firstArticleSlug = ArticleHelper.generateArticleSlug('How to train your dragon');
      const secondArticleSlug = ArticleHelper.generateArticleSlug('How to train your dragon');
      expect(firstArticleSlug === secondArticleSlug).to.equals(false);
      expect(typeof firstArticleSlug).to.be.equals('string');
      expect(typeof secondArticleSlug).to.be.equals('string');
      done();
    });
  });
});
