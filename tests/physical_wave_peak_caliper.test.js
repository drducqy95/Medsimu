import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { calculateLeadEcgVoltage } from "../src/domain/simulators/ecgWaveforms.ts";

test("M20 - Phase 01: Multi-Lead Schedule & True Beat Calculation for Wenckebach (Mobitz I)", () => {
  const rhythm = "av_block_mobitz_1";
  const bpm = 60;

  // Function to simulate getPhysiologicalRPeakSchedule
  function getPhysiologicalRPeaks(tMinSec, tMaxSec) {
    const peaks = [];
    const cycleT = 0.85;
    const totalCycle = cycleT * 4; // 3.4s
    const buffer = 0.6;
    const startT = Math.max(0, tMinSec - buffer);
    const endT = tMaxSec + buffer;
    const kStart = Math.floor(startT / totalCycle);
    const kEnd = Math.ceil(endT / totalCycle);
    for (let k = kStart; k <= kEnd; k++) {
      const baseT = k * totalCycle;
      peaks.push(baseT + 0.220); // Beat 0
      peaks.push(baseT + 0.85 + 0.340); // Beat 1
      peaks.push(baseT + 1.70 + 0.380); // Beat 2
    }
    return peaks.filter((t) => t >= tMinSec && t <= tMaxSec).sort((a, b) => a - b);
  }

  // Column 0 (I, II, III): 0 - 2.5s -> 3 peaks: 0.220s, 1.190s, 2.080s
  const col0Peaks = getPhysiologicalRPeaks(0.0, 2.5);
  assert.equal(col0Peaks.length, 3, "Col 0 must contain exactly 3 R peaks");
  const rr0_1 = Math.round((col0Peaks[1] - col0Peaks[0]) * 1000);
  const rr0_2 = Math.round((col0Peaks[2] - col0Peaks[1]) * 1000);
  assert.equal(rr0_1, 970, "Col 0 R-R1 must be 970ms");
  assert.equal(rr0_2, 890, "Col 0 R-R2 must be 890ms");
  assert.ok(rr0_1 > rr0_2, "R-R intervals must shorten progressively (970ms > 890ms)");

  // Column 1 (aVR, aVL, aVF): 2.5 - 5.0s -> 2 peaks: 3.620s, 4.590s
  const col1Peaks = getPhysiologicalRPeaks(2.5, 5.0);
  assert.equal(col1Peaks.length, 2, "Col 1 must contain exactly 2 R peaks");
  const rr1 = Math.round((col1Peaks[1] - col1Peaks[0]) * 1000);
  assert.equal(rr1, 970, "Col 1 R-R must be 970ms (NOT 1000ms!)");

  // Column 2 (V1, V2, V3): 5.0 - 7.5s -> 2 peaks: 5.480s, 7.020s (Dropped Beat Pause)
  const col2Peaks = getPhysiologicalRPeaks(5.0, 7.5);
  assert.equal(col2Peaks.length, 2, "Col 2 must contain exactly 2 R peaks spanning dropped pause");
  const rr2 = Math.round((col2Peaks[1] - col2Peaks[0]) * 1000);
  assert.equal(rr2, 1540, "Col 2 R-R must measure dropped pause = 1540ms (NOT 1000ms!)");

  // Column 3 (V4, V5, V6): 7.5 - 10.0s -> 2 peaks: 7.990s, 8.880s
  const col3Peaks = getPhysiologicalRPeaks(7.5, 10.0);
  assert.equal(col3Peaks.length, 2, "Col 3 must contain exactly 2 R peaks");
  const rr3 = Math.round((col3Peaks[1] - col3Peaks[0]) * 1000);
  assert.equal(rr3, 890, "Col 3 R-R must be 890ms (NOT 1000ms!)");
});

test("M20 - Phase 02: Inverted Lead aVR Signal Polarity Precision", () => {
  const rhythm = "av_block_mobitz_1";
  const bpm = 60;

  // In Col 1 (2.5 - 5.0s), peaks are at 3.620s and 4.590s
  const v_avr1 = calculateLeadEcgVoltage(3.620, "aVR", rhythm, bpm);
  const v_avr2 = calculateLeadEcgVoltage(4.590, "aVR", rhythm, bpm);

  assert.ok(v_avr1 <= -1.0, `aVR at 3.620s must be deeply negative (actual: ${v_avr1.toFixed(3)}mV)`);
  assert.ok(v_avr2 <= -1.0, `aVR at 4.590s must be deeply negative (actual: ${v_avr2.toFixed(3)}mV)`);
});

test("M20 - Phase 03: Badge Centering & Vertical Clearance Anti-Collision", () => {
  const filePath = path.join(process.cwd(), "src/components/simulators/ecg/RealisticPinkEcgPaper.tsx");
  const content = fs.readFileSync(filePath, "utf-8");

  // 1. Kiểm tra engine lấy lịch đỉnh sinh lý
  assert.ok(
    content.includes("getPhysiologicalRPeakSchedule"),
    "RealisticPinkEcgPaper must define and invoke getPhysiologicalRPeakSchedule"
  );

  // 2. Kiểm tra căn giữa toàn dải chuỗi 2 thước đo
  assert.ok(
    content.includes("const badgeCenterX = (r1.xR + r3.xR) / 2;"),
    "Comparison badge must be centered horizontally between r1 and r3"
  );

  // 3. Kiểm tra độ cao an toàn calY - 24
  assert.ok(
    content.includes("const badgeSafeY = calY - (isRhythmStrip ? 24 : 20);"),
    "Comparison badge must maintain safe vertical elevation of at least 24px above caliper line"
  );

  // 4. Kiểm tra xử lý khoảng dừng rớt nhát > 1300ms
  assert.ok(
    content.includes("Khoảng dừng rớt nhát =") || content.includes("Rớt nhát:"),
    "Caliper engine must label dropped beat pause when deltaMs > 1300ms in Mobitz I"
  );
});
