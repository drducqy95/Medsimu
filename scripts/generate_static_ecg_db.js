const fs = require('fs');
const Database = require('better-sqlite3');

const db = new Database('./data/medsim.db');
const rows = db.prepare(`
  SELECT id, name, name_en, category, severity, criteria_json, annotations_json,
         lead_manifestations_json, ecg_metrics_json, clinical_action, differential_diagnoses_json
  FROM ecg_diagnoses
`).all();

const dict = {};
rows.forEach((r) => {
  dict[r.id] = {
    id: r.id,
    name: r.name,
    nameEn: r.name_en,
    category: r.category,
    severity: r.severity,
    criteria: JSON.parse(r.criteria_json || '[]'),
    annotations: JSON.parse(r.annotations_json || '[]'),
    leadManifestations: JSON.parse(r.lead_manifestations_json || '{}'),
    ecgMetrics: JSON.parse(r.ecg_metrics_json || '{}'),
    clinicalAction: r.clinical_action,
    differentialDiagnoses: JSON.parse(r.differential_diagnoses_json || '[]'),
  };
});

const fileContent = `// AUTO-GENERATED AUTHORITATIVE ECG DATABASE (SINGLE SOURCE OF TRUTH)
// Synchronized directly from SQLite medsim.db across all 31 clinical diagnoses

export interface StaticEcgDiagnosisItem {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  severity: "normal" | "borderline" | "abnormal" | "critical";
  criteria: string[];
  annotations: Array<{
    leadId: string;
    waveComponent: string;
    label: string;
    targetCyclePhase: number;
    color?: string;
    badgePlacement?: "top" | "bottom" | "interval" | "above" | "below";
    intervalEndPhase?: number;
    criterionIndex?: number;
  }>;
  leadManifestations: Record<string, string>;
  ecgMetrics: {
    expected_hr: string;
    pr_interval: string;
    qrs_duration: string;
    qt_interval: string;
    qrs_axis: string;
  };
  clinicalAction: string;
  differentialDiagnoses: string[];
}

export const ECG_STATIC_DATABASE: Record<string, StaticEcgDiagnosisItem> = ${JSON.stringify(dict, null, 2)};
`;

fs.writeFileSync('./src/domain/simulators/ecgStaticDatabase.ts', fileContent, 'utf8');
console.log('Successfully generated src/domain/simulators/ecgStaticDatabase.ts with ' + Object.keys(dict).length + ' diagnoses!');
