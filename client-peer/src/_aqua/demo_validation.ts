/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.0-226
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    ResultCodes,
    RequestFlow,
    RequestFlowBuilder,
    CallParams,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v1';


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
    let peer: FluencePeer;
    let serviceId: any;
    let service: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
    } else {
        peer = Fluence.getPeer();
    }

    if (typeof args[0] === 'string') {
        serviceId = args[0];
    } else if (typeof args[1] === 'string') {
        serviceId = args[1];
    }
    else {
        serviceId = "EIPValidator"
    }

    // Figuring out which overload is the service.
    // If the first argument is not Fluence Peer and it is an object, then it can only be the service def
    // If the first argument is peer, we are checking further. The second argument might either be
    // an object, that it must be the service object
    // or a string, which is the service id. In that case the service is the third argument
    if (!(FluencePeer.isInstance(args[0])) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }


        if (req.fnName === 'eip712_validation_string') {

            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    eip_str: req.tetraplets[0], peer_id: req.tetraplets[1]
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.eip712_validation_string(req.args[0], req.args[1], callParams)

        }



        if (req.fnName === 'eip712_validation_url') {

            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    eip_str: req.tetraplets[0], peer_id: req.tetraplets[1]
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.eip712_validation_url(req.args[0], req.args[1], callParams)

        }


        next();
    });
}



export interface DataProviderDef {
    get_record: (snapshot_id: number, callParams: CallParams<'snapshot_id'>) => { snapshot_id: number };
    get_records: (callParams: CallParams<null>) => { snapshot_id: number }[];
}

export function registerDataProvider(service: DataProviderDef): void;
export function registerDataProvider(serviceId: string, service: DataProviderDef): void;
export function registerDataProvider(peer: FluencePeer, service: DataProviderDef): void;
export function registerDataProvider(peer: FluencePeer, serviceId: string, service: DataProviderDef): void;
export function registerDataProvider(...args: any) {
    let peer: FluencePeer;
    let serviceId: any;
    let service: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
    } else {
        peer = Fluence.getPeer();
    }

    if (typeof args[0] === 'string') {
        serviceId = args[0];
    } else if (typeof args[1] === 'string') {
        serviceId = args[1];
    }
    else {
        serviceId = "DataProvider"
    }

    // Figuring out which overload is the service.
    // If the first argument is not Fluence Peer and it is an object, then it can only be the service def
    // If the first argument is peer, we are checking further. The second argument might either be
    // an object, that it must be the service object
    // or a string, which is the service id. In that case the service is the third argument
    if (!(FluencePeer.isInstance(args[0])) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }


        if (req.fnName === 'get_record') {

            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    snapshot_id: req.tetraplets[0]
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.get_record(req.args[0], callParams)

        }



        if (req.fnName === 'get_records') {

            const callParams = {
                ...req.particleContext,
                tetraplets: {

                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.get_records(callParams)

        }


        next();
    });
}


// Functions

export function validate(eip712_url: string, node: string, relay: string, config?: { ttl?: number }): Promise<string>;
export function validate(peer: FluencePeer, eip712_url: string, node: string, relay: string, config?: { ttl?: number }): Promise<string>;
export function validate(...args: any) {
    let peer: FluencePeer;
    let eip712_url: any;
    let node: any;
    let relay: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        eip712_url = args[1];
        node = args[2];
        relay = args[3];
        config = args[4];
    } else {
        peer = Fluence.getPeer();
        eip712_url = args[0];
        node = args[1];
        relay = args[2];
        config = args[3];
    }

    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
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

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'eip712_url', () => { return eip712_url; });
                h.on('getDataSrv', 'node', () => { return node; });
                h.on('getDataSrv', 'relay', () => { return relay; });
                h.onEvent('callbackSrv', 'response', (args) => {
                    const [res] = args;
                    resolve(res);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for validate');
            })
        if (config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}



export function get_all_validations(node: string, relay: string, config?: { ttl?: number }): Promise<{ snapshot_id: number }[]>;
export function get_all_validations(peer: FluencePeer, node: string, relay: string, config?: { ttl?: number }): Promise<{ snapshot_id: number }[]>;
export function get_all_validations(...args: any) {
    let peer: FluencePeer;
    let node: any;
    let relay: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        node = args[1];
        relay = args[2];
        config = args[3];
    } else {
        peer = Fluence.getPeer();
        node = args[0];
        relay = args[1];
        config = args[2];
    }

    let request: RequestFlow;
    const promise = new Promise<{ snapshot_id: number }[]>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
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

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'node', () => { return node; });
                h.on('getDataSrv', 'relay', () => { return relay; });
                h.onEvent('callbackSrv', 'response', (args) => {
                    const [res] = args;
                    resolve(res);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for get_all_validations');
            })
        if (config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}



export function get_validation(snapshot_id: number, node: string, relay: string, config?: { ttl?: number }): Promise<{ snapshot_id: number }>;
export function get_validation(peer: FluencePeer, snapshot_id: number, node: string, relay: string, config?: { ttl?: number }): Promise<{ snapshot_id: number }>;
export function get_validation(...args: any) {
    let peer: FluencePeer;
    let snapshot_id: any;
    let node: any;
    let relay: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        snapshot_id = args[1];
        node = args[2];
        relay = args[3];
        config = args[4];
    } else {
        peer = Fluence.getPeer();
        snapshot_id = args[0];
        node = args[1];
        relay = args[2];
        config = args[3];
    }

    let request: RequestFlow;
    const promise = new Promise<{ snapshot_id: number }>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
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

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'snapshot_id', () => { return snapshot_id; });
                h.on('getDataSrv', 'node', () => { return node; });
                h.on('getDataSrv', 'relay', () => { return relay; });
                h.onEvent('callbackSrv', 'response', (args) => {
                    const [res] = args;
                    resolve(res);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for get_validation');
            })
        if (config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

