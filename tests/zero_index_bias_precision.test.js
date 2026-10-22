import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { ECG_STATIC_DATABASE } from "../src/domain/simulators/ecgStaticDatabase.ts";

test("M13 - Phase 01: Verify Elimination of Hard-coded Index Bias in RealisticPinkEcgPaper", () => {
  const filePath = path.join(process.cwd(), "src/components/simulators/ecg/RealisticPinkEcgPaper.tsx");
  const content = fs.readFileSync(filePath, "utf8");

  // Đảm bảo không còn bất kỳ dòng nào chứa hard-coded index bias: idx === 0, idx === 1, idx === 2, idx === 3
  assert.doesNotMatch(
    content,
    /idx === 0\s*\|\|\s*idx === 1/,
    "RealisticPinkEcgPaper must NOT contain 'idx === 0 || idx === 1' hardcoded index bias"
  );
  assert.doesNotMatch(
    content,
    /idx === 2/,
    "RealisticPinkEcgPaper must NOT contain 'idx === 2' hardcoded index bias for P wave"
  );
  assert.doesNotMatch(
    content,
    /idx === 3/,
    "RealisticPinkEcgPaper must NOT contain 'idx === 3' hardcoded index bias for PR interval"
  );
  assert.doesNotMatch(
    content,
    /critIdx === 0\s*\|\|\s*critIdx === 1/,
    "RealisticPinkEcgPaper must NOT contain 'critIdx === 0 || critIdx === 1' in RR matcher"
  );

  // Đảm bảo có import ECG_STATIC_DATABASE
  assert.match(
    content,
    /import\s*{\s*ECG_STATIC_DATABASE\s*}\s*from\s*["']@\/domain\/simulators\/ecgStaticDatabase["']/,
    "RealisticPinkEcgPaper must import ECG_STATIC_DATABASE as Single Source of Truth"
  );
});

test("M13 - Phase 02: STEMI Inferior Exact Semantic Isolation (Testing User Screenshots 16:52)", () => {
  const stemi = ECG_STATIC_DATABASE["stemi_inferior"];
  assert.ok(stemi, "stemi_inferior must exist in ECG_STATIC_DATABASE");
  assert.equal(stemi.criteria.length, 4, "stemi_inferior has exactly 4 clinical criteria");

  // Giả lập logic kiểm tra bộ lọc ngữ nghĩa (Strict Semantic Matcher)
  const isAnnotationMatching = (ann, crit) => {
    const cLower = crit.toLowerCase();
    const wave = (ann.waveComponent || "").toUpperCase();
    const labelLower = (ann.label || "").toLowerCase();

    if (wave === "RR") {
      if (
        cLower.includes("st chênh") ||
        cLower.includes("soi gương") ||
        cLower.includes("sóng q") ||
        cLower.includes("q hoại tử") ||
        cLower.includes("sóng t") ||
        cLower.includes("t tối cấp") ||
        cLower.includes("khoảng pr") ||
        cLower.includes("sóng p")
      ) {
        return false;
      }
      return cLower.includes("tần số") || cLower.includes("nhịp điệu") || cLower.includes("r-r");
    }

    if (wave === "PR") {
      if (
        cLower.includes("st chênh") ||
        cLower.includes("soi gương") ||
        cLower.includes("sóng q") ||
        cLower.includes("q hoại tử") ||
        cLower.includes("sóng t") ||
        cLower.includes("t tối cấp")
      ) {
        return false;
      }
      return cLower.includes("khoảng pr") || cLower.includes("block av");
    }

    if (wave === "P") {
      if (
        cLower.includes("st chênh") ||
        cLower.includes("soi gương") ||
        cLower.includes("sóng q") ||
        cLower.includes("q hoại tử") ||
        cLower.includes("sóng t") ||
        cLower.includes("t tối cấp")
      ) {
        return false;
      }
      return cLower.includes("sóng p") || cLower.includes("p xoang");
    }

    if (wave === "Q") {
      return (
        cLower.includes("sóng q") ||
        cLower.includes("q hoại tử") ||
        cLower.includes("q bệnh lý") ||
        cLower.includes("q sâu")
      );
    }

    if (wave === "ST") {
      if (cLower.startsWith("sóng t") || cLower.includes("t tối cấp") || cLower.includes("t lều") || cLower.includes("t cao nhọn")) {
        return false;
      }
      const isAnnReciprocal = labelLower.includes("soi gương") || labelLower.includes("reciprocal");
      const isCritReciprocal = cLower.includes("soi gương") || cLower.includes("reciprocal");
      if (isCritReciprocal) return isAnnReciprocal;
      if (isAnnReciprocal) return false;
      return (
        cLower.includes("st chênh") ||
        cLower.includes("vòm") ||
        cLower.includes("đoạn st")
      );
    }

    if (wave === "T") {
      return (
        cLower.includes("sóng t") ||
        cLower.includes("t tối cấp") ||
        cLower.includes("t lều")
      );
    }

    return false;
  };

  // 1. TEST ẢNH 2 (User Screenshot 16:52): Bác sĩ tick Tiêu chuẩn 1: "ST chênh lên dạng vòm..."
  const crit1 = stemi.criteria[0]; // ST chênh lên...
  const activeAnn1 = stemi.annotations.filter((a) => isAnnotationMatching(a, crit1));
  
  // Xác nhận: CHỈ có ST chênh vòm, ZERO nhãn RR, ZERO nhãn P, ZERO nhãn Q
  assert.ok(activeAnn1.length >= 3, "ST chênh lên phải kích hoạt ít nhất 3 nhãn (DII, DIII, aVF)");
  assert.ok(activeAnn1.every((a) => a.waveComponent === "ST" && !a.label.includes("soi gương")));
  assert.equal(activeAnn1.filter((a) => a.waveComponent === "RR").length, 0, "Tiêu chuẩn 1 tuyệt đối KHÔNG sinh nhãn RR");
  assert.equal(activeAnn1.filter((a) => a.waveComponent === "P").length, 0, "Tiêu chuẩn 1 tuyệt đối KHÔNG sinh nhãn P");

  // 2. TEST: Bác sĩ tick Tiêu chuẩn 2: "Hình ảnh soi gương (reciprocal)..."
  const crit2 = stemi.criteria[1];
  const activeAnn2 = stemi.annotations.filter((a) => isAnnotationMatching(a, crit2));
  assert.ok(activeAnn2.length >= 2, "Soi gương phải kích hoạt DI và aVL");
  assert.ok(activeAnn2.every((a) => a.waveComponent === "ST" && a.label.includes("soi gương")));

  // 3. TEST ẢNH 1 (User Screenshot 16:52): Bác sĩ tick Tiêu chuẩn 3: "Sóng Q hoại tử..."
  const crit3 = stemi.criteria[2]; // Sóng Q hoại tử...
  const activeAnn3 = stemi.annotations.filter((a) => isAnnotationMatching(a, crit3));

  // Xác nhận: CHỈ có Sóng Q ở DIII và aVF, ZERO sóng P xoang!
  assert.equal(activeAnn3.length, 2, "Sóng Q hoại tử chỉ có đúng 2 nhãn ở DIII và aVF");
  assert.ok(activeAnn3.every((a) => a.waveComponent === "Q"), "Tất cả nhãn phải là sóng Q");
  assert.equal(activeAnn3.filter((a) => a.waveComponent === "P").length, 0, "Tiêu chuẩn 3 tuyệt đối KHÔNG sinh sóng P xoang!");
  assert.equal(activeAnn3.filter((a) => a.waveComponent === "RR").length, 0, "Tiêu chuẩn 3 tuyệt đối KHÔNG sinh nhãn RR!");

  // 4. TEST: Bác sĩ tick Tiêu chuẩn 4: "Sóng T tối cấp..."
  const crit4 = stemi.criteria[3];
  const activeAnn4 = stemi.annotations.filter((a) => isAnnotationMatching(a, crit4));
  assert.ok(activeAnn4.length >= 2, "Sóng T tối cấp phải kích hoạt ở các chuyển đạo thành dưới");
  assert.ok(activeAnn4.every((a) => a.waveComponent === "T"));
});

test("M13 - Phase 03: Coverage Across All 31 Diagnoses in Single Source of Truth", () => {
  const allKeys = Object.keys(ECG_STATIC_DATABASE);
  assert.equal(allKeys.length, 31, "ECG_STATIC_DATABASE must contain exactly 31 diagnoses");

  for (const id of allKeys) {
    const diag = ECG_STATIC_DATABASE[id];
    assert.ok(diag.criteria.length >= 3, `Diagnosis ${id} must have at least 3 clinical criteria`);
    assert.ok(diag.annotations.length >= 5, `Diagnosis ${id} must have annotations`);
  }
});
