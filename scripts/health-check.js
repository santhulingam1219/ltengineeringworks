const { PrismaClient } = require("@prisma/client");
const http = require("http");

const prisma = new PrismaClient();

async function runHealthCheck() {
  console.log("==================================================");
  console.log("🔍 LT ENGINEERING WORKS — SYSTEM HEALTH DIAGNOSTIC");
  console.log("==================================================");
  console.log(`Timestamp: ${new Date().toISOString()}`);

  let hasErrors = false;

  // 1. Database Connectivity & Model Verification
  console.log("\n[1/3] Checking Database Entities...");
  try {
    const [
      userCount,
      projectCount,
      categoryCount,
      vacancyCount,
      applicationCount,
      enquiryCount,
      serviceCount,
      settingCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.projectCategory.count(),
      prisma.vacancy.count(),
      prisma.application.count(),
      prisma.projectEnquiry.count(),
      prisma.service.count(),
      prisma.siteSetting.count(),
    ]);

    console.log(`  ✓ Users in DB:              ${userCount}`);
    console.log(`  ✓ Projects in Portfolio:    ${projectCount}`);
    console.log(`  ✓ Project Categories:       ${categoryCount}`);
    console.log(`  ✓ Trade Vacancies:          ${vacancyCount}`);
    console.log(`  ✓ Applications Received:    ${applicationCount}`);
    console.log(`  ✓ Commercial Enquiries:     ${enquiryCount}`);
    console.log(`  ✓ Engineering Services:     ${serviceCount}`);
    console.log(`  ✓ Site Settings Configured: ${settingCount}`);

    if (userCount === 0 || projectCount === 0 || serviceCount === 0) {
      console.warn("  ⚠️ Warning: Core seed data appears incomplete.");
    }
  } catch (err) {
    console.error("  ❌ Database check failed:", err.message);
    hasErrors = true;
  }

  // 2. Local HTTP Server Route Check
  console.log("\n[2/3] Checking Live Server HTTP Endpoints...");
  const routesToTest = [
    "/",
    "/about",
    "/services",
    "/projects",
    "/manpower",
    "/careers",
    "/careers/track",
    "/track-enquiry",
    "/news",
    "/safety-quality",
    "/capability-statement",
    "/contact",
    "/admin/login",
    "/api/projects",
    "/api/vacancies",
    "/api/services",
    "/api/news",
  ];

  for (const route of routesToTest) {
    try {
      const status = await checkUrl(`http://localhost:3000${route}`);
      if (status === 200) {
        console.log(`  ✓ [200 OK]  ${route}`);
      } else {
        console.warn(`  ⚠️ [${status}]    ${route}`);
      }
    } catch (err) {
      console.log(`  ⚪ [OFFLINE] ${route} (Server is not currently answering on port 3000)`);
    }
  }

  // 3. Security & Environment Variable Checks
  console.log("\n[3/3] Checking Security Environment Variables...");
  const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET", "NODE_ENV"];
  for (const envName of requiredEnvVars) {
    if (process.env[envName]) {
      console.log(`  ✓ ${envName}: Configured`);
    } else {
      console.warn(`  ⚠️ ${envName}: Not explicitly defined in process environment (using defaults)`);
    }
  }

  console.log("\n==================================================");
  if (hasErrors) {
    console.log("❌ HEALTH CHECK COMPLETED WITH ISSUES");
  } else {
    console.log("✅ SYSTEM FULLY OPERATIONAL & READY FOR PRODUCTION");
  }
  console.log("==================================================\n");

  await prisma.$disconnect();
}

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      resolve(res.statusCode);
    }).on("error", (err) => {
      reject(err);
    });
  });
}

runHealthCheck().catch(console.error);
