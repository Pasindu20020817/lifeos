const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {createNoteSchema, } = require("../validations/note.validation");
const {createNote, getAllNotes, getNoteById, } = require("../controllers/note.controller");

//Create Note
router.post("/", authenticate, validate(createNoteSchema), createNote );
//Get All Notes
router.get("/", authenticate, getAllNotes );
//Get Note By ID
router.get("/:id", authenticate, getNoteById );

module.exports = router;