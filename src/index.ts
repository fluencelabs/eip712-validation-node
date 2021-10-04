import { Fluence, KeyPair } from "@fluencelabs/fluence";
import { krasnodar } from "@fluencelabs/fluence-network-environment";
import { registerProVoValidation, ProVoValidationDef, registerDataProvider, DataProviderDef } from "./_aqua/snapshot";
import { ethers } from "ethers";
import { TypedDataUtils } from 'ethers-eip712';  // https://github.com/0xsequence/ethers-eip712
import { eip_validation, Response } from "./eip_processor";
import { get_db, create_table, insert_event, DBRecord, select_events, select_event } from './local_db';
import got from 'got';



function create_wallet(): ethers.Wallet {
  return ethers.Wallet.createRandom();
}

function sign_response(wallet: ethers.Wallet, response: Response): Promise<string> {
  const signed_msg = wallet.signMessage(JSON.stringify(response));
  return signed_msg;
}
class EIPValidator implements ProVoValidationDef {

  eip712_validation_string(eip712_json: string): string {
    // todo: need to fix this to use local peer key
    const wallet = create_wallet();
    let response = eip_validation(eip712_json, wallet.address);

    const resp_str = JSON.stringify(response);
    console.log("eip validation response: ", resp_str);

    const signed_response = wallet.signMessage(resp_str);
    console.log("signed response: ", signed_response);

    // verify test
    // const address = ethers.utils.verifyMessage(resp_str, signed_response);
    // console.log("verify signature. peer_id: ", peer_id, " verified addr: ", address, " equal: ", peer_id === address);

    // console.log(resp_str);
    let obj = { "signature": signed_response, "validation": response };
    return JSON.stringify(obj);
  }

  eip712_validation_url(eip712_url: string): string {

    const eip_json: any = got('https://ipfs.fleek.co/ipfs/QmWGzSQFm57ohEq2ATw4UNHWmYU2HkMjtedcNLodYywpmS').json();

    // todo: need to fix this to use local peer key
    const wallet = create_wallet();
    let response = eip_validation(eip_json, wallet.address);

    const resp_str = JSON.stringify(response);
    const signed_response = wallet.signMessage(resp_str);


    // verify test
    // const address = ethers.utils.verifyMessage(resp_str, signed_response);
    // console.log("verify signature. peer_id: ", peer_id, " verified addr: ", address, " equal: ", peer_id === address);

    // console.log(resp_str);

    let obj = { "signature": signed_response, "validation": response };
    return JSON.stringify(obj);
  }

}

class DataProvider implements DataProviderDef {

  get_record(snapshot_id: number) {
    // todo: add pagination
    return select_event(snapshot_id);

  }

  get_records() {
    return select_events();
  }
}


async function main_0() {

  await Fluence.start({
    connectTo: krasnodar[0],
  });

  // const peer_data = Fluence.getPeer();
  // console.log("client data\n: ", peer_data);

  console.log("application started");
  console.log("peer id is: ", Fluence.getStatus().peerId);
  console.log("relay is: ", Fluence.getStatus().relayPeerId);

  registerProVoValidation(new EIPValidator());
  registerDataProvider(new DataProvider);

  // test


  // await Fluence.stop();

}


async function main_2() {
  /*
  const DB_PATH = './data/snapshot.db';

  // https://ipfs.fleek.co/ipfs/QmWGzSQFm57ohEq2ATw4UNHWmYU2HkMjtedcNLodYywpmS
  // should come from Aqua
  // note: I changed \" to \\" in order for JSON.parse to work
  const eip712_doc = `{"address":"0xeF8305E140ac520225DAf050e2f71d5fBcC543e7","sig":"0xc0a90a0bf43c0b774570608bf0279143b366b7880798112b678b416a7500576b41e19f7b4eb457d58de29be3a201f700fafab1f02179da0faae653b7e8ecf82b1c","data":{"domain":{"name":"snapshot","version":"0.1.4"},"types":{"Proposal":[{"name":"from","type":"address"},{"name":"space","type":"string"},{"name":"timestamp","type":"uint64"},{"name":"type","type":"string"},{"name":"title","type":"string"},{"name":"body","type":"string"},{"name":"choices","type":"string[]"},{"name":"start","type":"uint64"},{"name":"end","type":"uint64"},{"name":"snapshot","type":"uint64"},{"name":"network","type":"string"},{"name":"strategies","type":"string"},{"name":"plugins","type":"string"},{"name":"metadata","type":"string"}]},"message":{"space":"fabien.eth","type":"single-choice","title":"This is a long title this is a long title this is a long title this is a long title this is a long title this is a long","body":"This is a long title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title title this is a long title this is a long title.","choices":["Approve","Reject"],"start":1630472400,"end":1640926800,"snapshot":9278489,"network":"4","strategies":"[{\\"name\\":\\"ticket\\",\\"params\\":{\\"value\\":100,\\"symbol\\":\\"$\\"}}]","plugins":"{}","metadata":"{}","from":"0xeF8305E140ac520225DAf050e2f71d5fBcC543e7","timestamp":1631432106}}}`;

  // todo: replace with actual peer pk and sk
  const wallet = create_wallet();
  const peer_id = wallet.address;
  let response = await eip_validation(eip712_doc, peer_id);



  // stringify, hexlify, hash and sign response
  const resp_str = JSON.stringify(response);
  console.log("eip validation response: ", resp_str);

  // just sign the raw message string for a long message
  const signed_response = await wallet.signMessage(resp_str);
  console.log("signed response: ", signed_response);

  // verify
  const address = ethers.utils.verifyMessage(resp_str, signed_response);
  console.log("verify signature. peer_id: ", peer_id, " verified addr: ", address, " equal: ", peer_id === address);

  var db = get_db(DB_PATH);
  const _table = await create_table(db);
  console.log("table: ", _table);

  var _insert = await insert_event(db, JSON.parse(eip712_doc), response, signed_response);
  console.log("insert: ", _insert);


  var _select = await select_events();
  console.log("select all:\n", _select, "\n");

  var _select = await select_event(9278489);
  console.log("select one (9278489):\n", _select, "\n");


  // db.close();
  */

  const eip_doc: any = await got('https://ipfs.fleek.co/ipfs/QmWGzSQFm57ohEq2ATw4UNHWmYU2HkMjtedcNLodYywpmS').json();

  console.log("data: ", typeof (eip_doc));
  // console.log("data: ", eip_doc);
  console.log("address: ", eip_doc.address);
  console.log("signature: ", eip_doc.sig);
  console.log("eip doc ", eip_doc.data);


  var response = await eip_validation(JSON.stringify(eip_doc), "1234");
  console.log(response);

}

async function main() {

  await Fluence.start({
    connectTo: krasnodar[0],
  });

  console.dir(Fluence);
  console.log("peer id : ", Fluence.getStatus().peerId);
  console.log("relay id: ", Fluence.getStatus().relayPeerId);
  console.log("status  : ", Fluence.getStatus());
  console.log("\n\n");

  let peer = Fluence.getPeer();
  // console.log(peer);
  // console.log(Fluence.KeyPair);



  registerProVoValidation(new EIPValidator());
  registerDataProvider(new DataProvider);

  const eip_doc: any = await got('https://ipfs.fleek.co/ipfs/QmWGzSQFm57ohEq2ATw4UNHWmYU2HkMjtedcNLodYywpmS').json();
  console.log("eip json obj: ", eip_doc);

  let obj = new EIPValidator();
  let result = obj.eip712_validation_url(JSON.stringify(eip_doc));
  console.log("result: ", result);
  await Fluence.stop();
}

main();