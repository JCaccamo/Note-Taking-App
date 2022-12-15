import { fetchData, setCurrentUser } from './main.js'

// create User object
class User {
    constructor(id, firstname, lastname, email, password) {
        this.userId = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
    // get methods
    getUserId() {
        return this.userId
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
    setUserId(id) {
        this.userId = id;
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

// register functionality
let registerForm = document.getElementById("register-form");
if(registerForm) registerForm.addEventListener('submit', register);

function register(e) {
    e.preventDefault();

    let firstname = document.getElementById("first-name").value;
    let lastname = document.getElementById("last-name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = new User(firstname, lastname, email, password);

    fetchData("/users/register", user, "POST")
    .then((data) => {
        setCurrentUser(data);
        window.location.href = "note-page.html";
    })
    .catch((err) => {
        let p = document.querySelector('.error');
        p.innerHTML = err.message;
    })
}

// login functionality
let loginForm = document.getElementById("login-form");
if(loginForm) loginForm.addEventListener('submit', login);

function login(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = new User(email, password);

    fetchData("/users/login", user, "POST")
    .then((data) => {
        setCurrentUser(data);
        window.location.href = "note-page.html";
    })
    .catch((err) => {
        let p = document.querySelector('.error');
        p.innerHTML = err.message;
    })
}
