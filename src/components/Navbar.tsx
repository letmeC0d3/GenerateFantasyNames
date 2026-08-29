"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const updateCount = () => {
      try {
        const stored = localStorage.getItem("gfn_favorites");
        if (stored) {
          const list = JSON.parse(stored);
          setFavCount(Array.isArray(list) ? list.length : 0);
        } else {
          setFavCount(0);
        }
      } catch (e) {
        console.error("Failed to read favorites count:", e);
      }
    };

    updateCount();
    // Listen for storage events (if modified in other tabs)
    window.addEventListener("storage", updateCount);
    // Custom event to update count instantly when favoriting
    window.addEventListener("favorites-updated", updateCount);

    return () => {
      window.removeEventListener("storage", updateCount);
      window.removeEventListener("favorites-updated", updateCount);
    };
  }, []);

  const categories = [
    {
      name: "Characters & Races",
      links: [
        { label: "Elf Names", href: "/elf-name-generator" },
        { label: "Dark Elf Names", href: "/dark-elf-name-generator" },
        { label: "Dwarf Names", href: "/dwarf-name-generator" },
        { label: "Orc Names", href: "/orc-name-generator" },
        { label: "Dragon Names", href: "/dragon-name-generator" },
        { label: "Wizard Names", href: "/wizard-name-generator" },
        { label: "Vampire Names", href: "/vampire-name-generator" },
        { label: "Angel Names", href: "/angel-name-generator" },
        { label: "Demon Names", href: "/demon-name-generator" },
        { label: "Fairy Names", href: "/fairy-name-generator" },
      ],
    },
    {
      name: "Locations & Factions",
      links: [
        { label: "Kingdom Names", href: "/fantasy-kingdom-name-generator" },
        { label: "City Names", href: "/fantasy-city-name-generator" },
        { label: "Guild Names", href: "/fantasy-guild-name-generator" },
        { label: "Clan Names", href: "/fantasy-clan-name-generator" },
      ],
    },
    {
      name: "Items & Other",
      links: [
        { label: "Weapon Names", href: "/weapon-name-generator" },
        { label: "Ship Names", href: "/fantasy-ship-name-generator" },
        { label: "Tavern Names", href: "/fantasy-tavern-name-generator" },
        { label: "Usernames", href: "/fantasy-username-generator" },
      ],
    },
  ];

  return (
    <nav id="top" className="site-nav">
      <div className="site-shell">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-base sm:text-lg font-black tracking-[-0.04em] text-white group-hover:text-violet-200 transition-colors whitespace-nowrap">
                GenerateFantasy<span className="text-violet-300">Names</span><span className="ml-1.5 text-[10px] font-bold tracking-normal text-slate-400">.com</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {categories.map((cat, idx) => (
              <div key={idx} className="relative group px-3 py-2">
                <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  {cat.name}
                  <svg className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* Dropdown panel */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 pt-2 hidden group-hover:block">
                  <div className="surface-panel rounded-xl p-2 shadow-2xl">
                  {cat.links.map((link, lIdx) => (
                    <Link
                      key={lIdx}
                      href={link.href}
                      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                        pathname === link.href
                          ? "bg-violet-950/80 text-violet-200 border-l-2 border-violet-500 font-medium"
                          : "text-slate-300 hover:bg-violet-900/25 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/favorites"
              className={`flex items-center gap-2 px-4 py-2 ml-4 text-sm font-medium rounded-full transition-all border ${
                pathname === "/favorites"
                  ? "bg-violet-500/20 text-violet-100 border-violet-400/50"
                  : "bg-white/5 text-slate-300 border-white/10 hover:border-violet-400/40 hover:text-white"
              }`}
            >
              <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Saved</span>
              {favCount > 0 && (
                <span className="flex items-center justify-center bg-rose-600 text-white text-xs font-bold px-1.5 min-w-5 h-5 rounded-full ring-2 ring-[#0b0914] scale-95">
                  {favCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
            <Link
              href="/favorites"
              aria-label="Favorites"
              className="relative p-2 text-rose-400 hover:text-rose-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {favCount > 0 && (
                <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-rose-600 ring-2 ring-[#0b0914]" />
              )}
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white focus:outline-none focus:text-white cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-navigation" className="lg:hidden glass-panel bg-[#0f0c1e] border-t border-card-border p-4 max-h-[85vh] overflow-y-auto">
          {categories.map((cat, idx) => (
            <div key={idx} className="mb-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {cat.name}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {cat.links.map((link, lIdx) => (
                  <Link
                    key={lIdx}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors block ${
                      pathname === link.href
                        ? "bg-violet-950 text-violet-200 border-l-2 border-violet-500 font-medium"
                        : "text-slate-300 hover:bg-violet-900/20 hover:text-white"
                    }`}
                  >
                    {link.label.replace(" Names", "")}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="border-t border-card-border/50 pt-4 mt-2">
            <Link
              href="/favorites"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-violet-900/30 border border-violet-500/30 text-violet-200 font-medium"
            >
              <svg className="w-5 h-5 text-rose-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Saved Names ({favCount})
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
