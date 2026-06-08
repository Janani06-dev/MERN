
const jwt =  require("jsonwebtoken");
require('dotenv').config();

const verifyToken = (req,res,next)=>{
    let headers = req.headers.authorization;
    let accessToken = headers.split(" ")[1];
    if(!accessToken){
        res.status(400).json({"message": " accessToken not found"})
    }

    jwt.verify(accessToken, process.env.JWT_SECRET_TOKEN, (err, decoded)=>{
        if(err) {
            res.status(403).json({"message": "Invalid access token"})
        } 

            req.user = decoded;
            next();
    })

}

module.exports =  verifyToken;