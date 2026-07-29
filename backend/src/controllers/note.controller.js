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

/**
 * Update Note
 */
const updateNote = async (req, res) => {

  try {

    const { id } = req.params;

    const { title, content } = req.body;

    // Find note owned by user
    const existingNote =
      await prisma.note.findFirst({

        where: {
          id,
          userId: req.user.userId,
        },

      });

    if (!existingNote) {

      return res.status(404).json({
        success: false,
        message: "Note not found",
      });

    }

    const updatedNote =
      await prisma.note.update({

        where: {
          id,
        },

        data: {
          title,
          content,
        },

      });

    return res.status(200).json({

      success: true,
      message: "Note updated successfully",

      note: updatedNote,

    });

  } catch (error) {


    console.error("Update Note Error:", error);

    return res.status(500).json({

      success: false,
      message: "Internal Server Error",

    });

  }

};

/**
 * Delete Note
 */
const deleteNote = async (req, res) => {

  try {

    const { id } = req.params;

    // Check ownership
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

    await prisma.note.delete({

      where: {
        id,
      },

    });

    return res.status(200).json({

      success: true,
      message: "Note deleted successfully",

    });

  } catch (error) {

    console.error("Delete Note Error:", error);

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
  updateNote,
  deleteNote,
};