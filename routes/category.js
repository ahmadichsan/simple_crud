const express = require('express');
const router = express.Router();
const sequelize = require('../config/db/Sequelize');
const category = require('../models/category')

/**
 * @route GET api/category/test
 * @desc Test Category Route
 * @access Public
 */

router.get('/test', (req, res) => {
    res.json({msg: 'Dashboard route success'});
  })

router.get('/category', (req, res) => {
    sequelize.sync().then(() => {
        category.update({
            category_name: 'Sepatu Bola'
        },
        {
            where: {
                category_name: 'Baju Baru'
            }
        }
        ).then((result) => {
            if (result)
            {
                category.findAll().then((results) => {
                    res.send(results)
                })
            }
        })
    })
})

module.exports = router;