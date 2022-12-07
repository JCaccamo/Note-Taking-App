const con = require("./db_connect");

async function createNoteTable() {
    let sql = `CREATE TABLE IF NOT EXISTS notes (
        note_id INT NOT NULL AUTO_INCREMENT,
        content VARCHAR(5000) NOT NULL,
        user_id INT NOT NULL,
        CONSTRAINT note_pk PRIMARY KEY(note_id),
        CONSTRAINT note_fk FOREIGN KEY(note_id) REFERENCES users(user_id)
    );`
    await con.query(sql);
}
createNoteTable();

let getNotes = async () => {
    const sql = `SELECT * FROM notes;`;
    return await con.query(sql);
};
getNotes();

async function getNote(note) {
    let sql;
    if(note.noteId) {
        sql = `SELECT * FROM notes
            WHERE note_id = ${note.noteId};
        `
    } else {
        sql = `SELECT * FROM notes
            WHERE content = "${note.content}";
        `
    }
    return await con.query(sql);
}

async function noteExists(noteId) {
    const sql = `SELECT * FROM notes
        WHERE note_id = ${noteId};
    `;
    let u = await con.query(sql);
    console.log(u);
    return u;
}

// Read Note
async function readNote(noteId) {
    const note = await noteExists(noteId);
    if(!note[0]) throw Error("Note not found");
    return note[0];
}

// Update User
async function editNote(note) {
    const sql = `UPDATE notes SET
        content = "${note.content}"
        WHERE note_id = ${note.noteId};
    `;
    const update = await con.query(sql);
    const newNote = await getNote(note);
    return newNote[0];
}

// Delete User
async function deleteNote(noteId) {
    const sql = `DELETE FROM notes
        WHERE note_id = ${noteId};
    `;
    await con.query(sql);
}

module.exports = { getNotes, readNote, editNote, deleteNote };
