const express = require('express');
const router = express.Router();
const Salary = require('../models/Salary');
const {HandleError} = require('../utils/ErrorHandler');

/**
 * Calculate Players Salaries
 */
router.post('/salary', async (req, res) => {
  const data = req.body;
  try {
    const teamsData = await Salary(data).calculateSalaries();
    res.status(200).send(teamsData);
  } catch (e) {
    HandleError(e, res);
  }
});




module.exports = router;