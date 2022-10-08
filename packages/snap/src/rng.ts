export const RNG_SEED_SIZE = 32;

export const getRandomBytes = (byteCount: number): Int32Array => {
  if (!window.crypto || !window.crypto.getRandomValues) {
    throw new Error('window.crypto.getRandomValues not available');
  }
  const randomBytes = new Int32Array(byteCount);
  window.crypto.getRandomValues(randomBytes);
  return randomBytes;
};
