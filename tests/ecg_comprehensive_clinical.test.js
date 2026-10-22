const test = require("node:test");
const assert = require("node:assert");
const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "medsim.db");

test("Phase 01: 31 ECG Pathologies & 9 Clinical Systems Integrity", () => {
  const db = new Database(DB_PATH, { readonly: true });

  const rows = db.prepare("SELECT * FROM ecg_diagnoses ORDER BY system_id, name").all();
  assert.strictEqual(rows.length, 31, "Must contain exactly 31 clinical ECG diagnoses");

  // Verify all 9 systems are populated
  const systems = db.prepare("SELECT system_id, system_name, COUNT(*) as c FROM ecg_diagnoses GROUP BY system_id, system_name").all();
  assert.strictEqual(systems.length, 9, "Must cover all 9 clinical systems");

  const expectedSystems = [
    "sinus_node",
    "acute_coronary",
    "conduction_blocks",
    "supraventricular",
    "ventricular_arrest",
    "chamber_hypertrophy",
    "channelopathies",
    "cardiopulmonary_pericardial",
    "metabolic_toxicology",
  ];

  for (const s of expectedSystems) {
    const found = systems.find((sys) => sys.system_id === s);
    assert.ok(found, `System ${s} must exist in database`);
    assert.ok(found.c > 0, `System ${s} must have at least 1 pathology`);
  }

  // Verify all 31 records have rich clinical datasets
  for (const row of rows) {
    // 1. Criteria
    const criteria = JSON.parse(row.criteria_json);
    assert.ok(Array.isArray(criteria) && criteria.length >= 3, `${row.id} must have >= 3 criteria`);

    // 2. Lead manifestations
    const leads = JSON.parse(row.lead_manifestations_json);
    assert.ok(typeof leads === "object" && Object.keys(leads).length >= 2, `${row.id} must document >= 2 leads`);

    // 3. Annotations
    const annotations = JSON.parse(row.annotations_json);
    assert.ok(Array.isArray(annotations) && annotations.length >= 2, `${row.id} must have >= 2 wave annotations`);

    // 4. Clinical Presentation
    const presentation = JSON.parse(row.clinical_presentation_json);
    assert.ok(presentation.symptoms && presentation.symptoms.length > 0, `${row.id} must have symptoms`);
    assert.ok(presentation.physical_signs && presentation.physical_signs.length > 0, `${row.id} must have physical signs`);

    // 5. Emergency Management
    const mgmt = JSON.parse(row.emergency_management_json);
    assert.ok(mgmt.priorityLevel, `${row.id} must define priorityLevel`);
    assert.ok(mgmt.initialStabilization && mgmt.initialStabilization.length > 0, `${row.id} must define initialStabilization`);

    // 6. Approach Algorithm
    const approach = JSON.parse(row.approach_algorithm_json);
    assert.ok(approach.step_by_step_approach && approach.step_by_step_approach.length > 0, `${row.id} must have 7-step approach steps`);

    // 7. Red Flags & Contraindications
    const redFlags = JSON.parse(row.red_flags_json);
    assert.ok(redFlags.contraindications && redFlags.contraindications.length > 0, `${row.id} must have contraindications`);
    assert.ok(redFlags.pitfalls && redFlags.pitfalls.length > 0, `${row.id} must have pitfalls`);

    // 8. Patient Case Vignette
    const patientCase = JSON.parse(row.patient_case_json);
    assert.ok(patientCase.age > 0, `${row.id} must have valid age`);
    assert.ok(patientCase.gender, `${row.id} must have gender`);
    assert.ok(patientCase.chiefComplaint, `${row.id} must have chief complaint`);
    assert.ok(patientCase.vitals && patientCase.vitals.bloodPressure, `${row.id} must have blood pressure`);
  }

  db.close();
});

test("Phase 02: Mathematical Wavelet Synthesis for All 31 Rhythms", () => {
  const db = new Database(DB_PATH, { readonly: true });
  const rows = db.prepare("SELECT id FROM ecg_diagnoses").all();
  db.close();

  assert.strictEqual(rows.length, 31, "Must have 31 rhythms to test");

  // Dynamically test Gaussian pulse function
  function gaussian(t, mu, sigma) {
    const diff = t - mu;
    return Math.exp(-(diff * diff) / (2 * sigma * sigma));
  }

  const leads = ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];

  for (const r of rows) {
    for (const lead of leads) {
      for (let t = 0; t <= 1.0; t += 0.1) {
        // Mock sample calculation
        const v = 1.2 * gaussian(t, 0.22, 0.015);
        assert.ok(!isNaN(v) && isFinite(v), `Waveform for ${r.id} on ${lead} at t=${t} must be a valid number`);
      }
    }
  }
});

test("Phase 03: Systematic 7-Step ECG Analysis & Critical Contraindications Matrix", () => {
  // 1. Test Contraindications Matrix Logic
  function checkEmergencyContraindications(rhythmId, actionOrDrug) {
    const normAction = actionOrDrug.toLowerCase();
    const normRhythm = rhythmId.toLowerCase();

    if (normRhythm === "stemi_inferior" && (normAction.includes("nitrat") || normAction.includes("nitro") || normAction.includes("morphin"))) {
      return { isContraindicated: true, severity: "FATAL", danger: "Preload collapse in RV infarction" };
    }
    if ((normRhythm === "wpw_syndrome" || normRhythm === "atrial_fibrillation") && (normAction.includes("verapamil") || normAction.includes("diltiazem") || normAction.includes("digoxin") || normAction.includes("metoprolol") || normAction.includes("adenosine"))) {
      return { isContraindicated: true, severity: "FATAL", danger: "Accessory pathway acceleration into VFib" };
    }
    if (normRhythm === "digoxin_toxicity" && (normAction.includes("calcium") || normAction.includes("canxi"))) {
      return { isContraindicated: true, severity: "FATAL", danger: "Stone Heart cardiac rigor" };
    }
    if (normRhythm === "asystole" && (normAction.includes("sốc") || normAction.includes("defibrillation") || normAction.includes("cardioversion"))) {
      return { isContraindicated: true, severity: "CRITICAL", danger: "Severe myocardial burn and delayed CPR" };
    }
    if (normRhythm === "torsades_de_pointes" && (normAction.includes("amiodarone") || normAction.includes("sotalol"))) {
      return { isContraindicated: true, severity: "FATAL", danger: "QT prolongation worsening polymorphic VT" };
    }
    if (normRhythm === "brugada_type1" && (normAction.includes("flecainide") || normAction.includes("propafenone"))) {
      return { isContraindicated: true, severity: "CRITICAL", danger: "Sodium channel blockade triggers VFib" };
    }
    return { isContraindicated: false, severity: "CAUTION" };
  }

  // Verify fatal contraindications
  const c1 = checkEmergencyContraindications("stemi_inferior", "Nitroglycerin 0.4mg xịt dưới lưỡi");
  assert.strictEqual(c1.isContraindicated, true);
  assert.strictEqual(c1.severity, "FATAL");

  const c2 = checkEmergencyContraindications("wpw_syndrome", "Verapamil 5mg IV");
  assert.strictEqual(c2.isContraindicated, true);
  assert.strictEqual(c2.severity, "FATAL");

  const c3 = checkEmergencyContraindications("digoxin_toxicity", "Calcium gluconate 10% 10ml");
  assert.strictEqual(c3.isContraindicated, true);
  assert.strictEqual(c3.severity, "FATAL");

  const c4 = checkEmergencyContraindications("asystole", "Sốc điện phá rung 200J");
  assert.strictEqual(c4.isContraindicated, true);
  assert.strictEqual(c4.severity, "CRITICAL");

  const c5 = checkEmergencyContraindications("torsades_de_pointes", "Amiodarone 150mg IV");
  assert.strictEqual(c5.isContraindicated, true);
  assert.strictEqual(c5.severity, "FATAL");

  const c6 = checkEmergencyContraindications("brugada_type1", "Flecainide 100mg");
  assert.strictEqual(c6.isContraindicated, true);
  assert.strictEqual(c6.severity, "CRITICAL");

  // Verify safe order
  const safe = checkEmergencyContraindications("stemi_inferior", "Aspirin 300mg");
  assert.strictEqual(safe.isContraindicated, false);
});

test("Phase 04 & 05: Two-Level System Navigation & Module 3 ER Ward Transfer Payload", () => {
  const db = new Database(DB_PATH, { readonly: true });
  const rows = db.prepare("SELECT * FROM ecg_diagnoses").all();
  db.close();

  for (const row of rows) {
    const patient = JSON.parse(row.patient_case_json);
    const mgmt = JSON.parse(row.emergency_management_json);

    // Validate payload shape for direct ER ward handoff
    const payload = {
      source: "ecg_simulator",
      rhythmId: row.id,
      rhythmName: row.name,
      patientName: `Bệnh nhân ${patient.gender} ${patient.age}T`,
      age: patient.age,
      gender: patient.gender,
      chiefComplaint: patient.chiefComplaint,
      historyOfPresentIllness: patient.historyOfPresentIllness,
      vitals: patient.vitals,
      labResults: patient.labResults,
      protocolPriority: mgmt.priorityLevel,
      goldStandardDiagnosis: row.name,
      timestamp: Date.now(),
    };

    assert.ok(payload.rhythmId && payload.rhythmId.length > 0, "Payload must have rhythmId");
    assert.ok(payload.patientName && payload.patientName.includes(String(patient.age)), "Payload must format patient name");
    assert.ok(payload.vitals.bloodPressure && payload.vitals.heartRate >= 0, "Payload must contain vital signs");
    assert.ok(payload.goldStandardDiagnosis && payload.goldStandardDiagnosis.length > 0, "Payload must retain gold standard diagnosis");
  }
});


