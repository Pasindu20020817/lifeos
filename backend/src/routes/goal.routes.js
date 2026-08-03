const express = require("express");

const router = express.Router();

// Authentication middleware
const authenticate = require("../middleware/auth.middleware");

// Validation middleware
const validate = require("../middleware/validate.middleware");

// Goal validation schema
const {createGoalSchema,} = require("../validations/goal.validation");

// Goal controller
const {createGoal,} = require("../controllers/goal.controller");

/**
 * POST /api/goals
 *
 * Create Goal
 */
router.post("/", authenticate, validate(createGoalSchema),createGoal);

module.exports = router;