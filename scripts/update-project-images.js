const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function updateProjectImages() {
  console.log("🔄 Updating project image URLs to valid WebP assets...");

  await prisma.project.updateMany({
    where: { slug: "industrial-structural-fabrication-erection-paradeep" },
    data: { coverImageUrl: "/images/hero-steel-plant.webp" },
  });

  await prisma.project.updateMany({
    where: { slug: "refinery-utility-piping-turnaround-execution" },
    data: { coverImageUrl: "/images/piping-erection-site.webp" },
  });

  await prisma.project.updateMany({
    where: { slug: "heavy-equipment-positioning-alignment" },
    data: { coverImageUrl: "/images/heavy-rigging-crane.webp" },
  });

  const allProjects = await prisma.project.findMany({
    select: { slug: true, coverImageUrl: true },
  });

  console.log("✅ Updated projects in database:");
  console.table(allProjects);
  await prisma.$disconnect();
}

updateProjectImages().catch((err) => {
  console.error("❌ Error updating project images:", err);
  process.exit(1);
});
