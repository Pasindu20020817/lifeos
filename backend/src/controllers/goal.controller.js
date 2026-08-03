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
        });

        //Goal not found
        if (!goal){
            return res.status(404).json({
                success: false,
                message: "Goal not found",
            });
        }

        return res.status(200).json({
            success: true,
            goal,
        });

    } catch (error) {
        console.error("Get Goal By ID Error: ", error);

        return res.status(500).json ({
            success: false,
            message: "Internal Server  Error",
        });
    }
};

module.exports = {
    createGoal,
    getAllGoals,
    getGoalById,
};