import { OnRpcRequestHandler } from '@metamask/snap-types';
import { ethErrors } from 'eth-rpc-errors';
import { InitOutput } from 'wasm-bundler';
import { JsonBIP44CoinTypeNode as Bip44Node } from '@metamask/key-tree';

import * as handlers from './handlers';
import { initializeWasm } from './wasm';

let wasm: InitOutput;
let entropy: Bip44Node;

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  if (!wasm) {
    // eslint-disable-next-line require-atomic-updates
    wasm = await initializeWasm();
  }

  if (!entropy) {
    // eslint-disable-next-line require-atomic-updates
    entropy = await wallet.request({
      method: `snap_getBip44Entropy_60`,
    });
  }

  switch (request.method) {
    case 'hello':
      return handlers.helloHandler(origin);
    case 'get_nullifier':
      return handlers.getNullifier(request.params as unknown[], entropy);
    default:
      throw ethErrors.rpc.methodNotFound({ data: request });
  }
};
