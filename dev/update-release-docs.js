import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the event payload
const event = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);
const inputs = event.inputs || {};

const releaseDocsFile = path.join(__dirname, "../public/release-docs.json");

const version = (inputs.version || "").replace(/^v/, "");
const date = inputs.date || "";
const body = inputs.body || "";

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
if (fs.existsSync(releaseDocsFile)) {
  existing = JSON.parse(fs.readFileSync(releaseDocsFile, "utf8"));
}

const updated = [newEntry, ...existing];
fs.writeFileSync(releaseDocsFile, JSON.stringify(updated, null, 2));
