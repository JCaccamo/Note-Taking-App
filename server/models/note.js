const con = require("./db_connect");

async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS notes (
        noteID INT NOT NULL AUTO_INCREMENT,
        noteContent VARCHAR(5000) NOT NULL,
        userID INT NOT NULL,
        CONSTRAINT notePK PRIMARY KEY(noteID),
        CONSTRAINT noteFK FOREIGN KEY(noteID) references users(userID)
    );`
    await con.query(sql);
}
createTable();

// Grabbing all notes in the database
async function getAllNotes() {
    const sql = `SELECT * FROM notes;`;
    let notes = await con.query(sql);
    console.log(notes)
}

// Create Note
async function createNote(note) {
    const sql = `INSERT INTO notes (noteContent)
        VALUES ("${note.noteContent}");
    `
    await con.query(sql);
    return await readNote(note);
}

// Read Note
async function readNote(note) {
    let cNote = await getNote(note);

    if(!cNote[0]) throw Error("Note not found");

    return cNote[0];
}

// Update Note
async function editNote(note) {
    let sql = `UPDATE notes 
        SET noteContent = "${note.noteContent}"
        WHERE noteID = ${note.noteID}
    `;

    await con.query(sql);
    let updatedNote = await getNote(note);
    return updatedNote[0];
}

// Delete Note
async function deleteNote(note) {
    let sql = `DELETE FROM notes
        WHERE noteID = ${note.noteID}
    `
    await con.query(sql);
}

// Useful Functions
async function getNote(note) {
    let sql;
    if(note.noteID) {
        sql = `
            SELECT * FROM notes
            WHERE noteID = ${note.noteID};
        `
    } else {
        sql = `
            SELECT * FROM notes
            WHERE noteContent = "${note.noteContent}";
        `
    }
    return await con.query(sql);
}

module.exports = { getAllNotes, createNote, readNote, editNote, deleteNote };
