import * as pg from 'pg';

export function connect(connStr) {
    return new pg.Client({connectionString: connStr});
}

export function runSQL(db, sqlStr) {
    return db.query(sqlStr);
}