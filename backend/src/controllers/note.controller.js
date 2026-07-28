const prisma = require("../config/prisma");

/**
 * Create Note
 */
const createNote = async (req, res) => {

  try {

    const { title, content } = req.body;

    const note = await prisma.note.create({

      data: {

        title,
        content,

        // Get user from JWT
        userId: req.user.userId,

      },

    });

    return res.status(201).json({

      success: true,
      message: "Note created successfully",

      note,

    });

  } catch (error) {

    console.error("Create Note Error:", error);

    return res.status(500).json({

      success: false,
      message: "Internal Server Error",

    });

  }

};

module.exports = {
  createNote,
};