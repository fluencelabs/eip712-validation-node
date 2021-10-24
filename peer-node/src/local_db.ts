// import { sqlite3, open } from 'sqlite3';
// var sqlite3 = require("sqlite3").verbose();
// import "sqlite3";
import { resolveProperties } from '@ethersproject/properties';
import { ResultCodes } from '@fluencelabs/fluence/dist/internal/commonTypes';
import * as sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();
import { Response } from './eip_processor';

const DB_PATH = './data/snapshot.db';
const PWD_HASH = "bad really bad";

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

export interface DBResult {
    stderr: string;
    stdout: Array<DBRecord>
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

export async function insert_event(db: sqlite.Database, eip_obj: any, response_obj: Response, signed_msg: string) {
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

export async function select_event(snapshot_id: number): Promise<DBResult> {
    var db = get_db(DB_PATH);
    let result: DBResult = {} as DBResult;
    const stmt = 'select * from snapshot where snapshot_id=?';
    return new Promise((resolve) => {
        db.get(stmt, [snapshot_id], (err, row) => {
            db.close();
            if (err) {
                result.stderr = err.message;
                result.stdout = [];
            }
            else {
                result.stderr = "";
                const response_arr = new Array<DBRecord>();
                response_arr.push(row);
                result.stdout = response_arr;
            }
            resolve(result)
        });
    });
};

// todo: add pagination
export async function select_events(): Promise<DBResult> {
    var db = get_db(DB_PATH);
    const stmt = "select * from snapshot limit ?";
    let result: DBResult = {} as DBResult;
    return new Promise((resolve) => {
        db.all(stmt, [100], (err, rows) => {
            console.log("number of rows: ", rows.length);
            if (err) {
                result.stderr = err.message;
                result.stdout = [];
            } else {
                const response_arr = new Array<DBRecord>();
                for (var row of rows) {
                    const _row: DBRecord = row;
                    response_arr.push(_row);
                }
                result.stderr = "";
                result.stdout = response_arr;
            }
            resolve(result);
        });
    });
}

export async function select_count(): Promise<number> {
    var db = get_db(DB_PATH);
    const stmt = 'select count(*) as count from snapshot';
    let result: number;
    return new Promise((resolve) => {
        db.get(stmt, [], (err, row) => {
            db.close();
            if (err) {
                result = -1;
            }
            else {
                console.log("count: ", row);
                result = row.count;
            }
            resolve(result);
        });
    });
};

export async function delete_records(pwd_hash: string): Promise<DBResult> {
    let result: DBResult = {} as DBResult;
    // todo: you know what to do
    if (pwd_hash === PWD_HASH) {
        result.stderr = "invalid password";
        result.stdout = [];
        resolveProperties(result);
    }

    var db = get_db(DB_PATH);
    const stmt = 'delete from snapshot'
    return new Promise((resolve) => {
        db.get(stmt, [], (err, row) => {
            db.close();
            if (err) {
                result.stderr = err.message;
                result.stdout = [];
            }
            else {
                console.log("count: ", row);
                result.stderr = "";
                const response_arr = new Array<DBRecord>();
                response_arr.push(row);
                result.stdout = response_arr;
            }
            resolve(result);
        });
    });
};