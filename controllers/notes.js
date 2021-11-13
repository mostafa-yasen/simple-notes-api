const generator = require('../utils/generator')
const model = require('../models/note.model')
const memStorage = require('../utils/memory.storage')

const Response = require('../models/response.model').Response

exports.getAllNotes = (req, res) => {
    let notes = memStorage.getValues(memStorage.storage)
    return res.status(200).send(new Response(200, null, notes))
}

exports.getOneNote = (req, res) => {
    const params = req.params
    const noteId = params.noteId
    let note = memStorage.storage.getItem(noteId)
    if (!note) {
        let msg = `Note ${noteId} does not exist`
        return res.status(404).send(new Response(404, 'NoteNotFound', null, msg, msg))
    }
    res.status(200).send(new Response(200, null, note, null, null))
}

exports.saveNote = (req, res) => {
    const body = req.body
    let title = body.title
    let content = body.content

    // Validate required parameters
    if (!title) {
        let msg = `Required parameter is missing: title`
        return res.status(417).send(new Response(417, 'ValidationError', null, msg, msg))
    }
    if (!content) {
        let msg = `Required parameter is missing: content`
        return res.status(417).send(new Response(417, 'ValidationError', null, msg, msg))
    }

    // Generate a sequence id
    let id = generator.generate()

    // Create a new note
    let note = new model.Note(id, title, content, 'Guest', new Date, null)

    // Save the note to the memory storage
    memStorage.storage.setItem(id, note)

    // Success response
    return res.status(201).send(new Response(201, null, note))
}

exports.updateNote = (req, res) => {
    const params = req.params
    let noteId = params.noteId
    let note = memStorage.storage.getItem(noteId)
    if (!note) {
        let msg = `Note ${noteId} does not exist`
        return res.status(404).send(new Response(404, 'NoteNotFound', null, msg, msg))
    }
    body = req.body
    title = body.title
    content = body.content
    if (!title) {
        let msg = `Title field can not be empty`
        return res.status(417).send(new Response(417, 'ValidationError', null, msg, msg))
    }
    if (!content) {
        let msg = `Content field can not be empty`
        return res.status(417).send(new Response(417, 'ValidationError', null, msg, msg))
    }
    note.title = title
    note.content = content
    note.modified = new Date()
    memStorage.storage.setItem(noteId, note)
    let msg = `Successfully updated note ${noteId}`
    res.status(200).send(new Response(200, null, note, msg, msg))
}

exports.deleteOneNote = (req, res) => {
    const params = req.params
    const noteId = params.noteId
    let note = memStorage.storage.getItem(noteId)
    if (!note) {
        let msg = `Note ${noteId} does not exist`
        return res.status(404).send(new Response(404, 'NoteNotFound', null, msg, msg))
    }
    memStorage.storage.removeItem(noteId)
    let msg = `Successfully deleted ${noteId}`
    res.status(200).send(new Response(200, null, null, msg, msg))
}

exports.deleteAllNote = (req, res) => {
    let keys = memStorage.getKeys(memStorage.storage)
    if (!keys.length) {
        let msg = `Not items found`
        return res.status(200).send(new Response(200, null, null, msg, msg))
    }
    for (let k of keys) {
        memStorage.storage.removeItem(k)
    }

    let msg = `All items deleted`
    return res.status(200).send(new Response(200, null, null, msg, msg))
}
