const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const prisma = new PrismaClient();
const imagesDir = path.join(__dirname, "../public/images");

async function syncMedia() {
  console.log("==================================================");
  console.log("📤 SYNCING ALL IMAGES TO SUPABASE (MediaLibrary)");
  console.log("==================================================");

  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith(".webp") || f.endsWith(".png") || f.endsWith(".jpg"));
  console.log(`Found ${files.length} images in public/images/ to sync...`);

  let count = 0;

  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);
    const storagePath = `/images/${file}`;

    let dimensions = "1400x788";
    try {
      const meta = await sharp(filePath).metadata();
      dimensions = `${meta.width}x${meta.height}`;
    } catch (e) {
      // fallback
    }

    // Determine category based on filename
    let category = "general";
    let altText = "LT Engineering Works Industrial Facility";
    let caption = "Industrial engineering operations in Paradeep, Odisha";

    if (file.includes("hero")) {
      category = "hero";
      altText = "Heavy Industrial Structural Fabrication & Erection Site";
      caption = "LT Engineering Works Command Center Operations";
    } else if (file.includes("crane") || file.includes("rigging")) {
      category = "erection";
      altText = "Heavy Crane Rigging & Structural Erection";
      caption = "Heavy lifting and crane erection at refinery site";
    } else if (file.includes("piping")) {
      category = "piping";
      altText = "Industrial Process Piping & Spool Fabrication";
      caption = "High-pressure utility piping and hydro-testing";
    } else if (file.includes("tank")) {
      category = "fabrication";
      altText = "Storage Tank & Heavy Vessel Fabrication";
      caption = "Shop and field storage tank fabrication yard";
    } else if (file.includes("workshop")) {
      category = "fabrication";
      altText = "Heavy Structural Fabrication Workshop Yard";
      caption = "Precision welding bays and overhead gantry workshop";
    } else if (file.includes("laser") || file.includes("alignment")) {
      category = "mechanical";
      altText = "Laser Rotary Shaft & Equipment Alignment";
      caption = "Optical coupling and rotary machinery alignment";
    } else if (file.includes("manpower")) {
      category = "manpower";
      altText = "Certified Industrial Skilled Workforce Crew";
      caption = "Mobilized technical tradesmen and site supervisors";
    } else if (file.includes("safety") || file.includes("toolbox")) {
      category = "safety";
      altText = "Industrial Safety Inspection & Tool-Box Talk";
      caption = "HSE compliance and zero-LTI safety protocols";
    } else if (file.includes("civil") || file.includes("foundation")) {
      category = "civil";
      altText = "Industrial Heavy Civil Foundation & Grouting";
      caption = "RCC equipment foundation and anchor bolt casting";
    } else if (file.includes("turbine")) {
      category = "equipment";
      altText = "Turbine & Heavy Equipment Positioning";
      caption = "Turbine bay equipment leveling and installation";
    } else if (file.includes("shutdown") || file.includes("turnaround")) {
      category = "turnaround";
      altText = "Petrochemical Plant Turnaround & Shutdown Maintenance";
      caption = "Emergency shutdown execution under floodlights";
    } else if (file.includes("logo")) {
      category = "logo";
      altText = "LT Engineering Works Brand Logo";
      caption = "Official Corporate Brand Identity";
    }

    // Upsert into Supabase MediaLibrary
    await prisma.mediaLibrary.upsert({
      where: { storagePath },
      update: {
        fileName: file,
        mimeType: file.endsWith(".png") ? "image/png" : "image/webp",
        fileSizeBytes: stat.size,
        dimensions,
        altText,
        caption,
        category,
      },
      create: {
        fileName: file,
        storagePath,
        fileType: "image",
        mimeType: file.endsWith(".png") ? "image/png" : "image/webp",
        fileSizeBytes: stat.size,
        dimensions,
        altText,
        caption,
        category,
        isSecure: false,
      },
    });

    count++;
    console.log(`✅ Synced to Supabase: [${category.toUpperCase()}] ${file} (${dimensions}, ${(stat.size / 1024).toFixed(1)} KB)`);
  }

  // Also verify / sync project gallery images in Supabase
  const projects = await prisma.project.findMany();
  for (const proj of projects) {
    if (proj.coverImageUrl) {
      const media = await prisma.mediaLibrary.findUnique({
        where: { storagePath: proj.coverImageUrl },
      });
      if (media) {
        const existing = await prisma.projectImage.findFirst({
          where: { projectId: proj.id, imageUrl: proj.coverImageUrl },
        });
        if (!existing) {
          await prisma.projectImage.create({
            data: {
              projectId: proj.id,
              mediaId: media.id,
              imageUrl: proj.coverImageUrl,
              caption: proj.name,
              altText: proj.name,
              isCover: true,
              displayOrder: 0,
            },
          });
          console.log(`🖼️ Linked ProjectImage to Supabase: ${proj.name} -> ${proj.coverImageUrl}`);
        }
      }
    }
  }

  const totalInSupabase = await prisma.mediaLibrary.count();
  console.log("==================================================");
  console.log(`🎉 SUCCESS: ${totalInSupabase} total media assets active in Supabase MediaLibrary!`);
  console.log("==================================================");
}

syncMedia()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
