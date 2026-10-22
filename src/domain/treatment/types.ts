export type TriageAcuity = "ESI-1" | "ESI-2" | "ESI-3";

export type PatientAppearance =
  | "calm"
  | "sweating_chest_pain"
  | "severe_respiratory_distress"
  | "cyanotic"
  | "unresponsive";

export interface Vitals {
  hr: number; // nhịp tim (lần/phút)
  bpSys: number; // huyết áp tâm thu (mmHg)
  bpDia: number; // huyết áp tâm trương (mmHg)
  spO2: number; // độ bão hòa oxy máu (%)
  rr: number; // nhịp thở (lần/phút)
  temp: number; // nhiệt độ (°C)
  glasgow: number; // thang điểm hôn mê Glasgow (3 - 15)
  rhythmId: string; // mã dải nhịp ECG tương ứng từ ecgWaveforms.ts
}

export interface PatientProfile {
  name: string;
  age: number;
  gender: "male" | "female";
  weightKg: number;
  chiefComplaint: string;
  triageAcuity: TriageAcuity;
  appearance: PatientAppearance;
  allergies: string[];
  pastMedicalHistory: string[];
}

export interface AnamnesisQuestion {
  id: string;
  questionText: string;
  answerText: string;
  clinicalClue: string;
}

export interface PhysicalExamFinding {
  system: "airway" | "breathing" | "circulation" | "neurological" | "abdomen" | "extremities";
  action: string;
  finding: string;
  isAbnormal: boolean;
}

export interface LabResultItem {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  isAbnormal: boolean;
}

export interface ParaclinicalStationData {
  ecgRhythmId: string;
  ecgLeadFindings: string;
  ultrasoundZoneId?: "subxiphoid" | "ruq" | "luq" | "suprapubic" | "lung_anterior";
  ultrasoundFinding?: string;
  xrayCaseId?: string;
  xrayFinding?: string;
  ctCaseId?: string;
  ctFinding?: string;
  labs: LabResultItem[];
}

export interface ClinicalOrderAction {
  id: string;
  category: "airway_breathing" | "fluids" | "medications" | "procedures" | "consultation";
  label: string;
  dosage?: string;
  route?: string;
  vitalsDelta: Partial<{
    hr: number;
    bpSys: number;
    bpDia: number;
    spO2: number;
    rr: number;
    temp: number;
    glasgow: number;
  }>;
  rhythmChange?: string;
  feedbackMessage: string;
  isEffective: boolean;
  isContraindicated: boolean;
  triggersCodeBlue?: boolean;
  dangerWarning?: string;
}

export interface DebriefingRubric {
  diagnosticPoints: number; // Tối đa 40 điểm
  safetyPoints: number; // Tối đa 30 điểm (trừ nặng nếu phạm chống chỉ định)
  treatmentPoints: number; // Tối đa 20 điểm
  speedPoints: number; // Tối đa 10 điểm
  goldStandardSummary: string;
  pitfallsToAvoid: string[];
  relatedLessonId: string;
}

export interface ClinicalCase {
  id: string;
  title: string;
  specialty: string;
  difficulty: "intern" | "resident" | "fellow";
  summary: string;
  patientProfile: PatientProfile;
  initialVitals: Vitals;
  naturalDeterioration: {
    intervalSeconds: number;
    vitalsDelta: Partial<Vitals>;
    warningMessage?: string;
  };
  anamnesisQuestions: AnamnesisQuestion[];
  physicalExam: PhysicalExamFinding[];
  paraclinical: ParaclinicalStationData;
  availableOrders: ClinicalOrderAction[];
  goldStandardDiagnosis: string;
  differentialDiagnoses: string[];
  correctDisposition: "cath_lab" | "emergency_or" | "icu" | "medical_ward" | "discharge";
  debriefingRubric: DebriefingRubric;
}
