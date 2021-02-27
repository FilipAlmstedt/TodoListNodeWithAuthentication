const User = require("../model/user");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

require("dotenv").config();

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NODEMAILER_USERMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

const renderResetPasswordGetEmailPage = (req, res) => {

    res.render("resetPasswordGetEmailForm.ejs", {err: ""}); 

}

const submitResetPasswordGetEmailPage = async (req, res) => {

    const email = req.body.email;
    const user = await User.findOne({email: email}); 

    if(!user) {
        req.flash('error', 'The account does not exists. Please try again!');
        return res.redirect("/resetPassword");
    }

    const token = await crypto.randomBytes(32).toString("hex");

    user.token = token;
    user.tokenExpirationDate = Date.now() + 36000000;
    await user.save();

    await transport.sendMail({
        from: process.env.NODEMAILER_USERMAIL,
        to: user.email,
        subject: "Reset your password",
        html: `<h2>Here's the link to reset your password. <a href="http://localhost:8000/resetPassword/${user.token}">Press here to reset!</a></h2>`
    }); 

    res.render("checkMail.ejs");


}

//Update the new password for the user
const submitResetPasswordFormPage = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findOne({email: email});
    
    user.password = hashedPassword;
    await user.save();

    req.flash('notify', 'Password has now been changed!')
    res.redirect("/login");

}

//Get params from the get email form and check if user exists
const resetPasswordParams = async (req, res) => {

    const token = req.params.token;

    try {
        const user = await User.findOne({token: token, tokenExpirationDate: {$gt: Date.now()} });

        if(!user){
            req.flash('error', 'Oops! Something went wrong! Please try again!');
            return res.redirect("/registerPassword");
        }

        res.render("resetPasswordForm.ejs", {err: "", email: user.email});
    } catch (err) {
        res.render("resetPasswordGetEmailForm.ejs", {err: ""})
    }

}

module.exports = {
    renderResetPasswordGetEmailPage,
    submitResetPasswordGetEmailPage,
    submitResetPasswordFormPage,
    resetPasswordParams
}