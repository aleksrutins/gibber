//@flow
/*::
import type { Connection } from "./types.js";
*/

import revert from "./revert.js";
import { getTrackedMigrations } from "./tracker.js";
import up from "./up.js";

export default async function refresh(conn/*: Connection<any>*/) {
    const nMigrations = (await getTrackedMigrations(conn)).length;
    for(let i = 0; i < nMigrations; i++) {
        await revert(conn);
    }

    await up(conn);
}