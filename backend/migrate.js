// @flow

import * as log from "./migrator/log.js";
import refresh from "./migrator/refresh.js";
import revert from "./migrator/revert.js";
import { dbForURL } from "./migrator/selectDB.js";
import { ensureMigrationsTable } from "./migrator/tracker.js";
import { Connection } from "./migrator/types.js";
import up from "./migrator/up.js";

(async () => {

if(process.argv[0]?.endsWith('node')) process.argv.shift();

log.info("Connecting to database...");

const url = process.env.DATABASE_URL;

if(!url) {
    log.error("DATABASE_URL was not provided, exiting.");
    process.exit(1);
    return;
}

const db = await dbForURL(url);

if(!db) {
    log.error("Unsupported protocol: " + (url ?? "").split(":")[0]);
    process.exit(1);
    return;
}

const conn = new Connection(db, url);

log.info("Ensuring migrations table exists...");
await ensureMigrationsTable(conn);

switch(process.argv[1]) {
    case 'up':
        await up(conn);
        break;
    case 'revert':
        await revert(conn);
        break;
    case 'refresh':
        await refresh(conn);
        break;
    default:
        log.error(`Unknown command: ${process.argv[1]}. Available commands are up, revert, refresh`);
}

})();