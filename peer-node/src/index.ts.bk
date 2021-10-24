import { Fluence, KeyPair } from "@fluencelabs/fluence";
import { krasnodar } from "@fluencelabs/fluence-network-environment";
import { registerEIPValidator, EIPValidatorDef, registerDataProvider, DataProviderDef } from "./_aqua/snapshot";
import { ethers } from "ethers";
import { TypedDataUtils } from 'ethers-eip712';  // https://github.com/0xsequence/ethers-eip712
import { eip_validation, Response } from "./eip_processor";
import { get_db, create_table, insert_event, DBRecord, DBResult, select_events, select_event } from './local_db';
import got from 'got';
import { base64 } from "ethers/lib/utils";


// Arbitrary secret key that could be read from file, CLI arg or db
// We derive both the PeerId and the (ethers) wallet from this key
const SecretKey = "0x0123456789012345678901234567890123456789012345678901234567890123";
const DB_PATH = "./data/snapshot.db";


function create_wallet(sk: string): ethers.Wallet {
  return new ethers.Wallet(sk);
}

function sign_response(wallet: ethers.Wallet, response: Response): Promise<string> {
  const signed_msg = wallet.signMessage(JSON.stringify(response));
  return signed_msg;
}

// class exposed as service `EIPValidation` in snapshot.aqua
class EIPValidator implements EIPValidatorDef {

  async eip712_validation_string(eip712_json: string): Promise<string> {
    // todo: need to fix this to use local peer key
    const wallet = create_wallet(SecretKey);
    let response = eip_validation(eip712_json, wallet.address);

    const resp_str = JSON.stringify(response);
    console.log("eip validation response: ", resp_str);

    const signed_response = await wallet.signMessage(resp_str);
    console.log("signed response: ", signed_response);

    // verify test
    // const address = ethers.utils.verifyMessage(resp_str, signed_response);
    // console.log("verify signature. peer_id: ", peer_id, " verified addr: ", address, " equal: ", peer_id === address);

    // console.log(resp_str);
    let obj = { "signature": signed_response, "validation": response };

    return JSON.stringify(obj);
  }

  async eip712_validation_url(eip712_url: string): Promise<string> {

    const eip = await got.get('https://ipfs.fleek.co/ipfs/QmWGzSQFm57ohEq2ATw4UNHWmYU2HkMjtedcNLodYywpmS');
    const eip_json = eip.body;

    // todo: need to fix this to use local peer key
    const wallet = create_wallet(SecretKey);
    let response = eip_validation(eip_json, wallet.address);

    const resp_str = JSON.stringify(response);
    const signed_response = await wallet.signMessage(resp_str);


    // verify test
    // const address = ethers.utils.verifyMessage(resp_str, signed_response);
    // console.log("verify signature. peer_id: ", peer_id, " verified addr: ", address, " equal: ", peer_id === address);

    // console.log(resp_str);

    let obj = { "signature": signed_response, "validation": response };

    // commit to local sqlite
    let db = get_db(DB_PATH);
    await create_table(db);
    await insert_event(db, JSON.parse(eip_json), response, signed_response);

    return JSON.stringify(obj);
  }

}
// class exposed as service `DataProviderDef` in snapshot.aqua
class DataProvider implements DataProviderDef {

  async get_record(snapshot_id: number): Promise<any> {
    return select_event(snapshot_id);

  }

  async get_records(): Promise<any> {
    // todo: add pagination
    const result = await select_events();
    console.log("get records: ", result);
    return result;
  }
}


async function startFluencePeer(skBytes: Uint8Array): Promise<void> {
  await Fluence.start({
    connectTo: krasnodar[0],
    KeyPair: await KeyPair.fromEd25519SK(skBytes)
  });
}

async function main() {

  let wallet = new ethers.Wallet(SecretKey);
  console.log("wallet from sk: ", wallet.address);
  console.log("wallet pk: ", wallet.publicKey);

  const skBytes: Uint8Array = ethers.utils.arrayify(SecretKey);
  console.log("arrayify: ", skBytes);

  await startFluencePeer(skBytes);


  console.log("PeerId: ", Fluence.getStatus().peerId);
  console.log("Relay id: ", Fluence.getStatus().relayPeerId);

  // let peer = Fluence.getPeer();
  // console.log(peer);
  // console.log(Fluence.KeyPair);

  registerEIPValidator("EIPValidator", new EIPValidator());
  registerDataProvider("DataProvider", new DataProvider);

  // const eip_doc: any = await got('https://ipfs.fleek.co/ipfs/QmWGzSQFm57ohEq2ATw4UNHWmYU2HkMjtedcNLodYywpmS').json();
  // console.log("eip json obj: ", eip_doc);

  // let obj = new EIPValidator();
  // let result = obj.eip712_validation_url(JSON.stringify(eip_doc));
  // console.log("result: ", result);

  // await Fluence.stop();
}

main();