const express = require('express');
const router = express.Router();

/**configuration for JWT */
const jwt =require('jsonwebtoken');

/** authorization config*/
const verifyToken= require ('../config/key/verifyToken')

/** route for login validation
 * @desc login validation and sign json web token
 */

 
//The login section is to create a token using jwt 
router.post('/login', (req,res)=>{  
const userlogin = [
    {
        id : 'userid01',
        username : 'rathon',
        password : 'asdf1234'
    },
    {
        id : 'userid02',
        username : 'udin',
        password : 'mantap1234'
    }
]        
    var username =req.body.username;    
    var userpassword=req.body.password;    
    for(var i = 0; i<userlogin.length; i++){
        if(username === userlogin[i].username && userpassword === userlogin[i].password){
           console.log('berhasil masuk')      
                jwt.sign({userlogin}, 'secretkey', {expiresIn: '30s'}, (err, token)=>{
                   res.json({
                        token: `Bearer `+ token,
                        msg: `Login success`
                        })
                    });    
                  break;  
        } else if ( i === userlogin.length-1){
            console.log('gagal masuk')
        }
    }
})

// test section, first test for authorization
router.get('/testproteksi', verifyToken, (req, res) => {    
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if (err){
            res.sendStatus(403)
        }else{
            res.json({
                message: 'berhasil masuk',
                authData
            })
        }
    })
})

module.exports = router;