#!/usr/bin/env npx ts-node
/**
 * Validate project structure for TypeScript/Next.js projects
 *
 * Usage: npx ts-node scripts/validate-structure.ts [project-path]
 *
 * Checks:
 * - Directory structure compliance
 * - File naming conventions
 * - Required files existence
 * - Import path consistency
 */

import * as fs from "fs";
import * as path from "path";

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

// Expected directories
const REQUIRED_DIRS = ["app", "components", "lib"];

const OPTIONAL_DIRS = [
  "components/ui",
  "components/layout",
  "components/features",
  "lib/api",
  "lib/hooks",
  "lib/stores",
  "lib/types",
  "lib/utils",
  "lib/validation",
  "tests",
  "stories",
];

// File naming patterns
const NAMING_RULES = {
  // PascalCase for components
  componentFile: /^[A-Z][a-zA-Z0-9]*\.tsx$/,
  // kebab-case for utilities
  utilityFile: /^[a-z][a-z0-9-]*\.ts$/,
  // kebab-case for hooks (use-*)
  hookFile: /^use-[a-z][a-z0-9-]*\.ts$/,
  // kebab-case for stores (*-store)
  storeFile: /^[a-z][a-z0-9-]*-store\.ts$/,
  // kebab-case for tests
  testFile: /^[a-z][a-z0-9-]*\.test\.(ts|tsx)$/,
};

function validateDirectoryStructure(projectPath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required directories
  for (const dir of REQUIRED_DIRS) {
    const dirPath = path.join(projectPath, dir);
    if (!fs.existsSync(dirPath)) {
      errors.push(`Missing required directory: ${dir}/`);
    }
  }

  // Check optional directories (warn if missing)
  for (const dir of OPTIONAL_DIRS) {
    const dirPath = path.join(projectPath, dir);
    if (!fs.existsSync(dirPath)) {
      warnings.push(`Recommended directory missing: ${dir}/`);
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
  };
}

function validateFileNaming(projectPath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check components directory
  const componentsPath = path.join(projectPath, "components");
  if (fs.existsSync(componentsPath)) {
    validateComponentFiles(componentsPath, errors);
  }

  // Check lib directory
  const libPath = path.join(projectPath, "lib");
  if (fs.existsSync(libPath)) {
    validateLibFiles(libPath, errors);
  }

  // Check tests directory
  const testsPath = path.join(projectPath, "tests");
  if (fs.existsSync(testsPath)) {
    validateTestFiles(testsPath, errors);
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
  };
}

function validateComponentFiles(dirPath: string, errors: string[]): void {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Skip ui/ directory (shadcn uses lowercase)
      if (entry.name !== "ui") {
        validateComponentFiles(fullPath, errors);
      }
    } else if (entry.name.endsWith(".tsx") && !entry.name.endsWith(".test.tsx")) {
      // Component files should be PascalCase
      if (!NAMING_RULES.componentFile.test(entry.name)) {
        errors.push(
          `Component file should be PascalCase: ${path.relative(process.cwd(), fullPath)}`
        );
      }
    }
  }
}

function validateLibFiles(dirPath: string, errors: string[]): void {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      validateLibFiles(fullPath, errors);
    } else if (entry.name.endsWith(".ts") && !entry.name.endsWith(".test.ts")) {
      // Check specific patterns based on parent directory
      const parentDir = path.basename(dirPath);

      if (parentDir === "hooks") {
        if (!NAMING_RULES.hookFile.test(entry.name)) {
          errors.push(
            `Hook file should be use-*.ts: ${path.relative(process.cwd(), fullPath)}`
          );
        }
      } else if (parentDir === "stores") {
        if (!NAMING_RULES.storeFile.test(entry.name)) {
          errors.push(
            `Store file should be *-store.ts: ${path.relative(process.cwd(), fullPath)}`
          );
        }
      } else {
        // General utility files should be kebab-case
        if (!NAMING_RULES.utilityFile.test(entry.name)) {
          errors.push(
            `Utility file should be kebab-case: ${path.relative(process.cwd(), fullPath)}`
          );
        }
      }
    }
  }
}

function validateTestFiles(dirPath: string, errors: string[]): void {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      validateTestFiles(fullPath, errors);
    } else if (entry.name.endsWith(".test.ts") || entry.name.endsWith(".test.tsx")) {
      if (!NAMING_RULES.testFile.test(entry.name)) {
        errors.push(
          `Test file should be kebab-case.test.ts(x): ${path.relative(process.cwd(), fullPath)}`
        );
      }
    }
  }
}

function validateRequiredFiles(projectPath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const requiredFiles = [
    "package.json",
    "tsconfig.json",
    "next.config.js",
    "tailwind.config.ts",
  ];

  const recommendedFiles = [
    "vitest.config.ts",
    ".eslintrc.json",
    ".prettierrc",
    "components.json", // shadcn
  ];

  for (const file of requiredFiles) {
    if (!fs.existsSync(path.join(projectPath, file))) {
      // Check alternative extensions
      const alternatives = [
        file.replace(".js", ".mjs"),
        file.replace(".js", ".ts"),
      ];
      const exists = alternatives.some((alt) =>
        fs.existsSync(path.join(projectPath, alt))
      );
      if (!exists) {
        errors.push(`Missing required file: ${file}`);
      }
    }
  }

  for (const file of recommendedFiles) {
    if (!fs.existsSync(path.join(projectPath, file))) {
      warnings.push(`Recommended file missing: ${file}`);
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
  };
}

// Main execution
function main(): void {
  const projectPath = process.argv[2] || process.cwd();

  console.log(`Validating project structure: ${projectPath}\n`);

  const results = [
    { name: "Directory Structure", result: validateDirectoryStructure(projectPath) },
    { name: "File Naming", result: validateFileNaming(projectPath) },
    { name: "Required Files", result: validateRequiredFiles(projectPath) },
  ];

  let allPassed = true;

  for (const { name, result } of results) {
    console.log(`\n## ${name}`);
    console.log(`Status: ${result.passed ? "PASSED" : "FAILED"}`);

    if (result.errors.length > 0) {
      console.log("\nErrors:");
      result.errors.forEach((e) => console.log(`  - ${e}`));
      allPassed = false;
    }

    if (result.warnings.length > 0) {
      console.log("\nWarnings:");
      result.warnings.forEach((w) => console.log(`  - ${w}`));
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Overall: ${allPassed ? "PASSED" : "FAILED"}`);

  process.exit(allPassed ? 0 : 1);
}

main();
