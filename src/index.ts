import { Fluence } from "@fluencelabs/fluence";
import { krasnodar } from "@fluencelabs/fluence-network-environment";
import { registerProVoValidation, ProVoValidationDef, registerDataProvider, DataProviderDef } from "./_aqua/snapshot";
import { ethers } from "ethers";
import { TypedDataUtils } from 'ethers-eip712';  // https://github.com/0xsequence/ethers-eip712
import { eip_validation, Response } from "./eip_processor";
import { get_db, create_table, insert_event, DBRecord, select_events, select_event } from './local_db';


function create_wallet(): ethers.Wallet {
  return ethers.Wallet.createRandom();
}

function sign_response(wallet: ethers.Wallet, response: Response): Promise<string> {
  const signed_msg = wallet.signMessage(JSON.stringify(response));
  return signed_msg;
}
class EIPValidator implements ProVoValidationDef {

  eip712_validation(eip712_json: string) {
    // todo: need to fix this to use local peer key
    const wallet = create_wallet();
    let response = eip_validation(eip712_json, wallet.address);

    const resp_str = JSON.stringify(response);
    console.log("eip validation response: ", resp_str);

    const signed_response = wallet.signMessage(resp_str);
    console.log("signed response: ", signed_response);

    // verify
    // const address = ethers.utils.verifyMessage(resp_str, signed_response);
    // console.log("verify signature. peer_id: ", peer_id, " verified addr: ", address, " equal: ", peer_id === address);
    console.log(resp_str);
    return response; //, signed_response];
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



async function main() {

  await Fluence.start({
    connectTo: krasnodar[0],
  });

  registerProVoValidation(new EIPValidator());
  registerDataProvider(new DataProvider);

  await Fluence.stop();

}
main();
