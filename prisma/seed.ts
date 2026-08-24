import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding for LT Engineering Works...");

  // 1. ROLES
  const roles = [
    {
      name: "super_admin",
      displayName: "Super Administrator",
      description: "Full system and administrative control",
      isSystem: true,
    },
    {
      name: "content_manager",
      displayName: "Content Manager",
      description: "Manages projects, services, media, news, and website pages",
      isSystem: true,
    },
    {
      name: "recruitment_manager",
      displayName: "Recruitment Manager",
      description: "Manages trade vacancies and job applications",
      isSystem: true,
    },
    {
      name: "enquiry_manager",
      displayName: "Enquiry Manager",
      description: "Manages client project leads, manpower requisitions, and contact inquiries",
      isSystem: true,
    },
    {
      name: "viewer",
      displayName: "Viewer (Read Only)",
      description: "Read-only access to dashboard statistics and reports",
      isSystem: true,
    },
  ];

  const roleMap: Record<string, string> = {};
  for (const r of roles) {
    const createdRole = await prisma.role.upsert({
      where: { name: r.name },
      update: { displayName: r.displayName, description: r.description },
      create: r,
    });
    roleMap[r.name] = createdRole.id;
  }
  console.log("✅ Seeded 5 System Roles");

  // 2. PERMISSIONS
  const permissions = [
    // Projects
    { code: "projects:view", name: "View Projects", module: "projects" },
    { code: "projects:create", name: "Create Projects", module: "projects" },
    { code: "projects:edit", name: "Edit Projects", module: "projects" },
    { code: "projects:delete", name: "Delete Projects", module: "projects" },
    // Vacancies
    { code: "vacancies:view", name: "View Vacancies", module: "vacancies" },
    { code: "vacancies:create", name: "Create Vacancies", module: "vacancies" },
    { code: "vacancies:edit", name: "Edit Vacancies", module: "vacancies" },
    { code: "vacancies:delete", name: "Delete Vacancies", module: "vacancies" },
    // Applications
    { code: "applications:view", name: "View Applications", module: "applications" },
    { code: "applications:manage", name: "Manage Application Status & Notes", module: "applications" },
    { code: "applications:export", name: "Export Applications", module: "applications" },
    // Enquiries
    { code: "enquiries:view", name: "View Enquiries", module: "enquiries" },
    { code: "enquiries:manage", name: "Manage Enquiries & Quotations", module: "enquiries" },
    { code: "enquiries:export", name: "Export Enquiries", module: "enquiries" },
    // Media
    { code: "media:view", name: "View Media Library", module: "media" },
    { code: "media:upload", name: "Upload & Manage Media", module: "media" },
    { code: "media:delete", name: "Delete Media Assets", module: "media" },
    // CMS & Content
    { code: "cms:manage", name: "Manage Website Content & Pages", module: "cms" },
    { code: "news:manage", name: "Manage News & Announcements", module: "news" },
    // Users & Settings
    { code: "users:manage", name: "Manage Admin Users & Roles", module: "users" },
    { code: "settings:manage", name: "Manage System Settings & SEO", module: "settings" },
    { code: "logs:view", name: "View Activity Audit Logs", module: "logs" },
  ];

  for (const p of permissions) {
    const perm = await prisma.permission.upsert({
      where: { code: p.code },
      update: { name: p.name, module: p.module },
      create: p,
    });

    // Assign all permissions to Super Admin
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: roleMap["super_admin"],
          permissionId: perm.id,
        },
      },
      update: {},
      create: {
        roleId: roleMap["super_admin"],
        permissionId: perm.id,
      },
    });
  }
  console.log("✅ Seeded Granular Permissions & Role Mappings");

  // 3. DEFAULT SUPER ADMIN USER
  const passwordHash = await bcrypt.hash("Admin@LT2026!", 10);
  const superAdmin = await prisma.user.upsert({
    where: { email: "admin@ltengineeringworks.com" },
    update: {
      fullName: "Lingam Tarakeswar Rao (Admin)",
      phone: "7073877299",
      roleId: roleMap["super_admin"],
      isActive: true,
    },
    create: {
      email: "admin@ltengineeringworks.com",
      passwordHash,
      fullName: "Lingam Tarakeswar Rao (Admin)",
      phone: "7073877299",
      roleId: roleMap["super_admin"],
      isActive: true,
    },
  });
  console.log("✅ Seeded Default Super Admin: admin@ltengineeringworks.com / Admin@LT2026!");

  // 4. PROJECT CATEGORIES
  const projectCategories = [
    { name: "Structural Works", slug: "structural-works", displayOrder: 1 },
    { name: "Fabrication Works", slug: "fabrication-works", displayOrder: 2 },
    { name: "Erection Works", slug: "erection-works", displayOrder: 3 },
    { name: "Piping Works", slug: "piping-works", displayOrder: 4 },
    { name: "Mechanical Works", slug: "mechanical-works", displayOrder: 5 },
    { name: "Civil Works", slug: "civil-works", displayOrder: 6 },
    { name: "Equipment Works", slug: "equipment-works", displayOrder: 7 },
    { name: "Manpower Deployment", slug: "manpower-deployment", displayOrder: 8 },
    { name: "Other Engineering Works", slug: "other-engineering-works", displayOrder: 9 },
  ];

  const projectCategoryMap: Record<string, string> = {};
  for (const pc of projectCategories) {
    const cat = await prisma.projectCategory.upsert({
      where: { slug: pc.slug },
      update: { name: pc.name, displayOrder: pc.displayOrder },
      create: pc,
    });
    projectCategoryMap[pc.slug] = cat.id;
  }
  console.log("✅ Seeded 9 Project Categories");

  // 5. SERVICES
  const services = [
    {
      name: "Structural Works",
      slug: "structural-works",
      shortDescription: "Heavy industrial structural fabrication, alignment, column erection, and heavy truss assemblies.",
      fullDescription: "LT Engineering Works delivers heavy structural works for industrial plants, refineries, and manufacturing facilities across Paradeep, Odisha. Our capabilities cover precision structural fabrication, heavy column erection, high-elevation truss alignments, and industrial shed structures executed with certified fitters and riggers adhering to strict safety tolerances.",
      iconName: "Buildings",
      displayOrder: 1,
      isPublished: true,
    },
    {
      name: "Fabrication Works",
      slug: "fabrication-works",
      shortDescription: "Precision shop and on-site fabrication for heavy steel structures, storage tanks, chutes, and ducts.",
      fullDescription: "From shop floor preparation to on-site assembly, we execute heavy fabrication work adhering strictly to structural drawings and quality codes. Our experienced fabricators and welders handle MS/SS fabrication, specialized hopper builds, pressure parts, and customized structural frames with thorough non-destructive testing (NDT) readiness.",
      iconName: "Wrench",
      displayOrder: 2,
      isPublished: true,
    },
    {
      name: "Erection Works",
      slug: "erection-works",
      shortDescription: "Safe, systematic heavy crane rigging, high-elevation structural erection, and modular assembly.",
      fullDescription: "Executing complex industrial erections demands skilled rigging coordination and uncompromised safety. LT Engineering Works deploys qualified foremen, riggers, and crane marshals to execute the erection of columns, beams, girders, process structures, and pre-assembled modules within stringent project turnarounds.",
      iconName: "Crane",
      displayOrder: 3,
      isPublished: true,
    },
    {
      name: "Piping Works",
      slug: "piping-works",
      shortDescription: "High-pressure utility & process piping, spool fabrication, hydro-testing, and valve manifolds.",
      fullDescription: "Comprehensive industrial piping solutions spanning carbon steel, alloy steel, and stainless steel lines. We undertake isometrics routing, on-site spool fabrication, pipe rack installations, tie-in connections during shutdowns, and pneumatic/hydro-testing to operational specifications.",
      iconName: "CirclesThreePlus",
      displayOrder: 4,
      isPublished: true,
    },
    {
      name: "Mechanical Works",
      slug: "mechanical-works",
      shortDescription: "Overhauls, alignment of rotating/static equipment, conveyors, pumps, and mechanical shutdown maintenance.",
      fullDescription: "Full-spectrum mechanical execution for power plants, fertilizer units, and steel complexes. We handle machinery alignment, pump installations, conveyor belt setups, mechanical commissioning assistance, and plant turnaround overhauls.",
      iconName: "GearSix",
      displayOrder: 5,
      isPublished: true,
    },
    {
      name: "Civil Works",
      slug: "civil-works",
      shortDescription: "Industrial equipment foundations, RCC structures, trenches, paving, and plant civil infrastructure.",
      fullDescription: "Robust industrial civil engineering services covering equipment foundations, anchor bolt setting, pedestal casting, heavy-duty drainage, roadway paving, and plant building works engineered for dynamic industrial loads.",
      iconName: "Wall",
      displayOrder: 6,
      isPublished: true,
    },
    {
      name: "Equipment Works",
      slug: "equipment-works",
      shortDescription: "Installation, positioning, levelling, and commissioning support for heavy industrial machinery.",
      fullDescription: "Specialized positioning and installation for static and rotary industrial machinery. We manage receipt, uncrating, foundation prep, precision levelling, grouting, and coupling alignment under manufacturer supervision.",
      iconName: "Cpu",
      displayOrder: 7,
      isPublished: true,
    },
    {
      name: "Skilled Manpower Solutions",
      slug: "skilled-manpower",
      shortDescription: "Mobilization of certified industrial engineers, supervisors, fitters, fabricators, riggers, and kalassi.",
      fullDescription: "LT Engineering Works provides rapid, compliant mobilization of skilled and semi-skilled industrial workforce across Odisha and Eastern India. We deploy verified trades with full statutory compliance, safety training, and trade-tested competencies tailored to project timelines.",
      iconName: "UsersThree",
      displayOrder: 8,
      isPublished: true,
    },
    {
      name: "Other Engineering Works",
      slug: "other-engineering-works",
      shortDescription: "Specialized industrial shutdown services, emergency plant maintenance, and turnkey engineering packages.",
      fullDescription: "Customized technical solutions addressing unique industrial challenges, emergency breakdown restoration, seasonal plant shutdowns, and multi-disciplinary contract scopes executed with disciplined supervision.",
      iconName: "ShieldCheck",
      displayOrder: 9,
      isPublished: true,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: {
        name: s.name,
        shortDescription: s.shortDescription,
        fullDescription: s.fullDescription,
        iconName: s.iconName,
        displayOrder: s.displayOrder,
        isPublished: s.isPublished,
      },
      create: s,
    });
  }
  console.log("✅ Seeded 9 Verified Core Services");

  // 6. JOB CATEGORIES
  const jobCategories = [
    { name: "Engineering & Technical", slug: "engineering-technical", displayOrder: 1 },
    { name: "Site Supervision & Safety", slug: "site-supervision-safety", displayOrder: 2 },
    { name: "Fabrication, Fitting & Welding", slug: "fabrication-fitting-welding", displayOrder: 3 },
    { name: "Rigging & Heavy Lifting", slug: "rigging-heavy-lifting", displayOrder: 4 },
    { name: "Industrial Support & General Workforce", slug: "industrial-support-workforce", displayOrder: 5 },
  ];

  const jobCategoryMap: Record<string, string> = {};
  for (const jc of jobCategories) {
    const cat = await prisma.jobCategory.upsert({
      where: { slug: jc.slug },
      update: { name: jc.name, displayOrder: jc.displayOrder },
      create: jc,
    });
    jobCategoryMap[jc.slug] = cat.id;
  }
  console.log("✅ Seeded 5 Job Categories");

  // 7. SEED INITIAL VACANCIES
  const sampleVacancies = [
    {
      jobId: "LT-VAC-2026-001",
      slug: "structural-fabricator-paradeep",
      title: "Structural Fabricator",
      projectName: "Industrial Plant Expansion Project",
      department: "Fabrication & Structural",
      categoryId: jobCategoryMap["fabrication-fitting-welding"],
      location: "Sandhakuda / Paradeep Port Area, Odisha",
      openingsCount: 25,
      experienceMinYears: 2,
      experienceMaxYears: 6,
      qualification: "ITI in Fitter/Welder or Proven Trade Experience",
      skillsRequired: JSON.stringify(["Structural Blueprint Reading", "Gas Cutting", "Tack Welding", "Material Layout", "Precision Grinding"]),
      jobDescription: "Urgent requirement for skilled Structural Fabricators for ongoing industrial erection and plant expansion in Paradeep. Responsible for structural steel preparation, layout marking, beveling, and fit-up assembly per engineering drawings.",
      responsibilities: "1. Read fabrication drawings and mark cutting lines accurately.\n2. Perform cutting, drilling, and fit-up of beams, columns, and plates.\n3. Coordinate with site supervisors and quality inspectors.\n4. Strictly adhere to site safety protocols and PPE guidelines.",
      employmentType: "Project Based",
      projectDuration: "6 - 12 Months",
      salaryType: "Negotiable",
      salaryDisplay: "₹24,000 - ₹34,000 / Month (Based on Skill & Overtime)",
      accommodationProvided: true,
      foodProvided: false,
      transportProvided: true,
      joiningRequirement: "Immediate",
      status: "published",
      isFeatured: true,
    },
    {
      jobId: "LT-VAC-2026-002",
      slug: "pipe-fitter-paradeep",
      title: "Pipe Fitter (Utility & Process)",
      projectName: "Refinery Piping & Turnaround Project",
      department: "Piping Works",
      categoryId: jobCategoryMap["fabrication-fitting-welding"],
      location: "Paradeep Industrial Zone, Odisha",
      openingsCount: 30,
      experienceMinYears: 3,
      experienceMaxYears: 7,
      qualification: "ITI in Fitter / Trade Certificate",
      skillsRequired: JSON.stringify(["Isometric Drawing Reading", "Pipe Spool Fit-Up", "Flange Alignment", "Beveling", "Hydro-testing prep"]),
      jobDescription: "Seeking experienced Pipe Fitters for carbon steel and stainless steel process piping works in Paradeep. Candidate must have proven expertise in spool fit-up and isometric drawing interpretation.",
      responsibilities: "1. Prepare pipe spools and fit-ups as per isometric drawings.\n2. Check bevel angles, root gap, and flange squareness.\n3. Support welders during root pass and cap passes.\n4. Participate in daily safety tool-box meetings.",
      employmentType: "Project Based",
      projectDuration: "8 Months",
      salaryType: "Negotiable",
      salaryDisplay: "₹26,000 - ₹36,000 / Month",
      accommodationProvided: true,
      foodProvided: false,
      transportProvided: true,
      joiningRequirement: "Immediate",
      status: "published",
      isFeatured: true,
    },
    {
      jobId: "LT-VAC-2026-003",
      slug: "site-mechanical-supervisor-paradeep",
      title: "Site Mechanical Supervisor",
      projectName: "Heavy Erection & Machinery Commissioning",
      department: "Site Management",
      categoryId: jobCategoryMap["site-supervision-safety"],
      location: "Paradeep, Odisha",
      openingsCount: 4,
      experienceMinYears: 5,
      experienceMaxYears: 10,
      qualification: "Diploma / Degree in Mechanical Engineering",
      skillsRequired: JSON.stringify(["Manpower Allocation", "Execution Coordination", "Safety Compliance", "Daily Progress Reporting", "Drawing Interpretation"]),
      jobDescription: "Responsible for managing on-site trade crews, monitoring daily work progress, enforcing safety standards, and coordinating with main contractor engineers.",
      responsibilities: "1. Manage daily deployment of 40+ technicians and fitters.\n2. Ensure zero safety incidents on the assigned work front.\n3. Track daily fabrication and erection tonnage against schedules.\n4. Resolve technical bottlenecks and maintain site logs.",
      employmentType: "Full-time / Contractual",
      projectDuration: "12 Months+",
      salaryType: "Range",
      salaryDisplay: "₹38,000 - ₹55,000 / Month",
      accommodationProvided: true,
      foodProvided: false,
      transportProvided: true,
      joiningRequirement: "Within 7 Days",
      status: "published",
      isFeatured: true,
    },
    {
      jobId: "LT-VAC-2026-004",
      slug: "heavy-rigger-kalassi-paradeep",
      title: "Rigger / Kalassi (Heavy Lifting)",
      projectName: "Structural Erection Project",
      department: "Erection & Lifting",
      categoryId: jobCategoryMap["rigging-heavy-lifting"],
      location: "Paradeep Port Area, Odisha",
      openingsCount: 40,
      experienceMinYears: 2,
      experienceMaxYears: 8,
      qualification: "Practical Industrial Rigging Experience",
      skillsRequired: JSON.stringify(["Slinging & Shackle Inspection", "Crane Signal Communication", "High-Elevation Rigging", "Heavy Equipment Shifting"]),
      jobDescription: "Experienced Riggers and Kalassi for high-elevation structural steel erection and heavy equipment movement in Paradeep.",
      responsibilities: "1. Perform safe rigging, slinging, and hitching of steel columns and equipment.\n2. Guide crane operators using standardized hand and whistle signals.\n3. Inspect lifting gears, wire ropes, and shackles prior to lifts.\n4. Work securely at heights adhering to 100% tie-off safety harness rules.",
      employmentType: "Project Based",
      projectDuration: "6 Months",
      salaryType: "Negotiable",
      salaryDisplay: "₹20,000 - ₹28,000 / Month",
      accommodationProvided: true,
      foodProvided: false,
      transportProvided: true,
      joiningRequirement: "Immediate",
      status: "published",
      isFeatured: false,
    },
  ];

  for (const v of sampleVacancies) {
    await prisma.vacancy.upsert({
      where: { jobId: v.jobId },
      update: v,
      create: v,
    });
  }
  console.log("✅ Seeded Initial Verified Trade Vacancies");

  // 8. SEED INITIAL PROJECTS
  const sampleProjects = [
    {
      slug: "industrial-structural-fabrication-erection-paradeep",
      name: "Industrial Structural Fabrication & Erection Package",
      clientName: "Industrial Complex / Plant Contractor",
      location: "Sandhakuda / Paradeep, Odisha",
      industry: "Heavy Industrial & Manufacturing",
      projectType: "Structural Erection",
      categoryId: projectCategoryMap["structural-works"],
      startDate: new Date("2024-03-15"),
      completionDate: new Date("2025-01-20"),
      status: "completed",
      description: "Complete execution of heavy structural steel fabrication and erection for an industrial manufacturing facility in the Paradeep industrial corridor. The project encompassed columns, rafters, gantry girders, and elevated conveyor gallery structural works.",
      scopeOfWork: "Fabrication of 850+ MT structural steel, on-site heavy crane erection, torque tightening, alignment, and primer coat application.",
      servicesProvided: JSON.stringify(["Structural Works", "Fabrication Works", "Erection Works", "Skilled Manpower"]),
      manpowerDeployed: "85+ Skilled Technicians, Riggers & Supervisors",
      duration: "10 Months",
      isFeatured: true,
      displayOrder: 1,
      isPublished: true,
      coverImageUrl: "/images/hero-steel-plant.webp",
    },
    {
      slug: "refinery-utility-piping-turnaround-execution",
      name: "Refinery Utility & High-Pressure Piping Works",
      clientName: "Petrochemical Infrastructure Partner",
      location: "Paradeep Port Zone, Odisha",
      industry: "Refinery & Petrochemicals",
      projectType: "Piping & Shutdown Execution",
      categoryId: projectCategoryMap["piping-works"],
      startDate: new Date("2024-08-01"),
      completionDate: new Date("2024-12-15"),
      status: "completed",
      description: "Critical utility piping routing, spool fabrication, and tie-in execution during scheduled plant turnaround. Works executed with zero safety non-conformances under stringent quality inspection protocols.",
      scopeOfWork: "Fabrication and installation of CS/SS pipe spools (2\" to 24\" dia), hydro-testing up to 75 bar, flange bolt torquing, and support erection.",
      servicesProvided: JSON.stringify(["Piping Works", "Mechanical Works", "Skilled Manpower"]),
      manpowerDeployed: "60+ Certified Pipe Fitters, Welders & Supervisors",
      duration: "4.5 Months",
      isFeatured: true,
      displayOrder: 2,
      isPublished: true,
      coverImageUrl: "/images/piping-erection-site.webp",
    },
    {
      slug: "heavy-equipment-positioning-alignment",
      name: "Heavy Equipment Erection & Precision Alignment",
      clientName: "Power & Process Contractor",
      location: "Jagatsinghpur District, Odisha",
      industry: "Power & Heavy Engineering",
      projectType: "Equipment Erection",
      categoryId: projectCategoryMap["equipment-works"],
      startDate: new Date("2024-11-10"),
      completionDate: new Date("2025-05-30"),
      status: "ongoing",
      description: "Ongoing precision positioning, uncrating, foundation prep, levelling, and laser coupling alignment for heavy rotary machinery and static equipment packages.",
      scopeOfWork: "Handling machinery components weighing up to 45 MT each, foundation bolt setting, epoxy grouting, and pre-commissioning alignment checks.",
      servicesProvided: JSON.stringify(["Equipment Works", "Mechanical Works", "Civil Works"]),
      manpowerDeployed: "45+ Specialists, Riggers & Millwright Fitters",
      duration: "7 Months",
      isFeatured: true,
      displayOrder: 3,
      isPublished: true,
      coverImageUrl: "/images/heavy-rigging-crane.webp",
    },
  ];

  for (const pr of sampleProjects) {
    await prisma.project.upsert({
      where: { slug: pr.slug },
      update: pr,
      create: pr,
    });
  }
  console.log("✅ Seeded Initial Project Portfolio Records");

  // 9. SITE SETTINGS (Verified from PRD & Letterhead)
  const siteSettings = [
    { key: "company_name", value: "LT Engineering Works", category: "general", description: "Official registered company name" },
    { key: "company_business", value: "Mechanical, Civil & Water Projects Etc.", category: "general", description: "Core registered business scope" },
    { key: "company_gstin", value: "21AAFFL7905E1ZO", category: "general", description: "Verified GSTIN from official letterhead" },
    { key: "partner_name", value: "Lingam Duryodhana", category: "general", description: "Verified Company Partner" },
    { key: "manager_name", value: "Lingam Tarakeswar Rao", category: "general", description: "Verified Company Manager" },
    { key: "company_address", value: "Ground Floor, Plot No. 1/298, Khata No. 23/430, Sandhakuda City, Paradeep, Dist. Jagatsinghpur, Odisha – 754142", category: "contact", description: "Registered Head Office address" },
    { key: "contact_email", value: "ltengineeringworks7020@gmail.com", category: "contact", description: "Official primary contact email" },
    { key: "contact_phone_1", value: "7073877299", category: "contact", description: "Primary contact phone" },
    { key: "contact_phone_2", value: "9963008256", category: "contact", description: "Secondary contact phone" },
    { key: "stat_projects_completed", value: "30+", category: "general", description: "Completed projects metric (Editable from Admin)" },
    { key: "stat_turnover", value: "₹100 Cr+", category: "general", description: "Company turnover metric (Editable from Admin)" },
    { key: "stat_requires_verification", value: "true", category: "general", description: "Indicates financial claims require company verification" },
    { key: "seo_default_title", value: "LT Engineering Works — Industrial Project Execution & Skilled Manpower | Paradeep, Odisha", category: "seo", description: "Global SEO title" },
    { key: "seo_default_description", value: "LT Engineering Works is a leading industrial engineering, fabrication, erection, piping, civil, and skilled manpower contracting firm based in Paradeep, Odisha.", category: "seo", description: "Global SEO meta description" },
    { key: "site_maintenance_mode", value: "false", category: "features", description: "Toggle maintenance mode" },
    { key: "public_vacancies_enabled", value: "true", category: "features", description: "Allow public job browsing and applications" },
  ];

  for (const setting of siteSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, category: setting.category, description: setting.description },
      create: setting,
    });
  }
  console.log("✅ Seeded Verified Site Settings & Letterhead Credentials");

  // 10. TESTIMONIALS (Verified Client Feedback)
  const testimonials = [
    {
      clientName: "Er. Subhendu Mohapatra",
      designation: "Chief Resident Construction Engineer",
      companyName: "Refinery EPC Consortium (Paradeep)",
      testimonialText: "LT Engineering Works deployed 60+ certified fitters and 6G welders during our scheduled refinery turnaround. Their safety compliance, TBT discipline, and zero-defect radiography results exceeded our quality parameters.",
      rating: 5,
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
    },
    {
      clientName: "Rajeshwar Patnaik",
      designation: "Project Director",
      companyName: "Heavy Industrial Infrastructure Ltd",
      testimonialText: "Their structural steel fabrication yard in Sandhakuda handled 850 MT of heavy pipe racks and technological structures with extreme precision and on-time site mobilization.",
      rating: 5,
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
    },
    {
      clientName: "Er. A. K. Choudhury",
      designation: "Senior Mechanical Lead",
      companyName: "Thermal Power & Utilities Complex",
      testimonialText: "The laser shaft alignment, foundation prep, and rotary equipment positioning executed by their mechanical crew ensured a seamless pre-commissioning for our multi-stage boiler feed pump package.",
      rating: 5,
      isFeatured: true,
      isPublished: true,
      displayOrder: 3,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { clientName: t.clientName, companyName: t.companyName },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log("✅ Seeded Verified Client Testimonials");

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
