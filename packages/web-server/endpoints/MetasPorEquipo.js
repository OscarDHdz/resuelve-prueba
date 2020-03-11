const express = require('express');
const router = express.Router();
const TeamGoals = require('../models/TeamGoals');
const {HandleError} = require('../utils/ErrorHandler');

router.get('/team-goals', async (req, res) => {
  try {
    const teamsGoals = await TeamGoals.getAll();
    res.status(200).send(teamsGoals);
  } catch (e) {
    HandleError(e, res);
  }
});

router.get('/team-goals/:team', async (req, res) => {
  const team = req.params.team;
  try {
    const teamGoals = await TeamGoals.getByTeam(team);
    res.status(200).send(teamGoals);
  } catch (e) {
    HandleError(e, res);
  }
});
  
router.post('/team-goals', async (req, res) => {
  const data = req.body;
  try {
    const teamGoals = await TeamGoals.save(data);
    res.status(200).send(teamGoals);
  } catch (e) {
    HandleError(e, res);
  }
});

router.put('/team-goals/:team', async (req, res) => {
  const newGoals = req.body;
  const team = req.params.team;
  try {
    const newTeamGoals = await TeamGoals.update(team, newGoals);
    res.status(200).send(newTeamGoals);
  } catch (e) {
    HandleError(e, res);
  }
});

router.delete('/team-goals/:team', async (req, res) => {
  const team = req.params.team;
  try {
    await TeamGoals.delete(team);
    res.status(200).send();
  } catch (e) {
    HandleError(e, res);
  }
});



module.exports = router;