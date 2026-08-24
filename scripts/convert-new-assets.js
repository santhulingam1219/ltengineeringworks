const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const brainDir = "C:/Users/janak/.gemini/antigravity-ide/brain/b13e1ab6-18df-4ff1-8d6d-ea30b528f5d2";
const outputDir = path.join(__dirname, "../public/images");

const imagesToProcess = [
  {
    src: path.join(brainDir, "industrial_civil_foundation_1787575806287.jpg"),
    dest: path.join(outputDir, "industrial-civil-foundation.webp"),
  },
  {
    src: path.join(brainDir, "turbine_machinery_erection_1787575825737.jpg"),
    dest: path.join(outputDir, "turbine-machinery-erection.webp"),
  },
  {
    src: path.join(brainDir, "plant_maintenance_shutdown_1787575848577.jpg"),
    dest: path.join(outputDir, "plant-maintenance-shutdown.webp"),
  },
  {
    src: path.join(brainDir, "safety_inspection_odisha_1787575872322.jpg"),
    dest: path.join(outputDir, "safety-inspection-odisha.webp"),
  },
];

async function convertAll() {
  console.log("Starting WebP conversion for new industrial assets...");
  for (const img of imagesToProcess) {
    if (fs.existsSync(img.src)) {
      await sharp(img.src)
        .resize({ width: 1400, withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(img.dest);
      const stat = fs.statSync(img.dest);
      console.log(`✅ Converted: ${path.basename(img.dest)} (${(stat.size / 1024).toFixed(1)} KB)`);
    } else {
      console.error(`❌ Source not found: ${img.src}`);
    }
  }
  console.log("Conversion complete!");
}

convertAll().catch(console.error);
