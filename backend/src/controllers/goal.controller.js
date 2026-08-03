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

module.exports = {
    createGoal,
};