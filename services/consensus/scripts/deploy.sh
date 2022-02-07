#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

# build wasms
./scripts/build.sh

(
  aqua dist deploy \
       --addr /dns4/kras-03.fluence.dev/tcp/19001/wss/p2p/12D3KooWJd3HaMJ1rpLY1kQvcjRPEvnDwcXrH8mJvk7ypcZXqXGE \
       --data-path configs/consensus_deploy_cfg.json \
       --service consensus-service \
       >> \
        deployed_service_data.txt

)