const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const brainDir = "C:/Users/janak/.gemini/antigravity-ide/brain/b13e1ab6-18df-4ff1-8d6d-ea30b528f5d2";
const outputDir = path.join(__dirname, "../public/images");

const imagesToProcess = [
  {
    src: path.join(brainDir, "industrial_civil_foundation_1787575806287.jpg"),
    dest: path.join(outputDir, "industrial-civil-foundation-mobile.webp"),
  },
  {
    src: path.join(brainDir, "turbine_machinery_erection_1787575825737.jpg"),
    dest: path.join(outputDir, "turbine-machinery-erection-mobile.webp"),
  },
  {
    src: path.join(brainDir, "plant_maintenance_shutdown_1787575848577.jpg"),
    dest: path.join(outputDir, "plant-maintenance-shutdown-mobile.webp"),
  },
  {
    src: path.join(brainDir, "safety_inspection_odisha_1787575872322.jpg"),
    dest: path.join(outputDir, "safety-inspection-odisha-mobile.webp"),
  },
];

async function convertMobile() {
  console.log("Generating mobile-optimized portrait WebP crops...");
  for (const img of imagesToProcess) {
    if (fs.existsSync(img.src)) {
      await sharp(img.src)
        .resize({ width: 750, height: 950, fit: "cover", position: "center" })
        .webp({ quality: 80 })
        .toFile(img.dest);
      const stat = fs.statSync(img.dest);
      console.log(`✅ Mobile Crop: ${path.basename(img.dest)} (${(stat.size / 1024).toFixed(1)} KB)`);
    }
  }
}

convertMobile().catch(console.error);
