const fs = require("fs");
const path = require("path");

function backupDatabase() {
  const dbSource = path.join(__dirname, "..", "prisma", "dev.db");
  const backupDir = path.join(__dirname, "..", "backups");

  if (!fs.existsSync(dbSource)) {
    console.error("❌ Source database file not found at:", dbSource);
    process.exit(1);
  }

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupTarget = path.join(backupDir, `lt_engineering_backup_${timestamp}.db`);

  try {
    fs.copyFileSync(dbSource, backupTarget);
    const stats = fs.statSync(backupTarget);
    console.log("==================================================");
    console.log("💾 LT ENGINEERING WORKS — DATABASE BACKUP COMPLETE");
    console.log("==================================================");
    console.log(`Source: ${dbSource}`);
    console.log(`Target: ${backupTarget}`);
    console.log(`Size:   ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`Time:   ${new Date().toLocaleString()}`);
    console.log("==================================================\n");
  } catch (err) {
    console.error("❌ Database backup failed:", err);
    process.exit(1);
  }
}

backupDatabase();
