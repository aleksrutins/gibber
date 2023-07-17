import sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();

export function connect(connStr) {
    return {driver: 'sqlite', client: new sqlite.Database(connStr.split(':').slice(1).join(':'))};
}

export function run(database, sqlStr, ...params) {
    return new Promise((resolve, reject) => {
        database.client.run(sqlStr, ...params, err => {
            if(err) reject(err);
            else resolve();
        });
    });
}

export function query(database, sqlStr, ...params) {
    return new Promise((resolve, reject) => {
        database.client.all(sqlStr, ...params, (err, rows) => {
            if(err) reject(err);
            else resolve(rows);
        });
    });
}