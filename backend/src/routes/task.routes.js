const express = require("express");

const router = express.Router();

// Authentication middleware
const authenticate = require("../middleware/auth.middleware");


// Import controller 
const {createTask, getAllTasks} = require("../controllers/task.controller");

// Create a new task for authenticated user 
router.post("/", authenticate, createTask);
// Get all tasks for authenticated user
router.get("/", authenticate, getAllTasks);


module.exports = router;