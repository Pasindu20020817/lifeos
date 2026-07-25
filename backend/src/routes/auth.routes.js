//Import express router
const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

//Import auth controller
const {register, login, getProfile,} = require("../controllers/auth.controller");

// Register route
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pasindu
 *               email:
 *                 type: string
 *                 example: pasindu@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/register", register);

// Login route
router.post("/login", login);

// Get profile route
router.get("/profile", authenticate, getProfile)

module.exports = router;