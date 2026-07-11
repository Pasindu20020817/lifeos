const { z } = require("zod");

/**
 * Task Creation Validation Schema
 *
 * Rules:
 * - title required
 * - title minimum 3 characters
 * - description optional
 * - priority optional
 * - dueDate optional
 */
const createTaskSchema = z.object({

  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .optional(),

  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),

  dueDate: z
    .string()
    .optional(),

});

module.exports = {
  createTaskSchema,
};