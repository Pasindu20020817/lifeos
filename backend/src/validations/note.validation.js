const {z} = require('zod');

/**
 * Validation for creating notes
 */
const createNoteSchema = z.object({

  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  content: z
    .string()
    .min(1, "Content is required"),

});

/**
 * Update Note Validation
 *
 * All fields optional
 * because user may update
 * only title or only content.
 */
const updateNoteSchema = z.object({

  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .optional(),

  content: z
    .string()
    .min(1, "Content cannot be empty")
    .optional(),

});

module.exports = {
  createNoteSchema,
  updateNoteSchema,
};