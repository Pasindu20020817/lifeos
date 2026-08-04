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

    // Goall completion percentage
    const  goalCompletionRate = totalGoals === 0 ? 0 : Math.round(
        (completedGoals / totalGoals) * 100
    );

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

    // Task completion percentage
    const taskCompletionRate = totalTasks === 0 ? 0 : Math.round(
        (completedTasks / totalTasks) * 100
    );


    /**
     * Total Notes
     */
    const totalNotes = await prisma.note.count({
        where: {
          userId,
        },
      });

    /**
    * Latest 5 tasks
    */
    const recentTasks = await prisma.task.findMany({
        where: {
            userId,
        },

        orderBy: {
            createdAt: "desc",
        },

        take: 5,

        select: {
            id: true,
            title: true,
            status: true,
            priority: true,
            createdAt: true,
        },
    });


    /**
    * Latest 5 notes
    */
    const recentNotes = await prisma.note.findMany({
        where: {
            userId,
        },

        orderBy: {
            createdAt: "desc",
        },

        take: 5,

        select: {
            id: true,
            title: true,
            createdAt: true,
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

        taskCompletionRate,
        goalCompletionRate,

      },

      recentTasks,
      recentNotes,

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

