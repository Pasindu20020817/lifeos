const { z } = require("zod");

/**
 * Create Goal Validation Schema
 *
 * Rules:
 * - title required
 * - minimum 3 characters
 * - description optional
 * - targetDate optional
 */

const createGoalSchema = z.object({

  // Goal title
  title: z
    .string()
    .min(3, "Goal title must be at least 3 characters"),

  // Optional description
  description: z
    .string()
    .optional(),

  // Optional target completion date
  targetDate: z
    .string()
    .optional(),
});

module.exports = {
    createGoalSchema,
};