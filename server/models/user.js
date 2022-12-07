const con = require("./db_connect");

async function createUserTable() {
    let sql = `CREATE TABLE IF NOT EXISTS users (
        user_id INT NOT NULL AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE,
        user_password VARCHAR(255) NOT NULL,
        CONSTRAINT user_pk PRIMARY KEY(user_id)
    );`
    await con.query(sql);
}
createUserTable();

let getUsers = async () => {
    const sql = `SELECT * FROM users;`;
    return await con.query(sql);
};
getUsers();

async function getUser(user) {
    let sql;
    if(user.userId) {
        sql = `SELECT * FROM users
            WHERE user_id = ${user.userId};
        `
    } else {
        sql = `SELECT * FROM users
            WHERE email = "${user.email}";
        `
    }
    return await con.query(sql);
}

async function userExists(email) {
    const sql = `SELECT * FROM users
        WHERE email = "${email}";
    `;
    let u = await con.query(sql);
    console.log(u);
    return u;
}

// Create User
async function register(user) {
    const u = userExists(user.email);
    if(u.length>0) throw Error('User with this email exists');
    const sql = `INSERT INTO users (email, user_password)
        VALUES ( "${user.email}", "${user.password}");
    `;
    const insert = await con.query(sql);
    const newUser = await getUser(user);
    return newUser[0];
}

// Read User
async function login(email, password) {
    const user = await userExists(email);
    if(!user[0]) throw Error("User not found");
    if(user[0].user_password !== password) throw Error("Incorrect password");
    return user[0];
}

// Update User
async function editUser(user) {
    const sql = `UPDATE users SET
        email = "${user.email}"
        WHERE user_id = ${user.userId};
    `;
    const update = await con.query(sql);
    const newUser = await getUser(user);
    return newUser[0];
}

// Delete User
async function deleteUser(userId) {
    const sql = `DELETE FROM users
        WHERE user_id = ${userId};
    `;
    await con.query(sql);
}

module.exports = { getUsers, register, login, editUser, deleteUser };
