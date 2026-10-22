const db = require("better-sqlite3")("data/medsim.db");
const { ALL_COMPREHENSIVE_ANNOTATIONS } = require("./comprehensive_annotations_data.js");

const updateStmt = db.prepare("UPDATE ecg_diagnoses SET annotations_json = ? WHERE id = ?");

let updatedCount = 0;
for (const [id, anns] of Object.entries(ALL_COMPREHENSIVE_ANNOTATIONS)) {
  const res = updateStmt.run(JSON.stringify(anns), id);
  if (res.changes > 0) {
    updatedCount++;
  } else {
    console.warn(`Could not update ID: ${id}`);
  }
}

console.log(`Successfully updated ${updatedCount}/31 diagnoses in data/medsim.db with comprehensive annotations!`);
