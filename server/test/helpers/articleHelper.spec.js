import { expect } from 'chai';
import ArticleHelper from '../../helpers/ArticleHelper';
import mockArticles from '../mockData/dummyArticleData';


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

  describe('filterAuthorArticle function test', () => {
    it('should successfully filter an array of articles by matching tag', (done) => {
      const filteredArray = ArticleHelper.filterAuthorArticle(mockArticles[6], 'tag', 'welcome');
      expect(filteredArray.length).to.eql(2);
      done();
    });

    it('should return an array of articles not published', (done) => {
      const filteredArray = ArticleHelper.filterAuthorArticle(mockArticles[6], 'drafts');
      expect(filteredArray.length).to.eql(2);
      done();
    });

    it('should return an array of articles that has been published', (done) => {
      const filteredArray = ArticleHelper.filterAuthorArticle(mockArticles[6], 'published');
      expect(filteredArray.length).to.eql(5);
      done();
    });

    it('should return the same array of articles if no params is passed', (done) => {
      const filteredArray = ArticleHelper.filterAuthorArticle(mockArticles[6]);
      expect(filteredArray).to.eql(mockArticles[6]);
      done();
    });
  });
});
