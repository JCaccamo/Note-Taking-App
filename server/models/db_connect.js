require('dotenv').config();
const mysql = require('mysql2');

const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

const query = (sql, binding) => {
    return new Promise((resolve, reject) => {
        con.query(sql, binding, (err, result, fields) => {
            if(err) reject(err);
            resolve(result);
        });
    });
};

const createQuery = "CREATE DATABASE IF NOT EXISTS note_taking_app;";
con.query(createQuery);

module.exports = { con, query };
