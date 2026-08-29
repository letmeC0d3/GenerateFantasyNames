import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generatorPages, getGeneratorBySlug } from "../../data/registry";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GeneratorInterface from "../../components/GeneratorInterface";
import SeoContent from "../../components/SeoContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static parameters for build-time compilation
export async function generateStaticParams() {
  return generatorPages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const gen = getGeneratorBySlug(resolvedParams.slug);

  if (!gen) {
    return {
      title: "Page Not Found - GenerateFantasyNames.com",
    };
  }

  const canonicalUrl = `https://generatefantasynames.com/${gen.slug}`;

  return {
    title: gen.title,
    description: gen.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: gen.title,
      description: gen.metaDescription,
      url: canonicalUrl,
      siteName: "GenerateFantasyNames.com",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 675,
          alt: "Generate Fantasy Names",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: gen.title,
      description: gen.metaDescription,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function GeneratorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const gen = getGeneratorBySlug(resolvedParams.slug);

  if (!gen) {
    notFound();
  }

  // Construct JSON-LD structured data
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": gen.h1,
    "url": `https://generatefantasynames.com/${gen.slug}`,
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "browserRequirements": "Requires JavaScript",
  };

  const faqSchema = gen.faqs && gen.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": gen.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <Navbar />
      <main className="flex-grow">
        <GeneratorInterface
          initialPreset={gen.generatorConfig}
          titleText={gen.h1}
          descriptionText={gen.description}
        />
        <SeoContent slug={gen.slug} />
      </main>
      <Footer />
    </>
  );
}
