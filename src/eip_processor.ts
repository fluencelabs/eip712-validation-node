import { ethers } from "ethers";
// import { TypedDataUtils } from 'ethers-eip712';  // https://github.com/0xsequence/ethers-eip712

// move that 
const MAX_TS_DELTA = 180; // 3 minutes -- 60*3

export interface Response {
    peer_id: string; // may replace with random signing address for now
    timestamp: number;
    eip_validation: boolean;
    ts_validation: any;
}

// local UTC epoch
function get_local_ts(): number {
    return Math.round(Date.now() / 1000);
}

// validate snapshot timestamp against node +/- delta allowance
function ts_comp(peer_ts: number, snapshot_ts: number, ts_delta: number): boolean {
    const ts_diff = Math.abs(peer_ts - snapshot_ts);
    if (ts_diff <= ts_delta) {
        return true;
    }
    return false;
}


function check_signature(eip_obj: any): boolean {
    const signing_addr = ethers.utils.verifyTypedData(eip_obj.data.domain, eip_obj.data.types, eip_obj.data.message, eip_obj.sig);

    // there may be an upper/lowercase hex difference
    const sig_assert = (signing_addr == eip_obj.address);
    return sig_assert;
}


// export async function eip_validation(eip_str: string, peer_id: string): Promise<Response> {
export function eip_validation(eip_str: string, peer_id: string): Response {

    const eip_obj = JSON.parse(eip_str);
    console.log("eip doc parsed: ", eip_obj);

    // verify eip document integrity -- not working due to missing fields
    // const digest = TypedDataUtils.encodeDigest(eip_obj.data);
    // const digest_hex = ethers.utils.hexlify(digest);

    // verify signed EIP hash
    const sig_check = check_signature(eip_obj);

    var response: Response;

    if (!sig_check) {
        response = { peer_id: peer_id, timestamp: get_local_ts(), eip_validation: false, ts_validation: null };
    }
    else {
        // validate choices -- not implemented

        // validate timestamp
        const peer_ts = get_local_ts();
        const ts_check = ts_comp(peer_ts, eip_obj.data.message.timestamp, MAX_TS_DELTA);

        if (!ts_check) {
            // no good
            response = { peer_id: peer_id, timestamp: peer_ts, eip_validation: true, ts_validation: false };
        }
        else {
            response = { peer_id: peer_id, timestamp: peer_ts, eip_validation: true, ts_validation: true };
        }

    }

    return response;
}
