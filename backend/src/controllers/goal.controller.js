const prisma = require("../config/prisma");

/**
 * Create Goal
 *
 * Creates a goal for
 * the authenticated user.
 */
const createGoal = async (req, res) => {

    try {
        // Extract data from request body
        const {
            title,
            description,
            targetDate,
        } = req.body;

        // Create goal
        const goal = await prisma.goal.create({
            data: {
                title,
                description,
                targetDate: targetDate ? new Date(targetDate): null,

                //Goal belongs to logged-in user
                userId: req.user.userId,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Goal created successfully",
            goal,
        });

    } catch (error){
        console.error("Create Goal Error: ", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * Get All Goals
 *
 * Returns all goals belonging
 * to the authenticated user.
 */
const getAllGoals = async (req, res) => {
    try{
        const goals = await prisma.goal.findMany({
            where: {
                userId: req.user.userId,
            },

            orderBy: {
                createdAt: "desc",
            },

        });

        return res.status(200).json({
            success: true,
            count: goals.length,
            goals,
        });

    } catch (error){
        console.error("Get All Goals Error: ", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
};

/**
 * Get Goal By ID
 *
 * Returns a single goal
 * belonging to the authenticated user.
 */
const getGoalById = async (req, res) => {
    try{

        //Get goal ID from URL
        const { id } = req.params;

        //Find goal owned by logged-in user
        const goal = await prisma.goal.findFirst({
            where: {
                id,
                userId: req.user.userId,
            },

            //include related tasks
            include: {
                tasks: {
                    select: {
                        id: true,
                        title: true,
                        status: true,
                        priority: true,
                        dueDate: true,
                    },
                },
            },
        });

        //Goal not found
        if (!goal){
            return res.status(404).json({
                success: false,
                message: "Goal not found",
            });
        }

        //Total tasks in goal
        const totalTasks = goal.tasks.length;

        // Completed tasks
        const completedTasks = goal.tasks.filter(task => task.status === "COMPLETED").length;

        /* Progress percentage
           Example:
           2 completed / 4 total = 50%
        */
        const progress = totalTasks === 0 ? 0 : Math.round(
            (completedTasks / totalTasks) * 100
        );

        return res.status(200).json({
            success: true,
            goal,

            status: {
                totalTasks,
                completedTasks,
                progress,
            },
        });

    } catch (error) {
        console.error("Get Goal By ID Error: ", error);

        return res.status(500).json ({
            success: false,
            message: "Internal Server  Error",
        });
    }
};


/**
 * Update Goal
 *
 * Updates a goal owned
 * by the authenticated user.
 */
const updateGoal = async (req, res) => {

    try  {
        
        // Get Goal ID from URL
        const { id } = req.params;

        // Get data from request body
        const {
            title,
            description,
            status,
            targetDate,
        } = req.body;

        /**
        * Check ownership
        */
        const existingGoal = await prisma.goal.findFirst({
            where: {
                id,
                userId: req.user.userId,
            },
        });

        if (!existingGoal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found",
            });
        }

        // Update goal
        const updatedGoal = await prisma.goal.update({
            where: {
                id,
            },

            data: {
                title,
                description,
                status,
                targetDate:
                   targetDate ? new Date(targetDate): undefined,
            },
        });

        return res.status(200).json ({
            success: true,
            message: "Goal updated successfully",
            goal: updatedGoal,
        });

    } catch (error) {
        console.error("Update Goal Error: ", error);
        
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

/**
 * Delete Goal
 *
 * Deletes a goal owned by
 * the authenticated user.
 */
const deleteGoal = async (req, res) => {
    try {

        //Goal ID from URL
        const { id} = req.params;
         
        /**
        * Check if goal exists
        * and belongs to user
        */
        const goal = await prisma.goal.findFirst({
            where: {
                id,
                userId: req.user.userId,
            },
        });

        if (!goal) {
            return res.status(404).json({
                success: false,
                message: "Goal not found",
            });
        }

        // Delete goal
        await prisma.goal.delete({
            where: {
                id,
            },
        });

        return res.status(200).json({
            success: true,
            message: "Goal deleted successfully",
        });

    } catch (error) {
        console.error("Delete Goal Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createGoal,
    getAllGoals,
    getGoalById,
    updateGoal,
    deleteGoal,
};