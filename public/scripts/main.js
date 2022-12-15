let nav = document.querySelector('nav');

if(getCurrentUser()) {
    nav.innerHTML = `
    <div class="navbar-title">
        <p>Note Taking App</p>
    </div>
    <div>
        <a href="note-page.html">Notes</a>
        <a href="profile-page.html">Profile</a>
        <a id="logout-btn">Logout</a>
    </div>
    `
} else {
    nav.innerHTML = `
    <div class="navbar-title">
        <p>Note Taking App</p>
    </div>
    <div>
        <a href="note-page.html">Notes</a>
        <a href="register-page.html">Register</a>
        <a href="login-page.html">Login</a>
    </div>
    `
}

// Fetch method implementation:
export async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
        method: methodType, // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
        return await response.json(); // parses JSON response into native JavaScript objects
    } else {
        throw await response.json();
    }
}

// logout event listener
let logout = document.getElementById("logout-btn");
if(logout) logout.addEventListener('click', removeCurrentUser)

// stateful mechanism for user
// function for getting the current user
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

// function for logging in a user
export function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// function for logging out the current user
export function removeCurrentUser() {
    localStorage.removeItem('user');
    window.location.href = "login-page.html";
}
