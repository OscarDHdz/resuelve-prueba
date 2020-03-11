const express = require('express');
const router = express.Router();
const MetasEquipo = require('../models/MetasEquipo');
const _ = require('lodash');

router.get('/metas_equipo', async (req, res) => {
  try {
    const metas_equipos = await MetasEquipo.obtenerTodas();
    res.status(200).send(metas_equipos);
  } catch (e) {
    res.status(400).send({error: e});
  }
});

router.get('/metas_equipo/:equipo', async (req, res) => {
  const equipo = req.params.equipo;
  try {
    const metas_equipo = await MetasEquipo.obtenerPorEquipo(equipo);
    res.status(200).send(metas_equipo);
  } catch (e) {
    res.status(400).send({error: e});
  }
});
  
router.post('/metas_equipo', async (req, res) => {
  const datos = req.body;
  try {
    const metas_equipo = await MetasEquipo.guardar(datos);
    res.status(200).send(metas_equipo);
  } catch (e) {
    res.status(400).send({error: e});
  }
});

router.put('/metas_equipo/:equipo', async (req, res) => {
  const metasNuevas = req.body;
  const equipo = req.params.equipo;
  try {
    const nuevas_metas_equipo = await MetasEquipo.actualizar(equipo, metasNuevas);
    res.status(200).send(nuevas_metas_equipo);
  } catch (e) {
    res.status(400).send({error: e});
  }
});

router.delete('/metas_equipo/:equipo', async (req, res) => {
  const equipo = req.params.equipo;
  try {
    await MetasEquipo.eliminar(equipo);
    res.status(200).send();
  } catch (e) {
    res.status(400).send({error: e});
  }
});



module.exports = router;