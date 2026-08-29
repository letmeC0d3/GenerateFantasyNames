import { GeneratorConfig } from "../lib/generatorEngine";

export interface GeneratorPageConfig {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  description: string;
  category: "Characters & Races" | "Places" | "Organizations" | "Objects" | "Other";
  generatorConfig: Partial<GeneratorConfig>;
  about: string;
  characteristics: string;
  faqs: Array<{ q: string; a: string }>;
  relatedSlugs: string[];
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
    title: "Dragon Name Generator — Mighty Draconic Names",
    metaDescription: "Generate ancient, epic dragon names with royal titles. Perfect for world-builders, writing, and D&D campaigns.",
    h1: "Dragon Name Generator",
    description: "Generate ancient, multi-syllable names for legendary drakes.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "dragon",
      style: "ancient",
      gender: "any",
      quantity: 10
    },
    about: "Dragons are timeless, powerful creatures. Draconic names sound massive, ancient, and majestic, using elongated vowel clusters and explosive consonants.",
    characteristics: "Elongated vowels (aa, oo, uu) combined with suffix additions like -thrax, -rax, and -morth, often followed by descriptive titles like 'the Dread' or 'the Fire Drake'.",
    faqs: [
      { q: "How do you name a dragon?", a: "Select long, rolling, powerful syllables that sound heavy and ancient when spoken aloud." },
      { q: "What do dragon titles mean?", a: "Titles represent their elemental alignment, age, or past acts of destruction." }
    ],
    relatedSlugs: ["wizard-name-generator", "demon-name-generator", "fantasy-kingdom-name-generator", "creature-name-generator"]
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
    title: "Vampire Name Generator — Gothic Noble Names",
    metaDescription: "Generate gothic, elegant vampire names and noble house titles. Perfect for gothic horror writing and RPGs.",
    h1: "Vampire Name Generator",
    description: "Generate dark, aristocratic gothic names for immortal nobles.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "vampire",
      style: "gothic",
      gender: "any",
      quantity: 10
    },
    about: "Vampire names represent timeless elegance and gothic horror, heavily drawing from Eastern European aristocracy and ancient dark lineages.",
    characteristics: "Sophisticated classical first names accompanied by historic, sinister surnames like 'Von Carstein' or 'Bathory'.",
    faqs: [
      { q: "What language base do vampire names use?", a: "They frequently draw from Romanian, German, French, and Latin noble families." }
    ],
    relatedSlugs: ["dark-elf-name-generator", "demon-name-generator", "fantasy-tavern-name-generator", "fantasy-username-generator"]
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
    title: "Demon Name Generator — Sinister Abyssal Names",
    metaDescription: "Generate terrifying, abyssal names for demons and underworld lords. Perfect for dark fantasy writing.",
    h1: "Demon Name Generator",
    description: "Generate dark, threatening names for abyssal lords and fiends.",
    category: "Characters & Races",
    generatorConfig: {
      generatorType: "character",
      race: "demon",
      style: "dark-fantasy",
      gender: "any",
      quantity: 10
    },
    about: "Demonic names evoke threat, hellfire, and ancient pacts. Their language sounds complex, heavy, and contains deep throat fricatives.",
    characteristics: "Aggressive prefix clusters combined with heavy suffixes like -oth, -aroth, and -zebub.",
    faqs: [
      { q: "What are demon names useful for?", a: "Antagonists, dark fantasy summoning arcs, and boss enemies in RPGs." }
    ],
    relatedSlugs: ["vampire-name-generator", "angel-name-generator", "orc-name-generator", "fantasy-clan-name-generator"]
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
  }
];

export function getGeneratorBySlug(slug: string): GeneratorPageConfig | undefined {
  if (slug === "" || slug === "/") return homepageConfig;
  return generatorPages.find(p => p.slug === slug);
}
