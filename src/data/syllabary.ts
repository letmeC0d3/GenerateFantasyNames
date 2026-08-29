export interface Syllabary {
  prefixes: string[];
  vowels?: string[];
  suffixes: string[];
}

export interface CompoundPool {
  prefixes: string[];
  suffixes: string[];
  adjectives?: string[];
  nouns?: string[];
}

// -------------------------------------------------------------
// Syllable pools for Character Races
// -------------------------------------------------------------

export const elfSyllabary = {
  male: {
    prefixes: ["Ael", "Aer", "Al", "Am", "An", "Bel", "Cal", "El", "Er", "Faal", "Gal", "Hal", "Il", "Lel", "Mel", "Nel", "Rael", "Sil", "Thal", "Val", "Wyn", "Zan", "Zeph", "Eld"],
    vowels: ["a", "ia", "o", "io", "u", "ie", "e", "ae"],
    suffixes: ["dar", "don", "dor", "ion", "las", "lian", "mil", "min", "or", "ran", "ril", "rion", "thas", "thil", "thor", "val", "wan", "wyn", "en", "is", "ith"],
  },
  female: {
    prefixes: ["Ael", "Ala", "Ely", "Faer", "Gala", "Hela", "Ila", "Key", "Lir", "Mela", "Neri", "Ola", "Rae", "Sila", "Thea", "Vale", "Wyn", "Yse", "Zari", "Elys", "Lyra"],
    vowels: ["a", "ia", "ie", "e", "ea", "ua", "o", "ae"],
    suffixes: ["ana", "ara", "bella", "cys", "dwen", "elda", "eth", "ia", "ilda", "liss", "lora", "lyra", "nia", "riel", "sery", "thae", "tina", "wen", "wyn", "ys", "zra"],
  },
  surnames: {
    prefixes: ["Amber", "Autumn", "Bright", "Dusk", "Even", "Fair", "Gold", "Green", "Moon", "Night", "Oak", "Silver", "Star", "Sun", "Wind", "Dawn", "Spell", "Swift", "Wild"],
    suffixes: ["breeze", "brook", "crest", "dew", "fall", "flower", "glade", "leaf", "light", "meadow", "shade", "song", "star", "vale", "wood", "whisper", "weaver", "runner"],
  }
};

export const darkElfSyllabary = {
  male: {
    prefixes: ["Aln", "Bael", "Chas", "Driz", "Eil", "Fild", "Gel", "Jarl", "Kil", "Mal", "Nal", "Phyr", "Ryld", "Sol", "Tal", "Val", "Xun", "Zak", "Draeg", "Ryl", "Vrn"],
    suffixes: ["akl", "arn", "axle", "bar", "daer", "dorn", "fein", "jor", "luth", "neir", "noz", "olyn", "ryn", "szin", "uld", "urd", "val", "vyne", "zzin", "eth"],
  },
  female: {
    prefixes: ["Aly", "Bri", "Chal", "Ecl", "Faer", "Grel", "Hal", "Illy", "Jael", "Lir", "Maya", "Ned", "Orel", "Phaer", "Quen", "Shur", "Vicon", "Zar", "Ere", "Thaer"],
    suffixes: ["anee", "ara", "astra", "cice", "daer", "drea", "dyna", "liss", "lora", "mae", "ney", "nym", "phrae", "rae", "ryne", "shae", "stra", "tress", "ula", "xena", "zair"],
  },
  surnames: {
    prefixes: ["Baen", "Barri", "De", "Do", "Fey", "Hun", "Kena", "Mel", "Mizz", "Noq", "Vand", "T", "Desp", "Xar"],
    suffixes: ["re", "son", "Vir", "Urden", "Branche", "ett", "fin", "arn", "rym", "uar", "ree", "arg", "pana", "zair"]
  }
};

export const dwarfSyllabary = {
  male: {
    prefixes: ["Bal", "Bof", "Brok", "Dain", "Dwal", "Far", "Glar", "Gloi", "Gor", "Har", "Kili", "Mor", "Oin", "Thor", "Thra", "Ufar", "Val", "Var", "Thra", "Bom", "Durg", "Gimli", "Fund"],
    suffixes: ["din", "dok", "dol", "dor", "drom", "gar", "grim", "grok", "kur", "li", "lin", "lok", "min", "mund", "mur", "thur", "tin", "ur", "vard", "rik", "li", "mir"],
  },
  female: {
    prefixes: ["Bal", "Bof", "Bren", "Dag", "Dis", "Eld", "Ger", "Hel", "Kifl", "Mar", "Mor", "Nor", "Ragn", "Sig", "Thra", "Ula", "Val", "Gerd", "Hilda", "Frig", "Kari", "Dora"],
    suffixes: ["a", "da", "dela", "gith", "grim", "hild", "ina", "lyra", "ma", "munda", "nora", "run", "sild", "tina", "trid", "varda", "vis", "dura", "wyn"],
  },
  surnames: {
    prefixes: ["Black", "Bronze", "Copper", "Iron", "Gold", "Silver", "Stone", "Rock", "Earth", "Coal", "Steel", "Deep", "Grim", "Rune", "Frost", "Battle", "Mountain"],
    suffixes: ["anvil", "beard", "breaker", "cavern", "delver", "forge", "hammer", "hand", "hill", "miner", "shield", "shaper", "stone", "fist", "glen", "helm", "crag"],
  }
};

export const orcSyllabary = {
  male: {
    prefixes: ["Azg", "Br", "Durg", "Garm", "Ghor", "Gn", "Gol", "Gr", "Hol", "Krog", "Lk", "Mogh", "Muz", "Org", "Rul", "Shag", "Thrg", "Ugr", "Vrg", "Gar", "Grom", "Naz", "Throk"],
    suffixes: ["ab", "ag", "ar", "ath", "bat", "dag", "dub", "gash", "gator", "gor", "grim", "gub", "khor", "lag", "mog", "nak", "nog", "rog", "tar", "ug", "ur", "lok", "mar"],
  },
  female: {
    prefixes: ["Azg", "Br", "Dur", "Gha", "Glai", "Gra", "Kre", "Mogh", "Muz", "Or", "Ru", "Sha", "Thre", "Ug", "Vr", "Kha", "Maz", "Grai"],
    suffixes: ["a", "ah", "ara", "ba", "dga", "gha", "gola", "gra", "ka", "kora", "sha", "ta", "ula", "ura", "vaza", "zara", "ba", "ria"],
  },
  surnames: {
    prefixes: ["Blood", "Bone", "Death", "Doom", "Gore", "Grim", "Iron", "Red", "Skull", "Black", "Wolf", "Beast", "Frost", "Rage", "Spite"],
    suffixes: ["axe", "breaker", "claw", "crusher", "eye", "fang", "fist", "howler", "maw", "ripper", "scarred", "tooth", "snout", "hide", "gash"],
  }
};

export const dragonSyllabary = {
  prefixes: ["Akat", "Aldu", "Ancal", "Baler", "Drac", "Faf", "Glaur", "Ign", "Maly", "Midg", "Mor", "Nelth", "Nidh", "Rhaeg", "Smau", "Verm", "Vyth", "Ysm", "Paar", "Oda", "Kros", "Bala"],
  vowels: ["a", "aa", "o", "oo", "u", "uu", "ia", "io", "ae", "i"],
  suffixes: ["agon", "anth", "arion", "ath", "ax", "dor", "garth", "gor", "gyr", "har", "ioth", "kor", "morth", "os", "oth", "rax", "rion", "thor", "thrax", "ur", "veth", "wing"],
  titles: ["the Red", "the Black", "the Dread", "the Eternal", "the Fire Drake", "the Ancient", "the Golden", "the Shadow", "the Devourer", "the Swift", "the Ruthless", "the Undying", "the Smog", "the Flame"]
};

export const humanSyllabary = {
  male: {
    prefixes: ["Ald", "Al", "Arth", "Bald", "Bar", "Ben", "Clar", "Dan", "Ed", "Eld", "Gar", "Geof", "Had", "Har", "John", "Land", "Mor", "Os", "Rad", "Rich", "Rob", "Rol", "Ted", "Val", "Will"],
    suffixes: ["ard", "ric", "ur", "win", "bert", "rick", "don", "mund", "ton", "ald", "red", "gard", "mon", "as", "is", "eth", "on", "val", "man", "ster", "ford", "wood"],
  },
  female: {
    prefixes: ["Ad", "Al", "Ann", "Beat", "Clar", "El", "Em", "Gwen", "Har", "Is", "Jen", "Kat", "Lil", "Mar", "Mel", "Nor", "Ros", "Sil", "Val", "Yv"],
    suffixes: ["a", "beth", "ice", "ina", "ith", "lyn", "ora", "osa", "sia", "wyn", "ella", "ette", "ia", "ra", "sa", "is", "ene", "ine"],
  },
  surnames: {
    prefixes: ["Baker", "Carter", "Fisher", "Miller", "Smith", "Taylor", "Black", "White", "Green", "Brown", "Hill", "Stone", "Wood", "Bridge", "Ford", "Bush", "Field", "Lake"],
    suffixes: ["", "son", "man", "house", "ford", "dale", "well", "wood", "field", "ton", "by", "worth", "brook", "land"]
  }
};

export const wizardSyllabary = {
  prefixes: ["Alamar", "Arch", "Bla", "Cad", "El", "Gan", "Gid", "Hes", "Ign", "Mal", "Mer", "Mor", "Nyc", "Rha", "Sal", "Thar", "Val", "Zan", "Kael", "Zeph", "Sol", "Aethel"],
  vowels: ["a", "aza", "el", "o", "or", "u", "ur", "i"],
  suffixes: ["dar", "don", "dor", "dus", "bar", "gard", "ius", "lin", "mon", "mor", "phyl", "rad", "storm", "thor", "wand", "ward", "weaver", "wise", "myst", "star", "flame"],
  titles: ["the Wise", "the Grey", "the Archmage", "the Unseen", "the Spellweaver", "of the East", "the Conjurer", "the Alchemist", "the Ancient", "the Sorcerer", "the Chronomancer", "the White", "the Defiant"]
};

export const vampireSyllabary = {
  prefixes: ["Aluc", "Aure", "Carm", "Drag", "Emil", "Lest", "Loth", "Luc", "Orl", "Rad", "Vlad", "Val", "Ze", "Nox", "San", "Mor", "Sil", "Cass"],
  vowels: ["a", "eli", "o", "u", "ares", "i", "ia"],
  suffixes: ["ard", "as", "ath", "cula", "ian", "is", "la", "las", "mond", "nus", "rick", "slau", "van", "von", "varna", "dus", "goth", "sanguis"],
  surnames: ["Von Carstein", "Bathory", "Tepes", "Karnstein", "Dracula", "Kurova", "Vyrkos", "Sanguinar", "Saint-Germain", "DuBois", "Loveless", "Morbius"]
};

export const angelSyllabary = {
  prefixes: ["Ab", "Ama", "Aza", "Bar", "Cham", "Dan", "Gab", "Han", "Joph", "Mich", "Mur", "Nath", "Rag", "Raph", "Uriel", "Zad", "Zer", "Sera", "Ana", "Val", "Rem"],
  vowels: ["a", "ia", "e", "ie", "o", "u"],
  suffixes: ["ael", "el", "iel", "uel", "yel", "achiel", "aiah", "ias", "aphim", "anael", "on"],
  titles: ["the Radiant", "the Pure", "the Messenger", "of Light", "the Watcher", "the Shield", "the Archangel", "the Seraph", "the Gilded", "the Merciful", "the Eternal"]
};

export const demonSyllabary = {
  prefixes: ["Abad", "Asm", "Azaz", "Baa", "Bel", "Beel", "Dem", "Diab", "Gorg", "Lil", "Mal", "Meph", "Mol", "Paz", "Sam", "Val", "Xap", "Luc", "Surg", "Bar", "Astar"],
  vowels: ["ia", "o", "u", "e", "y", "othor", "aza", "ae"],
  suffixes: ["ach", "al", "amus", "an", "aroth", "demon", "ial", "ith", "ius", "lock", "mon", "och", "or", "oth", "uel", "uz", "zebub", "goroth", "tash", "vath"],
  titles: ["the Corruptor", "the Defiler", "the Prince of Lies", "the Destroyer", "of the Abyss", "the Shadow Weaver", "the Hellfire", "the Soul Eater", "the Tormenter"]
};

export const fairySyllabary = {
  prefixes: ["Blue", "Clov", "Dew", "El", "Fay", "Fern", "Glim", "Hon", "Iris", "Lily", "Moss", "Pip", "Pix", "Rose", "Sil", "Star", "Twig", "Puck", "Bram", "This", "Fawn"],
  vowels: ["a", "i", "o", "y", "ee", "ia"],
  suffixes: ["bell", "blossom", "berry", "drop", "dust", "fly", "frost", "glow", "lily", "petal", "shine", "spark", "sprite", "star", "wing", "berry", "bud", "light"],
  surnames: ["Buttercup", "Moonbeam", "Dandelion", "Thistledown", "Meadowsweet", "Honeydew", "Pixiedust", "Oakheart", "Frostwing", "Silverglen", "Wildwood"]
};

// -------------------------------------------------------------
// Word pools for Entities (Kingdom, City, Guild, etc.)
// -------------------------------------------------------------

export const kingdomVocabulary = {
  adjectives: [
    "Ald", "Ar", "Bel", "Cal", "Dal", "Eru", "Val", "West", "East", "North", "South",
    "High", "Low", "Great", "Golden", "Iron", "Sun", "Moon", "Storm", "Shadow",
    "Crown", "Shield", "Dragon", "Winter", "Summer", "Frost", "Dread", "Aethel", "Dawn",
    "Elder", "Ever", "Stout", "Bright", "Wild", "Mithril", "Obsidian", "Savage", "Gilded",
    "Triumphant", "Eldritch", "Valiant", "Astral", "Celestial", "Highland", "Lowland",
    "Sovereign", "Clandestine", "Ashen", "Hallowed", "Glacial", "Volcanic", "Wyrm"
  ],
  suffixes: [
    "adia", "and", "ania", "aron", "aria", "dora", "gard", "ia", "ica", "land", "mark",
    "mores", "oria", "thia", "vale", "valles", "wood", "reich", "terra", "dom", "dyn",
    "domain", "reach", "province", "tract", "sovereignty", "alliance", "union", "league",
    "confederacy", "dominion"
  ],
  nouns: [
    "Sun", "Moon", "Stars", "Iron", "Gold", "Stone", "Shield", "Crown", "Throne", "Sword",
    "Dragon", "Griffon", "Phoenix", "Wolf", "Oak", "River", "Deep", "Frost", "Shadow", "Storm"
  ],
  structures: [
    "The Kingdom of [adj][suffix]",
    "The [adj] Empire",
    "The Realm of [adj][suffix]",
    "The Grand Duchy of [adj][suffix]",
    "The [adj] Principality",
    "[adj][suffix]",
    "The Kingdom of the [noun]",
    "The [adj] Confederacy",
    "The [adj] Alliance",
    "The [adj] Dominion"
  ]
};

export const cityVocabulary = {
  prefixes: [
    "Aethel", "Oak", "River", "Stone", "Deep", "Wind", "Iron", "Raven", "Winter", "Glen",
    "Black", "White", "Fair", "Silver", "King", "Bridge", "Oakhaven", "Storm", "Shadow",
    "Gold", "High", "Gale", "Amber", "Wild", "Frost", "Red", "Mourn", "Dawn", "Sunder",
    "Summer", "Ember", "Elder", "Mithril", "Rune", "Copper", "Gilded", "Ashen", "Onyx",
    "Dusk", "Brave", "Stout", "Fallen", "Savage", "Whisper", "Pine", "Cloud", "Sun"
  ],
  suffixes: [
    "bay", "borg", "bridge", "bury", "creek", "dale", "fast", "ford", "fort", "gate",
    "hall", "harbor", "haven", "hill", "hold", "mouth", "port", "run", "stead", "ton",
    "wall", "water", "wood", "worth", "crest", "glen", "reach", "valley", "marsh", "peak",
    "spire", "crag", "rise", "fall", "keep", "point", "bank", "shore", "tide", "moor",
    "cliff", "dome", "shrine", "field", "cove", "wood", "mill", "rock"
  ],
  wordSuffixes: [
    "Crossing", "Falls", "Nest", "Reach", "Garrison", "Watch", "Keep", "Peak", "Spire",
    "End", "Rest", "Market", "Glade", "Ridge", "Bay", "Fortress", "Pass", "Saddle", "Crown",
    "Anchor", "Lighthouse", "Junction", "Sanctuary", "Point", "Summit", "Vale"
  ],
  structures: [
    "[prefix][suffix]",
    "[prefix] [wordSuffix]",
    "[prefix]'s [wordSuffix]",
    "Port [prefix]",
    "[prefix] [suffix]"
  ]
};

export const guildVocabulary = {
  nouns: [
    "Alchemists", "Assassins", "Blacksmiths", "Bards", "Explorers", "Knights", "Mages",
    "Merchants", "Rangers", "Rogues", "Scholars", "Slayers", "Thieves", "Warriors", "Weavers",
    "Guardians", "Shadows", "Sentinels", "Hunters", "Keepers", "Inquisitors", "Paladins"
  ],
  modifiers: [
    "Golden", "Silver", "Shadow", "Iron", "Royal", "Secret", "Silent", "Crimson", "Eldritch",
    "Mystic", "Hallowed", "Broken", "Veiled", "Obsidian", "Sovereign", "Clandestine", "Ashen"
  ],
  structures: [
    "The [modifier] [noun]",
    "Brotherhood of [modifier] [noun]",
    "The [noun] of the [modifier] Shield",
    "Order of the [modifier] [noun_singular]",
    "The Circle of [noun]"
  ]
};

export const clanVocabulary = {
  prefixes: [
    "Blood", "Bone", "Bronze", "Cliff", "Deep", "Dusk", "Earth", "Fang", "Frost", "Grim",
    "Iron", "Mountain", "Oak", "Rock", "Shield", "Steel", "Stone", "Storm", "Thunder",
    "Wild", "Wolf", "Wood", "Axe", "Doom", "Fire", "Ice", "Rune", "Shadow", "Stout",
    "Gale", "Red", "Black", "Gold", "Silver", "Amber", "Dawn", "Dread", "Savage", "Swift",
    "Rage", "Spite", "Gloom", "Mourn", "Elder", "Raven", "Wyrm", "Mithril", "Valiant", "Wold"
  ],
  suffixes: [
    "back", "beard", "binder", "born", "breaker", "crest", "delver", "fang", "fist", "forge",
    "grip", "hammer", "hand", "hide", "horn", "keeper", "oath", "runner", "shaper", "shield",
    "stalker", "stride", "walker", "ward", "weaver", "wrath", "heart", "claw", "hound",
    "brand", "carver", "slayer", "drinker", "cleaver", "bender", "reaver", "splitter",
    "crusher", "render", "quencher", "bringer", "mark", "singer", "whisper", "glen", "brook"
  ],
  structures: [
    "[prefix][suffix]",
    "[prefix][suffix]",
    "The [prefix][suffix] Clan",
    "House of [prefix][suffix]"
  ]
};

export const tavernVocabulary = {
  adjectives: [
    "Blind", "Blue", "Drunken", "Golden", "Green", "Jolly", "Laughing", "Prancing", "Rusty",
    "Screaming", "Sleeping", "Wandering", "Wobbly", "Drowned", "Salty", "Red", "Fat",
    "Dancing", "Hungry", "Limping", "Broken", "Silver", "Whispering", "Crimson"
  ],
  nouns: [
    "Anchor", "Badger", "Barrel", "Boar", "Dragon", "Flagon", "Goblet", "Gryphon", "Harpy",
    "Horse", "Keg", "Lantern", "Mermaid", "Mug", "Pony", "Shield", "Tankard", "Unicorn",
    "Wolf", "Sailor", "Pig", "Cockatrice", "Hound", "Raven", "Crow", "Boot", "Cauldron"
  ],
  structures: [
    "The [adj] [noun]",
    "The [noun] & [noun]",
    "The [noun]'s Rest",
    "The [adj] Flagon",
    "The [noun] Tavern"
  ]
};

export const shipVocabulary = {
  adjectives: [
    "Sea", "Ocean", "Wave", "Storm", "Wind", "Crimson", "Golden", "Silent", "Black",
    "Swift", "Dread", "Royal", "Flying", "Spectral", "Dauntless", "Iron", "Cursed", "Sunk",
    "Gilded", "Obsidian", "Savage", "Ghostly", "Triumphant", "Whispering", "Sunken", "Relentless",
    "Stormy", "Roaring", "Vanguard", "Raging", "Valiant", "Wandering", "Salty", "Brave",
    "Stout", "Clandestine", "Grim", "Shadowy", "Emerald", "Sapphire", "Ironclad", "Drifting",
    "Forsaken", "Damned", "Hallowed", "Vengeful", "Eldritch", "Starlight", "Abyssal"
  ],
  nouns: [
    "Clipper", "Corsair", "Crest", "Empress", "Hawk", "Jewel", "Monarch", "Pearl",
    "Phantom", "Pride", "Rider", "Seeker", "Sovereign", "Spectre", "Star", "Stalker",
    "Strider", "Terror", "Vixen", "Wraith", "Maiden", "Siren", "Leviathan", "Serpent",
    "Wanderer", "Voyager", "Galleon", "Dreadnought", "Hound", "Falcon", "Ghost", "Slayer",
    "Raider", "Marauder", "Sentry", "Hunter", "Devourer", "Revenge", "Horizon", "Tempest",
    "Vessel", "Vanguard", "Eclipse", "Gale", "Reaver", "Glory", "Shadow"
  ],
  structures: [
    "The [adj] [noun]",
    "[noun]'s Revenge",
    "The [adj] Maiden",
    "The [noun] of the Sea",
    "The Sea [noun]",
    "The [noun] of the [noun]",
    "The [noun] of the Deep",
    "The [noun] of the [adj] Sea",
    "The [adj] [noun] of the Sea",
    "[adj] [noun]"
  ]
};

export const weaponVocabulary = {
  prefixes: [
    "Blood", "Death", "Doom", "Dragon", "Dusk", "Fate", "Fire", "Frost", "Ghost", "Grim",
    "Heart", "Ice", "Iron", "Light", "Moon", "Night", "Oath", "Shadow", "Soul", "Star",
    "Storm", "Sun", "Thunder", "Void", "Wind", "War", "God", "Rage", "Mithril"
  ],
  suffixes: [
    "bane", "biter", "blade", "breaker", "bringer", "carver", "claw", "cleaver", "drinker",
    "edge", "fang", "fury", "giver", "guard", "herald", "keeper", "quencher", "reaper",
    "render", "runner", "scythe", "shard", "shiver", "singer", "slayer", "song", "spiter",
    "stalker", "strike", "striker", "thorn", "thirst", "tongue", "weaver", "reaver"
  ],
  nouns: [
    "Sword", "Blade", "Dagger", "Axe", "Hammer", "Mace", "Staff", "Bow", "Spear", "Shield",
    "Greatsword", "Warhammer", "Scythe", "Rapier", "Halberd", "Katana"
  ],
  concepts: [
    "Valor", "Judgment", "Fury", "Vengeance", "Glory", "Honor", "Torment", "Doom", "Power",
    "Victory", "Rage", "Dusk", "Dawn", "Embers", "Shadows", "Flames", "Winter", "Thunder",
    "Whispers", "Destiny", "Hope", "Blood", "Sorrow", "Corruption"
  ]
};

export const creatureVocabulary = {
  prefixes: [
    "Dire", "Dread", "Ember", "Feather", "Fen", "Frost", "Glade", "Gryph", "Hydra", "Mantic",
    "Minot", "Nix", "Wyv", "Basil", "Chim", "Crypt", "Ash", "Void", "Cave", "Abyss", "Sky"
  ],
  vowels: ["a", "e", "i", "o", "u", "ia", "io"],
  suffixes: [
    "ara", "isk", "era", "eon", "ex", "or", "yx", "is", "us", "yre", "aza", "ath", "aris",
    "atrice", "gorg", "dra", "claw", "tail"
  ],
  titles: [
    "the Devourer", "the Swift", "the Stalker", "of the Woods", "the Shadow Beast",
    "the Deep Terror", "the Fire Drake", "the Night Creeper", "the Guardian", "the Ancient",
    "the Soul Weaver", "the Terror of the Wild"
  ]
};

export const usernameVocabulary = {
  prefixes: [
    "Ael", "Kael", "Thor", "Gloi", "Jarl", "Lira", "Zeph", "Vex", "Nyx", "Dark", "Grim",
    "Shadow", "Myth", "Storm", "Frost", "Star", "Void", "Eldritch", "Neon", "Rune", "Sage"
  ],
  nouns: [
    "Weaver", "Stalker", "Walker", "Hunter", "Blade", "Fang", "Heart", "Mage", "Rogue",
    "Knight", "Wolf", "Dragon", "Soul", "Demon", "Angel", "Dwarf", "Elf", "Wizard"
  ],
  decorations: [
    "[prefix][noun]",
    "[prefix]_[noun]",
    "[prefix][noun]_[number]",
    "xX_[prefix][noun]_Xx",
    "TheReal[prefix][noun]",
    "[prefix][noun]Gaming",
    "Its[prefix][noun]",
    "[prefix][noun]Plays"
  ]
};
