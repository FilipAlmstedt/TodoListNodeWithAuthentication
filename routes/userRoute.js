const express = require("express");

//add controllers
const {registerSubmitNewAccount,renderRegisterPage} = require("../controller/registerAccountController");
const {renderLoginPage,submitLogin} = require("../controller/loginController");

const router = express.Router();

router.get("/register", renderRegisterPage);
router.post("/register", registerSubmitNewAccount);
router.get("/login", renderLoginPage);
router.post("/login", submitLogin);

module.exports = router;