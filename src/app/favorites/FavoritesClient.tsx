"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { GeneratedName, RemixAction, remixName } from "../../lib/generatorEngine";
import { trackEvent } from "../../lib/analytics";

export default function FavoritesClient() {
  const [favorites, setFavorites] = useState<GeneratedName[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeRemixId, setActiveRemixId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load favorites on mount
  useEffect(() => {
    setMounted(true);
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
      // Trigger update on other layout components (like Navbar count)
      window.dispatchEvent(new Event("favorites-updated"));
    } catch (e) {
      console.error("Failed to save favorites:", e);
    }
  };

  const handleRemove = (nameText: string) => {
    const list = favorites.filter(f => f.name !== nameText);
    saveFavorites(list);
    trackEvent("unfavorite", { name: nameText, source: "favorites_page" });
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all saved names?")) {
      saveFavorites([]);
      trackEvent("clear_all_favorites");
    }
  };

  const handleCopy = (nameText: string, nameId: string, race: string) => {
    navigator.clipboard.writeText(nameText);
    setCopiedId(nameId);
    trackEvent("copy", { name: nameText, race, source: "favorites_page" });

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleRemix = (index: number, nameObj: GeneratedName, action: RemixAction) => {
    const remixed = remixName(nameObj, action);
    const updated = [...favorites];
    updated[index] = remixed;
    saveFavorites(updated);
    setActiveRemixId(null);

    trackEvent("remix", {
      original_name: nameObj.name,
      remixed_name: remixed.name,
      action,
      source: "favorites_page"
    });
  };

  const handleStylizeClick = (nameText: string, race: string, genType: string) => {
    trackEvent("stylize_click", {
      name: nameText,
      generator_type: genType,
      race,
      source: "favorites_page"
    });
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse space-y-4 text-center">
            <div className="h-6 bg-violet-950/40 w-32 rounded mx-auto" />
            <div className="h-10 bg-violet-950/20 w-48 rounded mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const popularGenerators = [
    { label: "Elf Names", href: "/elf-name-generator" },
    { label: "Dwarf Names", href: "/dwarf-name-generator" },
    { label: "Orc Names", href: "/orc-name-generator" },
    { label: "Kingdom Names", href: "/fantasy-kingdom-name-generator" },
    { label: "Usernames", href: "/fantasy-username-generator" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8 sm:py-12">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-card-border/30 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white glow-text-primary">
              Your Saved Names
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Review and export the fantasy names you have collected. Saved locally in your browser.
            </p>
          </div>
          {favorites.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-4 py-2 text-xs font-semibold text-rose-400 hover:text-white border border-rose-900/50 hover:bg-rose-950/20 rounded-lg transition-colors cursor-pointer"
            >
              Clear All Saved
            </button>
          )}
        </div>

        {/* Saved List Grid */}
        {favorites.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border-dashed border-card-border/50 max-w-lg mx-auto p-8">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-950/20 flex items-center justify-center text-rose-500/60 mb-4 ring-4 ring-rose-950/5">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white">No saved names yet</h2>
            <p className="text-sm text-slate-400 mt-2">
              Explore generators and tap the heart icon on any generated name to collect it here.
            </p>
            <div className="mt-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Quick Start Generators
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {popularGenerators.map((gen) => (
                  <Link
                    key={gen.href}
                    href={gen.href}
                    className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-card-border/40 bg-violet-950/10 text-slate-300 hover:border-violet-500/50 hover:text-white transition-all"
                  >
                    {gen.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((nameObj, idx) => {
              const isCopied = copiedId === nameObj.id;
              const isRemixOpen = activeRemixId === nameObj.id;

              return (
                <div
                  key={nameObj.id}
                  className="glass-panel glass-panel-hover rounded-xl p-4 flex flex-col justify-between gap-4 border border-card-border/40 relative overflow-hidden"
                >
                  {/* Left accent color bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-rose-500 to-violet-500" />

                  <div className="pl-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xl font-bold tracking-wide text-white select-all">
                        {nameObj.name}
                      </span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-violet-950/60 border border-violet-500/20 text-violet-300">
                        {nameObj.race !== "none" ? nameObj.race : nameObj.generatorType}
                      </span>
                    </div>

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

                  {/* Actions footer */}
                  <div className="flex items-center justify-between border-t border-card-border/30 pt-3 pl-2">
                    <div className="flex items-center gap-1.5">
                      {/* Copy Action */}
                      <button
                        onClick={() => handleCopy(nameObj.name, nameObj.id, nameObj.race)}
                        className={`p-2 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                          isCopied ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400" : "hover:bg-violet-950/40"
                        }`}
                        title="Copy name"
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

                      {/* Remove Action */}
                      <button
                        onClick={() => handleRemove(nameObj.name)}
                        className="p-2 rounded-lg text-rose-400 hover:text-rose-500 hover:bg-rose-950/20 transition-colors cursor-pointer"
                        title="Remove Name"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                      {/* Remix Action */}
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
                            <div className="fixed inset-0 z-10" onClick={() => setActiveRemixId(null)} />
                            <div className="absolute bottom-full left-0 mb-2 w-32 z-20 glass-panel bg-[#0f0c1e] rounded-lg border border-card-border p-1 shadow-2xl flex flex-col">
                              {["similar", "longer", "shorter", "darker", "royal", "ancient"].map((action) => (
                                <button
                                  key={action}
                                  onClick={() => handleRemix(idx, nameObj, action as any)}
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

                    {/* Stylize Action */}
                    <a
                      href={`https://stylishfont.in/?text=${encodeURIComponent(nameObj.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleStylizeClick(nameObj.name, nameObj.race, nameObj.generatorType || "")}
                      className="flex items-center gap-1 text-xs font-semibold text-violet-400 hover:text-violet-300 hover:underline transition-colors px-2 py-1 rounded-md hover:bg-violet-950/20 cursor-pointer"
                    >
                      <span>Stylize</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
