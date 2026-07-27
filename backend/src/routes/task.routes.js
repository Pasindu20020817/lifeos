const express = require("express");

const router = express.Router();

// Authentication middleware
const authenticate = require("../middleware/auth.middleware");


// Import controller 
const {createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../controllers/task.controller");

//Import validation middleware
const validate = require("../middleware/validate.middleware");
const {createTaskSchema, } = require("../validations/task.validation");

// Create a new task for authenticated user 
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Build LifeOS
 *               description:
 *                 type: string
 *                 example: Complete backend development
 *               priority:
 *                 type: string
 *                 enum:
 *                   - LOW
 *                   - MEDIUM
 *                   - HIGH
 *               dueDate:
 *                 type: string
 *                 example: 2026-08-01
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, validate(createTaskSchema), createTask);

// Get all tasks for authenticated user
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks for the logged-in user
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getAllTasks);

// Get a single task by ID for the authenticated user
/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task retrieved successfully
 *       404:
 *         description: Task not found
 */
router.get("/:id", authenticate, getTaskById);

// Update a task by ID for authenticated user
/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put("/:id", authenticate, updateTask);

// Delete a task by ID for authenticated user
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Tasks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete("/:id", authenticate, deleteTask);


module.exports = router;