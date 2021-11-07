#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

# build wasms
./build.sh

(
  fldist new_service \
        --name "simple-consensus" \
        --modules artifacts/consensus.wasm:configs/consensus_cfg.json \
        --verbose \
        >> \
        deployed_service_data.txt

)