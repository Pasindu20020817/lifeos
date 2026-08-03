const express = require("express");

const router = express.Router();

// Authentication middleware
const authenticate = require("../middleware/auth.middleware");

// Validation middleware
const validate = require("../middleware/validate.middleware");

// Goal validation schema
const {createGoalSchema,} = require("../validations/goal.validation");

// Goal controller
const {createGoal, getAllGoals, getGoalById,} = require("../controllers/goal.controller");

// Create Goal
router.post("/", authenticate, validate(createGoalSchema),createGoal);
//Get All Goals
router.get("/", authenticate, getAllGoals);
//Get Goal by ID
router.get("/:id", authenticate, getGoalById);

module.exports = router;