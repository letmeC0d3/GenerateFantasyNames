import { DeterministicPRNG } from "./prng";
import { isSafeName, cleanSpelling } from "./filters";
import {
  elfSyllabary,
  darkElfSyllabary,
  dwarfSyllabary,
  orcSyllabary,
  dragonSyllabary,
  humanSyllabary,
  wizardSyllabary,
  vampireSyllabary,
  angelSyllabary,
  demonSyllabary,
  fairySyllabary,
  kingdomVocabulary,
  cityVocabulary,
  guildVocabulary,
  clanVocabulary,
  tavernVocabulary,
  shipVocabulary,
  weaponVocabulary,
  creatureVocabulary,
  usernameVocabulary
} from "../data/syllabary";

export interface GeneratorConfig {
  generatorType: string; // character, kingdom, city, guild, clan, tavern, ship, weapon, creature, username
  race?: string;          // elf, dark-elf, dwarf, orc, dragon, human, wizard, vampire, angel, demon, fairy, none
  style?: string;         // high-fantasy, dark-fantasy, nordic-inspired, celtic-inspired, gothic, ancient, royal, warrior, none
  gender?: "male" | "female" | "any";
  quantity?: number;
  seed: string;
}

export interface GeneratedName {
  id: string; // unique identifier (often name + seed)
  name: string;
  pronunciation?: string;
  meaning?: string;
  seed: string;
  generatorType: string;
  race: string;
  style: string;
  gender: string;
}

// -------------------------------------------------------------
// Meaning mappings (syllable translations)
// -------------------------------------------------------------

const elfMeanings: Record<string, string> = {
  // Prefixes
  ael: "Moon", aer: "Wind", al: "Valor", am: "Flower", an: "Gift", bel: "Beautiful",
  cal: "Light", el: "Star", er: "Noble", faal: "Summer", gal: "Green", hal: "High",
  il: "Mist", lel: "Song", mel: "Honey", nel: "Shield", rael: "Crown", sil: "Silver",
  thal: "Forest", val: "Power", wyn: "White", zan: "Shadow", zeph: "Breeze", eld: "Elder",
  ala: "Bright", ely: "Grace", faer: "Fire", gala: "Joy", hela: "Sun", ila: "Dew",
  lir: "Lyric", mela: "Sweet", neri: "Sea", ola: "Pure", rae: "Grace", sila: "Starlight",
  thea: "Goddess", vale: "Valley", yse: "Iron", zari: "Golden", elys: "Blessed", lyra: "Harp",
  // Suffixes
  dar: "Giver", don: "Lord", dor: "Dweller", ion: "Son", las: "Leaf", lian: "Grace",
  mil: "Friend", min: "Defender", or: "Spear", ran: "Wanderer", ril: "Spark", rion: "Prince",
  thas: "Flame", thil: "Moonlight", thor: "Seeker", wan: "Rider",
  ana: "Grace", ara: "Noble", bella: "Beauty", cys: "Jewel", dwen: "Maiden", elda: "Wise",
  eth: "Jewel", ia: "Light", ilda: "Battle", liss: "Sweet", lora: "Dream", nia: "Radiance",
  riel: "Angel", sery: "Peace", thae: "Star", tina: "Tiny", wen: "Fair",
  // Surnames
  amber: "Amber", autumn: "Autumn", bright: "Bright", dusk: "Dusk", even: "Evening",
  fair: "Fair", gold: "Gold", green: "Green", moon: "Moon", night: "Night",
  oak: "Oak", silver: "Silver", star: "Star", sun: "Sun", wind: "Wind",
  dawn: "Dawn", spell: "Magic", swift: "Swift", wild: "Wild",
  breeze: "Breeze", brook: "Brook", crest: "Crest", dew: "Dew", fall: "Fall",
  flower: "Flower", glade: "Glade", leaf: "Leaf", light: "Light", meadow: "Meadow",
  shade: "Shade", song: "Song", wood: "Wood", whisper: "Whisper",
  weaver: "Weaver", runner: "Runner"
};

const dwarfMeanings: Record<string, string> = {
  // Prefixes
  bal: "Stout", bof: "Broad", brok: "Iron", dain: "Stone", dwal: "Deep", far: "Hammer",
  glar: "Glow", gloi: "Fire", gor: "Fierce", har: "High", kili: "Shield", mor: "Great",
  oin: "Friend", thor: "Thunder", thra: "King", ufar: "Forge", val: "Battle", var: "Guard",
  bom: "Fat", durg: "Rock", gimli: "Spark", fund: "Mine",
  bren: "Noble", dag: "Day", dis: "Lady", eld: "Elder", ger: "Spear", hel: "Fierce",
  nor: "North", ragn: "Counsel", sig: "Victory", ula: "Wealth", gerd: "Enclosure",
  hilda: "Battle", frig: "Beloved", kari: "Wind", dora: "Gift",
  // Suffixes
  din: "Dweller", dok: "Seeker", dol: "Strong", dor: "Giver", drom: "Runner", gar: "Spear",
  grim: "Fierce", grok: "Hammer", kur: "Wise", lin: "Pool", lok: "Lock", min: "Guard",
  mund: "Protector", mur: "Wall", thur: "Thunder", tin: "Metal", ur: "Lord", vard: "Warden",
  rik: "Ruler", mir: "Jewel",
  da: "Noble", dela: "Proud", gith: "Warrior", ina: "Pure", lyra: "Harp", ma: "Mother",
  munda: "Shield", nora: "Honor", run: "Rune", sild: "Silver", tina: "Tiny", trid: "Strength",
  varda: "Warden", vis: "Wise", dura: "Enduring",
  // Clan prefixes/suffixes
  black: "Black", bronze: "Bronze", copper: "Copper", iron: "Iron", gold: "Gold",
  silver: "Silver", stone: "Stone", rock: "Rock", earth: "Earth", coal: "Coal",
  steel: "Steel", deep: "Deep", rune: "Rune", frost: "Frost", battle: "Battle", mountain: "Mountain",
  anvil: "Anvil", beard: "Beard", breaker: "Breaker", cavern: "Cavern", delver: "Delver",
  forge: "Forge", hammer: "Hammer", hand: "Hand", hill: "Hill", miner: "Miner",
  shield: "Shield", shaper: "Shaper", fist: "Fist", glen: "Valley", helm: "Helmet", crag: "Cliff"
};

const orcMeanings: Record<string, string> = {
  azg: "Iron", br: "Crush", durg: "Stone", garm: "Wolf", ghor: "Blood", gn: "Sharp",
  gol: "Skull", gr: "Fierce", hol: "Cave", krog: "Rage", lk: "Fang", mogh: "Doom",
  muz: "Shadow", org: "Gore", rul: "Lord", shag: "Fear", thrg: "Bone", ugr: "Dread",
  vrg: "Scourge", gar: "Spear", grom: "Giant", naz: "Axe", throk: "Strong",
  ab: "Breaker", ag: "Blood", ar: "Leader", ath: "Fighter", bat: "Club", dag: "Slayer",
  dub: "Shield", gash: "Fire", gator: "Alligator", gor: "Gore", grim: "Fierce",
  gub: "Grit", khor: "Throne", lag: "Fast", mog: "Doom", nak: "Scar", nog: "Helm",
  rog: "Spite", tar: "Ruler", ug: "Stout", ur: "Flesh", lok: "Chief", mar: "Tough",
  gha: "Scream", gla: "Blade", gra: "Grip", kre: "Claw", ru: "Rage", sha: "Dread",
  thre: "Fang", kha: "Howl", maz: "Iron", grai: "Bone",
  ah: "Cry", ara: "Fierce", ba: "Shield", dga: "Axe", gola: "Skull",
  ka: "Claw", kora: "Heart", ta: "Stout", ula: "Stalker", ura: "Flame",
  vaza: "Spite", zara: "Princess", ria: "Grace",
  // Clan prefixes/suffixes
  death: "Death", doom: "Doom", gore: "Gore", red: "Red", skull: "Skull",
  wolf: "Wolf", beast: "Beast", rage: "Rage", spite: "Spite",
  axe: "Axe", claw: "Claw", crusher: "Crusher", eye: "Eye", fang: "Fang",
  fist: "Fist", howler: "Howler", maw: "Maw", ripper: "Ripper", scarred: "Scarred",
  tooth: "Tooth", snout: "Snout", hide: "Hide"
};

// Helper to deduce a simple meaning from name syllables
function deriveMeaning(name: string, mapping: Record<string, string>): string {
  const parts = name.split(/[\s-]+/);
  const meanings: string[] = [];

  for (const part of parts) {
    const lowercasePart = part.toLowerCase();
    
    // Check if the exact part exists in our meaning registry
    if (mapping[lowercasePart]) {
      meanings.push(mapping[lowercasePart]);
      continue;
    }

    // Otherwise check for prefix/suffix sub-chunks (e.g. Ael + las -> Moon Leaf)
    let foundMatch = false;
    for (let len = 3; len <= lowercasePart.length; len++) {
      const left = lowercasePart.substring(0, len);
      const right = lowercasePart.substring(len);
      if (mapping[left] && mapping[right]) {
        meanings.push(`${mapping[left]} ${mapping[right]}`);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      // Check if just the prefix matches
      for (let len = lowercasePart.length - 1; len >= 3; len--) {
        const left = lowercasePart.substring(0, len);
        if (mapping[left]) {
          meanings.push(mapping[left]);
          foundMatch = true;
          break;
        }
      }
    }
  }

  if (meanings.length > 0) {
    return meanings.join(" - ");
  }

  return "Legendary name";
}

// -------------------------------------------------------------
// Pronunciation Helper
// -------------------------------------------------------------
function derivePronunciation(name: string, race: string): string {
  const clean = name.replace(/[^a-zA-Z\s-]/g, "");
  const words = clean.split(" ");

  const pronWords = words.map(word => {
    let pron = word.toLowerCase();

    // Custom phonetic rules based on race
    if (race === "elf" || race === "dark-elf") {
      pron = pron.replace(/ael/g, "ay-el");
      pron = pron.replace(/aer/g, "ay-er");
      pron = pron.replace(/ian/g, "ee-an");
      pron = pron.replace(/wyn/g, "win");
      pron = pron.replace(/th/g, "th");
      pron = pron.replace(/ae/g, "ay");
      pron = pron.replace(/iel/g, "ee-el");
      pron = pron.replace(/ir/g, "eer");
    } else if (race === "dwarf") {
      pron = pron.replace(/grok/g, "grok");
      pron = pron.replace(/dain/g, "dayn");
      pron = pron.replace(/gloi/g, "gloy");
      pron = pron.replace(/oin/g, "oyn");
      pron = pron.replace(/ur/g, "oor");
      pron = pron.replace(/thur/g, "thoor");
    } else if (race === "orc") {
      pron = pron.replace(/gash/g, "gash");
      pron = pron.replace(/mogh/g, "mog");
      pron = pron.replace(/shag/g, "shag");
      pron = pron.replace(/thrg/g, "thurg");
      pron = pron.replace(/ugr/g, "oog-ur");
    }

    // Capitalize syllables roughly
    const syllables = pron.split("-");
    const formatted = syllables.map((s, idx) => {
      if (idx === 0) return s.charAt(0).toUpperCase() + s.slice(1);
      return s;
    }).join("-");

    // Standard syllable split estimation if no hyphens
    if (!formatted.includes("-") && formatted.length > 4) {
      const mid = Math.floor(formatted.length / 2);
      return formatted.substring(0, mid) + "-" + formatted.substring(mid);
    }

    return formatted;
  });

  return pronWords.join(" ");
}

// -------------------------------------------------------------
// Generator Functions
// -------------------------------------------------------------

function generateElf(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const isFemale = gender === "female" || (gender === "any" && prng.next() > 0.5);
  const syl = isFemale ? elfSyllabary.female : elfSyllabary.male;

  let first = "";
  if (prng.next() > 0.4 && syl.vowels) {
    first = prng.pick(syl.prefixes) + prng.pick(syl.vowels) + prng.pick(syl.suffixes);
  } else {
    first = prng.pick(syl.prefixes) + prng.pick(syl.suffixes);
  }

  // Surnames
  let surname = "";
  if (style === "dark-fantasy" || prng.next() > 0.4) {
    surname = prng.pick(elfSyllabary.surnames.prefixes) + prng.pick(elfSyllabary.surnames.suffixes);
  }

  // Adjustments based on style
  if (style === "dark-fantasy") {
    // Inject some dark syllables from dark elf
    if (prng.next() > 0.5) {
      first = prng.pick(darkElfSyllabary.male.prefixes) + prng.pick(darkElfSyllabary.male.suffixes);
    }
  }

  const name = cleanSpelling(surname ? `${first} ${surname}` : first);
  return {
    name,
    meaning: deriveMeaning(name, elfMeanings),
    pron: derivePronunciation(name, "elf")
  };
}

function generateDarkElf(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const isFemale = gender === "female" || (gender === "any" && prng.next() > 0.5);
  const syl = isFemale ? darkElfSyllabary.female : darkElfSyllabary.male;

  const first = prng.pick(syl.prefixes) + prng.pick(syl.suffixes);
  
  let surname = "";
  if (prng.next() > 0.3) {
    surname = prng.pick(darkElfSyllabary.surnames.prefixes) + prng.pick(darkElfSyllabary.surnames.suffixes);
  }

  const name = cleanSpelling(surname ? `${first} ${surname}` : first);
  // Re-use elf meanings map since syllables overlap, supplemented with dark elf specific mappings
  const drowMeanings = { ...elfMeanings, ...dwarfMeanings, baen: "First", des: "Noble", do: "Deep", urden: "Darkness" };
  
  return {
    name,
    meaning: deriveMeaning(name, drowMeanings),
    pron: derivePronunciation(name, "dark-elf")
  };
}

function generateDwarf(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const isFemale = gender === "female" || (gender === "any" && prng.next() > 0.5);
  const syl = isFemale ? dwarfSyllabary.female : dwarfSyllabary.male;

  const first = prng.pick(syl.prefixes) + prng.pick(syl.suffixes);
  
  let surname = "";
  if (prng.next() > 0.3) {
    surname = prng.pick(dwarfSyllabary.surnames.prefixes) + prng.pick(dwarfSyllabary.surnames.suffixes);
  }

  const name = cleanSpelling(surname ? `${first} ${surname}` : first);
  return {
    name,
    meaning: deriveMeaning(name, dwarfMeanings),
    pron: derivePronunciation(name, "dwarf")
  };
}

function generateOrc(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const isFemale = gender === "female" || (gender === "any" && prng.next() > 0.5);
  const syl = isFemale ? orcSyllabary.female : orcSyllabary.male;

  const first = prng.pick(syl.prefixes) + prng.pick(syl.suffixes);
  
  let surname = "";
  if (prng.next() > 0.4) {
    surname = prng.pick(orcSyllabary.surnames.prefixes) + prng.pick(orcSyllabary.surnames.suffixes);
  }

  const name = cleanSpelling(surname ? `${first} ${surname}` : first);
  return {
    name,
    meaning: deriveMeaning(name, orcMeanings),
    pron: derivePronunciation(name, "orc")
  };
}

function generateDragon(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const prefix = prng.pick(dragonSyllabary.prefixes);
  const vowel = prng.pick(dragonSyllabary.vowels);
  const suffix = prng.pick(dragonSyllabary.suffixes);

  let first = prefix + vowel + suffix;
  if (prng.next() > 0.6) {
    // Add double middle vowel or double consonants
    first = prefix + vowel + vowel + suffix;
  }

  let title = "";
  if (prng.next() > 0.4) {
    title = " " + prng.pick(dragonSyllabary.titles);
  }

  const name = cleanSpelling(first + title);
  return {
    name,
    meaning: prng.next() > 0.5 ? "Ancient Wyrm of Power" : "The Calamity Bringer",
    pron: derivePronunciation(first, "dragon") + (title ? " " + title.trim() : "")
  };
}

function generateHuman(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const isFemale = gender === "female" || (gender === "any" && prng.next() > 0.5);
  const syl = isFemale ? humanSyllabary.female : humanSyllabary.male;

  const first = prng.pick(syl.prefixes) + prng.pick(syl.suffixes);
  const surname = prng.pick(humanSyllabary.surnames.prefixes) + prng.pick(humanSyllabary.surnames.suffixes);

  const name = cleanSpelling(`${first} ${surname}`);
  return {
    name,
    meaning: "Common Folk / Mortal Lineage",
    pron: first + " " + surname
  };
}

function generateWizard(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const prefix = prng.pick(wizardSyllabary.prefixes);
  const vowel = prng.pick(wizardSyllabary.vowels);
  const suffix = prng.pick(wizardSyllabary.suffixes);

  const first = cleanSpelling(prefix + vowel + suffix);
  const title = prng.pick(wizardSyllabary.titles);

  const name = `${first} ${title}`;
  return {
    name,
    meaning: "Master of the Unseen Elements",
    pron: first + " " + title
  };
}

function generateVampire(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const prefix = prng.pick(vampireSyllabary.prefixes);
  const vowel = prng.pick(vampireSyllabary.vowels);
  const suffix = prng.pick(vampireSyllabary.suffixes);

  const first = cleanSpelling(prefix + vowel + suffix);
  const surname = prng.pick(vampireSyllabary.surnames);

  const name = `${first} ${surname}`;
  return {
    name,
    meaning: "Immortal Sanguine Aristocrat",
    pron: first + " " + surname
  };
}

function generateAngel(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const prefix = prng.pick(angelSyllabary.prefixes);
  const vowel = prng.pick(angelSyllabary.vowels);
  const suffix = prng.pick(angelSyllabary.suffixes);

  const first = cleanSpelling(prefix + vowel + suffix);
  const title = prng.next() > 0.5 ? " " + prng.pick(angelSyllabary.titles) : "";

  const name = `${first}${title}`;
  return {
    name,
    meaning: "Heavenly Messenger / Divine Shield",
    pron: first + (title ? " " + title.trim() : "")
  };
}

function generateDemon(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const prefix = prng.pick(demonSyllabary.prefixes);
  const vowel = prng.pick(demonSyllabary.vowels);
  const suffix = prng.pick(demonSyllabary.suffixes);

  const first = cleanSpelling(prefix + vowel + suffix);
  const title = prng.next() > 0.5 ? " " + prng.pick(demonSyllabary.titles) : "";

  const name = `${first}${title}`;
  return {
    name,
    meaning: "Abyssal Lord / Scourge of Souls",
    pron: first + (title ? " " + title.trim() : "")
  };
}

function generateFairy(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  const prefix = prng.pick(fairySyllabary.prefixes);
  const vowel = prng.pick(fairySyllabary.vowels);
  const suffix = prng.pick(fairySyllabary.suffixes);

  const first = cleanSpelling(prefix + vowel + suffix);
  const surname = prng.pick(fairySyllabary.surnames);

  const name = `${first} ${surname}`;
  return {
    name,
    meaning: "Sylvan Sprite / Guardian of the Grove",
    pron: first + " " + surname
  };
}

// -------------------------------------------------------------
// Entity Generators
// -------------------------------------------------------------

function generateKingdom(prng: DeterministicPRNG): string {
  const structure = prng.pick(kingdomVocabulary.structures);
  const adj = prng.pick(kingdomVocabulary.adjectives);
  const suffix = prng.pick(kingdomVocabulary.suffixes);
  const noun = prng.pick(kingdomVocabulary.nouns);

  return cleanSpelling(
    structure
      .replace("[adj]", adj)
      .replace("[suffix]", suffix)
      .replace("[noun]", noun)
  );
}

function generateCity(prng: DeterministicPRNG): string {
  const structure = prng.pick(cityVocabulary.structures);
  const prefix = prng.pick(cityVocabulary.prefixes);
  const suffix = prng.pick(cityVocabulary.suffixes);
  const wordSuffix = prng.pick(cityVocabulary.wordSuffixes);

  return cleanSpelling(
    structure
      .replace("[prefix]", prefix)
      .replace("[suffix]", suffix)
      .replace("[wordSuffix]", wordSuffix)
  );
}

function generateGuild(prng: DeterministicPRNG): string {
  const structure = prng.pick(guildVocabulary.structures);
  const modifier = prng.pick(guildVocabulary.modifiers);
  const noun = prng.pick(guildVocabulary.nouns);
  const nounSingular = noun.endsWith("s") ? noun.slice(0, -1) : noun;

  return cleanSpelling(
    structure
      .replace("[modifier]", modifier)
      .replace("[noun_singular]", nounSingular)
      .replace("[noun]", noun)
  );
}

function generateClan(prng: DeterministicPRNG): string {
  const structure = prng.pick(clanVocabulary.structures);
  const prefix = prng.pick(clanVocabulary.prefixes);
  const suffix = prng.pick(clanVocabulary.suffixes);

  return cleanSpelling(
    structure
      .replace("[prefix]", prefix)
      .replace("[suffix]", suffix)
  );
}

function generateTavern(prng: DeterministicPRNG): string {
  const structure = prng.pick(tavernVocabulary.structures);
  const adj = prng.pick(tavernVocabulary.adjectives);
  const noun1 = prng.pick(tavernVocabulary.nouns);
  let noun2 = prng.pick(tavernVocabulary.nouns);
  while (noun2 === noun1) {
    noun2 = prng.pick(tavernVocabulary.nouns);
  }

  return cleanSpelling(
    structure
      .replace("[adj]", adj)
      .replace("[noun]", noun1)
      .replace("[noun]", noun2) // replaces second instance if structure has two
  );
}

function generateShip(prng: DeterministicPRNG): string {
  const structure = prng.pick(shipVocabulary.structures);
  const adj1 = prng.pick(shipVocabulary.adjectives);
  let adj2 = prng.pick(shipVocabulary.adjectives);
  while (adj2 === adj1) {
    adj2 = prng.pick(shipVocabulary.adjectives);
  }
  const noun1 = prng.pick(shipVocabulary.nouns);
  let noun2 = prng.pick(shipVocabulary.nouns);
  while (noun2 === noun1) {
    noun2 = prng.pick(shipVocabulary.nouns);
  }

  return cleanSpelling(
    structure
      .replace("[adj]", adj1)
      .replace("[adj]", adj2)
      .replace("[noun]", noun1)
      .replace("[noun]", noun2)
  );
}

function generateWeapon(prng: DeterministicPRNG): string {
  const roll = prng.next();
  const prefix = prng.pick(weaponVocabulary.prefixes);
  const suffix = prng.pick(weaponVocabulary.suffixes);
  const noun = prng.pick(weaponVocabulary.nouns);
  const concept = prng.pick((weaponVocabulary as any).concepts || ["Glory", "Honor", "Doom"]);

  if (roll < 0.4) {
    return cleanSpelling(`${prefix}${suffix}`);
  } else if (roll < 0.7) {
    return cleanSpelling(`${prefix}'s ${noun}`);
  } else {
    return cleanSpelling(`${noun} of ${prefix} ${concept}`);
  }
}

function generateCreature(prng: DeterministicPRNG): { name: string; title: string } {
  const prefix = prng.pick(creatureVocabulary.prefixes);
  const vowel = prng.pick(creatureVocabulary.vowels);
  const suffix = prng.pick(creatureVocabulary.suffixes);
  const title = prng.pick(creatureVocabulary.titles);

  // If the suffix starts with a vowel, avoid adding a connecting vowel
  const startsWithVowel = /^[aeiouy]/i.test(suffix);
  const base = cleanSpelling(startsWithVowel ? (prefix + suffix) : (prefix + vowel + suffix));

  return {
    name: `${base} ${title}`,
    title
  };
}

function generateUsername(prng: DeterministicPRNG): string {
  const structure = prng.pick(usernameVocabulary.decorations);
  const prefix = prng.pick(usernameVocabulary.prefixes);
  const noun = prng.pick(usernameVocabulary.nouns);
  const number = prng.nextInt(10, 9999);

  return structure
    .replace("[prefix]", prefix)
    .replace("[noun]", noun)
    .replace("[number]", number.toString());
}

// -------------------------------------------------------------
// CORE ENTRY POINT
// -------------------------------------------------------------

export function generateNames(config: GeneratorConfig): GeneratedName[] {
  const {
    generatorType,
    race = "none",
    style = "none",
    gender = "any",
    quantity = 10,
    seed
  } = config;

  const names: GeneratedName[] = [];
  const basePrng = new DeterministicPRNG(seed);

  // Generate names using index-shifted seeds to guarantee determinism for each slot
  for (let i = 0; i < quantity; i++) {
    let nameObj: { name: string; meaning?: string; pronunciation?: string } = { name: "" };
    
    // Shift seed per iteration to yield diverse results
    const iterationSeed = `${seed}-${i}`;
    const prng = new DeterministicPRNG(iterationSeed);
    let attempts = 0;
    const maxAttempts = 100;

    // Retry loop to ensure safety/uniqueness
    let success = false;
    while (attempts < maxAttempts) {
      attempts++;
      const currentPrng = new DeterministicPRNG(`${iterationSeed}-attempt-${attempts}`);

      if (generatorType === "character" || generatorType === "dnd") {
        // Resolve race
        let targetRace = race;
        if (race === "none" || race === "any") {
          const races = ["elf", "dark-elf", "dwarf", "orc", "dragon", "human", "wizard", "vampire", "angel", "demon", "fairy"];
          targetRace = currentPrng.pick(races);
        }

        switch (targetRace) {
          case "elf":
            nameObj = generateElf(currentPrng, gender, style);
            break;
          case "dark-elf":
            nameObj = generateDarkElf(currentPrng, gender, style);
            break;
          case "dwarf":
            nameObj = generateDwarf(currentPrng, gender, style);
            break;
          case "orc":
            nameObj = generateOrc(currentPrng, gender, style);
            break;
          case "dragon":
            nameObj = generateDragon(currentPrng, gender, style);
            break;
          case "human":
            nameObj = generateHuman(currentPrng, gender, style);
            break;
          case "wizard":
            nameObj = generateWizard(currentPrng, gender, style);
            break;
          case "vampire":
            nameObj = generateVampire(currentPrng, gender, style);
            break;
          case "angel":
            nameObj = generateAngel(currentPrng, gender, style);
            break;
          case "demon":
            nameObj = generateDemon(currentPrng, gender, style);
            break;
          case "fairy":
            nameObj = generateFairy(currentPrng, gender, style);
            break;
          default:
            nameObj = generateHuman(currentPrng, gender, style);
        }
        
        // Add race attribute to resolved object
        (nameObj as any).race = targetRace;

      } else {
        // Entity names
        switch (generatorType) {
          case "kingdom":
            nameObj = { name: generateKingdom(currentPrng), meaning: "Land / Nation Sovereign" };
            break;
          case "city":
            nameObj = { name: generateCity(currentPrng), meaning: "Settlement / Stronghold" };
            break;
          case "guild":
            nameObj = { name: generateGuild(currentPrng), meaning: "Factions / Fellowship" };
            break;
          case "clan":
            nameObj = { name: generateClan(currentPrng), meaning: "Kinship / Warband" };
            break;
          case "tavern":
            nameObj = { name: generateTavern(currentPrng), meaning: "Establishment / Inn" };
            break;
          case "ship":
            nameObj = { name: generateShip(currentPrng), meaning: "Vessel / Sea Raider" };
            break;
          case "weapon":
            nameObj = { name: generateWeapon(currentPrng), meaning: "Legendary Armament" };
            break;
          case "creature": {
            const res = generateCreature(currentPrng);
            nameObj = { name: res.name, meaning: `Beast / ${res.title}` };
            break;
          }
          case "username":
            nameObj = { name: generateUsername(currentPrng), meaning: "Gaming Alias" };
            break;
          default:
            nameObj = { name: generateCity(currentPrng) };
        }
      }

      // Validate name
      if (isSafeName(nameObj.name) && !names.some(n => n.name === nameObj.name)) {
        success = true;
        break;
      }
    }

    // Default fallbacks in case check failed repeatedly
    if (!success) {
      // Gracefully stop adding duplicate names if pool is exhausted
      break;
    }

    if (!nameObj.name) {
      nameObj = { name: "Aelthas Nightbane", meaning: "Noble Star - Night Scourge", pronunciation: "AY-el-thas" };
    }

    names.push({
      id: `${nameObj.name.replace(/\s+/g, "-")}-${iterationSeed}`,
      name: nameObj.name,
      pronunciation: nameObj.pronunciation || derivePronunciation(nameObj.name, (nameObj as any).race || race),
      meaning: nameObj.meaning || "Legendary name",
      seed: iterationSeed,
      generatorType,
      race: (nameObj as any).race || race,
      style,
      gender
    });
  }

  return names;
}

// -------------------------------------------------------------
// REMIX ACTIONS
// -------------------------------------------------------------

export type RemixAction = "darker" | "royal" | "ancient" | "longer" | "shorter" | "similar";

export function remixName(nameObj: GeneratedName, action: RemixAction): GeneratedName {
  // Setup a shifted seed derived from the target name's own seed
  const remixSeed = `${nameObj.seed}-remix-${action}`;
  const prng = new DeterministicPRNG(remixSeed);

  let newName = "";
  let newMeaning = nameObj.meaning || "Remixed legacy";
  let newPron = "";

  const firstName = nameObj.name.split(" ")[0];

  switch (action) {
    case "similar": {
      // Re-run generation with a shifted seed on the original configurations
      const config: GeneratorConfig = {
        generatorType: nameObj.generatorType,
        race: nameObj.race,
        style: nameObj.style,
        gender: nameObj.gender as any,
        quantity: 1,
        seed: remixSeed
      };
      const res = generateNames(config);
      return res[0];
    }
    case "darker": {
      // Append a dark suffix or make it sound harsher
      const darkSuffixes = ["the Shadow", "the Grim", "Dread", "Doom", "Nightbane", "Nox", "Vile", "the Accursed"];
      const suffix = prng.pick(darkSuffixes);
      newName = cleanSpelling(prng.next() > 0.5 ? `${firstName} ${suffix}` : `${suffix} ${firstName}`);
      newMeaning = "Remixed into Darkness";
      break;
    }
    case "royal": {
      // Add titles like "the Golden", "Von", "Royal"
      const royalTitles = ["the Golden", "the Great", "the Magnificent", "Sovereign", "Rex", "the Crowned"];
      const title = prng.pick(royalTitles);
      newName = cleanSpelling(`${firstName} ${title}`);
      newMeaning = "Remixed into Royalty";
      break;
    }
    case "ancient": {
      const ancientPrefixes = ["Aethel", "Ald", "Eld", "Old", "Aethelgard"];
      const pref = prng.pick(ancientPrefixes);
      newName = cleanSpelling(`${pref}-${firstName}`);
      newMeaning = "Remixed into the Ancient Past";
      break;
    }
    case "longer": {
      // Append another word or surname
      const surnames = ["Moonbrook", "Ironfist", "Stoneforge", "Stormrider", "Starwhisper", "Grimaxe"];
      const sur = prng.pick(surnames);
      newName = cleanSpelling(`${nameObj.name} ${sur}`);
      newMeaning = "Expanded Name";
      break;
    }
    case "shorter": {
      // Slice name or take only the first name
      newName = firstName;
      newMeaning = "Shortened Name";
      break;
    }
    default:
      newName = nameObj.name;
  }

  newPron = derivePronunciation(newName, nameObj.race);

  return {
    ...nameObj,
    id: `${newName.replace(/\s+/g, "-")}-${remixSeed}`,
    name: newName,
    meaning: newMeaning,
    pronunciation: newPron,
    seed: remixSeed
  };
}
