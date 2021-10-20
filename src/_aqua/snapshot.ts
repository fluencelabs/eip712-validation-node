/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.2-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from "@fluencelabs/fluence";
import {
  CallParams,
  callFunction,
  registerService,
} from "@fluencelabs/fluence/dist/internal/compilerSupport/v2";

// Services

export interface ProVoValidationDef {
  eip712_validation_string: (
    eip_str: string,
    peer_id: string,
    callParams: CallParams<"eip_str" | "peer_id">
  ) => string | Promise<string>;
  eip712_validation_url: (
    eip_str: string,
    peer_id: string,
    callParams: CallParams<"eip_str" | "peer_id">
  ) => string | Promise<string>;
}
export function registerProVoValidation(service: ProVoValidationDef): void;
export function registerProVoValidation(
  serviceId: string,
  service: ProVoValidationDef
): void;
export function registerProVoValidation(
  peer: FluencePeer,
  service: ProVoValidationDef
): void;
export function registerProVoValidation(
  peer: FluencePeer,
  serviceId: string,
  service: ProVoValidationDef
): void;

export function registerProVoValidation(...args: any) {
  registerService(args, {
    defaultServiceId: "snapshot",
    functions: [
      {
        functionName: "eip712_validation_string",
        argDefs: [
          {
            name: "eip_str",
            argType: {
              tag: "primitive",
            },
          },
          {
            name: "peer_id",
            argType: {
              tag: "primitive",
            },
          },
        ],
        returnType: {
          tag: "primitive",
        },
      },
      {
        functionName: "eip712_validation_url",
        argDefs: [
          {
            name: "eip_str",
            argType: {
              tag: "primitive",
            },
          },
          {
            name: "peer_id",
            argType: {
              tag: "primitive",
            },
          },
        ],
        returnType: {
          tag: "primitive",
        },
      },
    ],
  });
}

export interface DataProviderDef {
  get_record: (
    snapshot_id: number,
    callParams: CallParams<"snapshot_id">
  ) => { snapshot_id: number };
  get_records: (callParams: CallParams<null>) => { snapshot_id: number }[];
}
export function registerDataProvider(service: DataProviderDef): void;
export function registerDataProvider(
  serviceId: string,
  service: DataProviderDef
): void;
export function registerDataProvider(
  peer: FluencePeer,
  service: DataProviderDef
): void;
export function registerDataProvider(
  peer: FluencePeer,
  serviceId: string,
  service: DataProviderDef
): void;

export function registerDataProvider(...args: any) {
  registerService(args, {
    defaultServiceId: "snapshot",
    functions: [
      {
        functionName: "get_record",
        argDefs: [
          {
            name: "snapshot_id",
            argType: {
              tag: "primitive",
            },
          },
        ],
        returnType: {
          tag: "primitive",
        },
      },
      {
        functionName: "get_records",
        argDefs: [],
        returnType: {
          tag: "primitive",
        },
      },
    ],
  });
}

// Functions

export function validate(
  relay: string,
  peer_: string,
  eip712_json: string,
  config?: { ttl?: number }
): Promise<string>;
export function validate(
  peer: FluencePeer,
  relay: string,
  peer_: string,
  eip712_json: string,
  config?: { ttl?: number }
): Promise<string>;
export function validate(...args: any) {
  let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (seq
                              (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                              (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                             )
                             (call %init_peer_id% ("getDataSrv" "peer") [] peer)
                            )
                            (call %init_peer_id% ("getDataSrv" "eip712_json") [] eip712_json)
                           )
                           (call -relay- ("op" "noop") [])
                          )
                          (call relay ("op" "noop") [])
                         )
                         (xor
                          (call peer ("snapshot" "eip712_validation_string") [eip712_json peer] result)
                          (seq
                           (seq
                            (seq
                             (call relay ("op" "noop") [])
                             (call -relay- ("op" "noop") [])
                            )
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                           )
                           (call -relay- ("op" "noop") [])
                          )
                         )
                        )
                        (call relay ("op" "noop") [])
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [result])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `;
  return callFunction(
    args,
    {
      functionName: "validate",
      returnType: {
        tag: "primitive",
      },
      argDefs: [
        {
          name: "relay",
          argType: {
            tag: "primitive",
          },
        },
        {
          name: "peer",
          argType: {
            tag: "primitive",
          },
        },
        {
          name: "eip712_json",
          argType: {
            tag: "primitive",
          },
        },
      ],
      names: {
        relay: "-relay-",
        getDataSrv: "getDataSrv",
        callbackSrv: "callbackSrv",
        responseSrv: "callbackSrv",
        responseFnName: "response",
        errorHandlingSrv: "errorHandlingSrv",
        errorFnName: "error",
      },
    },
    script
  );
}

export function validate_from_url(
  relay: string,
  peer_: string,
  eip712_url: string,
  config?: { ttl?: number }
): Promise<string>;
export function validate_from_url(
  peer: FluencePeer,
  relay: string,
  peer_: string,
  eip712_url: string,
  config?: { ttl?: number }
): Promise<string>;
export function validate_from_url(...args: any) {
  let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (seq
                              (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                              (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                             )
                             (call %init_peer_id% ("getDataSrv" "peer") [] peer)
                            )
                            (call %init_peer_id% ("getDataSrv" "eip712_url") [] eip712_url)
                           )
                           (call -relay- ("op" "noop") [])
                          )
                          (call relay ("op" "noop") [])
                         )
                         (xor
                          (call peer ("snapshot" "eip712_validation_url") [eip712_url peer] result)
                          (seq
                           (seq
                            (seq
                             (call relay ("op" "noop") [])
                             (call -relay- ("op" "noop") [])
                            )
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                           )
                           (call -relay- ("op" "noop") [])
                          )
                         )
                        )
                        (call relay ("op" "noop") [])
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [result])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `;
  return callFunction(
    args,
    {
      functionName: "validate_from_url",
      returnType: {
        tag: "primitive",
      },
      argDefs: [
        {
          name: "relay",
          argType: {
            tag: "primitive",
          },
        },
        {
          name: "peer",
          argType: {
            tag: "primitive",
          },
        },
        {
          name: "eip712_url",
          argType: {
            tag: "primitive",
          },
        },
      ],
      names: {
        relay: "-relay-",
        getDataSrv: "getDataSrv",
        callbackSrv: "callbackSrv",
        responseSrv: "callbackSrv",
        responseFnName: "response",
        errorHandlingSrv: "errorHandlingSrv",
        errorFnName: "error",
      },
    },
    script
  );
}

export type Get_recordResult = { snapshot_id: number };
export function get_record(
  relay: string,
  peer_: string,
  snapshot_id: number,
  config?: { ttl?: number }
): Promise<Get_recordResult>;
export function get_record(
  peer: FluencePeer,
  relay: string,
  peer_: string,
  snapshot_id: number,
  config?: { ttl?: number }
): Promise<Get_recordResult>;
export function get_record(...args: any) {
  let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (seq
                              (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                              (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                             )
                             (call %init_peer_id% ("getDataSrv" "peer") [] peer)
                            )
                            (call %init_peer_id% ("getDataSrv" "snapshot_id") [] snapshot_id)
                           )
                           (call -relay- ("op" "noop") [])
                          )
                          (call relay ("op" "noop") [])
                         )
                         (xor
                          (call peer ("snapshot" "get_record") [snapshot_id] result)
                          (seq
                           (seq
                            (seq
                             (call relay ("op" "noop") [])
                             (call -relay- ("op" "noop") [])
                            )
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                           )
                           (call -relay- ("op" "noop") [])
                          )
                         )
                        )
                        (call relay ("op" "noop") [])
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [result])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `;
  return callFunction(
    args,
    {
      functionName: "get_record",
      returnType: {
        tag: "primitive",
      },
      argDefs: [
        {
          name: "relay",
          argType: {
            tag: "primitive",
          },
        },
        {
          name: "peer",
          argType: {
            tag: "primitive",
          },
        },
        {
          name: "snapshot_id",
          argType: {
            tag: "primitive",
          },
        },
      ],
      names: {
        relay: "-relay-",
        getDataSrv: "getDataSrv",
        callbackSrv: "callbackSrv",
        responseSrv: "callbackSrv",
        responseFnName: "response",
        errorHandlingSrv: "errorHandlingSrv",
        errorFnName: "error",
      },
    },
    script
  );
}

export function get_records(
  relay: string,
  peer_: string,
  config?: { ttl?: number }
): Promise<{ snapshot_id: number }[]>;
export function get_records(
  peer: FluencePeer,
  relay: string,
  peer_: string,
  config?: { ttl?: number }
): Promise<{ snapshot_id: number }[]>;
export function get_records(...args: any) {
  let script = `
                        (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (seq
                            (seq
                             (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                             (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                            )
                            (call %init_peer_id% ("getDataSrv" "peer") [] peer)
                           )
                           (call -relay- ("op" "noop") [])
                          )
                          (call relay ("op" "noop") [])
                         )
                         (xor
                          (call peer ("snapshot" "get_records") [] result)
                          (seq
                           (seq
                            (seq
                             (call relay ("op" "noop") [])
                             (call -relay- ("op" "noop") [])
                            )
                            (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                           )
                           (call -relay- ("op" "noop") [])
                          )
                         )
                        )
                        (call relay ("op" "noop") [])
                       )
                       (call -relay- ("op" "noop") [])
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [result])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `;
  return callFunction(
    args,
    {
      functionName: "get_records",
      returnType: {
        tag: "primitive",
      },
      argDefs: [
        {
          name: "relay",
          argType: {
            tag: "primitive",
          },
        },
        {
          name: "peer",
          argType: {
            tag: "primitive",
          },
        },
      ],
      names: {
        relay: "-relay-",
        getDataSrv: "getDataSrv",
        callbackSrv: "callbackSrv",
        responseSrv: "callbackSrv",
        responseFnName: "response",
        errorHandlingSrv: "errorHandlingSrv",
        errorFnName: "error",
      },
    },
    script
  );
}
