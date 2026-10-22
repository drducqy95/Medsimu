import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { calculateLeadEcgVoltage } from "../src/domain/simulators/ecgWaveforms.ts";

test("M14 - Phase 01: Pathologic Q Wave and Reciprocal ST Waveform Mathematics", () => {
  const bpm = 80;
  const cycleDuration = 60 / bpm; // 0.75s

  // 1. Kiểm tra Sóng Q hoại tử ở DIII
  // Phải đạt cực tiểu âm sâu (>= 25% R = 0.275mV) tại khoảng 0.185s
  let minVDIII = 0;
  let tMinDIII = 0;
  for (let t = 0.16; t <= 0.21; t += 0.001) {
    const v = calculateLeadEcgVoltage(t, "DIII", "stemi_inferior", bpm);
    if (v < minVDIII) {
      minVDIII = v;
      tMinDIII = t;
    }
  }
  assert.ok(minVDIII <= -0.30, `Đáy sóng Q ở DIII phải sâu <= -0.30mV (thực tế: ${minVDIII.toFixed(3)}mV)`);
  assert.ok(tMinDIII >= 0.175 && tMinDIII <= 0.195, `Đáy sóng Q DIII phải nằm quanh 0.185s (thực tế: ${tMinDIII.toFixed(3)}s)`);

  // 2. Kiểm tra Sóng Q hoại tử ở aVF
  let minVaVF = 0;
  let tMinaVF = 0;
  for (let t = 0.16; t <= 0.21; t += 0.001) {
    const v = calculateLeadEcgVoltage(t, "aVF", "stemi_inferior", bpm);
    if (v < minVaVF) {
      minVaVF = v;
      tMinaVF = t;
    }
  }
  assert.ok(minVaVF <= -0.25, `Đáy sóng Q ở aVF phải sâu <= -0.25mV (thực tế: ${minVaVF.toFixed(3)}mV)`);
  assert.ok(tMinaVF >= 0.175 && tMinaVF <= 0.195, `Đáy sóng Q aVF phải nằm quanh 0.185s (thực tế: ${tMinaVF.toFixed(3)}s)`);

  // 3. Kiểm tra ST soi gương ở DI và aVL
  const vST_DI = calculateLeadEcgVoltage(0.33, "DI", "stemi_inferior", bpm);
  const vST_aVL = calculateLeadEcgVoltage(0.33, "aVL", "stemi_inferior", bpm);
  assert.ok(vST_DI <= -0.15, `ST soi gương ở DI phải chênh xuống <= -0.15mV (thực tế: ${vST_DI.toFixed(3)}mV)`);
  assert.ok(vST_aVL <= -0.20, `ST soi gương ở aVL phải chênh xuống <= -0.20mV (thực tế: ${vST_aVL.toFixed(3)}mV)`);
});

test("M14 - Phase 02: Dynamic Wave Snapping Algorithm Exactness", () => {
  const bpm = 80;

  // Thuật toán Snap cực trị
  const snapToExtremum = (tCenter, leadId, type, window = 0.035) => {
    let bestT = tCenter;
    let bestV = calculateLeadEcgVoltage(tCenter, leadId, "stemi_inferior", bpm);
    for (let t = tCenter - window; t <= tCenter + window; t += 0.001) {
      const v = calculateLeadEcgVoltage(t, leadId, "stemi_inferior", bpm);
      if (type === "min" ? v < bestV : v > bestV) {
        bestV = v;
        bestT = t;
      }
    }
    return { bestT, bestV };
  };

  // 1. Snap Sóng Q ở aVF từ mốc ước lượng 0.185s
  const snapQ_aVF = snapToExtremum(0.185, "aVF", "min", 0.030);
  assert.ok(snapQ_aVF.bestV <= -0.25, `Snap Q aVF phải bắt đúng điểm âm <= -0.25mV, không bị sóng R kéo lên dương`);

  // 2. Snap ST soi gương ở DI từ mốc ước lượng 0.330s
  const snapST_DI = snapToExtremum(0.330, "DI", "min", 0.040);
  assert.ok(snapST_DI.bestV <= -0.18, `Snap ST DI phải bắt đúng điểm cực tiểu âm sâu nhất`);

  // 3. Snap ST vòm ở DII từ mốc ước lượng 0.310s
  const snapST_DII = snapToExtremum(0.310, "DII", "max", 0.040);
  assert.ok(snapST_DII.bestV >= 0.30, `Snap ST DII phải bắt đúng đỉnh vòm ST cao nhất`);
});

test("M14 - Phase 03: Code Integration of Dynamic Wave Snapping and Pathologic Q Caliper", () => {
  const filePath = path.join(process.cwd(), "src/components/simulators/ecg/RealisticPinkEcgPaper.tsx");
  const content = fs.readFileSync(filePath, "utf8");

  // Kiểm tra sự hiện diện của snapToWaveExtremum
  assert.match(content, /const snapToWaveExtremum =/, "RealisticPinkEcgPaper must contain snapToWaveExtremum");
  assert.match(content, /ann\.waveComponent === "Q"/, "RealisticPinkEcgPaper must integrate Q wave into precision amplitude calipers");
  assert.match(content, /Sóng Q hoại tử/, "RealisticPinkEcgPaper must format Q wave pathologic dimension caliper");
});
