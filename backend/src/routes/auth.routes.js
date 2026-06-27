//Import express router
const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

//Import auth controller
const {register, login, getProfile,} = require("../controllers/auth.controller");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Get profile route
router.get("/profile", authenticate, getProfile)

module.exports = router;