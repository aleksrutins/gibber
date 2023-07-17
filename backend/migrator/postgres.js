import pg from 'pg';

export function connect(connStr) {
    return {driver: 'postgres', client: new pg.Client({connectionString: connStr})};
}

export function run(db, sqlStr, ...params) {
    return db.client.query(sqlStr, params);
}

export function query(db, sqlStr, ...params) {
    return db.client.query(sqlStr, params).then(res => res.rows);
}