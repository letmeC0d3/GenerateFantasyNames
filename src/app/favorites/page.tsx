import type { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Your Saved Favorites — GenerateFantasyNames.com",
  description: "View, manage, copy, remix, and stylize your collected list of fantasy names.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Your Saved Favorites — GenerateFantasyNames.com",
    description: "View, manage, copy, remix, and stylize your collected list of fantasy names.",
    url: "https://generatefantasynames.com/favorites",
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
    title: "Your Saved Favorites — GenerateFantasyNames.com",
    description: "View, manage, copy, remix, and stylize your collected list of fantasy names.",
    images: ["/og-image.jpg"],
  },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
