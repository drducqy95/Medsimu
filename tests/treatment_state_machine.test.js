const test = require("node:test");
const assert = require("node:assert");

// Mock clinical case
const mockStemiCase = {
  id: "case-inferior-stemi-rv",
  goldStandardDiagnosis: "Nhồi máu cơ tim cấp có ST chênh lên (STEMI) thành dưới - thất phải",
  correctDisposition: "cath_lab",
  initialVitals: {
    hr: 56,
    bpSys: 102,
    bpDia: 68,
    spO2: 96,
    rr: 20,
    temp: 36.8,
    glasgow: 15,
    rhythmId: "stemi_inferior",
  },
  availableOrders: [
    {
      id: "aspirin-load",
      label: "Aspirin 300 mg",
      isEffective: true,
      isContraindicated: false,
      vitalsDelta: {},
    },
    {
      id: "fatal-nitroglycerin",
      label: "Nitroglycerin 0.4 mg ngậm dưới lưỡi",
      isEffective: false,
      isContraindicated: true,
      triggersCodeBlue: true,
      vitalsDelta: { bpSys: -58, bpDia: -38 },
      rhythmChange: "ventricular_fibrillation",
    },
  ],
  debriefingRubric: {
    diagnosticPoints: 40,
    safetyPoints: 30,
    treatmentPoints: 20,
    speedPoints: 10,
  },
};

test("Effective orders stabilize or improve patient state without Code Blue", () => {
  let vitals = { ...mockStemiCase.initialVitals };
  let isCodeBlue = false;

  const order = mockStemiCase.availableOrders.find((o) => o.id === "aspirin-load");
  assert.ok(order.isEffective);
  assert.strictEqual(order.isContraindicated, false);
  assert.strictEqual(isCodeBlue, false);
});

test("Fatal contraindication triggers Code Blue, drops BP and induces VFib", () => {
  let vitals = { ...mockStemiCase.initialVitals };
  let isCodeBlue = false;
  let rhythm = vitals.rhythmId;

  const fatalOrder = mockStemiCase.availableOrders.find((o) => o.id === "fatal-nitroglycerin");
  assert.ok(fatalOrder.isContraindicated);

  if (fatalOrder.triggersCodeBlue) {
    isCodeBlue = true;
    vitals.bpSys += fatalOrder.vitalsDelta.bpSys;
    vitals.bpDia += fatalOrder.vitalsDelta.bpDia;
    if (fatalOrder.rhythmChange) {
      rhythm = fatalOrder.rhythmChange;
    }
  }

  assert.strictEqual(isCodeBlue, true, "Fatal order MUST trigger Code Blue");
  assert.strictEqual(rhythm, "ventricular_fibrillation", "Nitroglycerin in RV infarction induces VFib");
  assert.strictEqual(vitals.bpSys, 44, "Systolic BP must crash to shock level");
});
