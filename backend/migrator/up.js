//@flow
/*::
import type { Connection } from "./types.js";
*/
import * as log from "./log.js";
import { trackMigration } from "./tracker.js";
import { getTrackedMigrations } from "./tracker.js";
import * as fs from "fs";

function getMigrationName(filename/*: string*/)/*: string*/ {
    if(filename.indexOf(".up.sql") != -1) {
        return filename.substring(0, filename.indexOf(".up.sql"));
    }
    if(filename.indexOf(".down.sql") != -1) {
        return filename.substring(0, filename.indexOf(".down.sql"));
    }
    return filename;
}

export default async function up(conn/*: Connection<any>*/) {
    const migrations = await getTrackedMigrations(conn);
    const actualMigrations = new Set(
        fs.readdirSync("migrations").map(
            filename => 
                getMigrationName(filename)));
    
    const needToRun = [...actualMigrations].filter(m => !migrations.includes(m)).sort();
    for(const migrationName of needToRun) {
        log.info("Running migration " + migrationName);
        const fileName = migrationName + ".up.sql";
        const sql = fs.readFileSync("migrations/" + fileName).toString();
        await conn.exec(sql);
        await trackMigration(conn, migrationName);
    }
}