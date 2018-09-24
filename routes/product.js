const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require ('../config/key/verifyToken');
const sequelize = require('../config/db/Sequelize');
const models = require('../models/relation/relation');

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
              res.status(200).json(result)
          })
    })
})

/**
 * @route POST product/createproduct
 * @desc Create Product:
 * This API will execute three events:
 * 1. Insert new product name into product model
 * 2. Insert relation between product and its category in product_category model (relation between product_id and category_id)
 * The type of product_category data which recieved by server is number in string, ex: 1, 2, 4. Then, this input will be converted into array.
 * 3. Insert product code into product_code model (relation between product_id and product_code column). The product_code will
 * generate automatically. So, user only have to input the quantity of the product.
 * @access Private
 */ 

router.post('/createproduct', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(401).json({ msg: 'unauthorized' })
        } else {
            const product_name = req.body.product_name // for product model
            var product_category = req.body.product_category // for product_category model
            const product_quantity = req.body.product_quantity // for product_code model
            // console.log(product_name)
            // console.log(product_category)
            // console.log(product_quantity)
            
            sequelize.sync().then(() => {
                // This is the beginning of inserting new data into product model
                models.product.create({
                    product_name: product_name
                })
                .then((result) => {
                    const ProdCatCode = async () => {
                        const product_id = result.id
                        const prod_cat = product_category.split(', ')
                        // console.log(prod_cat)

                        // this is the beginning of creating relation between product_id and category_id in product_category model
                        const ForEachProdCat = (array) => {
                            for (var i = 0; i < array.length; i++) {
                                // console.log(array[i])
                                models.product_category.create({
                                    product_id: product_id,
                                    category_id: array[i],
                                });
                            };
                        }

                        // this is the beginning of creating product_code and insert it into product_code model
                        const ForEachProdCode = async (listed_code) => {
                            for (var k = 0; k < listed_code.length; k++) {
                                await models.product_code.create({
                                    product_id: product_id,
                                    product_code: listed_code[k]
                                })
                            }
                            res.status(200).json({msg: 'Insert Product, Product_Code and Product_Category Success'})
                        }

                        // product_code generator. Generate code first, then insert into product_code model by calling ForEachProdCode function
                        const code_generator = (quantity) => {
                            const code_maker = (last_code) => {
                                var sampel = '0000'
                                var code_list = []

                                var convertedLastCode = last_code

                                for (var i = 1; i <= quantity; i++) {
                                    var new_code = convertedLastCode + i
                                    var generated_code = new_code.toString()
                                    var convertedLength = generated_code.length
                                    var final_code = sampel.slice(0, (sampel.length - convertedLength)) + generated_code
                                    // console.log(generated_code)
                                    // console.log(convertedLength)
                                    // console.log(final_code)
                                    
                                    code_list.push(final_code)
                                }
                                ForEachProdCode(code_list)
                            }

                            models.product_code.findAll({
                                limit: 1,
                                order: [['id', 'DESC']],
                                attributes: ['product_code']
                            })
                            .then((result) => {
                                // console.log(result)
                                var get_last_code = (result.length === 0) ? 0 : result[0].product_code
                                // console.log(result[0].product_code)
                                // Note: check first, if this is the first data, then the last code is zero (0)

                                var last_code = parseInt(get_last_code, 10)
                                code_maker(last_code)
                            })
                        }

                        await ForEachProdCat(prod_cat)
                        code_generator(product_quantity)
                    }
                    ProdCatCode()
                })
            })
        }
    })
})

/**
 * @route GET product/readproduct
 * @desc Read Product Model only
 * @access Public
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
 * @desc Update Product Name only. If admin want to change the product category, open product_category.js route
 * @access Private
 */

router.post('/updateproduct', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(401).json({ msg: 'unauthorized' })
        } else {
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
        }
    })
})

/**
 * @route POST product/deleteproduct
 * @desc Delete Product. Delete product also delete all the item in product_code model, deleting data in product_category model
 * @access Private
 */

router.post('/deleteproduct', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.status(401).json({ msg: 'unauthorized' })
        } else {
            var product_id = req.body.product_id
            // console.log(product_id)
            
            sequelize.sync().then(() => {
                // delete product
                const deleteproduct = async () => {
                    // delete product_code
                    await models.product_code.destroy({
                        where: {
                            product_id: product_id
                        }
                    })

                    // delete product_category
                    await models.product_category.destroy({
                        where: {
                            product_id: product_id
                        }
                    })

                    await models.product.destroy({
                        where: {
                            id: product_id
                        }
                    })
                    .then((result) => {
                        var affectedRow = [{result}]
                        if (affectedRow[0].result === 0) res.status(412).json({msg: 'deleting failed due to invalid product id value'})
                        else res.status(200).json({msg: 'delete success'})
                    })
                }
                deleteproduct()
            })
        }
    })
})

/**
 * @route GET product/allproductinfo
 * @desc Get all product info, product name, product category, product code
 * @access Public
 */

router.get('/allproductinfo', (req, res) => {
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
              res.status(200).json(result)
          })
    })
})

module.exports = router;