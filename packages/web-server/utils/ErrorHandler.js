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
    message: 'Conflicto - an element with the given id already exists'
  }
}

const HandleError = (error, res) => {
  if (error.code && error.message) {
    res.status(error.code).send(error);
  } else {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = {HandleError, ERROR_CODES};