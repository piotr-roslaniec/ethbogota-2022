const { promises: fs } = require('fs');
const path = require('path');

const WASM_PATH = path.join(
  __dirname,
  '../../../node_modules/zk-nullifier/zk_nullifier_bg.wasm',
);

// eslint-disable-next-line jsdoc/require-jsdoc
async function main(encoding) {
  const wasmBin = await fs.readFile(WASM_PATH);
  const wasmEncoded = wasmBin.toString(encoding);
  const jsFileString = `
// THIS IS A GENERATED FILE. DO NOT EDIT.
// SEE scripts/wasm-encode.js FOR MORE INFORMATION
export const WASM_PROGRAM_${encoding.toUpperCase()}: string = '${wasmEncoded}';
`;
  await fs.writeFile(`./src/wasm_${encoding}.ts`, jsFileString);
}

main('base64');
// main('hex');
