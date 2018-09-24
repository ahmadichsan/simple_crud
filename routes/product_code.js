const express = require('express');
const router = express.Router();
const sequelize = require('../config/db/Sequelize');
const models = require('../models/relation/relation');

/**
 * @route GET product_code/test
 * @desc Test Product Code Route.
 * Note: Editing product code is not available since the product code was generated automatically
 * user add new product
 * @access Public
 */

router.get('/prodcodetest', (req, res) => {
    res.json({msg: 'Product code route success'});
})

/**
 * @route POST product_code/addnewitem
 * @desc Create Product Code: add new quantity into the product_code model from an existing product_id
 * @access Private
 */

router.post('/addnewitem', (req, res) => {
    sequelize.sync().then(() => {
        var product_id = req.body.product_id
        var product_quantity = req.body.product_quantity
        
        // this is the beginning of creating product_code and insert it into product_code model
        const ForEachProdCode = async (listed_code) => {
            for (var k = 0; k < listed_code.length; k++) {
                await models.product_code.create({
                    product_id: product_id,
                    product_code: listed_code[k]
                })
            }
            res.status(200).json({msg: 'Insert New Product_Code Success'})
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

        code_generator(product_quantity)
    })
    
})

/**
 * @route GET product_code/readproductcode
 * @desc Read Product Code: relation with the product name
 * @access Private
 */

router.get('/readproductcode', (req, res) => {
    sequelize.sync().then(() => {
        models.product_code.findAll({
            include: [{
                model: models.product,
                required: true,
                attributes: ['product_name']
            }]
        })
        .then((result) => {
            res.status(200).json(result)
        })
    })
})

/**
 * @route POST product_code/deleteitem
 * @desc Delete Product Code: delete several item (quantity as the input from user) from product_code from
 * the latest record with certain product_id
 * @access Private
 */

router.post('/deleteitem', (req, res) => {
    sequelize.sync().then(() => {
        var product_id = req.body.product_id
        var quantity = parseInt(req.body.quantity)
        
        models.product_code.findAll({
            where: {
                product_id: product_id
            },
            order: [['id', 'DESC']],
            limit: quantity
        })
        .then((result) => {
            // res.send(result[0])
            // console.log(result[0].id)

            const deleteitem = async () => {
                for (var i = 0; i < result.length; i++) {
                    await models.product_code.destroy({
                        where: {
                            id: result[i].id
                        }
                    })
                }
                res.status(200).json({ msg: 'success' })
            }
            deleteitem()
        })
    })
})

module.exports = router;