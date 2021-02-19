const jwt = require("jsonwebtoken");
require("dotenv").config();
let errors = []

const verifyToken = (req,res,next) => {

    const token = req.cookies.jwtToken;
    if(!token) {
        res.render("login.ejs", {errors})
    }

    const validUser = jwt.verify(token, process.env.SECRET_KEY);
    if(validUser) {
        req.user = validUser;
    }
    
    next();

}

module.exports = verifyToken;

