const express = require('express');
const router = express.Router();
const sequelize = require('../config/db/Sequelize');
const models = require('../models/relation/relation')

/**
 * @route GET product/test
 * @desc Test Product Route, this section was written for the sake of understanding Sequelize with join query
 * @access Public
 */

router.get('/product_test1', (req, res) => {
    // res.json({msg: 'Product route success'});
    // left join product_code with product
    sequelize.sync().then(() => {
        models.product_code.findAll({
            include: [{
              model: models.product
            }]
          })
          .then((result) => {
              res.json(result)
          })
    })
})

router.get('/product_test2', (req, res) => {
    // res.json({msg: 'Product route success'});
    // inner join product with product_code with certain selected column for product_code table
    sequelize.sync().then(() => {
        models.product.findAll({
            include: [{
              model: models.product_code,
              required: true,
              attributes: ['product_code']
            }]
          })
          .then((result) => {
              res.json(result)
          })
    })
})

router.get('/product_test3', (req, res) => {
    // res.json({msg: 'Product route success'});
    // left join product with category
    sequelize.sync().then(() => {
        models.product.findAll({
            include: [{
              model: models.category
            }]
          })
          .then((result) => {
              res.json(result)
          })
    })
})

router.get('/product_test4', (req, res) => {
    // res.json({msg: 'Product route success'});
    // left join category with product
    sequelize.sync().then(() => {
        models.category.findAll({
            include: [{
              model: models.product
            }]
          })
          .then((result) => {
              res.json(result)
          })
    })
})

router.get('/product_test5', (req, res) => {
    // res.json({msg: 'Product route success'});
    // inner join category with product and product code
    sequelize.sync().then(() => {
        models.product.findAll({
            include: [{
              model: models.category,
              required: true,
              attributes: ['category_name']
            }, {
                model: models.product_code,
                required: true,
                attributes: ['product_code']
            }]
          })
          .then((result) => {
              res.json(result)
          })
    })
})

/**
 * @route POST product/createproduct
 * @desc Create Product
 * @access Private
 */

router.post('/createproduct', (req, res) => {
    var product_name = req.body.product_name
    // console.log(product_name)
    
    sequelize.sync().then(() => {
        models.product.create({
            product_name: product_name
        })
        .then((result) => {
            if (result)
            {
                res.status(200).json({msg: 'Insert Product Success'})
            }
        })
    })
})

/**
 * @route GET product/readproduct
 * @desc Read Product
 * @access Private
 */

router.get('/readproduct', (req, res) => {
    sequelize.sync().then(() => {
        models.product.findAll()
        .then((results) => {
            res.status(200)
            .json(results)
        })
    })
})

/**
 * @route POST product/updateproduct
 * @desc Update Product
 * @access Private
 */

router.post('/updateproduct', (req, res) => {
    var new_product_name = req.body.new_product_name
    var product_id = req.body.product_id
    // console.log(product_name)
    // console.log(product_id)
    
    sequelize.sync().then(() => {
        models.product.update({
            product_name: new_product_name
        },
        {
            where: {
                id: product_id
            }
        })
        .then((result) => {
            var affectedRow = result[0]
            if (affectedRow === 0) res.status(412).json({msg: 'updating failed due to invalid product id value'})
            else res.status(200).json({msg: 'update success'})
        })
    })
})

/**
 * @route POST product/deleteproduct
 * @desc Delete Product
 * @access Private
 */

router.post('/deleteproduct', (req, res) => {
    var product_id = req.body.product_id
    // console.log(product_id)
    
    sequelize.sync().then(() => {
        models.product.destroy({
            where: {
                id: product_id
            }
        })
        .then((result) => {
            var affectedRow = [{result}]
            if (affectedRow[0].result === 0) res.status(412).json({msg: 'deleting failed due to invalid product id value'})
            else res.status(200).json({msg: 'delete success'})
        })
    })
})

module.exports = router;