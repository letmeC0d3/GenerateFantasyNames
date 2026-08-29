/**
 * A list of offensive words and sub-strings to prevent inappropriate generations.
 * This is a basic filter list. It checks both whole word matches and bad substrings.
 */
const BLACKLIST_SUBSTRINGS = [
  "fuck", "fock", "shit", "cunt", "asshole", "bitch", "nigger", "kike", "faggot", "chink",
  "dyke", "bastard", "retard", "slut", "whore", "rape", "nazis", "hitler", "twat",
  "pedophil", "nazi", "nigga", "fag"
];

/**
 * Checks if a generated name contains any blacklisted substrings (case-insensitive).
 */
export function isSafeName(name: string): boolean {
  if (!name) return false;

  // 1. Unicode normalization & diacritic (accent) removal
  let normalized = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // 2. Case normalization
  normalized = normalized.toLowerCase();

  // 3. Separator & punctuation normalization
  normalized = normalized.replace(/[^a-z0-9]/g, "");

  // 4. Basic Leetspeak normalization
  const leetMap: Record<string, string> = {
    "0": "o",
    "1": "i",
    "2": "z",
    "3": "e",
    "4": "a",
    "5": "s",
    "7": "t",
    "8": "b"
  };
  normalized = normalized
    .split("")
    .map(char => leetMap[char] || char)
    .join("");

  // 5. Blacklist comparison
  for (const substring of BLACKLIST_SUBSTRINGS) {
    if (normalized.includes(substring)) {
      return false;
    }
  }
  return true;
}

/**
 * Clean up spelling irregularities from syllable combinations.
 * Example: triple vowels, triple identical consonants, weird vowel combinations.
 */
export function cleanSpelling(name: string): string {
  let cleaned = name;

  // 1. Triple vowels -> double vowels (e.g., aaa -> aa, ooo -> oo)
  cleaned = cleaned.replace(/([aeiouy])\1\1+/gi, "$1$1");

  // 2. Triple consonants -> double consonants (e.g., ddd -> dd)
  cleaned = cleaned.replace(/([^aeiouy])\1\1+/gi, "$1$1");

  // 3. Remove spaces at start or end
  cleaned = cleaned.trim();

  // 4. Correct casing (capitalize words in double-barrel names like Star-Whisper)
  cleaned = cleaned
    .split(" ")
    .map(word => {
      if (word.includes("-")) {
        return word
          .split("-")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
          .join("-");
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return cleaned;
}
