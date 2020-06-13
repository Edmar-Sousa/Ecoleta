const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./src/database/database.db');

db.serialize(function(){
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES ( ?, ?, ?, ?, ?, ?, ?);
    `;

    let values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Colectoria",
        "Rio do sul, Santa Catarina",
        "Guilerme gemballa, jardim america Numero 260",
        "Rio do sul",
        "Guilerme gemballa",
        "Residuos eletronicos, Lâmpadas"
    ];

    // db.run(query, values, (err) => {
    //     if (err) return console.log(err);

    //     console.log('ok')
    // });

    // db.all(`SELECT * FROM places;`, function(err, rows){
    //     if (err) return console.log(err);

    //     console.log(rows);
    // });

    // db.run(`DELETE FROM places WHERE id = ?;`, [1], function(err){
    //     if (err) return console.log(err);

    //     console.log('DELETE');
    // });
});

module.exports = db;
