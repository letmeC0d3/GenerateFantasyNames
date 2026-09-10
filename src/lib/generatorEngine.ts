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
  usernameVocabulary,
  tieflingSyllabary,
  cyberpunkVocabulary,
  warhammerVocabulary
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
    } else if (race === "tiefling") {
      pron = pron.replace(/enos/g, "eh-nos");
      pron = pron.replace(/akos/g, "ah-kos");
      pron = pron.replace(/leuc/g, "loo-k");
      pron = pron.replace(/ther/g, "theh-rye");
      pron = pron.replace(/mord/g, "mor-dye");
    } else if (race === "warhammer") {
      pron = pron.replace(/ius/g, "ee-us");
      pron = pron.replace(/orath/g, "or-ath");
      pron = pron.replace(/mund/g, "moond");
      pron = pron.replace(/vane/g, "vayn");
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

function generateDarkElf(prng: DeterministicPRNG, gender: "male" | "female" | "any"): { name: string; meaning: string; pron: string } {
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

function generateDwarf(prng: DeterministicPRNG, gender: "male" | "female" | "any"): { name: string; meaning: string; pron: string } {
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

function generateOrc(prng: DeterministicPRNG, gender: "male" | "female" | "any"): { name: string; meaning: string; pron: string } {
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

function generateDragon(prng: DeterministicPRNG): { name: string; meaning: string; pron: string } {
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

function generateHuman(prng: DeterministicPRNG, gender: "male" | "female" | "any"): { name: string; meaning: string; pron: string } {
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

function generateWizard(prng: DeterministicPRNG): { name: string; meaning: string; pron: string } {
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

function generateVampire(prng: DeterministicPRNG): { name: string; meaning: string; pron: string } {
  const prefix = prng.pick(vampireSyllabary.prefixes);
  const vowel = prng.pick(vampireSyllabary.vowels);
  const suffix = prng.pick(vampireSyllabary.suffixes);

  const first = cleanSpelling(prefix + vowel + suffix);
  const surname = prng.pick(vampireSyllabary.surnames);

  const name = `${first} ${surname}`;
  return {
    name,
    meaning: "Creature of the Immortal Night",
    pron: first + " " + surname
  };
}

function generateAngel(prng: DeterministicPRNG): { name: string; meaning: string; pron: string } {
  const prefix = prng.pick(angelSyllabary.prefixes);
  const vowel = prng.pick(angelSyllabary.vowels);
  const suffix = prng.pick(angelSyllabary.suffixes);

  const first = cleanSpelling(prefix + vowel + suffix);
  const title = prng.pick(angelSyllabary.titles);

  const name = `${first} ${title}`;
  return {
    name,
    meaning: "Emissary of the Celestial Heavens",
    pron: first + " " + title
  };
}

function generateDemon(prng: DeterministicPRNG): { name: string; meaning: string; pron: string } {
  const prefix = prng.pick(demonSyllabary.prefixes);
  const vowel = prng.pick(demonSyllabary.vowels);
  const suffix = prng.pick(demonSyllabary.suffixes);

  const first = cleanSpelling(prefix + vowel + suffix);
  const title = prng.pick(demonSyllabary.titles);

  const name = `${first} ${title}`;
  return {
    name,
    meaning: "Fiend of the Nether Abyss",
    pron: first + " " + title
  };
}

function generateFairy(prng: DeterministicPRNG): { name: string; meaning: string; pron: string } {
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
  const concept = prng.pick((weaponVocabulary as unknown as { concepts: string[] }).concepts || ["Glory", "Honor", "Doom"]);

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
// PSEO EXPANSION GENERATORS (Tiefling, Cyberpunk, Warhammer)
// -------------------------------------------------------------

const tieflingMeanings: Record<string, string> = {
  akm: "Sharp Mind", amn: "Loyal", bar: "Lightning", dam: "Tamer", ek: "Cunning",
  iad: "Seeker", kair: "Opportune", leuc: "Light-Bearer", mel: "Ruler", mord: "Rebel",
  morth: "Death-Touched", pel: "Wayfarer", skam: "Dark-Cloaked", ther: "Hunter",
  malf: "Fiend-Blood", bel: "Tormentor", cass: "Shield", azaz: "Defiant", zar: "Flame",
  val: "Power",
  akt: "First-Born", an: "Grace", brys: "Beloved", cri: "Vow", e: "Spirit",
  kall: "Beautiful", ler: "Courage", mak: "Blessed", nem: "Avenger", ori: "Dawn",
  phel: "Starlight", riet: "River", zeph: "Breeze", lil: "Night",
  horn: "Horn", hell: "Infernal", nether: "Abyss", brim: "Brimstone", shadow: "Shadow",
  cinder: "Cinder", blood: "Blood", ashen: "Ash", dread: "Dread", gloom: "Gloom",
  flame: "Flame", void: "Void",
  carver: "Carver", fire: "Fire", strider: "Strider", stone: "Stone", thorn: "Thorn",
  gaze: "Gaze", binder: "Binder", heart: "Heart", wrath: "Wrath", walker: "Walker"
};

function generateTiefling(prng: DeterministicPRNG, gender: "male" | "female" | "any", style: string): { name: string; meaning: string; pron: string } {
  // 25% chance of Virtue name (classic D&D 5e lore)
  if (style !== "royal" && prng.next() < 0.25) {
    const virtue = prng.pick(tieflingSyllabary.virtueNames);
    let surname = "";
    if (prng.next() > 0.4) {
      surname = prng.pick(tieflingSyllabary.surnames.prefixes) + prng.pick(tieflingSyllabary.surnames.suffixes);
    }
    const fullName = cleanSpelling(surname ? `${virtue} ${surname}` : virtue);
    return {
      name: fullName,
      meaning: "D&D 5e Virtue Name (Philosophical Ideal)",
      pron: virtue + (surname ? " " + surname : "")
    };
  }

  const isFemale = gender === "female" || (gender === "any" && prng.next() > 0.5);
  const syl = isFemale ? tieflingSyllabary.female : tieflingSyllabary.male;

  const prefix = prng.pick(syl.prefixes);
  const vowel = syl.vowels && prng.next() > 0.4 ? prng.pick(syl.vowels) : "";
  const suffix = prng.pick(syl.suffixes);
  const first = cleanSpelling(prefix + vowel + suffix);

  let surname = "";
  if (prng.next() > 0.3) {
    surname = prng.pick(tieflingSyllabary.surnames.prefixes) + prng.pick(tieflingSyllabary.surnames.suffixes);
  }

  const name = cleanSpelling(surname ? `${first} ${surname}` : first);
  return {
    name,
    meaning: deriveMeaning(name, tieflingMeanings) || "Infernal Bloodline",
    pron: derivePronunciation(first, "tiefling") + (surname ? " " + surname : "")
  };
}

function generateCyberpunk(prng: DeterministicPRNG): { name: string; meaning: string; pron: string } {
  const structure = prng.pick(cyberpunkVocabulary.structures);
  const prefix = prng.pick(cyberpunkVocabulary.prefixes);
  const suffix = prng.pick(cyberpunkVocabulary.suffixes);
  const alias = prng.pick(cyberpunkVocabulary.aliases);
  const number = prng.nextInt(10, 99);

  const name = cleanSpelling(
    structure
      .replace("[prefix]", prefix)
      .replace("[suffix]", suffix)
      .replace("[alias]", alias)
      .replace("[number]", number.toString())
  );

  return {
    name,
    meaning: "Cyberpunk Street Handle / Netrunner Alias",
    pron: name.replace(/_/g, " ").replace(/'/g, "")
  };
}

function generateWarhammer(prng: DeterministicPRNG): { name: string; meaning: string; pron: string } {
  const structure = prng.pick(warhammerVocabulary.structures);
  const prefix = prng.pick(warhammerVocabulary.prefixes);
  const suffix = prng.pick(warhammerVocabulary.suffixes);
  const title = prng.pick(warhammerVocabulary.titles);
  const chapter = prng.pick(warhammerVocabulary.chapters);

  const name = cleanSpelling(
    structure
      .replace("[prefix]", prefix)
      .replace("[suffix]", suffix)
      .replace("[title]", title)
      .replace("[chapter]", chapter)
  );

  return {
    name,
    meaning: "Grimdark Imperial Hero / Chapter Warrior",
    pron: derivePronunciation(prefix + suffix, "warhammer") + (title ? " " + title : "")
  };
}

// -------------------------------------------------------------
// DECOUPLED DATA-DRIVEN GENERATOR RULE REGISTRY
// -------------------------------------------------------------

export interface GeneratorRule {
  id: string;
  name: string;
  category: "character" | "entity";
  generate: (prng: DeterministicPRNG, gender?: "male" | "female" | "any", style?: string) => {
    name: string;
    meaning?: string;
    pronunciation?: string;
  };
}

export const ruleRegistry: Record<string, GeneratorRule> = {
  // Characters & Races
  elf: {
    id: "elf",
    name: "Elf",
    category: "character",
    generate: (prng, gender, style) => generateElf(prng, gender || "any", style || "none")
  },
  "dark-elf": {
    id: "dark-elf",
    name: "Dark Elf",
    category: "character",
    generate: (prng, gender) => generateDarkElf(prng, gender || "any")
  },
  dwarf: {
    id: "dwarf",
    name: "Dwarf",
    category: "character",
    generate: (prng, gender) => generateDwarf(prng, gender || "any")
  },
  orc: {
    id: "orc",
    name: "Orc",
    category: "character",
    generate: (prng, gender) => generateOrc(prng, gender || "any")
  },
  tiefling: {
    id: "tiefling",
    name: "Tiefling",
    category: "character",
    generate: (prng, gender, style) => generateTiefling(prng, gender || "any", style || "none")
  },
  dragon: {
    id: "dragon",
    name: "Dragon",
    category: "character",
    generate: (prng) => generateDragon(prng)
  },
  human: {
    id: "human",
    name: "Human",
    category: "character",
    generate: (prng, gender) => generateHuman(prng, gender || "any")
  },
  wizard: {
    id: "wizard",
    name: "Wizard",
    category: "character",
    generate: (prng) => generateWizard(prng)
  },
  vampire: {
    id: "vampire",
    name: "Vampire",
    category: "character",
    generate: (prng) => generateVampire(prng)
  },
  angel: {
    id: "angel",
    name: "Angel",
    category: "character",
    generate: (prng) => generateAngel(prng)
  },
  demon: {
    id: "demon",
    name: "Demon",
    category: "character",
    generate: (prng) => generateDemon(prng)
  },
  fairy: {
    id: "fairy",
    name: "Fairy",
    category: "character",
    generate: (prng) => generateFairy(prng)
  },

  // Places, Organizations, Objects & Other
  kingdom: {
    id: "kingdom",
    name: "Kingdom",
    category: "entity",
    generate: (prng) => ({ name: generateKingdom(prng), meaning: "Land / Nation Sovereign" })
  },
  city: {
    id: "city",
    name: "City",
    category: "entity",
    generate: (prng) => ({ name: generateCity(prng), meaning: "Settlement / Stronghold" })
  },
  guild: {
    id: "guild",
    name: "Guild",
    category: "entity",
    generate: (prng) => ({ name: generateGuild(prng), meaning: "Factions / Fellowship" })
  },
  clan: {
    id: "clan",
    name: "Clan",
    category: "entity",
    generate: (prng) => ({ name: generateClan(prng), meaning: "Kinship / Warband" })
  },
  tavern: {
    id: "tavern",
    name: "Tavern",
    category: "entity",
    generate: (prng) => ({ name: generateTavern(prng), meaning: "Establishment / Inn" })
  },
  ship: {
    id: "ship",
    name: "Ship",
    category: "entity",
    generate: (prng) => ({ name: generateShip(prng), meaning: "Vessel / Sea Raider" })
  },
  weapon: {
    id: "weapon",
    name: "Weapon",
    category: "entity",
    generate: (prng) => ({ name: generateWeapon(prng), meaning: "Legendary Armament" })
  },
  creature: {
    id: "creature",
    name: "Creature",
    category: "entity",
    generate: (prng) => {
      const res = generateCreature(prng);
      return { name: res.name, meaning: `Beast / ${res.title}` };
    }
  },
  username: {
    id: "username",
    name: "Username",
    category: "entity",
    generate: (prng) => ({ name: generateUsername(prng), meaning: "Gaming Alias" })
  },
  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk",
    category: "entity",
    generate: (prng) => generateCyberpunk(prng)
  },
  warhammer: {
    id: "warhammer",
    name: "Warhammer",
    category: "entity",
    generate: (prng) => generateWarhammer(prng)
  }
};

export function registerGeneratorRule(key: string, rule: GeneratorRule) {
  ruleRegistry[key] = rule;
}

export function getGeneratorRule(key: string): GeneratorRule | undefined {
  return ruleRegistry[key];
}

export function getRegisteredRuleKeys(): string[] {
  return Object.keys(ruleRegistry);
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

  // Generate names using index-shifted seeds to guarantee determinism for each slot
  for (let i = 0; i < quantity; i++) {
    let nameObj: { name: string; meaning?: string; pronunciation?: string; race?: string } = { name: "" };
    
    // Shift seed per iteration to yield diverse results
    const iterationSeed = `${seed}-${i}`;
    let attempts = 0;
    const maxAttempts = 100;

    // Retry loop to ensure safety/uniqueness
    let success = false;
    while (attempts < maxAttempts) {
      attempts++;
      const currentPrng = new DeterministicPRNG(`${iterationSeed}-attempt-${attempts}`);

      // Resolve target rule key without hardcoded switches
      let targetKey = "";
      if (generatorType === "character" || generatorType === "dnd") {
        if (race === "none" || race === "any" || !race) {
          const characterRaces = ["elf", "dark-elf", "dwarf", "orc", "dragon", "human", "wizard", "vampire", "angel", "demon", "fairy"];
          targetKey = currentPrng.pick(characterRaces);
        } else {
          targetKey = race;
        }
      } else {
        targetKey = generatorType;
      }

      // Execute rule via decoupled registry lookup
      const rule = ruleRegistry[targetKey] || ruleRegistry[race] || ruleRegistry["human"];
      const generated = rule.generate(currentPrng, gender, style);

      nameObj = {
        name: generated.name,
        meaning: generated.meaning,
        pronunciation: generated.pronunciation,
        race: targetKey,
      };

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
      pronunciation: nameObj.pronunciation || derivePronunciation(nameObj.name, nameObj.race || race),
      meaning: nameObj.meaning || "Legendary name",
      seed: iterationSeed,
      generatorType,
      race: nameObj.race || race,
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
        gender: (nameObj.gender === "male" || nameObj.gender === "female") ? nameObj.gender : "any",
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
