#!/usr/bin/env bash
set -o errexit -o nounset -o pipefail

# build wasms
./scripts/build.sh

(
  aqua remote deploy_service \
       --addr krasnodar-08 \
       --config-path configs/consensus_deployment_cfg.json \
       --service consensus-service \
       --sk cvFkezQeWa1vNUTa+NT6L0c65mHXLfmpz4r2WMjrxZw=
       >> \
        deployed_service_data.txt

)