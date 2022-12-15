import { fetchData } from './main.js'

// create Note object
class Note {
    constructor(id, content) {
        this.noteId = id;
        this.content = content;
    }
    // get methods
    getNoteId() {
        return this.noteId
    }
    getContent() {
        return this.content;
    }
    // set methods
    setNoteId(id) {
        this.noteId = id;
    }
    setContent(content) {
        this.content = content;
    }
}

// create functionality
let noteForm = document.getElementById("note-form");
if(noteForm) noteForm.addEventListener('submit', createNote);

function createNote(e) {
    e.preventDefault();

    let content = document.getElementById("note").value;
    let note = new Note(content);
    fetchData("/notes/create", note, "POST")
    .then((data) => {
        window.location.href = "note-page.html";
    })
    .catch((err) => {
        let p = document.querySelector('.error');
        p.innerHTML = err.message;
    })
}
