//Autorization : Bearer <access_token>
module.exports = verifyToken = (req,res, next)=>{
    //get auth header value
    const bearerHeader=req.headers['authorization'];
    // check if bearear is undefined
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //get token from  array
        const bearearToken = bearer[1];
        //set the token
        req.token = bearearToken;
        //next middleware
        next();
    }else{
        //access forbiden 
        res.sendStatus(403);
    }
}