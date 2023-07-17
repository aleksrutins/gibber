// @flow

import * as fs from 'fs';

/*::
import type { Connection } from "./types";

type Migration = {
    id: number,
    name: string
}
*/

export function ensureMigrationsTable(ctx/*: Connection<any>*/)/*: Promise<void>*/ {
    return ctx.exec(/*sql*/`
        create table if not exists gibber_migrations (
            name text primary key
        );
    `);
}

export function getTrackedMigrations(ctx/*: Connection<any>*/)/*: Promise<Array<string>>*/ {
    return ctx.query/*::<Migration>*/(/*sql*/`
        select * from gibber_migrations order by name asc;
    `).then(rows => rows.map(row => row.name));
}

export function trackMigration(ctx/*: Connection<any>*/, migration/*: string*/)/*: Promise<void>*/ {
    return ctx.exec(/*sql*/`
        insert into gibber_migrations (name) values ($1);
    `, migration);
}

export function untrackMigration(ctx/*: Connection<any>*/, migration/*: string*/)/*: Promise<void>*/ {
    return ctx.exec(/*sql*/`
        delete from gibber_migrations where name = $1;
    `, migration);
}