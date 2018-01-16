var mysql = require('mysql');
var fs = require('fs');
var csv = require('fast-csv');

//now create an event emitter for our stream we will be reading from
var stream = fs.createReadStream('top10.csv');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3000,
    user: "root",
    password: "root",
    database: "top_songsDB"
});

connection.connect(function(err){
    if (err) throw (err)
    console.log("Connected to db");
    writeFile();//function that will parse csv file and save to db
});

//define function that will read csv file and insert it into db
function writeFile() {

    csv
        .fromStream(stream, {headers: ["position", "artist", "song", "year", "raw_total", "raw_usa", "raw_uk", "raw_eur", "raw_row"]})
        .on('data', function(data){
            connection.query(
                "INSERT INTO top10 (position, artist, song, year, raw_total, raw_usa, raw_uk, raw_eur, raw_row)" +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [data.position, data.artist, data.song, data.year, data.raw_total, data.raw_usa, data.raw_uk, data.raw_eur,
            data.raw_row],
            function(err){
                if (err) throw (err)
                console.log("Saved to db!");
            }
            );
        })
        .on('end', function(data){
            console.log('done!');
        });


}