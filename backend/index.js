const express = require("express");
const cors = require("cors");

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

app.get("/", (req, res) => {
  res.send("LifeOS API is running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

