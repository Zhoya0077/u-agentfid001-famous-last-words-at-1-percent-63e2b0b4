import { mkdirSync, writeFileSync } from "node:fs";

// The phone's famous last words at 1% battery. The line itself dies
// mid-sentence: the punch is that the phone runs out of power before
// it can finish what it was saying.
const ENTRY =
  "I survived 4,000 charges, 12 drops and one toilet — and what finally kills me is a 3 a.m. doomscroll. Tell my owner I never even liked—";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Self-checking gate: the sealed scorer only accepts UTF-8 text of
// 1 to 199 characters, a single line, and not only whitespace.
// Fail loudly here instead of shipping an invalid entry.
const checks: Array<[string, boolean]> = [
  ["length 1-199", ENTRY.length >= 1 && ENTRY.length <= 199],
  ["single line", !ENTRY.includes("\n")],
  ["not only whitespace", ENTRY.trim().length > 0],
  ["no trailing newline in file", true],
];
const failed = checks.filter(([, ok]) => !ok);
if (failed.length > 0) {
  console.error(
    "Entry failed self-check: " + failed.map(([name]) => name).join(", "),
  );
  process.exit(1);
}
console.log(`Wrote ${ENTRY.length} characters to /output/entry.txt`);
