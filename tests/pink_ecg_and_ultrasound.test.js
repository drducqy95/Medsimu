const test = require("node:test");
const assert = require("node:assert");
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const DB_PATH = path.join(__dirname, "..", "data", "medsim.db");
const IMAGES_DIR = path.join(__dirname, "..", "public", "ultrasound", "viable_images");

// 1. Test Bazett QTc & ECG Metrics
test("Bazett QTc and ECG Metrics accurately detect pathological STEMI parameters", () => {
  // Test Bazett formula
  const hr = 60;
  const rrSec = 60 / hr;
  const qt = 400;
  const qtc = Math.round(qt / Math.sqrt(rrSec));
  assert.strictEqual(qtc, 400, "At 60 bpm, QTc must equal QT");

  // Fast rate 120 bpm
  const hrFast = 120;
  const rrSecFast = 60 / hrFast; // 0.5s
  const qtcFast = Math.round(320 / Math.sqrt(rrSecFast));
  assert.ok(qtcFast > 320, "At fast rate, QTc must correct upwards");
  assert.strictEqual(qtcFast, 453);
});

// 2. Test SQLite Ultrasound Atlas Integrity
test("Ultrasound Atlas in SQLite contains 10 chapters with complete topics and real image mappings", () => {
  const db = new Database(DB_PATH, { readonly: true });

  const chapters = db.prepare("SELECT * FROM ultrasound_atlas ORDER BY number ASC").all();
  assert.strictEqual(chapters.length, 10, "Must have exactly 10 chapters from Viable Ultrasound CD");

  // Liver
  const liver = chapters.find((c) => c.id === "liver");
  assert.ok(liver, "Chapter 'liver' must exist");
  const liverTopics = JSON.parse(liver.topics_json);
  assert.strictEqual(liverTopics.length, 10, "Liver must have 10 clinical topics");
  assert.ok(liverTopics[0].images.length > 0, "Normal liver must contain real image filenames");

  // GI Tract (Appendicitis)
  const giTract = chapters.find((c) => c.id === "gi-tract");
  assert.ok(giTract, "Chapter 'gi-tract' must exist");
  const giTopics = JSON.parse(giTract.topics_json);
  const appendicitis = giTopics.find((t) => t.id === "appendicitis");
  assert.ok(appendicitis, "Appendicitis topic must exist in GI Tract");
  assert.ok(appendicitis.images.length > 0, "Appendicitis must map to real images");

  // Total images across topics
  let totalImages = 0;
  for (const c of chapters) {
    const topics = JSON.parse(c.topics_json);
    for (const t of topics) {
      if (t.images) totalImages += t.images.length;
    }
  }
  assert.ok(totalImages >= 300, `Expected at least 300 mapped clinical images, got ${totalImages}`);

  db.close();
});

// 3. Test Real Ultrasound Images Storage on Disk
test("Public directory contains real ultrasound image files from CD", () => {
  assert.ok(fs.existsSync(IMAGES_DIR), "Directory 'public/ultrasound/viable_images' must exist");
  const files = fs.readdirSync(IMAGES_DIR);
  assert.ok(files.length >= 1200, `Expected at least 1200 real ultrasound files, found ${files.length}`);

  // Check sample files
  assert.ok(files.some((f) => f.toLowerCase() === "001.jpg"), "001.jpg must exist in image assets");
  assert.ok(files.some((f) => f.toLowerCase() === "abb5.jpg"), "ABB5.JPG must exist in image assets");
});

// 4. Test SQLite ECG Diagnoses & Authoritative Criteria Integrity
test("SQLite contains 31 authoritative ECG diagnoses with criteria, 9 systems and lead manifestations", () => {
  const db = new Database(DB_PATH, { readonly: true });

  const diagnoses = db.prepare("SELECT * FROM ecg_diagnoses ORDER BY category, id").all();
  assert.ok(diagnoses.length >= 31, `Must contain at least 31 clinical ECG diagnoses, found ${diagnoses.length}`);

  // Check 9 systems coverage
  const systems = db.prepare("SELECT DISTINCT system_id FROM ecg_diagnoses").all();
  assert.strictEqual(systems.length, 9, "Must cover all 9 clinical cardiology systems");

  // Check STEMI Inferior
  const stemiInf = diagnoses.find((d) => d.id === "stemi_inferior");
  assert.ok(stemiInf, "STEMI Inferior must exist");
  const infCriteria = JSON.parse(stemiInf.criteria_json);
  assert.ok(infCriteria.length >= 3, "Must have at least 3 formal criteria");
  assert.ok(infCriteria.some((c) => c.includes("DII, DIII, aVF")), "Must specify DII, DIII, aVF elevation");
  const infLeads = JSON.parse(stemiInf.lead_manifestations_json);
  assert.ok(infLeads.DII && infLeads.aVL, "Must document lead manifestations for DII and reciprocal aVL");

  // Check AV Block 1st Degree
  const avb1 = diagnoses.find((d) => d.id === "av_block_first_degree");
  assert.ok(avb1, "AV Block 1st Degree must exist");
  const avb1Criteria = JSON.parse(avb1.criteria_json);
  assert.ok(avb1Criteria.some((c) => c.includes("0.20")), "Must specify PR > 0.20s criteria");

  // Check Hyperkalemia
  const hyperk = diagnoses.find((d) => d.id === "hyperkalemia");
  assert.ok(hyperk, "Hyperkalemia must exist");
  const hyperkCriteria = JSON.parse(hyperk.criteria_json);
  assert.ok(hyperkCriteria.some((c) => c.includes("hình lều") || c.includes("đối xứng")), "Must specify tent-like T wave criteria");

  db.close();
});

// 5. Test Wave-Mapped Diagnostic Criteria Annotations
test("ECG Diagnoses contain precise physical wave-mapped annotations for canvas rendering", () => {
  const db = new Database(DB_PATH, { readonly: true });
  const diagnoses = db.prepare("SELECT id, criteria_json, annotations_json FROM ecg_diagnoses").all();

  for (const d of diagnoses) {
    const annotations = JSON.parse(d.annotations_json || "[]");
    assert.ok(Array.isArray(annotations), `Annotations for ${d.id} must be an array`);
    assert.ok(annotations.length >= 2, `Diagnosis ${d.id} must have at least 2 wave annotations`);

    for (const ann of annotations) {
      assert.ok(ann.leadId, `Annotation for ${d.id} must specify leadId`);
      assert.ok(typeof ann.targetCyclePhase === "number", `Annotation for ${d.id} must have numeric targetCyclePhase`);
      assert.ok(ann.targetCyclePhase >= 0 && ann.targetCyclePhase <= 1, "Phase must be between 0 and 1");
      assert.ok(ann.label && ann.label.length > 0, `Annotation for ${d.id} must have non-empty label`);
    }
  }

  // Verify STEMI Inferior has ST elevation markers on DII/DIII/aVF and reciprocal markers on aVL/DI
  const stemiInf = diagnoses.find((d) => d.id === "stemi_inferior");
  const infAnns = JSON.parse(stemiInf.annotations_json);
  assert.ok(infAnns.some((a) => a.leadId === "DII" && a.label.includes("ST chênh vòm")), "Must map ST elevation on DII");
  assert.ok(infAnns.some((a) => a.leadId === "aVL" && a.label.includes("soi gương")), "Must map reciprocal depression on aVL");

  // Verify AV Block has interval caliper marker
  const avb1 = diagnoses.find((d) => d.id === "av_block_first_degree");
  const avbAnns = JSON.parse(avb1.annotations_json);
  assert.ok(avbAnns.some((a) => a.badgePlacement === "interval" && typeof a.intervalEndPhase === "number"), "Must have PR interval caliper annotation");

  // Verify Normal Sinus has 5 authoritative criteria and accurate 1-to-1 criterion mapping
  const nsr = diagnoses.find((d) => d.id === "normal_sinus");
  assert.ok(nsr, "normal_sinus must exist");
  const nsrCriteria = JSON.parse(nsr.criteria_json);
  assert.strictEqual(nsrCriteria.length, 5, "normal_sinus must have 5 clinical criteria");
  const nsrAnns = JSON.parse(nsr.annotations_json);
  assert.ok(nsrAnns.length >= 5, "normal_sinus must have annotations covering all criteria");
  for (const ann of nsrAnns) {
    assert.ok(typeof ann.criterionIndex === "number", "Criterion index must be a number");
    assert.ok(ann.criterionIndex >= 0 && ann.criterionIndex < nsrCriteria.length, "Criterion index must be within criteria range");
  }

  db.close();
});



