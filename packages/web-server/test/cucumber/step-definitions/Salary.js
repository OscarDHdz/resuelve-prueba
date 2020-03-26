const api = require('../../../server');
const request = require('supertest');

const mockPlayers = [  
  {  
     nombre: "Juan",
     nivel: "A",
     goles: 6,
     sueldo:  50000,
     bono:  25000,
     sueldo_completo: null,
     equipo: "rojo"
  },
  {  
     nombre: "Pedro",
     nivel: "B",
     goles: 7,
     sueldo:  50000,
     bono:  25000,
     sueldo_completo: null,
     equipo: "rojo"
  },
  {  
     nombre: "Martin",
     nivel: "C",
     goles: 16,
     sueldo:  50000,
     bono:  25000,
     sueldo_completo: null,
     equipo: "rojo"
  },
  {  
     nombre: "Luis",
     nivel: "Cuauh",
     goles: 19,
     sueldo:  50000,
     bono:  10000,
     sueldo_completo: null,
     equipo: "rojo"
  }
]

const calculatePlayersSalaries = async () => {

  const res = await request(api)
    .post('/_api/v1/salary')
    .send(mockPlayers);

  return res;
}

module.exports = {
  calculatePlayersSalaries
}