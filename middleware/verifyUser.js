const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req,res,next) => {

    const token = req.cookies.jwtToken;
    if(!token ) {
        res.render("login.ejs", {err: "Login unsucessful! Please try again!"})
    }

    const validUser = jwt.verify(token, process.env.SECRET_KEY);
    if(validUser) {
        req.user = validUser;
    }
    
    next();

}

module.exports = verifyToken;

