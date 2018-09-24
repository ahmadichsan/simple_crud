const express = require('express');
const router = express.Router();
const sequelize = require('../config/db/Sequelize');
const models = require('../models/relation/relation');

/**
 * @route GET product_category/prodcattest
 * @desc Test Product Category Route
 * @access Public
 */

router.get('/prodcattest', (req, res) => {
    res.json({msg: 'Product category route success'});
})

/**
 * @route GET product_category/readprodcat
 * @desc Read Product Category (product as source and category as target, through product_category model)
 * @access Private
 */

router.get('/readprodcat', (req, res) => {
    sequelize.sync().then(() => {
        models.product.findAll({
            include: [{
                model: models.category,
                required: true,
                attributes: ['category_name'] 
            }]
        })
        .then((result) => {
            (result.length !== 0) ? res.status(200).json(result) : res.status(400).json({msg: 'something wrong happened'})
        })
    })
})

/**
 * @route GET product_category/readcatprod
 * @desc Read Product Category (category as source and product as target, through product_category model)
 * @access Private
 */

router.get('/readcatprod', (req, res) => {
    sequelize.sync().then(() => {
        models.category.findAll({
            include: [{
                model: models.product,
                required: true,
                attributes: ['product_name'] 
            }]
        })
        .then((result) => {
            (result.length !== 0) ? res.status(200).json(result) : res.status(400).json({msg: 'something wrong happened'})
        })
    })
})

/**
 * @route POST product_category/updatecatprod
 * @desc Update Product Category, assumed that server recieved product_category id as the parameter for updating
 * or change the product category. This is means that user want to change exactly at selected product_id and category_id
 * @access Private
 */

router.post('/updatecatprod', (req, res) => {
    var product_category_id = req.body.product_category_id
    var new_category_id = req.body.new_category_id
    sequelize.sync().then(() => {
        models.product_category.update({
            category_id: new_category_id
        },
        {
            where: {
                id: product_category_id
            }
        })
        .then((result) => {
            var affectedRow = result[0]
            if (affectedRow === 0) res.status(412).json({msg: 'updating failed due to invalid product_category id value'})
            else res.status(200).json({msg: 'update success'})
        })
    })
})

/**
 * @route POST product_category/newprodcatrelation
 * @desc Create New Product Category, means that user want to add new relation between product_id and category_id
 * for an existing product_id
 * @access Private
 */

router.post('/newprodcatrelation', (req, res) => {
    var product_id = req.body.product_id
    var category_id = req.body.category_id
    sequelize.sync().then(() => {
        models.product_category.create({
            product_id: product_id,
            category_id: category_id
        })
        .then((result) => {
            if (result) res.status(200).json({ msg: 'update success' })
        })
        .catch((error) => {
            if (error) res.status(412).json({msg: 'creating failed due to invalid product_id/category_id value' })
        })
    })
})

/**
 * @route POST product_category/deleteprodcatrelation
 * @desc Delete Product Category, means that user want to delete one relation between product_id and category_id, deleting
 * will use product_category id as the parameter
 * @access Private
 */

router.post('/deletecertainrelation', (req, res) => {
    var prodcat_id = req.body.prodcat_id
    models.product_category.destroy({
        where: {
            id: prodcat_id
        }
    })
    .then((result) => {
        if (result) res.status(200).json({msg: 'deleting success'})
    })
})

module.exports = router;