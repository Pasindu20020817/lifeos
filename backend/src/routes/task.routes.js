const express = require("express");

const router = express.Router();

// Authentication middleware
const authenticate = require("../middleware/auth.middleware");


// Import controller 
const {createTask,} = require("../controllers/task.controller");

/**
 * Create Task
 *
 * Protected Route
 */
router.post("/", authenticate, createTask);

module.exports = router;