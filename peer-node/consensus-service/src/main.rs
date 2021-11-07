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

use marine_rs_sdk::marine;
use marine_rs_sdk::module_manifest;
use marine_rs_sdk::WasmLoggerBuilder;

module_manifest!();

pub fn main() {
    WasmLoggerBuilder::new().build().unwrap();
}

#[marine]
#[derive(Default, Debug)]
pub struct Consensus {
    pub n: u64,
    pub threshold: f64,
    pub valid: u64,
    pub invalid: u64,
    pub consensus: bool,
}

#[marine]
#[derive(Default, Debug)]
pub struct CResult {
    pub stderr: String,
    pub stdout: Vec<Consensus>, // always length 0 or 1
}

impl CResult {
    pub fn new(err: Option<String>, out: Option<Consensus>) -> Self {
        match out {
            Some(out) => CResult {
                stderr: "".to_string(),
                stdout: vec![out],
            },
            None => match err {
                Some(e) => CResult {
                    stderr: e,
                    stdout: Vec::new(),
                },
                None => CResult {
                    stderr: "failure to procure error".to_string(),
                    stdout: Vec::new(),
                },
            },
        }
    }
}

#[marine]
pub fn consensus(payload: Vec<bool>, threshold: f64) -> CResult {
    if payload.len() == 0 {
        return CResult::new(Some("no records provided".to_string()), None);
    }
    if threshold < 0.0 || threshold > 1.0 {
        return CResult::new(Some("invalid threshold value".to_string()), None);
    }
    let valids: u64 = payload.iter().filter(|&b| *b == true).count() as u64;
    let invalids: u64 = payload.iter().filter(|&b| *b == false).count() as u64;
    let c_ratio: f64 = valids as f64 / payload.len() as f64;
    let mut cons: bool = false;
    if c_ratio >= threshold {
        cons = true;
    }
    let c = Consensus {
        n: payload.len() as u64,
        threshold,
        valid: valids,
        invalid: invalids,
        consensus: cons,
    };
    CResult::new(None, Some(c))
}

#[cfg(test)]
mod tests {
    use marine_rs_sdk_test::marine_test;
    #[marine_test(config_path = "../Config.toml", modules_dir = "../artifacts")]
    fn test_consensus(consensus: marine_test_env::consensus::ModuleInterface) {
        let data_1 = vec![true, true, true, false, false];
        let data_2 = vec![true, true, false, false, false];
        let threshold_1: f64 = 0.6f64;
        let threshold_bad: f64 = 1.6f64;

        let c_true = consensus.consensus(data_1.clone(), threshold_1.clone());
        println!("{:?}", c_true);
        println!("{:?}", c_true.stdout[0].consensus);

        assert!(c_true.stdout[0].consensus);
        assert_eq!(c_true.stderr.len(), 0);
        assert_eq!(c_true.stdout[0].n, data_1.len() as u64);
        assert_eq!(c_true.stdout[0].valid, 3u64);
        assert_eq!(c_true.stdout[0].invalid, 2u64);

        let c_false = consensus.consensus(data_2.clone(), threshold_1.clone());
        assert!(!c_false.stdout[0].consensus);
        assert_eq!(c_false.stdout[0].valid, 2u64);
        assert_eq!(c_false.stdout[0].invalid, 3u64);

        let c_bad = consensus.consensus(data_2, threshold_bad);
        assert_eq!(c_bad.stderr.len(), 23usize);
        assert_eq!(c_bad.stdout.len(), 0usize);
    }
}
