const express = require('express');
const router = express.Router();
const sequelize = require('../config/db/Sequelize');
const product = require('../models/product')

/**
 * @route GET api/product/test
 * @desc Test Product Route
 * @access Public
 */

router.get('/test', (req, res) => {
    res.json({msg: 'Dashboard route success'});
  })

/**
 * @route GET api/product/create
 * @desc Create Product
 * @access Private
 */

router.post('/addproduct', (req, res) => {
    var product_name = req.body.product_name
    // console.log(product_name)
    
    sequelize.sync().then(() => {
        product.create({
            product_name: product_name
        })
        .then((result) => {
            if (result)
            {
                // category.findAll().then((results) => {
                //     res.send(results)
                // })
                // console.log(result)
                res.status(200).send('Insert Product Success')
            }
        })
    })
})

router.get('/allproduct', (req, res) => {
    sequelize.sync().then(() => {
        product.findAll()
        .then((results) => {
            res.status(200)
            .send(results)
        })
    })
})

router.post('/updateproduct', (req, res) => {
    var new_product_name = req.body.new_product_name
    var product_id = req.body.product_id
    // console.log(product_name)
    // console.log(product_id)
    
    sequelize.sync().then(() => {
        product.update({
            product_name: new_product_name
        },
        {
            where: {
                id: product_id
            }
        })
        .then((result) => {
            if (result)
            {
                res.status(200).send('Update Product Success')
            }
        })
    })
})

// router.get('/category', (req, res) => {
//     sequelize.sync().then(() => {
//         category.update({
//             category_name: 'Sepatu Bola'
//         },
//         {
//             where: {
//                 category_name: 'Baju Baru'
//             }
//         }
//         ).then((result) => {
//             if (result)
//             {
//                 category.findAll().then((results) => {
//                     res.send(results)
//                 })
//             }
//         })
//     })
// })

module.exports = router;