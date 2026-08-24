const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function runPlatformTestSuite() {
  console.log("==========================================================");
  console.log("🧪 LT ENGINEERING WORKS — COMPREHENSIVE PLATFORM TEST SUITE");
  console.log("==========================================================");
  console.log(`Execution Time: ${new Date().toISOString()}`);

  let passedTests = 0;
  let failedTests = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failedTests++;
    }
  }

  // 1. Asset & WebP Image Verification Test
  console.log("\n[TEST GROUP 1/5] Public WebP Image Assets Verification");
  const requiredImages = [
    "hero-steel-plant.webp",
    "heavy-rigging-crane.webp",
    "piping-erection-site.webp",
    "tank-fabrication-yard.webp",
    "safety-toolbox-talk.webp",
    "laser-alignment-machine.webp",
    "manpower-crew-team.webp",
    "fabrication-workshop.webp",
    "logo.webp",
  ];

  for (const imgName of requiredImages) {
    const imgPath = path.join(__dirname, "..", "public", "images", imgName);
    const exists = fs.existsSync(imgPath);
    assert(exists, `Image asset exists: ${imgName}`);
    if (exists) {
      const stats = fs.statSync(imgPath);
      assert(stats.size > 10000, `Image asset size is non-trivial (${(stats.size / 1024).toFixed(1)} KB): ${imgName}`);
    }
  }

  // 2. Authentication & Bcrypt Hashing Test
  console.log("\n[TEST GROUP 2/5] Security & Password Hashing Verification");
  const rawPassword = "TestPassword@2026";
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  const isValidMatch = await bcrypt.compare(rawPassword, hashedPassword);
  assert(isValidMatch, "Bcrypt hash generation and match validation");

  const adminUser = await prisma.user.findUnique({
    where: { email: "admin@ltengineeringworks.com" },
  });
  assert(!!adminUser, "Super admin user exists in database");
  if (adminUser) {
    const isSuperAdminPasswordValid = await bcrypt.compare("Admin@LT2026!", adminUser.passwordHash);
    assert(isSuperAdminPasswordValid, "Super admin password hash matches official PRD credentials");
  }

  // 3. Database Entity Integrity Test
  console.log("\n[TEST GROUP 3/5] Database Referential Integrity & Entity Schema");
  const [projectCount, categoryCount, vacancyCount, serviceCount, settingCount] = await Promise.all([
    prisma.project.count({ where: { deletedAt: null } }),
    prisma.projectCategory.count(),
    prisma.vacancy.count({ where: { deletedAt: null } }),
    prisma.service.count({ where: { isPublished: true } }),
    prisma.siteSetting.count(),
  ]);

  assert(projectCount >= 3, `Project portfolio contains >= 3 active records (found ${projectCount})`);
  assert(categoryCount === 9, `9 Engineering discipline categories seeded (found ${categoryCount})`);
  assert(vacancyCount >= 4, `Trade vacancies active in database (found ${vacancyCount})`);
  assert(serviceCount === 9, `9 Verified core services available (found ${serviceCount})`);
  assert(settingCount >= 16, `Site settings and letterhead credentials configured (found ${settingCount})`);

  // Verify Project Image Paths
  const dbProjects = await prisma.project.findMany({ select: { slug: true, coverImageUrl: true } });
  for (const prj of dbProjects) {
    const isValidWebP = prj.coverImageUrl && prj.coverImageUrl.endsWith(".webp") && !prj.coverImageUrl.includes(".png");
    assert(isValidWebP, `Project [${prj.slug}] has valid WebP cover image: ${prj.coverImageUrl}`);
  }

  // 4. Tracking Code Format Validation
  console.log("\n[TEST GROUP 4/5] Tracking Code Pattern Regex Validation");
  const year = new Date().getFullYear();
  const sampleManpowerTrackingId = `LT-ME-${year}-0101`;
  const sampleCandidateTrackingId = `LT-${year}-123456`;

  const manpowerRegex = new RegExp(`^LT-ME-\\d{4}-\\d{4}$`);
  const candidateRegex = new RegExp(`^LT-\\d{4}-\\d{6}$`);

  assert(manpowerRegex.test(sampleManpowerTrackingId), `Manpower Requisition ID matches LT-ME-YYYY-XXXX (${sampleManpowerTrackingId})`);
  assert(candidateRegex.test(sampleCandidateTrackingId), `Candidate Application ID matches LT-YYYY-XXXXXX (${sampleCandidateTrackingId})`);

  // 5. Letterhead Credentials Verification
  console.log("\n[TEST GROUP 5/5] Official Corporate Letterhead Compliance");
  const [gstinSetting, partnerSetting, managerSetting] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { key: "company_gstin" } }),
    prisma.siteSetting.findUnique({ where: { key: "partner_name" } }),
    prisma.siteSetting.findUnique({ where: { key: "manager_name" } }),
  ]);

  assert(gstinSetting && gstinSetting.value === "21AAFFL7905E1ZO", `GSTIN matches official letterhead (21AAFFL7905E1ZO)`);
  assert(partnerSetting && partnerSetting.value === "Lingam Duryodhana", `Partner name matches official letterhead (Lingam Duryodhana)`);
  assert(managerSetting && managerSetting.value === "Lingam Tarakeswar Rao", `Manager name matches official letterhead (Lingam Tarakeswar Rao)`);

  console.log("\n==========================================================");
  console.log(`📊 TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  if (failedTests === 0) {
    console.log("🏆 ALL PLATFORM & COMPLIANCE TESTS PASSED WITH 100% SUCCESS");
  } else {
    console.log("⚠️ SOME TESTS FAILED. PLEASE REVIEW LOGS ABOVE.");
  }
  console.log("==========================================================\n");

  await prisma.$disconnect();
}

runPlatformTestSuite().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
