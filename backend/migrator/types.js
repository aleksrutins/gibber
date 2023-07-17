//@flow
/*::
type Database<Driver> = { driver: Driver }
export interface Migrator<DB> {
    connect(connStr: string): {driver: DB};
    run(db: {driver: DB}, sqlStr: string, ...params: Array<string>): Promise<void>;
    query<T>(db: {driver: DB}, sqlStr: string, ...params: Array<string>): Promise<Array<T>>;
}
*/

export class Connection/*::<Driver>*/ {
    #migrator/*: Migrator<Driver>*/;
    #db/*: Database<Driver>*/;

    constructor(migrator/*: Migrator<Driver>*/, connStr/*: string*/) {
        this.#migrator = migrator;
        this.#db = migrator.connect(connStr);
    }

    exec(sqlStr/*: string*/, ...params/*: Array<string>*/)/*: Promise<void>*/ {
        return this.#migrator.run(this.#db, sqlStr, ...params);
    }

    query/*::<T>*/(sqlStr/*: string*/, ...params/*: Array<string>*/)/*: Promise<Array<T>>*/ {
        return this.#migrator.query(this.#db, sqlStr, ...params);
    }
}