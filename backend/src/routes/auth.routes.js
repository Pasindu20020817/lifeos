//Import express router
const express = require("express");

const router = express.Router();

//Import auth controller
const {register, login,} = require("../controllers/auth.controller");

// Register route
router.post("/register", register);
// Login route
router.post("/login", login);

module.exports = router;