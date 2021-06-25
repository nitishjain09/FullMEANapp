const jwt = require("jsonwebtoken");


const checkToken = (req, res, next) => {

    //get token from req obj header
    let tokenWithBearer = req.headers.authorization;

    //if token does not exist
    if(tokenWithBearer === undefined){
        return res.send({ message: "Unauthorized access"});
    }
    //if token exists, verify
    else{
        let token = tokenWithBearer.split(" ")[1];
        jwt.verify(token, "abcdef", (err, decoded) => {
            if(err){
                return res.send({ message: "Session expired..login to continue.."});
            }
            else{
                next();
            }
        })
    }

}

module.exports = checkToken;