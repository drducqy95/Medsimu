import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { calculateLeadEcgVoltage } from "../src/domain/simulators/ecgWaveforms.ts";

test("M19 - Phase 01: Invariant R-Peak Offset Precision Across Heart Rates", () => {
  // Test R-peak anchor precision across different BPMs (60, 75, 100, 120 bpm)
  const bpmCases = [
    { bpm: 60, cycleDuration: 1.0 },
    { bpm: 75, cycleDuration: 0.8 },
    { bpm: 100, cycleDuration: 0.6 },
    { bpm: 120, cycleDuration: 0.5 },
  ];

  for (const c of bpmCases) {
    for (let k = 0; k <= 2; k++) {
      const tR = k * c.cycleDuration + 0.220;
      const v_r = calculateLeadEcgVoltage(tR, "DII", "normal_sinus", c.bpm);
      assert.ok(
        v_r >= 1.40,
        `At ${c.bpm} bpm (cycle ${k}), R wave at t = ${tR.toFixed(3)}s must peak >= 1.40mV (actual: ${v_r.toFixed(3)}mV)`
      );
    }
  }
});

test("M19 - Phase 02: Polarity-Aware R-Peak Detection (Positive DII/V5 vs Inverted aVR)", () => {
  const bpm = 75;
  const tR = 0.220;

  // DII and V5 should have prominent upright R waves
  const v_dii = calculateLeadEcgVoltage(tR, "DII", "normal_sinus", bpm);
  const v_v5 = calculateLeadEcgVoltage(tR, "V5", "normal_sinus", bpm);
  assert.ok(v_dii >= 1.20, `DII R wave must be positive >= 1.20mV (actual: ${v_dii.toFixed(3)}mV)`);
  assert.ok(v_v5 >= 1.50, `V5 R wave must be positive >= 1.50mV (actual: ${v_v5.toFixed(3)}mV)`);

  // aVR should have inverted negative QRS complex
  const v_avr = calculateLeadEcgVoltage(tR, "aVR", "normal_sinus", bpm);
  assert.ok(v_avr <= -0.90, `aVR QRS must be inverted <= -0.90mV (actual: ${v_avr.toFixed(3)}mV)`);
});

test("M19 - Phase 03: Component Architecture - Linear Consecutive RR Caliper Engine", () => {
  const filePath = path.join(process.cwd(), "src/components/simulators/ecg/RealisticPinkEcgPaper.tsx");
  const content = fs.readFileSync(filePath, "utf-8");

  // 1. Kiểm tra khối LINEAR CONSECUTIVE RR CALIPER ENGINE
  assert.ok(
    content.includes("LINEAR CONSECUTIVE RR CALIPER ENGINE (FOR 12 LEADS & RHYTHM STRIP)"),
    "RealisticPinkEcgPaper must contain dedicated Linear Consecutive RR Caliper Engine"
  );

  // 2. Kiểm tra dynamic offset và cửa sổ quét mở rộng
  assert.ok(
    content.includes("dynamicRPeakOffset") && content.includes("snapToWaveExtremum(rawT, calcLead, \"auto\", 0.080, 0.0005)"),
    "Engine must use dynamicRPeakOffset and 80ms window with 0.5ms step for precise wave snapping"
  );

  // 3. Kiểm tra logic dựng thước nối tiếp R1 -> R2 và R2 -> R3
  assert.ok(
    content.includes("detectedRPeaks.length >= 3") &&
    content.includes("RR_SEG1") &&
    content.includes("RR_SEG2") &&
    content.includes("RR_COMPARISON_BADGE"),
    "Engine must build continuous chained calipers R1->R2 and R2->R3 with junction comparison badge"
  );

  // 4. Kiểm tra badge so sánh nhịp đều trên 12 chuyển đạo
  assert.ok(
    content.includes("✓ Đều: R-R₁ = R-R₂"),
    "Engine must include concise comparison badge for 12-lead cells"
  );

  // 5. Kiểm tra phòng vệ đè nhãn lặp
  assert.ok(
    content.includes('renderedLabels.add("RR_DONE")'),
    "Engine must register RR_DONE to prevent duplicate or conflicting calipers"
  );
});

test("M19 - Phase 04: Visual Pinpoint Dots & Level Alignment", () => {
  const filePath = path.join(process.cwd(), "src/components/simulators/ecg/RealisticPinkEcgPaper.tsx");
  const content = fs.readFileSync(filePath, "utf-8");

  // 1. Kiểm tra Target Pinpoint Dots trên thước kẹp khoảng
  assert.ok(
    content.includes("Target Pinpoint Dots directly at wave extremum / onset anchors"),
    "RealisticPinkEcgPaper must render Target Pinpoint Dots for horizontal interval calipers"
  );

  // 2. Kiểm tra chấm trắng ở tâm (#ffffff) và vòng ngoài theo màu thước
  assert.ok(
    content.includes('ctx.fillStyle = "#ffffff"') && content.includes("ctx.arc(item.x1, item.y1, 0.9, 0, Math.PI * 2)"),
    "Pinpoint dots must render high-precision center white dot at wave peak"
  );

  // 3. Kiểm tra thống nhất cao độ calY cho thước kẹp RR liên tiếp
  assert.ok(
    content.includes("const unifiedCalY = Math.min(...rrItems.map((it) => it.targetY))"),
    "Engine must unify calY across all consecutive RR items into a flat seamless bar"
  );
});
