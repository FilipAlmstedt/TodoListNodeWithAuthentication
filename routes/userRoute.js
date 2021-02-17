const express = require("express");

//add controllers
const {registerSubmitNewAccount,renderRegisterPage} = require("../controller/registerAccountController");

const router = express.Router();

router.get("/register", renderRegisterPage);

router.post("/register", registerSubmitNewAccount);

module.exports = router;