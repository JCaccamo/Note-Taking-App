import { fetchData, getCurrentUser, setCurrentUser, removeCurrentUser } from "./main.js";
  
let user = getCurrentUser(); 
if(!user) window.location.href = "login-page.html";
console.log(user);

let userId = user.userId; 
console.log(userId);

let note = { userId: userId}

fetchData("/notes/", note, "GET")

// edit functionality
let editForm = document.getElementById("edit-form");
if(editForm) editForm.addEventListener('submit', editUser);

function editUser(e) {
    e.preventDefault();

    let email = document.getElementById('email').value;
    user.email = email;

    fetchData("/users/edit", user, "PUT")
    .then((data) => {
        setCurrentUser(data)
        window.location.href = "profile-page.html"
    })
    .catch((err)=> {
        let p = document.querySelector('.error');
        p.innerHTML = err.message;
    })
}

// delete functionality
let deleteBtn = document.getElementById("delete-account");
if(deleteBtn) deleteBtn.addEventListener('click', deleteAccount);

function deleteAccount() {
    if(confirm("Are you sure you want to delete your account?")) {
        fetchData("/users/delete", user, "DELETE")
        .then((data) => {
            removeCurrentUser();
        })
        .catch((err) => {
            let p = document.querySelector('.error');
            p.innerHTML = err.message;
        })
    } 
}
