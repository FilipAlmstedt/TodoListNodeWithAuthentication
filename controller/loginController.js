const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const renderLoginPage = async (req,res) => {

    res.render("login.ejs", {err:""});

}

const submitLogin = async (req,res) => {

    //get data from login.ejs
    const {email, password} = req.body;

    //Find if a user exists with email
    const user = await User.findOne({email:email});

    //If not , go to regsiter
    if(!user) {
        return res.redirect("/register");
    }

    //Compare hashed passwords, if they are not the same, go to login, user is not valid 
    const validUser = await bcrypt.compare(password, user.password);
    if(!validUser) {
        return res.redirect("/login");
    }

    //Create token
    const jwtToken = await jwt.sign({user:user}, process.env.SECRET_KEY);
    if(jwtToken) {
        //Get cookie
        const cookie = req.cookies.jwtToken;
        // if no cookie exists, create it with the token
        if(!cookie) {
            res.cookie("jwtToken", jwtToken, {maxAge:360000000, httpOnly:true} );
        }
        return res.redirect("/");
    }
    return res.redirect("/login");
}

module.exports = {
    renderLoginPage,
    submitLogin
}