import { Fluence, KeyPair } from "@fluencelabs/fluence";
import { krasnodar } from "@fluencelabs/fluence-network-environment";
import { registerEIPValidator, EIPValidatorDef, registerDataProvider, DataProviderDef } from "./_aqua/snapshot";
import { eip_validation, Response as EIPResponse } from "./eip_processor";
import { get_db, create_table, delete_records, insert_event, DBRecord, DBResult, select_events, select_event, select_count } from './local_db';
import got from 'got';
import { ethers } from "ethers";
import { create_wallet, sign_response } from "./utils";
import { ResultCodes } from "@fluencelabs/fluence/dist/internal/commonTypes";


// Arbitrary secret key that could be read from file, CLI arg or db
// We derive both the PeerId and the (ethers) wallet from this key
const SecretKey = "0x0123456789012345678901234567890123456789012345678901234567890123";

// SQLite path
const DB_PATH = "./data/snapshot.db";

export interface ValidationResponse {
  signature: string;
  validation: EIPResponse;
}
interface ValidationResult {
  stderr: string;
  stdout: ValidationResponse;
}
// class exposed as service `EIPValidation` in snapshot.aqua
class EIPValidator implements EIPValidatorDef {

  async eip712_validation_string(eip712_json: string): Promise<ValidationResult> {
    // todo: pre-create wallet and read from file. there should be one static wallet for the life of the client node
    const wallet = create_wallet(SecretKey);
    let response = eip_validation(eip712_json, wallet.address);

    const resp_str = JSON.stringify(response);
    console.log("eip validation response: ", resp_str);

    const signed_response = await wallet.signMessage(resp_str);
    let obj: ValidationResponse = { "signature": signed_response, "validation": response };

    // commit to local sqlite
    let db = get_db(DB_PATH);
    await create_table(db);
    await insert_event(db, JSON.parse(resp_str), response, signed_response);

    let result = {} as ValidationResult;
    result.stderr = "";
    result.stdout = obj;

    return result;
  }

  async eip712_validation_url(eip712_url: string): Promise<ValidationResult> {

    const eip = await got.get(eip712_url);
    const eip_json = eip.body;

    const wallet = create_wallet(SecretKey);
    let response = eip_validation(eip_json, wallet.address);

    const resp_str = JSON.stringify(response);
    const signed_response = await wallet.signMessage(resp_str);

    let obj: ValidationResponse = { "signature": signed_response, "validation": response };

    // commit to local sqlite
    let db = get_db(DB_PATH);
    await create_table(db);
    await insert_event(db, JSON.parse(eip_json), response, signed_response);

    let result = {} as ValidationResult;
    result.stderr = "";
    result.stdout = obj;

    return result;
  }

}
// class exposed as service `DataProviderDef` in snapshot.aqua
class DataProvider implements DataProviderDef {
  // record by snapshot_id
  async get_record(snapshot_id: number): Promise<any> {
    return select_event(snapshot_id);
  }

  // get all records. currently limited to 100 rows max.
  // todo: add paginaton 
  async get_records(): Promise<any> {
    // todo: add pagination
    const result = await select_events();
    console.log("get records: ", result);
    return result;
  }

  // row count; if err doing so,  return value is -1
  async get_record_count(): Promise<number> {
    const result = await select_count();
    console.log("get records: ", result);
    return result;
  }

  // clear table -- illustrative purposes only
  async delete_records(password: string): Promise<any> {
    return await delete_records(password);

  }
}


async function startFluencePeer(skBytes: Uint8Array): Promise<void> {
  await Fluence.start({
    connectTo: krasnodar[0],
    KeyPair: await KeyPair.fromEd25519SK(skBytes)
  });
}

async function main() {

  console.log("Snapshot service node running with ...")
  let wallet = new ethers.Wallet(SecretKey);
  console.log("wallet from sk: ", wallet.address);
  console.log("wallet pk: ", wallet.publicKey);

  const skBytes: Uint8Array = ethers.utils.arrayify(SecretKey);
  await startFluencePeer(skBytes);

  console.log("PeerId: ", Fluence.getStatus().peerId);
  console.log("Relay id: ", Fluence.getStatus().relayPeerId);

  // register the Aqua-programmable services
  registerEIPValidator("EIPValidator", new EIPValidator());
  registerDataProvider("DataProvider", new DataProvider);

  console.log("crtl-c to exit");
  // await Fluence.stop();
}

main();