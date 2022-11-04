// create USER object
class USER {
    constructor(id, username, firstname, lastname, email, password) {
        this.userID = id;
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
    // get methods
    getUserID() {
        return this.userID
    }
    getUsername() {
        return this.username;
    }
    getFirstname() {
        return this.firstname;
    }
    getLastname() {
        return this.lastname;
    }
    getEmail() {
        return this.email;
    }
    getPassword() {
        return this.password;
    }
    // set methods
    setUserID(id) {
        this.userID = id;
    }
    setUsername(username) {
        this.username = username;
    }
    setFirstname(firstname) {
        this.firstname = firstname;
    }
    setLastname(lastname) {
        this.lastname = lastname;
    }
    setEmail(email) {
        this.email = email;
    }
    setPassword(password) {
        this.password = password;
    }
}

// handles registration form
const registerForm = document.getElementById("register-form");

if(registerForm) registerForm.addEventListener('submit', registerUser);

function registerUser(e) {
    e.preventDefault();
    let firstname = document.getElementById("first-name").value;
    let lastname = document.getElementById("last-name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const user = new USER(firstname, lastname, email, password);
    user.setFirstname(firstname);
    user.setLastname(lastname);
    user.setEmail(email);
    user.setPassword(password);
    console.log(`First Name: ${user.getFirstname()}`);
    console.log(`Last Name: ${user.getLastname()}`);
    console.log(`Email: ${user.getEmail()}`);
    console.log(`Password: ${user.getPassword()}`);
    registerForm.innerHTML += `
        <p>Registration Sucessful!</p>
    `
}

// handles login form
const loginForm = document.getElementById("login-form");

if(loginForm) loginForm.addEventListener('submit', loginUser);

function loginUser(e) {
    e.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    const user = new USER(email, password);
    user.setEmail(email);
    user.setPassword(password);
    console.log(`Email: ${user.getEmail()}`);
    console.log(`Password: ${user.getPassword()}`);
    loginForm.innerHTML += `
        <p>Login Sucessful!</p>
    `
}

// create NOTE object
class NOTE {
    constructor(id, content) {
        this.noteID = id;
        this.content = content;
    }
    // get methods
    getNoteID() {
        return this.noteID
    }
    getContent() {
        return this.content;
    }
    // set methods
    setNoteID(id) {
        this.noteID = id;
    }
    setContent(content) {
        this.content = content;
    }
}

// handles note form
const noteForm = document.getElementById("note-form");

if(noteForm) noteForm.addEventListener('submit', addNote);

function addNote(e) {
    e.preventDefault();
    let content = document.getElementById("note").value;
    const note = new NOTE(content);
    note.setContent(content);
    console.log(`Note Content: ${note.getContent()}`);
    noteForm.innerHTML += `
        <p>Note Added!</p>
    `
}
