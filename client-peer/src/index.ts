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
import { validate, get_record, get_records, get_record_count } from "./_aqua/demo_validation";



interface NodeTuple {
  node_id: string;
  relay_id: string
}

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
    "created a Fluence client %s with relay %s",
    Fluence.getStatus().peerId,
    Fluence.getStatus().relayPeerId
  );

  let rec_count = await get_record_count(poc_topologies[0].node_id, poc_topologies[0].relay_id);
  console.log("record count: ", rec_count);

  let records = await get_records(poc_topologies[0].node_id, poc_topologies[0].relay_id);
  if (records.stderr.length > 0) {
    console.log("Records fetch error: ", records.stderr);
  }
  else {
    console.log("record length: ", records.stdout.length);
  }




  return;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });