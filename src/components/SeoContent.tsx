import Link from "next/link";
import { getGeneratorBySlug } from "../data/registry";
import { generateNames } from "../lib/generatorEngine";

interface SeoContentProps {
  slug: string;
}

export default function SeoContent({ slug }: SeoContentProps) {
  const gen = getGeneratorBySlug(slug);

  if (!gen) return null;

  // Resolve related generator objects
  const relatedGens = gen.relatedSlugs
    .map(s => getGeneratorBySlug(s))
    .filter((g): g is NonNullable<typeof g> => !!g);

  // Resolve example names from curated list or generate a deterministic sample set
  const examples = (gen.exampleNames && gen.exampleNames.length > 0)
    ? gen.exampleNames
    : generateNames({
        generatorType: gen.generatorConfig.generatorType || "character",
        race: gen.generatorConfig.race,
        style: gen.generatorConfig.style,
        gender: gen.generatorConfig.gender,
        quantity: 5,
        seed: `SEO-EX-${gen.slug || "home"}`
      }).map(n => ({
        name: n.name,
        pronunciation: n.pronunciation || "Standard",
        meaning: n.meaning || "Legendary moniker"
      }));

  return (
    <div className="site-shell py-16 border-t border-white/10 mt-14 space-y-14 text-slate-300">
      {/* Editorial Content: Split Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
        <article className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            How the {gen.h1.replace(" Generator", "")} Works
          </h2>
          <p className="text-sm leading-relaxed text-slate-400 whitespace-pre-line">
            {gen.about}
          </p>
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
            Naming Characteristics
          </h2>
          <p className="text-sm leading-relaxed text-slate-400 whitespace-pre-line">
            {gen.characteristics}
          </p>
        </article>
      </div>

      {/* Structured Example Names Table */}
      {examples.length > 0 && (
        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Example {gen.h1.replace(" Generator", "")} Names & Meanings
            </h2>
            <span className="text-xs text-slate-400 font-mono">Phonetic & Semantic Breakdown</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 glass-panel">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase font-bold tracking-wider text-slate-300">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Name</th>
                  <th scope="col" className="px-5 py-3.5">Phonetic Pronunciation</th>
                  <th scope="col" className="px-5 py-3.5">Meaning & Linguistic Lore</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {examples.map((ex, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-white whitespace-nowrap">
                      {ex.name}
                    </td>
                    <td className="px-5 py-3.5 italic text-slate-400 font-mono text-xs">
                      &ldquo;{ex.pronunciation}&rdquo;
                    </td>
                    <td className="px-5 py-3.5 text-amber-300/90 text-xs sm:text-sm">
                      {ex.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {gen.faqs && gen.faqs.length > 0 && (
        <section className="space-y-6 pt-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 border-b border-card-border/30 pb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {gen.faqs.map((faq, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-xl border border-card-border/20 bg-violet-950/5">
                <h3 className="text-sm font-semibold text-white mb-2 flex gap-1">
                  <span className="text-amber-400">Q:</span>
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed pl-4 border-l border-violet-500/20">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Internal Linking Grid */}
      {relatedGens.length > 0 && (
        <section className="space-y-6 pt-4">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center">
            Explore Related Generators
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedGens.map((r) => (
              <Link
                key={r.slug}
                href={`/${r.slug}`}
                className="px-4 py-2 text-xs font-semibold rounded-full border border-card-border/30 bg-[#0f0c1e]/40 hover:bg-violet-950/20 hover:border-violet-500/50 hover:text-white transition-all cursor-pointer"
              >
                {r.h1}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
