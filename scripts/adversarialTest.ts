import { generateNames, GeneratorConfig } from "../src/lib/generatorEngine";
import { isSafeName } from "../src/lib/filters";

interface Target {
  name: string;
  config: GeneratorConfig;
}

const targets: Target[] = [
  { name: "General (Home)", config: { generatorType: "character", race: "any", seed: "ADV_HOME", quantity: 1000 } },
  { name: "Elf", config: { generatorType: "character", race: "elf", seed: "ADV_ELF", quantity: 1000 } },
  { name: "Dark Elf", config: { generatorType: "character", race: "dark-elf", seed: "ADV_DROW", quantity: 1000 } },
  { name: "Dwarf", config: { generatorType: "character", race: "dwarf", seed: "ADV_DWARF", quantity: 1000 } },
  { name: "Orc", config: { generatorType: "character", race: "orc", seed: "ADV_ORC", quantity: 1000 } },
  { name: "Dragon", config: { generatorType: "character", race: "dragon", seed: "ADV_DRAG", quantity: 1000 } },
  { name: "Wizard", config: { generatorType: "character", race: "wizard", seed: "ADV_WIZ", quantity: 1000 } },
  { name: "Vampire", config: { generatorType: "character", race: "vampire", seed: "ADV_VAMP", quantity: 1000 } },
  { name: "Angel", config: { generatorType: "character", race: "angel", seed: "ADV_ANGEL", quantity: 1000 } },
  { name: "Demon", config: { generatorType: "character", race: "demon", seed: "ADV_DEMON", quantity: 1000 } },
  { name: "Fairy", config: { generatorType: "character", race: "fairy", seed: "ADV_FAIRY", quantity: 1000 } },
  { name: "Kingdom", config: { generatorType: "kingdom", seed: "ADV_KINGDOM", quantity: 1000 } },
  { name: "City", config: { generatorType: "city", seed: "ADV_CITY", quantity: 1000 } },
  { name: "Guild", config: { generatorType: "guild", seed: "ADV_GUILD", quantity: 1000 } },
  { name: "Clan", config: { generatorType: "clan", seed: "ADV_CLAN", quantity: 1000 } },
  { name: "Tavern", config: { generatorType: "tavern", seed: "ADV_TAVERN", quantity: 1000 } },
  { name: "Ship", config: { generatorType: "ship", seed: "ADV_SHIP", quantity: 1000 } },
  { name: "Weapon", config: { generatorType: "weapon", seed: "ADV_WEAPON", quantity: 1000 } },
  { name: "Creature", config: { generatorType: "creature", seed: "ADV_CREATURE", quantity: 1000 } },
  { name: "Username", config: { generatorType: "username", seed: "ADV_USER", quantity: 1000 } }
];

// Helper to compute Levenshtein distance
function levenshtein(s1: string, s2: string): number {
  const m = s1.length, n = s2.length;
  const d: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      if (s1[i - 1] === s2[j - 1]) d[i][j] = d[i - 1][j - 1];
      else d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + 1);
    }
  }
  return d[m][n];
}

function verifyProfanityFilter() {
  const testCases = [
    { input: "cunt", expectedSafe: false, desc: "normal prohibited substring" },
    { input: "BITCH", expectedSafe: false, desc: "uppercase variation" },
    { input: "f u c k", expectedSafe: false, desc: "spaces" },
    { input: "f-u-c-k", expectedSafe: false, desc: "hyphens" },
    { input: "f.u.c.k!", expectedSafe: false, desc: "punctuation" },
    { input: "fúck", expectedSafe: false, desc: "accented variation" },
    { input: "nïgger", expectedSafe: false, desc: "accented variation 2" },
    { input: "f0ck", expectedSafe: false, desc: "basic numeric substitution" },
    { input: "sh1t", expectedSafe: false, desc: "basic numeric substitution 2" },
    { input: "Aëlthas", expectedSafe: true, desc: "legitimate accented fantasy name" },
    { input: "Kael'thas", expectedSafe: true, desc: "legitimate apostrophe fantasy name" },
    { input: "Thor-grim", expectedSafe: true, desc: "legitimate hyphenated fantasy name" },
    { input: "Vael-dor", expectedSafe: true, desc: "legitimate hyphenated fantasy name" },
    { input: "Aure-lius", expectedSafe: true, desc: "legitimate hyphenated fantasy name" }
  ];

  console.log("=== SECURITY: PROFANITY FILTER NORMALIZATION TESTS ===");
  let passed = 0;
  for (const tc of testCases) {
    const isSafe = isSafeName(tc.input);
    const result = isSafe === tc.expectedSafe;
    if (result) passed++;
    console.log(`- Test "${tc.desc}" for input "${tc.input}": ${result ? "PASSED" : "FAILED"} (Got safe=${isSafe}, expected=${tc.expectedSafe})`);
  }
  console.log(`Profanity filter tests: ${passed}/${testCases.length} passed.\n`);
}

interface AnalysisResult {
  name: string;
  samples: number;
  exactDuplicates: number;
  nearDuplicates: number; // Levenshtein distance <= 2
  avgLength: number;
  minLength: number;
  minName: string;
  maxLength: number;
  maxName: string;
  repPrefixes: string;
  repSuffixes: string;
  goodExamples: string[];
  awkwardExamples: string[];
}

function runAdversarialTest() {
  verifyProfanityFilter();
  const allGenerated: Record<string, string[]> = {};
  const analysis: AnalysisResult[] = [];

  // Generate names
  for (const t of targets) {
    const list = generateNames(t.config);
    allGenerated[t.name] = list.map(n => n.name);
  }

  // Analyze each target
  for (const t of targets) {
    const names = allGenerated[t.name];
    const exactDuplicates = names.length - new Set(names).size;

    // Near duplicates calculation (Levenshtein distance <= 2)
    let nearDuplicates = 0;
    for (let i = 0; i < names.length; i++) {
      for (let j = i + 1; j < names.length; j++) {
        if (levenshtein(names[i], names[j]) <= 2) {
          nearDuplicates++;
        }
      }
    }

    // Length calculations
    let totalLen = 0;
    let minLen = Infinity;
    let maxLen = -Infinity;
    let minName = "";
    let maxName = "";

    for (const name of names) {
      totalLen += name.length;
      if (name.length < minLen) {
        minLen = name.length;
        minName = name;
      }
      if (name.length > maxLen) {
        maxLen = name.length;
        maxName = name;
      }
    }

    const avgLength = totalLen / names.length;

    // Prefix/Suffix repetitions (based on word split)
    const prefixes: Record<string, number> = {};
    const suffixes: Record<string, number> = {};

    for (const name of names) {
      const parts = name.split(" ");
      const firstWord = parts[0];
      if (firstWord.length >= 3) {
        const pref = firstWord.substring(0, 3).toLowerCase();
        const suff = firstWord.substring(firstWord.length - 3).toLowerCase();
        prefixes[pref] = (prefixes[pref] || 0) + 1;
        suffixes[suff] = (suffixes[suff] || 0) + 1;
      }
    }

    const sortedPrefixes = Object.entries(prefixes).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([p, count]) => `${p} (${((count/names.length)*100).toFixed(0)}%)`).join(", ");
    const sortedSuffixes = Object.entries(suffixes).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([s, count]) => `${s} (${((count/names.length)*100).toFixed(0)}%)`).join(", ");

    // Examples identification
    const goodExamples = names.slice(0, 10);
    const awkwardExamples: string[] = [];

    // Rules for awkward examples: double consonants or double vowels in weird places, very short/long, or contains hyphenated tags
    for (const name of names) {
      const lower = name.toLowerCase();
      // Look for duplicate adjacent consonants that sound strange (e.g. "xun", "Zak") or odd patterns
      const hasOddConsonants = /([bcdfghjklmnpqrstvwxyz])\1{1,}/i.test(lower) && !/(ll|ss|tt|rr|pp|ff|dd|gg|mm|nn|cc|bb)/i.test(lower);
      const isVeryShort = name.length <= 4;
      const isVeryLong = name.length >= 22;
      const hasDash = name.includes("-");
      
      if ((hasOddConsonants || isVeryShort || isVeryLong || hasDash) && awkwardExamples.length < 10 && !goodExamples.includes(name)) {
        awkwardExamples.push(name);
      }
    }

    // Fill rest of awkward examples if not enough found
    let fallbackIdx = 10;
    while (awkwardExamples.length < 10 && fallbackIdx < names.length) {
      const candidate = names[fallbackIdx];
      if (!goodExamples.includes(candidate) && !awkwardExamples.includes(candidate)) {
        awkwardExamples.push(candidate);
      }
      fallbackIdx++;
    }

    analysis.push({
      name: t.name,
      samples: names.length,
      exactDuplicates,
      nearDuplicates,
      avgLength,
      minLength: minLen,
      minName,
      maxLength: maxLen,
      maxName,
      repPrefixes: sortedPrefixes || "N/A",
      repSuffixes: sortedSuffixes || "N/A",
      goodExamples,
      awkwardExamples
    });
  }

  // Cross-category overlap metrics
  console.log("=== CROSS-CATEGORY OVERLAP MATRIX ===");
  const categoryNames = targets.map(t => t.name);
  for (let i = 0; i < categoryNames.length; i++) {
    for (let j = i + 1; j < categoryNames.length; j++) {
      const setA = new Set(allGenerated[categoryNames[i]]);
      const setB = allGenerated[categoryNames[j]];
      let overlaps = 0;
      for (const name of setB) {
        if (setA.has(name)) overlaps++;
      }
      if (overlaps > 0) {
        console.log(`Overlap between [${categoryNames[i]}] and [${categoryNames[j]}]: ${overlaps} names match.`);
      }
    }
  }
  console.log("Cross-category overlap run complete.\n");

  // Output details for report inclusion
  console.log("=== INDIVIDUAL CATEGORY RESULTS ===");
  for (const a of analysis) {
    console.log(`\nCategory: ${a.name}`);
    console.log(`- Samples: ${a.samples}`);
    console.log(`- Exact Duplicates: ${a.exactDuplicates}`);
    console.log(`- Near Duplicates (Levenshtein <= 2): ${a.nearDuplicates}`);
    console.log(`- Average Length: ${a.avgLength.toFixed(1)} chars (Shortest: "${a.minName}" [${a.minLength}], Longest: "${a.maxName}" [${a.maxLength}])`);
    console.log(`- Prefix Repetition: ${a.repPrefixes}`);
    console.log(`- Suffix Repetition: ${a.repSuffixes}`);
    console.log(`- 10 Good Examples: ${JSON.stringify(a.goodExamples)}`);
    console.log(`- 10 Suspicious Examples: ${JSON.stringify(a.awkwardExamples)}`);
  }
}

runAdversarialTest();
