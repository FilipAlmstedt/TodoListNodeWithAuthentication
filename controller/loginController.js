const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

let errors = [];

const renderLoginPage = async (req,res) => {

    res.render("login.ejs", {errors: errors});

}

const submitLogin = async (req,res) => {
    //reset the error messages
    errors = [];

    //get data from login.ejs
    const {email, password} = req.body;

    //in case the user don't type anything in the input tags.
    //Solution for error messages for empty email/password values
    if(!email){
        errors.push(" Please type in an email address!");
    }
    if(!password){
        errors.push(" Please type in a password!");
    }
    if(!email || !password){
        res.render("login.ejs", {errors:errors});
    }

    try {

        //Find if a user exists with email
        const user = await User.findOne({email:email});

        //If not , go to regsiter
        if(!user) {
            req.flash('error', 'Email does not exists here, please create an account!')
            return res.redirect("/login");
        }

        //Compare hashed passwords, if they are not the same, go to login, user is not valid 
        const validUser = await bcrypt.compare(password, user.password);
        if(!validUser) {
            req.flash('error', 'Password incorrect!');
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

    } catch (err) {
        if(errors){
            return res.render("login.ejs", {errors: errors});
        }
    }
}

module.exports = {
    renderLoginPage,
    submitLogin
}