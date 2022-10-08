import { make_nullifier as makeNullifier } from 'wasm-bundler';
import { ethErrors } from 'eth-rpc-errors';
import {
  getBIP44AddressKeyDeriver,
  JsonBIP44CoinTypeNode as Bip44Node,
} from '@metamask/key-tree';
import SHA3 from 'sha3';

import { getRandomBytes, RNG_SEED_SIZE } from './rng';

export const sha256 = (msg: string): Buffer => {
  const hash = new SHA3(256);
  hash.update(msg);
  return hash.digest();
};

const makeSecretKey = async (entropy: Bip44Node) => {
  const seedPrefix = 'ZK_NULLIFIER_SEED';
  const deriveEthAddress = await getBIP44AddressKeyDeriver(entropy);
  const addressKey0 = await deriveEthAddress(0);
  const seed = sha256(`${seedPrefix}${addressKey0.toString('hex')}`);
  return seed;
};

export const getNullifier = async (
  params: unknown[],
  entropy: Bip44Node,
): Promise<string> => {
  console.log(`get_nullifier: ${JSON.stringify(params)}`);
  const message: string = params[0] as string;
  if (!message) {
    throw ethErrors.rpc.invalidParams('Missing parameter: message');
  }

  const sk = await makeSecretKey(entropy);
  const skHex = sk.toString('hex');
  const rngSeed = getRandomBytes(RNG_SEED_SIZE);

  return makeNullifier(skHex, message, rngSeed);
};

export const helloHandler = (originString: string) => {
  return wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: `Hello, ${originString}!`,
        description: 'This custom confirmation is just for display purposes.',
        textAreaContent:
          'But you can edit the snap source code to make it do something, if you want to!',
      },
    ],
  });
};
