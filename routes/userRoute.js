const express = require("express");

//add controllers
const {registerSubmitNewAccount,renderRegisterPage} = require("../controller/registerAccountController");
const {renderLoginPage,submitLogin} = require("../controller/loginController");
const {renderResetPasswordGetEmailPage,submitResetPasswordGetEmailPage,submitResetPasswordFormPage,resetPasswordParams} = require("../controller/resetPassword");

const router = express.Router();

//Authentication routes
router.get("/register", renderRegisterPage);
router.post("/register", registerSubmitNewAccount);
router.get("/login", renderLoginPage);
router.post("/login", submitLogin);

router.get("/resetPassword", renderResetPasswordGetEmailPage);
router.post("/resetPassword", submitResetPasswordGetEmailPage);
router.get("/resetPassword/:token", resetPasswordParams);
router.post("/resetPasswordForm", submitResetPasswordFormPage);

module.exports = router;