import Link from "next/link";
import { getGeneratorBySlug } from "../data/registry";

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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 border-t border-card-border/30 mt-8 space-y-12 text-slate-300">
      {/* Editorial Content: Split Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 border-b border-card-border/30 pb-2">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            How the {gen.h1.replace(" Generator", "")} Works
          </h2>
          <p className="text-sm leading-relaxed text-slate-400 whitespace-pre-line">
            {gen.about}
          </p>
        </article>

        <article className="space-y-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 border-b border-card-border/30 pb-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-500" />
            Naming Characteristics
          </h2>
          <p className="text-sm leading-relaxed text-slate-400 whitespace-pre-line">
            {gen.characteristics}
          </p>
        </article>
      </div>

      {/* FAQs Section */}
      {gen.faqs && gen.faqs.length > 0 && (
        <section className="space-y-6 pt-4">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 border-b border-card-border/30 pb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
