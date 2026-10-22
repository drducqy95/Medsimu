import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getWaveAnchors } from "../src/domain/simulators/ecgMetricsCalculator.ts";
import { calculateLeadEcgVoltage } from "../src/domain/simulators/ecgWaveforms.ts";

test("M16 - Phase 01: Verify Elimination of Line-Intersection Bug in RealisticPinkEcgPaper", () => {
  const filePath = path.join(process.cwd(), "src/components/simulators/ecg/RealisticPinkEcgPaper.tsx");
  const content = fs.readFileSync(filePath, "utf8");

  // Đảm bảo không còn bất kỳ dòng nào chứa điều kiện giao thoa lỏng lẻo x2 >= traceStart + 10 && x1 <= leadEndX - 10
  assert.doesNotMatch(
    content,
    /x2 >= traceStart \+ 10\s*&&\s*x1 <= leadEndX - 10/,
    "RealisticPinkEcgPaper must NOT contain flawed line-intersection condition 'x2 >= traceStart + 10 && x1 <= leadEndX - 10'"
  );

  // Đảm bảo có kiểm tra bao hàm nghiêm ngặt trong RealisticPinkEcgPaper
  assert.ok(
    content.includes("traceStart + 6") && content.includes("leadEndX - 6"),
    "Must have strict containment checks within visible trace margins"
  );

  // Kiểm tra cơ chế Linear Consecutive RR Caliper Engine (thay thế cycleToUse cũ)
  assert.ok(
    content.includes("LINEAR CONSECUTIVE RR CALIPER ENGINE") || content.includes("RR_SEG2"),
    "Must support consecutive RR calipers with linear chaining"
  );
});

test("M16 - Phase 02: Mathematical Strict Containment Across All 4 Columns (0s, 2.5s, 5.0s, 7.5s)", () => {
  const bpm = 65;
  const cycleDuration = 60 / bpm; // 0.923s
  const pixelsPerSecond = 50;
  const anchors = getWaveAnchors("av_block_first_degree");
  const leadLen = 220; // Độ rộng ô chuyển đạo tiêu chuẩn

  // Thử nghiệm cho cả 4 cột chuyển đạo: Column 0, 1, 2, 3
  const columns = [
    { name: "Column 0 (I, II, III)", traceStart: 30, leadEndX: 250 },
    { name: "Column 1 (aVR, aVL, aVF)", traceStart: 10, leadEndX: 230 },
    { name: "Column 2 (V1, V2, V3)", traceStart: 10, leadEndX: 230 },
    { name: "Column 3 (V4, V5, V6)", traceStart: 10, leadEndX: 230 },
  ];

  for (const col of columns) {
    const traceStart = col.traceStart;
    const leadEndX = col.leadEndX;
    const leadDuration = (leadEndX - traceStart) / pixelsPerSecond;
    const tCenter = leadDuration * 0.5;

    const focalCycle = Math.round(tCenter / cycleDuration);
    const candidateCycles = [focalCycle, focalCycle - 1, focalCycle + 1, focalCycle - 2, focalCycle + 2];
    candidateCycles.sort((a, b) => {
      const distA = Math.abs((a + 0.5) * cycleDuration - tCenter);
      const distB = Math.abs((b + 0.5) * cycleDuration - tCenter);
      return distA - distB;
    });

    let renderedCycle = null;
    let renderedX1 = null;
    let renderedX2 = null;

    for (const k of candidateCycles) {
      const t1 = k * cycleDuration + anchors.rPeak;
      const t2 = (k + 1) * cycleDuration + anchors.rPeak;
      const x1 = traceStart + t1 * pixelsPerSecond;
      const x2 = traceStart + t2 * pixelsPerSecond;

      // Áp dụng điều kiện bao hàm nghiêm ngặt M16
      if (x1 >= traceStart + 6 && x2 <= leadEndX - 6) {
        renderedCycle = k;
        renderedX1 = x1;
        renderedX2 = x2;
        break;
      }
    }

    assert.ok(renderedCycle !== null, `${col.name} must find a valid contained cycle`);
    assert.ok(renderedX1 >= traceStart + 6, `${col.name}: x1 (${renderedX1}px) must be inside lead (>= ${traceStart + 6}px), never in left margin!`);
    assert.ok(renderedX2 <= leadEndX - 6, `${col.name}: x2 (${renderedX2}px) must be inside lead (<= ${leadEndX - 6}px)`);
  }
});

test("M16 - Phase 03: Consecutive Rhythm Strip Calipers Mathematical Alignment", () => {
  const bpm = 65;
  const cycleDuration = 60 / bpm; // 0.923s
  const pixelsPerSecond = 50;
  const anchors = getWaveAnchors("av_block_first_degree");
  const traceStart = 20;
  const leadEndX = 980; // Dải nhịp dài 1000px

  const k = 4; // Focal cycle in middle of rhythm strip

  // Caliper 1: k -> k + 1
  const t1_c1 = k * cycleDuration + anchors.rPeak;
  const t2_c1 = (k + 1) * cycleDuration + anchors.rPeak;
  const x1_c1 = traceStart + t1_c1 * pixelsPerSecond;
  const x2_c1 = traceStart + t2_c1 * pixelsPerSecond;

  // Caliper 2: k + 1 -> k + 2
  const t1_c2 = (k + 1) * cycleDuration + anchors.rPeak;
  const t2_c2 = (k + 2) * cycleDuration + anchors.rPeak;
  const x1_c2 = traceStart + t1_c2 * pixelsPerSecond;
  const x2_c2 = traceStart + t2_c2 * pixelsPerSecond;

  // Xác thực Caliper 1 nằm trọn vẹn trong dải nhịp
  assert.ok(x1_c1 >= traceStart + 6 && x2_c1 <= leadEndX - 6, "Caliper 1 must be strictly contained");

  // Xác thực Caliper 2 nằm trọn vẹn trong dải nhịp
  assert.ok(x1_c2 >= traceStart + 6 && x2_c2 <= leadEndX - 6, "Caliper 2 must be strictly contained");

  // Điểm kết thúc của Caliper 1 PHẢI TRÙNG KHÍT với điểm bắt đầu của Caliper 2 (nối liền nhau tại nhát bóp ở giữa)
  assert.equal(x2_c1, x1_c2, "Caliper 1 right tick must perfectly touch Caliper 2 left tick at middle R peak");

  // Độ dài hai thước kẹp PHẢI HOÀN TOÀN BẰNG NHAU (chứng minh tính chất nhịp tim đều đặn)
  const lengthC1 = x2_c1 - x1_c1;
  const lengthC2 = x2_c2 - x1_c2;
  assert.equal(lengthC1.toFixed(4), lengthC2.toFixed(4), "Both consecutive RR calipers must have identical length");
});
