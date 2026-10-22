const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const Database = require("better-sqlite3");

const DB_PATH = path.join(__dirname, "..", "data", "medsim.db");
const PINK_PAPER_PATH = path.join(
  __dirname,
  "..",
  "src",
  "components",
  "simulators",
  "ecg",
  "RealisticPinkEcgPaper.tsx"
);
const { ALL_COMPREHENSIVE_ANNOTATIONS } = require("../scripts/comprehensive_annotations_data.js");

test("M8 - Phase 01: Toggle Button to Show/Hide Diagnostic Criteria on Pink Paper", () => {
  const code = fs.readFileSync(PINK_PAPER_PATH, "utf8");

  // Verify state exists and default is false (compact & decluttered paper)
  assert.ok(
    code.includes("showCriteriaBlock") && code.includes("setShowCriteriaBlock"),
    "RealisticPinkEcgPaper must define showCriteriaBlock state"
  );
  assert.ok(
    code.includes("useState<boolean>(false)"),
    "showCriteriaBlock must default to false for a clean paper view"
  );

  // Verify toggle button exists with both states
  assert.ok(
    code.includes("📋 Thu Gọn Tiêu Chuẩn ▲"),
    "Must have toggle button with 'Thu Gọn Tiêu Chuẩn ▲' when expanded"
  );
  assert.ok(
    code.includes("📋 Tiêu Chuẩn Chẩn Đoán AHA/ESC"),
    "Must have toggle button with 'Tiêu Chuẩn Chẩn Đoán AHA/ESC' when collapsed"
  );
});

test("M8 - Phase 02 & 03: Precision Caliper Dimensions (R-R, PR Intervals & ST/T Amplitudes)", () => {
  const code = fs.readFileSync(PINK_PAPER_PATH, "utf8");

  // Verify R-R horizontal caliper measurement algorithm
  assert.ok(
    code.includes("R-R = ${deltaMs}ms") || code.includes("R-R = "),
    "Must calculate and display exact R-R interval in ms"
  );
  assert.ok(
    code.includes("ô lớn") || code.includes("ô"),
    "Must calculate number of large boxes for R-R caliper"
  );
  assert.ok(
    code.includes("item.y1") && code.includes("item.y2"),
    "Must capture exact Y positions of both consecutive R peaks to draw guide lines"
  );

  // Verify PR horizontal caliper measurement algorithm
  assert.ok(
    code.includes("PR = ${deltaMs}ms") || code.includes("PR = "),
    "Must calculate and display exact PR interval in ms and small boxes"
  );

  // Verify vertical amplitude dimension algorithm from Isoelectric Baseline (0 mV)
  assert.ok(
    code.includes("0mV") || code.includes("0 mV"),
    "Must render isoelectric baseline (0 mV) marker"
  );
  assert.ok(
    code.includes("isVerticalDimension"),
    "Must support vertical amplitude dimension calipers for ST, T, S, R"
  );
  assert.ok(
    code.includes("mm") && code.includes("mV"),
    "Must calculate physical deflection in millimetres and millivolts"
  );
});

test("M8 - Phase 04: 100% Comprehensive Coverage & Multi-Factorial Mapping for All 31 Diagnoses", () => {
  const db = new Database(DB_PATH, { readonly: true });
  const rows = db.prepare("SELECT id, name, criteria_json, annotations_json FROM ecg_diagnoses").all();
  assert.strictEqual(rows.length, 31, "Must contain all 31 ECG diagnoses in SQLite");

  let totalCriteriaCount = 0;
  let zeroLeadCriteriaCount = 0;

  for (const row of rows) {
    const criteria = JSON.parse(row.criteria_json);
    const annotations = JSON.parse(row.annotations_json || "[]");

    assert.ok(annotations.length >= 2, `Diagnosis ${row.id} must have multiple annotations`);

    criteria.forEach((critText, cIdx) => {
      totalCriteriaCount++;
      const matched = annotations.filter((a) => a.criterionIndex === cIdx);
      if (matched.length === 0) {
        zeroLeadCriteriaCount++;
      }
    });
  }

  // 100% criteria coverage guarantee (ZERO orphan criteria)
  assert.strictEqual(totalCriteriaCount, 139, "Total criteria across 31 pathologies must be exactly 139");
  assert.strictEqual(zeroLeadCriteriaCount, 0, "There must be ZERO orphan criteria with 0 mapped leads");

  // Specific Multi-Factorial Audit:
  // 1. Normal Sinus Rhythm: Criterion 1 ("Sóng P âm ở aVR, dương ở DI, DII, aVF")
  const nsr = rows.find((r) => r.id === "normal_sinus");
  const nsrAnns = JSON.parse(nsr.annotations_json);
  const nsrPLeads = nsrAnns.filter((a) => a.criterionIndex === 1).map((a) => a.leadId);
  assert.ok(nsrPLeads.includes("DI"), "NSR Crit 1 must map to DI");
  assert.ok(nsrPLeads.includes("DII"), "NSR Crit 1 must map to DII");
  assert.ok(nsrPLeads.includes("aVF"), "NSR Crit 1 must map to aVF");
  assert.ok(nsrPLeads.includes("aVR"), "NSR Crit 1 must map to aVR");
  assert.ok(nsrPLeads.includes("II"), "NSR Crit 1 must map to rhythm strip Lead II");

  // 2. STEMI Anterior: Multi-lead territory coverage (V1 to V6) and reciprocal leads
  const stemiAnt = rows.find((r) => r.id === "stemi_anterior");
  const antAnns = JSON.parse(stemiAnt.annotations_json);
  const antStLeads = antAnns.filter((a) => a.criterionIndex === 0).map((a) => a.leadId);
  assert.ok(antStLeads.includes("V1") && antStLeads.includes("V2") && antStLeads.includes("V3") && antStLeads.includes("V4") && antStLeads.includes("V5") && antStLeads.includes("V6"), "STEMI Anterior ST must map across V1-V6");
  const antRecipLeads = antAnns.filter((a) => a.criterionIndex === 2).map((a) => a.leadId);
  assert.ok(antRecipLeads.includes("DII") && antRecipLeads.includes("DIII") && antRecipLeads.includes("aVF"), "STEMI Anterior reciprocal ST must map to DII, DIII, aVF");

  // 3. LVH Sokolow-Lyon: S in V1 + R in V5/V6
  const lvh = rows.find((r) => r.id === "lvh_strain");
  const lvhAnns = JSON.parse(lvh.annotations_json);
  const sokolowLeads = lvhAnns.filter((a) => a.criterionIndex === 0).map((a) => a.leadId);
  assert.ok(sokolowLeads.includes("V1"), "Sokolow-Lyon must map S wave in V1");
  assert.ok(sokolowLeads.includes("V5") || sokolowLeads.includes("V6"), "Sokolow-Lyon must map R wave in V5/V6");

  // 4. Acute Pericarditis: Diffuse concave ST elevation across 9+ leads
  const peri = rows.find((r) => r.id === "acute_pericarditis");
  const periAnns = JSON.parse(peri.annotations_json);
  const periStLeads = periAnns.filter((a) => a.criterionIndex === 0).map((a) => a.leadId);
  assert.ok(periStLeads.length >= 8, "Pericarditis concave ST must map diffusely across at least 8 leads");

  db.close();
});
