import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const event = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")
);
const inputs = event.inputs || {};

const releaseDocsFile = path.join(__dirname, "../public/release-docs.json");

const version = (inputs.version || "").replace(/^v/, "");
const date = inputs.date || "";
const body = inputs.body || "";

const safeBody = body.replace(/\\n/g, "\n"); // handle escaped input

// Split by "] -", then reattach "[" so we can parse `[type] - value`
const rawEntries = safeBody.split("] -").map((entry, index) => {
  return index === 0 ? entry : `[${entry.trim()}`;
});

const notes = rawEntries
  .map((line) => line.trim())
  .map((line) => {
    const match = line.match(/^\[(feature|bugfix|improvement)\]\s*-\s*(.*)$/i);
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
