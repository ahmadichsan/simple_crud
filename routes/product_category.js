const express = require('express');
const router = express.Router();
const sequelize = require('../config/db/Sequelize');
const models = require('../models/relation/relation')

/**
 * @route GET product_category/test
 * @desc Test Product Category Route
 * @access Public
 */

router.get('/prodcattest', (req, res) => {
    res.json({msg: 'Product category route success'});
})

/**
 * @route POST product_category/createproductcategory
 * @desc Test Product Category Route
 * @access Public
 */

router.post('/createprodcat', (req, res) => {
    var product_id = req.body.product_id;
    var category_id = req.body.category_id;
    // console.log(product_id)
    // console.log(category_id)

    // find the product and category first, then create the data in product category model
    
    sequelize.sync().then(() => {
        models.product_category.create({
            product_id: product_id,
            category_id: category_id
        })
        .then((result) => {
            if (result)
            {
                res.status(200).json({msg: 'Insert Product Success'})
            }
        })
    })
})

module.exports = router;