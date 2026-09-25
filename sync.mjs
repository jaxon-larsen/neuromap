#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VAULT_DIR = "C:\\Users\\Jaxon\\Metaplanar Neuromap";
const NEUROMAP_DIR = __dirname;
const CONTENT_DIR = path.join(NEUROMAP_DIR, "content");

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const isNoPush = args.includes("--no-push");

console.log("\n=======================================================");
console.log("  METAPLANAR NEUROMAP -> CLOUD SYNC");
console.log("=======================================================");
console.log(`Vault source : ${VAULT_DIR}`);
console.log(`Content dir  : ${CONTENT_DIR}`);
if (isDryRun) console.log("Mode         : DRY RUN (no files modified)");
console.log("-------------------------------------------------------\n");

if (!fs.existsSync(VAULT_DIR)) {
  console.error(`Error: Vault directory not found at: ${VAULT_DIR}`);
  process.exit(1);
}

// 1. Recursive vault scanner
function scanDir(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    if (
      item.startsWith(".") ||
      item.startsWith("desktop.ini") ||
      item.includes(".sync-conflict") ||
      item.includes(".stversions")
    ) {
      continue;
    }
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(scanDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

const allFiles = scanDir(VAULT_DIR);
const mdFiles = allFiles.filter((f) => f.endsWith(".md"));
const mediaExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".pdf",
  ".mp4",
]);
const mediaFiles = allFiles.filter((f) =>
  mediaExtensions.has(path.extname(f).toLowerCase()),
);

// 2. Filter #exclude notes
const excludedRelPaths = [];
const excludedNames = new Set();
const publicMdFiles = [];

for (const f of mdFiles) {
  const content = fs.readFileSync(f, "utf8");
  const relPath = path.relative(VAULT_DIR, f);

  const hasInlineExclude = /#exclude\b/i.test(content);
  const hasFrontmatterTag = /tags:\s*\[.*?\bexclude\b.*?\]/i.test(content);
  const hasFrontmatterExcludeProp = /^exclude:\s*true\b/im.test(content);

  if (hasInlineExclude || hasFrontmatterTag || hasFrontmatterExcludeProp) {
    excludedRelPaths.push(relPath);
    const baseName = path.basename(f, ".md").toLowerCase();
    excludedNames.add(baseName);
    excludedNames.add(path.basename(f).toLowerCase());
  } else {
    publicMdFiles.push({ fullPath: f, relPath, content });
  }
}

console.log(`Vault Scan Results:`);
console.log(`  ✓ Public notes to sync    : ${publicMdFiles.length}`);
console.log(`  ✗ Notes with #exclude     : ${excludedRelPaths.length}`);

if (excludedRelPaths.length > 0) {
  console.log("\nExcluded files (will NOT be published):");
  for (const rel of excludedRelPaths) {
    console.log(`  - ${rel}`);
  }
}

if (isDryRun) {
  console.log("\n[Dry Run] Completed. No files staged or committed.\n");
  process.exit(0);
}

// 3. Clear existing content folder
console.log("\n[1/3] Preparing content directory...");
if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
} else {
  for (const item of fs.readdirSync(CONTENT_DIR)) {
    fs.rmSync(path.join(CONTENT_DIR, item), { recursive: true, force: true });
  }
}

// 4. Copy media files
console.log(`[2/3] Copying ${mediaFiles.length} media files...`);
for (const m of mediaFiles) {
  const rel = path.relative(VAULT_DIR, m);
  const dest = path.join(CONTENT_DIR, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(m, dest);
}

// 5. Sanitize wikilinks to excluded notes & write public notes
console.log(`[3/3] Neutralizing dead links & copying ${publicMdFiles.length} notes...`);

function sanitizeWikilinks(content, excludedNamesSet) {
  return content.replace(
    /\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g,
    (match, target, alias) => {
      const cleanTarget = target.trim();
      const baseName = path.basename(cleanTarget, ".md").toLowerCase();
      if (excludedNamesSet.has(baseName) || excludedNamesSet.has(cleanTarget.toLowerCase())) {
        return alias ? alias.trim() : cleanTarget;
      }
      return match;
    },
  );
}

let hasRootIndex = false;
for (const item of publicMdFiles) {
  const dest = path.join(CONTENT_DIR, item.relPath);
  fs.mkdirSync(path.dirname(dest), { recursive: true });

  const sanitized = sanitizeWikilinks(item.content, excludedNames);
  fs.writeFileSync(dest, sanitized, "utf8");

  if (item.relPath.toLowerCase() === "index.md") {
    hasRootIndex = true;
  }
}

// Ensure default index.md if none present
if (!hasRootIndex) {
  const defaultIndex = `---
title: Metaplanar Neuromap
---

# Metaplanar Neuromap

Welcome to my digital garden and second brain. This is an interconnected knowledge graph of study notes, mathematical models, definitions, and computer science concepts.

Use the interactive graph on the right to navigate connections, or browse by course below.

## Course Directories
- [[cs2600_1|CS 2600 — Computer Networks I]]
- [[cs3100_1-5|CS 3100 — Data Privacy & Security]]
- [[cs3240_1|CS 3240 — Discrete Mathematical Structures II]]
- [[cs3450|CS 3450 — Principles & Patterns of Software Design]]
- [[cs3520_2|CS 3520 — Database Theory]]
- [[cs3800|CS 3800 — Data Science Through Statistical Reasoning]]
- [[Qubit|CS 4390R — Quantum Computing]]
- [[Binding Time|CS 4450 — Analysis of Programming Languages]]
- [[cs4700|CS 4700 — Machine Learning I]]
- [[stat2050|STAT 2050 — Introduction to Statistical Methods]]

---
[← Return to Portfolio / Skillsbase](https://jaxon-larsen.github.io/skillsbase)
`;
  fs.writeFileSync(path.join(CONTENT_DIR, "index.md"), defaultIndex, "utf8");
}

console.log("\n✓ Content directory prepared.");

// 6. Git commit & push
if (!isNoPush) {
  console.log("\nSyncing with GitHub...");
  try {
    const branch = execSync("git branch --show-current", {
      cwd: NEUROMAP_DIR,
      encoding: "utf8",
    }).trim() || "v5";

    execSync("git add .", { cwd: NEUROMAP_DIR, stdio: "inherit" });
    const status = execSync("git status --porcelain", {
      cwd: NEUROMAP_DIR,
      encoding: "utf8",
    }).trim();

    if (status) {
      execSync('git commit -m "Sync Metaplanar Neuromap"', {
        cwd: NEUROMAP_DIR,
        stdio: "inherit",
      });
      console.log(`Pushing to remote origin ${branch}...`);
      execSync(`git push origin ${branch}`, { cwd: NEUROMAP_DIR, stdio: "inherit" });
      console.log("✓ Pushed to GitHub. Cloud build and deployment started.");
    } else {
      console.log("✓ No changes detected to commit.");
    }
  } catch (gitErr) {
    console.warn("Git sync message:", gitErr.message);
  }
} else {
  console.log("\nSkipped git push (--no-push specified).");
}

console.log("\n=======================================================");
console.log("  SYNC COMPLETE!");
console.log("=======================================================\n");
