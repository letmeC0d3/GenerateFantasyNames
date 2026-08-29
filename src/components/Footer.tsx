import Link from "next/link";

export default function Footer() {
  const characters = [
    { name: "Elf Name Generator", href: "/elf-name-generator" },
    { name: "Dark Elf Name Generator", href: "/dark-elf-name-generator" },
    { name: "Dwarf Name Generator", href: "/dwarf-name-generator" },
    { name: "Orc Name Generator", href: "/orc-name-generator" },
    { name: "Dragon Name Generator", href: "/dragon-name-generator" },
    { name: "Wizard Name Generator", href: "/wizard-name-generator" },
    { name: "Vampire Name Generator", href: "/vampire-name-generator" },
    { name: "Angel Name Generator", href: "/angel-name-generator" },
    { name: "Demon Name Generator", href: "/demon-name-generator" },
    { name: "Fairy Name Generator", href: "/fairy-name-generator" },
  ];

  const details = [
    { name: "Kingdom Names", href: "/fantasy-kingdom-name-generator" },
    { name: "City Names", href: "/fantasy-city-name-generator" },
    { name: "Guild Names", href: "/fantasy-guild-name-generator" },
    { name: "Clan Names", href: "/fantasy-clan-name-generator" },
    { name: "Weapon Names", href: "/weapon-name-generator" },
    { name: "Ship Names", href: "/fantasy-ship-name-generator" },
    { name: "Tavern Names", href: "/fantasy-tavern-name-generator" },
    { name: "Fantasy Usernames", href: "/fantasy-username-generator" },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#090a12] text-slate-400">
      {/* Dynamic Network Callout section to StylishFont.in */}
      <div className="site-shell py-10 border-b border-white/10">
        <div className="surface-panel p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-violet-950/30 to-fuchsia-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span>Got your perfect name?</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-900 text-violet-300">
                New
              </span>
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Make your name stand out on Discord, Steam, Roblox, and social media. 
              Transform regular characters into unique, stylish Unicode text.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href="https://stylishfont.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold text-sm shadow-lg shadow-violet-900/30 glow-button transition-all cursor-pointer"
            >
              Stylize Your Name
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="site-shell py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2 pr-4">
            <span className="text-lg font-bold text-white tracking-tight">
              GenerateFantasyNames<span className="text-violet-400">.com</span>
            </span>
            <p className="mt-4 text-sm text-slate-400 max-w-sm leading-relaxed">
              We design deterministic, phonetically structured generators that assemble names 
              with rich meanings and historical roots, helping writers, roleplayers, and gamers build coherent worlds.
            </p>
            <div className="mt-6 flex gap-4 text-xs">
              <Link href="/favorites" className="hover:text-white transition-colors">
                View Saved Names
              </Link>
              <span>•</span>
              <a href="#top" className="hover:text-white transition-colors">
                Back to Top
              </a>
            </div>
          </div>

          {/* Directory Column 1 */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Races & Characters
            </h4>
            <ul className="space-y-2 text-sm">
              {characters.slice(0, 7).map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name.replace(" Generator", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory Column 2 */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Entities & Items
            </h4>
            <ul className="space-y-2 text-sm">
              {details.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.name.replace(" Generator", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="mt-12 pt-8 border-t border-card-border/30 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>
            &copy; {new Date().getFullYear()} GenerateFantasyNames.com. All rights reserved. 
            Built for writers, world-builders, and gamers.
          </p>
          <div className="flex gap-4">
            <a 
              href="https://stylishfont.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-white transition-colors font-medium"
            >
              Visit StylishFont.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
