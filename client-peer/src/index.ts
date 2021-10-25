/*
 * Copyright 2021 Fluence Labs Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Fluence, setLogLevel, FluencePeer } from "@fluencelabs/fluence";
import { krasnodar, Node } from "@fluencelabs/fluence-network-environment";
import { validate, get_record, get_records, get_record_count, delete_records } from "./_aqua/demo_validation";


const NODE_DB_PWD = "bad really bad"; const PWD_HASH = "bad really bad";
const EIP712_URL = "https://ipfs.fleek.co/ipfs/QmWGzSQFm57ohEq2ATw4UNHWmYU2HkMjtedcNLodYywpmS";

interface NodeTuple {
  node_id: string;
  relay_id: string
}

// PoC node parameters
let poc_topologies: Array<NodeTuple> = [
  {
    "node_id": "12D3KooWFCY8xqebtZqNeiA5took71bUNAedzCCDuCuM1QTdTbWT",
    "relay_id": "12D3KooWSD5PToNiLQwKDXsu8JSysCwUt8BVUJEqCHcDe7P5h45e"
  },
];


async function main() {


  console.log("Welcome to Snapshot PoC demo.");
  // setLogLevel('DEBUG');

  await Fluence.start({ connectTo: krasnodar[2] });
  console.log(
    "Created Fluence client with\npeer id: %s\nrelay id %s\n",
    Fluence.getStatus().peerId,
    Fluence.getStatus().relayPeerId
  );

  console.log("\nRoundtrip Validation demo.\n");

  console.log("Let's check the node db and clear all records if need be:");
  let rec_count = await get_record_count(poc_topologies[0].node_id, poc_topologies[0].relay_id);
  if (rec_count > 0) {
    console.log("deleting %s records", rec_count);
    let _res = await delete_records(NODE_DB_PWD, poc_topologies[0].node_id, poc_topologies[0].relay_id);
  }

  console.log("Lets validate proposal %s, which is old and should fail.", EIP712_URL);
  let doc_val = await validate(EIP712_URL, poc_topologies[0].node_id, poc_topologies[0].relay_id);
  // if (doc_val.stderr.length > 0) {}
  console.log("signed eip validation result: ", doc_val);

  let records = await get_records(poc_topologies[0].node_id, poc_topologies[0].relay_id);
  if (records.stderr.length > 0) {
    console.log("We should have one record in the node db but do not: ", records.stderr);
  }
  else {
    console.log("We should have one record in the node db and have %s record(s).", records.stdout.length);
  }

  console.log("We know from the EIP document that the snapshot is 9278489, which i sued as a unique key in the sqlite db.")
  console.log(" and we can call individual recirds by snapshot:")
  let good_record = await get_record(9278489, poc_topologies[0].node_id, poc_topologies[0].relay_id);
  let bad_record = await get_record(92784890, poc_topologies[0].node_id, poc_topologies[0].relay_id);
  console.log("result for call with 9278489: ", good_record);
  console.log("result for call with bad 92784890: ", bad_record);

  return;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });