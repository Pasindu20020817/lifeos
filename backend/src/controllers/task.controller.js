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

/**
 * ==========================================
 * Get All Tasks
 * Route:
 * GET /api/tasks
 * ==========================================
 */
const getAllTasks = async (req, res) => {
    try {
      /**
      * Find all tasks that belong
      * to the logged-in user.
      */  
     const tasks = await prisma.task.findMany({
        // only  this user's tasks
        where: {
            userId: req.user.userId,
        },

        // Newest tasks first
        orderBy: {
            createdAt: "desc",
        }
     });

     return res.status(200).json({
        success: true,
        count: tasks.length,
        tasks,
     });

    } catch (error) {
        console.error("Get All Tasks Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * ==========================================
 * Get Single Task
 * Route:
 * GET /api/tasks/:id
 * ==========================================
 */
const getTaskById = async (req, res) => {
    try {
        
        // Task ID from URL
        const {id} = req.params;

        const task = await prisma.task.findFirst({
            where: {
                id,
                userId: req.user.userId,
            },
        });

        // Task not found
        if(!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            task,
        });

    } catch (error) {
        console.error("Get Task Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * ==========================================
 * Update Task
 * Route:
 * PUT /api/tasks/:id
 * ==========================================
 */
const updateTask = async (req, res) => {
    try {
        
        // Task ID from URL
        const {id} = req.params;

        // Data from request body
        const {
            title,
            description,
            status,
            priority,
            dueDate,
        } = req.body;

        /**
         * First check whether task exists
        * and belongs to the logged-in user
        */
       const existingTask = await prisma.task.findFirst({
        where: {
            id,
            userId: req.user.userId,
        },
       });

       if(!existingTask) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
       }

       /**
        * Update task
        */
       const updatedTask = await prisma.task.update({
        where: {
            id,
        },
        data: {
            title,
            description,
            status,
            priority,
            dueDate: dueDate ? new Date(dueDate) : null,
        },
       });

       return res.status(200).json ({
        success: true,
        message: "Task updated successfully",
        task: updatedTask,
       });

    } catch (error) {
        console.error("Update Task Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

/**
 * ==========================================
 * Delete Task
 * Route:
 * DELETE /api/tasks/:id
 * ==========================================
 */
const deleteTask = async (req, res) => {
    try {

        // Get task ID from URL
        const {id} = req.params;

        /**
        * Check if task exists
        * and belongs to logged-in user
        */
       const existingTask = await prisma.task.findFirst({
        where: {
            id,
            userId: req.user.userId,
        },
       });

       if(!existingTask) {
        return res.status(404).json({
            success: false,
            message: "Task not found",
        });
       }

       /**
        * Delete task
        */
       await prisma.task.delete({
        where: {
            id,
        },
       });

       return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
       });

    } catch (error) {
        console.error("Delete Task Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}