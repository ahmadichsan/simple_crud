const express = require('express');
const router = express.Router();
const sequelize = require('../config/db/Sequelize');
const product_category = require('../models/product_category')

/**
 * @route GET product_category/test
 * @desc Test Product_Category Route
 * @access Public
 */

router.get('/prodcattest', (req, res) => {
    res.json({msg: 'Product category route success'});
})

module.exports = router;