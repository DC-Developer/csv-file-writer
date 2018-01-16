var mysql = require('mysql');
var fs = require('fs');
var csv = require('fast-csv');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "root",
    database: "top_songsDB"
});