// import { Fluence } from "@fluencelabs/fluence";
// import { krasnodar } from "@fluencelabs/fluence-network-environment";
// import { registerCalc, CalcDef } from "./_aqua/calc";

import { ethers } from "ethers";
import { TypedDataUtils } from 'ethers-eip712';  // https://github.com/0xsequence/ethers-eip712
import { eip_validation, Response } from "./eip_processor";
import { get_db, create_table, insert_event } from './local_db';

var sqlite3 = require('sqlite3').verbose();




const DB_PATH = './data/snapshot.db';

function create_wallet(): ethers.Wallet {
  return ethers.Wallet.createRandom();
}

function sign_response(wallet: ethers.Wallet, response: Response): Promise<string> {
  const signed_msg = wallet.signMessage(JSON.stringify(response));
  return signed_msg;
}


async function main() {
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

  // return (resp_str, signed_response);

  var db = get_db(DB_PATH);
  const _table = await create_table(db);
  console.log(_table);

  const _insert = insert_event(db, JSON.parse(eip712_doc), response, signed_response);
  console.log(_insert);

  // db.close();
}

main();
