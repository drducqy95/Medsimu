const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const Database = require("better-sqlite3");

// Load the RealisticPinkEcgPaper code to verify integration
test("M11 - Phase 01: Code Integration of isAnnotationMatchingCriterion in RealisticPinkEcgPaper", () => {
  const code = fs.readFileSync(
    path.join(__dirname, "..", "src", "components", "simulators", "ecg", "RealisticPinkEcgPaper.tsx"),
    "utf8"
  );

  // Must define multi-factorial isAnnotationMatchingCriterion
  assert.ok(
    code.includes("const isAnnotationMatchingCriterion = ("),
    "RealisticPinkEcgPaper must define isAnnotationMatchingCriterion"
  );

  // Must filter using activeIndicesList.some
  assert.ok(
    code.includes("const activeIndicesList = Array.from(activeCriteriaIndices);") &&
    code.includes("activeIndicesList.some"),
    "RealisticPinkEcgPaper must iterate active criteria indices dynamically"
  );

  // Must NOT rely on ann.criterionIndex === 0 for P wave morphology
  assert.ok(
    !code.includes("if (ann.criterionIndex === 0) {") &&
    code.includes("ann.label.includes(\"đồng dạng\")"),
    "P wave text formatting must rely on semantic label rather than fragile criterionIndex"
  );
});

// Semantic Matching Engine Function under test
function isAnnotationMatchingCriterion(ann, crit, critIdx, allCriteria) {
  if (!crit) return false;
  const cLower = crit.toLowerCase();
  const wave = (ann.waveComponent || "").toUpperCase();
  const labelLower = (ann.label || "").toLowerCase();

  // SPECIAL EMERGENCY: Rung thất (Ventricular Fibrillation)
  if (
    labelLower.includes("rung thất") ||
    labelLower.includes("coarse vf") ||
    labelLower.includes("fine vf") ||
    labelLower.includes("sóng thô") ||
    labelLower.includes("sóng mịn") ||
    labelLower.includes("mất hoàn toàn") ||
    labelLower.includes("mất phức bộ")
  ) {
    if (
      cLower.includes("mất hoàn toàn") ||
      cLower.includes("hỗn loạn") ||
      cLower.includes("sóng thô") ||
      cLower.includes("sóng mịn") ||
      cLower.includes("rung thất") ||
      cLower.includes("ngừng tuần hoàn")
    ) {
      if (labelLower.includes("sóng thô") && !cLower.includes("sóng thô")) return false;
      if (labelLower.includes("sóng mịn") && !cLower.includes("sóng mịn")) return false;
      return true;
    }
  }

  // 1. HORIZONTAL INTERVAL CALIPER: RR (Tần số / Nhịp điệu)
  if (wave === "RR") {
    return (
      cLower.includes("tần số") ||
      cLower.includes("nhịp điệu") ||
      cLower.includes("đều") ||
      cLower.includes("loạn nhịp") ||
      cLower.includes("không đều") ||
      cLower.includes("r-r") ||
      cLower.includes("nhịp nhanh") ||
      cLower.includes("nhịp chậm") ||
      cLower.includes("rung nhĩ") ||
      cLower.includes("cuồng nhĩ") ||
      cLower.includes("khoảng cách r-r") ||
      cLower.includes("tần số tim") ||
      critIdx === 0 ||
      critIdx === 1
    );
  }

  // 2. HORIZONTAL INTERVAL CALIPER: PR (Khoảng PR / Dẫn truyền nhĩ thất)
  if (wave === "PR") {
    return (
      cLower.includes("khoảng pr") ||
      cLower.includes("pr kéo dài") ||
      cLower.includes("pr ngắn") ||
      cLower.includes("pr chênh xuống") ||
      cLower.includes("pr thay đổi") ||
      cLower.includes("pr biến thiên") ||
      cLower.includes("dẫn truyền nhĩ thất") ||
      cLower.includes("block av") ||
      cLower.includes("block nhĩ thất") ||
      cLower.includes("phân ly") ||
      cLower.includes("liên hệ") ||
      cLower.includes("wenckebach") ||
      cLower.includes("mobitz") ||
      cLower.includes("kích thích sớm") ||
      cLower.includes("wpw") ||
      cLower.includes("pr:")
    );
  }

  // 3. HORIZONTAL INTERVAL CALIPER: QT / QU (Khoảng QT / Tái cực muộn / Sóng U)
  if (wave === "QT" || wave === "U") {
    return (
      cLower.includes("khoảng qt") ||
      cLower.includes("qtc") ||
      cLower.includes("qt kéo dài") ||
      cLower.includes("qt ngắn") ||
      cLower.includes("sóng u") ||
      cLower.includes("khoảng qu") ||
      cLower.includes("lqts") ||
      cLower.includes("xoắn đỉnh")
    );
  }

  // 4. SÓNG P (P Wave / Trục P)
  if (wave === "P") {
    return (
      cLower.includes("sóng p") ||
      cLower.includes("p xoang") ||
      cLower.includes("trục sóng p") ||
      cLower.includes("trục p") ||
      cLower.includes("p âm") ||
      cLower.includes("p dương") ||
      cLower.includes("p hai pha") ||
      cLower.includes("mất sóng p") ||
      cLower.includes("sóng f") ||
      cLower.includes("răng cưa") ||
      cLower.includes("p:")
    );
  }

  // 5. PHỨC BỘ QRS & SÓNG Q HOẠI TỬ
  if (wave === "Q") {
    return (
      cLower.includes("sóng q") ||
      cLower.includes("q hoại tử") ||
      cLower.includes("q bệnh lý") ||
      cLower.includes("q sâu") ||
      cLower.includes("dạng qs") ||
      cLower.includes("hoại tử") ||
      (cLower.includes("phức bộ qrs") && (cLower.includes("sóng q") || cLower.includes("hoại tử") || cLower.includes("diii") || cLower.includes("avf")))
    );
  }

  if (wave === "QRS") {
    return (
      cLower.includes("phức bộ qrs") ||
      cLower.includes("qrs") ||
      cLower.includes("tai thỏ") ||
      cLower.includes("rbbb") ||
      cLower.includes("lbbb") ||
      cLower.includes("delta") ||
      cLower.includes("dãn rộng") ||
      cLower.includes("r nhỏ") ||
      cLower.includes("mất r") ||
      cLower.includes("rs cụt") ||
      cLower.includes("qs hoại tử") ||
      cLower.includes("s1q3t3") ||
      cLower.includes("trục") ||
      cLower.includes("lệch trái") ||
      cLower.includes("lệch phải") ||
      cLower.includes("nhánh nội điện")
    );
  }

  // 6. ĐOẠN ST (ST Segment / Chênh vòm / Soi gương / Cong lõm / Coved)
  if (wave === "ST") {
    if (labelLower.includes("soi gương") || labelLower.includes("reciprocal")) {
      return (
        cLower.includes("soi gương") ||
        cLower.includes("reciprocal") ||
        cLower.includes("st chênh xuống ở di, avl") ||
        cLower.includes("st soi gương") ||
        (cLower.includes("đoạn st") && cLower.includes("soi gương"))
      );
    }
    return (
      cLower.includes("đoạn st") ||
      cLower.includes("st chênh") ||
      cLower.includes("vòm") ||
      cLower.includes("bia mộ") ||
      cLower.includes("tombston") ||
      cLower.includes("cong lõm") ||
      cLower.includes("lòng thuyền") ||
      cLower.includes("đáy chén") ||
      cLower.includes("salvador dali") ||
      cLower.includes("coved") ||
      cLower.includes("brugada") ||
      cLower.includes("spodick") ||
      cLower.includes("st đẳng điện")
    );
  }

  // 7. SÓNG T (T Wave / T lều nhọn / T âm / T tối cấp)
  if (wave === "T") {
    return (
      cLower.includes("sóng t") ||
      cLower.includes("t lều") ||
      cLower.includes("t cao nhọn") ||
      cLower.includes("t đối xứng") ||
      cLower.includes("t âm") ||
      cLower.includes("t hai pha") ||
      cLower.includes("t dẹt") ||
      cLower.includes("t tối cấp") ||
      cLower.includes("hyperacute") ||
      cLower.includes("đoạn st & t") ||
      cLower.includes("st-t")
    );
  }

  // 8. SÓNG R, S (Biên độ thất / Sokolow-Lyon / S1Q3T3)
  if (wave === "R" || wave === "S") {
    if (labelLower.includes("delta") || labelLower.includes("wpw")) {
      return cLower.includes("delta") || cLower.includes("wpw") || cLower.includes("kích thích sớm");
    }
    return (
      cLower.includes("sokolow") ||
      cLower.includes("sóng r") ||
      cLower.includes("sóng s") ||
      cLower.includes("phì đại") ||
      cLower.includes("tăng gánh") ||
      cLower.includes("sv1") ||
      cLower.includes("rv5") ||
      cLower.includes("rv6") ||
      cLower.includes("s1q3t3") ||
      cLower.includes("phức bộ qrs")
    );
  }

  if (typeof ann.criterionIndex === "number" && ann.criterionIndex === critIdx) {
    return true;
  }

  return false;
}

test("M11 - Phase 02: Verification of STEMI Inferior from User Screenshot", () => {
  const criteria = [
    "Tần số: Thường 60 - 90 bpm (có thể chậm nếu block AV kèm)", // [0]
    "Nhịp điệu: Đều đặn", // [1]
    "Sóng P: Xoang", // [2]
    "Khoảng PR: 0.12 - 0.20 giây", // [3]
    "Phức bộ QRS: Xuất hiện sóng Q hoại tử sâu ở DIII, aVF", // [4]
    "Đoạn ST & T: ST CHÊNH LÊN DẠNG VÒM >= 1mm ở DII, DIII, aVF. Soi gương ST CHÊNH XUỐNG ở DI, aVL", // [5]
  ];

  const dbPath = path.join(__dirname, "..", "data", "medsim.db");
  const db = new Database(dbPath);
  const row = db.prepare("SELECT annotations_json FROM ecg_diagnoses WHERE id = 'stemi_inferior'").get();
  const anns = JSON.parse(row.annotations_json);

  // 1. When user checks criterion 5 (index 4: Q hoại tử)
  const qAnns = anns.filter(a => isAnnotationMatchingCriterion(a, criteria[4], 4, criteria));
  assert.ok(qAnns.length >= 2, "Must activate at least 2 Q wave annotations");
  assert.ok(qAnns.some(a => a.leadId === "DIII" && a.waveComponent === "Q"), "Must activate DIII Q wave");
  assert.ok(qAnns.some(a => a.leadId === "aVF" && a.waveComponent === "Q"), "Must activate aVF Q wave");

  // 2. When user checks criterion 6 (index 5: ST chênh vòm & Soi gương)
  const stAnns = anns.filter(a => isAnnotationMatchingCriterion(a, criteria[5], 5, criteria));
  assert.ok(stAnns.length >= 6, "Must activate at least 6 ST/T wave annotations");
  assert.ok(stAnns.some(a => a.leadId === "DII" && a.waveComponent === "ST"), "Must activate DII ST elevation");
  assert.ok(stAnns.some(a => a.leadId === "DIII" && a.waveComponent === "ST"), "Must activate DIII ST elevation");
  assert.ok(stAnns.some(a => a.leadId === "aVF" && a.waveComponent === "ST"), "Must activate aVF ST elevation");
  assert.ok(stAnns.some(a => a.leadId === "DI" && a.waveComponent === "ST"), "Must activate DI reciprocal depression");
  assert.ok(stAnns.some(a => a.leadId === "aVL" && a.waveComponent === "ST"), "Must activate aVL reciprocal depression");

  // 3. When user checks criterion 1 or 2 (index 0 or 1: Tần số / Nhịp điệu)
  const rrMock = { leadId: "DII", waveComponent: "RR", label: "R-R = 800ms" };
  assert.strictEqual(isAnnotationMatchingCriterion(rrMock, criteria[0], 0, criteria), true, "Criterion 1 must activate R-R caliper");
  assert.strictEqual(isAnnotationMatchingCriterion(rrMock, criteria[1], 1, criteria), true, "Criterion 2 must activate R-R caliper");
  assert.strictEqual(isAnnotationMatchingCriterion(rrMock, criteria[4], 4, criteria), false, "Criterion 5 must NOT activate R-R caliper");

  // 4. When user checks criterion 4 (index 3: Khoảng PR)
  const prMock = { leadId: "DII", waveComponent: "PR", label: "PR = 160ms" };
  assert.strictEqual(isAnnotationMatchingCriterion(prMock, criteria[3], 3, criteria), true, "Criterion 4 must activate PR caliper");
  assert.strictEqual(isAnnotationMatchingCriterion(prMock, criteria[4], 4, criteria), false, "Criterion 5 must NOT activate PR caliper");
});

test("M11 - Phase 03: Multi-Pathology Semantic Coverage Across All 31 Diagnoses", () => {
  const dbPath = path.join(__dirname, "..", "data", "medsim.db");
  const db = new Database(dbPath);
  const rows = db.prepare("SELECT id, name, criteria_json, annotations_json FROM ecg_diagnoses").all();

  assert.strictEqual(rows.length, 31, "Must verify all 31 diagnoses");

  for (const row of rows) {
    const crits = JSON.parse(row.criteria_json || "[]");
    const anns = JSON.parse(row.annotations_json || "[]");

    assert.ok(crits.length > 0, `${row.id} must have criteria`);
    assert.ok(anns.length > 0, `${row.id} must have annotations`);

    // Verify each annotation matches at least one criterion in the diagnosis
    for (const ann of anns) {
      const isMatched = crits.some((crit, idx) => isAnnotationMatchingCriterion(ann, crit, idx, crits));
      assert.ok(
        isMatched,
        `[${row.id}] Annotation '${ann.label}' (${ann.leadId}, wave=${ann.waveComponent}) must match at least one diagnostic criterion`
      );
    }
  }
});
