/**
 * Common Error codes
 * If request errors are being handled by the following 'HandleError' function,
 * you can throw any of these CODES. This will make the request respond with 
 * a common error message
 */
const ERROR_CODES = {
  400: {
    code: 400,
    message: 'Bad Input'
  },
  404: {
    code: 404,
    message: 'Element not found'
  },
  409: {
    code: 409,
    message: 'Conflict - an element with the given id already exists'
  }
}

/**
 * Handles any request error and resolves the respond
 * @param {{code: number, message: string}} error - Error data used for the response
 * @param {*} res - Express response objec
 */
const HandleError = (error, res) => {
  if (error && error.code && error.message) {
    res.status(error.code).send(error);
  } else {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = {HandleError, ERROR_CODES};