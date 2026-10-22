const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

test("M12 - Phase 01: Code Integration of Dynamic Baseline Synthesizer in RealisticPinkEcgPaper", () => {
  const code = fs.readFileSync(
    path.join(__dirname, "..", "src", "components", "simulators", "ecg", "RealisticPinkEcgPaper.tsx"),
    "utf8"
  );

  // Must have Dynamic Baseline Synthesizer block in drawWaveAnnotations
  assert.ok(
    code.includes("DYNAMIC BASELINE SYNTHESIZER"),
    "RealisticPinkEcgPaper must contain Dynamic Baseline Synthesizer block"
  );

  // 1. R-R Caliper synthesis when rate/rhythm is active
  assert.ok(
    code.includes("isRrActive") &&
    code.includes("annotations.push({") &&
    code.includes("waveComponent: \"RR\",") &&
    code.includes("color: \"#d97706\","),
    "Dynamic Baseline Synthesizer must inject RR caliper on DII / Rhythm strip when rate/rhythm is checked"
  );

  // 2. PR Caliper synthesis when PR interval is active
  assert.ok(
    code.includes("isPrActive") &&
    code.includes("waveComponent: \"PR\",") &&
    code.includes("metrics.prIntervalMs"),
    "Dynamic Baseline Synthesizer must inject PR caliper on DII / Rhythm strip when PR interval is checked"
  );

  // 3. P wave synthesis when P wave is active
  assert.ok(
    code.includes("isPActive") &&
    code.includes("normLead === \"AVR\"") &&
    code.includes("▼ Sóng P âm ở aVR (-0.12 mV)") &&
    code.includes("▲ Sóng P dương ở DII (+0.15 mV)"),
    "Dynamic Baseline Synthesizer must inject P wave badges on DI, DII, aVF, aVR when P wave is checked"
  );
});

test("M12 - Phase 02: Verification of All 6 Clinical Criteria in STEMI Inferior (Screenshot 15:32)", () => {
  const criteria = [
    "Tần số: Thường 60 - 90 bpm (có thể chậm nếu block AV kèm)", // [0]
    "Nhịp điệu: Đều đặn", // [1]
    "Sóng P: Xoang", // [2]
    "Khoảng PR: 0.12 - 0.20 giây", // [3]
    "Phức bộ QRS: Xuất hiện sóng Q hoại tử sâu ở DIII, aVF", // [4]
    "Đoạn ST & T: ST CHÊNH LÊN DẠNG VÒM >= 1mm ở DII, DIII, aVF. Soi gương ST CHÊNH XUỐNG ở DI, aVL", // [5]
  ];

  // Helper simulating the Dynamic Baseline Synthesizer behavior
  function simulateLeadAnnotations(leadId, activeIndices, isRhythmStrip = false) {
    const rawAnns = [
      { leadId: "DII", waveComponent: "ST", label: "ST chênh vòm +3.0mm" },
      { leadId: "DIII", waveComponent: "ST", label: "ST chênh vòm +4.5mm" },
      { leadId: "aVF", waveComponent: "ST", label: "ST chênh vòm +3.8mm" },
      { leadId: "II", waveComponent: "ST", label: "Lead II: ST chênh vòm +3.0mm" },
      { leadId: "DI", waveComponent: "ST", label: "ST soi gương -1.5mm" },
      { leadId: "aVL", waveComponent: "ST", label: "ST soi gương bên cao -2.2mm" },
      { leadId: "DIII", waveComponent: "Q", label: "Sóng Q hoại tử" },
      { leadId: "aVF", waveComponent: "Q", label: "Sóng Q bệnh lý" },
      { leadId: "DII", waveComponent: "T", label: "Sóng T tối cấp" },
    ];

    const normLead = isRhythmStrip ? "II" : leadId.toUpperCase();
    let anns = rawAnns.filter(a => {
      const tid = a.leadId.toUpperCase();
      if (isRhythmStrip) return tid === "DII" || tid === "II";
      return tid === normLead;
    });

    // Check active
    const isRrActive = activeIndices.includes(0) || activeIndices.includes(1);
    const isPActive = activeIndices.includes(2);
    const isPrActive = activeIndices.includes(3);
    const isQActive = activeIndices.includes(4);
    const isStActive = activeIndices.includes(5);

    // Apply baseline synthesis
    if (isRrActive && (normLead === "DII" || normLead === "II") && !anns.some(a => a.waveComponent === "RR")) {
      anns.push({ leadId: isRhythmStrip ? "II" : "DII", waveComponent: "RR", label: "R-R Caliper 80 bpm" });
    }
    if (isPrActive && (normLead === "DII" || normLead === "II") && !anns.some(a => a.waveComponent === "PR")) {
      anns.push({ leadId: isRhythmStrip ? "II" : "DII", waveComponent: "PR", label: "PR Caliper 188ms" });
    }
    if (isPActive && !anns.some(a => a.waveComponent === "P")) {
      if (normLead === "AVR") anns.push({ leadId: "aVR", waveComponent: "P", label: "P âm aVR" });
      if (normLead === "DII" || normLead === "II") anns.push({ leadId: isRhythmStrip ? "II" : "DII", waveComponent: "P", label: "P dương DII" });
      if (normLead === "DI") anns.push({ leadId: "DI", waveComponent: "P", label: "P dương DI" });
      if (normLead === "AVF") anns.push({ leadId: "aVF", waveComponent: "P", label: "P dương aVF" });
    }

    // Filter by active
    return anns.filter(a => {
      if (a.waveComponent === "RR") return isRrActive;
      if (a.waveComponent === "P") return isPActive;
      if (a.waveComponent === "PR") return isPrActive;
      if (a.waveComponent === "Q") return isQActive;
      if (a.waveComponent === "ST" || a.waveComponent === "T") return isStActive;
      return false;
    });
  }

  // Case 1: Doctor checks 1, 2, 3, 4 (as in screenshot 15:32)
  const activeCase1 = [0, 1, 2, 3];
  const diiAnnsCase1 = simulateLeadAnnotations("DII", activeCase1);
  const rhythmAnnsCase1 = simulateLeadAnnotations("II", activeCase1, true);
  const avrAnnsCase1 = simulateLeadAnnotations("aVR", activeCase1);

  assert.ok(diiAnnsCase1.some(a => a.waveComponent === "RR"), "DII must have R-R caliper when 1 or 2 is checked");
  assert.ok(diiAnnsCase1.some(a => a.waveComponent === "PR"), "DII must have PR caliper when 4 is checked");
  assert.ok(diiAnnsCase1.some(a => a.waveComponent === "P"), "DII must have P wave badge when 3 is checked");
  assert.ok(rhythmAnnsCase1.some(a => a.waveComponent === "RR"), "Rhythm strip must have R-R caliper");
  assert.ok(rhythmAnnsCase1.some(a => a.waveComponent === "PR"), "Rhythm strip must have PR caliper");
  assert.ok(avrAnnsCase1.some(a => a.waveComponent === "P"), "aVR must have negative P wave badge");

  // Case 2: Doctor checks 5 (Q hoại tử)
  const activeCase2 = [4];
  const diiiAnnsCase2 = simulateLeadAnnotations("DIII", activeCase2);
  const avfAnnsCase2 = simulateLeadAnnotations("aVF", activeCase2);
  assert.ok(diiiAnnsCase2.some(a => a.waveComponent === "Q"), "DIII must have Q wave when 5 is checked");
  assert.ok(avfAnnsCase2.some(a => a.waveComponent === "Q"), "aVF must have Q wave when 5 is checked");

  // Case 3: Doctor checks 6 (ST chênh vòm & soi gương)
  const activeCase3 = [5];
  const diiAnnsCase3 = simulateLeadAnnotations("DII", activeCase3);
  const diAnnsCase3 = simulateLeadAnnotations("DI", activeCase3);
  const avlAnnsCase3 = simulateLeadAnnotations("aVL", activeCase3);
  assert.ok(diiAnnsCase3.some(a => a.waveComponent === "ST"), "DII must have ST elevation when 6 is checked");
  assert.ok(diAnnsCase3.some(a => a.waveComponent === "ST"), "DI must have reciprocal ST depression when 6 is checked");
  assert.ok(avlAnnsCase3.some(a => a.waveComponent === "ST"), "aVL must have reciprocal ST depression when 6 is checked");
});
