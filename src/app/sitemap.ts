import { MetadataRoute } from "next";
import { generatorPages } from "../data/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://generatefantasynames.com";

  const mainRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/favorites`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  const generatorRoutes = generatorPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...mainRoutes, ...generatorRoutes];
}
