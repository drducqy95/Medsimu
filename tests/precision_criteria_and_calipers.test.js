const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const Database = require("better-sqlite3");

test("M9 - Phase 01: PR Interval Caliper Alignment & Metric Synchronization", () => {
  const code = fs.readFileSync(
    path.join(__dirname, "..", "src", "components", "simulators", "ecg", "RealisticPinkEcgPaper.tsx"),
    "utf8"
  );

  // Verify PR caliper uses metrics.prIntervalMs instead of arbitrary phase difference
  assert.ok(
    code.includes("const prSec = (metrics?.prIntervalMs || 152) / 1000;"),
    "PR interval caliper must synchronize with patient metrics.prIntervalMs"
  );

  // Verify anatomical start is P onset and end is QRS onset
  assert.ok(
    code.includes("const t1 = qrsOnsetSec - prSec; // P onset") &&
    code.includes("const t2 = qrsOnsetSec;         // QRS onset"),
    "PR caliper must accurately span from P onset to QRS onset"
  );

  // Verify vertical guide lines are passed (y1, y2)
  assert.ok(
    code.includes("y1,") && code.includes("y2,") && code.includes("displayText: labelText"),
    "PR caliper must pass vertical guide line coordinates y1 and y2"
  );
});

test("M9 - Phase 02: Full Diagnostic Criteria Context Embedded in Caliper & Waveform Labels", () => {
  const code = fs.readFileSync(
    path.join(__dirname, "..", "src", "components", "simulators", "ecg", "RealisticPinkEcgPaper.tsx"),
    "utf8"
  );

  // PR text with clinical criteria
  assert.ok(
    code.includes("Tiêu chuẩn: ${deltaMs > 200 ? \"Kéo dài > 0.20s (> 200ms)\" : deltaMs < 120 ? \"Ngắn < 0.12s (< 120ms)\" : \"Cố định 0.12s - 0.20s\"}"),
    "PR caliper must embed diagnostic criteria (normal 0.12-0.20s, prolonged, or short)"
  );

  // RR text with clinical criteria
  assert.ok(
    code.includes("Tiêu chuẩn: Đều 60 - 100 chu kỳ/phút") &&
    code.includes("Tiêu chuẩn: Loạn nhịp hoàn toàn"),
    "R-R caliper must embed diagnostic criteria (regular 60-100 or irregularly irregular)"
  );

  // ST amplitude with clinical criteria
  assert.ok(
    code.includes("Tiêu chuẩn: ST chênh vòm ≥ 1mm") &&
    code.includes("Tiêu chuẩn: ST soi gương thành dưới"),
    "ST dimension calipers must embed AHA/ESC criteria context"
  );

  // S & R amplitude with Sokolow-Lyon criteria
  assert.ok(
    code.includes("Tiêu chuẩn: Sokolow-Lyon (SV1 + RV5/V6 > 35mm)"),
    "S and R amplitude calipers must embed Sokolow-Lyon criteria context"
  );

  // P wave axis criteria
  assert.ok(
    code.includes("Tiêu chuẩn: P luôn luôn âm ở aVR") &&
    code.includes("Tiêu chuẩn: P xoang dương DI, DII, aVF"),
    "P wave badges must display axis criteria (negative in aVR, positive in DI, DII, aVF)"
  );
});

test("M9 - Phase 03: Database Cleanliness & Zero Repeated Prefix Criteria", () => {
  const dbPath = path.join(__dirname, "..", "data", "medsim.db");
  const db = new Database(dbPath);
  const rows = db.prepare("SELECT id, name, criteria_json FROM ecg_diagnoses").all();

  assert.strictEqual(rows.length, 31, "SQLite must contain 31 diagnoses");

  for (const row of rows) {
    const criteria = JSON.parse(row.criteria_json);
    assert.ok(Array.isArray(criteria) && criteria.length > 0, `${row.id} must have criteria array`);

    for (let i = 0; i < criteria.length; i++) {
      const crit = criteria[i];
      const colonIdx = crit.indexOf(":");
      if (colonIdx > 0) {
        const title = crit.slice(0, colonIdx).trim().toLowerCase();
        const desc = crit.slice(colonIdx + 1).trim().toLowerCase();
        // Check if description literally repeats the exact title at the start
        const isRepeated = desc.startsWith(title + ",");
        assert.strictEqual(
          isRepeated,
          false,
          `${row.id} criterion #${i + 1} has repeated prefix: "${crit}"`
        );
      }
    }
  }

  // Specifically check normal_sinus criterion 1 (index 1)
  const normalRow = rows.find(r => r.id === "normal_sinus");
  const normalCrits = JSON.parse(normalRow.criteria_json);
  assert.ok(
    normalCrits[1].includes("Trục sóng P bình thường"),
    "normal_sinus criterion 2 must have clean title 'Trục sóng P bình thường'"
  );
});
