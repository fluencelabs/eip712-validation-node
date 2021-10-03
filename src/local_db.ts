// import { sqlite3, open } from 'sqlite3';
// var sqlite3 = require("sqlite3").verbose();
// import "sqlite3";
import * as sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();
import { Response } from './eip_processor';

const DB_PATH = './data/snapshot.db';

export interface DBRecord {
    snapshot_id: number;
    event_address: string;
    event_signature: string;
    eip712_doc: string;
    peer_id: string;
    timestamp: number;
    eip_validation: boolean;
    ts_validation: boolean;
    signed_response: string;
}

// db handler
export function get_db(db_path: string): sqlite.Database {
    var db_path = db_path;

    if (db_path === null) {
        db_path = ':memory';
    }

    var db = new sqlite3.Database(db_path, (err: any) => {
        if (err) {
            return console.error("failure to get sqlite: ", err.message);
        }
    });
    console.dir(db);
    return db;

}


export async function create_table(db: sqlite.Database) {
    const stmt = `create table if not exists snapshot (
        snapshot_id integer unique,
        event_address text,
        event_signature text,
        eip712_doc blob,
        peer_id text,
        timestamp integer,
        eip_validation boolean,
        ts_validation boolean,
        signed_response text
    )`;

    let promise = new Promise<void>((resolve, reject) => db.run(stmt, (res: sqlite.RunResult, err: Error) => {
        // console.dir(res);
        if (err !== null) {
            resolve()
        } else {
            reject(err)
        }
    }));

    return promise;
}

export async function insert_event(db: any, eip_obj: any, response_obj: Response, signed_msg: string) {
    const stmt = `insert into snapshot values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    var ins_vals = [eip_obj.data.message.snapshot, eip_obj.address, eip_obj.sig, JSON.stringify(eip_obj.data), response_obj.peer_id, response_obj.timestamp, response_obj.eip_validation, response_obj.ts_validation, signed_msg];
    let promise = new Promise<void>((resolve, reject) => db.run(stmt, ins_vals, (res: sqlite.RunResult, err: Error) => {
        // console.dir(res);
        if (err !== null) {
            resolve()
        } else {
            reject(err)
        }
    }));

    return promise;
}


// export function select_event(snapshot_id: number): DBRecord {
export function select_event(snapshot_id: number): any {
    // todo: adding request log
    var db = get_db(DB_PATH);
    const stmt = 'select * from snapshot where snapshot_id=?'
    db.get(stmt, [snapshot_id], (err, row) => {
        db.close();
        if (err) {
            return console.error(err.message);
        }
        return row
            ? console.log(row)
            : console.log(`No record found for snapshot id: ${snapshot_id}`);
    });
    // db.close();
};

// export function select_events(): Array<DBRecord> {
export function select_events(): any {
    var db = get_db(DB_PATH);
    // todo: add pagination
    const stmt = 'select * from snapshot limit ?';
    console.log("select events stmt: ", stmt);
    var response_arr: Array<DBRecord>;
    db.all(stmt, [100], (err, rows) => {
        // db.close();
        if (err) {
            // todo: no good, change that.
            console.error(err.message);
            return [];
        }
        for (var row of rows) {
            const _row: DBRecord = row;
            console.log("row: ", row);
            // response_arr.push(_row);
        };
        return response_arr;
    });

    // db.close();
}


/*

var db = new sqlite3.Database(DB_PATH);
  db.serialize(function () {
    const create_stmt = "CREATE TABLE lorem (info TEXT)";
    db.run(create_stmt);

    const ins_stmt = "INSERT INTO lorem VALUES (?)";
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", function (err: any, row: any) {
      console.log(row.id + ": " + row.info);
    });
  });

*/