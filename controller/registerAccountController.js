const User = require("../model/user");
const bcrypt = require("bcrypt");

let errors = [];

const renderRegisterPage = async (req,res) => {

    res.render("registerAccount.ejs", {errors:""});

}

const registerSubmitNewAccount = async (req,res) =>  {
    errors = [];

    const {name,email,password} = req.body;

    //handling error in case the input is empty
    if(!req.body.name){
        errors.push(" Name is required!");
    }
    if(!req.body.email){
        errors.push(" Email is required!");
    }
    if(!req.body.password){
        errors.push(" Password is required!");
    }
    try {

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        await new User({
            name: name,
            email: email,
            password: hashedPassword
        }).save();

        req.flash('notify', 'Account was sucessfully created!');
        return res.redirect("/login");

    } catch (err) {
        
        if(errors) return res.render("registerAccount.ejs", {errors: errors})
        
    } 

}

module.exports = {
    registerSubmitNewAccount,
    renderRegisterPage
}