import { generateNames, GeneratorConfig } from "../src/lib/generatorEngine";
import { isSafeName } from "../src/lib/filters";

// Define the test list mapping slug/gen types to run
interface TestTarget {
  name: string;
  config: GeneratorConfig;
}

const testTargets: TestTarget[] = [
  { name: "General (Home)", config: { generatorType: "character", race: "any", seed: "TESTHOME", quantity: 200 } },
  { name: "Elf", config: { generatorType: "character", race: "elf", seed: "TESTELF", quantity: 200 } },
  { name: "Dark Elf", config: { generatorType: "character", race: "dark-elf", seed: "TESTDROW", quantity: 200 } },
  { name: "Dwarf", config: { generatorType: "character", race: "dwarf", seed: "TESTDWARF", quantity: 200 } },
  { name: "Orc", config: { generatorType: "character", race: "orc", seed: "TESTORC", quantity: 200 } },
  { name: "Dragon", config: { generatorType: "character", race: "dragon", seed: "TESTDRAG", quantity: 200 } },
  { name: "Wizard", config: { generatorType: "character", race: "wizard", seed: "TESTWIZ", quantity: 200 } },
  { name: "Vampire", config: { generatorType: "character", race: "vampire", seed: "TESTVAMP", quantity: 200 } },
  { name: "Angel", config: { generatorType: "character", race: "angel", seed: "TESTANGEL", quantity: 200 } },
  { name: "Demon", config: { generatorType: "character", race: "demon", seed: "TESTDEMON", quantity: 200 } },
  { name: "Fairy", config: { generatorType: "character", race: "fairy", seed: "TESTFAIRY", quantity: 200 } },
  { name: "Kingdom", config: { generatorType: "kingdom", seed: "TESTKINGDOM", quantity: 200 } },
  { name: "City", config: { generatorType: "city", seed: "TESTCITY", quantity: 200 } },
  { name: "Guild", config: { generatorType: "guild", seed: "TESTGUILD", quantity: 200 } },
  { name: "Clan", config: { generatorType: "clan", seed: "TESTCLAN", quantity: 200 } },
  { name: "Tavern", config: { generatorType: "tavern", seed: "TESTTAVERN", quantity: 200 } },
  { name: "Ship", config: { generatorType: "ship", seed: "TESTSHIP", quantity: 200 } },
  { name: "Weapon", config: { generatorType: "weapon", seed: "TESTWEAPON", quantity: 200 } },
  { name: "Creature", config: { generatorType: "creature", seed: "TESTCREATURE", quantity: 200 } },
  { name: "Username", config: { generatorType: "username", seed: "TESTUSER", quantity: 200 } }
];

interface TestResult {
  generator: string;
  samples: number;
  duplicateRate: string;
  quality: "EXCELLENT" | "GOOD" | "POOR";
  problems: string;
  recommendation: string;
}

function runTests() {
  console.log("====================================================");
  console.log("GFN GENERATOR ENGINE QA RUN: 4,000 TOTAL GENERATIONS");
  console.log("====================================================\n");

  // 1. Assert content filters reject slurs
  console.log("Test: Profanity Filter Validation...");
  const badNames = ["Aelthas Shitlord", "Dain Fuckface", "Asshole the Dread"];
  const filterPass = badNames.every(name => !isSafeName(name));
  if (filterPass) {
    console.log("✓ Content filter successfully blocked all forced profanities.\n");
  } else {
    console.error("✗ Content filter failed to block profanities!\n");
    process.exit(1);
  }

  const resultsTable: TestResult[] = [];

  for (const target of testTargets) {
    const list = generateNames(target.config);
    const names = list.map(n => n.name);
    
    // Check duplicates
    const uniqueNames = new Set(names);
    const duplicates = names.length - uniqueNames.size;
    const duplicateRatePercent = ((duplicates / names.length) * 100).toFixed(1) + "%";

    // Check empty/null strings
    const hasEmpty = names.some(name => !name || name.trim() === "" || name.includes("undefined") || name.includes("null"));
    
    let quality: "EXCELLENT" | "GOOD" | "POOR" = "EXCELLENT";
    let problems = "None";
    let recommendation = "None - Deploy";

    if (hasEmpty) {
      quality = "POOR";
      problems = "Empty or malformed values";
      recommendation = "Inspect syllable lists for empty arrays";
    } else if (duplicates > 0) {
      quality = "GOOD";
      problems = `${duplicates} duplicates generated in 200`;
      recommendation = "Increase syllable pool size if duplicates rise";
    }

    resultsTable.push({
      generator: target.name,
      samples: names.length,
      duplicateRate: duplicateRatePercent,
      quality,
      problems,
      recommendation
    });
  }

  // Print results in markdown format for copying directly into the final report
  console.log("| Generator | Samples | Duplicate Rate | Quality | Problems | Recommendation |");
  console.log("|---|---:|---:|---|---|---|");
  for (const r of resultsTable) {
    console.log(`| ${r.generator} | ${r.samples} | ${r.duplicateRate} | ${r.quality} | ${r.problems} | ${r.recommendation} |`);
  }
}

runTests();
