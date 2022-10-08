import * as wasmProver from 'wasm-bundler';
import { InitOutput } from 'wasm-bundler';

import { WASM_PROGRAM_BASE64 } from './wasm_base64';

// Reference: https://stackoverflow.com/a/41106346/2649048
// TODO: Avoid using `atob`
const arrayBufferFromBase64 = (base64String: string) =>
  Uint8Array.from(atob(base64String), (c) => c.charCodeAt(0));

export const initializeWasm = async (): Promise<InitOutput> => {
  try {
    const wasmBuffer = arrayBufferFromBase64(WASM_PROGRAM_BASE64);
    const wasmModule = await WebAssembly.compile(wasmBuffer);
    return await wasmProver.default(wasmModule);
  } catch (error) {
    console.error('Failed to initialize WebAssembly module.', error);
    throw error;
  }
};
