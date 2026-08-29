import type { Metadata } from "next";
import { homepageConfig } from "../data/registry";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GeneratorInterface from "../components/GeneratorInterface";
import SeoContent from "../components/SeoContent";

export const metadata: Metadata = {
  title: homepageConfig.title,
  description: homepageConfig.metaDescription,
  alternates: {
    canonical: "https://generatefantasynames.com",
  },
  openGraph: {
    title: homepageConfig.title,
    description: homepageConfig.metaDescription,
    url: "https://generatefantasynames.com",
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
    title: homepageConfig.title,
    description: homepageConfig.metaDescription,
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  // Construct JSON-LD structured data for the WebApplication
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": homepageConfig.h1,
    "url": "https://generatefantasynames.com",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "browserRequirements": "Requires JavaScript",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homepageConfig.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />
      <main className="flex-grow">
        <GeneratorInterface
          initialPreset={homepageConfig.generatorConfig}
          titleText={homepageConfig.h1}
          descriptionText={homepageConfig.description}
        />
        <SeoContent slug="" />
      </main>
      <Footer />
    </>
  );
}
