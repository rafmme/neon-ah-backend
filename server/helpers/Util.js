/**
 * @class Util
 */
class Util {
  /**
   * @static
   * @description a function for extracting error messages returned by express-validator
   * @param {object} errors array of errors objects
   * @returns {object} returns object with error messages
   */
  static extractErrorMessages(errors) {
    const error = {
      hasError: false,
      errorMessages: {},
    };

    if (errors === false || typeof errors !== 'object') {
      return error;
    }
    if (errors.length >= 1) {
      errors.forEach((err) => {
        error.errorMessages[err.param] = err.msg;
      });

      error.hasError = true;
      return error;
    }
  }

  /**
   * @static
   * @description a function to remove extra whitespace from a string
   * @param {string} text
   * @returns {string} returns string with no extra whitespace
   */
  static removeExtraWhitespace(text) {
    const sanitizedText = text.trim().replace(/[ ]+/g, ' ');
    return sanitizedText;
  }

  /**
   * @static
   * @description a function for splitting a word into an array of strings
   * @param {string} text
   * @returns {object} returns an array of strings
   */
  static createArrayOfStrings(text) {
    const tagText = `${text}`;
    const arrayOfStrings = tagText.trim().split(',').map(str => this.removeExtraWhitespace(str));
    return arrayOfStrings;
  }

  /**
   * @static
   * @description a function for formatting the date
   * @param {string} dateString
   * @returns {string} returns the date in formatted string
   */
  static formatDate(dateString) {
    const date = `${new Date(dateString).toDateString()} ${new Date(dateString).toLocaleTimeString()}`;
    return date;
  }

  /**
   * @static
   * @description a function to ascertain if a resource exists
   * @param {object} model Model to check for resource existence
   * @param {object} data
   * @returns {object} returns resource if true or null otherwise
   */
  static async resourceExists(model, data) {
    const resource = await model.findOne({
      where: data
    });
    return resource;
  }
}

export default Util;
