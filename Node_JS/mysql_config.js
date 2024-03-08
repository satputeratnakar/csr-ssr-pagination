let mysql = require("mysql");

let connection = mysql.createPool({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root123",
    database: "assignment",
});

module.exports = connection