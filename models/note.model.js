exports.Note = class Note {
    constructor(noteId, title, content, owner, created, modified) {
        this.noteId = noteId
        this.title = title
        this.content = content
        this.owner = owner
        this.created = created
        this.modified = modified
    }
}
