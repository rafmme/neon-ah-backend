import { expect } from 'chai';
import Util from '../../helpers/Util';



describe('Util helpers functions test', () => {
  describe('removeExtraWhitespace function', () => {
    it('should successfully clean extra whitespace', (done) => {
      const sanitizedString = Util.removeExtraWhitespace(' May the force be with      you ');
      expect(sanitizedString).to.eqls('May the force be with you');
      done();
    })
  });

  describe('createArrayOfStrings function', () => {
    it('should create an array of string from a text', (done) => {
      const arrayOfStrings = Util.createArrayOfStrings('AI, Technology, Business');
      expect(arrayOfStrings[0]).to.eqls('AI');
      expect(arrayOfStrings[1]).to.eqls('Technology');
      expect(arrayOfStrings[2]).to.eqls('Business');
      done();
    })
  });

  describe('Util helpers functions test', () => {
    describe('removeExtraWhitespace function', () => {
      it('should successfully clean extra whitespace', (done) => {
        const sanitizedString = Util.removeExtraWhitespace(' May the force be with      you ');
        expect(sanitizedString).to.eqls('May the force be with you');
        done();
      });
    });
  
    describe('createArrayOfStrings function', () => {
      it('should create an array of string from a text', (done) => {
        const arrayOfStrings = Util.createArrayOfStrings('AI, Technology, Business');
        expect(arrayOfStrings[0]).to.eqls('AI');
        expect(arrayOfStrings[1]).to.eqls('Technology');
        expect(arrayOfStrings[2]).to.eqls('Business');
        done();
      });
    });

    describe('extractErrorMessages function', () => {
      const errors = [
        {
          location: 'body',
          param: 'title',
          msg: 'Article title missing',
          value: undefined
        },
        {
          location: 'body',
          param: 'title',
          msg: 'Article title missing',
          value: undefined
        },
        {
          location: 'body',
          param: 'content',
          msg: 'Article content is missing',
          value: undefined
        },
        {
          location: 'body',
          param: 'content',
          msg: 'Article content is missing',
          value: undefined
        }];

      it('should return hasError as false if no object', (done) => {
        const { hasError, errorMessages } = Util.extractErrorMessages();
        expect(hasError).to.eqls(false);
        expect(Object.keys(errorMessages).length).to.eqls(0);
        done();
      });

      it('should return hasError as false', (done) => {
        const { hasError, errorMessages } = Util.extractErrorMessages(false);
        expect(hasError).to.eqls(false);
        expect(Object.keys(errorMessages).length).to.eqls(0);
        done();
      });

  
      it('should return errorMessages object ', (done) => {
        const { hasError, errorMessages } = Util.extractErrorMessages(errors);
        expect(hasError).to.eqls(true);
        expect(typeof errorMessages).to.eqls('object');
        done();
      });
    });
  });

  describe('formatDate function', () => {
    it('should return right date ', (done) => {
      const formattedDate = Util.formatDate('2019-01-17 05:23:41');
      expect(formattedDate).to.eqls('Thu Jan 17 2019 5:23:41 AM');
      done();
    });
  });
});
