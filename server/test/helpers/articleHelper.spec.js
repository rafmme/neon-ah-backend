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

  describe('generateSocialShareLink function test', () => {
    it('should successfully generate a twitter share link', (done) => {
      const twitterShareLink = ArticleHelper.generateSocialShareLink({
        platform: 'twitter',
        title: 'Hello World',
        url: 'https://test.com/hello',
        body: 'Greetings to the world',
        imageUrl:'https://imageUrl.com/img.jpg' 
      });

      expect(twitterShareLink).to.eql('https://twitter.com/share?url=https://test.com/hello&text=Hello World\nGreetings to the world...\nhttps://imageUrl.com/img.jpg\n');
      done();
    });

    it('should successfully generate a facebook share link', (done) => {
      const fbShareLink = ArticleHelper.generateSocialShareLink({
        platform: 'facebook',
        title: 'Hello World',
        url: 'https://test.com/hello',
        body: 'Greetings to the world',
        imageUrl:'https://imageUrl.com/img.jpg' 
      });

      expect(fbShareLink).to.eql('https://facebook.com/sharer.php?&u=https://test.com/hello');
      done();
    });

    it('should successfully generate a linkedIn share link', (done) => {
      const lInShareLink = ArticleHelper.generateSocialShareLink({
        platform: 'linkedIn',
        title: 'Hello World',
        url: 'https://test.com/hello',
        body: 'Greetings to the world',
        imageUrl:'https://imageUrl.com/img.jpg' 
      });

      expect(lInShareLink).to.eql('https://linkedin.com/shareArticle?&url=https://test.com/hello&title=Hello World&summary=Greetings to the world...');
      done();
    });

    it('should successfully generate a whatsapp share link', (done) => {
      const whatsappShareLink = ArticleHelper.generateSocialShareLink({
        platform: 'whatsapp',
        title: 'Hello World',
        url: 'https://test.com/hello',
        body: 'Greetings to the world',
        imageUrl:'https://imageUrl.com/img.jpg' 
      });

      expect(whatsappShareLink).to.eql('https://wa.me?text=*Hello World*\n```Greetings to the world...```\nhttps://test.com/hello');
      done();
    });

    it('should return empty string for unidentified social platform', (done) => {
      const emptyShareLink = ArticleHelper.generateSocialShareLink({});
      expect(emptyShareLink).to.eql('');
      done();
    });
  });
});
