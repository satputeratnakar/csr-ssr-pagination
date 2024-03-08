var bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const mysql = require("mysql");
var connection = require('./mysql_config.js')


/******************ITEM LIST START***********************/

app.get("/api/fetchItemList", (req, res) => {
    const pageNumber = +req.query.page || 1; // Get the current page number from the query parameters
    const pageSize = +req.query.pageSize || 10;
    const sql = `select * from items`;
    connection.query(sql, (err, results, fields) => {
        if (err) throw err;
        if (results) {
            const startIndex = (pageNumber - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const data = results.slice(startIndex, endIndex);
            res.send(data);
        }
    });
});


/******************ITEM LIST ENDS***************************/


app.listen(7007, (error) => {
    if (error) throw error;
    console.log(`App listening on port 7007`);
});


