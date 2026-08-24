import { db } from "@/lib/db";
import { HeroSlider } from "@/components/public/HeroSlider";
import { StatisticsBar } from "@/components/public/StatisticsBar";
import { ExecutionProcess } from "@/components/public/ExecutionProcess";
import { ServicesOverview } from "@/components/public/ServicesOverview";
import { QualityMetricsVisualizer } from "@/components/public/QualityMetricsVisualizer";
import { FeaturedProjects } from "@/components/public/FeaturedProjects";
import { ManpowerRecruitmentSection } from "@/components/public/ManpowerRecruitmentSection";
import { WhyChooseUs } from "@/components/public/WhyChooseUs";
import { LatestVacancies } from "@/components/public/LatestVacancies";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { ProjectEnquiryCTA } from "@/components/public/ProjectEnquiryCTA";

export const revalidate = 60; // ISR revalidate every 60s

export default async function HomePage() {
  // Fetch dynamic featured projects from database
  const projects = await db.project.findMany({
    where: { isPublished: true, deletedAt: null },
    orderBy: [{ isFeatured: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
    take: 3,
    select: {
      id: true,
      slug: true,
      name: true,
      location: true,
      industry: true,
      status: true,
      description: true,
      manpowerDeployed: true,
      duration: true,
      coverImageUrl: true,
    },
  });

  // Fetch dynamic active vacancies from database
  const vacancies = await db.vacancy.findMany({
    where: { status: "published", deletedAt: null },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 3,
    select: {
      id: true,
      jobId: true,
      slug: true,
      title: true,
      location: true,
      openingsCount: true,
      experienceMinYears: true,
      experienceMaxYears: true,
      employmentType: true,
      salaryDisplay: true,
      accommodationProvided: true,
    },
  });

  // Fetch site settings
  const settings = await db.siteSetting.findMany({
    where: { category: "general" },
  });
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSlider />

      {/* 2. Key Statistics Bar */}
      <StatisticsBar
        completedProjects={settingsMap["stat_projects_completed"] || "30+"}
        turnover={settingsMap["stat_turnover"] || "₹100 Cr+"}
      />

      {/* 3. Engineering Disciplines & Services */}
      <ServicesOverview />

      {/* 4. 8-Step Project Execution Lifecycle */}
      <ExecutionProcess />

      {/* 5. Zero-Harm Safety & Quality Benchmarks */}
      <QualityMetricsVisualizer />

      {/* 6. Featured Projects Portfolio */}
      <FeaturedProjects projects={projects} />

      {/* 6. Manpower Recruitment & Trades Section */}
      <ManpowerRecruitmentSection />

      {/* 7. Why Choose LT Engineering Works */}
      <WhyChooseUs />

      {/* 8. Active Vacancies for Job Seekers */}
      <LatestVacancies vacancies={vacancies} />

      {/* 9. Verified Client Testimonials */}
      <TestimonialsSection />

      {/* 10. High-Conversion Project Enquiry CTA */}
      <ProjectEnquiryCTA />
    </div>
  );
}
