// Load variables from the local .env file.
// On Render, environment variables come from the Render dashboard.
require("dotenv").config();

// Import Express framework
const express = require("express");

// Import CORS middleware
const cors = require("cors");

// Import authentication routes
const authRoutes = require("./src/routes/auth.routes");

// Import task routes
const taskRoutes = require("./src/routes/task.routes");

// Import note routes
const noteRoutes = require("./src/routes/note.routes");

// Import goal routes
const goalRoutes = require("./src/routes/goal.routes");

// Import dashboard routes
const dashboardRoutes = require("./src/routes/dashboard.routes");

// Import global error handler middleware
const errorHandler = require("./src/middleware/error.middleware");

// Import Swagger UI
const swaggerUi = require("swagger-ui-express");

// Import Swagger specification
const swaggerSpec = require("./src/docs/swagger");

// Import Prisma client
const prisma = require("./src/config/prisma");

// Create Express application
const app = express();

/**
 * ==============================
 * Global Middleware
 * ==============================
 */

// Allow requests from other origins.
// Later, when the React frontend is deployed,
// we can restrict this to only the frontend URL.
app.use(cors());

// Allow Express to read JSON request bodies.
app.use(express.json());

/**
 * ==============================
 * API Routes
 * ==============================
 */

// Authentication routes
// Example: /api/auth/login
app.use("/api/auth", authRoutes);

// Task routes
// Example: /api/tasks
app.use("/api/tasks", taskRoutes);

// Note routes
// Example: /api/notes
app.use("/api/notes", noteRoutes);

// Goal routes
// Example: /api/goals
app.use("/api/goals", goalRoutes);

// Dashboard routes
// Example: /api/dashboard
app.use("/api/dashboard", dashboardRoutes);

/**
 * ==============================
 * Swagger Documentation
 * ==============================
 */

// Swagger documentation will be available at:
// /api-docs
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/**
 * ==============================
 * Health / Root Route
 * ==============================
 */

// Simple route to check whether the API is running.
app.get("/", (req, res) => {
  res.send("LifeOS API is running 🚀");
});

/**
 * ==============================
 * Global Error Handler
 * ==============================
 *
 * Important:
 * This should come AFTER all normal routes.
 *
 * If an error is passed using next(error),
 * Express sends it here.
 */
app.use(errorHandler);

/**
 * ==============================
 * Server Startup
 * ==============================
 */

// Render automatically provides process.env.PORT.
//
// When running locally, PORT will fall back to 5000.
const PORT = process.env.PORT || 5000;

/**
 * Start the application only after
 * successfully connecting to PostgreSQL.
 */
async function startServer() {
  try {
    // Connect Prisma to PostgreSQL.
    await prisma.$connect();

    console.log("✅ Database connected successfully");

    /**
     * Render requires the web service
     * to listen on host 0.0.0.0.
     */
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    // If the database connection fails,
    // show the error and stop the application.
    console.error("❌ Database connection failed:");
    console.error(error);

    process.exit(1);
  }
}

// Start LifeOS backend.
startServer();