import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import {
  MedicalLesson,
  DrugItem,
  QuizQuestion,
  MedicalFlashcard,
} from "@/domain/academy/types";
import { ClinicalCase } from "@/domain/treatment/types";
import { UltrasoundAtlasChapter } from "@/domain/simulators/ultrasoundAtlasTypes";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "medsim.db");

// Ensure data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let dbInstance: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!dbInstance) {
    dbInstance = new Database(DB_PATH);
    dbInstance.pragma("journal_mode = WAL");
    initializeTables(dbInstance);
  }
  return dbInstance;
}

function initializeTables(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      specialty TEXT NOT NULL,
      category TEXT NOT NULL,
      read_time_minutes INTEGER NOT NULL,
      summary TEXT NOT NULL,
      pathophysiology_json TEXT NOT NULL,
      clinical_presentation_json TEXT NOT NULL,
      diagnostic_criteria_json TEXT NOT NULL,
      management_summary_json TEXT NOT NULL,
      related_drug_ids_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS drugs (
      id TEXT PRIMARY KEY,
      generic_name TEXT NOT NULL,
      brand_names_json TEXT NOT NULL,
      category TEXT NOT NULL,
      receptor_mechanism TEXT NOT NULL,
      standard_dose_json TEXT NOT NULL,
      routes_json TEXT NOT NULL,
      onset_time TEXT NOT NULL,
      half_life TEXT NOT NULL,
      indications_json TEXT NOT NULL,
      contraindications_json TEXT NOT NULL,
      fatal_mistakes_json TEXT NOT NULL,
      adverse_effects_json TEXT NOT NULL,
      monitoring_keys_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS quizzes (
      id TEXT PRIMARY KEY,
      topic_id TEXT NOT NULL,
      specialty TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      vignette TEXT NOT NULL,
      question TEXT NOT NULL,
      options_json TEXT NOT NULL,
      correct_option_index INTEGER NOT NULL,
      explanation_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS flashcards (
      id TEXT PRIMARY KEY,
      specialty TEXT NOT NULL,
      category TEXT NOT NULL,
      front TEXT NOT NULL,
      back TEXT NOT NULL,
      mnemonic TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS clinical_cases (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      specialty TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      summary TEXT NOT NULL,
      patient_profile_json TEXT NOT NULL,
      initial_vitals_json TEXT NOT NULL,
      natural_deterioration_json TEXT NOT NULL,
      anamnesis_json TEXT NOT NULL,
      physical_exam_json TEXT NOT NULL,
      paraclinical_json TEXT NOT NULL,
      available_orders_json TEXT NOT NULL,
      gold_standard_diagnosis TEXT NOT NULL,
      differential_diagnoses_json TEXT NOT NULL,
      correct_disposition TEXT NOT NULL,
      debriefing_rubric_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ultrasound_atlas (
      id TEXT PRIMARY KEY,
      number INTEGER NOT NULL,
      title TEXT NOT NULL,
      title_en TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL,
      topics_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS ecg_diagnoses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      name_en TEXT NOT NULL,
      category TEXT NOT NULL,
      severity TEXT NOT NULL,
      criteria_json TEXT NOT NULL,
      lead_manifestations_json TEXT NOT NULL,
      annotations_json TEXT NOT NULL DEFAULT '[]',
      ecg_metrics_json TEXT NOT NULL,
      clinical_action TEXT NOT NULL,
      differential_diagnoses_json TEXT NOT NULL,
      system_id TEXT NOT NULL DEFAULT 'sinus_node',
      system_name TEXT NOT NULL DEFAULT 'Nút Xoang & Nhịp Cơ Bản',
      anatomical_region TEXT DEFAULT '',
      clinical_presentation_json TEXT NOT NULL DEFAULT '{}',
      emergency_management_json TEXT NOT NULL DEFAULT '{}',
      approach_algorithm_json TEXT NOT NULL DEFAULT '{}',
      red_flags_json TEXT NOT NULL DEFAULT '{}',
      patient_case_json TEXT NOT NULL DEFAULT '{}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe incremental migrations for existing databases
  const columnsToAdd = [
    { name: "annotations_json", type: "TEXT DEFAULT '[]'" },
    { name: "system_id", type: "TEXT DEFAULT 'sinus_node'" },
    { name: "system_name", type: "TEXT DEFAULT 'Nút Xoang & Nhịp Cơ Bản'" },
    { name: "anatomical_region", type: "TEXT DEFAULT ''" },
    { name: "clinical_presentation_json", type: "TEXT DEFAULT '{}'" },
    { name: "emergency_management_json", type: "TEXT DEFAULT '{}'" },
    { name: "approach_algorithm_json", type: "TEXT DEFAULT '{}'" },
    { name: "red_flags_json", type: "TEXT DEFAULT '{}'" },
    { name: "patient_case_json", type: "TEXT DEFAULT '{}'" },
  ];

  for (const col of columnsToAdd) {
    try {
      db.exec(`ALTER TABLE ecg_diagnoses ADD COLUMN ${col.name} ${col.type};`);
    } catch (e) {
      // Column already exists
    }
  }
}

// ----------------------------------------------------
// Lesson Repository Methods
// ----------------------------------------------------

export function getAllLessonsFromDb(): MedicalLesson[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM lessons ORDER BY specialty, title").all() as any[];

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    specialty: row.specialty,
    category: row.category,
    readTimeMinutes: row.read_time_minutes,
    summary: row.summary,
    pathophysiology: JSON.parse(row.pathophysiology_json),
    clinicalPresentation: JSON.parse(row.clinical_presentation_json),
    diagnosticCriteria: JSON.parse(row.diagnostic_criteria_json),
    managementSummary: JSON.parse(row.management_summary_json),
    relatedDrugIds: JSON.parse(row.related_drug_ids_json),
  }));
}

export function getLessonByIdFromDb(id: string): MedicalLesson | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM lessons WHERE id = ?").get(id) as any;
  if (!row) return null;

  return {
    id: row.id,
    title: row.title,
    specialty: row.specialty,
    category: row.category,
    readTimeMinutes: row.read_time_minutes,
    summary: row.summary,
    pathophysiology: JSON.parse(row.pathophysiology_json),
    clinicalPresentation: JSON.parse(row.clinical_presentation_json),
    diagnosticCriteria: JSON.parse(row.diagnostic_criteria_json),
    managementSummary: JSON.parse(row.management_summary_json),
    relatedDrugIds: JSON.parse(row.related_drug_ids_json),
  };
}

export function upsertLessonToDb(lesson: MedicalLesson) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO lessons (
      id, title, specialty, category, read_time_minutes, summary,
      pathophysiology_json, clinical_presentation_json, diagnostic_criteria_json,
      management_summary_json, related_drug_ids_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title=excluded.title,
      specialty=excluded.specialty,
      category=excluded.category,
      read_time_minutes=excluded.read_time_minutes,
      summary=excluded.summary,
      pathophysiology_json=excluded.pathophysiology_json,
      clinical_presentation_json=excluded.clinical_presentation_json,
      diagnostic_criteria_json=excluded.diagnostic_criteria_json,
      management_summary_json=excluded.management_summary_json,
      related_drug_ids_json=excluded.related_drug_ids_json
  `);

  stmt.run(
    lesson.id,
    lesson.title,
    lesson.specialty,
    lesson.category,
    lesson.readTimeMinutes,
    lesson.summary,
    JSON.stringify(lesson.pathophysiology),
    JSON.stringify(lesson.clinicalPresentation),
    JSON.stringify(lesson.diagnosticCriteria),
    JSON.stringify(lesson.managementSummary),
    JSON.stringify(lesson.relatedDrugIds)
  );
}

// ----------------------------------------------------
// Drug Repository Methods
// ----------------------------------------------------

export function getAllDrugsFromDb(): DrugItem[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM drugs ORDER BY generic_name").all() as any[];

  return rows.map((row) => ({
    id: row.id,
    genericName: row.generic_name,
    brandNames: JSON.parse(row.brand_names_json),
    category: row.category,
    receptorMechanism: row.receptor_mechanism,
    standardDose: JSON.parse(row.standard_dose_json),
    routes: JSON.parse(row.routes_json),
    onsetTime: row.onset_time,
    halfLife: row.half_life,
    indications: JSON.parse(row.indications_json),
    contraindications: JSON.parse(row.contraindications_json),
    fatalMistakes: JSON.parse(row.fatal_mistakes_json),
    adverseEffects: JSON.parse(row.adverse_effects_json),
    monitoringKeys: JSON.parse(row.monitoring_keys_json),
  }));
}

export function getDrugByIdFromDb(id: string): DrugItem | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM drugs WHERE id = ?").get(id) as any;
  if (!row) return null;

  return {
    id: row.id,
    genericName: row.generic_name,
    brandNames: JSON.parse(row.brand_names_json),
    category: row.category,
    receptorMechanism: row.receptor_mechanism,
    standardDose: JSON.parse(row.standard_dose_json),
    routes: JSON.parse(row.routes_json),
    onsetTime: row.onset_time,
    halfLife: row.half_life,
    indications: JSON.parse(row.indications_json),
    contraindications: JSON.parse(row.contraindications_json),
    fatalMistakes: JSON.parse(row.fatal_mistakes_json),
    adverseEffects: JSON.parse(row.adverse_effects_json),
    monitoringKeys: JSON.parse(row.monitoring_keys_json),
  };
}

export function upsertDrugToDb(drug: DrugItem) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO drugs (
      id, generic_name, brand_names_json, category, receptor_mechanism,
      standard_dose_json, routes_json, onset_time, half_life, indications_json,
      contraindications_json, fatal_mistakes_json, adverse_effects_json, monitoring_keys_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      generic_name=excluded.generic_name,
      brand_names_json=excluded.brand_names_json,
      category=excluded.category,
      receptor_mechanism=excluded.receptor_mechanism,
      standard_dose_json=excluded.standard_dose_json,
      routes_json=excluded.routes_json,
      onset_time=excluded.onset_time,
      half_life=excluded.half_life,
      indications_json=excluded.indications_json,
      contraindications_json=excluded.contraindications_json,
      fatal_mistakes_json=excluded.fatal_mistakes_json,
      adverse_effects_json=excluded.adverse_effects_json,
      monitoring_keys_json=excluded.monitoring_keys_json
  `);

  stmt.run(
    drug.id,
    drug.genericName,
    JSON.stringify(drug.brandNames),
    drug.category,
    drug.receptorMechanism,
    JSON.stringify(drug.standardDose),
    JSON.stringify(drug.routes),
    drug.onsetTime,
    drug.halfLife,
    JSON.stringify(drug.indications),
    JSON.stringify(drug.contraindications),
    JSON.stringify(drug.fatalMistakes),
    JSON.stringify(drug.adverseEffects),
    JSON.stringify(drug.monitoringKeys)
  );
}

// ----------------------------------------------------
// Quiz Repository Methods
// ----------------------------------------------------

export function getAllQuizzesFromDb(specialty?: string): QuizQuestion[] {
  const db = getDatabase();
  let rows: any[];
  if (specialty && specialty !== "all") {
    rows = db.prepare("SELECT * FROM quizzes WHERE specialty = ?").all(specialty) as any[];
  } else {
    rows = db.prepare("SELECT * FROM quizzes").all() as any[];
  }

  return rows.map((row) => ({
    id: row.id,
    topicId: row.topic_id,
    specialty: row.specialty,
    difficulty: row.difficulty,
    vignette: row.vignette,
    question: row.question,
    options: JSON.parse(row.options_json),
    correctOptionIndex: row.correct_option_index,
    explanation: JSON.parse(row.explanation_json),
  }));
}

export function upsertQuizToDb(quiz: QuizQuestion) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO quizzes (
      id, topic_id, specialty, difficulty, vignette, question,
      options_json, correct_option_index, explanation_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      topic_id=excluded.topic_id,
      specialty=excluded.specialty,
      difficulty=excluded.difficulty,
      vignette=excluded.vignette,
      question=excluded.question,
      options_json=excluded.options_json,
      correct_option_index=excluded.correct_option_index,
      explanation_json=excluded.explanation_json
  `);

  stmt.run(
    quiz.id,
    quiz.topicId,
    quiz.specialty,
    quiz.difficulty,
    quiz.vignette,
    quiz.question,
    JSON.stringify(quiz.options),
    quiz.correctOptionIndex,
    JSON.stringify(quiz.explanation)
  );
}

// ----------------------------------------------------
// Flashcard Repository Methods
// ----------------------------------------------------

export function getAllFlashcardsFromDb(specialty?: string): MedicalFlashcard[] {
  const db = getDatabase();
  let rows: any[];
  if (specialty && specialty !== "all") {
    rows = db.prepare("SELECT * FROM flashcards WHERE specialty = ?").all(specialty) as any[];
  } else {
    rows = db.prepare("SELECT * FROM flashcards").all() as any[];
  }

  return rows.map((row) => ({
    id: row.id,
    specialty: row.specialty,
    category: row.category,
    front: row.front,
    back: row.back,
    mnemonic: row.mnemonic || undefined,
  }));
}

export function upsertFlashcardToDb(card: MedicalFlashcard) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO flashcards (id, specialty, category, front, back, mnemonic)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      specialty=excluded.specialty,
      category=excluded.category,
      front=excluded.front,
      back=excluded.back,
      mnemonic=excluded.mnemonic
  `);

  stmt.run(card.id, card.specialty, card.category, card.front, card.back, card.mnemonic || null);
}

// ----------------------------------------------------
// Clinical Case Repository Methods
// ----------------------------------------------------

export function getAllCasesFromDb(specialty?: string): ClinicalCase[] {
  const db = getDatabase();
  let rows: any[];
  if (specialty && specialty !== "all") {
    rows = db.prepare("SELECT * FROM clinical_cases WHERE specialty = ? ORDER BY difficulty, id").all(specialty) as any[];
  } else {
    rows = db.prepare("SELECT * FROM clinical_cases ORDER BY difficulty, id").all() as any[];
  }

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    specialty: row.specialty,
    difficulty: row.difficulty,
    summary: row.summary,
    patientProfile: JSON.parse(row.patient_profile_json),
    initialVitals: JSON.parse(row.initial_vitals_json),
    naturalDeterioration: JSON.parse(row.natural_deterioration_json),
    anamnesisQuestions: JSON.parse(row.anamnesis_json),
    physicalExam: JSON.parse(row.physical_exam_json),
    paraclinical: JSON.parse(row.paraclinical_json),
    availableOrders: JSON.parse(row.available_orders_json),
    goldStandardDiagnosis: row.gold_standard_diagnosis,
    differentialDiagnoses: JSON.parse(row.differential_diagnoses_json),
    correctDisposition: row.correct_disposition,
    debriefingRubric: JSON.parse(row.debriefing_rubric_json),
  }));
}

export function getCaseByIdFromDb(id: string): ClinicalCase | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM clinical_cases WHERE id = ?").get(id) as any;
  if (!row) return null;

  return {
    id: row.id,
    title: row.title,
    specialty: row.specialty,
    difficulty: row.difficulty,
    summary: row.summary,
    patientProfile: JSON.parse(row.patient_profile_json),
    initialVitals: JSON.parse(row.initial_vitals_json),
    naturalDeterioration: JSON.parse(row.natural_deterioration_json),
    anamnesisQuestions: JSON.parse(row.anamnesis_json),
    physicalExam: JSON.parse(row.physical_exam_json),
    paraclinical: JSON.parse(row.paraclinical_json),
    availableOrders: JSON.parse(row.available_orders_json),
    goldStandardDiagnosis: row.gold_standard_diagnosis,
    differentialDiagnoses: JSON.parse(row.differential_diagnoses_json),
    correctDisposition: row.correct_disposition,
    debriefingRubric: JSON.parse(row.debriefing_rubric_json),
  };
}

export function upsertCaseToDb(c: ClinicalCase) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO clinical_cases (
      id, title, specialty, difficulty, summary,
      patient_profile_json, initial_vitals_json, natural_deterioration_json,
      anamnesis_json, physical_exam_json, paraclinical_json, available_orders_json,
      gold_standard_diagnosis, differential_diagnoses_json, correct_disposition,
      debriefing_rubric_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title=excluded.title,
      specialty=excluded.specialty,
      difficulty=excluded.difficulty,
      summary=excluded.summary,
      patient_profile_json=excluded.patient_profile_json,
      initial_vitals_json=excluded.initial_vitals_json,
      natural_deterioration_json=excluded.natural_deterioration_json,
      anamnesis_json=excluded.anamnesis_json,
      physical_exam_json=excluded.physical_exam_json,
      paraclinical_json=excluded.paraclinical_json,
      available_orders_json=excluded.available_orders_json,
      gold_standard_diagnosis=excluded.gold_standard_diagnosis,
      differential_diagnoses_json=excluded.differential_diagnoses_json,
      correct_disposition=excluded.correct_disposition,
      debriefing_rubric_json=excluded.debriefing_rubric_json
  `);

  stmt.run(
    c.id,
    c.title,
    c.specialty,
    c.difficulty,
    c.summary,
    JSON.stringify(c.patientProfile),
    JSON.stringify(c.initialVitals),
    JSON.stringify(c.naturalDeterioration),
    JSON.stringify(c.anamnesisQuestions),
    JSON.stringify(c.physicalExam),
    JSON.stringify(c.paraclinical),
    JSON.stringify(c.availableOrders),
    c.goldStandardDiagnosis,
    JSON.stringify(c.differentialDiagnoses),
    c.correctDisposition,
    JSON.stringify(c.debriefingRubric)
  );
}

// ----------------------------------------------------
// Ultrasound Atlas Repository Methods
// ----------------------------------------------------

export function getAllUltrasoundChaptersFromDb(): UltrasoundAtlasChapter[] {
  const db = getDatabase();
  const rows = db.prepare("SELECT * FROM ultrasound_atlas ORDER BY number ASC").all() as any[];

  return rows.map((row) => ({
    id: row.id,
    number: row.number,
    title: row.title,
    titleEn: row.title_en,
    icon: row.icon,
    color: row.color,
    topics: JSON.parse(row.topics_json),
  }));
}

export function getUltrasoundChapterByIdFromDb(id: string): UltrasoundAtlasChapter | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM ultrasound_atlas WHERE id = ?").get(id) as any;
  if (!row) return null;

  return {
    id: row.id,
    number: row.number,
    title: row.title,
    titleEn: row.title_en,
    icon: row.icon,
    color: row.color,
    topics: JSON.parse(row.topics_json),
  };
}

export function upsertUltrasoundChapterToDb(chapter: UltrasoundAtlasChapter) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO ultrasound_atlas (id, number, title, title_en, icon, color, topics_json)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      number=excluded.number,
      title=excluded.title,
      title_en=excluded.title_en,
      icon=excluded.icon,
      color=excluded.color,
      topics_json=excluded.topics_json
  `);

  stmt.run(
    chapter.id,
    chapter.number,
    chapter.title,
    chapter.titleEn,
    chapter.icon,
    chapter.color,
    JSON.stringify(chapter.topics)
  );
}

// ----------------------------------------------------
// ECG Diagnostic Criteria Repository Methods
// ----------------------------------------------------

export interface EcgWaveAnnotation {
  leadId: string;
  waveComponent: "P" | "PR" | "Q" | "R" | "S" | "ST" | "T" | "RR" | "DROPPED";
  label: string;
  targetCyclePhase: number;
  color: string;
  badgePlacement?: "top" | "bottom" | "interval";
  intervalEndPhase?: number;
  criterionIndex?: number;
}

export interface EcgClinicalPresentation {
  symptoms: string[];
  physicalSigns: string[];
  riskFactors?: string[];
}

export interface EcgMedicationDose {
  name: string;
  dose: string;
  route: string;
  notes?: string;
}

export interface EcgEmergencyManagement {
  priorityLevel: string;
  initialStabilization: string[];
  medications: EcgMedicationDose[];
  interventions: string[];
}

export interface EcgApproachAlgorithm {
  stepByStepApproach: string[];
  keyDifferentialFeatures: string[];
}

export interface EcgRedFlags {
  contraindications: string[];
  pitfalls: string[];
}

export interface EcgPatientCaseVignette {
  age: number;
  gender: string;
  chiefComplaint: string;
  historyOfPresentIllness: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    respiratoryRate: number;
    spO2: number;
    temperature: number;
  };
  labResults: Record<string, string>;
}

export interface EcgDiagnosisItem {
  id: string;
  name: string;
  nameEn: string;
  category: "ischemia" | "conduction" | "atrial" | "ventricular" | "metabolic" | "sinus";
  severity: "normal" | "borderline" | "abnormal" | "critical";
  systemId: string;
  systemName: string;
  anatomicalRegion?: string;
  criteria: string[];
  leadManifestations: Record<string, string>;
  annotations: EcgWaveAnnotation[];
  ecgMetrics: {
    expected_hr: string;
    pr_interval: string;
    qrs_duration: string;
    qt_interval: string;
    qrs_axis: string;
  };
  clinicalAction: string;
  differentialDiagnoses: string[];
  clinicalPresentation?: EcgClinicalPresentation;
  emergencyManagement?: EcgEmergencyManagement;
  approachAlgorithm?: EcgApproachAlgorithm;
  redFlags?: EcgRedFlags;
  patientCase?: EcgPatientCaseVignette;
}

function parseJsonSafely<T>(raw: string | undefined | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function getAllEcgDiagnosesFromDb(systemIdFilter?: string): EcgDiagnosisItem[] {
  const db = getDatabase();
  let query = "SELECT * FROM ecg_diagnoses";
  const params: any[] = [];
  if (systemIdFilter && systemIdFilter !== "all") {
    query += " WHERE system_id = ?";
    params.push(systemIdFilter);
  }
  query += " ORDER BY system_id, name";

  const rows = db.prepare(query).all(...params) as any[];
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    category: row.category,
    severity: row.severity,
    systemId: row.system_id || "sinus_node",
    systemName: row.system_name || "Nút Xoang & Nhịp Cơ Bản",
    anatomicalRegion: row.anatomical_region || "",
    criteria: parseJsonSafely(row.criteria_json, []),
    leadManifestations: parseJsonSafely(row.lead_manifestations_json, {}),
    annotations: parseJsonSafely(row.annotations_json, []),
    ecgMetrics: parseJsonSafely(row.ecg_metrics_json, {
      expected_hr: "60-100 bpm",
      pr_interval: "120-200 ms",
      qrs_duration: "80-100 ms",
      qt_interval: "380-420 ms",
      qrs_axis: "Bình thường",
    }),
    clinicalAction: row.clinical_action,
    differentialDiagnoses: parseJsonSafely(row.differential_diagnoses_json, []),
    clinicalPresentation: parseJsonSafely(row.clinical_presentation_json, undefined),
    emergencyManagement: parseJsonSafely(row.emergency_management_json, undefined),
    approachAlgorithm: parseJsonSafely(row.approach_algorithm_json, undefined),
    redFlags: parseJsonSafely(row.red_flags_json, undefined),
    patientCase: parseJsonSafely(row.patient_case_json, undefined),
  }));
}

export function getEcgDiagnosisByIdFromDb(id: string): EcgDiagnosisItem | null {
  const db = getDatabase();
  const row = db.prepare("SELECT * FROM ecg_diagnoses WHERE id = ?").get(id) as any;
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    nameEn: row.name_en,
    category: row.category,
    severity: row.severity,
    systemId: row.system_id || "sinus_node",
    systemName: row.system_name || "Nút Xoang & Nhịp Cơ Bản",
    anatomicalRegion: row.anatomical_region || "",
    criteria: parseJsonSafely(row.criteria_json, []),
    leadManifestations: parseJsonSafely(row.lead_manifestations_json, {}),
    annotations: parseJsonSafely(row.annotations_json, []),
    ecgMetrics: parseJsonSafely(row.ecg_metrics_json, {
      expected_hr: "60-100 bpm",
      pr_interval: "120-200 ms",
      qrs_duration: "80-100 ms",
      qt_interval: "380-420 ms",
      qrs_axis: "Bình thường",
    }),
    clinicalAction: row.clinical_action,
    differentialDiagnoses: parseJsonSafely(row.differential_diagnoses_json, []),
    clinicalPresentation: parseJsonSafely(row.clinical_presentation_json, undefined),
    emergencyManagement: parseJsonSafely(row.emergency_management_json, undefined),
    approachAlgorithm: parseJsonSafely(row.approach_algorithm_json, undefined),
    redFlags: parseJsonSafely(row.red_flags_json, undefined),
    patientCase: parseJsonSafely(row.patient_case_json, undefined),
  };
}

export interface EcgSystemSummary {
  systemId: string;
  systemName: string;
  count: number;
  pathologies: Array<{
    id: string;
    name: string;
    nameEn: string;
    severity: string;
    anatomicalRegion?: string;
  }>;
}

export function getAllEcgSystemsFromDb(): EcgSystemSummary[] {
  const allDiagnoses = getAllEcgDiagnosesFromDb();
  const systemMap = new Map<string, EcgSystemSummary>();

  for (const d of allDiagnoses) {
    const sId = d.systemId || "sinus_node";
    const sName = d.systemName || "Nút Xoang & Nhịp Cơ Bản";
    if (!systemMap.has(sId)) {
      systemMap.set(sId, {
        systemId: sId,
        systemName: sName,
        count: 0,
        pathologies: [],
      });
    }
    const entry = systemMap.get(sId)!;
    entry.count += 1;
    entry.pathologies.push({
      id: d.id,
      name: d.name,
      nameEn: d.nameEn,
      severity: d.severity,
      anatomicalRegion: d.anatomicalRegion,
    });
  }

  return Array.from(systemMap.values());
}

export function upsertEcgDiagnosisToDb(item: EcgDiagnosisItem) {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO ecg_diagnoses (
      id, name, name_en, category, severity,
      system_id, system_name, anatomical_region,
      criteria_json, lead_manifestations_json, annotations_json,
      ecg_metrics_json, clinical_action, differential_diagnoses_json,
      clinical_presentation_json, emergency_management_json,
      approach_algorithm_json, red_flags_json, patient_case_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name=excluded.name,
      name_en=excluded.name_en,
      category=excluded.category,
      severity=excluded.severity,
      system_id=excluded.system_id,
      system_name=excluded.system_name,
      anatomical_region=excluded.anatomical_region,
      criteria_json=excluded.criteria_json,
      lead_manifestations_json=excluded.lead_manifestations_json,
      annotations_json=excluded.annotations_json,
      ecg_metrics_json=excluded.ecg_metrics_json,
      clinical_action=excluded.clinical_action,
      differential_diagnoses_json=excluded.differential_diagnoses_json,
      clinical_presentation_json=excluded.clinical_presentation_json,
      emergency_management_json=excluded.emergency_management_json,
      approach_algorithm_json=excluded.approach_algorithm_json,
      red_flags_json=excluded.red_flags_json,
      patient_case_json=excluded.patient_case_json
  `);

  stmt.run(
    item.id,
    item.name,
    item.nameEn,
    item.category,
    item.severity,
    item.systemId || "sinus_node",
    item.systemName || "Nút Xoang & Nhịp Cơ Bản",
    item.anatomicalRegion || "",
    JSON.stringify(item.criteria || []),
    JSON.stringify(item.leadManifestations || {}),
    JSON.stringify(item.annotations || []),
    JSON.stringify(item.ecgMetrics || {}),
    item.clinicalAction || "",
    JSON.stringify(item.differentialDiagnoses || []),
    JSON.stringify(item.clinicalPresentation || {}),
    JSON.stringify(item.emergencyManagement || {}),
    JSON.stringify(item.approachAlgorithm || {}),
    JSON.stringify(item.redFlags || {}),
    JSON.stringify(item.patientCase || {})
  );
}

