export type MedicalSpecialty =
  | "cardiology"
  | "pulmonology"
  | "emergency"
  | "gastroenterology"
  | "endocrinology"
  | "pharmacology"
  | "radiology";

export interface MedicalLesson {
  id: string;
  title: string;
  specialty: MedicalSpecialty;
  category: "pathophysiology" | "paraclinical_theory" | "emergency_protocol";
  readTimeMinutes: number;
  summary: string;
  pathophysiology: {
    mechanism: string;
    keyHormonesOrReceptors?: string[];
    hemodynamicChanges?: string;
  };
  clinicalPresentation: {
    chiefComplaints: string[];
    physicalFindings: string[];
    redFlags: string[];
  };
  diagnosticCriteria: {
    goldStandard: string;
    ecgFindings?: string;
    imagingFindings?: string;
    labMarkers?: string[];
  };
  managementSummary: {
    immediateSteps: string[];
    firstLineDrugs: string[];
    contraindicatedInterventions: string[];
  };
  relatedDrugIds: string[];
}

export type DrugCategory =
  | "vasopressor_inotropic"
  | "cardiovascular_antiplatelet"
  | "respiratory_bronchodilator"
  | "corticosteroid"
  | "antibiotic"
  | "analgesic_sedative"
  | "emergency_metabolic";

export interface DrugItem {
  id: string;
  genericName: string;
  brandNames: string[];
  category: DrugCategory;
  receptorMechanism: string;
  standardDose: {
    adultEmergency: string;
    maintenance?: string;
  };
  routes: ("IV" | "IM" | "SC" | "Inhalation" | "PO" | "IV_Infusion")[];
  onsetTime: string;
  halfLife: string;
  indications: string[];
  contraindications: {
    absolute: string[];
    relative: string[];
  };
  fatalMistakes: string[];
  adverseEffects: string[];
  monitoringKeys: string[];
}

export interface QuizQuestion {
  id: string;
  topicId: string;
  specialty: MedicalSpecialty;
  difficulty: "beginner" | "intermediate" | "advanced";
  vignette: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: {
    whyCorrect: string;
    whyOthersIncorrect: string;
    clinicalPearl: string;
  };
}

export interface MedicalFlashcard {
  id: string;
  specialty: MedicalSpecialty;
  front: string;
  back: string;
  category: string;
  mnemonic?: string;
}
