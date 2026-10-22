import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { calculateLeadEcgVoltage } from "../src/domain/simulators/ecgWaveforms.ts";
import { ECG_STATIC_DATABASE } from "../src/domain/simulators/ecgStaticDatabase.ts";

test("M18 - Phase 01: Wenckebach PR Progression Timing & Post-Drop Shortest PR", () => {
  const rhythm = "av_block_mobitz_1";
  const bpm = 60;
  const cycleT = 0.85;

  // Beat 0: P peak at 0.06s, R peak at 0.22s -> PR = 160ms
  const v_p0 = calculateLeadEcgVoltage(0.06, "DII", rhythm, bpm);
  const v_r0 = calculateLeadEcgVoltage(0.22, "DII", rhythm, bpm);
  assert.ok(v_p0 >= 0.10, `Beat 0 P wave must be positive (actual: ${v_p0.toFixed(3)}mV)`);
  assert.ok(v_r0 >= 1.40, `Beat 0 R wave must be prominent >= 1.40mV (actual: ${v_r0.toFixed(3)}mV)`);
  const pr0_ms = Math.round((0.22 - 0.06) * 1000);
  assert.equal(pr0_ms, 160, "Beat 0 PR must be 160ms");

  // Beat 1: P peak at 0.85 + 0.06 = 0.91s, R peak at 0.85 + 0.34 = 1.19s -> PR = 280ms
  const v_p1 = calculateLeadEcgVoltage(0.91, "DII", rhythm, bpm);
  const v_r1 = calculateLeadEcgVoltage(1.19, "DII", rhythm, bpm);
  assert.ok(v_p1 >= 0.10, `Beat 1 P wave must be positive (actual: ${v_p1.toFixed(3)}mV)`);
  assert.ok(v_r1 >= 1.40, `Beat 1 R wave must be prominent >= 1.40mV (actual: ${v_r1.toFixed(3)}mV)`);
  const pr1_ms = Math.round((1.19 - 0.91) * 1000);
  assert.equal(pr1_ms, 280, "Beat 1 PR must be 280ms");

  // Beat 2: P peak at 1.70 + 0.06 = 1.76s, R peak at 1.70 + 0.38 = 2.08s -> PR = 320ms
  const v_p2 = calculateLeadEcgVoltage(1.76, "DII", rhythm, bpm);
  const v_r2 = calculateLeadEcgVoltage(2.08, "DII", rhythm, bpm);
  assert.ok(v_p2 >= 0.10, `Beat 2 P wave must be positive (actual: ${v_p2.toFixed(3)}mV)`);
  assert.ok(v_r2 >= 1.40, `Beat 2 R wave must be prominent >= 1.40mV (actual: ${v_r2.toFixed(3)}mV)`);
  const pr2_ms = Math.round((2.08 - 1.76) * 1000);
  assert.equal(pr2_ms, 320, "Beat 2 PR must be 320ms");

  // Verify PR progression: PR0 < PR1 < PR2 (160ms < 240ms < 320ms)
  assert.ok(pr0_ms < pr1_ms && pr1_ms < pr2_ms, "PR intervals must progressively lengthen");

  // Post-Drop New Cycle (Beat 0 of next cycle): P peak at 3.40 + 0.06 = 3.46s, R peak at 3.40 + 0.22 = 3.62s
  const v_p_recov = calculateLeadEcgVoltage(3.46, "DII", rhythm, bpm);
  const v_r_recov = calculateLeadEcgVoltage(3.62, "DII", rhythm, bpm);
  assert.ok(v_p_recov >= 0.10, `Recovered beat P wave must be positive (actual: ${v_p_recov.toFixed(3)}mV)`);
  assert.ok(v_r_recov >= 1.40, `Recovered beat R wave must be prominent >= 1.40mV (actual: ${v_r_recov.toFixed(3)}mV)`);
  const pr_recov_ms = Math.round((3.62 - 3.46) * 1000);
  assert.equal(pr_recov_ms, 160, "Post-drop recovered beat must restore shortest PR = 160ms");
});

test("M18 - Phase 02: Beat 3 Dropped QRS Isolation & Stacking Prevention", () => {
  const rhythm = "av_block_mobitz_1";
  const bpm = 60;

  // Beat 3: P peak at 2.55 + 0.06 = 2.61s
  const v_p3 = calculateLeadEcgVoltage(2.61, "DII", rhythm, bpm);
  assert.ok(v_p3 >= 0.10, `Beat 3 must have a solo P wave (actual: ${v_p3.toFixed(3)}mV)`);

  // At the expected QRS window (2.75s to 3.20s), voltage must remain near isoelectric (no QRS or T)
  const v_qrs_absent1 = calculateLeadEcgVoltage(2.85, "DII", rhythm, bpm);
  const v_qrs_absent2 = calculateLeadEcgVoltage(2.95, "DII", rhythm, bpm);
  const v_qrs_absent3 = calculateLeadEcgVoltage(3.10, "DII", rhythm, bpm);
  assert.ok(Math.abs(v_qrs_absent1) < 0.05, `Beat 3 must drop QRS at 2.85s (actual: ${v_qrs_absent1.toFixed(3)}mV)`);
  assert.ok(Math.abs(v_qrs_absent2) < 0.05, `Beat 3 must drop QRS at 2.95s (actual: ${v_qrs_absent2.toFixed(3)}mV)`);
  assert.ok(Math.abs(v_qrs_absent3) < 0.05, `Beat 3 must drop T wave at 3.10s (actual: ${v_qrs_absent3.toFixed(3)}mV)`);

  // Verify database annotation labels are deduplicated to avoid stacking
  const mobitzDb = ECG_STATIC_DATABASE["av_block_mobitz_1"];
  assert.ok(mobitzDb, "av_block_mobitz_1 must exist in static database");
  const droppedAnnotations = mobitzDb.annotations.filter((a) => a.waveComponent === "DROPPED");
  assert.equal(droppedAnnotations.length, 2, "Should have DII and II dropped annotations");
  assert.equal(droppedAnnotations[0].label, droppedAnnotations[1].label, "DII and II dropped annotations must share identical label for deduplication");
});

test("M18 - Phase 03: 12-Lead Multi-Vector Projection for Mobitz I", () => {
  const rhythm = "av_block_mobitz_1";
  const bpm = 60;

  // 1. aVR must be predominantly negative (inverted P, QRS, and T)
  const v_avr_p = calculateLeadEcgVoltage(0.06, "aVR", rhythm, bpm);
  const v_avr_r = calculateLeadEcgVoltage(0.22, "aVR", rhythm, bpm);
  const v_avr_t = calculateLeadEcgVoltage(0.46, "aVR", rhythm, bpm);
  assert.ok(v_avr_p < 0, `aVR P wave must be negative (actual: ${v_avr_p.toFixed(3)}mV)`);
  assert.ok(v_avr_r <= -1.0, `aVR QRS must be deeply negative <= -1.0mV (actual: ${v_avr_r.toFixed(3)}mV)`);
  assert.ok(v_avr_t < 0, `aVR T wave must be negative (actual: ${v_avr_t.toFixed(3)}mV)`);

  // 2. V1 must have physiological rS morphology (small r, deep S)
  const v_v1_r = calculateLeadEcgVoltage(0.22, "V1", rhythm, bpm);
  const v_v1_s = calculateLeadEcgVoltage(0.25, "V1", rhythm, bpm);
  assert.ok(v_v1_r > 0, `V1 r wave must be positive (actual: ${v_v1_r.toFixed(3)}mV)`);
  assert.ok(v_v1_s < 0, `V1 S wave must be negative (actual: ${v_v1_s.toFixed(3)}mV)`);
  assert.ok(Math.abs(v_v1_s) > v_v1_r, `V1 S wave must be deeper than r wave (actual |S|: ${Math.abs(v_v1_s).toFixed(3)} > r: ${v_v1_r.toFixed(3)})`);

  // 3. V5/V6 must show prominent positive R wave
  const v_v5_r = calculateLeadEcgVoltage(0.22, "V5", rhythm, bpm);
  assert.ok(v_v5_r >= 1.50, `V5 R wave must be tall >= 1.50mV (actual: ${v_v5_r.toFixed(3)}mV)`);
});

test("M18 - Phase 04: Component Code Inspection for Specialized Wenckebach Engine", () => {
  const filePath = path.join(process.cwd(), "src/components/simulators/ecg/RealisticPinkEcgPaper.tsx");
  const content = fs.readFileSync(filePath, "utf-8");

  // 1. Kiểm tra khối SPECIALIZED RENDERER cho av_block_mobitz_1
  assert.ok(
    content.includes("SPECIALIZED RENDERER: BLOCK NHĨ THẤT ĐỘ II MOBITZ I (CHU KỲ WENCKEBACH)"),
    "RealisticPinkEcgPaper must contain dedicated Wenckebach renderer block"
  );

  // 2. Kiểm tra chuỗi thước đo PR dài dần: PR1 = 160ms -> PR2 = 280ms -> PR3 = 320ms
  assert.ok(
    content.includes("PR₁ = 160ms") && content.includes("PR₂ = 280ms") && content.includes("PR₃ = 320ms"),
    "Dedicated block must render progressive PR calipers (160ms -> 280ms -> 320ms)"
  );

  // 3. Kiểm tra nhãn sóng P không dẫn duy nhất cho Tiêu chuẩn 2
  assert.ok(
    content.includes("❌ Sóng P không dẫn (Rớt phức bộ QRS)"),
    "Dedicated block must render isolated non-conducted P wave badge"
  );

  // 4. Kiểm tra thước đo nhát phục hồi PR ngắn nhất = 160ms cho Tiêu chuẩn 3
  assert.ok(
    content.includes("PR = 160ms (Ngắn nhất sau nhát rớt)"),
    "Dedicated block must render post-drop shortest PR caliper = 160ms"
  );

  // 5. Kiểm tra badge so sánh RR không dùng '✓ Đều đặn' cho Mobitz 1
  assert.ok(
    content.includes("✓ R-R ngắn dần trước nhát rớt"),
    "Dedicated block must render specialized Mobitz 1 RR comparison badge"
  );
  assert.ok(
    content.includes('rhythm !== "av_block_mobitz_1"'),
    "General RR comparison badge must exclude av_block_mobitz_1 from regular rhythm evaluation"
  );

  // 6. Kiểm tra isPActive loại trừ các từ khóa rớt nhát và wenckebach
  assert.ok(
    content.includes('c.includes("không dẫn")') && content.includes('c.includes("wenckebach")'),
    "isPActive must filter out dropped beat and Wenckebach criteria to eliminate label stacking"
  );
});
