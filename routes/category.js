const express = require('express');
const router = express.Router();
const sequelize = require('../config/db/Sequelize');
const models = require('../models/relation/relation')

/**
 * @route GET api/category/test
 * @desc Test Category Route
 * @access Public
 */

router.get('/categorytest', (req, res) => {
    res.json({msg: 'category route success'});
  })

/** Note:
 * Category data inserted directly in the database, so in this route only contain API to see the list of category
 */

/**
 * @route GET api/category/readcategory
 * @desc Read Category
 * @access Private
 */

router.get('/readcategory', (req, res) => {
    sequelize.sync().then(() => {
      models.category.findAll()
      .then((results) => {
        res.status(200).json(results)
      })
  })
})

module.exports = router;