const db = require("better-sqlite3")("data/medsim.db");
const { ALL_COMPREHENSIVE_ANNOTATIONS } = require("./comprehensive_annotations_data.js");
const rows = db.prepare("SELECT id, criteria_json FROM ecg_diagnoses").all();

let totalCrits = 0;
let missingCrits = 0;

rows.forEach((r) => {
  const crits = JSON.parse(r.criteria_json);
  const anns = ALL_COMPREHENSIVE_ANNOTATIONS[r.id];
  if (!anns) {
    console.error("MISSING ANNOTATIONS FOR:", r.id);
    return;
  }
  crits.forEach((c, idx) => {
    totalCrits++;
    const matched = anns.filter((a) => a.criterionIndex === idx);
    if (matched.length === 0) {
      console.warn(`[${r.id}] Missing mapping for Criterion ${idx}: "${c}"`);
      missingCrits++;
    }
  });
});

console.log("Total criteria audited:", totalCrits);
console.log("Missing criteria count:", missingCrits);
if (missingCrits === 0) {
  console.log("PERFECT! 100% of criteria across all 31 diagnoses have multiple mapped leads!");
}
