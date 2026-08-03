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


/**
 * Update Goal Validation
 *
 * All fields optional because
 * user may update only one field.
 */
const updateGoalSchema = z.object({

  // Optional title
  title: z
    .string()
    .min(3,"Goal title must be at least 3 characters")
    .optional(),

  // Optional description
  description: z
    .string()
    .optional(),

  // Optional status
  status: z
    .enum([
      "NOT_STARTED",
      "IN_PROGRESS",
      "COMPLETED",
    ])
    .optional(),

  // Optional target date
  targetDate: z
    .string()
    .optional(),

});

module.exports = {
    createGoalSchema,
    updateGoalSchema,
};