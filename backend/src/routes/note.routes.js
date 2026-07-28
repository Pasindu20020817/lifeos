const express = require("express");

const router = express.Router();

const authenticate =
  require("../middleware/auth.middleware");

const validate =
  require("../middleware/validate.middleware");

const {
  createNoteSchema,
} = require("../validations/note.validation");

const {
  createNote,
} = require("../controllers/note.controller");

/**
 * Create Note
 */
router.post(
  "/",
  authenticate,
  validate(createNoteSchema),
  createNote
);

module.exports = router;