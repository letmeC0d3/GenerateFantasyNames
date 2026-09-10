import { GeneratorConfig } from "../lib/generatorEngine";

export interface ExampleNameItem {
  name: string;
  pronunciation: string;
  meaning: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export const generatorTypeOptions: SelectOption[] = [
  { value: "character", label: "Character" },
  { value: "dnd", label: "D&D Race" },
  { value: "kingdom", label: "Kingdom" },
  { value: "city", label: "City" },
  { value: "guild", label: "Guild" },
  { value: "clan", label: "Clan" },
  { value: "tavern", label: "Tavern" },
  { value: "ship", label: "Ship" },
  { value: "weapon", label: "Weapon" },
  { value: "creature", label: "Creature" },
  { value: "username", label: "Username" },
  { value: "cyberpunk", label: "Cyberpunk & Sci-Fi" },
  { value: "warhammer", label: "Warhammer & Grimdark" },
];

export const raceOptions: SelectOption[] = [
  { value: "any", label: "Any Race (Random)" },
  { value: "elf", label: "Elf" },
  { value: "dark-elf", label: "Dark Elf (Drow)" },
  { value: "dwarf", label: "Dwarf" },
  { value: "orc", label: "Orc" },
  { value: "tiefling", label: "Tiefling (D&D 5e)" },
  { value: "dragonborn", label: "Dragonborn (D&D 5e)" },
  { value: "half-orc", label: "Half-Orc (D&D 5e)" },
  { value: "dragon", label: "Dragon" },
  { value: "human", label: "Human" },
  { value: "wizard", label: "Wizard" },
  { value: "vampire", label: "Vampire" },
  { value: "witch", label: "Witch" },
  { value: "pirate", label: "Pirate" },
  { value: "goblin", label: "Goblin" },
  { value: "angel", label: "Angel" },
  { value: "demon", label: "Demon" },
  { value: "fairy", label: "Fairy" },
];

export const styleOptions: SelectOption[] = [
  { value: "none", label: "Standard / Genre Classic" },
  { value: "high-fantasy", label: "High Fantasy" },
  { value: "dark-fantasy", label: "Dark Fantasy" },
  { value: "ancient", label: "Ancient" },
  { value: "royal", label: "Royal" },
  { value: "warrior", label: "Warrior" },
  { value: "cyberpunk-hacker", label: "Cyberpunk / Hacker" },
  { value: "grimdark", label: "Grimdark" },
];

export interface GeneratorPageConfig {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  description: string;
  category: "Characters & Races" | "Places" | "Organizations" | "Objects" | "Sci-Fi & Grimdark" | "Other";
  generatorConfig: Partial<GeneratorConfig>;
  about: string;
  characteristics: string;
  faqs: Array<{ q: string; a: string }>;
  relatedSlugs: string[];
  exampleNames?: ExampleNameItem[];
}

export const homepageConfig: GeneratorPageConfig = {
  slug: "",
  title: "Fantasy Name Generator — Create Unique Fantasy Names",
  metaDescription: "Generate premium, phonetically structured fantasy names for characters, kingdoms, guilds, weapons, ships, and usernames. Fast and deterministic.",
  h1: "Fantasy Name Generator",
  description: "Generate fantasy names that actually sound like they belong together.",
  category: "Other",
  generatorConfig: {
    generatorType: "character",
    race: "any",
    style: "none",
    gender: "any",
    quantity: 10
  },
  about: "Our central fantasy name generator uses a deterministic rule-based syllable engine to build authentic, structured names. Rather than splicing random dictionary words, it focuses on phonetics, consonant clusters, and natural cadence.",
  characteristics: "By blending vowel transitions, harsh or soft syllables, and style modifiers, this engine mimics custom naming languages. You can tweak parameters to generate names for different fictional settings.",
  faqs: [
    { q: "Is this fantasy name generator free?", a: "Yes, it is entirely free to use and operates client-side for near-instant generations." },
    { q: "Can I use these names in my book or game?", a: "Yes. All names generated are free to use in your stories, novels, games, and screenplays without royalty obligations." }
  ],
  relatedSlugs: ["elf-name-generator", "dwarf-name-generator", "fantasy-kingdom-name-generator", "fantasy-username-generator"]
};

export const generatorPages: GeneratorPageConfig[] = [
  {
    slug: "elf-name-generator",
    title: "Elf Name Generator — Create Unique Elven Names",
    metaDescription: "Generate beautiful, flowing elven names with meanings and pronunciations. Perfect for D&D, fantasy novels, and MMO characters.",
    h1: "Elf Name Generator",
    description: "Generate melodic, traditional elven names with noble lineage.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "elf",
      style: "high-fantasy",
      gender: "any",
      quantity: 10
    },
    about: "Elven naming systems are highly melodic and flowing, avoiding harsh consonant combinations. Prefixes and suffixes carry specific natural translations like Moon, Star, or Leaf, representing their deep connection with nature and magic.",
    characteristics: "Names usually combine a melodic prefix, a soft vowel transition, and a flowing suffix (e.g. -las, -rion, -wen). Surnames are compound translations of natural objects, like Moonbrook or Starwhisper.",
    faqs: [
      { q: "How are elven names structured?", a: "They combine soft prefixes with natural suffixes, often indicating lineage or affinity to nature." },
      { q: "What makes these names sound elven?", a: "The avoidance of harsh stops (like k, g, z) and heavy reliance on liquid consonants (l, r, s, w)." }
    ],
    relatedSlugs: ["dark-elf-name-generator", "dwarf-name-generator", "fairy-name-generator", "fantasy-character-name-generator"]
  },
  {
    slug: "dark-elf-name-generator",
    title: "Dark Elf Name Generator — Drow Naming Tool",
    metaDescription: "Generate harsh, mysterious Drow / Dark Elf names. Perfect for Underdark campaigns, rogues, and sorcerers.",
    h1: "Dark Elf Name Generator",
    description: "Generate dark, mysterious names from the deep Underdark.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "dark-elf",
      style: "dark-fantasy",
      gender: "any",
      quantity: 10
    },
    about: "Dark Elves, or Drow, dwell in subterranean caverns. Their language employs sharper, sibilant sounds (z, x, sh) compared to surface elves. Names carry meanings of shadow, poison, and deep stone.",
    characteristics: "Drow names feature sibilant consonant clusters, glottal stops, and prefixes that sound sharp and foreboding. Noble house titles form their surnames.",
    faqs: [
      { q: "What is a Drow naming convention?", a: "Drow names typically consist of a sharp, prefix syllable linked with family house identifiers." },
      { q: "Are Dark Elf names good for evil characters?", a: "Yes, they fit anti-heroes, rogues, assassins, and dark spellcasters perfectly." }
    ],
    relatedSlugs: ["elf-name-generator", "demon-name-generator", "orc-name-generator", "fantasy-clan-name-generator"]
  },
  {
    slug: "dwarf-name-generator",
    title: "Dwarf Name Generator — Traditional Dwarven Names",
    metaDescription: "Generate stout, heavy-consonant dwarf character and clan names. Perfect for fighters, paladins, and smiths.",
    h1: "Dwarf Name Generator",
    description: "Generate strong, heavy dwarf names reflecting stone and steel.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "dwarf",
      style: "nordic-inspired",
      gender: "any",
      quantity: 10
    },
    about: "Dwarven culture respects history, blacksmithing, and physical strength. Their names are grounded, featuring hard consonants (b, d, g, k, t, r) and clan surnames denoting their profession or weaponry.",
    characteristics: "Names utilize hard, single-syllable prefixes merged with solid suffixes. Surnames combine terms like Stone, Iron, Anvil, and Shield (e.g. Ironfist, Stoneforge).",
    faqs: [
      { q: "What inspired dwarven names?", a: "Old Norse, Germanic linguistics, and earth/mining metaphors." },
      { q: "Are dwarf clan names important?", a: "Extremely. Dwarf family clans define their caste, guild affiliation, and historical achievements." }
    ],
    relatedSlugs: ["elf-name-generator", "orc-name-generator", "fantasy-clan-name-generator", "weapon-name-generator"]
  },
  {
    slug: "orc-name-generator",
    title: "Orc Name Generator — Powerful Orcish Names",
    metaDescription: "Generate brutal, guttural names for orc warlocks and fighters. Ideal for fantasy writing and tabletop RPGs.",
    h1: "Orc Name Generator",
    description: "Generate raw, powerful guttural names for tribal fighters.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "orc",
      style: "warrior",
      gender: "any",
      quantity: 10
    },
    about: "Orcish names are short, guttural, and aggressive. They rely heavily on harsh throat sounds (g, k, gh, kr, og) and denote tribal feats, battle scars, or feral strength.",
    characteristics: "Feral consonant stops, short vowels, and bloodthirsty titles (e.g. Grom Skullcrusher) are hallmarks of Orcish names.",
    faqs: [
      { q: "Why do orc names sound aggressive?", a: "They use hard stops, throaty fricatives, and minimal liquid vowels to mimic a harsh dialect." },
      { q: "Do Orcs have surnames?", a: "They usually take tribal titles or descriptors based on battle achievements." }
    ],
    relatedSlugs: ["dwarf-name-generator", "dark-elf-name-generator", "demon-name-generator", "fantasy-clan-name-generator"]
  },
  {
    slug: "dragon-name-generator",
    title: "Dragon Name Generator — Mighty Draconic Names for D&D & RPGs",
    metaDescription: "Generate ancient, epic dragon names with royal draconic titles. Perfect for D&D 5e wyrms, fantasy worldbuilding, and tabletop campaigns.",
    h1: "Dragon Name Generator",
    description: "Generate ancient, multi-syllable names for legendary drakes, wyrms, and elder dragons.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "dragon",
      style: "ancient",
      gender: "any",
      quantity: 10
    },
    about: "Dragons are apex predators of arcane power and primordial fire in fantasy mythology. Within tabletop roleplaying and epic worldbuilding, a dragon's true name is not merely a label, but a proclamation of power, age, hoard size, and destructive deeds spanning centuries.\n\nDraconic names mirror the physiological grandeur of wyrms: elongated, resonant vowel sounds represent rumbling roars, while harsh guttural stops emulate snapping jaws and clashing scales. True dragon names grow more elaborate as the beast ages, accumulating honorifics and elemental titles that strike terror into mortal kingdoms.",
    characteristics: "Elongated vowel combinations (aa, oo, ae, y) paired with sharp plosives and draconic suffixes (-thrax, -morth, -zar, -gath). Often accompanied by grandiose elemental titles such as 'the Flame-Scourge', 'the Dread', or 'the World-Ender'.",
    faqs: [
      { q: "How do you choose a great dragon name for D&D 5e?", a: "Combine heavy guttural syllables that feel weighty when spoken aloud, paired with a descriptive epithet reflecting their chromatic or metallic breath weapon." },
      { q: "What do dragon titles mean in fantasy lore?", a: "Dragon titles commemorate their greatest conquests, hoard acquisitions, or apocalyptic campaigns against mortal realms." }
    ],
    relatedSlugs: ["dragonborn-name-generator", "wizard-name-generator", "demon-name-generator"],
    exampleNames: [
      { name: "Baelvrynn the World-Ender", pronunciation: "BAIL-vrin the WORLD-en-der", meaning: "Elder Draconic: 'Bael' (devouring flame) + 'vrynn' (ancient terror)" },
      { name: "Igniscar the Ash-Bringer", pronunciation: "IG-nis-kar the ASH-bring-er", meaning: "High Wyrm: 'Igni' (primal fire) + 'scar' (world-cleaver)" },
      { name: "Vermithrax the Undying", pronunciation: "ver-mi-THRAKS the un-DY-ing", meaning: "Ancient Drake: 'Vermi' (venom-bound) + 'thrax' (iron-hide)" }
    ]
  },

  {
    slug: "wizard-name-generator",
    title: "Wizard Name Generator — Arcane Spellcaster Names",
    metaDescription: "Generate mystical, scholarly names for wizards, mages, and sorcerers with magical titles.",
    h1: "Wizard Name Generator",
    description: "Generate scholarly, arcane names for spellcasters and mages.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "wizard",
      style: "mystical",
      gender: "any",
      quantity: 10
    },
    about: "Wizard names recall ancient scrolls, tower libraries, and astrological mapping. They sound wise, mysterious, and are usually combined with professional magical titles.",
    characteristics: "Classic naming syllables combined with magic-related suffixes (e.g. -weaver, -wise, -storm) and honorific titles like 'the Spellweaver'.",
    faqs: [
      { q: "What makes a name sound like a wizard?", a: "A mix of ancient Latinate roots and mystical suffixes denoting control over elements." }
    ],
    relatedSlugs: ["dragon-name-generator", "angel-name-generator", "fantasy-guild-name-generator", "weapon-name-generator"]
  },
  {
    slug: "vampire-name-generator",
    title: "Vampire Name Generator — Gothic Aristocratic & Bloodline Names",
    metaDescription: "Generate elegant, gothic vampire names and aristocratic house titles. Ideal for Vampire: The Masquerade, D&D undead, and gothic horror fiction.",
    h1: "Vampire Name Generator",
    description: "Generate dark, aristocratic gothic names for immortal nobles, bloodline lords, and creatures of the night.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "vampire",
      style: "gothic",
      gender: "any",
      quantity: 10
    },
    about: "Vampires personify immortality, decadence, and aristocratic terror. Haunting the shadow-draped halls of gothic castles and high-society masquerades, undead lords preserve dynastic names that predate mortal empires, carrying the memory of forgotten royal lineages.\n\nTheir naming conventions heavily reflect historical European aristocracy—predominantly Austro-Hungarian, Romanian, French, and Victorian British nobilities. A vampire's name carries an innate cadence of polite sophistication layered over lethal predatory intent.",
    characteristics: "Refined, multi-syllabic classical given names (Cassian, Vladislaus, Seraphina) coupled with dynastic house prefixes ('Von', 'De') and sinister geographic surnames (Carstein, Bathory, Ravencrest).",
    faqs: [
      { q: "What linguistic base do gothic vampire names use?", a: "Vampire names frequently blend Eastern European Slavic phonetics (Romanian, Hungarian) with Old German, French nobility prefixes, and Latinate roots." },
      { q: "Can I use these names for Vampire: The Masquerade?", a: "Yes. The generated names suit ancient elders, Ventrue oligarchs, Toreador artists, and Lasombra shadow lords." }
    ],
    relatedSlugs: ["demon-name-generator", "witch-name-generator", "dark-elf-name-generator"],
    exampleNames: [
      { name: "Cassian Von Carstein", pronunciation: "KAS-ee-un von KAR-styne", meaning: "Imperial Lineage: 'Cassian' (hollow night) + dynastic vampire house" },
      { name: "Seraphina Bathory", pronunciation: "sair-uh-FEE-nuh BAH-thor-ee", meaning: "Archaic Gothic: 'Seraphina' (fiery spirit) + historical blood countess namesake" },
      { name: "Vladislaus Ravencrest", pronunciation: "VLAD-is-lows RAY-ven-krest", meaning: "Ancient Brood: 'Vladislaus' (glorious ruler) + ancestral dark manor seat" }
    ]
  },
  {
    slug: "angel-name-generator",
    title: "Angel Name Generator — Divine Seraphic Names",
    metaDescription: "Generate glowing, seraphic names for angels and divine messengers with holy titles.",
    h1: "Angel Name Generator",
    description: "Generate glowing, radiant names for celestial beings.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "angel",
      style: "royal",
      gender: "any",
      quantity: 10
    },
    about: "Angelic names sound resonant, pure, and divine. They follow traditional Hebrew celestial mappings, ending with suffixes that mean 'of God'.",
    characteristics: "Melodious prefixes ending with suffixes like -el, -ael, or -iel (e.g. Gabriel, Uriel), accompanied by holy titles.",
    faqs: [
      { q: "What is the suffix '-el' in angel names?", a: "In semitic languages, '-el' translates to 'God' or 'Divine Presence'." }
    ],
    relatedSlugs: ["demon-name-generator", "wizard-name-generator", "fairy-name-generator", "fantasy-character-name-generator"]
  },
  {
    slug: "demon-name-generator",
    title: "Demon Name Generator — Abyssal & Infernal Fiend Names",
    metaDescription: "Generate terrifying, sinister demon names and abyssal lord titles. Perfect for D&D fiends, underworld bosses, and grimdark campaigns.",
    h1: "Demon Name Generator",
    description: "Generate dark, threatening names for abyssal lords, underworld fiends, and pact-makers.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "demon",
      style: "dark-fantasy",
      gender: "any",
      quantity: 10
    },
    about: "Fiends of the Lower Planes embody cosmic entropy, malice, and corruption. Whether spawned from the churning chaotic flesh of the Abyss or forged in the rigid infernal brass of the Nine Hells, a demon's name is an incantation of ruin, often spoken only in whispers by fearful mortal cultists.\n\nDemonic and Abyssal nomenclature relies on harsh, jarring phonetic collisions that sound unnatural on mortal tongues. In tabletop lore, discovering a demon's true name grants absolute occult power over the creature, making fiends guard their true designations with lethal paranoia.",
    characteristics: "Explosive guttural plosives (k, z, x, th, gh), apostrophes signifying glottal catches, and heavy abyssal suffixes (-gath, -oth, -morth, -zebub) paired with dread titles like 'the Hell-Forged' or 'the Soul-Reaper'.",
    faqs: [
      { q: "What is the difference between demonic and devilish names?", a: "Demonic names are chaotic, harsh, and guttural (Abyssal), while devilish names (Infernal) often exhibit twisted legalistic Latinate elegance." },
      { q: "What are demon true names in fantasy RPGs?", a: "True names represent a fiend's core essence; summoning rituals require knowing this secret name to bind or banish the fiend." }
    ],
    relatedSlugs: ["tiefling-name-generator", "vampire-name-generator", "warhammer-name-generator"],
    exampleNames: [
      { name: "Malok the Hell-Forged", pronunciation: "MAY-lok the HEL-forjd", meaning: "Abyssal: 'Mal' (wrath/spite) + 'ok' (unyielding monolith)" },
      { name: "Xul'Garith the Soul-Reaper", pronunciation: "zool-GAH-rith the SOHL-ree-per", meaning: "Infernal: 'Xul' (void) + 'Garith' (consumer of oaths)" },
      { name: "Belzador the Flesh-Tearer", pronunciation: "bel-ZAY-dor the FLESH-tair-er", meaning: "Archfiend: 'Bel' (dark lord) + 'zador' (dread master)" }
    ]
  },
  {
    slug: "fairy-name-generator",
    title: "Fairy Name Generator — Whimsical Pixie Names",
    metaDescription: "Generate cute, whimsical names for fairies, pixies, and sprites of the deep woods.",
    h1: "Fairy Name Generator",
    description: "Generate playful, nature-inspired names for sylvan sprites.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "fairy",
      style: "mystical",
      gender: "any",
      quantity: 10
    },
    about: "Fairies are playful, nature-aligned spirits. Their names sound short, bright, and are heavily inspired by forest flora, dew, and stardust.",
    characteristics: "Short, cute prefixes combined with nature-themed suffixes (e.g. -blossom, -wing, -fly) and light, herbal surnames.",
    faqs: [
      { q: "What is a fairy naming convention?", a: "Names are typically compound terms of natural objects, flowers, or weather events." }
    ],
    relatedSlugs: ["elf-name-generator", "angel-name-generator", "creature-name-generator", "fantasy-username-generator"]
  },
  {
    slug: "fantasy-kingdom-name-generator",
    title: "Kingdom Name Generator — Epic Fictional Realms",
    metaDescription: "Generate grand, historical-sounding names for kingdoms, empires, and duchies. Great for worldbuilding.",
    h1: "Fantasy Kingdom Name Generator",
    description: "Generate grand, sovereign names for kingdoms and realms.",
    category: "Places",
    generatorConfig: {
      generatorType: "kingdom",
      quantity: 10
    },
    about: "Kingdom names define the political structure of your world. They sound old, sovereign, and carry a sense of stability or empire.",
    characteristics: "Combines regional suffixes (-adia, -land, -gard) with noble attributes, often formatted as 'The Kingdom of [Name]'.",
    faqs: [
      { q: "How do I choose a kingdom name?", a: "Select one that reflects its geographical climate or the primary guild/culture." }
    ],
    relatedSlugs: ["fantasy-city-name-generator", "fantasy-guild-name-generator", "fantasy-clan-name-generator", "fantasy-ship-name-generator"]
  },
  {
    slug: "fantasy-city-name-generator",
    title: "City Name Generator — Medieval Town Names",
    metaDescription: "Generate authentic names for fantasy medieval cities, towns, ports, and keeps.",
    h1: "Fantasy City Name Generator",
    description: "Generate authentic names for medieval cities, ports, and keeps.",
    category: "Places",
    generatorConfig: {
      generatorType: "city",
      quantity: 10
    },
    about: "Cities grow around rivers, mountains, and trade routes. Their names are usually descriptive of their location or founder.",
    characteristics: "Combines descriptors (Deep, River, Stone, Winter) with administrative suffixes (-bury, -haven, -ford, -hold).",
    faqs: [
      { q: "What makes a city name realistic?", a: "Slight spelling adaptations of geographic landmarks." }
    ],
    relatedSlugs: ["fantasy-kingdom-name-generator", "fantasy-tavern-name-generator", "fantasy-guild-name-generator", "fantasy-clan-name-generator"]
  },
  {
    slug: "fantasy-guild-name-generator",
    title: "Guild Name Generator — Faction & Alliance Names",
    metaDescription: "Generate mysterious and noble names for guilds, factions, orders, and brotherhoods.",
    h1: "Fantasy Guild Name Generator",
    description: "Generate noble, secretive names for guild factions and orders.",
    category: "Organizations",
    generatorConfig: {
      generatorType: "guild",
      quantity: 10
    },
    about: "Guilds represent trade alliances, secret societies, or military orders. Their names project authority or mystery to build group identity.",
    characteristics: "Structured as 'The [Modifier] [Profession]' or 'Order of the [Modifier] Shield'.",
    faqs: [
      { q: "Can I use these names for gaming guilds?", a: "Absolutely. They fit WoW, ESO, FFXIV, and tabletop guilds perfectly." }
    ],
    relatedSlugs: ["fantasy-clan-name-generator", "fantasy-kingdom-name-generator", "fantasy-tavern-name-generator", "weapon-name-generator"]
  },
  {
    slug: "fantasy-clan-name-generator",
    title: "Clan Name Generator — Tribal & House Surnames",
    metaDescription: "Generate tribal, legacy-driven clan names for dwarfs, orcs, and highland families.",
    h1: "Fantasy Clan Name Generator",
    description: "Generate ancient, legacy-driven names for tribal clans.",
    category: "Organizations",
    generatorConfig: {
      generatorType: "clan",
      quantity: 10
    },
    about: "Clans represent kinship, shared ancestry, and survival. Their names are grounded, combining natural elements with weapons or verbs.",
    characteristics: "Compound names that merge physical components (Stone, Storm, Axe) with family roles (fist, breaker, born).",
    faqs: [
      { q: "Which races use clan names?", a: "Dwarves, Orcs, Barbarians, and highland human families." }
    ],
    relatedSlugs: ["fantasy-guild-name-generator", "dwarf-name-generator", "orc-name-generator", "fantasy-kingdom-name-generator"]
  },
  {
    slug: "weapon-name-generator",
    title: "Weapon Name Generator — Legendary Sword & Armament Names",
    metaDescription: "Generate epic names for legendary swords, axes, bows, and shields.",
    h1: "Weapon Name Generator",
    description: "Generate epic names for swords, legendary staves, and armaments.",
    category: "Objects",
    generatorConfig: {
      generatorType: "weapon",
      quantity: 10
    },
    about: "Legendary weapons are characters in their own right, carrying histories of past kings and wars. Their names are threatening and epic.",
    characteristics: "Compiles combat verbs with nouns of impact, such as Doom-bringer, Heart-seeker, or Soul-weaver.",
    faqs: [
      { q: "How are weapon names formatted?", a: "They can be single compound titles or descriptive names like 'Sword of Star Fire'." }
    ],
    relatedSlugs: ["creature-name-generator", "wizard-name-generator", "fantasy-clan-name-generator", "fantasy-guild-name-generator"]
  },
  {
    slug: "fantasy-ship-name-generator",
    title: "Ship Name Generator — Pirate & Sea Vessel Names",
    metaDescription: "Generate adventurous names for pirate ships, galleons, naval vessels, and sea-faring boats.",
    h1: "Fantasy Ship Name Generator",
    description: "Generate adventurous names for pirate galleons and naval vessels.",
    category: "Objects",
    generatorConfig: {
      generatorType: "ship",
      quantity: 10
    },
    about: "Ships need names that project power, speed, or speed across the ocean, keeping sailors motivated and strikes fear in enemies.",
    characteristics: "Formatted as 'The [Adjective] [OceanNoun]' or '[Noun]'s Revenge'.",
    faqs: [
      { q: "Are these names good for pirate settings?", a: "Yes, they provide historical naval gravity and traditional pirate swagger." }
    ],
    relatedSlugs: ["fantasy-kingdom-name-generator", "fantasy-tavern-name-generator", "fantasy-city-name-generator", "fantasy-username-generator"]
  },
  {
    slug: "fantasy-tavern-name-generator",
    title: "Tavern Name Generator — Medieval Inn Names",
    metaDescription: "Generate cozy, quirky names for medieval taverns, pubs, and adventurer rests.",
    h1: "Fantasy Tavern Name Generator",
    description: "Generate cozy, quirky names for adventurer taverns and inns.",
    category: "Objects",
    generatorConfig: {
      generatorType: "tavern",
      quantity: 10
    },
    about: "A tavern is where adventurers meet, swap stories, and pick up quests. Their names are often cozy, slightly humorous, or animal-themed.",
    characteristics: "Classic British/Medieval patterns like 'The [Adjective] [Animal]' or 'The [Animal] & [Object]'.",
    faqs: [
      { q: "Why are taverns named after animals?", a: "Historically, icons and pictures were used on signs because many common folk could not read." }
    ],
    relatedSlugs: ["fantasy-city-name-generator", "fantasy-ship-name-generator", "vampire-name-generator", "fantasy-guild-name-generator"]
  },
  {
    slug: "fantasy-username-generator",
    title: "Fantasy Username Generator — Gamertags & Profiles",
    metaDescription: "Generate cool, fantasy-themed usernames and gamertags for Roblox, Steam, Discord, and RPGs.",
    h1: "Fantasy Username Generator",
    description: "Generate cool, fantasy-themed gamertags and profile aliases.",
    category: "Other",
    generatorConfig: {
      generatorType: "username",
      quantity: 10
    },
    about: "Gamers and social media users want handles that sound heroic and magical. This generator blends character prefixes with gaming decoration formats.",
    characteristics: "Combines fantasy terms (Storm, Nyx, Blade) with gamer modifiers, numbers, or underscores suitable for Discord and Steam.",
    faqs: [
      { q: "Are these usernames available?", a: "Availability varies by platform, but the seed configuration allows you to generate dozens of unique variations." }
    ],
    relatedSlugs: ["elf-name-generator", "fairy-name-generator", "vampire-name-generator", "fantasy-character-name-generator"]
  },
  {
    slug: "fantasy-character-name-generator",
    title: "Fantasy Character Name Generator — General Heroes",
    metaDescription: "Generate high-quality general fantasy character names across multiple races. Perfect for authors and gamers.",
    h1: "Fantasy Character Name Generator",
    description: "Generate heroic character names across multiple fantasy races.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "any",
      style: "none",
      gender: "any",
      quantity: 10
    },
    about: "Need a hero for your novel or campaign? This generator creates names across all racial rules, giving you a broad selection of unique character options.",
    characteristics: "Picks randomly from all race datasets, resolving complete prefix/suffix structures and matching translations.",
    faqs: [
      { q: "How do I choose the best character name?", a: "Generate a batch, review their translations, and select the one that fits your character's backstory." }
    ],
    relatedSlugs: ["elf-name-generator", "dwarf-name-generator", "orc-name-generator"]
  },
  {
    slug: "tiefling-name-generator",
    title: "Tiefling Name Generator — D&D 5e Virtue & Infernal Names",
    metaDescription: "Generate authentic D&D 5e Tiefling names including infernal heritage names and philosophical virtue names. Complete with pronunciations and meanings.",
    h1: "Tiefling Name Generator",
    description: "Generate evocative infernal and virtue names for your D&D 5e tiefling warlock, rogue, or paladin.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "tiefling",
      style: "dark-fantasy",
      gender: "any",
      quantity: 10
    },
    about: "Tieflings in D&D 5th Edition possess human heritage mingled with infernal bloodlines originating from the Nine Hells. Their naming culture falls into three traditions: traditional infernal names passed through generations, virtue names chosen by tieflings seeking a destiny or personal philosophy (e.g., Art, Despair, Reverence), and adopted names reflecting the mortal cultures they dwell within.",
    characteristics: "Infernal names feature sharp sibilants, glottal stops, and exotic vowel pairings like Akmenos, Damakos, Kallista, and Zephyra. Virtue names are single abstract nouns representing a virtue, vice, or mood that defines the character's quest.",
    faqs: [
      { q: "What are Tiefling virtue names?", a: "Virtue names are self-chosen epithets (such as Hope, Despair, Torment, or Music) adopted by young tieflings to define an ideal, worldview, or defiance against their devilish heritage." },
      { q: "Are these names compliant with official D&D 5e lore?", a: "Yes. They draw directly from the Player's Handbook infernal syllable roots and historical virtue naming conventions." }
    ],
    relatedSlugs: ["demon-name-generator", "dark-elf-name-generator", "wizard-name-generator", "fantasy-character-name-generator"],
    exampleNames: [
      { name: "Barakas Hellfire", pronunciation: "BAH-rah-kas Hell-fire", meaning: "Lightning Gift — Infernal Flame" },
      { name: "Kallista Ashengaze", pronunciation: "Kahl-LEES-tah Ash-en-gaze", meaning: "Most Beautiful — Ash Watcher" },
      { name: "Reverence Netherstrider", pronunciation: "REV-er-ens Neth-er-stry-der", meaning: "D&D 5e Virtue Name — Abyss Traveler" },
      { name: "Akmenos Brimstone", pronunciation: "Ahk-MEN-os Brim-stone", meaning: "Sharp Mind — Sulfur Flame" },
      { name: "Torment Horncarver", pronunciation: "TOR-ment Horn-car-ver", meaning: "D&D 5e Virtue Name — Horn Shaper" }
    ]
  },
  {
    slug: "cyberpunk-name-generator",
    title: "Cyberpunk Name Generator — Netrunner & Street Samurai Handles",
    metaDescription: "Generate futuristic cyberpunk handles, street tags, netrunner aliases, and corporate operative names for Cyberpunk 2077, RED, Shadowrun, and sci-fi worlds.",
    h1: "Cyberpunk Name Generator",
    description: "Generate gritty street handles, netrunner aliases, and corporate operative tags.",
    category: "Sci-Fi & Grimdark",
    generatorConfig: {
      generatorType: "cyberpunk",
      style: "cyberpunk-hacker",
      quantity: 10
    },
    about: "Cyberpunk naming conventions mirror a high-tech, low-life future dominated by megacorporations, black-market cyberware, and deep cyberspace. In Night City, the Sprawl, and the Net, real identities are buried beneath lethal street handles, callsigns, and cryptographic aliases.",
    characteristics: "Combines technological hardware prefixes (Zero, Neon, Glitch, Null, Chrome) with lethal action verbs and cyberspace roles (runner, blade, wire, core, pulse), alongside underground street handles and numbers.",
    faqs: [
      { q: "What works best for a Netrunner alias?", a: "Netrunners favor terms derived from low-level computing, memory addresses, malware, and glitches (e.g., Null_Byte, Glitch_Trace, ZeroWire)." },
      { q: "Can I use these for Cyberpunk 2077 or Shadowrun characters?", a: "Yes. The generator produces street handles, mercenary aliases, and fixers suited for any dark sci-fi or tabletop setting." }
    ],
    relatedSlugs: ["fantasy-username-generator", "weapon-name-generator", "warhammer-name-generator"],
    exampleNames: [
      { name: "Neon_Strike", pronunciation: "NEE-on Stryk", meaning: "High-tech cyberspace infiltrator" },
      { name: "Zero 'Case' Wire", pronunciation: "ZEE-ro Kays Wyer", meaning: "Black-market netrunner decker" },
      { name: "Chrome_Ghost", pronunciation: "Krohm Gohst", meaning: "Stealth cyber-ninja assassin" },
      { name: "Vektor Kovacs", pronunciation: "VEK-tor KO-vatch", meaning: "High-tier mercenary solo" },
      { name: "Agent Wintermute", pronunciation: "AY-jent WIN-ter-myoot", meaning: "Black-ops corporate AI operative" }
    ]
  },
  {
    slug: "warhammer-name-generator",
    title: "Warhammer Name Generator — 40K & Fantasy Grimdark Names",
    metaDescription: "Generate heroic Space Marine, Inquisitor, and Imperial Commander names for Warhammer 40K and Age of Sigmar. Grimdark, gothic, and faction-accurate.",
    h1: "Warhammer Name Generator",
    description: "Generate heavy Gothic and grimdark names for Space Marines, Inquisitors, and Chaos champions.",
    category: "Sci-Fi & Grimdark",
    generatorConfig: {
      generatorType: "warhammer",
      style: "grimdark",
      quantity: 10
    },
    about: "In the grim darkness of the far future, names reflect zealous devotion, centuries of apocalyptic warfare, and high-Gothic imperial bureaucracy. From the Adeptus Astartes to the Holy Ordos of the Inquisition, warriors bear names honoring ancient Terran saints, bloodline chapters, and martyred oaths.",
    characteristics: "Heavily inspired by High Gothic Latin, Teutonic martial honor, and harsh archaic terminations (-us, -or, -ian, -mund, -gath) accompanied by earned martial epithets like 'the Purifier' or 'the Heretic Bane'.",
    faqs: [
      { q: "Are these names suited for 40K Space Marines?", a: "Yes. They blend High Gothic Latinate stems with chapter honorifics and battle titles appropriate for loyalist and traitor legions alike." },
      { q: "Can I use them for Age of Sigmar or Fantasy Battles?", a: "Absolutely. The archaic, high-gothic naming format fits Stormcast Eternals, Witch Hunters, and Empire generals perfectly." }
    ],
    relatedSlugs: ["dwarf-name-generator", "orc-name-generator", "weapon-name-generator", "cyberpunk-name-generator"],
    exampleNames: [
      { name: "Vulkanus the Purifier", pronunciation: "Vool-KAH-nus the Pyoo-rih-fyer", meaning: "Forge Warrior — Heretic Cleanser" },
      { name: "Inquisitor Balthor", pronunciation: "In-KWIZ-ih-tor BAHL-thor", meaning: "Ordo Hereticus High Inquisitor" },
      { name: "Brother Torgian of the Black Templars", pronunciation: "BROTH-er TOR-gee-an", meaning: "Zealous Crusader Battle-Brother" },
      { name: "Severus the Dreadnought", pronunciation: "SEV-er-us the DRED-nawt", meaning: "Ancient Entomed Hero of the Imperium" },
      { name: "Drakus the Ironclad", pronunciation: "DRAH-kus the EYE-urn-klad", meaning: "Indomitable Siege Commander" }
    ]
  },
  {
    slug: "pirate-name-generator",
    title: "Pirate Name Generator — Swashbuckling Scallywag & Buccaneer Names",
    metaDescription: "Generate authentic and legendary pirate names, colorful swashbuckling nicknames, and sea rover titles. Great for Sea of Thieves, D&D nautical campaigns, and pirate fiction.",
    h1: "Pirate Name Generator",
    description: "Generate legendary swashbucklers, feared corsairs, and colorful pirate nicknames for high-seas adventures.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "pirate",
      style: "warrior",
      gender: "any",
      quantity: 10
    },
    about: "The Golden Age of Piracy gave rise to the most colorful, defiant outlaws in maritime history. From the lawless coves of Tortuga and Nassau to the stormy waters of the Spanish Main, pirates abandoned their mundane birth names to adopt fearsome sea monikers that struck dread into merchant galleons.\n\nA pirate's moniker was their brand and weapon. Nicknames commemorated notorious physical traits, favored weapons of choice, or the terrifying aftermath of sea raids, ensuring that news of their approach sparked panic along the coastlines.",
    characteristics: "Traditional colonial maritime given names (Jack, Bartholomew, Anne) merged with swaggering nautical descriptors ('Cutlass', 'Ironhook', 'Salt-Breeze') and titles denoting rank aboard the ship or home pirate havens.",
    faqs: [
      { q: "How did historical pirates get their nicknames?", a: "Sailors earned nicknames from physical scars, naval weapons, weather endurance, or notorious acts of defiance on the open sea." },
      { q: "Can I use these names for Sea of Thieves or D&D campaigns?", a: "Yes. These names work seamlessly for player captains, pirate crews, NPC privateers, and tavern barkeeps in any nautical RPG." }
    ],
    relatedSlugs: ["ship-name-generator", "tavern-name-generator", "fantasy-character-name-generator"],
    exampleNames: [
      { name: "Captain Jack \"Cutlass\" Morgan", pronunciation: "KAP-tin jak KUT-lus MOR-gan", meaning: "Buccaneer Legend: Master bladesman title + notorious privateer family lineage" },
      { name: "Mary \"Ironhook\" of Tortuga", pronunciation: "MAIR-ee EYE-urn-hook ov tor-TOO-guh", meaning: "Sea Rover: Lethal boarding hook moniker + infamous pirate republic haven" },
      { name: "Bartholomew \"Salt-Breeze\" Drake", pronunciation: "bar-THOL-oh-myoo SALT-breez drayk", meaning: "Corsair: Weathered navigator descriptor + historic naval buccaneer name" }
    ]
  },
  {
    slug: "witch-name-generator",
    title: "Witch Name Generator — Mystical Coven, Crone & Sorceress Names",
    metaDescription: "Generate haunting, pagan, and occult witch names. Ideal for D&D warlocks, bog crones, hedge witches, and dark fantasy fiction.",
    h1: "Witch Name Generator",
    description: "Generate haunting occult names, coven titles, and herbalist surnames for witches, sorceresses, and warlocks.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "witch",
      style: "gothic",
      gender: "any",
      quantity: 10
    },
    about: "Witches bridge the boundary between the mortal realm and primeval natural spirits. From solitary hedge witches brewing poultices in misty bogs to ancient coven matriarchs chanting under blood-red moons, witch names echo with botanical poison, folkloric superstition, and arcane reverence.\n\nUnlike academic wizards who study rigid spellbooks in stone towers, witches draw their designations from ancestral bloodlines, deadly flora, and lunar phases. Their surnames frequently invoke the poisonous herbs, gloomy groves, and nocturnal predators integral to their craft.",
    characteristics: "Archaic Celtic, Old English, and Greco-Roman given names (Morrigan, Hecate, Rowena) paired with botanical poisonous surnames (Nightshade, Hellebore, Wormwood) or cryptic coven honorifics ('the Hexweaver', 'of the Whispering Bog').",
    faqs: [
      { q: "What makes a name sound like a fantasy witch?", a: "Pairing classical folkloric first names with botanical toxins, deep forest locations, and lunar or corvid motifs creates an immediate occult atmosphere." },
      { q: "Are these names suitable for D&D Warlocks and Druids?", a: "Yes. They fit Circle of the Moon druids, Archfey warlocks, and hedge herbalists across all tabletop RPGs." }
    ],
    relatedSlugs: ["vampire-name-generator", "wizard-name-generator", "demon-name-generator"],
    exampleNames: [
      { name: "Morrigan Nightshade", pronunciation: "MOR-ih-gun NYT-shayd", meaning: "Celtic & Botanical: Celtic phantom goddess + lethal belladonna herb" },
      { name: "Hecate the Hexweaver", pronunciation: "HEK-uh-tee the HEKS-wee-ver", meaning: "Greek Occult: Underworld patroness of magic + weaver of binding hexes" },
      { name: "Rowena of the Whispering Bog", pronunciation: "roh-WEE-nuh ov the WHIS-per-ing bog", meaning: "Folkloric Crone: Anglo-Saxon slender tree root + primeval swamp domain" }
    ]
  },
  {
    slug: "dragonborn-name-generator",
    title: "Dragonborn Name Generator — D&D 5e Draconic & Clan Names",
    metaDescription: "Generate authentic D&D 5e Dragonborn names with traditional clan lineages and draconic honor virtues. Perfect for tabletop players and DMs.",
    h1: "Dragonborn Name Generator (D&D 5e)",
    description: "Generate authentic D&D 5e Dragonborn names featuring ancient clan lineages, Draconic syllables, and virtue titles.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "dragonborn",
      style: "ancient",
      gender: "any",
      quantity: 10
    },
    about: "In Dungeons & Dragons 5e, Dragonborn are proud, honor-bound humanoids shaped by the blood of dragons. For a Dragonborn, clan honor precedes personal glory: a Dragonborn will die to uphold the reputation of their ancestral house, and dishonoring one's clan is a fate worse than death.\n\nCanonical Dragonborn names consist of a personal birth name and an ancient clan name. In formal introductions, Dragonborn state their clan name first as a mark of respect to their forebears. During youth or following monumental deeds, many also adopt childhood virtue nicknames that define their philosophical path.",
    characteristics: "Multi-syllabic, rolling Draconic prefixes and suffixes with hard consonants (k, r, th, sh). Incorporates canonical D&D 5e clan names (Clethtinthiallor, Daardendrian, Delmirev) alongside honorable virtue epithets.",
    faqs: [
      { q: "Why do Dragonborn put their clan name first?", a: "In D&D 5e lore, Dragonborn value their clan's standing above individual identity, leading them to present the clan name before their personal name in formal speech." },
      { q: "What are Dragonborn childhood names?", a: "Childhood names are descriptive nicknames or virtue words bestowed by clan elders (e.g., Scaleward, Flame-Bearer) that a Dragonborn may keep into adulthood." }
    ],
    relatedSlugs: ["dragon-name-generator", "tiefling-name-generator", "half-orc-name-generator"],
    exampleNames: [
      { name: "Daardendrian Rhogar", pronunciation: "dar-den-DREE-an ROH-gar", meaning: "D&D 5e Canonical: Honored ancestral clan name + 'Rhogar' (flame-crested warrior)" },
      { name: "Clethtinthiallor Akra", pronunciation: "kleth-tin-thee-AL-or AH-kruh", meaning: "Ancient Mountain Clan: Draconic peak lineage + 'Akra' (first breath of dawn)" },
      { name: "Torinn the Scaleward of Clan Delmirev", pronunciation: "TOR-in the SKAYL-ward", meaning: "Clan Champion: 'Torinn' (thunder-horn) + clan ward guardian title" }
    ]
  },
  {
    slug: "half-orc-name-generator",
    title: "Half-Orc Name Generator — D&D 5e Guttural & Warrior Names",
    metaDescription: "Generate battle-tested D&D 5e Half-Orc names. Perfect for barbarians, fighters, and mercenaries walking between human cities and orc tribes.",
    h1: "Half-Orc Name Generator (D&D 5e)",
    description: "Generate battle-tested D&D 5e Half-Orc names, combining guttural tribal power with human frontier surnames.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "half-orc",
      style: "warrior",
      gender: "any",
      quantity: 10
    },
    about: "Half-Orcs walk between two worlds, bearing the physical majesty and raw fury of orcish blood alongside the adaptable tenacity of humanity. In D&D 5e, half-orcs often fight to carve out their own identity, earning respect through indomitable resilience and unmatched physical grit.\n\nTheir naming traditions reflect this dual heritage. Some half-orcs raised among human frontier settlements adopt human surnames alongside sharp, guttural orcish first names. Others raised near orc warbands carry battle epithets celebrating wounds survived, skulls cleaved, and challenges won.",
    characteristics: "Punchy, monosyllabic and disyllabic guttural first names (Thokk, Dench, Baggi, Krusk) paired with visceral martial epithets (Skull-Cleaver, Iron-Jaw, Blight-Walker) or rough human frontier trade names.",
    faqs: [
      { q: "How do Half-Orcs choose their names in D&D?", a: "Depending on where they were raised, Half-Orcs may carry a harsh Orcish birth name, adopt a human trade surname, or earn a violent warrior title through battle." },
      { q: "What classes suit Half-Orc characters?", a: "Their Relentless Endurance and Savage Attacks racial traits make them iconic Barbarians, Fighters, Paladins, and rugged Rangers." }
    ],
    relatedSlugs: ["orc-name-generator", "dragonborn-name-generator", "dwarf-name-generator"],
    exampleNames: [
      { name: "Thokk Skull-Cleaver", pronunciation: "THAHK SKUL-klee-ver", meaning: "Orcish Guttural: Monosyllabic war-cry birth name + battlefield achievement title" },
      { name: "Baggi Stoneshield", pronunciation: "BAG-ee STONE-sheeld", meaning: "Clan Vanguard: Traditional orc matriarch root + stalwart defensive sentinel moniker" },
      { name: "Dench \"Iron-Jaw\" Miller", pronunciation: "DENCH EYE-urn-jaw MIL-er", meaning: "Frontier Dual Heritage: Orcish personal name + gladiator moniker + human trade surname" }
    ]
  },
  {
    slug: "tavern-name-generator",
    title: "Tavern Name Generator — Cozy Fantasy Inn & Pub Names",
    metaDescription: "Generate memorable fantasy tavern and pub names for tabletop RPGs. Perfect for D&D adventuring hubs, roadside inns, and bustling harbor taverns.",
    h1: "Tavern Name Generator",
    description: "Generate flavorful fantasy tavern names, cozy traveler inns, and bustling alehouses for your tabletop campaigns.",
    category: "Places",
    generatorConfig: {
      generatorType: "tavern",
      race: "tavern",
      style: "none",
      gender: "any",
      quantity: 10
    },
    about: "Every great fantasy adventure begins in a tavern. Across tabletop roleplaying games and epic fantasy sagas, the local alehouse serves as the crossroads of civilization—a warm haven of crackling hearth fires, foaming tankards of ale, shady figures in dark corners, and bounty boards that set heroes on epic quests.\n\nFantasy tavern names balance memorable humor with local flavor. Since many common folk in medieval fantasy settings cannot read, taverns historically relied on vivid pictorial signboard art—such as a prancing pony or a sleeping dragon—leading to colorful descriptive names that travelers easily recognized.",
    characteristics: "Classic heraldic pairings of descriptive adjectives (Drunken, Prancing, Jolly, Screaming) with evocative animals, heraldic symbols, or drinking vessels (Dragon, Pony, Flagon, Anchor).",
    faqs: [
      { q: "Why do fantasy taverns have names like 'The Prancing Pony'?", a: "Historic taverns hung painted visual signs with simple animals or symbols so illiterate travelers could easily recognize and talk about the establishment." },
      { q: "How do I pick a tavern name that fits my D&D town?", a: "Match the tavern name to its local district: harbor towns favor nautical symbols (Rusty Anchor), while mountain outposts favor beasts (Howling Wolf)." }
    ],
    relatedSlugs: ["ship-name-generator", "city-name-generator", "pirate-name-generator"],
    exampleNames: [
      { name: "The Drunken Dragon", pronunciation: "the DRUNG-kin DRAG-un", meaning: "High Fantasy Alehouse: Iconic heraldic motif pairing a fearsome beast with tavern spirits" },
      { name: "The Rusty Anchor Tavern", pronunciation: "the RUST-ee ANG-kor", meaning: "Harbor Watering Hole: Salty dockside establishment catering to sailors and corsairs" },
      { name: "The Screaming Flagon Inn", pronunciation: "the SKREE-ming FLAG-un", meaning: "Raucous Crossroads Inn: Celebrates rowdy minstrel tunes, games of dice, and endless ale" }
    ]
  },
  {
    slug: "ship-name-generator",
    title: "Ship Name Generator — Majestic Galleon, Pirate & Warship Names",
    metaDescription: "Generate legendary ship names for pirate sloops, naval frigates, and ghost vessels. Ideal for nautical campaigns, Sea of Thieves, and fantasy authors.",
    h1: "Ship Name Generator",
    description: "Generate legendary pirate sloops, majestic naval galleons, and ghostly warships for high-seas campaigns.",
    category: "Objects",
    generatorConfig: {
      generatorType: "ship",
      race: "ship",
      style: "none",
      gender: "any",
      quantity: 10
    },
    about: "To sailors, privateers, and pirates alike, a ship is far more than timber and sails—she is a living entity with her own temperament, luck, and destiny. From regal three-masted royal flagships patrolling naval trade routes to ominous black-sailed sloops prowling misty straits, a ship's name announces her commander's ambitions.\n\nNaval naming traditions weave together royal majesty, classical muses, celestial guides, and fearsome oceanic predators. Pirates frequently christened their vessels with defiant, vengeful titles designed to shatter the morale of enemy crews before the first broadside cannon was fired.",
    characteristics: "Dramatic pairings of ocean predators, mythical beings, or celestial portents with regal adjectives ('The Crimson Corsair', 'The Sea Wolf's Revenge', 'Queen of the Tides').",
    faqs: [
      { q: "How do I choose a good name for a pirate ship?", a: "Select names that evoke danger, wrath, or defiance, such as 'Revenge', 'Predator', or 'Kraken', signaling ruthlessness on the open waters." },
      { q: "What naming styles work best for naval warships?", a: "Naval warships traditionally bear names celebrating royal crowns, virtues (Indomitable, Dauntless), or patron deities." }
    ],
    relatedSlugs: ["pirate-name-generator", "tavern-name-generator", "city-name-generator"],
    exampleNames: [
      { name: "The Crimson Corsair", pronunciation: "the KRIM-zun KOR-sair", meaning: "Pirate Flagship: Blood-stained sails signifying ruthless naval boarding tactics" },
      { name: "The Sea Wolf's Revenge", pronunciation: "the SEE woolf ruh-VENJ", meaning: "Defiant Sloop: Honoring a fallen captain's legacy through high-seas vengeance" },
      { name: "The Maiden of the Waves", pronunciation: "the MAY-den ov the WAYVZ", meaning: "Royal Frigate: Classical muse figurehead patron designed for long ocean crossings" }
    ]
  },
  {
    slug: "city-name-generator",
    title: "City Name Generator — Majestic Fantasy City & Settlement Names",
    metaDescription: "Generate rich, worldbuilding-ready fantasy city names, bustling trade capitals, and ancient fortresses for D&D and fantasy writers.",
    h1: "City Name Generator",
    description: "Generate rich, believable fantasy city names, bustling mercantile ports, and fortified mountain citadels.",
    category: "Places",
    generatorConfig: {
      generatorType: "city",
      race: "city",
      style: "none",
      gender: "any",
      quantity: 10
    },
    about: "Cities are the crowning jewels of civilization in fantasy worldbuilding. Whether perched atop windswept cliffs, spanning strategic river bridges, or nestled deep inside subterranean caverns, great cities evolve over centuries as centers of commerce, political intrigue, and magical scholarship.\n\nA believable fantasy city name reflects its geographic advantages, founding hero, primary industry, or historical defense. Suffixes like '-haven', '-spire', '-burg', and '-ford' anchor cities in reality while evocative prefixes highlight local mineral wealth or ancient lore.",
    characteristics: "Geographic and topographic prefixes (Silver-, Iron-, Oak-, River-, Stone-) combined with classic settlement suffixes (-haven, -spire, -port, -ford, -reach, -keep).",
    faqs: [
      { q: "What makes a fantasy city name believable?", a: "Grounding the name in topography, nearby resources, or strategic defense (like a river crossing or natural harbor) makes settlements feel organic and historic." },
      { q: "Can I use these names for fantasy mapmaking?", a: "Yes. These names work seamlessly on regional and continent maps for D&D homebrew worlds and fantasy novels." }
    ],
    relatedSlugs: ["tavern-name-generator", "ship-name-generator", "fantasy-kingdom-name-generator"],
    exampleNames: [
      { name: "Silverhaven", pronunciation: "SIL-ver-hay-ven", meaning: "Coastal Trade Citadel: 'Silver' (mineral wealth) + 'haven' (protected natural bay harbor)" },
      { name: "Ironspire", pronunciation: "EYE-urn-spyre", meaning: "Mountain Stronghold: 'Iron' (unyielding military defense) + 'spire' (towering vertical fortress)" },
      { name: "Oakhaven Crossing", pronunciation: "OHK-hay-ven KROS-ing", meaning: "River Trade Hub: Primeval oak forest sanctuary situated at an essential river transit point" }
    ]
  },
  {
    slug: "kingdom-name-generator",
    title: "Kingdom Name Generator — Sovereign Fantasy Realm Names",
    metaDescription: "Generate majestic kingdom names, sovereign empires, and feudal realms for fantasy worldbuilding and tabletop RPG campaigns.",
    h1: "Kingdom Name Generator",
    description: "Generate sovereign fantasy kingdoms, grand empires, and ancient realms for your worldbuilding maps.",
    category: "Places",
    generatorConfig: {
      generatorType: "kingdom",
      race: "kingdom",
      style: "royal",
      gender: "any",
      quantity: 10
    },
    about: "Kingdoms form the geopolitical backbone of high fantasy worldbuilding. Across expansive continents, sovereign empires rise and fall through dynastic marriages, divine mandates, and epic wars of conquest.\n\nA kingdom's name commands authority and ancient tradition. Combining noble lineage roots with geographic domains, kingdom names evoke grandeur and historical legacy on campaign maps.",
    characteristics: "Regal Latinate, Anglo-Saxon, and High Fantasy syllable cadences ending in sovereign descriptors like Empire, Realm, Dominion, or Sovereign.",
    faqs: [
      { q: "How do I choose a kingdom name for my world map?", a: "Consider the kingdom's founding culture and primary biome: harsh mountainous realms favor harder consonants, while coastal empires favor flowing vowels." },
      { q: "What titles pair well with fantasy realms?", a: "Empires, Dominions, Principalities, and High Kingdoms each convey distinct political scales and governance structures." }
    ],
    relatedSlugs: ["city-name-generator", "fantasy-kingdom-name-generator", "fantasy-clan-name-generator"],
    exampleNames: [
      { name: "The Kingdom of Aethelgard", pronunciation: "AY-thel-gard", meaning: "Ancient Royal Domain: 'Aethel' (noble/divine) + 'gard' (guarded sanctuary)" },
      { name: "Valeria Sovereign Realm", pronunciation: "vuh-LEER-ee-uh", meaning: "Imperial Dynasty: Latinate root for strength and unbroken martial vigor" },
      { name: "The High Empire of Solaria", pronunciation: "soh-LAIR-ee-uh", meaning: "Celestial Monarchy: Dedicated to the eternal sun and divine kingship" }
    ]
  },
  {
    slug: "goblin-name-generator",
    title: "Goblin Name Generator — Sneaky, Scavenger & Trickster Names",
    metaDescription: "Generate cunning, snappy goblin names and hilarious scavenging epithets. Perfect for D&D 5e encounters, comic villains, and dungeon dwellers.",
    h1: "Goblin Name Generator",
    description: "Generate snappy, cunning goblin names, trickster titles, and scavenged epithets for tabletop RPGs.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "goblin",
      style: "warrior",
      gender: "any",
      quantity: 10
    },
    about: "Goblins are small, cunning, and irrepressible humanoids renowned across fantasy worlds for their frantic energy, makeshift engineering, and survival instincts. Thriving in subterranean warrens and junk-laden encampments, goblins rely on sharp wits and sheer numbers to outsmart larger foes.\n\nGoblin names are short, sharp, and explosive, sounding almost like the clatter of loose gears or the snap of a twig. Many goblins earn colorful descriptive epithets celebrating stolen treasures, lucky escapes, or bizarre bodily quirks.",
    characteristics: "Punchy, monosyllabic names featuring abrasive consonants (k, g, z, x, t) paired with humorous or thieving epithets ('Gold-Snatcher', 'Back-Stabber', 'Greasetooth').",
    faqs: [
      { q: "What makes a great goblin name in D&D?", a: "Quick, energetic monosyllables that sound playful yet slightly chaotic, paired with a funny or thieving nickname." },
      { q: "Can goblins have clan names?", a: "Goblins usually affiliate with crude tribes or warbands named after scavenged objects, vermin, or broken weapons." }
    ],
    relatedSlugs: ["orc-name-generator", "half-orc-name-generator", "dwarf-name-generator"],
    exampleNames: [
      { name: "Grik Gold-Snatcher", pronunciation: "GRIK GOLD-snatch-er", meaning: "Greedy Scavenger: Snappy monosyllable + notorious thieving specialty" },
      { name: "Snik Back-Stabber", pronunciation: "SNIK BAK-stab-er", meaning: "Cunning Rogue: Sharp blade sound + dishonorable combat style" },
      { name: "Kraggle Greasetooth", pronunciation: "KRAG-ul GREES-tooth", meaning: "Tinkerer Goblin: Clattering gear name + mechanical engine grime quirk" }
    ]
  },
  {
    slug: "guild-name-generator",
    title: "Guild Name Generator — Factions, Fellowships & Orders",
    metaDescription: "Generate legendary guild names, secret brotherhoods, thieves' syndicates, and mage colleges for D&D and tabletop RPG campaigns.",
    h1: "Guild Name Generator",
    description: "Generate prestigious merchant guilds, clandestine thieves' syndicates, and knightly fellowships.",
    category: "Organizations",
    generatorConfig: {
      generatorType: "guild",
      race: "guild",
      style: "none",
      gender: "any",
      quantity: 10
    },
    about: "Guilds represent organized power, commerce, and brotherhood within fantasy cities. Whether pulling political strings as wealthy merchant consortiums, operating from subterranean shadows as assassin syndicates, or researching forbidden magic in cloistered colleges, guilds give structure to urban adventure.\n\nA guild's name establishes its prestige and secrecy. Knighthoods and paladin orders adopt celestial and heraldic terminology, while underworld rings favor veiled, double-edged descriptors that communicate danger to rivals.",
    characteristics: "Structured formats combining noble or covert modifiers (Golden, Silent, Obsidian, Hallowed) with vocational nouns (Sentinels, Weavers, Shadows, Brotherhood).",
    faqs: [
      { q: "How are fantasy guild names structured?", a: "Most guilds follow patterns like 'The [Modifier] [Noun]' (The Iron Hand) or 'Brotherhood of [Noun]' (Order of the Silent Blade)." },
      { q: "What guild types suit fantasy RPGs?", a: "Common guild categories include Merchant Consortiums, Thieves' Guilds, Mages' Colleges, and Holy Knight Orders." }
    ],
    relatedSlugs: ["city-name-generator", "fantasy-guild-name-generator", "fantasy-clan-name-generator"],
    exampleNames: [
      { name: "The Silent Shadows", pronunciation: "the SY-lent SHAD-ohz", meaning: "Underworld Syndicate: Covert thieves' guild operating undetected in city alleys" },
      { name: "Order of the Silver Shield", pronunciation: "OR-der ov the SIL-ver SHEELD", meaning: "Paladin Fellowship: Chivalric order sworn to defend innocents from fiends" },
      { name: "Brotherhood of Golden Alchemists", pronunciation: "BROTH-er-hood ov GOHL-den AL-kuh-mists", meaning: "Merchant Guild: Wealthy consortium controlling magical trade and potion commerce" }
    ]
  }
];

export function getGeneratorBySlug(slug: string): GeneratorPageConfig | undefined {
  if (slug === "" || slug === "/") return homepageConfig;
  return generatorPages.find(p => p.slug === slug);
}
