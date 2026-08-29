"use client";

import { useState, useEffect } from "react";
import { GeneratedName, RemixAction, remixName } from "../lib/generatorEngine";
import { trackEvent } from "../lib/analytics";

interface ResultsListProps {
  names: GeneratedName[];
  onUpdateName: (index: number, newName: GeneratedName) => void;
}

export default function ResultsList({ names, onUpdateName }: ResultsListProps) {
  const [favorites, setFavorites] = useState<GeneratedName[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeRemixId, setActiveRemixId] = useState<string | null>(null);

  // Load favorites on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("gfn_favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load favorites:", e);
    }
  }, []);

  const saveFavorites = (list: GeneratedName[]) => {
    try {
      localStorage.setItem("gfn_favorites", JSON.stringify(list));
      setFavorites(list);
      // Notify navbar to update count
      window.dispatchEvent(new Event("favorites-updated"));
    } catch (e) {
      console.error("Failed to save favorites:", e);
    }
  };

  const isFavorited = (name: string) => {
    return favorites.some(f => f.name === name);
  };

  const toggleFavorite = (nameObj: GeneratedName) => {
    let newList;
    if (isFavorited(nameObj.name)) {
      newList = favorites.filter(f => f.name !== nameObj.name);
      trackEvent("unfavorite", { name: nameObj.name, race: nameObj.race });
    } else {
      newList = [...favorites, nameObj];
      trackEvent("favorite", { name: nameObj.name, race: nameObj.race, generator_type: nameObj.generatorType });
    }
    saveFavorites(newList);
  };

  const handleCopy = (nameText: string, nameId: string, race: string, genType: string) => {
    navigator.clipboard.writeText(nameText);
    setCopiedId(nameId);
    trackEvent("copy", { name: nameText, race, generator_type: genType });

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleRemix = (index: number, nameObj: GeneratedName, action: RemixAction) => {
    const remixed = remixName(nameObj, action);
    onUpdateName(index, remixed);
    setActiveRemixId(null);
    trackEvent("remix", { 
      original_name: nameObj.name, 
      remixed_name: remixed.name, 
      action,
      race: nameObj.race 
    });
  };

  const handleStylizeClick = (nameText: string, race: string, genType: string) => {
    trackEvent("stylize_click", {
      name: nameText,
      generator_type: genType,
      race,
      source: "result_card"
    });
  };

  return (
    <div className="w-full space-y-4">
      {names.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl border-dashed border-card-border/50 text-slate-400">
          <svg className="w-12 h-12 mx-auto text-violet-500/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <p className="text-base font-medium">Your fantasy names will appear here.</p>
          <p className="text-xs text-slate-500 mt-1">Configure options above and click Generate.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {names.map((nameObj, idx) => {
            const isFav = isFavorited(nameObj.name);
            const isCopied = copiedId === nameObj.id;
            const isRemixOpen = activeRemixId === nameObj.id;

            return (
              <div
                key={nameObj.id}
                className="glass-panel glass-panel-hover rounded-xl p-4 flex flex-col justify-between gap-4 border border-card-border/40 relative overflow-hidden"
              >
                {/* Accent glow line */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-500 to-fuchsia-500" />

                <div className="pl-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xl font-bold tracking-wide text-white select-all">
                      {nameObj.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-violet-950/60 border border-violet-500/20 text-violet-300">
                      {nameObj.race !== "none" ? nameObj.race : nameObj.generatorType}
                    </span>
                  </div>

                  {/* Phonetics & Meaning */}
                  <div className="mt-2 space-y-1">
                    {nameObj.pronunciation && (
                      <p className="text-xs text-slate-400 italic">
                        Pronounced: &ldquo;{nameObj.pronunciation}&rdquo;
                      </p>
                    )}
                    {nameObj.meaning && (
                      <p className="text-xs text-amber-300/80 font-medium">
                        {nameObj.meaning}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interactive Options Panels */}
                <div className="flex items-center justify-between border-t border-card-border/30 pt-3 pl-2">
                  <div className="flex items-center gap-1.5">
                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(nameObj.name, nameObj.id, nameObj.race, nameObj.generatorType)}
                      className={`p-2 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                        isCopied ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400" : "hover:bg-violet-950/40"
                      }`}
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <svg className="w-4 h-4 text-emerald-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-5 4h6m-6 4h6m-2 4h4" />
                        </svg>
                      )}
                    </button>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(nameObj)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        isFav ? "text-rose-500 hover:text-rose-400 bg-rose-950/20" : "text-slate-400 hover:text-rose-500 hover:bg-rose-950/10"
                      }`}
                      title={isFav ? "Remove from Saved" : "Save Name"}
                    >
                      <svg className="w-4 h-4" fill={isFav ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* Remix Button with inline actions dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveRemixId(isRemixOpen ? null : nameObj.id)}
                        className={`p-2 rounded-lg text-slate-400 hover:text-white hover:bg-violet-950/40 transition-colors flex items-center gap-0.5 cursor-pointer ${
                          isRemixOpen ? "bg-violet-950/60 text-violet-300" : ""
                        }`}
                        title="Remix Name"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
                        </svg>
                        <span className="text-[10px] font-bold">Remix</span>
                      </button>

                      {isRemixOpen && (
                        <>
                          {/* Close overlay */}
                          <div className="fixed inset-0 z-10" onClick={() => setActiveRemixId(null)} />
                          <div className="absolute bottom-full left-0 mb-2 w-32 z-20 glass-panel bg-[#0f0c1e] rounded-lg border border-card-border p-1 shadow-2xl flex flex-col">
                            {(["similar", "longer", "shorter", "darker", "royal", "ancient"] as RemixAction[]).map((action) => (
                              <button
                                key={action}
                                onClick={() => handleRemix(idx, nameObj, action)}
                                className="w-full text-left px-2.5 py-1.5 text-xs text-slate-300 rounded hover:bg-violet-900/30 hover:text-white transition-colors cursor-pointer capitalize"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Stylize Outbound Link */}
                  <a
                    href={`https://stylishfont.in/?text=${encodeURIComponent(nameObj.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleStylizeClick(nameObj.name, nameObj.race, nameObj.generatorType)}
                    className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 hover:underline transition-colors px-2 py-1 rounded-md hover:bg-violet-950/20 cursor-pointer"
                  >
                    <span>Stylize</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
