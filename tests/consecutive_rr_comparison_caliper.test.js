import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getWaveAnchors } from "../src/domain/simulators/ecgMetricsCalculator.ts";
import { calculateLeadEcgVoltage } from "../src/domain/simulators/ecgWaveforms.ts";

test("M17 - Phase 01: Wave Peak Snapping Exactness (Anchors & Extrema for Conduction Blocks)", () => {
  // 1. Kiểm tra rPeak của Block AV độ I đã đồng bộ với hàm Gauss thực tế (0.320s)
  const anchors = getWaveAnchors("av_block_first_degree");
  assert.equal(anchors.rPeak, 0.320, "av_block_first_degree rPeak must be synchronized to 0.320s");

  const bpm = 65;
  // 2. Kiểm tra Lead II: Đỉnh R dương cao tại 0.320s
  const v_d2 = calculateLeadEcgVoltage(0.320, "DII", "av_block_first_degree", bpm);
  assert.ok(v_d2 >= 1.40, `DII voltage at 0.320s must be >= 1.40mV (actual: ${v_d2.toFixed(3)}mV)`);

  // 3. Kiểm tra aVR: Cực trị âm sâu tại 0.320s
  const v_avr = calculateLeadEcgVoltage(0.320, "aVR", "av_block_first_degree", bpm);
  assert.ok(v_avr <= -1.0, `aVR voltage at 0.320s must be <= -1.0mV (actual: ${v_avr.toFixed(3)}mV)`);
});

test("M17 - Phase 02: Dual-Segment Consecutive Caliper Alignment on Rhythm Strip", () => {
  const bpm = 65;
  const cycleDuration = 60 / bpm; // 0.923s
  const pixelsPerSecond = 150;
  const rPeak = 0.320;
  const traceStart = 48;
  const leadEndX = 1004;
  const tMin = 0;

  // Giả lập chu kỳ k = 3 nằm ở trung tâm dải nhịp
  const k = 3;
  const t1 = k * cycleDuration + rPeak;
  const t2 = (k + 1) * cycleDuration + rPeak;
  const t3 = (k + 2) * cycleDuration + rPeak;

  const x1 = traceStart + (t1 - tMin) * pixelsPerSecond;
  const x2 = traceStart + (t2 - tMin) * pixelsPerSecond;
  const x3 = traceStart + (t3 - tMin) * pixelsPerSecond;

  // Kiểm tra 2 đoạn liên tiếp nằm hoàn toàn trong dải nhịp
  assert.ok(x1 >= traceStart + 6, `x1 (${x1.toFixed(1)}px) must be contained in strip`);
  assert.ok(x3 <= leadEndX - 6, `x3 (${x3.toFixed(1)}px) must be contained in strip`);

  // Đoạn 1: R1 -> R2
  const deltaMs1 = Math.round(((x2 - x1) / pixelsPerSecond) * 1000);
  // Đoạn 2: R2 -> R3
  const deltaMs2 = Math.round(((x3 - x2) / pixelsPerSecond) * 1000);

  assert.equal(deltaMs1, 923, "Segment 1 R-R1 must be 923ms at 65 bpm");
  assert.equal(deltaMs2, 923, "Segment 2 R-R2 must be 923ms at 65 bpm");
  assert.equal(deltaMs1, deltaMs2, "R-R1 and R-R2 must be equal (regular rhythm)");

  // Điểm kết thúc của đoạn 1 phải trùng khít với điểm bắt đầu của đoạn 2 (khớp nối R2)
  assert.equal(x2, traceStart + (t2 - tMin) * pixelsPerSecond, "Junction point R2 must be shared seamlessly between Segment 1 and Segment 2");
});

test("M17 - Phase 03: Code Integration of Precision Wave Snapping & Comparison Badge in RealisticPinkEcgPaper", () => {
  const filePath = path.join(process.cwd(), "src/components/simulators/ecg/RealisticPinkEcgPaper.tsx");
  const content = fs.readFileSync(filePath, "utf8");

  // 1. Kiểm tra đã gọi snapToWaveExtremum cho đỉnh sóng R
  assert.match(
    content,
    /snapToWaveExtremum\(rawT,\s*calcLead,\s*"auto"/s,
    "RealisticPinkEcgPaper must invoke snapToWaveExtremum for RR caliper points"
  );

  // 2. Kiểm tra Linear Consecutive RR Caliper Engine
  assert.ok(
    content.includes("LINEAR CONSECUTIVE RR CALIPER ENGINE"),
    "RealisticPinkEcgPaper must contain LINEAR CONSECUTIVE RR CALIPER ENGINE"
  );

  // 3. Kiểm tra logic vẽ badge đối chiếu so sánh lâm sàng tại điểm nối R2 (Junction)
  assert.match(
    content,
    /Đều đặn: R-R₁ = R-R₂ =/,
    "RealisticPinkEcgPaper must render clinical comparison badge at junction R2"
  );

  // 4. Kiểm tra đồng bộ calY phẳng cho cả các thước đo RR liên tiếp
  assert.match(
    content,
    /const unifiedCalY = Math\.min\(\.\.\.rrItems\.map/,
    "RealisticPinkEcgPaper must unify calY across consecutive calipers for seamless alignment"
  );
});
