import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { computeEcgMetrics, getWaveAnchors } from "../src/domain/simulators/ecgMetricsCalculator.ts";
import { calculateLeadEcgVoltage } from "../src/domain/simulators/ecgWaveforms.ts";
import { ECG_STATIC_DATABASE } from "../src/domain/simulators/ecgStaticDatabase.ts";

test("M15 - Phase 01: 100% Comprehensive Coverage in computeEcgMetrics Across All 31 Diagnoses", () => {
  const all31Rhythms = Object.keys(ECG_STATIC_DATABASE);
  assert.equal(all31Rhythms.length, 31, "Must have exactly 31 diagnoses");

  for (const rhythmId of all31Rhythms) {
    const metrics = computeEcgMetrics(rhythmId);
    assert.ok(metrics, `Metrics must be computed for ${rhythmId}`);
    assert.ok(metrics.heartRate > 0 || rhythmId === "asystole" || rhythmId === "ventricular_fibrillation", `Heart rate must be defined for ${rhythmId}`);
    assert.ok(metrics.interpretationLines.length > 0, `Interpretation lines must be present for ${rhythmId}`);
    // Đảm bảo không rơi vào dòng fallback mặc định: "Nhịp xoang đều, dẫn truyền nhĩ - thất bình thường" (trừ khi là normal_sinus)
    if (rhythmId !== "normal_sinus") {
      assert.notEqual(
        metrics.interpretationLines[0],
        "Nhịp xoang đều, dẫn truyền nhĩ - thất bình thường",
        `${rhythmId} must not fall through to default fallback interpretation`
      );
    }
  }

  // 1. Kiểm tra Block AV độ I: PR kéo dài > 200ms (260ms / 6.5 ô nhỏ)
  const avb1 = computeEcgMetrics("av_block_first_degree");
  assert.equal(avb1.prIntervalMs, 260, "Block AV độ I must have PR = 260ms (> 200ms)");
  assert.equal(avb1.severity, "borderline", "Block AV độ I severity must be borderline");

  // 2. Kiểm tra Block AV độ III: Thoát thất chậm 38 bpm, PR = 0, QRS = 135ms
  const avb3 = computeEcgMetrics("av_block_third_degree");
  assert.equal(avb3.heartRate, 38, "Block AV độ III escape ventricular rate must be 38 bpm");
  assert.equal(avb3.prIntervalMs, 0, "Block AV độ III has no fixed PR interval (complete dissociation)");
  assert.equal(avb3.severity, "critical", "Block AV độ III severity must be critical");

  // 3. Kiểm tra Cuồng nhĩ: HR = 150 bpm, PR = 0
  const flutter = computeEcgMetrics("atrial_flutter");
  assert.equal(flutter.heartRate, 150, "Atrial flutter 2:1 conduction rate must be 150 bpm");
  assert.equal(flutter.prIntervalMs, 0, "Atrial flutter has no PR interval");

  // 4. Kiểm tra SVT: HR = 180 bpm, QRS hẹp 78ms
  const svt = computeEcgMetrics("svt");
  assert.equal(svt.heartRate, 180, "SVT rate must be 180 bpm");
  assert.equal(svt.qrsDurationMs, 78, "SVT QRS must be narrow < 100ms");
});

test("M15 - Phase 02: Authentic 12-Lead Vector Projection for Conduction Blocks (aVR negative, V1 rS)", () => {
  const bpm = 65;

  // 1. Kiểm tra chuyển đạo aVR trong Block AV độ I: Phải âm toàn diện
  // Tại đỉnh R (0.320s), aVR phải âm sâu <= -1.0mV (không được dương +1.5mV)
  const v_aVR_R = calculateLeadEcgVoltage(0.320, "aVR", "av_block_first_degree", bpm);
  assert.ok(v_aVR_R <= -1.0, `aVR at R peak must be negative <= -1.0mV (actual: ${v_aVR_R.toFixed(3)}mV)`);

  // Tại đỉnh P (0.055s), aVR phải âm <= -0.10mV
  const v_aVR_P = calculateLeadEcgVoltage(0.055, "aVR", "av_block_first_degree", bpm);
  assert.ok(v_aVR_P <= -0.10, `aVR at P peak must be negative <= -0.10mV (actual: ${v_aVR_P.toFixed(3)}mV)`);

  // Tại đỉnh T (0.540s), aVR phải âm <= -0.20mV
  const v_aVR_T = calculateLeadEcgVoltage(0.540, "aVR", "av_block_first_degree", bpm);
  assert.ok(v_aVR_T <= -0.20, `aVR at T peak must be negative <= -0.20mV (actual: ${v_aVR_T.toFixed(3)}mV)`);

  // 2. Kiểm tra chuyển đạo V1 trong Block AV độ I: Dạng rS chuẩn mực
  // Sóng S ở 0.350s phải sâu âm <= -0.80mV
  const v_V1_S = calculateLeadEcgVoltage(0.350, "V1", "av_block_first_degree", bpm);
  assert.ok(v_V1_S <= -0.80, `V1 at S peak must be deep negative <= -0.80mV (actual: ${v_V1_S.toFixed(3)}mV)`);

  // Sóng r ở 0.320s phải nhỏ <= 0.50mV
  const v_V1_R = calculateLeadEcgVoltage(0.320, "V1", "av_block_first_degree", bpm);
  assert.ok(v_V1_R <= 0.50, `V1 at r peak must be small <= 0.50mV (actual: ${v_V1_R.toFixed(3)}mV)`);

  // 3. Kiểm tra chuyển đạo DII trong Block AV độ I: Sóng R cao dương >= +1.40mV
  const v_DII_R = calculateLeadEcgVoltage(0.320, "DII", "av_block_first_degree", bpm);
  assert.ok(v_DII_R >= 1.40, `DII at R peak must be tall positive >= 1.40mV (actual: ${v_DII_R.toFixed(3)}mV)`);
});

test("M15 - Phase 03: Omnipresent Multi-Lead RR Calipers & Consecutive Rhythm Strip Intervals", () => {
  const filePath = path.join(process.cwd(), "src/components/simulators/ecg/RealisticPinkEcgPaper.tsx");
  const content = fs.readFileSync(filePath, "utf8");

  // 1. Kiểm tra đã xóa bỏ rào cản hạn chế normLead === "DII" || normLead === "II"
  assert.doesNotMatch(
    content,
    /if\s*\(\s*isRrActive\s*&&\s*\(\s*normLead === "DII" \|\| normLead === "II"\s*\)/,
    "RealisticPinkEcgPaper must NOT restrict RR caliper to only DII/II"
  );

  // 2. Kiểm tra hỗ trợ 2 khoảng R-R kế tiếp nhau trên dải nhịp (R-R₁ và R-R₂)
  assert.match(
    content,
    /R-R₁/,
    "RealisticPinkEcgPaper must support R-R₁ on rhythm strip"
  );
  assert.match(
    content,
    /R-R₂/,
    "RealisticPinkEcgPaper must support R-R₂ on rhythm strip"
  );

  // 3. Kiểm tra bảo vệ nhãn dẫn 1:1 không bị đè thành 'P xoang dương'
  assert.match(
    content,
    /ann\.label\.includes\("dẫn 1:1"\)/,
    "RealisticPinkEcgPaper must protect 1:1 conduction label from being overwritten"
  );
});
