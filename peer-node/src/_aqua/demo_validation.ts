/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.4.0-235
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface EIPValidatorDef {
    eip712_validation_string: (eip_str: string, peer_id: string, callParams: CallParams<'eip_str' | 'peer_id'>) => string | Promise<string>;
eip712_validation_url: (eip_str: string, peer_id: string, callParams: CallParams<'eip_str' | 'peer_id'>) => string | Promise<string>;
}
export function registerEIPValidator(service: EIPValidatorDef): void;
export function registerEIPValidator(serviceId: string, service: EIPValidatorDef): void;
export function registerEIPValidator(peer: FluencePeer, service: EIPValidatorDef): void;
export function registerEIPValidator(peer: FluencePeer, serviceId: string, service: EIPValidatorDef): void;
       

export function registerEIPValidator(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "EIPValidator",
    "functions" : [
        {
            "functionName" : "eip712_validation_string",
            "argDefs" : [
                {
                    "name" : "eip_str",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "peer_id",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "eip712_validation_url",
            "argDefs" : [
                {
                    "name" : "eip_str",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "peer_id",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        }
    ]
}
    );
}
      


export interface DataProviderDef {
    clear_table: (password: string, callParams: CallParams<'password'>) => { stderr: string; stdout: { eip712_doc: string; eip_validation: boolean; event_address: string; event_signature: string; peer_id: string; signed_response: string; snapshot_id: number; timestamp: number; ts_validation: boolean; }[]; } | Promise<{ stderr: string; stdout: { eip712_doc: string; eip_validation: boolean; event_address: string; event_signature: string; peer_id: string; signed_response: string; snapshot_id: number; timestamp: number; ts_validation: boolean; }[]; }>;
get_record: (snapshot_id: number, callParams: CallParams<'snapshot_id'>) => { stderr: string; stdout: { eip712_doc: string; eip_validation: boolean; event_address: string; event_signature: string; peer_id: string; signed_response: string; snapshot_id: number; timestamp: number; ts_validation: boolean; }[]; } | Promise<{ stderr: string; stdout: { eip712_doc: string; eip_validation: boolean; event_address: string; event_signature: string; peer_id: string; signed_response: string; snapshot_id: number; timestamp: number; ts_validation: boolean; }[]; }>;
get_record_count: (callParams: CallParams<null>) => number | Promise<number>;
get_records: (callParams: CallParams<null>) => { stderr: string; stdout: { eip712_doc: string; eip_validation: boolean; event_address: string; event_signature: string; peer_id: string; signed_response: string; snapshot_id: number; timestamp: number; ts_validation: boolean; }[]; } | Promise<{ stderr: string; stdout: { eip712_doc: string; eip_validation: boolean; event_address: string; event_signature: string; peer_id: string; signed_response: string; snapshot_id: number; timestamp: number; ts_validation: boolean; }[]; }>;
}
export function registerDataProvider(service: DataProviderDef): void;
export function registerDataProvider(serviceId: string, service: DataProviderDef): void;
export function registerDataProvider(peer: FluencePeer, service: DataProviderDef): void;
export function registerDataProvider(peer: FluencePeer, serviceId: string, service: DataProviderDef): void;
       

export function registerDataProvider(...args: any) {
    registerService(
        args,
        {
    "defaultServiceId" : "DataProvider",
    "functions" : [
        {
            "functionName" : "clear_table",
            "argDefs" : [
                {
                    "name" : "password",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "get_record",
            "argDefs" : [
                {
                    "name" : "snapshot_id",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "get_record_count",
            "argDefs" : [
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "get_records",
            "argDefs" : [
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        }
    ]
}
    );
}
      
// Functions
 
export type Delete_rowsResult = { stderr: string; stdout: { eip712_doc: string; eip_validation: boolean; event_address: string; event_signature: string; peer_id: string; signed_response: string; snapshot_id: number; timestamp: number; ts_validation: boolean; }[]; }
export function delete_rows(password: string, node: string, relay: string, config?: {ttl?: number}): Promise<Delete_rowsResult>;
export function delete_rows(peer: FluencePeer, password: string, node: string, relay: string, config?: {ttl?: number}): Promise<Delete_rowsResult>;
export function delete_rows(...args: any) {

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
                              (call %init_peer_id% ("getDataSrv" "password") [] password)
                             )
                             (call %init_peer_id% ("getDataSrv" "node") [] node)
                            )
                            (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                           )
                           (call -relay- ("op" "noop") [])
                          )
                          (call relay ("op" "noop") [])
                         )
                         (xor
                          (call node ("DataProvider" "clear_table") [password] result)
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
    `
    return callFunction(
        args,
        {
    "functionName" : "delete_rows",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "password",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "node",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relay",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 
export type Get_recordResult = { stderr: string; stdout: { eip712_doc: string; eip_validation: boolean; event_address: string; event_signature: string; peer_id: string; signed_response: string; snapshot_id: number; timestamp: number; ts_validation: boolean; }[]; }
export function get_record(snapshot_id: number, node: string, relay: string, config?: {ttl?: number}): Promise<Get_recordResult>;
export function get_record(peer: FluencePeer, snapshot_id: number, node: string, relay: string, config?: {ttl?: number}): Promise<Get_recordResult>;
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
                              (call %init_peer_id% ("getDataSrv" "snapshot_id") [] snapshot_id)
                             )
                             (call %init_peer_id% ("getDataSrv" "node") [] node)
                            )
                            (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                           )
                           (call -relay- ("op" "noop") [])
                          )
                          (call relay ("op" "noop") [])
                         )
                         (xor
                          (call node ("DataProvider" "get_record") [snapshot_id] res)
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
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "get_record",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "snapshot_id",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "node",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relay",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function validate(eip712_url: string, node: string, relay: string, config?: {ttl?: number}): Promise<string>;
export function validate(peer: FluencePeer, eip712_url: string, node: string, relay: string, config?: {ttl?: number}): Promise<string>;
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
                              (call %init_peer_id% ("getDataSrv" "eip712_url") [] eip712_url)
                             )
                             (call %init_peer_id% ("getDataSrv" "node") [] node)
                            )
                            (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                           )
                           (call -relay- ("op" "noop") [])
                          )
                          (call relay ("op" "noop") [])
                         )
                         (xor
                          (call node ("EIPValidator" "eip712_validation_url") [eip712_url node] res)
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
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "validate",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "eip712_url",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "node",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relay",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function get_record_count(node: string, relay: string, config?: {ttl?: number}): Promise<number>;
export function get_record_count(peer: FluencePeer, node: string, relay: string, config?: {ttl?: number}): Promise<number>;
export function get_record_count(...args: any) {

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
                             (call %init_peer_id% ("getDataSrv" "node") [] node)
                            )
                            (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                           )
                           (call -relay- ("op" "noop") [])
                          )
                          (call relay ("op" "noop") [])
                         )
                         (xor
                          (call node ("DataProvider" "get_record_count") [] res)
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
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "get_record_count",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "node",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relay",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 
export type Get_recordsResult = { stderr: string; stdout: { eip712_doc: string; eip_validation: boolean; event_address: string; event_signature: string; peer_id: string; signed_response: string; snapshot_id: number; timestamp: number; ts_validation: boolean; }[]; }
export function get_records(node: string, relay: string, config?: {ttl?: number}): Promise<Get_recordsResult>;
export function get_records(peer: FluencePeer, node: string, relay: string, config?: {ttl?: number}): Promise<Get_recordsResult>;
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
                             (call %init_peer_id% ("getDataSrv" "node") [] node)
                            )
                            (call %init_peer_id% ("getDataSrv" "relay") [] relay)
                           )
                           (call -relay- ("op" "noop") [])
                          )
                          (call relay ("op" "noop") [])
                         )
                         (xor
                          (call node ("DataProvider" "get_records") [] res)
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
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "get_records",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "node",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "relay",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}