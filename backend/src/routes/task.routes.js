const express = require("express");

const router = express.Router();

// Authentication middleware
const authenticate = require("../middleware/auth.middleware");


// Import controller 
const {createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../controllers/task.controller");

// Create a new task for authenticated user 
router.post("/", authenticate, createTask);
// Get all tasks for authenticated user
router.get("/", authenticate, getAllTasks);
// Get a single task by ID for the authenticated user
router.get("/:id", authenticate, getTaskById);
// Update a task by ID for authenticated user
router.put("/:id", authenticate, updateTask);
// Delete a task by ID for authenticated user
router.delete("/:id", authenticate, deleteTask);


module.exports = router;