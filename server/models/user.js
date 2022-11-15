const users = [
    {
        userID: 00001,
        username: "JCaccamo",
        password: "jason123"
    },
    {
        userID: 00002,
        username: "Spongebob",
        password: "jellyfishing123"
    },
    {
        userID: 00003,
        username: "Patrick",
        password: "annoysquidward123"
    }
]

let getUsers = () => users;

function login(user) {
    let currentUser = users.filter( u => u.username === user.username );
    if(!currentUser[0]) throw Error("Incorrect username");
    if(!currentUser[0].password !== user.password) throw Error("Incorrect password");
    return currentUser[0];
}

module.exports = { getUsers };
