#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const EXCLUDED_DIRS = new Set(['node_modules', '.next', '.git']);
const VALID_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx']);
const PATTERN = /\.defaultProps\s*=/;

let hasViolations = false;

function inspectFile(filePath) {
  const contents = fs.readFileSync(filePath, 'utf8');
  if (PATTERN.test(contents)) {
    if (!hasViolations) {
      // Print a heading before listing individual files
      console.error('Found disallowed defaultProps assignments in function components:');
    }
    hasViolations = true;
    console.error(` - ${path.relative(process.cwd(), filePath)}`);
  }
}

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.')) {
      if (entry.name === '.git') {
        continue;
      }
    }

    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name)) {
        continue;
      }
      walk(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (VALID_EXTENSIONS.has(ext)) {
        inspectFile(fullPath);
      }
    }
  }
}

walk(process.cwd());

if (hasViolations) {
  process.exit(1);
}
