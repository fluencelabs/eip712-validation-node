// import { sqlite3, open } from 'sqlite3';
var sqlite3 = require("sqlite3").verbose();
import { Response } from './eip_processor';



// db handler
export async function get_db(db_path: any) {
    var db_path = db_path;

    if (db_path === null) {
        db_path = ':memory';
    }

    let db = new sqlite3.Database(db_path, (err: any) => {
        if (err) {
            return console.error("failure to get sqlite: ", err.message);
        }
    });
    return db;

}

export async function crate_table(db: any) {
    const stmt = `create table if not exists snapshot.db (
        snapshot_id: integer primary key,
        event_address: text,
        event_signature: text,
        eip712_doc text,
        peer_id: text,
        timestamp: integer;
        eip_validation: boolean;
        ts_validation: boolean;
        signed_response text
    )`;

    db.run(stmt);
}

export async function insert_event(db: any, eip_obj: any, response_obj: Response, signed_msg: string) {
    const stmt = `insert into snapshot.db (
        values (?,?,?,?,?,?,?,?,?)
    )`;
    const values = [eip_obj.data.message.snapshot, eip_obj.address, eip_obj.sig, JSON.stringify(eip_obj.data), response_obj.peer_id, response_obj.timestamp, response_obj.eip_validation, response_obj.ts_validation, signed_msg];
    db.run(stmt, values, function (err: any) {
        if (err) {
            return console.log(err.message);
        }
        // console.log(`A row has been inserted with row id: ${this.lastID}`);
        // console.log(`A row has been inserted with row id: ${db.}`);
    });
}
