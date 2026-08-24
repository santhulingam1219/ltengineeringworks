import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ltengineeringworks.com";

  // Static core routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/careers",
    "/manpower",
    "/safety-quality",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic services routes
  const services = await db.service.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  });
  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic projects routes
  const projects = await db.project.findMany({
    where: { isPublished: true, deletedAt: null },
    select: { slug: true, updatedAt: true },
  });
  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic active careers routes
  const vacancies = await db.vacancy.findMany({
    where: { status: "published", deletedAt: null },
    select: { slug: true, updatedAt: true },
  });
  const vacancyRoutes = vacancies.map((v) => ({
    url: `${baseUrl}/careers/${v.slug}`,
    lastModified: v.updatedAt,
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...vacancyRoutes];
}
