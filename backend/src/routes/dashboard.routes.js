const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const { getDashboard, } = require("../controllers/dashboard.controller");

/**
 * GET /api/dashboard
 *
 * Dashboard statistics
 */
router.get("/", authenticate, getDashboard);

module.exports = router;