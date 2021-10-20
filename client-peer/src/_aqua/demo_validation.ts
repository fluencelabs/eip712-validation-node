/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.2-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface ProVoValidationDef {
    eip712_validation_string: (eip_str: string, peer_id: string, callParams: CallParams<'eip_str' | 'peer_id'>) => string;
eip712_validation_url: (eip_str: string, peer_id: string, callParams: CallParams<'eip_str' | 'peer_id'>) => string;
}
export function registerProVoValidation(service: ProVoValidationDef): void;
export function registerProVoValidation(serviceId: string, service: ProVoValidationDef): void;
export function registerProVoValidation(peer: FluencePeer, service: ProVoValidationDef): void;
export function registerProVoValidation(peer: FluencePeer, serviceId: string, service: ProVoValidationDef): void;
       

export function registerProVoValidation(...args: any) {
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
    get_record: (snapshot_id: number, callParams: CallParams<'snapshot_id'>) => { snapshot_id: number; };
get_records: (callParams: CallParams<null>) => { snapshot_id: number; }[];
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

 

export function get_all_validations(node: string, relay: string, config?: {ttl?: number}): Promise<{ snapshot_id: number; }[]>;
export function get_all_validations(peer: FluencePeer, node: string, relay: string, config?: {ttl?: number}): Promise<{ snapshot_id: number; }[]>;
export function get_all_validations(...args: any) {

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
    "functionName" : "get_all_validations",
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

 
export type Get_validationResult = { snapshot_id: number; }
export function get_validation(snapshot_id: number, node: string, relay: string, config?: {ttl?: number}): Promise<Get_validationResult>;
export function get_validation(peer: FluencePeer, snapshot_id: number, node: string, relay: string, config?: {ttl?: number}): Promise<Get_validationResult>;
export function get_validation(...args: any) {

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
    "functionName" : "get_validation",
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
