import mysql from 'mysql2/promise';

const con = await mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'toor',
    database: 'phono_test'
});

console.log("Server code logs on the server console, that makes sense");

let results = await con.query('SELECT * FROM spools')
    .then(function([rows,fields]) { // Don't know what this does, but it seems to work
            console.log(rows);
            return rows;
    });

export function load() {
    return {
        reels: results
    };
}

