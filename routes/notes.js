const express = require('express')
const controllers = require('../controllers/notes')
const router = express.Router()

// Get All Notes
router.get('/notes', controllers.getAllNotes)

// Get One Note
router.get('/notes/:noteId', controllers.getOneNote)

// Save a Note
router.post('/notes', controllers.saveNote)

// Update a Note
router.put('/notes/:noteId/edit', controllers.updateNote)

// Delete a Note
router.delete('/notes/:noteId', controllers.deleteOneNote)

// Delete All Note
router.delete('/notes', controllers.deleteAllNote)

module.exports = router
