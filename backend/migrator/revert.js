//@flow
/*::
import type { Connection } from "./types.js";
*/
import * as log from "./log.js";
import { getTrackedMigrations, untrackMigration } from "./tracker.js";

import fs from "fs";

export default async function revert(conn/*: Connection<any>*/) {
    const migrations = await getTrackedMigrations(conn);
    const latestMigration = migrations.sort()[migrations.length - 1];

    log.info("Reverting migration " + latestMigration);
    const sql = fs.readFileSync(`migrations/${latestMigration}.down.sql`).toString();
    await conn.exec(sql);
    await untrackMigration(conn, latestMigration);
}