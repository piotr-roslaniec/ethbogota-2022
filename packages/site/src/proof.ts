// import { Proof } from './schema';
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const snarkjs = require('snarkjs'); // Using require because snarkjs doesn't have typescript types

export async function generateProof(input: any, proofFilename: string) {
  console.log('generating proof for input');
  console.log(input);
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    input,
    `../${proofFilename}.wasm`,
    `${proofFilename}.zkey`,
  );
  console.log(`Generated proof ${JSON.stringify(proof)}`);

  return {
    proof,
    publicSignals,
  };
}
