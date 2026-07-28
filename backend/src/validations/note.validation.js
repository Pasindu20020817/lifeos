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

module.exports = {
  createNoteSchema,
};