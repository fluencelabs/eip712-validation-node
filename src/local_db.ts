// import { sqlite3, open } from 'sqlite3';
// var sqlite3 = require("sqlite3").verbose();
// import "sqlite3";
import * as sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();
import { Response } from './eip_processor';



// db handler
export function get_db(db_path: any): sqlite.Database {
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
        snapshot_id integer primary key,
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
        console.dir(res);
        if (err !== null) {
            resolve()
        } else {
            reject(err)
        }
    }));

    return promise;

    db.run(stmt);
}


export function insert_event(db: any, eip_obj: any, response_obj: Response, signed_msg: string) {
    const stmt = `insert into snapshot values (?,?,?,?,?,?,?,?,?)`;
    // const stmt = `insert into snapshot values (?)`;
    var cursor = db.prepare(stmt);

    var vals = [eip_obj.data.message.snapshot, eip_obj.address, eip_obj.sig, JSON.stringify(eip_obj.data), response_obj.peer_id, response_obj.timestamp, response_obj.eip_validation, response_obj.ts_validation, signed_msg];
    // var vals = [1];
    for (let v of vals) {
        console.log(typeof (v));
    }

    cursor.run(stmt, vals, function (err: any) {
        if (err) {
            return console.log("insert error: ", err.message);
        }
        // console.log(`A row has been inserted with row id: ${this.lastID}`);
        // console.log(`A row has been inserted with row id: ${db.}`);
    });
    cursor.finalize();
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