/**
 * Utility for hanndling data type validations
 * For each type you'd have:
 *  - Validator - Validates the given value
 *  - Validator Error Getter - It returns a common message for the given validator
 */

module.exports = {
  SUCCESS: {valid: true},

  /**
   * Checks if value is different than 'undefined'
   * @param {*} value
   */
  isDefined: value => value !== undefined,
  /**
   * Returns a common error for this type of error
   * @param {string} name - variable name used to build the error message
   */
  getIsNotDefinedError: name => { return {valid: false, message: `'${name}' is not defined`} },

  /**
   * Checks if value type is string
   * @param {*} value
   */
  isString: value => typeof value === 'string',
  /**
   * Returns a common error for this type of error
   * @param {string} name - variable name used to build the error message
   */
  getIsNotStringError: name => { return {valid: false, message: `'${name}' must be a string`} },

  /**
   * Checks if value length is greater or equal than the given 'min'
   * @param {number} min - minimun expected string length used in the validtion. 
   * @param {*} value
   */
  hasMinLength: (min, value) => value.length >= min,
  /**
   * Returns a common error for this type of error
   * @param {string} name - variable name used to build the error message
   * @param {number} min - minimun expected string length used in the validtion. Used to build the error message
   */
  getHasNotMinLengthError: (name, min) => { return {valid: false, message: `'${name}' must be at least ${min} char length`} },

  /**
   * Checks if value type is Array
   * @param {*} value
   */
  isArray: (value) => Array.isArray(value),
  /**
   * Returns a common error for this type of error
   * @param {string} name - variable name used to build the error message
   */
  getIsNotArrayError: name  => { return {valid: false, message: `'${name}' must be an Array`} },

  /**
   * Checks if value type if number
   * @param {*} value
   */
  isNumber: value => typeof value === 'number',
  /**
   * Returns a common error for this type of error
   * @param {string} name - variable name used to build the error message
   */
  getIsNotNumberError: name => { return {valid: false, message: `'${name}' must be a number`} },

}