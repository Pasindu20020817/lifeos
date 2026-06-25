//Import express router
const express = require("express");

const router = express.Router();

//Import auth controller
const {register} = require("../controllers/auth.controller");

// Register route
router.post("/register", register);

module.exports = router;