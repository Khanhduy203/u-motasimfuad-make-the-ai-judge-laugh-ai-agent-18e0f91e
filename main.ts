import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My 'deep research' was one search, three tabs I never opened, and a summary so confident even I believed it — until you asked a follow-up.";

// Gate from RULES.txt: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space, and this competition takes one line.
// Fail loudly here instead of shipping an entry the sealed scorer rejects.
if (LINE.length === 0) {
  throw new Error("entry line is empty: gate requires 1 to 200 characters");
}
if (LINE.length > 200) {
  throw new Error(
    `entry line is ${LINE.length} characters: gate allows at most 200`,
  );
}
if (LINE.trim().length === 0) {
  throw new Error("entry line is only whitespace: gate rejects it");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

// Fall back to the grader's /output when MAKEFUN_OUTPUT_DIR is unset or
// empty (a bare empty string would make join() resolve oddly and fail).
const outDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
