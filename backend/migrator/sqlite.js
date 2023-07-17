import * as sqlite3 from 'sqlite3';
const sqlite = sqlite3.verbose();

export function connect(connStr) {
    return new sqlite.Database(connStr);
}

export function runSQL(database, sqlStr) {
    database.run(sqlStr);
    return Promise.resolve();
}