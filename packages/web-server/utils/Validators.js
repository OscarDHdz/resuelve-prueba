module.exports = {
  SUCCESS: {valid: true},

  isDefined: value => value !== undefined,
  getIsNotDefinedError: name => { return {valid: false, message: `'${name}' is not defined`} },

  isString: value => typeof value === 'string',
  getIsNotStringError: name => { return {valid: false, message: `'${name}' must be a string`} },

  hasMinLength: (min, value) => value.length >= min,
  getHasNotMinLengthError: (name, min) => { return {valid: false, message: `'${name}' must be at least ${min} char length`} },

  isArray: (value) => Array.isArray(value),
  getIsNotArrayError: name  => { return {valid: false, message: `'${name}' must be an Array`} },

  isNumber: value => typeof value === 'number',
  getIsNotNumberError: name => { return {valid: false, message: `'${name}' must be a number`} },

}