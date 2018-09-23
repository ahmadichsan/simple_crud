const express = require('express');
const router = express.Router();
// const sequelize = require('../config/db/Sequelize');
// const category = require('../models/category')

/**
 * @route GET api/category/test
 * @desc Test Category Route
 * @access Public
 */

router.get('/categorytest', (req, res) => {
    res.json({msg: 'category route success'});
  })

module.exports = router;