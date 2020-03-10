const express = require('express');
const router = express.Router();
const controller = require('../controllers/Metas');
const {MetasEquipo} = require('../models/MetasEquipo');
const _ = require('lodash');

const fs = require('fs');
  

router.post('/metas_equipos', async (req, res) => {

  const data = req.body;
  // Setear metas por equipo
  const metas_equipos = data.map(metas => new MetasEquipo(_.pick(metas, ['equipo', 'metas'])));
  // Guardar metas por equipos (persistente)
  fs.writeFile('db/metas_equipos.json', JSON.stringify(metas_equipos), () => {
    // Responder con estado actual de metas por equipo
    res.status(200).send(metas_equipos);
  });


});

module.exports = router;