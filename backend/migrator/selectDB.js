//@flow
/*::
import type { Migrator } from './types.js';
*/
export async function getPostgres()/*: Promise<Migrator<"postgres">>*/ {
    return (await import('./postgres.js') /*: Migrator<'postgres'>*/);
}
export async function getSqlite()/*: Promise<Migrator<"sqlite">>*/ {
    return (await import('./postgres.js') /*: Migrator<'sqlite'>*/);
}