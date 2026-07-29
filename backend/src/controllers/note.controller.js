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

/**
 * Get All Notes
 *
 * Returns only notes belonging to
 * the authenticated user.
 */
const getAllNotes = async (req, res) => {
  try {

    const notes = await prisma.note.findMany({

      where: {
        userId: req.user.userId,
      },

      orderBy: {
        createdAt: "desc",
      },

    });

    return res.status(200).json({
      success: true,
      count: notes.length,
      notes,
    });

  } catch (error) {

    console.error("Get Notes Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

/**
 * Get Single Note By ID
 */
const getNoteById = async (req, res) => {
  try {

    const { id } = req.params;

    const note = await prisma.note.findFirst({

      where: {
        id,
        userId: req.user.userId,
      },

    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      note,
    });

  } catch (error) {

    console.error("Get Note By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });

  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
};