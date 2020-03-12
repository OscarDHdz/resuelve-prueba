const express = require('express');
const router = express.Router();
const TeamGoals = require('../models/TeamGoals');
const {HandleError} = require('../utils/ErrorHandler');

router.post('/salary', async (req, res) => {
  try {
    res.status(500).send('Missing implementation');
  } catch (e) {
    HandleError(e, res);
  }
});




module.exports = router;