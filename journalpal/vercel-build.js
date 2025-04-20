import { execSync } from "child_process";

try {
  console.log("🔧 Generating Prisma Client...");
  execSync("npx prisma generate", { stdio: "inherit" });

  console.log("🏗️ Running next build...");
  execSync("next build", { stdio: "inherit" });

  console.log("✅ Build complete. Exiting cleanly.");
  process.exit(0);
} catch (err) {
  console.error("❌ Build failed:", err);
  process.exit(1);
}
