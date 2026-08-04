const express = require("express");
const cors = require("cors");

//Import auth routes
const authRoutes = require("./src/routes/auth.routes");
// Import task routes
const taskRoutes = require("./src/routes/task.routes");
//Import the error handler middleware
const errorHandler = require("./src/middleware/error.middleware");

//Import swagger documentation
const swaggerUi = require("swagger-ui-express");
//Import swagger specification
const swaggerSpec = require("./src/docs/swagger");

//Import note routes
const noteRoutes = require("./src/routes/note.routes");
//Import goal routes
const goalRoutes = require("./src/routes/goal.routes");
//Import dashboard routes
const dashboardRoutes = require("./src/routes/dashboard.routes");

//////////////////////////////////////////////////////////////
//temporerly for testing prisma connection
const prisma = require("./src/config/prisma");

// Test database connection
async function testDB() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error);
  }
}
testDB();
///////////////////////////////////////////////////////////////

const app = express();

app.use(cors());
app.use(express.json());

// All auth routes start with /api/auth
app.use("/api/auth", authRoutes);
// All task routes start with /api/tasks
app.use("/api/tasks", taskRoutes);
// All note routes start with /api/notes
app.use("/api/notes", noteRoutes);
// All goal routes start with /api/goals
app.use("/api/goals", goalRoutes);
// Dashboard route
app.use("/api/dashboard", dashboardRoutes);

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("LifeOS API is running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



//Global error handler 
app.use(errorHandler);





