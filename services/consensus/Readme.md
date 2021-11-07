# Simple Consensus Service

The simple consensus service is a Wasm module comprised of one function that takes a list of EIP-712 validations in form of booleans representing `valid` and `invalid` proposals or votes and a threshold to calculate the consensus over the input vector. Note that the return boolean is true if the ratio **(valid proposals / all proposals) >= threshold value**:

```rust
// services/consensus/src/main.rs
// ...
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

pub fn consensus(payload: Vec<bool>, threshold: f64) -> CResult
// ...
```

See './src/main.rs' for the complete code and tests. The service can easily be improved including with the introducing of authentication for a (global) consensus threshold and minimum input items. Also, with little effort we could change he return value to an absolute consensus tuple or even replace the boolean inputs with the signed validations.

For local interaction with the module, we can use the REPL:

```bash
mrepl configs/Config.toml
```

and then:

```bash
1> i
Loaded modules interface:
data CResult:
  stderr: string
  stdout: []Consensus
data Consensus:
  n: u64
  threshold: f64
  valid: u64
  invalid: u64
  consensus: bool

consensus:
  fn consensus(payload: []bool, threshold: f64) -> CResult

2> call consensus consensus [[true,true, true, true,false,false], 0.666]
result: Object({"stderr": String(""), "stdout": Array([Object({"consensus": Bool(true), "invalid": Number(2), "n": Number(6), "threshold": Number(0.666), "valid": Number(4)})])})
 elapsed time: 96.859µs

3> call consensus consensus [[true,true, true, false,false,false], 0.666]
result: Object({"stderr": String(""), "stdout": Array([Object({"consensus": Bool(false), "invalid": Number(3), "n": Number(6), "threshold": Number(0.666), "valid": Number(3)})])})
 elapsed time: 52.831µs

4>
```

As expected, for a two-thirds threshold, `[true,true, true, true,false,false]` gives us a consensus for `valid`, whereas `[true,true, true, false,false,false]` does not.

To compile the service, in the '~/eip712-validation-node/services/consensus' directory, run:

```bash
./scripts/build.sh
```

and a `consensus.wasm` file should be in the `artifacts` directory, which we can deploy with the

```bash
./scripts/deploy.sh
```

which writes the output to the `deployed_service_data.txt` file.


