const jwt  = require("jsonwebtoken");
const config = require("config");


module.exports =  function(req, res , next){
    // get the token from 
    const token  = req.header('x-auth-token');


    
    // Check if not token 
    if(!token){
        return res.status(401).json({msg:'NO token , authorization denied'});
    }

    try {
        const decoded =  jwt.verify(token, config.get('jwtSecret'));

        req.user =  decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'token is not vaild' });
    }
                   
};