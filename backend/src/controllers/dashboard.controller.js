const prisma = require("../config/prisma");

/**
 * Dashboard Summary
 *
 * Returns statistics for
 * the authenticated user.
 */
const getDashboard = async (req, res) => {

  try {

    const userId = req.user.userId;

    /**
     * Total Goals
     */
    const totalGoals = await prisma.goal.count({
        where: {
          userId,
        },
      });


    /**
     * Completed Goals
     */
    const completedGoals = await prisma.goal.count({
        where: {
          userId,
          status: "COMPLETED",
        },
      });


    /**
     * Total Tasks
     */
    const totalTasks = await prisma.task.count({
        where: {
          userId,
        },
      });


    /**
     * Completed Tasks
     */
    const completedTasks = await prisma.task.count({
        where: {
          userId,
          status: "COMPLETED",
        },
      });


    /**
     * Total Notes
     */
    const totalNotes = await prisma.note.count({
        where: {
          userId,
        },
      });

    return res.status(200).json({
      success: true,

      stats: {

        totalGoals,
        completedGoals,

        totalTasks,
        completedTasks,

        totalNotes,

      },

    });

  } catch (error) {

    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }

};

module.exports = {
  getDashboard,
};

