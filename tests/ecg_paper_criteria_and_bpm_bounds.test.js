const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const {
  ECG_RHYTHM_DEFINITIONS,
  RHYTHM_ALLOWED_BPM_RANGE,
  getRhythmAllowedBpmRange,
} = require("../src/domain/simulators/ecgWaveforms.ts");

test("M7 - Phase 01: Physiological BPM Range Locking for All 31 Rhythms", () => {
  assert.equal(ECG_RHYTHM_DEFINITIONS.length, 31, "Must have exactly 31 defined ECG rhythms");

  // Verify all 31 rhythms have allowedBpmRange defined
  for (const r of ECG_RHYTHM_DEFINITIONS) {
    const range = getRhythmAllowedBpmRange(r.id);
    assert.ok(range, `Rhythm ${r.id} must have allowedBpmRange`);
    assert.ok(typeof range.min === "number", `${r.id} min must be number`);
    assert.ok(typeof range.max === "number", `${r.id} max must be number`);

    // Verify defaultBpm is within bounds (or 0 for arrest rhythms)
    if (range.min === 0 && range.max === 0) {
      assert.equal(r.defaultBpm, 0, `${r.id} defaultBpm must be 0 for arrest/vf`);
    } else {
      assert.ok(
        r.defaultBpm >= range.min && r.defaultBpm <= range.max,
        `${r.id} defaultBpm ${r.defaultBpm} must be within [${range.min}, ${range.max}]`
      );
    }
  }

  // Clinical assertions requested by the Doctor:
  // 1. Sinus tachycardia CANNOT have BPM 40 (must be >= 101)
  const tachyRange = getRhythmAllowedBpmRange("sinus_tachycardia");
  assert.ok(tachyRange.min >= 100, "Sinus tachycardia min BPM must be >= 100");
  assert.ok(tachyRange.min > 40, "Sinus tachycardia cannot allow 40 BPM");

  // 2. Sinus bradycardia CANNOT have BPM > 60
  const bradyRange = getRhythmAllowedBpmRange("sinus_bradycardia");
  assert.ok(bradyRange.max < 60, "Sinus bradycardia max BPM must be < 60");

  // 3. Complete Heart Block (AV Block 3rd degree) ventricular escape rate is slow (25-45 bpm)
  const chbRange = getRhythmAllowedBpmRange("av_block_third_degree");
  assert.ok(chbRange.max <= 50, "Complete heart block ventricular escape rate must be <= 50");
  assert.ok(chbRange.min >= 20, "Complete heart block ventricular escape rate must be >= 20");

  // 4. Asystole and VFib are pulseless (0 bpm)
  const asystoleRange = getRhythmAllowedBpmRange("asystole");
  assert.equal(asystoleRange.min, 0);
  assert.equal(asystoleRange.max, 0);

  const vfRange = getRhythmAllowedBpmRange("ventricular_fibrillation");
  assert.equal(vfRange.min, 0);
  assert.equal(vfRange.max, 0);
});

test("M7 - Phase 02: Diagnostic Criteria Embedded Directly on Pink Paper & Default Clean Waveforms", () => {
  const paperPath = path.join(
    __dirname,
    "../src/components/simulators/ecg/RealisticPinkEcgPaper.tsx"
  );
  assert.ok(fs.existsSync(paperPath), "RealisticPinkEcgPaper file must exist");
  const content = fs.readFileSync(paperPath, "utf-8");

  // 1. Diagnostic criteria printed directly inside the paper header
  assert.ok(
    content.includes("KẾT LUẬN: {diagnosisData.name.toUpperCase()}"),
    "Pink paper must print diagnostic interpretation title"
  );
  assert.ok(
    content.includes("diagnosisData.criteria.map((crit, idx)"),
    "Pink paper must print each diagnostic criterion line"
  );

  // 2. Default clean state: activeCriteriaIndices initialized as empty set
  assert.ok(
    content.includes("const [activeCriteriaIndices, setActiveCriteriaIndices] = useState<Set<number>>(new Set())"),
    "activeCriteriaIndices must be initialized to empty Set (default clean, no wave annotations)"
  );
  assert.ok(
    content.includes("setActiveCriteriaIndices(new Set())"),
    "activeCriteriaIndices must be reset to empty set on rhythm change"
  );

  // 3. Click interaction toggles criterion
  assert.ok(
    content.includes("toggleCriterion(idx)"),
    "Must support clicking individual criteria lines to toggle annotation"
  );
  assert.ok(
    content.includes("isActive ? \"[✓]\" : \"[  ]\""),
    "Must show [✓] or [  ] status for each criterion line"
  );

  // 4. Redundant external panels removed
  assert.ok(
    !content.includes("Lọc Tiêu Chuẩn:"),
    "Floating criteria filter bar must be removed"
  );
  assert.ok(
    !content.includes("CÁC TIÊU CHUẨN VÀNG CHẨN ĐOÁN (GOLD STANDARD CRITERIA):"),
    "Outer bulky criteria accordion panel must be removed"
  );
});

test("M7 - Phase 03: Grouped Dropdown Pathology Selector & Decluttering", () => {
  const dropdownPath = path.join(
    __dirname,
    "../src/components/simulators/ecg/EcgPathologySelectDropdown.tsx"
  );
  assert.ok(fs.existsSync(dropdownPath), "EcgPathologySelectDropdown component must exist");
  const content = fs.readFileSync(dropdownPath, "utf-8");

  // Dropdown groups 9 systems
  assert.ok(content.includes("<optgroup"), "Dropdown must use optgroup for 9 clinical systems");
  assert.ok(content.includes("getRhythmAllowedBpmRange"), "Dropdown must show allowed BPM range");

  // ECG page integrates the dropdown
  const ecgPagePath = path.join(__dirname, "../src/app/simulators/ecg/page.tsx");
  const pageContent = fs.readFileSync(ecgPagePath, "utf-8");
  assert.ok(
    pageContent.includes("EcgPathologySelectDropdown"),
    "ECG page must integrate EcgPathologySelectDropdown"
  );
  assert.ok(
    pageContent.includes("allowedBpmRange.min") && pageContent.includes("allowedBpmRange.max"),
    "ECG page BPM slider must be bound to allowedBpmRange min/max"
  );
});
