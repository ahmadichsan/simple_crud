const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require ('../config/key/verifyToken');
const sequelize = require('../config/db/Sequelize');
const models = require('../models/relation/relation');

/**
 * @route GET login/logintest
 * @desc Test Login Route
 * @access Public
 */

router.get('/logintest', (req, res) => {
    res.json({msg: 'Login route success'});
})
 
/**
 * @route POST login/login
 * @desc Test Login Route
 * @access Public
 */

router.post('/login', (req,res)=> {  
    var username = req.body.username;
    var password = req.body.password;

    sequelize.sync().then(() => {
        models.user.findAll({
            where : {
                username : username
            }
        })
        .then((result) => {
            // console.log(result[0].password)
            var dbpassword = result[0].password
            if (dbpassword === password) {
                jwt.sign({username}, 'secret', { expiresIn: '3600s' }, (err, token) => {
                    res.status(200).json({
                        token: 'Bearer ' + token
                    })
                }) 
            } else {
                res.status(401).json({msg: 'user data not found'})
            }
        })
    })
})

/**
 * @route GET login/protectiontest
 * @desc Test Login Protected Route
 * @access Private
 */

router.get('/protectiontest', verifyToken, (req, res) => {    
    jwt.verify(req.token, 'secret', (err, authData) => {
        (err) ? res.status(401).json({ msg: 'unauthorized' }) : res.json({ msg: 'login success', authData })
    })
})

module.exports = router;