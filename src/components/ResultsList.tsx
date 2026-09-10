"use client";

import { useState } from "react";
import { GeneratedName, RemixAction, remixName } from "../lib/generatorEngine";
import { trackEvent } from "../lib/analytics";
import { useFavorites } from "../lib/favorites";

interface ResultsListProps {
  names: GeneratedName[];
  onUpdateName: (index: number, newName: GeneratedName) => void;
}

export default function ResultsList({ names, onUpdateName }: ResultsListProps) {
  const [favorites, saveFavorites] = useFavorites();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeRemixId, setActiveRemixId] = useState<string | null>(null);
  const [copyAllFeedback, setCopyAllFeedback] = useState(false);

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

  const handleCopyAll = () => {
    if (names.length === 0) return;
    const text = names.map(n => {
      let line = n.name;
      if (n.pronunciation) line += ` (${n.pronunciation})`;
      if (n.meaning) line += ` - ${n.meaning}`;
      return line;
    }).join("\n");
    navigator.clipboard.writeText(text);
    setCopyAllFeedback(true);
    trackEvent("copy_all", { count: names.length, source: "results_list" });
    setTimeout(() => setCopyAllFeedback(false), 2000);
  };

  const handleExportTxt = () => {
    if (names.length === 0) return;
    const text = [
      "# Fantasy Names Generated on GenerateFantasyNames.com",
      `# Date: ${new Date().toISOString()}`,
      `# Count: ${names.length}`,
      "",
      ...names.map((n, i) => {
        let line = `${i + 1}. ${n.name}`;
        if (n.pronunciation) line += ` [${n.pronunciation}]`;
        if (n.meaning) line += ` — ${n.meaning}`;
        return line;
      }),
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fantasy-names-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    trackEvent("export_txt", { count: names.length, source: "results_list" });
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
        <>
          <div className="flex items-center justify-between gap-2 pb-1">
            <span className="text-xs text-slate-400 font-medium">
              {names.length} {names.length === 1 ? "name" : "names"} generated
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAll}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-violet-400/25 bg-violet-950/20 text-violet-200 hover:bg-violet-900/30 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                title="Copy current batch line-by-line"
              >
                {copyAllFeedback ? (
                  <>
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied All!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <rect x="9" y="9" width="11" height="11" rx="2" strokeWidth={2} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2h3" />
                    </svg>
                    <span>Copy All</span>
                  </>
                )}
              </button>
              <button
                onClick={handleExportTxt}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                title="Download current batch as TXT file"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Export as TXT</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
          {names.map((nameObj, idx) => {
            const isFav = isFavorited(nameObj.name);
            const isCopied = copiedId === nameObj.id;
            const isRemixOpen = activeRemixId === nameObj.id;

            return (
              <div
                key={nameObj.id}
                className="name-card"
              >
                {/* Accent glow line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-400 via-fuchsia-500 to-amber-300" />

                <div className="pl-2">
                  <div className="flex justify-between items-start gap-3 pl-1">
                    <span className="min-w-0 break-words text-xl font-bold tracking-tight text-white select-all">
                      {nameObj.name}
                    </span>
                    <span className="shrink-0 text-[10px] uppercase font-bold px-2 py-1 rounded-full bg-violet-500/15 border border-violet-400/30 text-violet-200">
                      {nameObj.race !== "none" ? nameObj.race : nameObj.generatorType}
                    </span>
                  </div>

                  {/* Phonetics & Meaning */}
                  <div className="mt-3 space-y-1.5 pl-1">
                    {nameObj.pronunciation && (
                      <p className="text-sm text-slate-400 italic leading-relaxed">
                        Pronounced: &ldquo;{nameObj.pronunciation}&rdquo;
                      </p>
                    )}
                    {nameObj.meaning && (
                      <p className="text-sm text-amber-300/90 font-medium">
                        {nameObj.meaning}
                      </p>
                    )}
                  </div>
                </div>

                {/* Interactive Options Panels */}
                <div className="flex items-center justify-between border-t border-white/10 pt-3 pl-1">
                  <div className="flex items-center gap-1.5">
                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(nameObj.name, nameObj.id, nameObj.race, nameObj.generatorType)}
                      className={`p-2 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer ${
                        isCopied ? "bg-emerald-950/60 border border-emerald-500/40 text-emerald-400" : "hover:bg-white/10"
                      }`}
                      title="Copy to clipboard"
                    >
                      {isCopied ? (
                        <svg className="w-4 h-4 text-emerald-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="action-icon w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <rect x="9" y="9" width="11" height="11" rx="2" strokeWidth={2} />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2h3" />
                        </svg>
                      )}
                    </button>

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(nameObj)}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        isFav ? "text-rose-400 hover:text-rose-300 bg-rose-950/20" : "text-slate-400 hover:text-rose-400 hover:bg-rose-950/20"
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
                        className={`inline-flex items-center gap-1.5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-violet-950/40 transition-colors leading-none cursor-pointer ${
                          isRemixOpen ? "bg-violet-500/20 text-violet-200" : ""
                        }`}
                        title="Remix Name"
                      >
                        <svg className="action-icon refresh-icon w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 00-15.22-6.47L3 8m0-5v5h5M3 12a9 9 0 0015.22 6.47L21 16m0 5v-5h-5" />
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
                    className="flex items-center gap-1 text-xs font-semibold text-violet-300 hover:text-white transition-colors px-2 py-1.5 rounded-md hover:bg-white/10 cursor-pointer"
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
        </>
      )}
    </div>
  );
}
