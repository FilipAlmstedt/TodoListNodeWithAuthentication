const jwt = require("jsonwebtoken");
require("dotenv").config();
let errors = [];

//Check if user is logged in with a jwtToken, if no token exists, redirect to login page, otherwise, get the user data and store i token
const verifyToken = (req,res,next) => {

    const token = req.cookies.jwtToken;

    try {
        const validUser = jwt.verify(token, process.env.SECRET_KEY);
        if(validUser) {
            req.user = validUser;
        }
        
        next();
        
    } catch (err) {
        if(!token) {
            res.render("login.ejs", {errors})
        }
    }

}

module.exports = verifyToken;

