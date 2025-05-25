import { existsSync, readFileSync, writeFileSync } from "fs";

const releaseDocsFile = "release-docs.json";
const version = process.env.VERSION.replace(/^v/, "");
const date = process.env.DATE;
const body = process.env.BODY || "";

const notes = body
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => /^\[.*?\]\s*-\s*/.test(line))
  .map((line) => {
    const match = line.match(/^\[(.*?)\]\s*-\s*(.*)$/);
    if (!match) return null;
    const [, type, value] = match;
    return {
      type: type.toLowerCase(),
      value: value.trim(),
      caption: value.trim(),
    };
  })
  .filter(Boolean);

const newEntry = {
  version,
  date,
  notes,
};

let existing = [];
if (existsSync(releaseDocsFile)) {
  existing = JSON.parse(readFileSync(releaseDocsFile, "utf8"));
}

const updated = [newEntry, ...existing];
writeFileSync(releaseDocsFile, JSON.stringify(updated, null, 2));
