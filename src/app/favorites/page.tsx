import type { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Your Saved Favorites — GenerateFantasyNames.com",
  description: "View, manage, copy, remix, and stylize your collected list of fantasy names.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
