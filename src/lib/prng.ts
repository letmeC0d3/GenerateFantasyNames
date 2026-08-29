/**
 * cyrb128 is a fast 128-bit hash function that can be used to seed a PRNG from a string.
 */
export function cyrb128(str: string): number[] {
  let h1 = 1779033703, h2 = 3024733165, h3 = 3362453659, h4 = 50249321;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
}

/**
 * mulberry32 is a 32-bit generator with a state space of 2^32, offering fast and high quality pseudo-randomness.
 */
export function mulberry32(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Creates a deterministic random number generator from a string seed.
 */
export class DeterministicPRNG {
  private nextRand: () => number;
  public seed: string;

  constructor(seed: string) {
    this.seed = seed;
    const seedHash = cyrb128(seed);
    this.nextRand = mulberry32(seedHash[0]);
  }

  /**
   * Returns a random float between 0 (inclusive) and 1 (exclusive)
   */
  next(): number {
    return this.nextRand();
  }

  /**
   * Returns a random integer between min (inclusive) and max (inclusive)
   */
  nextInt(min: number, max: number): number {
    const r = this.next();
    return Math.floor(r * (max - min + 1)) + min;
  }

  /**
   * Selects a random element from an array
   */
  pick<T>(arr: T[]): T {
    if (arr.length === 0) {
      throw new Error("Cannot pick from an empty array");
    }
    const idx = this.nextInt(0, arr.length - 1);
    return arr[idx];
  }
}

/**
 * Generates a random alphanumeric seed string for user presentation
 */
export function generateSeed(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    result += chars[idx];
  }
  return result;
}
