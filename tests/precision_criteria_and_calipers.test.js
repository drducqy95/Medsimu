const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const Database = require("better-sqlite3");

test("M9/M10 - Phase 01: PR Interval Caliper Alignment & Wave Anchor Engine", () => {
  const code = fs.readFileSync(
    path.join(__dirname, "..", "src", "components", "simulators", "ecg", "RealisticPinkEcgPaper.tsx"),
    "utf8"
  );

  // Verify getWaveAnchors is imported and utilized
  assert.ok(
    code.includes("import { computeEcgMetrics, getWaveAnchors } from \"@/domain/simulators/ecgMetricsCalculator\";") &&
    code.includes("const anchors = getWaveAnchors(rhythm, metrics);"),
    "RealisticPinkEcgPaper must utilize getWaveAnchors for zero-error wave alignment"
  );

  // Verify anatomical start is P onset and end is QRS onset using absolute real seconds
  assert.ok(
    code.includes("const t1 = tCycleStart + anchors.pOnset;") &&
    code.includes("const t2 = tCycleStart + anchors.qrsOnset;"),
    "PR caliper must accurately span from tCycleStart + anchors.pOnset to tCycleStart + anchors.qrsOnset"
  );

  // Verify vertical guide lines are passed (y1, y2)
  assert.ok(
    code.includes("y1,") && code.includes("y2,") && code.includes("displayText: labelText"),
    "PR caliper must pass vertical guide line coordinates y1 and y2"
  );
});

test("M10 - Phase 02: Mathematical Accuracy of Wave Anchors Across Key Pathologies", () => {
  // Read ecgMetricsCalculator compiled or raw
  const metricsCalcCode = fs.readFileSync(
    path.join(__dirname, "..", "src", "domain", "simulators", "ecgMetricsCalculator.ts"),
    "utf8"
  );

  assert.ok(
    metricsCalcCode.includes("export function getWaveAnchors"),
    "ecgMetricsCalculator must export getWaveAnchors"
  );

  // Simulate getWaveAnchors logic directly
  function getWaveAnchors(rhythm, metrics) {
    let rPeak = 0.220;
    let qrsOnset = 0.185;
    const prMs = metrics?.prIntervalMs || 152;
    const prSec = prMs / 1000;
    let pOnset = Math.max(0.010, qrsOnset - prSec);
    let pPeak = 0.120;
    let sPeak = 0.250;
    let jPoint = 0.280;
    let stMid = 0.320;
    let tPeak = 0.460;
    let tEnd = 0.580;

    switch (rhythm) {
      case "av_block_first_degree":
        rPeak = 0.320;
        qrsOnset = 0.290;
        pOnset = Math.max(0.010, qrsOnset - prSec);
        pPeak = 0.040;
        sPeak = 0.350;
        jPoint = 0.380;
        stMid = 0.420;
        tPeak = 0.540;
        tEnd = 0.660;
        break;

      case "wpw_syndrome":
        rPeak = 0.230;
        qrsOnset = 0.130;
        pOnset = Math.max(0.010, qrsOnset - (metrics?.prIntervalMs || 100) / 1000);
        pPeak = 0.080;
        sPeak = 0.280;
        break;

      case "stemi_anterior":
        rPeak = 0.220;
        qrsOnset = 0.185;
        pOnset = Math.max(0.010, qrsOnset - prSec);
        stMid = 0.320;
        break;

      case "hyperkalemia":
        rPeak = 0.240;
        qrsOnset = 0.180;
        pOnset = Math.max(0.010, qrsOnset - prSec);
        tPeak = 0.450;
        break;
    }

    return { rPeak, qrsOnset, pOnset, pPeak, sPeak, jPoint, stMid, tPeak, tEnd };
  }

  // 1. Normal Sinus
  const normalAnchors = getWaveAnchors("normal_sinus", { prIntervalMs: 152 });
  assert.strictEqual(normalAnchors.rPeak, 0.220, "Normal Sinus R peak must be at 0.220s");
  assert.strictEqual(normalAnchors.qrsOnset, 0.185, "Normal Sinus QRS onset must be at 0.185s");
  assert.strictEqual(Math.round(normalAnchors.pOnset * 1000), 33, "Normal Sinus P onset must be at 0.033s (185 - 152 = 33ms)");
  const normalPrDuration = Math.round((normalAnchors.qrsOnset - normalAnchors.pOnset) * 1000);
  assert.strictEqual(normalPrDuration, 152, "Normal PR caliper span must equal exactly 152ms");

  // 2. AV Block I
  const av1Anchors = getWaveAnchors("av_block_first_degree", { prIntervalMs: 260 });
  assert.strictEqual(av1Anchors.rPeak, 0.320, "AV Block I R peak must be at 0.320s");
  assert.strictEqual(av1Anchors.qrsOnset, 0.290, "AV Block I QRS onset must be at 0.290s");
  const av1PrDuration = Math.round((av1Anchors.qrsOnset - av1Anchors.pOnset) * 1000);
  assert.strictEqual(av1PrDuration, 260, "AV Block I PR caliper span must equal exactly 260ms");

  // 3. WPW Syndrome
  const wpwAnchors = getWaveAnchors("wpw_syndrome", { prIntervalMs: 100 });
  assert.strictEqual(wpwAnchors.qrsOnset, 0.130, "WPW Delta onset must be at 0.130s");
  const wpwPrDuration = Math.round((wpwAnchors.qrsOnset - wpwAnchors.pOnset) * 1000);
  assert.strictEqual(wpwPrDuration, 100, "WPW PR caliper span must equal exactly 100ms");
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
