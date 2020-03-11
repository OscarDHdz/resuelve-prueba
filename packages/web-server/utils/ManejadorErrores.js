const CODIGOS_ERROR = {
  400: {
    codigo: 400,
    mensaje: 'Problema al procesar los datos, revise los datos de entrada'
  },
  404: {
    codigo: 404,
    mensaje: 'Elemento no encontrado'
  },
  409: {
    codigo: 409,
    mensaje: 'Conflicto, ya existe un elemento con el identificador proporcionado'
  }
}

const ManejarError = (error, res) => {
  if (error.codigo && error.mensaje) {
    res.status(error.codigo).send(error);
  } else {
    res.status(500).send(error);
  }
}

module.exports = {ManejarError, CODIGOS_ERROR};