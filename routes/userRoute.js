const express = require("express");

//add controllers
const {registerSubmitNewAccount,renderRegisterPage} = require("../controller/registerAccountController");
const {renderLoginPage,submitLogin} = require("../controller/loginController");
const {renderResetPasswordGetEmailPage,submitResetPasswordGetEmailPage,submitResetPasswordFormPage,resetPasswordParams} = require("../controller/resetPasswordController");

const router = express.Router();

//Authentication routes

//add account 
router.get("/register", renderRegisterPage);
router.post("/register", registerSubmitNewAccount);

//login with account
router.get("/login", renderLoginPage);
router.post("/login", submitLogin);

//render and submit the users email for resetting password
router.get("/resetPassword", renderResetPasswordGetEmailPage);
router.post("/resetPassword", submitResetPasswordGetEmailPage);

// change the password
router.get("/resetPassword/:token", resetPasswordParams);
router.post("/resetPasswordForm", submitResetPasswordFormPage);

module.exports = router;