"use client";

import { useState, useEffect } from "react";
import { generateNames, GeneratedName, GeneratorConfig } from "../lib/generatorEngine";
import { generateSeed } from "../lib/prng";
import { trackEvent } from "../lib/analytics";
import ResultsList from "./ResultsList";

interface GeneratorInterfaceProps {
  initialPreset: Partial<GeneratorConfig>;
  titleText?: string;
  descriptionText?: string;
}

export default function GeneratorInterface({
  initialPreset,
  titleText = "Fantasy Name Generator",
  descriptionText = "Generate fantasy names that actually sound like they belong together."
}: GeneratorInterfaceProps) {
  const [generatorType, setGeneratorType] = useState<string>("character");
  const [race, setRace] = useState<string>("none");
  const [style, setStyle] = useState<string>("none");
  const [gender, setGender] = useState<"male" | "female" | "any">("any");
  const [quantity, setQuantity] = useState<number>(10);
  const [seed, setSeed] = useState<string>("");
  const [names, setNames] = useState<GeneratedName[]>([]);
  const [shareFeedback, setShareFeedback] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Sync state from query parameters on mount, or fallback to preset
  useEffect(() => {
    setMounted(true);
    const searchParams = new URLSearchParams(window.location.search);
    
    const queryType = searchParams.get("type");
    const queryRace = searchParams.get("race");
    const queryStyle = searchParams.get("style");
    const queryGender = searchParams.get("gender");
    const queryQty = searchParams.get("qty");
    const querySeed = searchParams.get("seed");

    const activeType = queryType || initialPreset.generatorType || "character";
    const activeRace = queryRace || initialPreset.race || "none";
    const activeStyle = queryStyle || initialPreset.style || "none";
    const activeGender = (queryGender || initialPreset.gender || "any") as "male" | "female" | "any";
    const activeQty = queryQty ? parseInt(queryQty, 10) : (initialPreset.quantity || 10);
    const activeSeed = querySeed || generateSeed();

    setGeneratorType(activeType);
    setRace(activeRace);
    setStyle(activeStyle);
    setGender(activeGender);
    setQuantity(activeQty);
    setSeed(activeSeed);

    // Initial deterministic generation on mount
    const results = generateNames({
      generatorType: activeType,
      race: activeRace,
      style: activeStyle,
      gender: activeGender,
      quantity: activeQty,
      seed: activeSeed
    });
    setNames(results);

    trackEvent("generator_open", { 
      generator_type: activeType, 
      race: activeRace, 
      style: activeStyle 
    });
  }, [initialPreset]);

  // Generate Handler
  const handleGenerate = (customSeed?: string) => {
    const targetSeed = customSeed || seed || generateSeed();
    if (!customSeed) {
      setSeed(targetSeed);
    }

    const config: GeneratorConfig = {
      generatorType,
      race,
      style,
      gender,
      quantity,
      seed: targetSeed
    };

    const results = generateNames(config);
    setNames(results);

    // Update query params in browser search bar silently (preserving SEO index routes)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("type", generatorType);
      url.searchParams.set("race", race);
      url.searchParams.set("style", style);
      url.searchParams.set("gender", gender);
      url.searchParams.set("qty", quantity.toString());
      url.searchParams.set("seed", targetSeed);
      window.history.replaceState({}, "", url.toString());
    }

    trackEvent("generation", {
      generator_type: generatorType,
      race,
      style,
      gender,
      quantity,
      seed: targetSeed
    });
  };

  // Trigger seed shuffle
  const handleShuffleSeed = () => {
    const newSeed = generateSeed();
    setSeed(newSeed);
    handleGenerate(newSeed);
  };

  // Replace a specific single slot during remix action
  const handleUpdateName = (index: number, newNameObj: GeneratedName) => {
    const updated = [...names];
    updated[index] = newNameObj;
    setNames(updated);
  };

  // Handle Share URL Copy
  const handleShareConfig = () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShareFeedback(true);
    trackEvent("share", { generator_type: generatorType, race, style, seed });

    setTimeout(() => {
      setShareFeedback(false);
    }, 2000);
  };

  // Determine if controls are relevant
  const showRaceSelect = generatorType === "character" || generatorType === "dnd";
  const showGenderSelect = generatorType === "character" || generatorType === "dnd";



  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Title Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white glow-text-primary">
          {titleText}
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {descriptionText}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-1 glass-panel rounded-2xl p-5 border border-card-border/50 bg-[#0f0c1e]/90 space-y-5">
          <h2 className="text-sm font-semibold text-violet-300 uppercase tracking-wider border-b border-card-border/30 pb-2">
            Generator Controls
          </h2>

          {/* Target Entity Selector */}
          <div>
            <label htmlFor="gen-type" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              What are you naming?
            </label>
            <select
              id="gen-type"
              value={generatorType}
              onChange={(e) => {
                setGeneratorType(e.target.value);
                // Reset race defaults for entities
                if (e.target.value !== "character" && e.target.value !== "dnd") {
                  setRace("none");
                } else if (e.target.value === "character" && race === "none") {
                  setRace("elf");
                }
              }}
              className="w-full bg-[#07050f]/80 border border-card-border/40 rounded-lg px-3 py-2 text-sm text-slate-200 cursor-pointer"
            >
              <option value="character">Character</option>
              <option value="dnd">D&D Race</option>
              <option value="kingdom">Kingdom</option>
              <option value="city">City</option>
              <option value="guild">Guild</option>
              <option value="clan">Clan</option>
              <option value="tavern">Tavern</option>
              <option value="ship">Ship</option>
              <option value="weapon">Weapon</option>
              <option value="creature">Creature</option>
              <option value="username">Username</option>
            </select>
          </div>

          {/* Race Select (Only characters) */}
          {showRaceSelect && (
            <div>
              <label htmlFor="gen-race" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Race / Species
              </label>
              <select
                id="gen-race"
                value={race}
                onChange={(e) => setRace(e.target.value)}
                className="w-full bg-[#07050f]/80 border border-card-border/40 rounded-lg px-3 py-2 text-sm text-slate-200 cursor-pointer"
              >
                <option value="any">Any Race (Random)</option>
                <option value="elf">Elf</option>
                <option value="dark-elf">Dark Elf (Drow)</option>
                <option value="dwarf">Dwarf</option>
                <option value="orc">Orc</option>
                <option value="dragon">Dragon</option>
                <option value="human">Human</option>
                <option value="wizard">Wizard</option>
                <option value="vampire">Vampire</option>
                <option value="angel">Angel</option>
                <option value="demon">Demon</option>
                <option value="fairy">Fairy</option>
              </select>
            </div>
          )}

          {/* Style Select */}
          <div>
            <label htmlFor="gen-style" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Style / Modifier
            </label>
            <select
              id="gen-style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full bg-[#07050f]/80 border border-card-border/40 rounded-lg px-3 py-2 text-sm text-slate-200 cursor-pointer"
            >
              <option value="none">Standard / Genre Classic</option>
              <option value="high-fantasy">High Fantasy</option>
              <option value="dark-fantasy">Dark Fantasy</option>
              <option value="ancient">Ancient</option>
              <option value="royal">Royal</option>
            </select>
          </div>

          {/* Gender Select (Only characters) */}
          {showGenderSelect && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Gender
              </label>
              <div className="flex gap-2">
                {(["any", "male", "female"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 py-1.5 rounded-lg border text-xs font-bold uppercase transition-all cursor-pointer ${
                      gender === g
                        ? "bg-violet-900/50 border-violet-500 text-violet-200 shadow"
                        : "bg-[#07050f]/40 border-card-border/30 text-slate-400 hover:text-white"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Seed Input */}
          <div>
            <label htmlFor="gen-seed" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex justify-between items-center">
              <span>Seed Configuration</span>
              <button
                type="button"
                onClick={handleShuffleSeed}
                className="text-[10px] text-violet-400 hover:text-violet-300 flex items-center gap-0.5 cursor-pointer uppercase font-bold"
                title="Shuffle Seed"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
                </svg>
                Shuffle
              </button>
            </label>
            <input
              id="gen-seed"
              type="text"
              value={seed}
              onChange={(e) => setSeed(e.target.value.toUpperCase().slice(0, 16))}
              className="w-full bg-[#07050f]/80 border border-card-border/40 rounded-lg px-3 py-2 text-sm text-slate-200 tracking-wider font-mono"
              placeholder="E.g. AELTHA"
            />
          </div>

          {/* Quantity Controls */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Quantity ({quantity})
            </label>
            <div className="flex gap-2">
              {([1, 5, 10, 20] as const).map((qty) => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => setQuantity(qty)}
                  className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                    quantity === qty
                      ? "bg-violet-900/50 border-violet-500 text-violet-200 shadow"
                      : "bg-[#07050f]/40 border-card-border/30 text-slate-400 hover:text-white"
                  }`}
                >
                  {qty}
                </button>
              ))}
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => handleGenerate()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-sm tracking-wider uppercase shadow-lg shadow-violet-950/40 glow-button transition-all cursor-pointer border border-violet-400/20"
            >
              Generate Names
            </button>
            <button
              onClick={handleShareConfig}
              className={`w-full py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                shareFeedback
                  ? "bg-emerald-950/50 border-emerald-500 text-emerald-400"
                  : "bg-transparent border-card-border/50 text-slate-300 hover:border-violet-500/40 hover:text-white"
              }`}
            >
              {shareFeedback ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Link Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 10.742l4.636-2.318a3 3 0 10-.263-.732L8.42 10.01a3 3 0 100 3.98l5.228-2.614A3 3 0 1016.5 9.75M16.5 9.75a3.01 3.01 0 01-.082-.69M16.5 9.75c-.244.757-.96 1.306-1.816 1.306-1.077 0-1.95-.873-1.95-1.95s.873-1.95 1.95-1.95c.856 0 1.572.549 1.816 1.306" />
                  </svg>
                  Share This Generator Config
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-card-border/30 pb-2">
            <h2 className="text-sm font-semibold text-violet-300 uppercase tracking-wider">
              Generated Outputs
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Seed: {mounted ? seed : (initialPreset.seed || "...")}
            </span>
          </div>

          {mounted ? (
            <ResultsList names={names} onUpdateName={handleUpdateName} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: initialPreset.quantity || 10 }).map((_, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-xl p-4 flex flex-col justify-between gap-4 border border-card-border/40 min-h-[132px] animate-pulse"
                >
                  <div className="pl-2 space-y-2">
                    <div className="h-6 bg-violet-950/40 rounded w-2/3" />
                    <div className="h-3.5 bg-violet-950/20 rounded w-1/2" />
                    <div className="h-3.5 bg-violet-950/20 rounded w-1/3" />
                  </div>
                  <div className="border-t border-card-border/30 pt-3 h-8 flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-violet-950/30" />
                      <div className="w-8 h-8 rounded bg-violet-950/30" />
                      <div className="w-12 h-6 rounded bg-violet-950/30" />
                    </div>
                    <div className="w-16 h-6 rounded bg-violet-950/30" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
