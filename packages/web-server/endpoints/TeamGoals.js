const express = require('express');
const router = express.Router();
const TeamGoals = require('../models/TeamGoals');
const {HandleError} = require('../utils/ErrorHandler');
const auth = require('../middleware/auth');

/**
 * Fetch all team goals
 * Requires admin authorization
 */
router.get('/team-goals', auth.checkAdminAuth, async (req, res) => {
  try {
    const teamsGoals = await TeamGoals.getAll();
    res.status(200).send(teamsGoals);
  } catch (e) {
    HandleError(e, res);
  }
});

/**
 * Fecth the given team goals
 * Requires admin authorization
 */
router.get('/team-goals/:team', auth.checkAdminAuth, async (req, res) => {
  const team = req.params.team;
  try {
    const teamGoals = await TeamGoals.getByTeam(team);
    res.status(200).send(teamGoals);
  } catch (e) {
    HandleError(e, res);
  }
});

/**
 * Add team goals
 * Requires admin authorization
 */
router.post('/team-goals', auth.checkAdminAuth, async (req, res) => {
  const data = req.body;
  try {
    const validation = TeamGoals(data).validate();
    if (!validation.valid) {
      return HandleError({code: 400, message: validation.message}, res);
    }
    const teamGoals = await TeamGoals.save(data);
    res.status(200).send(teamGoals);
  } catch (e) {
    HandleError(e, res);
  }
});

/**
 * Update team goals by team name
 * Requires admin authorization
 */
router.put('/team-goals/:team', auth.checkAdminAuth, async (req, res) => {
  const newGoals = req.body;
  const team = req.params.team;
  try {
    
    const validation = TeamGoals({equipo: team, metas: newGoals}).validate();
    if (!validation.valid) {
      return HandleError({code: 400, message: validation.message}, res);
    }

    const newTeamGoals = await TeamGoals.update(team, newGoals);
    res.status(200).send(newTeamGoals);
  } catch (e) {
    HandleError(e, res);
  }
});

/**
 * Delete the given team goals
 * Requires admin authorization
 */
router.delete('/team-goals/:team', auth.checkAdminAuth, async (req, res) => {
  const team = req.params.team;
  try {
    await TeamGoals.delete(team);
    res.status(200).send();
  } catch (e) {
    HandleError(e, res);
  }
});

/**
 * Add multiple team goals
 * Requires admin authorization
 */
router.post('/team-goals/batch', auth.checkAdminAuth, async (req, res) => {
  const data = req.body;
  try {
    const result = await TeamGoals.saveBatch(data);
    res.status(200).send(result);
  } catch (e) {
    HandleError(e, res);
  }
});



module.exports = router;