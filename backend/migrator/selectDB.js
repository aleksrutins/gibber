//@flow
/*::
import type { Migrator } from './types.js';
*/
export function getPostgres()/*: Promise<Migrator<"postgres">>*/ {
    return import('./postgres.js');
}
export function getSqlite()/*: Promise<Migrator<"sqlite">>*/ {
    return import('./sqlite.js');
}

export function dbForURL(databaseURL/*: string*/)/*: ?Promise<Migrator<any>>*/ {
    if(databaseURL.startsWith('postgresql:')) return getPostgres();
    else if(databaseURL.startsWith('sqlite3:')) return getSqlite();
    else return null;
}