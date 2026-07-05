//Import Prisma client to interact with the database
const prisma = require("../config/prisma");

/**
 * Create a new task
 *
 * Route:
 * POST /api/tasks
 */
const createTask = async (req, res) => {
    try {

        // Get task details from request body
        const {
            title,
            description,
            priority,
            dueDate,
        } =  req.body;

        // Validate required field
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        /**
        * Create task in database
        *
        * Notice:
        * We DO NOT receive userId from the frontend.
        * We get it from the authenticated user (JWT).
        */
       const task = await prisma.task.create({
        data: {
            title,
            description,
            priority,
            dueDate: dueDate ? new Date(dueDate) : null,

            // Owner of the task 
            userId: req.user.userId,
        },
       });

       return res.status(201).json({
        success: true,
        message: "Task created successfully",
        task,
       });
    } catch (error) {
        console.error("Create Task Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createTask,
}