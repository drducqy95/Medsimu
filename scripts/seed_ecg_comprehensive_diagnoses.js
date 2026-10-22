/**
 * Comprehensive Seed Script: Nạp 31 Bệnh Lý Điện Tâm Đồ Chuẩn Y Khoa Theo 9 Hệ Thống Bệnh Học
 * Tích hợp: Tiêu Chuẩn Vàng (AHA/ESC/VNHA), Ánh Xạ Tọa Độ Sóng, Phác Đồ Xử Trí Khẩn Cấp, Thuốc/Liều, Cạm Bẫy Cấm Kỵ & Ca Bệnh Mẫu
 */

const Database = require("better-sqlite3");
const path = require("path");
const { ALL_COMPREHENSIVE_ANNOTATIONS } = require("./comprehensive_annotations_data.js");

const DB_PATH = path.join(__dirname, "..", "data", "medsim.db");
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

// 1. Tạo bảng và cập nhật cột nếu thiếu
db.exec(`
  CREATE TABLE IF NOT EXISTS ecg_diagnoses (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    name_en TEXT NOT NULL,
    category TEXT NOT NULL,
    severity TEXT NOT NULL,
    system_id TEXT NOT NULL DEFAULT 'sinus_node',
    system_name TEXT NOT NULL DEFAULT 'Nút Xoang & Nhịp Cơ Bản',
    anatomical_region TEXT DEFAULT '',
    criteria_json TEXT NOT NULL,
    lead_manifestations_json TEXT NOT NULL,
    annotations_json TEXT NOT NULL DEFAULT '[]',
    ecg_metrics_json TEXT NOT NULL,
    clinical_action TEXT NOT NULL,
    differential_diagnoses_json TEXT NOT NULL,
    clinical_presentation_json TEXT NOT NULL DEFAULT '{}',
    emergency_management_json TEXT NOT NULL DEFAULT '{}',
    approach_algorithm_json TEXT NOT NULL DEFAULT '{}',
    red_flags_json TEXT NOT NULL DEFAULT '{}',
    patient_case_json TEXT NOT NULL DEFAULT '{}',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const columns = [
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

for (const c of columns) {
  try {
    db.exec(`ALTER TABLE ecg_diagnoses ADD COLUMN ${c.name} ${c.type};`);
  } catch (e) {}
}

// 2. Dữ liệu 31 bệnh lý theo 9 hệ thống
const diagnoses = [
  // =========================================================================
  // HỆ I: NÚT XOANG & NHỊP CƠ BẢN (sinus_node)
  // =========================================================================
  {
    id: "normal_sinus",
    name: "Nhịp Xoang Bình Thường",
    name_en: "Normal Sinus Rhythm (NSR)",
    category: "sinus",
    severity: "normal",
    system_id: "sinus_node",
    system_name: "Nút Xoang & Nhịp Cơ Bản",
    anatomical_region: "Nút xoang nhĩ (SA Node)",
    criteria: [
      "Sóng P xoang: Đồng dạng đi trước mỗi phức bộ QRS",
      "Sóng P âm ở aVR: Sóng P âm ở aVR, dương ở DI, DII, aVF",
      "Khoảng PR bình thường: Cố định và bình thường từ 0.12s đến 0.20s (3 - 5 ô nhỏ)",
      "Khoảng cách R-R đều: Tần số tim bình thường 60 đến 100 chu kỳ/phút",
      "QRS hẹp & ST đẳng điện: QRS < 120ms, đoạn ST đẳng điện và sóng T bình thường",
    ],
    lead_manifestations: {
      DII: "Sóng P dương rõ nét 1.5mm, khoảng PR = 160ms, QRS hẹp 85ms",
      aVR: "Sóng P âm, QRS âm, T âm toàn bộ",
      V1: "P hai pha (+/-) nhẹ, rS nhỏ",
      V5: "Sóng R cao, T dương bình thường",
    },
    annotations: [
      { leadId: "DII", waveComponent: "P", label: "Sóng P xoang dương trước QRS", targetCyclePhase: 0.12, color: "#059669", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "aVR", waveComponent: "P", label: "Sóng P âm ở aVR chuẩn", targetCyclePhase: 0.12, color: "#059669", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "DII", waveComponent: "PR", label: "↔ PR bình thường 160ms (3-5 ô nhỏ)", targetCyclePhase: 0.12, intervalEndPhase: 0.28, color: "#059669", badgePlacement: "interval", criterionIndex: 2 },
      { leadId: "II", waveComponent: "RR", label: "↔ R-R đều (HR = 75 bpm, 4 ô lớn)", targetCyclePhase: 0.20, intervalEndPhase: 0.80, color: "#059669", badgePlacement: "interval", criterionIndex: 3 },
      { leadId: "V1", waveComponent: "QRS", label: "QRS hẹp 85ms (< 120ms)", targetCyclePhase: 0.24, color: "#059669", badgePlacement: "top", criterionIndex: 4 },
      { leadId: "II", waveComponent: "ST", label: "ST đẳng điện, T dương bình thường", targetCyclePhase: 0.35, color: "#059669", badgePlacement: "top", criterionIndex: 4 },
    ],
    ecg_metrics: {
      expected_hr: "60 - 100 bpm",
      pr_interval: "120 - 200 ms",
      qrs_duration: "80 - 100 ms",
      qt_interval: "380 - 420 ms",
      qrs_axis: "+30° đến +60° (Trục bình thường)",
    },
    clinical_action: "Điện tâm đồ cơ bản bình thường. Duy trì lối sống lành mạnh, tái khám sức khỏe định kỳ.",
    differential_diagnoses: ["Nhịp bộ nối", "Nhịp nhĩ lạc chỗ"],
    clinical_presentation: {
      symptoms: ["Không có triệu chứng đau ngực hay khó thở", "Thể trạng khỏe mạnh bình thường"],
      physical_signs: ["Huyết áp 120/80 mmHg", "Mạch 75 lần/phút đều rõ", "SpO2 99% khí trời", "Tim T1, T2 rõ, không âm thổi"],
      risk_factors: ["Không có tiền sử bệnh lý tim mạch"],
    },
    emergency_management: {
      priorityLevel: "Mức 5 - Khám thường quy",
      initialStabilization: ["Không cần can thiệp cấp cứu"],
      medications: [],
      interventions: ["Tư vấn theo dõi sức khỏe tổng quát định kỳ"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Kỹ thuật: 25 mm/s, 10 mm/mV, aVR âm khẳng định mắc đúng điện cực.",
        "2. Tần số: Đếm khoảng R-R = 4 ô lớn = 75 bpm (bình thường 60-100).",
        "3. Nhịp: P đi trước mỗi QRS, P dương ở DII, âm aVR -> Nhịp xoang.",
        "4. Trục: DI dương, aVF dương -> Trục trung gian bình thường.",
        "5. Sóng P và PR: P rộng 0.08s, PR 0.16s (trong giới hạn 0.12-0.20s).",
        "6. QRS và ST-T: QRS hẹp 0.08s, ST đẳng điện, T dương.",
        "7. QTc: 400ms (< 440ms nam, < 460ms nữ).",
      ],
      key_differential_features: ["P xoang phân biệt với nhịp bộ nối (P âm DII hoặc sau QRS) và nhịp nhĩ (P dị dạng)."],
    },
    red_flags: {
      contraindications: ["Không dùng thuốc chống loạn nhịp khi nhịp xoang bình thường"],
      pitfalls: ["Mắc ngược dây tay phải và tay trái làm P và QRS đảo ngược ở DI và aVR."],
    },
    patient_case: {
      age: 28,
      gender: "Nam",
      chiefComplaint: "Khám sức khỏe tiền hôn nhân",
      historyOfPresentIllness: "Nam thanh niên 28 tuổi, không hút thuốc lá, sinh hoạt thể thao đều đặn, đi khám sức khỏe tổng quát theo kế hoạch.",
      vitals: { bloodPressure: "118/76 mmHg", heartRate: 72, respiratoryRate: 16, spO2: 99, temperature: 36.6 },
      labResults: { "Glucose": "5.1 mmol/L", "Cholesterol": "4.2 mmol/L", "Creatinine": "78 umol/L" },
    },
  },

  {
    id: "sinus_bradycardia",
    name: "Nhịp Chậm Xoang",
    name_en: "Sinus Bradycardia",
    category: "sinus",
    severity: "borderline",
    system_id: "sinus_node",
    system_name: "Nút Xoang & Nhịp Cơ Bản",
    anatomical_region: "Nút xoang nhĩ (SA Node)",
    criteria: [
      "Tần số phát nhịp của nút xoang < 60 chu kỳ/phút",
      "Sóng P xoang bình thường đi trước mỗi phức bộ QRS",
      "Khoảng PR bình thường (0.12 - 0.20s)",
      "Phức bộ QRS hẹp bình thường (< 0.12s), R-R đều kéo dài",
    ],
    lead_manifestations: {
      DII: "Khoảng R-R kéo dài 6-7 ô lớn (tần số 45-50 bpm), P xoang dương",
      aVF: "Sóng P dương, khoảng PR = 170ms",
      "V1-V6": "Hình thái sóng bình thường nhưng chu kỳ chậm",
    },
    annotations: [
      { leadId: "DII", waveComponent: "RR", label: "↔ R-R kéo dài > 5 ô lớn (HR < 60 bpm)", targetCyclePhase: 0.12, intervalEndPhase: 0.75, color: "#d97706", badgePlacement: "interval", criterionIndex: 0 },
      { leadId: "DII", waveComponent: "P", label: "P xoang bình thường dẫn QRS", targetCyclePhase: 0.12, color: "#059669", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "II", waveComponent: "RR", label: "Nhịp chậm xoang đều 48 bpm", targetCyclePhase: 0.20, intervalEndPhase: 0.80, color: "#d97706", badgePlacement: "interval", criterionIndex: 3 },
    ],
    ecg_metrics: {
      expected_hr: "40 - 59 bpm",
      pr_interval: "140 - 200 ms",
      qrs_duration: "80 - 100 ms",
      qt_interval: "420 - 460 ms",
      qrs_axis: "+45° (Bình thường)",
    },
    clinical_action: "Đánh giá triệu chứng huyết động (choáng váng, tụt huyết áp). Nếu có triệu chứng: Atropin 0.5 - 1mg TM. Nếu không triệu chứng (vận động viên): theo dõi.",
    differential_diagnoses: ["Block nhĩ thất độ II kiểu 2:1", "Hội chứng suy nút xoang", "Ngừng xoang"],
    clinical_presentation: {
      symptoms: ["Hoa mắt, choáng váng nhẹ khi đứng dậy", "Mệt mỏi khi gắng sức hoặc không có triệu chứng (vận động viên)"],
      physical_signs: ["Huyết áp 105/65 mmHg", "Mạch chậm 46 lần/phút đều", "Chi ấm, tri giác tỉnh táo"],
      risk_factors: ["Đang dùng thuốc chẹn Beta giao cảm, Digoxin hoặc tập thể thao cường độ cao"],
    },
    emergency_management: {
      priorityLevel: "Mức 3 - Cần đánh giá huyết động",
      initialStabilization: ["Mắc monitor theo dõi nhịp tim liên tục", "Lập đường truyền tĩnh mạch"],
      medications: [
        { name: "Atropin Sulfat", dose: "0.5mg - 1mg tiêm TM nhanh", route: "IV Push", notes: "Lặp lại mỗi 3-5 phút nếu huyết áp tụt, tối đa 3mg" },
        { name: "Dopamine", dose: "5 - 20 mcg/kg/phút", route: "Truyền TM", notes: "Dùng khi trơ với Atropin kèm tụt HA" },
      ],
      interventions: ["Chuẩn bị máy tạo nhịp ngoài nếu nhịp chậm có tụt huyết áp trơ với thuốc"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Xác nhận P xoang: Có P trước mỗi QRS, P dương DII.",
        "2. Đếm tần số: R-R > 5 ô lớn -> Tần số < 60 bpm.",
        "3. Đánh giá huyết động: Bệnh nhân có tụt HA, đau ngực, lơ mơ hay không?",
        "4. Tìm nguyên nhân: Thuốc (Beta-blocker, Non-DHP CCB), suy giáp, tăng áp lực nội sọ.",
      ],
      key_differential_features: ["Block AV 2:1 có 2 sóng P cho 1 QRS; Nhịp chậm xoang tỉ lệ P:QRS luôn là 1:1."],
    },
    red_flags: {
      contraindications: ["Tuyệt đối không dùng chẹn beta, chẹn canxi nhóm verapamil/diltiazem khi đang nhịp chậm"],
      pitfalls: ["Dùng liều Atropin quá thấp (< 0.5mg) có thể gây ức chế ngược làm chậm nhịp tim hơn."],
    },
    patient_case: {
      age: 64,
      gender: "Nữ",
      chiefComplaint: "Choáng váng, muốn ngất khi đứng dậy",
      historyOfPresentIllness: "Bệnh nhân nữ 64 tuổi có tiền sử tăng huyết áp đang dùng Bisoprolol 5mg/ngày. Sáng nay thấy hoa mắt choáng váng, đo mạch tại nhà 44 lần/phút.",
      vitals: { bloodPressure: "95/60 mmHg", heartRate: 46, respiratoryRate: 18, spO2: 97, temperature: 36.8 },
      labResults: { "K+": "4.2 mmol/L", "TSH": "2.4 uIU/mL", "Troponin T": "< 14 ng/L" },
    },
  },

  {
    id: "sinus_tachycardia",
    name: "Nhịp Nhanh Xoang",
    name_en: "Sinus Tachycardia",
    category: "sinus",
    severity: "borderline",
    system_id: "sinus_node",
    system_name: "Nút Xoang & Nhịp Cơ Bản",
    anatomical_region: "Nút xoang nhĩ (SA Node)",
    criteria: [
      "Tần số nhát bóp nút xoang > 100 chu kỳ/phút (thường 100 - 150 bpm)",
      "Sóng P xoang bình thường đi trước mỗi phức bộ QRS",
      "Khoảng cách R-R đều đặn, khoảng PR hơi ngắn lại sinh lý",
      "Khởi đầu và kết thúc từ từ, đáp ứng với nghiệm pháp cường phó giao cảm",
    ],
    lead_manifestations: {
      DII: "Khoảng R-R ngắn < 3 ô lớn (tần số 120 bpm), P xoang dương",
      V1: "QRS hẹp, T có thể trùng nhẹ vào pha cuối của P chu kỳ kế",
      aVR: "Sóng P âm rõ",
    },
    annotations: [
      { leadId: "DII", waveComponent: "RR", label: "↔ R-R ngắn < 3 ô lớn (HR > 100 bpm)", targetCyclePhase: 0.12, intervalEndPhase: 0.50, color: "#d97706", badgePlacement: "interval", criterionIndex: 0 },
      { leadId: "DII", waveComponent: "P", label: "P xoang dương trước mỗi QRS", targetCyclePhase: 0.12, color: "#059669", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "II", waveComponent: "RR", label: "Nhịp nhanh xoang đều 120 bpm", targetCyclePhase: 0.15, intervalEndPhase: 0.55, color: "#d97706", badgePlacement: "interval", criterionIndex: 2 },
    ],
    ecg_metrics: {
      expected_hr: "101 - 150 bpm",
      pr_interval: "120 - 160 ms",
      qrs_duration: "75 - 95 ms",
      qt_interval: "300 - 350 ms",
      qrs_axis: "+60° (Bình thường)",
    },
    clinical_action: "Tìm và điều trị nguyên nhân gốc rễ (sốt, mất máu, giảm thể tích, đau đớn, nhiễm trùng, cường giáp, thuyên tắc phổi). Không điều trị cắt cơn bằng sốc điện.",
    differential_diagnoses: ["Nhịp nhanh kịch phát trên thất (SVT)", "Cuồng nhĩ dẫn truyền 2:1", "Rung nhĩ đáp ứng thất nhanh"],
    clinical_presentation: {
      symptoms: ["Hồi hộp, đánh trống ngực dồn dập", "Cảm giác tim đập nhanh trong lồng ngực kèm sốt hoặc khó thở"],
      physical_signs: ["Mạch nhanh 125 lần/phút đều", "Huyết áp 130/80 mmHg", "Nhiệt độ 38.8°C", "Thở nhanh 22 lần/phút"],
      risk_factors: ["Đang nhiễm trùng, mất nước cấp, căng thẳng lo âu hoặc lạm dụng cà phê/chất kích thích"],
    },
    emergency_management: {
      priorityLevel: "Mức 3 - Điều trị nguyên nhân gốc",
      initialStabilization: ["Hạ sốt, bù dịch đẳng trương NaCl 0.9% nếu có mất nước", "Giảm đau, an thần nếu lo âu"],
      medications: [
        { name: "Paracetamol", dose: "1000mg truyền tĩnh mạch", route: "IV Infusion", notes: "Hạ sốt nếu nhịp nhanh do sốt" },
        { name: "NaCl 0.9%", dose: "500ml - 1000ml truyền TM nhanh", route: "IV Infusion", notes: "Bù dịch khi nhịp nhanh do thiếu thể tích" },
      ],
      interventions: ["Không sốc điện, không xoa xoang cảnh cắt cơn (chỉ làm chậm nhịp thoáng qua)"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Xác định tần số: R-R < 3 ô lớn -> Tần số 100-150 bpm.",
        "2. Kiểm tra sóng P: Sóng P có dạng xoang hay không? Nếu P ẩn trong QRS nghĩ SVT; nếu răng cưa nghĩ Cuồng nhĩ.",
        "3. Tìm nguyên nhân kích hoạt: Nhiễm trùng, thiếu máu, bão giáp, mất nước, ngộ độc.",
      ],
      key_differential_features: ["Nhịp nhanh xoang thay đổi tần số từ từ; SVT khởi phát và kết thúc đột ngột dạng On/Off."],
    },
    red_flags: {
      contraindications: ["Không sốc điện chuyển nhịp cho nhịp nhanh xoang phản ứng"],
      pitfalls: ["Nhầm cuồng nhĩ 2:1 tần số 150 bpm với nhịp nhanh xoang. Cần soi kỹ sóng răng cưa F ở DII, DIII, aVF."],
    },
    patient_case: {
      age: 23,
      gender: "Nữ",
      chiefComplaint: "Sốt cao rét run và hồi hộp đánh trống ngực",
      historyOfPresentIllness: "Bệnh nhân nữ 23 tuổi sốt cao 39°C ngày thứ 2 do viêm amidan cấp mủ, cảm giác tim đập rất nhanh trong ngực.",
      vitals: { bloodPressure: "115/70 mmHg", heartRate: 128, respiratoryRate: 22, spO2: 98, temperature: 39.1 },
      labResults: { "WBC": "15.4 G/L", "CRP": "45 mg/L", "Hemoglobin": "128 g/L" },
    },
  },

  // =========================================================================
  // HỆ II: HỘI CHỨNG MẠCH VÀNH CẤP - THEO VÙNG CẤP MÁU (acute_coronary)
  // =========================================================================
  {
    id: "stemi_inferior",
    name: "Nhồi Máu Cơ Tim Cấp ST Chênh Lên Thành Dưới",
    name_en: "Acute Inferior ST-Elevation Myocardial Infarction",
    category: "ischemia",
    severity: "critical",
    system_id: "acute_coronary",
    system_name: "Hội Chứng Mạch Vành Cấp",
    anatomical_region: "Thành dưới (ĐM Vành Phải RCA / Nhánh Mũ LCx)",
    criteria: [
      "ST chênh lên dạng vòm ≥ 1mm (0.1 mV) ở ít nhất 2 chuyển đạo liên tiếp thành dưới: DII, DIII, aVF",
      "Hình ảnh soi gương (reciprocal): ST chênh xuống ≥ 0.5 - 1mm ở chuyển đạo thành bên cao (DI, aVL)",
      "Sóng Q hoại tử rộng ≥ 0.04s hoặc sâu ≥ 1/4 biên độ sóng R tương ứng ở DIII, aVF",
      "Sóng T tối cấp dương cao đối xứng trước khi chuyển sang ST chênh vòm",
    ],
    lead_manifestations: {
      DII: "ST chênh lên dạng vòm 3.0mm, sóng T dương cao",
      DIII: "ST chênh lên vòm 3.8mm, sóng Q bệnh lý sâu 0.35mV",
      aVF: "ST chênh lên 3.2mm",
      DI: "Hình ảnh soi gương: ST chênh xuống 1.5mm, T âm",
      aVL: "Hình ảnh soi gương: ST chênh xuống 2.0mm, T âm sâu",
      "V1-V3": "Đẳng điện hoặc ST chênh xuống nhẹ (gợi ý thiếu máu sau dưới)",
    },
    annotations: [
      { leadId: "DII", waveComponent: "ST", label: "▲ ST chênh vòm +3.0mm (≥1mm)", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "DIII", waveComponent: "Q", label: "Q hoại tử ≥0.04s", targetCyclePhase: 0.20, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 2 },
      { leadId: "DIII", waveComponent: "ST", label: "▲ ST chênh lên +3.8mm", targetCyclePhase: 0.31, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "aVF", waveComponent: "ST", label: "▲ ST chênh lên +3.2mm", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "aVL", waveComponent: "ST", label: "▼ ST soi gương -2.0mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "DI", waveComponent: "ST", label: "▼ ST soi gương -1.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 1 },
    ],
    ecg_metrics: {
      expected_hr: "50 - 90 bpm",
      pr_interval: "160 - 210 ms",
      qrs_duration: "85 - 100 ms",
      qt_interval: "400 - 430 ms",
      qrs_axis: "+90° đến +120° (Trục phải)",
    },
    clinical_action: "Kích hoạt Code STEMI chuyển Can thiệp mạch vành qua da (PCI) thì đầu trong 90 phút. Kháng kết tập tiểu cầu kép (Aspirin 300mg + Ticagrelor 180mg) + Heparin. Đo ngay V3R, V4R khảo sát thất phải. TUYỆT ĐỐI TRÁNH Nitrat nếu có nhồi máu thất phải!",
    differential_diagnoses: ["Viêm màng ngoài tim cấp", "Tái cực sớm lành tính", "Phình vách thất cũ"],
    clinical_presentation: {
      symptoms: ["Đau thắt ngực dữ dội sau xương ức lan lên cằm và tay trái > 30 phút", "Vã mồ hôi hột, nôn ói, cồn cào thượng vị giống đau dạ dày"],
      physical_signs: ["Huyết áp 110/70 mmHg (hoặc tụt nếu có biến chứng thất phải)", "Mạch chậm 54 bpm", "Tĩnh mạch cổ nổi nếu kèm NMCT thất phải"],
      risk_factors: ["Hút thuốc lá lâu năm, tăng huyết áp, đái tháo đường typ 2, rối loạn lipid máu"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn (Code Red)",
      initialStabilization: ["Thở oxy nếu SpO2 < 90%", "Lập 2 đường truyền TM lớn", "Mắc monitor theo dõi liên tục"],
      medications: [
        { name: "Aspirin", dose: "300mg nhai nuốt ngay", route: "Uống", notes: "Thuốc chống kết tập tiểu cầu bắt buộc" },
        { name: "Ticagrelor", dose: "180mg uống ngay", route: "Uống", notes: "Hoặc Clopidogrel 600mg nếu không có Ticagrelor" },
        { name: "Enoxaparin", dose: "30mg tiêm TM sau đó 1mg/kg tiêm dưới da", route: "IV / SC", notes: "Thuốc chống đông nền" },
        { name: "Morphin Sulfat", dose: "2 - 4mg tiêm TM chậm", route: "IV Push", notes: "Chỉ dùng khi đau ngực nhiều và huyết áp ổn định" },
      ],
      interventions: ["Chụp và can thiệp mạch vành qua da (PCI) thì đầu khẩn cấp trong vòng 90 phút từ cửa đến bóng"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Nhận diện ST chênh lên: Tìm ST vòm ở DII, DIII, aVF ≥ 1mm.",
        "2. Tìm hình ảnh soi gương: Bắt buộc tìm ST chênh xuống ở aVL và DI để khẳng định NMCT cấp.",
        "3. So sánh ST chênh ở DIII so với DII: Nếu DIII > DII gợi ý tắc RCA; nếu DII > DIII gợi ý tắc LCx.",
        "4. Kéo chuyển đạo bên phải V3R, V4R: Nếu ST chênh lên ở V4R -> Khẳng định có nhồi máu thất phải đi kèm.",
      ],
      key_differential_features: ["Viêm màng ngoài tim ST chênh lõm lan tỏa không có soi gương và kèm PR chênh xuống."],
    },
    red_flags: {
      contraindications: ["CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI Nitroglycerin và Morphin nếu có nhồi máu cơ tim thất phải kèm theo vì gây tụt huyết áp trụy mạch nghiêm trọng!"],
      pitfalls: ["Nhầm lẫn đau thượng vị và nôn ói do NMCT thành dưới với viêm dạ dày cấp tính, bỏ lỡ thời gian vàng can thiệp."],
    },
    patient_case: {
      age: 61,
      gender: "Nam",
      chiefComplaint: "Đau thắt ngực dữ dội sau xương ức kèm vã mồ hôi giờ thứ 2",
      historyOfPresentIllness: "Bệnh nhân nam 61 tuổi, tiền sử hút thuốc lá 30 gói-năm, đột ngột đau thắt nghẹn ngực sau xương ức lan lên vai trái, vã mồ hôi, buồn nôn, kéo dài liên tục 2 giờ không giảm.",
      vitals: { bloodPressure: "105/65 mmHg", heartRate: 58, respiratoryRate: 20, spO2: 96, temperature: 36.7 },
      labResults: { "Troponin I siêu nhạy": "1450 ng/L (bình thường < 26)", "CK-MB": "48 U/L", "K+": "4.1 mmol/L" },
    },
  },

  {
    id: "stemi_anterior",
    name: "Nhồi Máu Cơ Tim Cấp ST Chênh Lên Thành Trước Rộng",
    name_en: "Acute Anterior / Extensive Anterior STEMI",
    category: "ischemia",
    severity: "critical",
    system_id: "acute_coronary",
    system_name: "Hội Chứng Mạch Vành Cấp",
    anatomical_region: "Trước vách & Trước rộng (ĐM Liên Thất Trước LAD)",
    criteria: [
      "ST chênh lên dạng vòm bia mộ (Tombstoning) ≥ 2mm ở V1-V3 và/hoặc ≥ 1mm ở V4-V6",
      "Mất sóng r tăng trưởng bình thường (dạng rS cụt hoặc QS hoại tử xuyên thành từ V1-V4)",
      "ST chênh xuống soi gương ở các chuyển đạo thành dưới: DII, DIII, aVF",
      "Sóng T cao nhọn tối cấp hoặc hòa lẫn trực tiếp vào đoạn ST tạo thành vòm bia mộ",
    ],
    lead_manifestations: {
      V1: "ST chênh lên 3.0mm, sóng r nhỏ cụt ngủn",
      V2: "ST chênh lên dạng bia mộ khổng lồ 5.0mm, sóng T khổng lồ",
      V3: "ST chênh lên dạng bia mộ 4.5mm, mất sóng R dạng QS",
      V4: "ST chênh lên 3.5mm, sóng T dương cao",
      V5: "ST chênh lên 2.0mm",
      V6: "ST chênh lên 1.5mm",
      DII: "ST chênh xuống soi gương 1.5mm",
      DIII: "ST chênh xuống soi gương 2.0mm",
      aVF: "ST chênh xuống soi gương 1.8mm",
    },
    annotations: [
      { leadId: "V2", waveComponent: "ST", label: "▲ ST Vòm Bia Mộ (Tombstone) +5.0mm", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "V3", waveComponent: "ST", label: "▲ ST Tombstone +4.5mm", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "V1", waveComponent: "Q", label: "Mất sóng r dạng QS", targetCyclePhase: 0.20, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "DIII", waveComponent: "ST", label: "▼ ST soi gương -2.0mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 2 },
      { leadId: "aVF", waveComponent: "ST", label: "▼ ST soi gương -1.8mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 2 },
    ],
    ecg_metrics: {
      expected_hr: "80 - 110 bpm",
      pr_interval: "150 - 180 ms",
      qrs_duration: "95 - 115 ms",
      qt_interval: "410 - 450 ms",
      qrs_axis: "-15° đến -45° (Trục trái)",
    },
    clinical_action: "Báo động đỏ Can thiệp Mạch vành cấp cứu (Primary PCI) trong 90 phút. Đây là thể nhồi máu có vùng hoại tử lớn nhất, nguy cơ suy tim cấp, phù phổi cấp và sốc tim cực cao. Chống ngưng tập tiểu cầu kép + Heparin + Chuẩn bị bóng đối xung nội động mạch chủ IABP nếu sốc tim.",
    differential_diagnoses: ["Phình vách thất trái cũ", "Viêm cơ tim cấp", "Hội chứng Brugada"],
    clinical_presentation: {
      symptoms: ["Đau thắt ngực như bị tảng đá đè nghẹt thở", "Khó thở dữ dội, vã mồ hôi như tắm, hoảng hốt lo âu"],
      physical_signs: ["Huyết áp 145/90 mmHg (giai đoạn đầu) hoặc tụt < 90 nếu sốc tim", "Ran ẩm nổ ở hai đáy phổi", "Tiếng tim T3 gallop"],
      risk_factors: ["Tăng huyết áp, ĐTĐ typ 2, xơ vữa mạch máu, tiền sử gia đình nhồi máu cơ tim sớm"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn (Code Red)",
      initialStabilization: ["Thở oxy kính hoặc mask túi giữ SpO2 > 95%", "Mắc monitor theo dõi loạn nhịp thất liên tục"],
      medications: [
        { name: "Aspirin", dose: "300mg nhai nuốt", route: "Uống", notes: "Uống ngay tại phòng cấp cứu" },
        { name: "Ticagrelor", dose: "180mg uống", route: "Uống", notes: "Tác dụng nhanh và mạnh hơn Clopidogrel" },
        { name: "Heparin không phân đoạn", dose: "Bolus 60 đơn vị/kg (tối đa 4000 UI) sau đó duy trì 12 UI/kg/h", route: "IV", notes: "Chuẩn bị vào phòng Cath Lab" },
        { name: "Furosemide", dose: "20 - 40mg tiêm TM", route: "IV Push", notes: "Dùng nếu có triệu chứng ứ huyết phổi/phù phổi cấp" },
      ],
      interventions: ["Can thiệp PCI thì đầu tái thông nhánh LAD khẩn cấp"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Khảo sát các chuyển đạo trước ngực V1-V6: Tìm ST chênh vòm bia mộ.",
        "2. Đánh giá độ lan rộng: V1-V2 (vách), V3-V4 (trước), V5-V6 (mỏm/thành bên) -> Trước rộng.",
        "3. Tìm biến chứng: Tìm block nhánh phải mới xuất hiện hoặc block AV độ cao (tắc đoạn gần LAD).",
        "4. Lắng nghe phổi: Kiểm tra ran ẩm để xếp độ Killip (Killip I: không ran, Killip II: ran < 1/2 phổi, Killip III: phù phổi cấp, Killip IV: sốc tim).",
      ],
      key_differential_features: ["Phình vách thất có ST chênh lên mạn tính không thay đổi động học theo thời gian."],
    },
    red_flags: {
      contraindications: ["Không dùng thuốc chẹn beta giao cảm ngay khi bệnh nhân đang có dấu hiệu suy tim cấp (Killip II-IV) hoặc có nguy cơ sốc tim"],
      pitfalls: ["Chậm trễ kích hoạt phòng Cath Lab vì chờ kết quả men tim Troponin (STEMI chẩn đoán bằng điện tim đồ, KHÔNG CHỜ Troponin)."],
    },
    patient_case: {
      age: 58,
      gender: "Nam",
      chiefComplaint: "Đau nghẹn ngực trái dữ dội kèm khó thở thở dốc 45 phút",
      historyOfPresentIllness: "Bệnh nhân nam 58 tuổi, hút thuốc lá 20 năm, đột ngột đau tức nghẹt ngực như có đá tảng đè lên tim khi đang leo cầu thang, kèm khó thở, vã mồ hôi đầm đìa.",
      vitals: { bloodPressure: "135/85 mmHg", heartRate: 98, respiratoryRate: 24, spO2: 93, temperature: 36.9 },
      labResults: { "Troponin T": "2100 ng/L", "Lactate máu": "2.8 mmol/L", "BNP": "650 pg/mL" },
    },
  },

  {
    id: "stemi_lateral",
    name: "Nhồi Máu Cơ Tim Cấp ST Chênh Lên Thành Bên",
    name_en: "Acute Lateral ST-Elevation Myocardial Infarction",
    category: "ischemia",
    severity: "critical",
    system_id: "acute_coronary",
    system_name: "Hội Chứng Mạch Vành Cấp",
    anatomical_region: "Thành bên cao & Bên thấp (ĐM Mũ LCx / Nhánh Chéo Diagonal)",
    criteria: [
      "ST chênh lên ≥ 1mm ở chuyển đạo thành bên cao (DI, aVL) và/hoặc thành bên thấp (V5, V6)",
      "ST chênh xuống soi gương ở các chuyển đạo thành dưới (DIII, aVF)",
      "Sóng Q hoại tử mới xuất hiện ở DI, aVL, V5, V6",
      "Thường đi kèm với nhồi máu thành trước hoặc thành dưới (nhồi máu nhiều vùng)",
    ],
    lead_manifestations: {
      DI: "ST chênh lên dạng vòm 2.0mm, T dương nhọn",
      aVL: "ST chênh lên 2.5mm, có sóng Q hoại tử nhỏ",
      V5: "ST chênh lên 2.2mm",
      V6: "ST chênh lên 2.0mm",
      DIII: "ST chênh xuống soi gương 1.8mm, T âm",
      aVF: "ST chênh xuống soi gương 1.5mm",
    },
    annotations: [
      { leadId: "aVL", waveComponent: "ST", label: "▲ ST chênh lên bên cao +2.5mm", targetCyclePhase: 0.31, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "DI", waveComponent: "ST", label: "▲ ST chênh lên +2.0mm", targetCyclePhase: 0.31, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "V6", waveComponent: "ST", label: "▲ ST chênh lên bên thấp +2.0mm", targetCyclePhase: 0.31, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "DIII", waveComponent: "ST", label: "▼ ST soi gương thành dưới -1.8mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 1 },
    ],
    ecg_metrics: {
      expected_hr: "75 - 100 bpm",
      pr_interval: "150 - 180 ms",
      qrs_duration: "85 - 105 ms",
      qt_interval: "400 - 430 ms",
      qrs_axis: "-30° (Trục lệch trái)",
    },
    clinical_action: "Kích hoạt Cath Lab can thiệp nhánh mũ (LCx) hoặc nhánh Diagonal. Dùng phác đồ kháng kết tập tiểu cầu kép + kháng đông toàn thân.",
    differential_diagnoses: ["Viêm cơ tim cấp", "Tái cực sớm lành tính", "Viêm màng ngoài tim cấp"],
    clinical_presentation: {
      symptoms: ["Đau ngực trái lan ra nách và mặt trong cánh tay trái", "Cảm giác bóp nghẹt sau xương ức"],
      physical_signs: ["Huyết áp 130/80 mmHg", "Mạch 82 bpm", "Không ran phổi"],
      risk_factors: ["Tăng huyết áp, rối loạn lipid máu, tiền sử hút thuốc lá"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn (Code Red)",
      initialStabilization: ["Thở oxy nếu thiếu oxy, lập đường truyền tĩnh mạch"],
      medications: [
        { name: "Aspirin", dose: "300mg nhai nuốt", route: "Uống", notes: "Uống tức thì" },
        { name: "Ticagrelor", dose: "180mg", route: "Uống", notes: "Uống cùng Aspirin" },
        { name: "Heparin", dose: "Bolus 5000 UI tiêm TM", route: "IV", notes: "Chuẩn bị can thiệp mạch vành" },
      ],
      interventions: ["Chụp mạch vành qua da can thiệp nhánh LCx/OM/Diagonal"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Khảo sát DI và aVL: ST chênh lên ở DI và aVL xác định thành bên cao.",
        "2. Khảo sát V5 và V6: ST chênh lên ở V5-V6 xác định thành bên thấp.",
        "3. Tìm soi gương ở DIII, aVF để loại trừ tái cực sớm lành tính.",
      ],
      key_differential_features: ["Tái cực sớm lành tính có điểm J nâng lên nhưng không bao giờ có ST soi gương ở DIII, aVF."],
    },
    red_flags: {
      contraindications: ["Không bỏ sót tổn thương thành bên vì nhánh LCx thường biểu hiện ST chênh kín đáo trên 12 chuyển đạo"],
      pitfalls: ["Bỏ qua ST chênh nhẹ ở aVL (chỉ 1mm) nhưng lại là dấu hiệu chỉ điểm của tắc nhánh mũ LCx rất nguy hiểm."],
    },
    patient_case: {
      age: 55,
      gender: "Nữ",
      chiefComplaint: "Đau tức ngực trái lan ra vai và cánh tay trái 1 giờ",
      historyOfPresentIllness: "Bệnh nhân nữ 55 tuổi đái tháo đường 5 năm, đột ngột thấy nặng ngực trái âm ỉ lan xuống cánh tay trái kèm mệt mỏi.",
      vitals: { bloodPressure: "128/78 mmHg", heartRate: 84, respiratoryRate: 18, spO2: 97, temperature: 36.6 },
      labResults: { "Troponin I": "820 ng/L", "HbA1c": "7.8%", "eGFR": "72 mL/min" },
    },
  },

  {
    id: "stemi_posterior",
    name: "Nhồi Máu Cơ Tim Cấp ST Chênh Lên Thành Sau",
    name_en: "True Posterior ST-Elevation Myocardial Infarction",
    category: "ischemia",
    severity: "critical",
    system_id: "acute_coronary",
    system_name: "Hội Chứng Mạch Vành Cấp",
    anatomical_region: "Thành sau thực thụ (ĐM Liên Thất Sau PDA / RCA)",
    criteria: [
      "ST chênh xuống đi ngang hoặc dốc xuống ≥ 0.5mm ở V1, V2, V3 (hình ảnh soi gương của ST chênh lên thành sau)",
      "Sóng R cao vượt trội (tỉ lệ R/S > 1) và rộng ≥ 0.04s ở V2 (tương đương sóng Q hoại tử thành sau)",
      "Sóng T dương cao nhọn, thẳng đứng đối xứng ở V1-V3 (tương đương T âm thành sau)",
      "Khẳng định chẩn đoán bằng cách mắc thêm chuyển đạo lưng: ST chênh lên ≥ 0.5mm ở V7, V8, V9",
    ],
    lead_manifestations: {
      V1: "ST chênh xuống 1.5mm, sóng R cao nhọn",
      V2: "ST chênh xuống 2.5mm đi ngang, sóng R khổng lồ (R/S = 2.2), T dương đối xứng",
      V3: "ST chênh xuống 2.0mm, R cao",
      "V7-V9": "ST chênh lên dạng vòm 1.5 - 2.0mm (chuyển đạo lưng)",
      DII: "Có thể chênh lên nhẹ nếu đi kèm NMCT thành dưới",
    },
    annotations: [
      { leadId: "V2", waveComponent: "ST", label: "▼ ST chênh xuống đi ngang soi gương -2.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 0 },
      { leadId: "V2", waveComponent: "R", label: "▲ R cao vượt trội R/S > 1 (Gương của Q)", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "V2", waveComponent: "T", label: "▲ T dương cao nhọn đối xứng (Gương của T âm)", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top", criterionIndex: 2 },
      { leadId: "V1", waveComponent: "ST", label: "▼ ST chênh xuống -1.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 0 },
    ],
    ecg_metrics: {
      expected_hr: "60 - 90 bpm",
      pr_interval: "160 - 190 ms",
      qrs_duration: "85 - 100 ms",
      qt_interval: "400 - 430 ms",
      qrs_axis: "+60° (Bình thường)",
    },
    clinical_action: "Đo ngay chuyển đạo thành sau lưng (V7, V8, V9). Nếu V7-V9 ST chênh lên ≥ 0.5mm -> Báo động đỏ Cath Lab can thiệp PCI khẩn cấp như một ca STEMI thực thụ!",
    differential_diagnoses: ["Phì đại thất phải (RVH)", "Hội chứng WPW type A", "Block nhánh phải"],
    clinical_presentation: {
      symptoms: ["Đau thắt ngực âm ỉ lan xuyên ra sau lưng giữa hai xương bả vai", "Vã mồ hôi, cảm giác ngột ngạt khó thở"],
      physical_signs: ["Huyết áp 120/75 mmHg", "Mạch 76 bpm", "Tim đều, không âm thổi mới"],
      risk_factors: ["Hút thuốc lá, tăng huyết áp, nam giới > 50 tuổi"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn (Code Red)",
      initialStabilization: ["Đo ngay V7, V8, V9 xác nhận chẩn đoán", "Lập đường truyền tĩnh mạch"],
      medications: [
        { name: "Aspirin", dose: "300mg", route: "Uống", notes: "Nhai nuốt ngay" },
        { name: "Ticagrelor", dose: "180mg", route: "Uống", notes: "Kháng P2Y12" },
        { name: "Heparin", dose: "Bolus 60 UI/kg", route: "IV", notes: "Kháng đông" },
      ],
      interventions: ["Kích hoạt Cath Lab can thiệp nhánh PDA / RCA / LCx khẩn cấp"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Thấy ST chênh xuống ở V1-V3: Đừng vội kết luận thiếu máu dưới nội tâm mạc!",
        "2. Kiểm tra sóng R và sóng T ở V1-V2: Nếu R cao bất thường (R/S > 1) và T dương đối xứng -> Nghĩ ngay NMCT thành sau.",
        "3. Kỹ thuật lật ngược điện tim: Lật ngược tờ giấy ECG và nhìn từ phía sau sẽ thấy hình ảnh ST chênh lên và sóng Q điển hình.",
        "4. Chỉ định đo V7, V8, V9: Dán điện cực ở đường nách sau, đường giữa xương vai và cạnh cột sống bên trái.",
      ],
      key_differential_features: ["Thiếu máu dưới nội tâm mạc thường có T âm và R nhỏ bình thường; NMCT thành sau có R cao và T dương nhọn."],
    },
    red_flags: {
      contraindications: ["Không được chẩn đoán nhầm thành NSTEMI và trì hoãn can thiệp mạch vành"],
      pitfalls: ["Rất nhiều bác sĩ bỏ sót NMCT thành sau vì chỉ nhìn thấy ST chênh xuống mà quên đo chuyển đạo lưng V7-V9."],
    },
    patient_case: {
      age: 63,
      gender: "Nam",
      chiefComplaint: "Đau thắt ngực lan ra sau lưng giữa hai xương bả vai 2 giờ",
      historyOfPresentIllness: "Bệnh nhân nam 63 tuổi đột ngột đau tức ngực âm ỉ lan xuyên ra sau lưng sau bữa ăn tối, kèm cảm giác vã mồ hôi và bồn chồn.",
      vitals: { bloodPressure: "125/80 mmHg", heartRate: 74, respiratoryRate: 18, spO2: 97, temperature: 36.8 },
      labResults: { "Troponin I": "950 ng/L", "K+": "4.0 mmol/L", "CK-MB": "38 U/L" },
    },
  },

  {
    id: "nemi_subendocardial",
    name: "Thiếu Máu Cơ Tim Dưới Nội Tâm Mạc / NSTEMI",
    name_en: "Subendocardial Ischemia / NSTEMI",
    category: "ischemia",
    severity: "critical",
    system_id: "acute_coronary",
    system_name: "Hội Chứng Mạch Vành Cấp",
    anatomical_region: "Dưới nội tâm mạc lan tỏa (Tổn thương thân chung LMCA / Đa nhánh)",
    criteria: [
      "ST chênh xuống đi ngang (horizontal) hoặc dốc xuống (downsloping) ≥ 1mm (0.1 mV) ở ≥ 2 chuyển đạo liên tiếp",
      "Sóng T âm sâu đối xứng hoặc hai pha",
      "ST chênh lên ở aVR (đặc biệt nếu ST chênh lên ở aVR ≥ 1mm và cao hơn V1 gợi ý tổn thương thân chung LMCA hoặc 3 thân mạch vành)",
      "Không có sóng Q hoại tử mới",
    ],
    lead_manifestations: {
      V4: "ST chênh xuống đi ngang 2.0mm, T âm đối xứng",
      V5: "ST chênh xuống đi ngang 2.5mm, T âm",
      V6: "ST chênh xuống 2.2mm",
      DI: "ST chênh xuống 1.5mm",
      DII: "ST chênh xuống 1.8mm",
      aVR: "ST chênh lên 1.5mm (dấu hiệu tắc thân chung ĐM vành trái LMCA)",
    },
    annotations: [
      { leadId: "V5", waveComponent: "ST", label: "▼ ST chênh xuống đi ngang -2.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 0 },
      { leadId: "V5", waveComponent: "T", label: "▼ T âm sâu đối xứng", targetCyclePhase: 0.45, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "aVR", waveComponent: "ST", label: "▲ ST chênh lên aVR +1.5mm (Nguy cơ tắc LMCA)", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top", criterionIndex: 2 },
      { leadId: "V4", waveComponent: "ST", label: "▼ ST chênh xuống -2.0mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 0 },
    ],
    ecg_metrics: {
      expected_hr: "75 - 110 bpm",
      pr_interval: "150 - 180 ms",
      qrs_duration: "85 - 100 ms",
      qt_interval: "400 - 440 ms",
      qrs_axis: "+45° (Bình thường)",
    },
    clinical_action: "Đánh giá thang điểm nguy cơ GRACE / TIMI. Nếu có ST chênh lên ở aVR kèm ST chênh xuống lan tỏa ≥ 6 chuyển đạo: Xếp vào nhóm nguy cơ cực cao (Very High Risk) -> Can thiệp mạch vành khẩn cấp trong vòng 2 giờ! Dùng kháng kết tập tiểu cầu kép + Heparin.",
    differential_diagnoses: ["Ngộ độc Digitalis", "Tăng gánh thất trái (LVH strain)", "Hạ Kali máu"],
    clinical_presentation: {
      symptoms: ["Đau thắt ngực tái diễn liên tục lúc nghỉ ngơi, đáp ứng kém với Nitrat", "Cảm giác nghẹt thở, lo âu sợ chết"],
      physical_signs: ["Huyết áp 150/95 mmHg", "Mạch nhanh 102 bpm", "Vã mồ hôi lạnh"],
      risk_factors: ["Đái tháo đường lâu năm, suy thận mạn, tiền sử đặt stent mạch vành cũ"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn nếu có ST aVR chênh lên (Code Red)",
      initialStabilization: ["Nghỉ ngơi tuyệt đối tại giường, thở oxy nếu SpO2 < 90%"],
      medications: [
        { name: "Aspirin", dose: "300mg", route: "Uống", notes: "Nhai nuốt ngay" },
        { name: "Ticagrelor", dose: "180mg", route: "Uống", notes: "Kháng tiểu cầu kép" },
        { name: "Fondaparinux", dose: "2.5mg tiêm dưới da 1 lần/ngày", route: "SC", notes: "Kháng đông ưu tiên nếu điều trị bảo tồn, hoặc Heparin nếu PCI" },
        { name: "Nitroglycerin", dose: "Xịt dưới lưỡi 0.4mg hoặc truyền TM 10-200 mcg/phút", route: "Dưới lưỡi / IV", notes: "Giảm đau ngực nếu huyết áp > 100 mmHg" },
      ],
      interventions: ["Chụp mạch vành xâm lấn sớm (< 2h nếu nguy cơ cực cao, < 24h nếu nguy cơ cao)"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Đánh giá dạng ST chênh xuống: ST đi ngang hoặc dốc xuống có giá trị bệnh lý cao hơn ST dốc lên.",
        "2. Soi chuyển đạo aVR: Nếu aVR chênh lên ≥ 1mm và kèm ST chênh xuống ≥ 6 chuyển đạo -> Cảnh báo tắc thân chung LMCA hoặc 3 thân mạch vành.",
        "3. Đo Troponin I/T siêu nhạy động học sau 1h hoặc 3h để phân biệt Đau thắt ngực không ổn định và NSTEMI.",
      ],
      key_differential_features: ["Tăng gánh thất trái có ST chênh xuống dạng bất đối xứng ở V5-V6 kèm tiêu chuẩn Sokolow-Lyon; NSTEMI có ST đi ngang đối xứng."],
    },
    red_flags: {
      contraindications: ["Không chỉ định tiêu sợi huyết cho NSTEMI (tiêu sợi huyết chỉ dùng cho STEMI khi không thể can thiệp PCI)"],
      pitfalls: ["Xem thường ST chênh xuống mà không soi aVR, bỏ sót tắc thân chung động mạch vành trái (tỉ lệ tử vong > 50%)."],
    },
    patient_case: {
      age: 67,
      gender: "Nữ",
      chiefComplaint: "Đau thắt ngực từng cơn tăng dần lúc nghỉ kèm vã mồ hôi",
      historyOfPresentIllness: "Bệnh nhân nữ 67 tuổi tiền sử đái tháo đường và đặt stent LAD 3 năm trước, 2 ngày nay xuất hiện đau thắt ngực tái diễn cả khi nghỉ ngơi, cơn đau kéo dài 20 phút không đỡ.",
      vitals: { bloodPressure: "155/90 mmHg", heartRate: 104, respiratoryRate: 20, spO2: 96, temperature: 36.7 },
      labResults: { "Troponin T": "680 ng/L", "HbA1c": "8.5%", "Creatinine": "115 umol/L" },
    },
  },

  // =========================================================================
  // HỆ III: RỐI LOẠN DẪN TRUYỀN: BLOCK AV & PHÂN NHÁNH (conduction_blocks)
  // =========================================================================
  {
    id: "av_block_first_degree",
    name: "Block Nhĩ Thất Độ I",
    name_en: "First-Degree Atrioventricular Block",
    category: "conduction",
    severity: "borderline",
    system_id: "conduction_blocks",
    system_name: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh",
    anatomical_region: "Nút nhĩ thất (AV Node)",
    criteria: [
      "Khoảng PR kéo dài thường xuyên và cố định > 0.20s (> 200 ms, tức > 5 ô nhỏ)",
      "Mỗi sóng P đều dẫn một phức bộ QRS (tỉ lệ dẫn 1:1, không có nhát nào bị rớt)",
      "Hình thái sóng P và phức bộ QRS hoàn toàn bình thường",
      "Nhịp tim đều đặn",
    ],
    lead_manifestations: {
      DII: "Khoảng PR kéo dài 260ms cố định trên mọi chu kỳ nhịp, P dẫn QRS 1:1",
      V1: "PR kéo dài 260ms",
      II: "Dải nhịp Lead II: PR dài 260ms đều tăm tắp",
    },
    annotations: [
      { leadId: "DII", waveComponent: "PR", label: "↔ PR = 260ms (> 200ms / 5 ô nhỏ)", targetCyclePhase: 0.04, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval", criterionIndex: 0 },
      { leadId: "V1", waveComponent: "PR", label: "↔ PR kéo dài cố định 260ms", targetCyclePhase: 0.04, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval", criterionIndex: 0 },
      { leadId: "II", waveComponent: "PR", label: "↔ Dải nhịp Lead II: PR = 260ms cố định", targetCyclePhase: 0.04, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval", criterionIndex: 1 },
    ],
    ecg_metrics: {
      expected_hr: "60 - 90 bpm",
      pr_interval: "240 - 320 ms",
      qrs_duration: "80 - 100 ms",
      qt_interval: "380 - 420 ms",
      qrs_axis: "+45° (Bình thường)",
    },
    clinical_action: "Thường lành tính, không cần điều trị can thiệp khẩn cấp. Rà soát các thuốc làm chậm dẫn truyền qua nút AV (chẹn Beta, Digoxin, chẹn Canxi diltiazem/verapamil).",
    differential_diagnoses: ["Nhịp chậm xoang", "Block nhĩ thất độ II Mobitz I"],
    clinical_presentation: {
      symptoms: ["Đa số hoàn toàn không có triệu chứng, tình cờ phát hiện khi đo điện tim", "Đôi khi thấy mệt mỏi nhẹ"],
      physical_signs: ["Mạch đều 68 bpm", "Huyết áp 120/80 mmHg", "Tiếng T1 nghe hơi mờ do van AV đóng muộn"],
      risk_factors: ["Đang điều trị thuốc hạ áp nhóm chẹn beta hoặc thuốc chống loạn nhịp tim"],
    },
    emergency_management: {
      priorityLevel: "Mức 4 - Theo dõi thường quy",
      initialStabilization: ["Không cần cấp cứu khẩn cấp"],
      medications: ["Giảm liều hoặc ngưng thuốc làm chậm dẫn truyền nút AV nếu PR quá dài (> 300ms)"],
      interventions: ["Khám chuyên khoa tim mạch theo dõi định kỳ"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Đo khoảng PR: Đếm từ khởi đầu sóng P đến bắt đầu phức bộ QRS.",
        "2. So sánh PR: Nếu PR > 5 ô nhỏ (200ms) và mọi P đều có QRS đi kèm -> Block AV độ I.",
        "3. Kiểm tra tính cố định: Khoảng PR có dài dần hay không? Nếu dài dần là Mobitz I; nếu cố định là Block độ I.",
      ],
      key_differential_features: ["Block độ I tỉ lệ P:QRS luôn là 1:1; Block độ II có sóng P không dẫn QRS."],
    },
    red_flags: {
      contraindications: ["Thận trọng khi phối hợp thuốc chẹn beta giao cảm và chẹn canxi non-DHP"],
      pitfalls: ["PR kéo dài quá mức (> 300ms) có thể gây hội chứng giả máy tạo nhịp (nhĩ bóp khi van nhĩ thất chưa mở gây giảm cung lượng tim)."],
    },
    patient_case: {
      age: 70,
      gender: "Nam",
      chiefComplaint: "Đo điện tim kiểm tra định kỳ trước phẫu thuật đục thủy tinh thể",
      historyOfPresentIllness: "Bệnh nhân nam 70 tuổi tăng huyết áp đang uống Metoprolol 25mg/ngày, không có triệu chứng hồi hộp hay choáng váng.",
      vitals: { bloodPressure: "130/80 mmHg", heartRate: 64, respiratoryRate: 16, spO2: 98, temperature: 36.5 },
      labResults: { "K+": "4.3 mmol/L", "Creatinine": "85 umol/L" },
    },
  },

  {
    id: "av_block_mobitz_1",
    name: "Block Nhĩ Thất Độ II Kiểu Mobitz I (Wenckebach)",
    name_en: "Second-Degree AV Block Mobitz I (Wenckebach Periodicity)",
    category: "conduction",
    severity: "abnormal",
    system_id: "conduction_blocks",
    system_name: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh",
    anatomical_region: "Nút nhĩ thất (AV Node - Chậm dần nội nút)",
    criteria: [
      "Khoảng PR dài dần ra qua từng chu kỳ tim liên tiếp",
      "Cho đến khi có một sóng P hoàn toàn không dẫn được (rớt một phức bộ QRS)",
      "Sau nhát rớt, chu kỳ lặp lại với khoảng PR ngắn nhất",
      "Khoảng R-R ngắn dần trước nhát rớt; phức bộ QRS thường hẹp (< 0.12s)",
    ],
    lead_manifestations: {
      DII: "PR dài dần từ 160ms -> 220ms -> 300ms, sau đó có sóng P đơn độc không có QRS, rồi chu kỳ lặp lại",
      V1: "QRS hẹp, thỉnh thoảng rớt 1 nhát bóp",
      II: "Dải nhịp Lead II: Chu kỳ Wenckebach 4:3 điển hình",
    },
    annotations: [
      { leadId: "DII", waveComponent: "PR", label: "PR dài dần (160ms → 300ms)", targetCyclePhase: 0.06, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval", criterionIndex: 0 },
      { leadId: "DII", waveComponent: "DROPPED", label: "❌ P không dẫn (Rớt QRS)", targetCyclePhase: 0.06, color: "#e11d48", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "II", waveComponent: "DROPPED", label: "❌ Chu kỳ Wenckebach: Rớt 1 nhát QRS", targetCyclePhase: 0.06, color: "#e11d48", badgePlacement: "top", criterionIndex: 1 },
    ],
    ecg_metrics: {
      expected_hr: "45 - 75 bpm",
      pr_interval: "160 - 320 ms (biến thiên)",
      qrs_duration: "85 - 100 ms",
      qt_interval: "400 - 430 ms",
      qrs_axis: "+45° (Bình thường)",
    },
    clinical_action: "Đa số tổn thương tại nút AV, tiên lượng tương đối lành tính. Nếu không có triệu chứng: theo dõi. Nếu có triệu chứng tụt HA hoặc kèm NMCT thành dưới: Atropin 0.5 - 1mg TM. Tạm ngừng các thuốc ức chế nút AV.",
    differential_diagnoses: ["Block nhĩ thất độ II Mobitz II", "Ngoại tâm thu nhĩ bị block", "Block xoang nhĩ"],
    clinical_presentation: {
      symptoms: ["Cảm giác tim hẫng đi một nhịp (nhát rớt)", "Mệt nhẹ khi gắng sức, đa phần không có triệu chứng"],
      physical_signs: ["Bắt mạch thấy mạch không đều, thỉnh thoảng mất một nhịp mạch", "Huyết áp ổn định"],
      risk_factors: ["Nhồi máu cơ tim thành dưới cấp tính hoặc quá liều Digoxin/chẹn Beta"],
    },
    emergency_management: {
      priorityLevel: "Mức 3 - Cần đánh giá triệu chứng",
      initialStabilization: ["Mắc monitor theo dõi nhịp", "Tìm dấu hiệu tụt huyết áp"],
      medications: [
        { name: "Atropin", dose: "0.5mg - 1mg tiêm TM", route: "IV Push", notes: "Chỉ dùng nếu có nhịp chậm kèm triệu chứng choáng váng/tụt HA" },
      ],
      interventions: ["Hiếm khi cần đặt máy tạo nhịp vĩnh viễn trừ khi có triệu chứng ngất tái diễn"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Thấy nhịp tim không đều có nhát ngưng: Đo khoảng cách P-P.",
        "2. Kiểm tra các khoảng PR liên tiếp: PR có dài dần ra hay không?",
        "3. Tìm sóng P không dẫn: Có 1 sóng P đi trơ trọi không có QRS theo sau -> Xác định Mobitz I.",
      ],
      key_differential_features: ["Mobitz I có PR dài dần rồi rớt; Mobitz II khoảng PR hoàn toàn cố định trước khi rớt."],
    },
    red_flags: {
      contraindications: ["Không vội vàng đặt máy tạo nhịp tạm thời nếu bệnh nhân Mobitz I huyết động hoàn toàn ổn định"],
      pitfalls: ["Nhầm Mobitz I với ngoại tâm thu nhĩ không dẫn (PAC bị block có sóng P đến sớm dị dạng)."],
    },
    patient_case: {
      age: 59,
      gender: "Nam",
      chiefComplaint: "Cảm giác tim hụt hẫng từng lúc sau khi uống thuốc huyết áp",
      historyOfPresentIllness: "Bệnh nhân nam 59 tuổi đang điều trị tăng huyết áp với Diltiazem 120mg/ngày, gần đây thấy thỉnh thoảng tim hụt một nhịp, không ngất.",
      vitals: { bloodPressure: "118/75 mmHg", heartRate: 56, respiratoryRate: 16, spO2: 98, temperature: 36.6 },
      labResults: { "K+": "4.4 mmol/L", "Troponin T": "< 14 ng/L" },
    },
  },

  {
    id: "av_block_mobitz_2",
    name: "Block Nhĩ Thất Độ II Kiểu Mobitz II",
    name_en: "Second-Degree AV Block Mobitz II",
    category: "conduction",
    severity: "critical",
    system_id: "conduction_blocks",
    system_name: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh",
    anatomical_region: "Dưới nút AV (Bó His / Phân nhánh Purkinje)",
    criteria: [
      "Khoảng PR của các nhát dẫn hoàn toàn cố định và không thay đổi trước khi có nhát rớt",
      "Đột ngột rớt một hoặc nhiều phức bộ QRS sau sóng P bình thường",
      "Phức bộ QRS thường dãn rộng (≥ 0.12s) do tổn thương hệ thống dẫn truyền dưới bó His",
      "Nguy cơ tiến triển thành Block AV độ III hoàn toàn và vô tâm thu rất cao",
    ],
    lead_manifestations: {
      DII: "Khoảng PR cố định 180ms, đột ngột có sóng P không dẫn QRS (dạng dẫn truyền 3:2 hoặc 4:3)",
      V1: "QRS dãn rộng 130ms dạng block phân nhánh",
      II: "Dải nhịp Lead II: Đột ngột rớt QRS sau sóng P xoang",
    },
    annotations: [
      { leadId: "DII", waveComponent: "PR", label: "PR cố định 180ms", targetCyclePhase: 0.08, intervalEndPhase: 0.26, color: "#2563eb", badgePlacement: "interval", criterionIndex: 0 },
      { leadId: "DII", waveComponent: "DROPPED", label: "❌ Đột ngột rớt QRS sau sóng P", targetCyclePhase: 0.08, color: "#e11d48", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "II", waveComponent: "DROPPED", label: "❌ Block dưới bó His: Rớt QRS 3:2", targetCyclePhase: 0.08, color: "#e11d48", badgePlacement: "top", criterionIndex: 2 },
    ],
    ecg_metrics: {
      expected_hr: "35 - 60 bpm",
      pr_interval: "160 - 200 ms (cố định)",
      qrs_duration: "110 - 140 ms (thường rộng)",
      qt_interval: "410 - 450 ms",
      qrs_axis: "-30° (Trục lệch trái)",
    },
    clinical_action: "TÌNH HUỐNG NGUY HIỂM! Dán ngay miếng dán máy tạo nhịp qua da (Transcutaneous Pacing - TCP). Chuẩn bị đặt máy tạo nhịp tạm thời đường tĩnh mạch. Atropin thường KHÔNG HIỆU QUẢ và có thể làm block nặng hơn. Chỉ định đặt máy tạo nhịp vĩnh viễn Class I.",
    differential_diagnoses: ["Block nhĩ thất độ II Mobitz I", "Block AV độ III", "Block xoang nhĩ độ II"],
    clinical_presentation: {
      symptoms: ["Ngất thoáng qua (Cơn Stokes-Adams)", "Chóng mặt dữ dội, hoa mắt, mệt lả"],
      physical_signs: ["Huyết áp tụt 90/55 mmHg", "Mạch chậm ngắt quãng 38 - 42 lần/phút", "Da xanh tái vã mồ hôi"],
      risk_factors: ["Nhồi máu cơ tim trước rộng (tổn thương vách liên thất) hoặc thoái hóa hệ dẫn truyền (bệnh Lenègre)"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn (Code Red)",
      initialStabilization: ["Dán sẵn điện cực tạo nhịp ngoài (TCP)", "Lập đường truyền tĩnh mạch lớn"],
      medications: [
        { name: "Isoproterenol", dose: "2 - 10 mcg/phút truyền TM", route: "IV Infusion", notes: "Thuốc kích thích Beta hỗ trợ trong khi chờ máy tạo nhịp" },
        { name: "Dopamine", dose: "5 - 20 mcg/kg/phút", route: "IV Infusion", notes: "Nâng huyết áp nếu tụt HA" },
      ],
      interventions: ["Đặt máy tạo nhịp tạm thời qua tĩnh mạch đùi hoặc tĩnh mạch dưới đòn khẩn cấp"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Thấy nhát rớt QRS: Đo khoảng PR của nhát bóp ngay trước nhát rớt và nhát bóp ngay sau nhát rớt.",
        "2. So sánh PR: Nếu PR bằng nhau cố định -> Mobitz II.",
        "3. Đánh giá QRS: QRS rộng gợi ý tổn thương phân nhánh bên dưới His -> Cần can thiệp tạo nhịp khẩn.",
      ],
      key_differential_features: ["Mobitz I đáp ứng tốt với Atropin; Mobitz II không đáp ứng hoặc tệ hơn khi dùng Atropin."],
    },
    red_flags: {
      contraindications: ["KHÔNG ĐƯỢC CHỦ QUAN xuất viện hoặc chờ đợi, bệnh nhân có thể vô tâm thu và đột tử bất kỳ lúc nào!"],
      pitfalls: ["Dùng Atropin làm tăng tần số nhĩ từ nút xoang khiến nút AV bị quá tải, làm tăng số nhát rớt QRS khiến nhịp thất chậm hơn nữa."],
    },
    patient_case: {
      age: 74,
      gender: "Nam",
      chiefComplaint: "Đột ngột ngất xỉu ngã đập đầu khi đang đi bộ",
      historyOfPresentIllness: "Bệnh nhân nam 74 tuổi đang tưới cây thì đột ngột ngất lịm đi khoảng 30 giây rồi tỉnh lại, không co giật, không tiêu tiểu không tự chủ. Vào viện mạch 40 lần/phút.",
      vitals: { bloodPressure: "88/50 mmHg", heartRate: 40, respiratoryRate: 18, spO2: 95, temperature: 36.5 },
      labResults: { "Troponin I": "45 ng/L", "K+": "4.2 mmol/L", "Glucose": "6.0 mmol/L" },
    },
  },

  {
    id: "av_block_third_degree",
    name: "Block Nhĩ Thất Độ III (Hoàn Toàn)",
    name_en: "Third-Degree Atrioventricular Block (Complete Heart Block)",
    category: "conduction",
    severity: "critical",
    system_id: "conduction_blocks",
    system_name: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh",
    anatomical_region: "Nhĩ thất hoàn toàn (Nút AV / Thân bó His)",
    criteria: [
      "Hiện tượng phân ly nhĩ - thất hoàn toàn (AV Dissociation): Nhĩ và thất đập hoàn toàn độc lập",
      "Sóng P xoang đều đặn với tần số riêng (thường 60 - 90 bpm, khoảng P-P đều)",
      "Phức bộ QRS đều đặn với tần số thoát thất chậm hơn nhiều (20 - 45 bpm, khoảng R-R đều)",
      "Không có bất kỳ mối liên hệ nào giữa sóng P và phức bộ QRS (PR thay đổi liên tục, P có thể rơi vào đỉnh sóng T, đoạn ST hoặc bên trong QRS)",
    ],
    lead_manifestations: {
      DII: "Sóng P xoang đều đặn tần số 75 bpm; Phức bộ QRS dãn rộng đều đặn tần số 34 bpm đập độc lập",
      V1: "Sóng P rơi ngẫu nhiên vào sóng T và phức bộ QRS",
      II: "Dải nhịp Lead II: Phân ly nhĩ thất hoàn toàn kinh điển",
    },
    annotations: [
      { leadId: "DII", waveComponent: "P", label: "Sóng P xoang (75 bpm) độc lập", targetCyclePhase: 0.15, color: "#059669", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "DII", waveComponent: "R", label: "Nhịp thoát thất rộng 135ms (34 bpm)", targetCyclePhase: 0.25, color: "#e11d48", badgePlacement: "bottom", criterionIndex: 2 },
      { leadId: "II", waveComponent: "RR", label: "⚡ Phân ly nhĩ - thất hoàn toàn (CHB)", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    ],
    ecg_metrics: {
      expected_hr: "25 - 45 bpm (Thoát thất)",
      pr_interval: "Không cố định (Phân ly)",
      qrs_duration: "120 - 160 ms (Thoát thất rộng)",
      qt_interval: "460 - 520 ms",
      qrs_axis: "Vô định / Lệch trục nặng",
    },
    clinical_action: "CẤP CỨU HỒI SỨC TIM MẠCH! Kích hoạt máy tạo nhịp qua da (TCP) ngay lập tức. Đặt máy tạo nhịp tạm thời qua buồng tim cấp cứu. Chuẩn bị Adrenaline / Isoproterenol truyền tĩnh mạch duy trì tưới máu não.",
    differential_diagnoses: ["Phân ly nhĩ thất do nhịp nhanh thất", "Nhịp chậm xoang nặng", "Block AV độ II 2:1"],
    clinical_presentation: {
      symptoms: ["Ngất lịm, mất tri giác thoáng qua (Stokes-Adams)", "Thở dốc, lú lẫn, tụt huyết áp sốc tim"],
      physical_signs: ["Huyết áp 80/40 mmHg", "Mạch chậm 32 lần/phút nảy mạnh chìm sâu", "Sóng tĩnh mạch cổ đại bác (Cannon 'a' waves)", "Tiếng T1 cường độ thay đổi từng nhát bóp"],
      risk_factors: ["Nhồi máu cơ tim thành dưới/trước rộng, thoái hóa hệ dẫn truyền tuổi già, ngộ độc Digoxin"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn (Code Red)",
      initialStabilization: ["Khởi động máy tạo nhịp qua da (TCP) lập tức, dán bản cực ngực - lưng", "Đặt đường truyền tĩnh mạch"],
      medications: [
        { name: "Adrenaline", dose: "2 - 10 mcg/phút truyền TM liên tục", route: "IV Infusion", notes: "Duy trì nhịp và huyết áp trong khi chuẩn bị tạo nhịp" },
        { name: "Dopamine", dose: "5 - 20 mcg/kg/phút", route: "IV Infusion", notes: "Hỗ trợ co bóp cơ tim" },
      ],
      interventions: ["Đặt catheter máy tạo nhịp tạm thời vào mỏm thất phải qua đường tĩnh mạch dưới đòn hoặc TM đùi"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Dùng thước đo đếm các đỉnh sóng P: Khoảng P-P đều tăm tắp với tần số 60-100 bpm.",
        "2. Đếm các phức bộ QRS: Khoảng R-R đều tăm tắp với tần số chậm 25-45 bpm.",
        "3. Tìm sự tương quan: Khoảng PR thay đổi liên tục, sóng P có thể nằm đè lên sóng T hoặc rơi vào đầu QRS -> Khẳng định Phân ly nhĩ thất hoàn toàn.",
      ],
      key_differential_features: ["Block độ II tần số nhĩ luôn là bội số của thất (2:1, 3:1); Block độ III tần số nhĩ và thất hoàn toàn không liên quan nhau."],
    },
    red_flags: {
      contraindications: ["CHỐNG CHỈ ĐỊNH dùng các thuốc ức chế dẫn truyền (Chẹn Beta, Chẹn Canxi, Amiodarone, Digoxin) - Bệnh nhân sẽ vô tâm thu ngay lập tức!"],
      pitfalls: ["Không nhận ra sóng P bị vùi trong sóng T dẫn đến chẩn đoán nhầm thành nhịp thoát bộ nối thông thường."],
    },
    patient_case: {
      age: 81,
      gender: "Nữ",
      chiefComplaint: "Lơ mơ, tụt huyết áp và ngất lịm tại viện dưỡng lão",
      historyOfPresentIllness: "Cụ bà 81 tuổi được người nhà phát hiện ngất lịm trên ghế, lay gọi đáp ứng chậm, thở ngáp, mạch bắt rất chậm 30 bpm.",
      vitals: { bloodPressure: "75/40 mmHg", heartRate: 32, respiratoryRate: 22, spO2: 90, temperature: 36.2 },
      labResults: { "Troponin T": "210 ng/L", "K+": "5.0 mmol/L", "Lactate": "3.9 mmol/L" },
    },
  },

  {
    id: "rbbb",
    name: "Block Nhánh Phải Hoàn Toàn (RBBB)",
    name_en: "Complete Right Bundle Branch Block",
    category: "conduction",
    severity: "abnormal",
    system_id: "conduction_blocks",
    system_name: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh",
    anatomical_region: "Nhánh phải (Right Bundle Branch)",
    criteria: [
      "Thời gian phức bộ QRS dãn rộng ≥ 0.12s (≥ 120 ms / 3 ô nhỏ)",
      "Dạng sóng 'tai thỏ' rsR', rSR' hoặc R rộng có khía ở chuyển đạo trước ngực phải (V1, V2)",
      "Sóng S rộng và sâu (> 0.04s) ở các chuyển đạo thành bên (DI, aVL, V5, V6)",
      "ST chênh xuống và sóng T âm thứ phát trái chiều với nhánh cuối QRS ở V1, V2",
    ],
    lead_manifestations: {
      V1: "Dạng tai thỏ rsR' điển hình: sóng R' thứ hai cao 12mm, QRS rộng 135ms, T âm thứ phát",
      V2: "Dạng rSR' với đỉnh R' nhọn, ST chênh xuống nhẹ",
      DI: "Sóng S rộng > 40ms, nhẵn tròn",
      V6: "Sóng S rộng sâu > 40ms, QRS rộng 135ms",
    },
    annotations: [
      { leadId: "V1", waveComponent: "R", label: "▲ Dạng tai thỏ rsR' (RBBB) rộng 135ms", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "V1", waveComponent: "T", label: "▼ ST chênh xuống & T âm thứ phát", targetCyclePhase: 0.40, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 3 },
      { leadId: "V6", waveComponent: "S", label: "▼ Sóng S rộng sâu > 40ms ở DI, V6", targetCyclePhase: 0.28, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 2 },
      { leadId: "DI", waveComponent: "S", label: "▼ S rộng thành bên", targetCyclePhase: 0.28, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 2 },
    ],
    ecg_metrics: {
      expected_hr: "60 - 95 bpm",
      pr_interval: "140 - 180 ms",
      qrs_duration: "125 - 145 ms (≥ 120ms)",
      qt_interval: "390 - 430 ms",
      qrs_axis: "+90° đến +110° (Trục lệch phải)",
    },
    clinical_action: "RBBB đơn độc thường lành tính. Tuy nhiên, nếu RBBB MỚI XUẤT HIỆN trên bệnh nhân đau ngực/khó thở cấp: Cảnh giác thuyên tắc phổi cấp hoặc nhồi máu cơ tim trước vách (tắc nhánh LAD nuôi vách).",
    differential_diagnoses: ["Hội chứng Brugada", "Phì đại thất phải (RVH)", "Hội chứng WPW type A"],
    clinical_presentation: {
      symptoms: ["Không có triệu chứng nếu là mạn tính", "Khó thở đột ngột hoặc đau ngực nếu là RBBB mới xuất hiện do thuyên tắc phổi"],
      physical_signs: ["Tiếng T2 tách đôi rộng cố định khi nghe tim"],
      risk_factors: ["Tăng áp động mạch phổi, bệnh tim bẩm sinh (thông liên nhĩ), bệnh mạch vành"],
    },
    emergency_management: {
      priorityLevel: "Mức 3 - Tầm soát nguyên nhân",
      initialStabilization: ["Đánh giá dấu hiệu khó thở cấp hoặc đau ngực"],
      medications: ["Điều trị bệnh lý nền nếu có thuyên tắc phổi hoặc thiếu máu cơ tim"],
      interventions: ["Siêu âm tim khảo sát kích thước và áp lực buồng thất phải"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Đo bề rộng QRS: QRS ≥ 120ms (3 ô nhỏ) khẳng định có block nhánh.",
        "2. Nhìn vào V1: QRS dương có dạng tai thỏ rsR' -> Khẳng định Block nhánh phải (RBBB).",
        "3. Nhìn vào DI, aVL, V6: Có sóng S rộng sâu trượt dài -> Hoàn thành tiêu chuẩn RBBB.",
      ],
      key_differential_features: ["RBBB vẫn đọc được ST chênh lên của nhồi máu cơ tim; LBBB sẽ che lấp sóng nhồi máu."],
    },
    red_flags: {
      contraindications: ["RBBB mới xuất hiện kèm khó thở cấp phải nghĩ ngay đến Thuyên Tắc Phổi cho đến khi có bằng chứng ngược lại!"],
      pitfalls: ["Nhầm dạng rSr' ở V1 với hội chứng Brugada. Brugada Type 1 có ST chênh vòm coved-type nối tiếp T âm."],
    },
    patient_case: {
      age: 52,
      gender: "Nam",
      chiefComplaint: "Đo điện tim trước mổ sỏi túi mật",
      historyOfPresentIllness: "Bệnh nhân nam 52 tuổi chuẩn bị phẫu thuật nội soi cắt túi mật, không có tiền sử bệnh tim mạch, thể lực tốt.",
      vitals: { bloodPressure: "120/75 mmHg", heartRate: 74, respiratoryRate: 16, spO2: 99, temperature: 36.5 },
      labResults: { "D-dimer": "210 ng/mL (bình thường)", "Troponin I": "< 10 ng/L" },
    },
  },

  {
    id: "lbbb",
    name: "Block Nhánh Trái Hoàn Toàn (LBBB)",
    name_en: "Complete Left Bundle Branch Block",
    category: "conduction",
    severity: "critical",
    system_id: "conduction_blocks",
    system_name: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh",
    anatomical_region: "Nhánh trái (Left Bundle Branch) - Che lấp sóng nhồi máu",
    criteria: [
      "Thời gian phức bộ QRS dãn rộng ≥ 0.12s (≥ 120 ms)",
      "Sóng R rộng, có khía ở đỉnh (dạng chữ M) ở các chuyển đạo thành bên (DI, aVL, V5, V6)",
      "Mất hoàn toàn sóng Q vách liên thất sinh lý ở DI, aVL, V5, V6",
      "Sóng r nhỏ kèm sóng S rất sâu và rộng dạng QS hoặc rS ở V1, V2",
      "Thay đổi ST-T thứ phát trái chiều với phức bộ QRS (ST chênh xuống và T âm ở V5, V6; ST chênh lên ở V1-V3)",
      "Chẩn đoán STEMI trên nền LBBB dựa vào Tiêu Chuẩn Sgarbossa cải biên",
    ],
    lead_manifestations: {
      V1: "Dạng rS nhỏ kèm sóng S cực sâu rộng 140ms, ST chênh lên nhẹ thứ phát 1.5mm",
      V2: "Dạng QS rộng sâu, T dương",
      V5: "Sóng R rộng có khía ở đỉnh 140ms, ST chênh xuống 1.5mm, T âm",
      V6: "Sóng R rộng đỉnh có khía dạng tai thỏ LBBB, mất hoàn toàn sóng Q vách",
      DI: "R rộng có khía",
      aVL: "R rộng có khía",
    },
    annotations: [
      { leadId: "V6", waveComponent: "R", label: "▲ R rộng có khía (LBBB) QRS 140ms", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "V1", waveComponent: "S", label: "▼ Sóng QS sâu rộng ở V1-V2", targetCyclePhase: 0.26, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 3 },
      { leadId: "V5", waveComponent: "ST", label: "▼ ST chênh xuống thứ phát trái chiều QRS", targetCyclePhase: 0.35, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 4 },
      { leadId: "DI", waveComponent: "R", label: "Mất sóng Q vách ở DI, aVL, V6", targetCyclePhase: 0.18, color: "#9333ea", badgePlacement: "top", criterionIndex: 2 },
    ],
    ecg_metrics: {
      expected_hr: "65 - 100 bpm",
      pr_interval: "160 - 200 ms",
      qrs_duration: "135 - 160 ms (≥ 120ms)",
      qt_interval: "430 - 480 ms",
      qrs_axis: "-15° đến -45° (Trục lệch trái)",
    },
    clinical_action: "LBBB thường là dấu hiệu của bệnh lý tim thực tổn nặng (suy tim, bệnh cơ tim giãn, xơ vữa mạch vành). NẾU LBBB MỚI XUẤT HIỆN KÈM ĐAU NGỰC: Phải kích hoạt can thiệp mạch vành khẩn cấp như một ca STEMI! Áp dụng Tiêu chuẩn Sgarbossa.",
    differential_diagnoses: ["Phì đại thất trái nặng", "Hội chứng WPW", "Nhịp tự thất"],
    clinical_presentation: {
      symptoms: ["Khó thở khi gắng sức, giảm khả năng hoạt động thể lực", "Đau thắt ngực hoặc triệu chứng suy tim"],
      physical_signs: ["Tiếng T2 tách đôi nghịch thường (nghe rõ khi thở ra hơn hít vào)", "Tiếng mỏm tim lệch trái"],
      risk_factors: ["Tăng huyết áp lâu năm, bệnh cơ tim thiếu máu cục bộ, hẹp van động mạch chủ"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 nếu LBBB mới xuất hiện kèm đau ngực (Code Red)",
      initialStabilization: ["Áp dụng tiêu chuẩn Sgarbossa kiểm tra nhồi máu cơ tim đi kèm"],
      medications: [
        { name: "Thuốc suy tim chuẩn (ACEi, ARNI, Beta-blocker, SGLT2i)", dose: "Tùy phân độ suy tim", route: "Uống", notes: "Điều trị nội khoa nền tảng sau khi ổn định" },
      ],
      interventions: ["Cân nhắc điều trị tái đồng bộ tim (CRT - Pacemaker 3 buồng) nếu suy tim EF < 35% và QRS ≥ 130ms"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. QRS ≥ 120ms: Kiểm tra V1. Nếu V1 chủ yếu âm (dạng rS/QS) -> Nghĩ LBBB.",
        "2. Kiểm tra V5, V6, DI, aVL: Thấy sóng R rộng có khía ở đỉnh và mất hoàn toàn sóng Q vách -> Khẳng định LBBB.",
        "3. Áp dụng tiêu chuẩn Sgarbossa cải biên: (1) ST chênh lên cùng chiều QRS ≥ 1mm (5 điểm); (2) ST chênh xuống cùng chiều ở V1-V3 ≥ 1mm (3 điểm); (3) ST chênh lên ngược chiều QRS > 25% biên độ sóng S (Sgarbossa cải biên của Smith).",
      ],
      key_differential_features: ["LBBB làm mất sóng Q giải phẫu; do đó không thể dùng tiêu chuẩn sóng Q kinh điển để chẩn đoán NMCT."],
    },
    red_flags: {
      contraindications: ["Không được dựa vào tiêu chuẩn ST kinh điển mà bỏ qua tiêu chuẩn Sgarbossa, dẫn đến bỏ sót nhồi máu cơ tim cấp trên nền LBBB"],
      pitfalls: ["LBBB mới xuất hiện tương đương với STEMI và cần can thiệp tái tưới máu khẩn cấp."],
    },
    patient_case: {
      age: 68,
      gender: "Nữ",
      chiefComplaint: "Đau tức ngực trái nghẹt thở kèm khó thở tăng dần 2 giờ",
      historyOfPresentIllness: "Bệnh nhân nữ 68 tuổi có tiền sử suy tim EF 38%, đột ngột đau ngực trái dữ dội, điện tim thấy LBBB có ST chênh lên cùng chiều 2mm ở V5 (Sgarbossa dương tính 5 điểm).",
      vitals: { bloodPressure: "135/80 mmHg", heartRate: 88, respiratoryRate: 22, spO2: 94, temperature: 36.7 },
      labResults: { "Troponin I": "1200 ng/L", "NT-proBNP": "3400 pg/mL" },
    },
  },

  {
    id: "lafb",
    name: "Block Phân Nhánh Trái Trước (LAFB / LAHB)",
    name_en: "Left Anterior Fascicular Block",
    category: "conduction",
    severity: "abnormal",
    system_id: "conduction_blocks",
    system_name: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh",
    anatomical_region: "Phân nhánh trái trước (Left Anterior Fascicle)",
    criteria: [
      "Trục điện tim lệch trái mạnh từ -45° đến -90°",
      "Dạng sóng qR ở các chuyển đạo thành bên (DI, aVL)",
      "Dạng sóng rS ở các chuyển đạo thành dưới (DII, DIII, aVF), với sóng S sâu ở DIII",
      "Độ rộng phức bộ QRS bình thường hoặc chỉ dãn rộng nhẹ (< 0.12s, thường 0.09 - 0.11s)",
      "Thời gian xuất hiện nhánh nội điện ở aVL > 0.045s",
    ],
    lead_manifestations: {
      aVL: "Sóng q nhỏ kèm sóng R cao (dạng qR), QRS hẹp 95ms",
      DI: "Dạng qR với R cao",
      DII: "Dạng rS với sóng S sâu",
      DIII: "Sóng S cực sâu (rS), trục điện tim -60°",
      aVF: "Dạng rS",
    },
    annotations: [
      { leadId: "aVL", waveComponent: "R", label: "Dạng qR ở aVL (Trục lệch trái -60°)", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "DIII", waveComponent: "S", label: "▼ Sóng S sâu ở DII, DIII, aVF (dạng rS)", targetCyclePhase: 0.28, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 2 },
      { leadId: "DI", waveComponent: "Q", label: "q nhỏ ở DI, aVL", targetCyclePhase: 0.18, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 1 },
    ],
    ecg_metrics: {
      expected_hr: "60 - 90 bpm",
      pr_interval: "140 - 180 ms",
      qrs_duration: "90 - 105 ms (< 120ms)",
      qt_interval: "380 - 410 ms",
      qrs_axis: "-60° (Trục lệch trái mạnh -45° đến -90°)",
    },
    clinical_action: "LAFB là dạng block phân nhánh phổ biến nhất vì nhánh trái trước mỏng và dài. Tầm soát bệnh mạch vành (LAD), tăng huyết áp hoặc bệnh cơ tim. Nếu kết hợp RBBB tạo thành Block hai phân nhánh (Bifascicular Block) cần theo dõi sát nguy cơ tiến triển thành Block AV độ III.",
    differential_diagnoses: ["Nhồi máu cơ tim cũ thành dưới (sóng Q ở DIII)", "Khí phế thũng", "Phì đại thất trái"],
    clinical_presentation: {
      symptoms: ["Không có triệu chứng lâm sàng đặc hiệu của riêng LAFB"],
      physical_signs: ["Tùy thuộc vào bệnh lý tim mạch nền tảng"],
      risk_factors: ["Bệnh van tim, tăng huyết áp, bệnh động mạch vành"],
    },
    emergency_management: {
      priorityLevel: "Mức 4 - Tầm soát bệnh lý kèm theo",
      initialStabilization: ["Đánh giá có kèm theo RBBB hoặc Block AV độ I không"],
      medications: ["Điều trị bệnh lý tim nền"],
      interventions: ["Theo dõi ECG định kỳ"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Tính trục QRS: DI dương, DII và aVF âm sâu -> Trục lệch trái mạnh (-45° đến -90°).",
        "2. Khảo sát hình thái QRS: DI và aVL có dạng qR; DII, DIII, aVF có dạng rS.",
        "3. Kiểm tra độ rộng QRS: QRS < 120ms (nếu ≥ 120ms là LBBB).",
      ],
      key_differential_features: ["Nhồi máu cơ tim thành dưới có Q rộng ở DII, aVF; LAFB chỉ có sóng r nhỏ mở đầu (rS)."],
    },
    red_flags: {
      contraindications: ["Khi LAFB đi kèm RBBB và PR dài (Block ba phân nhánh / Trifascicular Block) có nguy cơ block AV hoàn toàn bất ngờ gây ngất"],
      pitfalls: ["Nhầm sóng r nhỏ ở DIII với sóng Q hoại tử của nhồi máu cơ tim thành dưới cũ."],
    },
    patient_case: {
      age: 62,
      gender: "Nam",
      chiefComplaint: "Kiểm tra định kỳ tăng huyết áp",
      historyOfPresentIllness: "Bệnh nhân nam 62 tuổi điều trị Amlodipine 5mg, huyết áp kiểm soát tốt, điện tim tình cờ thấy trục lệch trái -60° dạng qR ở aVL.",
      vitals: { bloodPressure: "125/80 mmHg", heartRate: 70, respiratoryRate: 16, spO2: 98, temperature: 36.5 },
      labResults: { "Creatinine": "82 umol/L", "K+": "4.1 mmol/L" },
    },
  },

  // =========================================================================
  // HỆ IV: RỐI LOẠN NHỊP TRÊN THẤT & KÍCH THÍCH SỚM (supraventricular)
  // =========================================================================
  {
    id: "atrial_fibrillation",
    name: "Rung Nhĩ Đáp Ứng Thất Nhanh",
    name_en: "Atrial Fibrillation with Rapid Ventricular Response (AFib RVR)",
    category: "atrial",
    severity: "abnormal",
    system_id: "supraventricular",
    system_name: "Loạn Nhịp Trên Thất & Kích Thích Sớm",
    anatomical_region: "Cơ tâm nhĩ / Quanh lỗ tĩnh mạch phổi",
    criteria: [
      "Mất hoàn toàn sóng P xoang bình thường",
      "Thay thế bằng các sóng lăn tăn f (fibrillation waves) tần số cực nhanh 400 - 600 cpm, biên độ và hình dạng không đều",
      "Các khoảng R-R hoàn toàn không đều (loạn nhịp hoàn toàn - irregularly irregular rhythm)",
      "Phức bộ QRS thường hẹp (< 0.12s), trừ khi có dẫn truyền lệch hướng",
    ],
    lead_manifestations: {
      DII: "Khoảng cách R-R hoàn toàn không đều, mất sóng P xoang",
      V1: "Sóng f lăn tăn rõ nét với tần số nhĩ > 400 chu kỳ/phút",
      II: "Dải nhịp Lead II: R-R biến thiên hỗn loạn, tần số thất trung bình 135 bpm",
    },
    annotations: [
      { leadId: "DII", waveComponent: "RR", label: "↔ R-R hoàn toàn không đều (Loạn nhịp)", targetCyclePhase: 0.14, intervalEndPhase: 0.65, color: "#d97706", badgePlacement: "interval", criterionIndex: 2 },
      { leadId: "V1", waveComponent: "P", label: "~ Sóng f lăn tăn 400-600 cpm (Mất P)", targetCyclePhase: 0.10, color: "#7c3aed", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "II", waveComponent: "RR", label: "↔ R-R không theo quy luật chu kỳ", targetCyclePhase: 0.14, intervalEndPhase: 0.65, color: "#d97706", badgePlacement: "interval", criterionIndex: 2 },
    ],
    ecg_metrics: {
      expected_hr: "120 - 170 bpm (Thất nhanh)",
      pr_interval: "Không đo được (Mất P)",
      qrs_duration: "80 - 100 ms (Hẹp)",
      qt_interval: "320 - 360 ms",
      qrs_axis: "+60° (Bình thường)",
    },
    clinical_action: "Đánh giá huyết động! Nếu huyết động không ổn định (tụt HA, suy tim cấp, đau ngực): Sốc điện đồng bộ chuyển nhịp khẩn (100 - 200J). Nếu huyết động ổn định: Kiểm soát tần số thất bằng thuốc (Metoprolol tiêm TM, Diltiazem hoặc Digoxin). Đánh giá thang điểm CHA2DS2-VASc để chỉ định kháng đông dự phòng đột quỵ.",
    differential_diagnoses: ["Cuồng nhĩ dẫn truyền thay đổi", "Nhịp nhanh nhĩ đa ổ (MAT)", "Ngoại tâm thu nhĩ dày"],
    clinical_presentation: {
      symptoms: ["Hồi hộp đánh trống ngực dồn dập, cảm giác tim đập hỗn loạn nhảy múa trong lồng ngực", "Mệt mỏi, hụt hơi khi leo cầu thang, choáng váng"],
      physical_signs: ["Mạch loạn nhịp hoàn toàn: mạch quay không tương ứng với nhịp tim nghe ở mỏm (hụt mạch - pulse deficit)", "Huyết áp dao động"],
      risk_factors: ["Tăng huyết áp, bệnh van tim (hẹp hở van hai lá), đái tháo đường, cường giáp, tuổi cao"],
    },
    emergency_management: {
      priorityLevel: "Mức 2 - Cấp cứu kiểm soát nhịp và chống đông",
      initialStabilization: ["Mắc monitor theo dõi, lập đường truyền tĩnh mạch"],
      medications: [
        { name: "Metoprolol Tartrate", dose: "2.5 - 5mg tiêm TM chậm trong 2 phút", route: "IV Push", notes: "Lặp lại mỗi 5 phút tối đa 15mg để kiểm soát tần số tim < 110 bpm" },
        { name: "Diltiazem", dose: "0.25 mg/kg tiêm TM chậm", route: "IV Push", notes: "Dùng nếu không có suy tim giảm phân suất tống máu" },
        { name: "Amiodarone", dose: "150mg truyền TM trong 10-30 phút", route: "IV Infusion", notes: "Lựa chọn an toàn khi có suy tim cấp EF thấp" },
        { name: "Kháng đông (DOAC: Rivaroxaban/Apixaban hoặc Enoxaparin)", dose: "Theo phác đồ chống huyết khối", route: "Uống / SC", notes: "Bắt buộc tính điểm CHA2DS2-VASc" },
      ],
      interventions: ["Sốc điện đồng bộ chuyển nhịp (Cardioversion 100 - 200J) nếu huyết động không ổn định"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Khảo sát nhịp: Nhìn dải nhịp Lead II thấy R-R hoàn toàn không có quy luật chu kỳ.",
        "2. Tìm sóng P: Hoàn toàn không thấy sóng P xoang ở bất kỳ chuyển đạo nào.",
        "3. Soi V1: Thấy các sóng lăn tăn f nhỏ không đều -> Khẳng định Rung nhĩ.",
        "4. Tính tần số thất trung bình: Đếm số phức bộ QRS trong 6 giây (30 ô lớn) rồi nhân với 10.",
      ],
      key_differential_features: ["Cuồng nhĩ có sóng F răng cưa đều; MAT có ít nhất 3 hình thái sóng P khác nhau."],
    },
    red_flags: {
      contraindications: ["CHỐNG CHỈ ĐỊNH thuốc chẹn nút AV (Verapamil, Diltiazem, Digoxin, Beta-blocker) khi Rung Nhĩ đi kèm Hội Chứng WPW vì có thể dẫn truyền cực nhanh qua đường phụ gây Rung Thất tử vong!"],
      pitfalls: ["Chuyển nhịp về xoang (bằng điện hoặc thuốc) cho bệnh nhân rung nhĩ kéo dài > 48h mà chưa dùng kháng đông đủ 3 tuần hoặc chưa siêu âm tim qua thực quản (TEE) loại trừ huyết khối tiểu nhĩ trái -> Nguy cơ bắn cục máu đông gây ĐỘT QUỴ NÃO diện rộng."],
    },
    patient_case: {
      age: 69,
      gender: "Nữ",
      chiefComplaint: "Hồi hộp đánh trống ngực dữ dội, tim đập loạn xạ 4 giờ",
      historyOfPresentIllness: "Bệnh nhân nữ 69 tuổi tăng huyết áp 10 năm, đột ngột thấy tim đập thình thịch hỗn loạn trong ngực, vã mồ hôi, mệt lả không đi lại được.",
      vitals: { bloodPressure: "125/80 mmHg", heartRate: 148, respiratoryRate: 20, spO2: 96, temperature: 36.8 },
      labResults: { "TSH": "1.8 uIU/mL", "K+": "4.2 mmol/L", "Troponin I": "22 ng/L" },
    },
  },

  {
    id: "atrial_flutter",
    name: "Cuồng Nhĩ Dẫn Truyền 2:1",
    name_en: "Atrial Flutter with 2:1 Conduction",
    category: "atrial",
    severity: "abnormal",
    system_id: "supraventricular",
    system_name: "Loạn Nhịp Trên Thất & Kích Thích Sớm",
    anatomical_region: "Vòng vào lại eo van ba lá - tĩnh mạch chủ dưới (CTI)",
    criteria: [
      "Mất hoàn toàn sóng P xoang bình thường",
      "Thay thế bằng sóng cuồng nhĩ dạng răng cưa (F waves - Sawtooth pattern) đều đặn, tần số nhĩ điển hình 300 cpm (250 - 350 cpm)",
      "Sóng F âm rõ rệt và liên tục không có đường đẳng điện ở DII, DIII, aVF",
      "Dẫn truyền nhĩ thất thường có tỉ lệ cố định 2:1 (tần số thất chính xác 150 bpm) hoặc 4:1 (75 bpm)",
      "Phức bộ QRS thường hẹp (< 0.12s)",
    ],
    lead_manifestations: {
      DII: "Sóng răng cưa F đều đặn tần số 300 cpm, không có đường đẳng điện giữa các sóng",
      DIII: "Sóng F âm hình răng cưa kinh điển liên tiếp",
      aVF: "Sóng F răng cưa rõ rệt",
      V1: "Sóng F dương nhọn",
      II: "Dải nhịp Lead II: Cứ 2 sóng răng cưa F có 1 phức bộ QRS (dẫn truyền 2:1, tần số thất đều 150 bpm)",
    },
    annotations: [
      { leadId: "DII", waveComponent: "P", label: "Sóng răng cưa F (300 bpm, 2:1)", targetCyclePhase: 0.05, color: "#d97706", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "DIII", waveComponent: "P", label: "Sóng F âm liên tục không đẳng điện", targetCyclePhase: 0.05, color: "#d97706", badgePlacement: "bottom", criterionIndex: 2 },
      { leadId: "II", waveComponent: "P", label: "Răng cưa F tần số nhĩ 300 bpm", targetCyclePhase: 0.05, color: "#d97706", badgePlacement: "bottom", criterionIndex: 1 },
    ],
    ecg_metrics: {
      expected_hr: "150 bpm (Dẫn 2:1)",
      pr_interval: "Không đo được (Sóng F)",
      qrs_duration: "80 - 95 ms",
      qt_interval: "300 - 340 ms",
      qrs_axis: "+60° (Bình thường)",
    },
    clinical_action: "Kiểm soát tần số thất bằng thuốc chẹn Beta/chẹn Canxi (dù cuồng nhĩ đáp ứng thuốc kém hơn rung nhĩ). Sốc điện đồng bộ chuyển nhịp mức năng lượng thấp (50 - 100J) cho hiệu quả cắt cơn rất cao (> 90%). Chỉ định triệt đốt vòng vào lại eo van ba lá (CTI Ablation) bằng sóng cao tần RF có tỉ lệ thành công triệt để > 95%. Kháng đông dự phòng tương tự rung nhĩ.",
    differential_diagnoses: ["Nhịp nhanh xoang 150 bpm", "Nhịp nhanh kịch phát trên thất (SVT)", "Rung nhĩ"],
    clinical_presentation: {
      symptoms: ["Hồi hộp, tim đập nhanh liên tục đều tăm tắp", "Mệt mỏi, khó thở khi gắng sức"],
      physical_signs: ["Mạch bắt đều đặn đúng 150 lần/phút", "Huyết áp ổn định hoặc hơi thấp"],
      risk_factors: ["Bệnh phổi tắc nghẽn mạn tính (COPD), sau phẫu thuật tim mở, bệnh tim thiếu máu"],
    },
    emergency_management: {
      priorityLevel: "Mức 2 - Cấp cứu loạn nhịp trên thất",
      initialStabilization: ["Theo dõi monitor, lập đường truyền"],
      medications: [
        { name: "Diltiazem", dose: "0.25 mg/kg tiêm TM trong 2 phút", route: "IV Push", notes: "Kiểm soát tần số thất" },
        { name: "Metoprolol", dose: "5mg tiêm TM", route: "IV Push", notes: "Chẹn beta giảm dẫn truyền qua nút AV" },
      ],
      interventions: [
        "Sốc điện đồng bộ (Synchronized Cardioversion 50 - 100J) là biện pháp chuyển nhịp an toàn và hiệu quả nhất",
        "Triệt đốt điện sinh lý CTI qua catheter",
      ],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Thấy nhịp tim đều tăm tắp chính xác 150 bpm: Luôn nghĩ đến Cuồng nhĩ dẫn truyền 2:1 đầu tiên!",
        "2. Soi DII, DIII, aVF: Tìm hình ảnh răng cưa F không có đường đẳng điện.",
        "3. Làm nghiệm pháp kích thích phó giao cảm (xoa xoang cảnh) hoặc tiêm Adenosine: Sẽ làm chậm dẫn truyền nút AV thoáng qua, để lộ rõ các sóng răng cưa F.",
      ],
      key_differential_features: ["Nhịp nhanh xoang có đường đẳng điện phẳng giữa sóng P và T; Cuồng nhĩ không có đường đẳng điện phẳng ở thành dưới."],
    },
    red_flags: {
      contraindications: ["Dùng thuốc nhóm 1C (Flecainide, Propafenone) đơn độc không kèm thuốc chẹn nút AV có thể biến cuồng nhĩ 2:1 thành dẫn truyền 1:1 với tần số thất 250-300 bpm gây trụy mạch tử vong!"],
      pitfalls: ["Nhầm Cuồng nhĩ 2:1 (150 bpm) thành Nhịp nhanh xoang vì 1 sóng F bị vùi lấp bên trong phức bộ QRS."],
    },
    patient_case: {
      age: 65,
      gender: "Nam",
      chiefComplaint: "Hồi hộp đánh trống ngực liên tục, tim đập đúng 150 lần/phút",
      historyOfPresentIllness: "Bệnh nhân nam 65 tuổi có tiền sử COPD, 1 ngày nay cảm giác tim đập nhanh liên hồi đều tăm tắp, mệt mỏi hụt hơi.",
      vitals: { bloodPressure: "120/78 mmHg", heartRate: 150, respiratoryRate: 20, spO2: 95, temperature: 36.6 },
      labResults: { "K+": "4.0 mmol/L", "Troponin I": "< 10 ng/L" },
    },
  },

  {
    id: "svt",
    name: "Nhịp Nhanh Kịch Phát Trên Thất (SVT / AVNRT)",
    name_en: "Paroxysmal Supraventricular Tachycardia",
    category: "atrial",
    severity: "abnormal",
    system_id: "supraventricular",
    system_name: "Loạn Nhịp Trên Thất & Kích Thích Sớm",
    anatomical_region: "Vòng vào lại nút AV (AVNRT) hoặc đường phụ (AVRT)",
    criteria: [
      "Nhịp nhanh đều đặn tần số rất cao, thường từ 160 đến 220 chu kỳ/phút",
      "Phức bộ QRS hẹp (< 0.12s, thường 80 - 90 ms)",
      "Sóng P thường bị vùi lấp hoàn toàn trong phức bộ QRS hoặc xuất hiện ngay sau QRS dưới dạng sóng giả r' ở V1 hoặc giả s ở DII, DIII",
      "Khởi phát đột ngột và kết thúc đột ngột (hiện tượng On / Off)",
    ],
    lead_manifestations: {
      DII: "Tần số nhanh đều 185 bpm, QRS hẹp, không thấy sóng P xoang",
      V1: "Sóng giả r' (pseudo-r') nhỏ xuất hiện ở cuối QRS",
      II: "Dải nhịp Lead II: Nhịp nhanh đều tăm tắp 185 bpm",
    },
    annotations: [
      { leadId: "DII", waveComponent: "RR", label: "↔ QRS hẹp đều tăm tắp tần số 185 bpm", targetCyclePhase: 0.15, intervalEndPhase: 0.45, color: "#e11d48", badgePlacement: "interval", criterionIndex: 0 },
      { leadId: "V1", waveComponent: "R", label: "Sóng giả r' (pseudo-r') ở đuôi QRS", targetCyclePhase: 0.26, color: "#9333ea", badgePlacement: "top", criterionIndex: 2 },
      { leadId: "II", waveComponent: "RR", label: "SVT khởi phát & kết thúc đột ngột", targetCyclePhase: 0.15, intervalEndPhase: 0.45, color: "#e11d48", badgePlacement: "interval", criterionIndex: 3 },
    ],
    ecg_metrics: {
      expected_hr: "160 - 220 bpm",
      pr_interval: "Không đo được (P vùi lấp)",
      qrs_duration: "75 - 90 ms",
      qt_interval: "260 - 300 ms",
      qrs_axis: "+60° (Bình thường)",
    },
    clinical_action: "XỬ TRÍ CẮT CƠN THEO BẬC: (1) Nghiệm pháp Valsalva cải biên (thổi xi-lanh 15 giây rồi hạ đầu nâng chân) cho tỉ lệ cắt cơn 43%; (2) Nếu thất bại: Tiêm Adenosine 6mg tiêm tĩnh mạch cực nhanh (bolus trong 1-2 giây) kèm bơm đuổi 20ml nước muối sinh lý; nếu sau 1-2 phút chưa cắt cơn tiêm tiếp liều 12mg; (3) Sốc điện đồng bộ (50 - 100J) nếu huyết động tụt.",
    differential_diagnoses: ["Nhịp nhanh xoang", "Cuồng nhĩ dẫn truyền 2:1", "Nhịp nhanh nhĩ"],
    clinical_presentation: {
      symptoms: ["Cảm giác tim đập như nhảy ra khỏi lồng ngực xuất hiện đột ngột", "Hồi hộp, lo âu, tức ngực nhẹ, chóng mặt"],
      physical_signs: ["Mạch bắt cực nhanh 180 - 200 lần/phút đều như đồng hồ", "Huyết áp ban đầu ổn định sau đó có thể tụt nhẹ do giảm thời gian làm đầy thất"],
      risk_factors: ["Thường gặp ở người trẻ tuổi, phụ nữ, căng thẳng, thiếu ngủ, lạm dụng cà phê"],
    },
    emergency_management: {
      priorityLevel: "Mức 2 - Cấp cứu cắt cơn nhịp nhanh",
      initialStabilization: ["Mắc monitor ghi dải nhịp liên tục trong lúc cắt cơn", "Lập đường truyền tĩnh mạch lớn ở tay trái hoặc cẳng tay gần tim"],
      medications: [
        { name: "Adenosine", dose: "6mg tiêm TM cực nhanh trong 1-2s, đuổi 20ml NaCl 0.9%", route: "IV Rapid Push", notes: "Bệnh nhân sẽ thấy cảm giác nghẹn thở khó chịu vài giây rồi tim đập chậm lại về xoang" },
        { name: "Adenosine (liều 2)", dose: "12mg tiêm TM cực nhanh", route: "IV Rapid Push", notes: "Dùng sau 1-2 phút nếu liều 6mg không cắt được cơn" },
        { name: "Verapamil", dose: "5mg tiêm TM chậm", route: "IV Push", notes: "Lựa chọn thay thế nếu Adenosine thất bại và huyết áp tốt" },
      ],
      interventions: [
        "Nghiệm pháp Valsalva cải biên (Modified Valsalva Maneuver)",
        "Sốc điện đồng bộ 50 - 100J nếu tụt huyết áp hoặc lơ mơ",
        "Triệt đốt đường dẫn truyền chậm nút AV (Slow Pathway Ablation) điều trị khỏi vĩnh viễn",
      ],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Xác nhận QRS hẹp (< 120ms) và nhịp tim cực nhanh đều đặn 160-220 bpm.",
        "2. Tìm sóng P: Nếu không thấy P hoặc thấy P ngay sát đuôi QRS -> AVNRT (vào lại nút AV) hoặc AVRT (vào lại nhĩ thất qua đường phụ).",
        "3. Tiến hành nghiệm pháp Valsalva cải biên đầu tiên.",
        "4. Nếu không thành công: Tiêm Adenosine qua chạc ba tĩnh mạch cẳng tay và dơ cao tay.",
      ],
      key_differential_features: ["Nhịp nhanh xoang tần số hiếm khi > 160 bpm ở người lớn và không bao giờ cắt cơn đột ngột bằng Adenosine."],
    },
    red_flags: {
      contraindications: ["CHỐNG CHỈ ĐỊNH Adenosine ở bệnh nhân hen phế quản nặng (nguy cơ co thắt phế quản cấp tử vong) - Thay bằng Verapamil hoặc Diltiazem"],
      pitfalls: ["Tiêm Adenosine quá chậm (thuốc có thời gian bán hủy cực ngắn < 10 giây trong máu, tiêm chậm sẽ bị enzym phá hủy hoàn toàn trước khi đến tim)."],
    },
    patient_case: {
      age: 32,
      gender: "Nữ",
      chiefComplaint: "Đột ngột tim đập cực nhanh, nghẹt thở khi đang làm việc văn phòng",
      historyOfPresentIllness: "Cô gái 32 tuổi đang ngồi gõ máy tính thì đột ngột tim đập thình thịch dữ dội như muốn nhảy ra ngoài, đếm mạch 190 lần/phút, hoa mắt chóng mặt.",
      vitals: { bloodPressure: "105/65 mmHg", heartRate: 188, respiratoryRate: 20, spO2: 98, temperature: 36.6 },
      labResults: { "K+": "4.1 mmol/L", "Troponin I": "< 10 ng/L" },
    },
  },

  {
    id: "wpw_syndrome",
    name: "Hội Chứng Wolff-Parkinson-White (WPW)",
    name_en: "Wolff-Parkinson-White Syndrome (Pre-excitation)",
    category: "atrial",
    severity: "critical",
    system_id: "supraventricular",
    system_name: "Loạn Nhịp Trên Thất & Kích Thích Sớm",
    anatomical_region: "Đường dẫn truyền phụ nhĩ - thất (Cầu Kent)",
    criteria: [
      "Khoảng PR ngắn < 0.12s (< 120 ms / 3 ô nhỏ)",
      "Sóng Delta (Delta wave): Sườn dốc lên của phức bộ QRS thoai thoải chậm ở giai đoạn đầu do tâm thất bị kích thích sớm qua đường phụ",
      "Phức bộ QRS dãn rộng ≥ 0.12s (> 120 ms)",
      "Thay đổi đoạn ST và sóng T thứ phát trái chiều với sóng Delta",
      "Tiền sử hoặc nguy cơ xuất hiện các cơn nhịp nhanh kịch phát (AVRT) hoặc rung nhĩ dẫn truyền qua đường phụ cực kỳ nguy hiểm",
    ],
    lead_manifestations: {
      V1: "Sóng Delta dương cao, PR ngắn 90ms, QRS dãn rộng 130ms (Type A - đường phụ bên trái)",
      V2: "Sóng Delta rõ, sườn dốc lên thoai thoải",
      DII: "PR cực ngắn < 100ms, sóng Delta nhọn ở đỉnh",
      aVF: "Sóng Delta dương",
    },
    annotations: [
      { leadId: "DII", waveComponent: "PR", label: "↔ PR ngắn < 120ms (Kích thích sớm)", targetCyclePhase: 0.08, intervalEndPhase: 0.18, color: "#d97706", badgePlacement: "interval", criterionIndex: 0 },
      { leadId: "V1", waveComponent: "R", label: "▲ Sóng Delta (Delta wave) sườn dốc thoai thoải", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "V1", waveComponent: "QRS", label: "QRS dãn rộng 130ms do hợp nhất xung động", targetCyclePhase: 0.24, color: "#9333ea", badgePlacement: "top", criterionIndex: 2 },
    ],
    ecg_metrics: {
      expected_hr: "70 - 100 bpm (Lúc nghỉ)",
      pr_interval: "80 - 110 ms (< 120ms)",
      qrs_duration: "120 - 145 ms (≥ 120ms)",
      qt_interval: "390 - 430 ms",
      qrs_axis: "+30° (Bình thường / Lệch nhẹ)",
    },
    clinical_action: "Nếu bệnh nhân có cơn nhịp nhanh vào lại (AVRT): xử trí tương tự SVT. NẾU WPW ĐI KÈM RUNG NHĨ (AFib + WPW): CẤP CỨU TỐI KHẨN! Điện tim có nhịp nhanh QRS rộng, không đều, tần số thất > 200 - 300 bpm. CHỈ ĐỊNH DUY NHẤT: SỐC ĐIỆN ĐỒNG BỘ HOẶC DÙNG PROCAINAMIDE / IBUTILIDE. Triệt đốt đường phụ (Catheter Ablation) chữa khỏi dứt điểm.",
    differential_diagnoses: ["Block nhánh trái (LBBB)", "Phì đại thất trái", "Nhồi máu cơ tim cũ (sóng Delta âm giả sóng Q)"],
    clinical_presentation: {
      symptoms: ["Cơn hồi hộp đánh trống ngực đột ngột", "Chóng mặt, ngất xỉu khi có cơn nhịp nhanh kịch phát"],
      physical_signs: ["Lúc nghỉ khám bình thường; trong cơn nhịp tim đập cực nhanh"],
      risk_factors: ["Bẩm sinh có đường dẫn truyền phụ kết nối tâm nhĩ và tâm thất"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 nếu WPW kèm Rung Nhĩ (Code Red)",
      initialStabilization: ["Mắc monitor phá rung sẵn sàng"],
      medications: [
        { name: "Procainamide", dose: "10 - 17 mg/kg truyền TM với tốc độ 20-50 mg/phút", route: "IV Infusion", notes: "Thuốc chống loạn nhịp nhóm 1A ức chế đường phụ an toàn trong WPW kèm AFib" },
        { name: "Amiodarone", dose: "150mg truyền TM", route: "IV Infusion", notes: "Dùng thận trọng khi không có Procainamide" },
      ],
      interventions: [
        "Sốc điện chuyển nhịp khẩn cấp (Cardioversion 100 - 200J) nếu WPW có rung nhĩ tụt huyết áp",
        "Triệt đốt đường phụ qua catheter (RF Ablation)",
      ],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Đo khoảng PR: Thấy PR rất ngắn < 3 ô nhỏ (120ms).",
        "2. Nhìn chân phức bộ QRS: Thấy sườn dốc lên thoai thoải (sóng Delta).",
        "3. Đo độ rộng QRS: Thấy dãn rộng ≥ 120ms -> Khẳng định Hội chứng tiền kích thích WPW.",
        "4. Phân loại: Type A (Delta dương ở V1 -> đường phụ bên trái); Type B (Delta âm ở V1 -> đường phụ bên phải).",
      ],
      key_differential_features: ["LBBB có PR bình thường; WPW có PR ngắn và sóng Delta ở đầu phức bộ."],
    },
    red_flags: {
      contraindications: ["TUYỆT ĐỐI CẤM dùng các thuốc chẹn nút AV (Adenosine, Digoxin, Verapamil, Diltiazem, Beta-blocker) khi WPW có Rung Nhĩ vì sẽ chặn nút AV đẩy toàn bộ xung động qua cầu Kent dẫn tới RUNG THẤT VÀ TỬ VONG TRONG VÀI GIÂY!"],
      pitfalls: ["Sóng Delta âm ở các chuyển đạo thành dưới (DII, DIII, aVF) trông rất giống sóng Q hoại tử, dễ bị chẩn đoán nhầm thành nhồi máu cơ tim cũ."],
    },
    patient_case: {
      age: 24,
      gender: "Nam",
      chiefComplaint: "Hồi hộp đánh trống ngực tái phát nhiều lần sau chơi bóng đá",
      historyOfPresentIllness: "Thanh niên 24 tuổi hay bị những cơn tim đập nhanh thình thịch kéo dài 15-30 phút sau khi đá bóng, điện tim lúc nghỉ có PR = 95ms và sóng Delta rõ ở V1-V4.",
      vitals: { bloodPressure: "120/75 mmHg", heartRate: 78, respiratoryRate: 16, spO2: 99, temperature: 36.6 },
      labResults: { "K+": "4.2 mmol/L", "Troponin I": "< 10 ng/L" },
    },
  },

  // =========================================================================
  // HỆ V: LOẠN NHỊP THẤT & NGỪNG TUẦN HOÀN (ventricular_arrest)
  // =========================================================================
  {
    id: "pvc_frequent",
    name: "Ngoại Tâm Thu Thất Dày Dạng Nhịp Ba (Trigeminy)",
    name_en: "Frequent Premature Ventricular Complexes (Trigeminy)",
    category: "ventricular",
    severity: "abnormal",
    system_id: "ventricular_arrest",
    system_name: "Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn",
    anatomical_region: "Cơ tâm thất / Đường ra thất phải RVOT",
    criteria: [
      "Xuất hiện các nhát bóp đến sớm có phức bộ QRS dãn rộng dị dạng (≥ 0.12s)",
      "Không có sóng P xoang đi trước nhát bóp ngoại tâm thu",
      "Đoạn ST và sóng T thứ phát biến đổi trái chiều với hướng của phức bộ QRS",
      "Khoảng nghỉ bù hoàn toàn (khoảng cách giữa 2 nhịp xoang kẹp giữa ngoại tâm thu bằng đúng 2 chu kỳ nhịp xoang)",
      "Dạng nhịp ba (Trigeminy): Cứ 2 nhát xoang bình thường đi kèm 1 nhát ngoại tâm thu thất lặp lại đều đặn",
    ],
    lead_manifestations: {
      DII: "2 nhát xoang bình thường kèm 1 nhát QRS dị dạng dãn rộng 140ms có sóng T âm sâu",
      V1: "Nhát PVC dãn rộng hình thái block nhánh",
      II: "Dải nhịp Lead II: Mô hình nhịp ba (2 xoang : 1 PVC) lặp lại liên tục",
    },
    annotations: [
      { leadId: "DII", waveComponent: "R", label: "PVC dãn rộng 140ms đến sớm dị dạng", targetCyclePhase: 0.25, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "DII", waveComponent: "T", label: "ST-T biến đổi trái chiều QRS", targetCyclePhase: 0.45, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 2 },
      { leadId: "II", waveComponent: "RR", label: "Nghỉ bù hoàn toàn (Full compensatory pause)", targetCyclePhase: 0.30, intervalEndPhase: 0.70, color: "#d97706", badgePlacement: "interval", criterionIndex: 3 },
    ],
    ecg_metrics: {
      expected_hr: "65 - 85 bpm",
      pr_interval: "Không có P trước PVC",
      qrs_duration: "135 - 150 ms (PVC rộng)",
      qt_interval: "420 - 450 ms",
      qrs_axis: "Trục thay đổi từng nhát",
    },
    clinical_action: "Đánh giá tải lượng PVC (Holter 24h). Tầm soát bệnh tim thực tổn (thiếu máu cơ tim, suy tim, bệnh cơ tim) và điện giải đồ (K+, Mg2+). Nếu PVC dày > 15-20% tổng số nhịp hoặc gây suy giảm chức năng tim: Điều trị bằng chẹn Beta hoặc triệt đốt điện sinh lý bằng sóng cao tần (Catheter Ablation).",
    differential_diagnoses: ["Ngoại tâm thu nhĩ dẫn truyền lệch hướng", "Ngoại tâm thu bộ nối"],
    clinical_presentation: {
      symptoms: ["Cảm giác tim thót lại, hẫng hụt trong ngực kèm theo một nhát đập mạnh dội lên cổ", "Mệt mỏi, lo âu"],
      physical_signs: ["Bắt mạch thấy mạch ngắt quãng không đều, sau nhát ngưng có một nhát mạch nảy rất mạnh"],
      risk_factors: ["Căng thẳng, cà phê, thiếu ngủ, thiếu máu cơ tim, rối loạn điện giải (hạ Kali)"],
    },
    emergency_management: {
      priorityLevel: "Mức 3 - Tầm soát điện giải và tim mạch",
      initialStabilization: ["Lấy máu xét nghiệm Ion đồ (K+, Mg2+), Troponin"],
      medications: [
        { name: "Magnesi Sulfat", dose: "1 - 2g truyền TM", route: "IV Infusion", notes: "Ổn định màng tế bào cơ tim" },
        { name: "Metoprolol", dose: "25 - 50mg/ngày", route: "Uống", notes: "Thuốc đầu tay giảm triệu chứng PVC" },
      ],
      interventions: ["Triệt đốt RF qua catheter ổ ngoại tâm thu (thường ở đường ra thất phải RVOT)"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Nhận diện nhát đến sớm: QRS dãn rộng, dị dạng, không có P đi trước.",
        "2. Kiểm tra khoảng nghỉ bù: Dùng compa đo thấy khoảng nghỉ bù hoàn toàn -> Khẳng định nguồn gốc từ tâm thất.",
        "3. Đếm quy luật: 2 xoang + 1 PVC = Trigeminy (nhịp ba); 1 xoang + 1 PVC = Bigeminy (nhịp đôi).",
      ],
      key_differential_features: ["Ngoại tâm thu nhĩ dẫn truyền lệch hướng có sóng P' đi trước và khoảng nghỉ bù không hoàn toàn."],
    },
    red_flags: {
      contraindications: ["Không dùng thuốc chống loạn nhịp nhóm 1 (Flecainide) ở bệnh nhân có sẹo nhồi máu cơ tim cũ vì làm tăng nguy cơ tử vong (theo thử nghiệm CAST)"],
      pitfalls: ["Bỏ sót hiện tượng 'R trên T' (R-on-T) khi PVC rơi đúng vào đỉnh sóng T của nhát bóp trước, có thể kích phát Cơn Nhanh Thất hoặc Rung Thất."],
    },
    patient_case: {
      age: 48,
      gender: "Nam",
      chiefComplaint: "Cảm giác tim thỉnh thoảng hẫng hụt như rớt nhịp khó chịu kéo dài 1 tuần",
      historyOfPresentIllness: "Kỹ sư xây dựng 48 tuổi dạo này làm ca đêm căng thẳng, uống nhiều cà phê, thấy tim cứ đập 2 nhịp lại khựng lại 1 nhịp rồi đập mạnh.",
      vitals: { bloodPressure: "125/80 mmHg", heartRate: 72, respiratoryRate: 16, spO2: 98, temperature: 36.6 },
      labResults: { "K+": "3.8 mmol/L", "Mg2+": "0.75 mmol/L", "Troponin I": "< 10 ng/L" },
    },
  },

  {
    id: "ventricular_tachycardia",
    name: "Cơn Nhanh Thất Đơn Dạng (Monomorphic VT)",
    name_en: "Monomorphic Ventricular Tachycardia",
    category: "ventricular",
    severity: "critical",
    system_id: "ventricular_arrest",
    system_name: "Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn",
    anatomical_region: "Cơ tâm thất / Vòng vào lại quanh sẹo nhồi máu cũ",
    criteria: [
      "Nhịp nhanh tần số 140 - 250 chu kỳ/phút với phức bộ QRS dãn rộng dị dạng (≥ 0.12s)",
      "Các phức bộ QRS có cùng một hình dạng đồng nhất qua từng chu kỳ (đơn dạng - monomorphic)",
      "Dấu hiệu phân ly nhĩ thất (AV Dissociation): Sóng P xoang độc lập đôi khi nhìn thấy được",
      "Nhát bắt được thất (Capture beat) hoặc nhát bóp hỗn hợp (Fusion beat) là tiêu chuẩn vàng khẳng định nguồn gốc thất",
      "Dấu hiệu đồng hướng (Concordance): Toàn bộ QRS ở V1-V6 đều dương hoặc đều âm",
    ],
    lead_manifestations: {
      DII: "Dải sóng QRS khổng lồ dãn rộng 160ms, tần số đều đặn 175 bpm, không thấy sóng P",
      V1: "QRS dãn rộng cực độ dạng block nhánh trái dị dạng",
      aVR: "Sóng R đơn độc ở aVR (Tiêu chuẩn Brugada / Vereckei)",
    },
    annotations: [
      { leadId: "DII", waveComponent: "R", label: "⚡ QRS dãn rộng dị dạng 160ms (VT) 175 bpm", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "DII", waveComponent: "RR", label: "Cơn nhanh thất đơn dạng đều đặn", targetCyclePhase: 0.15, intervalEndPhase: 0.48, color: "#e11d48", badgePlacement: "interval", criterionIndex: 1 },
      { leadId: "V1", waveComponent: "QRS", label: "Dấu hiệu đồng hướng âm toàn bộ V1-V6", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 4 },
    ],
    ecg_metrics: {
      expected_hr: "140 - 220 bpm",
      pr_interval: "Không có PR",
      qrs_duration: "140 - 180 ms (Dãn rộng)",
      qt_interval: "Không đo được",
      qrs_axis: "Trục vô định (Northwest axis -90° đến 180°)",
    },
    clinical_action: "CẤP CỨU HỒI SỨC TIM MẠCH! BƯỚC 1: BẮT MẠCH CẢNH/MẠCH BẸN NGAY LẬP TỨC. (1) Nếu MẤT MẠCH (Pulseless VT) -> Xử trí như Rung Thất: Phá rung không đồng bộ ngay (Defibrillation 200J Biphasic) + Ép tim CPR; (2) Nếu CÒN MẠCH nhưng tụt HA, lơ mơ -> Sốc điện đồng bộ (Synchronized Cardioversion 100J); (3) Nếu còn mạch huyết động ổn định -> Truyền Amiodarone 150mg trong 10 phút.",
    differential_diagnoses: ["SVT dẫn truyền lệch hướng", "Nhịp nhanh do đường phụ (Antidromic AVRT)"],
    clinical_presentation: {
      symptoms: ["Choáng váng ngất xỉu, mất tri giác đột ngột", "Đau ngực dữ dội, khó thở nghẹt thở"],
      physical_signs: ["Mạch cảnh yếu hoặc mất mạch hoàn toàn", "Huyết áp tụt kẹp hoặc không đo được", "Da tím tái lạnh vã mồ hôi"],
      risk_factors: ["Nhồi máu cơ tim cũ có sẹo cơ thất, suy tim nặng EF < 30%, bệnh cơ tim phì đại"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn cấp (Code Red)",
      initialStabilization: ["Kêu gọi hỗ trợ Code Blue / Báo động ngừng tim", "Kéo máy phá rung đến cạnh giường ngay"],
      medications: [
        { name: "Amiodarone", dose: "150mg pha 100ml Dextrose 5% truyền TM 10 phút", route: "IV Infusion", notes: "Chỉ dùng khi bệnh nhân CÒN MẠCH và huyết động còn duy trì được" },
        { name: "Lidocaine", dose: "1 - 1.5 mg/kg tiêm TM", route: "IV Push", notes: "Lựa chọn thay thế hoặc hỗ trợ trong nhồi máu cơ tim cấp" },
      ],
      interventions: [
        "Sốc điện phá rung (Defibrillation 200J Biphasic) ngay nếu MẤT MẠCH",
        "Sốc điện đồng bộ (Cardioversion 100J) nếu CÒN MẠCH nhưng tụt huyết áp",
        "Cấy máy phá rung tự động (ICD) dự phòng đột tử",
      ],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Thấy nhịp nhanh QRS rộng (≥ 120ms): Phải luôn xem là NHANH THẤT cho đến khi có bằng chứng ngược lại!",
        "2. Áp dụng lưu đồ Brugada 4 bước: (1) Không có dạng RS ở tất cả V1-V6? (2) Khoảng RS > 100ms? (3) Phân ly nhĩ thất? (4) Tiêu chuẩn hình thái VT ở V1/V6?",
        "3. Tiêu chuẩn Vereckei ở aVR: Có sóng R đơn độc khởi đầu ở aVR -> 98% là Nhanh Thất.",
      ],
      key_differential_features: ["Nhát bắt được thất (Capture beat) và nhát bóp hòa nhập (Fusion beat) là bằng chứng không thể chối cãi của Nhanh Thất."],
    },
    red_flags: {
      contraindications: ["TUYỆT ĐỐI KHÔNG TIÊM VERAPAMIL / DILTIAZEM cho bất kỳ bệnh nhân nhịp nhanh QRS rộng nào vì sẽ làm trụy mạch và ngừng tim ngay tức khắc!"],
      pitfalls: ["Chậm trễ sốc điện vì cố gắng phân biệt VT với SVT dẫn truyền lệch hướng. Khi huyết động không ổn định: SỐC ĐIỆN NGAY."],
    },
    patient_case: {
      age: 66,
      gender: "Nam",
      chiefComplaint: "Đột ngột ngất lịm, gọi hỏi không đáp ứng tại sảnh bệnh viện",
      historyOfPresentIllness: "Bệnh nhân nam 66 tuổi tiền sử nhồi máu cơ tim cũ EF 28%, đang ngồi chờ khám thì ngã gục xuống sàn, mắt trợn ngược, thở ngáp, mạch cảnh bắt rất yếu và nhanh.",
      vitals: { bloodPressure: "60/30 mmHg", heartRate: 180, respiratoryRate: 24, spO2: 82, temperature: 36.4 },
      labResults: { "Troponin I": "320 ng/L", "K+": "3.5 mmol/L", "Lactate": "5.2 mmol/L" },
    },
  },

  {
    id: "torsades_de_pointes",
    name: "Cơn Xoắn Đỉnh (Torsades de Pointes - TdP)",
    name_en: "Torsades de Pointes (Polymorphic VT with Long QT)",
    category: "ventricular",
    severity: "critical",
    system_id: "ventricular_arrest",
    system_name: "Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn",
    anatomical_region: "Cơ tâm thất kèm tái cực muộn (QT kéo dài)",
    criteria: [
      "Cơn nhịp nhanh thất đa dạng (Polymorphic VT) với tần số rất nhanh 200 - 250 bpm",
      "Đặc điểm hình thái kinh điển: Đỉnh của các phức bộ QRS liên tục thay đổi biên độ và cực tính, xoắn vặn quanh đường đẳng điện như một dải ruy-băng",
      "Xuất hiện trên nền khoảng QT kéo dài (QTc > 500ms) lúc nhịp xoang cơ bản",
      "Khởi phát bằng chu kỳ 'Ngắn - Dài - Ngắn' (Short-Long-Short sequence)",
      "Dễ thoái triển thành Rung Thất gây ngừng tuần hoàn tử vong",
    ],
    lead_manifestations: {
      DII: "Phức bộ QRS dãn rộng, biên độ nhấp nhô lượn sóng lúc cao lúc thấp, đỉnh xoắn quanh trục đẳng điện",
      V1: "Hình thái đa dạng biến đổi liên tục",
      II: "Dải nhịp Lead II: Hình ảnh dải lụa xoắn vặn kinh điển của Torsades de Pointes",
    },
    annotations: [
      { leadId: "DII", waveComponent: "R", label: "⚡ QRS xoay trục quanh đường đẳng điện (TdP)", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "DII", waveComponent: "RR", label: "Tần số 220 bpm đa dạng (Polymorphic)", targetCyclePhase: 0.15, intervalEndPhase: 0.50, color: "#e11d48", badgePlacement: "interval", criterionIndex: 0 },
      { leadId: "II", waveComponent: "RR", label: "Chu kỳ khởi phát Short-Long-Short trên nền QT dài", targetCyclePhase: 0.25, intervalEndPhase: 0.65, color: "#9333ea", badgePlacement: "interval", criterionIndex: 3 },
    ],
    ecg_metrics: {
      expected_hr: "200 - 250 bpm",
      pr_interval: "Không đo được",
      qrs_duration: "140 - 200 ms (Đa dạng)",
      qt_interval: "QTc cơ bản > 500 ms",
      qrs_axis: "Xoay liên tục quanh trục",
    },
    clinical_action: "CẤP CỨU TỐI KHẨN CẤP! (1) TIÊM TĨNH MẠCH MAGNESI SULFAT 2g TRONG 1-2 PHÚT (bất kể nồng độ Magne máu bình thường hay hạ); (2) Nếu mất mạch hoặc thoái triển sang Rung Thất: Phá rung khử rung không đồng bộ (Defibrillation 200J) lập tức; (3) Tăng tần số tim bằng tạo nhịp tạm thời (Overdrive Pacing 90-110 bpm) hoặc truyền Isoproterenol để rút ngắn khoảng QT; (4) Ngừng ngay mọi thuốc kéo dài khoảng QT.",
    differential_diagnoses: ["Nhanh thất đa dạng thiếu máu cơ tim (không có QT dài)", "Rung thất"],
    clinical_presentation: {
      symptoms: ["Ngất lịm đột ngột, co giật do thiếu máu não thoáng qua", "Ngừng tuần hoàn tử vong"],
      physical_signs: ["Mất mạch, mất tri giác, thở ngáp", "Huyết áp bằng 0"],
      risk_factors: ["Đang dùng thuốc kéo dài QT (Amiodarone, Sotalol, Macrolid, Quinolon, thuốc chống loạn thần Haloperidol), hạ Kali máu, hạ Magne máu"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn (Code Red)",
      initialStabilization: ["Kêu gọi cấp cứu ngừng tim", "Sạc máy phá rung sẵn sàng"],
      medications: [
        { name: "Magnesi Sulfat (MgSO4)", dose: "2g tiêm TM nhanh trong 1-2 phút, có thể lặp lại sau 5-10 phút", route: "IV Push", notes: "Thuốc giải độc đặc hiệu đầu tay dập tắt cơn xoắn đỉnh" },
        { name: "Kali Clorid (KCl)", dose: "Bù K+ duy trì mức 4.5 - 5.0 mmol/L", route: "IV Infusion", notes: "Nâng ngưỡng điện thế màng" },
        { name: "Isoproterenol", dose: "2 - 10 mcg/phút truyền TM", route: "IV Infusion", notes: "Làm tăng nhịp tim để rút ngắn khoảng QT" },
      ],
      interventions: [
        "Phá rung không đồng bộ (Defibrillation 200J) nếu mất ý thức / mất mạch",
        "Tạo nhịp vượt tần số (Overdrive Pacing) bằng máy tạo nhịp tạm thời đặt tần số 100 bpm",
      ],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Nhận diện hình thái: QRS rộng nhấp nhô biến đổi cực tính xoay quanh đường đẳng điện.",
        "2. Kiểm tra ECG lúc nhịp xoang trước đó: Đo QTc. Nếu QTc > 500ms -> Khẳng định Xoắn đỉnh (Torsades de Pointes).",
        "3. Lập tức tiêm Magnesi Sulfat 2g TM ngay.",
      ],
      key_differential_features: ["Xoắn đỉnh xảy ra trên nền QT dài; Nhanh thất đa dạng do nhồi máu cơ tim có QT bình thường."],
    },
    red_flags: {
      contraindications: ["CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI Amiodarone, Procainamide, Sotalol vì những thuốc này kéo dài khoảng QT sẽ làm cơn xoắn đỉnh kéo dài liên tục dẫn tới TỬ VONG!"],
      pitfalls: ["Nhầm cơn xoắn đỉnh gây thiếu máu não co giật với bệnh động kinh, bỏ qua xử trí tim mạch."],
    },
    patient_case: {
      age: 72,
      gender: "Nữ",
      chiefComplaint: "Đột ngột ngất xỉu co giật 1 phút khi đang điều trị viêm phổi",
      historyOfPresentIllness: "Bệnh nhân nữ 72 tuổi đang nằm viện điều trị viêm phổi bằng Levofloxacin phối hợp Clarithromycin, kèm hạ Kali máu do dùng lợi tiểu. Đột ngột ngất lịm, monitor hiện xoắn đỉnh.",
      vitals: { bloodPressure: "50/0 mmHg", heartRate: 215, respiratoryRate: 24, spO2: 80, temperature: 37.0 },
      labResults: { "K+": "2.8 mmol/L", "Mg2+": "0.60 mmol/L", "QTc cơ bản": "560 ms" },
    },
  },

  {
    id: "ventricular_fibrillation",
    name: "Rung Thất Sóng Thô / Sóng Mịn (VFib)",
    name_en: "Ventricular Fibrillation (Coarse / Fine VFib)",
    category: "ventricular",
    severity: "critical",
    system_id: "ventricular_arrest",
    system_name: "Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn",
    anatomical_region: "Toàn bộ cơ tâm thất hỗn loạn",
    criteria: [
      "Mất hoàn toàn các phức bộ P, QRS, T bình thường",
      "Thay thế bằng các dao động sóng hỗn loạn vô tổ chức, không xác định được hình dạng, biên độ hay tần số cụ thể",
      "Sóng thô (Coarse VF): Biên độ dao động > 3mm (tiên lượng hồi phục tốt hơn)",
      "Sóng mịn (Fine VF): Biên độ < 3mm (gần chuyển sang vô tâm thu, cơ tim cạn kiệt năng lượng)",
      "Bệnh nhân rơi vào trạng thái ngừng tuần hoàn tử vong lâm sàng ngay lập tức",
    ],
    lead_manifestations: {
      DII: "Đường sóng hỗn loạn nhấp nhô vô định hình, không có chu kỳ",
      V1: "Sóng rung thất thô biên độ 4-6mm",
      II: "Dải nhịp Lead II: Sóng rung thất hỗn loạn hoàn toàn",
    },
    annotations: [
      { leadId: "DII", waveComponent: "R", label: "☠️ RUNG THẤT (VFib): Mất hoàn toàn QRS-T", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "DII", waveComponent: "RR", label: "Sóng hỗn loạn vô tổ chức (Tử vong lâm sàng)", targetCyclePhase: 0.15, intervalEndPhase: 0.55, color: "#e11d48", badgePlacement: "interval", criterionIndex: 1 },
      { leadId: "II", waveComponent: "RR", label: "🚨 BÁO ĐỘNG ĐỎ: PHÁ RUNG KHẨN CẤP 200J", targetCyclePhase: 0.25, intervalEndPhase: 0.65, color: "#e11d48", badgePlacement: "top", criterionIndex: 4 },
    ],
    ecg_metrics: {
      expected_hr: "Vô số (Không có nhát bóp hiệu quả)",
      pr_interval: "Không có",
      qrs_duration: "Vô định hình",
      qt_interval: "Không có",
      qrs_axis: "Hỗn loạn",
    },
    clinical_action: "NGỪNG TUẦN HOÀN - CẤP CỨU CODE BLUE LẬP TỨC! THỜI GIAN LÀ MẠNG SỐNG! (1) ÉP TIM CPR NGAY LẬP TỨC 100-120 lần/phút; (2) SẠC VÀ PHÁ RUNG KHÔNG ĐỒNG BỘ (Defibrillation) 200J Biphasic CÀNG NHANH CÀNG TỐT; (3) Tiếp tục ép tim ngay 2 phút không dừng lại kiểm tra mạch; (4) Adrenaline 1mg tiêm TM sau cú sốc thứ 2, Amiodarone 300mg tiêm TM sau cú sốc thứ 3.",
    differential_diagnoses: ["Nhiễu điện do cử động / tuột dây điện cực", "Xoắn đỉnh"],
    clinical_presentation: {
      symptoms: ["Đột ngột gục ngã, mất ý thức trong vòng 5-10 giây", "Ngừng thở hoặc thở ngáp cá"],
      physical_signs: ["Mất hoàn toàn mạch cảnh và mạch bẹn", "Đồng tử bắt đầu dãn", "Mặt xanh xao tím tái"],
      risk_factors: ["Nhồi máu cơ tim tối cấp, điện giật, đuối nước, ngộ độc thuốc, thiếu oxy nặng"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn cấp nhất (Code Blue / Cardiac Arrest)",
      initialStabilization: ["Khởi động ACLS: Ép tim liên tục + Đặt ống nội khí quản"],
      medications: [
        { name: "Adrenaline (Epinephrine)", dose: "1mg tiêm TM nhanh mỗi 3-5 phút", route: "IV Push", notes: "Dùng sau cú sốc thứ hai" },
        { name: "Amiodarone", dose: "300mg tiêm TM bolus, liều thứ hai 150mg", route: "IV Push", notes: "Dùng sau cú sốc thứ ba nếu VFib trơ" },
      ],
      interventions: [
        "Phá rung không đồng bộ (Defibrillation 200J Biphasic hoặc 360J Monophasic) mỗi 2 phút",
        "Hồi sức tim phổi CPR chất lượng cao: ép sâu 5-6cm, để ngực nở hoàn toàn, giảm thiểu gián đoạn ép tim",
      ],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Thấy sóng nhấp nhô hỗn loạn: Bắt mạch cảnh ngay (không quá 10 giây).",
        "2. Không có mạch: Hô to 'Báo động ngừng tuần hoàn' và ép tim ngay.",
        "3. Dán bản cực phá rung, bấm nút sạc 200J, hô 'Tránh xa bệnh nhân' và bấm sốc điện.",
        "4. Sau sốc: Ép tim ngay lập tức 2 phút, không chờ xem nhịp tim.",
      ],
      key_differential_features: ["Nhiễu do cử động bệnh nhân vẫn tỉnh táo và bắt được mạch; Rung thất bệnh nhân luôn bất tỉnh và mất mạch."],
    },
    red_flags: {
      contraindications: ["TUYỆT ĐỐI KHÔNG BẤM NÚT ĐỒNG BỘ (SYNC) TRÊN MÁY PHÁ RUNG - Rung thất không có sóng R để máy bắt đồng bộ, máy sẽ không phát xung sốc!"],
      pitfalls: ["Dừng ép tim quá lâu để bắt mạch hoặc phân tích nhịp làm tưới máu vành tụt về 0."],
    },
    patient_case: {
      age: 57,
      gender: "Nam",
      chiefComplaint: "Đang đau ngực dữ dội thì đột ngột co giật rồi bất tỉnh trên cáng cấp cứu",
      historyOfPresentIllness: "Bệnh nhân nam 57 tuổi vừa vào viện vì nhồi máu cơ tim cấp thành trước giờ thứ 1, đang mắc dây điện tim thì đột ngột gồng cứng người, mắt trợn ngược, monitor chuyển thành rung thất sóng thô.",
      vitals: { bloodPressure: "0/0 mmHg", heartRate: 0, respiratoryRate: 0, spO2: 0, temperature: 36.5 },
      labResults: { "Khí máu động mạch": "pH 7.15, pO2 45 mmHg, Lactate 8.0 mmol/L" },
    },
  },

  {
    id: "asystole",
    name: "Vô Tâm Thu (Đường Đẳng Điện Phẳng - Flatline)",
    name_en: "Ventricular Asystole (Flatline)",
    category: "ventricular",
    severity: "critical",
    system_id: "ventricular_arrest",
    system_name: "Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn",
    anatomical_region: "Toàn bộ hệ thống điện tim ngừng trệ",
    criteria: [
      "Đường đẳng điện phẳng lì, hoàn toàn không có hoạt động điện học của tim",
      "Thỉnh thoảng có thể thấy vài sóng P đơn độc trơ trọi không có phức bộ QRS đi kèm (P-wave asystole)",
      "Bắt buộc kiểm tra ở ít nhất 2 chuyển đạo vuông góc và kiểm tra dây dẫn để loại trừ tuột điện cực hoặc rung thất sóng mịn",
      "Tiên lượng sống sót cực kỳ xấu nếu không tái lập được tuần hoàn nhanh chóng",
    ],
    lead_manifestations: {
      DII: "Đường thẳng nằm ngang phẳng lì (Flatline)",
      V1: "Đường đẳng điện phẳng lì",
      II: "Dải nhịp Lead II: Hoàn toàn không có xung điện",
    },
    annotations: [
      { leadId: "DII", waveComponent: "DROPPED", label: "☠️ VÔ TÂM THU (Asystole): Đường thẳng phẳng lì", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "II", waveComponent: "DROPPED", label: "🚨 ÉP TIM CPR + ADRENALINE 1MG (KHÔNG SỐC ĐIỆN)", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top", criterionIndex: 3 },
    ],
    ecg_metrics: {
      expected_hr: "0 bpm",
      pr_interval: "Không có",
      qrs_duration: "Không có",
      qt_interval: "Không có",
      qrs_axis: "Không có",
    },
    clinical_action: "TUYỆT ĐỐI KHÔNG SỐC ĐIỆN! Sốc điện vô tâm thu sẽ đốt cháy cơ tim và triệt tiêu cơ hội hồi phục tế bào tạo nhịp. PHÁC ĐỒ ACLS: (1) Ép tim CPR liên tục chất lượng cao; (2) Adrenaline 1mg tiêm TM càng sớm càng tốt mỗi 3-5 phút; (3) Tìm kiếm và xử trí khẩn cấp các nguyên nhân có thể đảo ngược (5T & 5H: Hypovolemia, Hypoxia, Hydrogen ion toan, Hypo/Hyperkalemia, Hypothermia; Tension pneumothorax, Tamponade, Toxins, Thrombosis phổi, Thrombosis vành).",
    differential_diagnoses: ["Tuột dây điện cực / hỏng máy", "Rung thất sóng mịn (Fine VF)"],
    clinical_presentation: {
      symptoms: ["Bệnh nhân bất tỉnh hoàn toàn, ngừng thở, đồng tử dãn to cố định"],
      physical_signs: ["Mất hoàn toàn mạch bẹn và mạch cảnh", "Da lạnh ngắt, tím tái"],
      risk_factors: ["Giai đoạn cuối của ngừng tuần hoàn kéo dài, thiếu oxy não nặng, toan chuyển hóa trầm trọng"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn (Code Blue)",
      initialStabilization: ["Ép tim CPR chu kỳ 30:2 hoặc bóp bóng liên tục qua ống nội khí quản"],
      medications: [
        { name: "Adrenaline", dose: "1mg tiêm TM bolus mỗi 3-5 phút", route: "IV Push", notes: "Thuốc co mạch duy trì áp lực tưới máu vành và não" },
      ],
      interventions: [
        "KHÔNG SỐC ĐIỆN",
        "Kiểm tra 5T và 5H tìm nguyên nhân đảo ngược (chọc giải áp màng phổi nếu tràn khí van, chọc tháo màng tim nếu ép tim cấp...)",
      ],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Thấy đường thẳng: Kiểm tra dây cáp, tăng biên độ Gain lên tối đa để loại trừ rung thất sóng cực mịn.",
        "2. Kiểm tra chuyển đạo thứ hai vuông góc.",
        "3. Ép tim CPR liên tục và tiêm Adrenaline 1mg.",
        "4. Rà soát nguyên nhân 5H & 5T.",
      ],
      key_differential_features: ["Rung thất có chỉ định sốc điện; Vô tâm thu TUYỆT ĐỐI KHÔNG sốc điện."],
    },
    red_flags: {
      contraindications: ["CẤM SỐC ĐIỆN CHO VÔ TÂM THU! Nhiều phim ảnh Hollywood chiếu sốc điện đường thẳng là sai lệch y khoa nghiêm trọng!"],
      pitfalls: ["Nhầm tuột dây điện cực với vô tâm thu. Phải kiểm tra mạch cảnh trên người bệnh nhân trước khi kết luận."],
    },
    patient_case: {
      age: 78,
      gender: "Nam",
      chiefComplaint: "Phát hiện ngừng thở tím tái tại giường bệnh nội trú",
      historyOfPresentIllness: "Bệnh nhân nam 78 tuổi suy tim giai đoạn cuối nằm viện, điều dưỡng phát hiện ngưng thở, da lạnh tím tái, monitor phẳng lì.",
      vitals: { bloodPressure: "0/0 mmHg", heartRate: 0, respiratoryRate: 0, spO2: 0, temperature: 35.8 },
      labResults: { "Khí máu": "pH < 6.9, K+ 7.8 mmol/L" },
    },
  },

  // =========================================================================
  // HỆ VI: PHÌ ĐẠI BUỒNG TIM & TĂNG GÁNH (chamber_hypertrophy)
  // =========================================================================
  {
    id: "lvh_strain",
    name: "Phì Đại Thất Trái Tăng Gánh (LVH with Strain)",
    name_en: "Left Ventricular Hypertrophy with Strain Pattern",
    category: "ischemia",
    severity: "abnormal",
    system_id: "chamber_hypertrophy",
    system_name: "Phì Đại Buồng Tim & Tăng Gánh",
    anatomical_region: "Thành cơ thất trái phì đại do tăng huyết áp / Hẹp van ĐMC",
    criteria: [
      "Tiêu chuẩn điện thế Sokolow-Lyon: S ở V1 + R ở V5 (hoặc V6) > 35 mm (3.5 mV)",
      "Tiêu chuẩn điện thế Cornell: R ở aVL + S ở V3 > 28 mm (nam) hoặc > 20 mm (nữ)",
      "Dấu hiệu tăng gánh thất trái (Strain pattern): Đoạn ST chênh xuống không đối xứng và sóng T âm sâu ở các chuyển đạo thành bên (DI, aVL, V5, V6)",
      "Trục điện tim lệch trái (thường từ 0° đến -30°), thời gian nhánh nội điện ở V5-V6 kéo dài > 0.05s",
    ],
    lead_manifestations: {
      V1: "Sóng S cực sâu 22mm",
      V5: "Sóng R cực cao 25mm (Sokolow-Lyon = 22 + 25 = 47mm > 35mm), ST chênh xuống dạng strain 1.8mm, T âm không đối xứng",
      V6: "R cao 20mm, ST chênh xuống và T âm",
      aVL: "Sóng R cao 14mm (> 11mm)",
    },
    annotations: [
      { leadId: "V5", waveComponent: "R", label: "▲ R cao vút (Sokolow-Lyon = 47mm > 35mm)", targetCyclePhase: 0.22, color: "#9333ea", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "V5", waveComponent: "ST", label: "▼ ST chênh xuống không đối xứng (Strain pattern)", targetCyclePhase: 0.35, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 2 },
      { leadId: "V1", waveComponent: "S", label: "▼ Sóng S sâu 22mm ở V1", targetCyclePhase: 0.26, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 0 },
    ],
    ecg_metrics: {
      expected_hr: "60 - 90 bpm",
      pr_interval: "160 - 200 ms",
      qrs_duration: "95 - 110 ms (< 120ms)",
      qt_interval: "420 - 460 ms",
      qrs_axis: "-15° (Trục lệch trái)",
    },
    clinical_action: "Kiểm soát chặt chẽ huyết áp mục tiêu (< 130/80 mmHg). Thuốc ức chế men chuyển (ACEi) hoặc ức chế thụ thể (ARB) là lựa chọn ưu tiên vì có tác dụng thoái triển phì đại cơ tim. Chỉ định siêu âm tim kiểm tra bề dày vách liên thất và chức năng tống máu.",
    differential_diagnoses: ["Thiếu máu cơ tim dưới nội tâm mạc", "Block nhánh trái", "Hội chứng Brugada"],
    clinical_presentation: {
      symptoms: ["Thường không có triệu chứng trong nhiều năm", "Khó thở khi gắng sức, đau ngực âm ỉ khi cơ tim phì đại nặng"],
      physical_signs: ["Huyết áp tăng cao 165/100 mmHg", "Mỏm tim đập dội mạnh, diện đập rộng lệch ra ngoài đường trung đòn trái", "Tiếng tim T4"],
      risk_factors: ["Tăng huyết áp nguyên phát mạn tính không điều trị, hẹp van động mạch chủ, bệnh cơ tim phì đại"],
    },
    emergency_management: {
      priorityLevel: "Mức 3 - Điều trị huyết áp và kiểm tra tim",
      initialStabilization: ["Hạ áp từ từ nếu huyết áp quá cao"],
      medications: [
        { name: "Perindopril / Losartan", dose: "Theo liều chuẩn hạ áp", route: "Uống", notes: "Nhóm thuốc giúp thoái triển phì đại thất trái" },
        { name: "Amlodipine", dose: "5 - 10mg", route: "Uống", notes: "Phối hợp hạ áp hiệu quả" },
      ],
      interventions: ["Siêu âm tim qua thành ngực đo chỉ số khối cơ thất trái (LVMI)"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Đo biên độ sóng: Lấy chiều sâu sóng S ở V1 cộng chiều cao sóng R ở V5. Nếu > 35mm -> Dương tính Sokolow-Lyon.",
        "2. Kiểm tra aVL: Nếu R ở aVL > 11mm -> Gợi ý phì đại thất trái.",
        "3. Đánh giá ST-T ở V5, V6: Có ST chênh xuống dốc thoai thoải và T âm không đối xứng (nhánh xuống thoai thoải, nhánh lên dốc đứng) -> Dấu hiệu quá tải tâm thu thất trái (Strain).",
      ],
      key_differential_features: ["Thiếu máu cơ tim có sóng T âm sâu đối xứng; LVH Strain có sóng T âm không đối xứng."],
    },
    red_flags: {
      contraindications: ["Tránh nhầm ST chênh xuống dạng strain với thiếu máu cơ tim cấp mà chỉ định chụp mạch vành không cần thiết"],
      pitfalls: ["Ở người trẻ gầy, thành ngực mỏng điện thế có thể cao sinh lý > 35mm nhưng KHÔNG CÓ dấu hiệu biến đổi ST-T dạng strain."],
    },
    patient_case: {
      age: 60,
      gender: "Nam",
      chiefComplaint: "Đo điện tim kiểm tra huyết áp thấy bất thường",
      historyOfPresentIllness: "Bệnh nhân nam 60 tuổi tăng huyết áp 12 năm uống thuốc không đều, dạo này thấy mệt nhẹ khi đi bộ nhanh.",
      vitals: { bloodPressure: "168/102 mmHg", heartRate: 76, respiratoryRate: 16, spO2: 97, temperature: 36.6 },
      labResults: { "Creatinine": "98 umol/L", "Microalbumin niệu": "Dương tính" },
    },
  },

  // =========================================================================
  // HỆ VII: BỆNH LÝ KÊNH ION DI TRUYỀN & NGUY CƠ ĐỘT TỬ (channelopathies)
  // =========================================================================
  {
    id: "brugada_type1",
    name: "Hội Chứng Brugada Type 1 (Coved-Type)",
    name_en: "Brugada Syndrome Type 1 (Coved-Type ST Elevation)",
    category: "ventricular",
    severity: "critical",
    system_id: "channelopathies",
    system_name: "Bệnh Lý Kênh Ion Di Truyền & Nguy Cơ Đột Tử",
    anatomical_region: "Kênh Natri SCN5A đường ra thất phải",
    criteria: [
      "ST chênh lên dạng vòm dốc xuống (Coved-type) ≥ 2mm (0.2 mV) ở ≥ 1 chuyển đạo trước ngực phải (V1, V2)",
      "Đoạn ST chênh lên nối tiếp trực tiếp bằng một sóng T âm đối xứng sâu",
      "Không có khoảng cách đẳng điện giữa ST và T",
      "Tiền sử gia đình có người đột tử do tim khi ngủ hoặc ngất không rõ nguyên nhân",
      "Có thể bộc lộ rõ khi bệnh nhân sốt cao hoặc dùng thuốc chẹn kênh Natri (Ajmaline, Flecainide)",
    ],
    lead_manifestations: {
      V1: "ST chênh lên dạng vòm coved-type 3.5mm tiếp nối sóng T âm sâu kinh điển",
      V2: "ST chênh vòm 3.0mm, T âm",
      V3: "ST chênh nhẹ 1.0mm",
      "DI-V6": "Hình thái sóng bình thường",
    },
    annotations: [
      { leadId: "V1", waveComponent: "ST", label: "▲ ST chênh vòm Coved-type ≥ 2mm (Brugada Type 1)", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "V1", waveComponent: "T", label: "▼ Sóng T âm sâu đối xứng tiếp nối vòm ST", targetCyclePhase: 0.45, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "V2", waveComponent: "ST", label: "ST vòm Brugada V2", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    ],
    ecg_metrics: {
      expected_hr: "65 - 85 bpm",
      pr_interval: "160 - 200 ms",
      qrs_duration: "95 - 115 ms",
      qt_interval: "380 - 420 ms",
      qrs_axis: "+60° (Bình thường)",
    },
    clinical_action: "NGUY CƠ ĐỘT TỬ DO TIM TRONG LÚC NGỦ CỰC KỲ CAO (do rung thất kịch phát). (1) HẠ SỐT TÍCH CỰC NGAY LẬP TỨC nếu bệnh nhân đang sốt (nhiệt độ cao làm bộc lộ kênh ion bất thường); (2) Tránh tuyệt đối danh sách thuốc chống chỉ định (brugadadrugs.org); (3) CHỈ ĐỊNH CẤY MÁY PHÁ RUNG TỰ ĐỘNG (ICD) là biện pháp duy nhất đã chứng minh cứu sống tính mạng người bệnh; (4) Tầm soát gen và điện tim cho toàn bộ người thân trực hệ.",
    differential_diagnoses: ["Block nhánh phải (RBBB)", "Viêm màng ngoài tim cấp", "Tái cực sớm lành tính", "Nhồi máu cơ tim trước vách"],
    clinical_presentation: {
      symptoms: ["Thường gặp ở nam giới trẻ tuổi khỏe mạnh", "Ngất đột ngột khi nghỉ ngơi hoặc ban đêm lúc ngủ", "Thở ngáp ngáy to bất thường lúc rạng sáng"],
      physical_signs: ["Khám tim và cấu trúc tim hoàn toàn bình thường (không có bệnh tim thực tổn)"],
      risk_factors: ["Đột biến gen SCN5A kênh Natri, gia đình có người tử vong khi ngủ lúc trẻ tuổi, nguồn gốc Đông Nam Á"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 nếu có tiền sử ngất (Code Red)",
      initialStabilization: ["Hạ sốt tích cực bằng Paracetamol nếu đang sốt cao", "Theo dõi monitor phòng cấp cứu"],
      medications: [
        { name: "Paracetamol", dose: "1000mg truyền TM", route: "IV Infusion", notes: "Hạ sốt khẩn cấp để dập tắt loạn nhịp" },
        { name: "Isoproterenol", dose: "1 - 2 mcg/phút truyền TM", route: "IV Infusion", notes: "Dùng để cắt cơn bão điện học (Electrical Storm) của Brugada" },
        { name: "Quinidine", dose: "Uống", route: "Uống", notes: "Thuốc chống loạn nhịp duy nhất hỗ trợ ức chế dòng Ito" },
      ],
      interventions: ["Cấy máy phá rung tự động dưới da hoặc trong tim (ICD)"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Khảo sát V1, V2: Tìm hình thái ST chênh lên dạng vòm dốc xuống (Coved-type) ≥ 2mm.",
        "2. Kiểm tra sóng T: T âm sâu nối liền vòm ST -> Khẳng định Brugada Type 1.",
        "3. Nếu ST chênh dạng yên ngựa (Saddle-back) -> Brugada Type 2 (cần làm test thuốc hoặc test sốt để xác định).",
      ],
      key_differential_features: ["RBBB có sóng S rộng ở DI và V6; Brugada Type 1 không có sóng S rộng ở thành bên."],
    },
    red_flags: {
      contraindications: ["CẤM SỬ DỤNG các thuốc làm nặng Brugada: Thuốc chẹn kênh Natri (Flecainide, Propafenone), thuốc gây mê Propofol liều cao, thuốc chống trầm cảm 3 vòng - Xem danh mục brugadadrugs.org"],
      pitfalls: ["Xem thường điện tim Brugada ở người trẻ không có triệu chứng mà không tư vấn chuyên khoa nhịp học, dẫn đến đột tử ban đêm."],
    },
    patient_case: {
      age: 36,
      gender: "Nam",
      chiefComplaint: "Đo điện tim kiểm tra sức khỏe vì có anh trai đột tử khi ngủ năm 32 tuổi",
      historyOfPresentIllness: "Nam thanh niên 36 tuổi người Việt Nam, khỏe mạnh, không bệnh mạn tính. Anh trai ruột đột ngột tử vong khi đang ngủ 4 năm trước. Điện tim V1 có ST chênh vòm 3mm và T âm.",
      vitals: { bloodPressure: "115/75 mmHg", heartRate: 72, respiratoryRate: 16, spO2: 99, temperature: 36.5 },
      labResults: { "K+": "4.1 mmol/L", "Troponin I": "< 10 ng/L", "Siêu âm tim": "Cấu trúc buồng tim bình thường, EF 65%" },
    },
  },

  // =========================================================================
  // HỆ VIII: CẤP CỨU TIM PHỔI & MÀNG NGOÀI TIM (cardiopulmonary_pericardial)
  // =========================================================================
  {
    id: "pulmonary_embolism",
    name: "Thuyên Tắc Động Mạch Phổi Cấp (S1Q3T3)",
    name_en: "Acute Pulmonary Embolism (McGinn-White S1Q3T3 Sign)",
    category: "ischemia",
    severity: "critical",
    system_id: "cardiopulmonary_pericardial",
    system_name: "Cấp Cứu Tim Phổi & Màng Ngoài Tim",
    anatomical_region: "Động mạch phổi chính & Thất phải cấp tính",
    criteria: [
      "Nhịp nhanh xoang (dấu hiệu điện tim phổ biến nhất của thuyên tắc phổi)",
      "Tam chứng McGinn-White kinh điển: Sóng S sâu ở DI (> 1.5mm), sóng Q bệnh lý ở DIII, sóng T âm ở DIII (dạng S1Q3T3)",
      "Sóng T âm đối xứng từ V1 đến V4 (dấu hiệu quá tải áp lực thất phải cấp tính)",
      "Block nhánh phải (RBBB) hoàn toàn hoặc không hoàn toàn mới xuất hiện",
      "Sóng P phế (P pulmonale): Sóng P cao nhọn > 2.5mm ở DII do tăng áp lực nhĩ phải",
    ],
    lead_manifestations: {
      DI: "Sóng S sâu rõ nét 2.5mm (S1)",
      DIII: "Sóng Q sâu 2mm kèm sóng T âm sâu 3mm (Q3T3)",
      DII: "Nhịp nhanh xoang 115 bpm, P phế cao 2.8mm",
      V1: "T âm đối xứng, dạng rSR' mới xuất hiện",
      "V2-V3": "Sóng T âm sâu đối xứng do căng giãn thất phải",
    },
    annotations: [
      { leadId: "DI", waveComponent: "S", label: "▼ S1: Sóng S sâu ở DI", targetCyclePhase: 0.28, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "DIII", waveComponent: "Q", label: "▲ Q3: Sóng Q bệnh lý ở DIII", targetCyclePhase: 0.20, color: "#9333ea", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "DIII", waveComponent: "T", label: "▼ T3: Sóng T âm ở DIII (Dấu hiệu S1Q3T3)", targetCyclePhase: 0.45, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "DII", waveComponent: "RR", label: "Nhịp nhanh xoang 115 bpm (Dấu hiệu thường gặp nhất)", targetCyclePhase: 0.15, intervalEndPhase: 0.50, color: "#d97706", badgePlacement: "interval", criterionIndex: 0 },
      { leadId: "V1", waveComponent: "T", label: "▼ T âm đối xứng do tăng gánh thất phải cấp", targetCyclePhase: 0.40, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 2 },
    ],
    ecg_metrics: {
      expected_hr: "100 - 130 bpm (Nhanh xoang)",
      pr_interval: "130 - 160 ms",
      qrs_duration: "90 - 120 ms",
      qt_interval: "320 - 360 ms",
      qrs_axis: "+110° (Trục lệch phải cấp)",
    },
    clinical_action: "CẤP CỨU HỒI SỨC TIM PHỔI KHẨN CẤP! (1) Đánh giá phân tầng nguy cơ PESI và huyết động: Nếu có sốc tụt huyết áp (High-Risk PE) -> CHỈ ĐỊNH TIÊU SỢI HUYẾT KHẨN CẤP (Alteplase / rtPA 100mg truyền TM trong 2 giờ); (2) Nếu huyết động ổn định -> Dùng ngay Heparin không phân đoạn hoặc Enoxaparin liều điều trị 1mg/kg mỗi 12h; (3) Chụp CT mạch máu phổi có cản quang (CTPA) là tiêu chuẩn vàng xác định huyết khối.",
    differential_diagnoses: ["Nhồi máu cơ tim cấp thành dưới", "Hội chứng vành cấp", "Tràn khí màng phổi"],
    clinical_presentation: {
      symptoms: ["Khó thở đột ngột dữ dội không giải thích được", "Đau ngực kiểu màng phổi (đau tăng khi hít sâu)", "Ho ra máu, ngất lịm"],
      physical_signs: ["Thở nhanh > 24 l/p, SpO2 tụt < 90%", "Tụt huyết áp, tĩnh mạch cổ nổi to", "Sưng nóng đỏ đau một bên bắp chân (huyết khối tĩnh mạch sâu chi dưới DVT)"],
      risk_factors: ["Bất động lâu ngày, sau phẫu thuật chấn thương chỉnh hình xương lớn, ung thư, dùng thuốc tránh thai"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn (Code Red)",
      initialStabilization: ["Thở oxy lưu lượng cao qua mask giữ SpO2 > 90%", "Hạn chế truyền nhiều dịch (thất phải đang quá tải)"],
      medications: [
        { name: "Alteplase (rtPA)", dose: "100mg truyền TM trong 2 giờ", route: "IV Infusion", notes: "Thuốc tiêu sợi huyết dùng cho Thuyên tắc phổi nguy cơ cao có tụt HA" },
        { name: "Enoxaparin", dose: "1mg/kg tiêm dưới da mỗi 12 giờ", route: "SC", notes: "Thuốc chống đông đầu tay nếu huyết động ổn định" },
        { name: "Noradrenaline", dose: "Truyền TM nâng huyết áp", route: "IV Infusion", notes: "Thuốc vận mạch ưu tiên để nâng huyết áp tưới máu vành cho thất phải" },
      ],
      interventions: [
        "Chụp CT động mạch phổi có cản quang (CTPA) khẳng định chẩn đoán",
        "Lấy huyết khối qua catheter hoặc phẫu thuật mở lấy huyết khối nếu chống chỉ định tiêu sợi huyết",
      ],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Bệnh nhân khó thở đột ngột kèm nhịp nhanh xoang: Luôn phải loại trừ Thuyên tắc phổi.",
        "2. Tìm dấu hiệu tăng gánh thất phải cấp: S1Q3T3, trục phải, T âm V1-V4.",
        "3. Đánh giá thang điểm Wells: Nếu điểm cao -> Chỉ định chụp CTPA ngay.",
      ],
      key_differential_features: ["Nhồi máu cơ tim thành dưới có ST chênh lên ở DII, DIII, aVF; Thuyên tắc phổi chỉ có sóng S1Q3T3 chứ không có ST vòm ở DII."],
    },
    red_flags: {
      contraindications: ["Tránh truyền dịch ồ ạt (bolus dịch lớn) vì sẽ làm giãn buồng thất phải cấp tính, đẩy vách liên thất sang trái gây xẹp thất trái và ngừng tuần hoàn nhanh hơn!"],
      pitfalls: ["Điện tim ở 25% bệnh nhân thuyên tắc phổi có thể hoàn toàn bình thường hoặc chỉ có nhịp nhanh xoang đơn độc. Đừng loại trừ bệnh nếu lâm sàng nghi ngờ cao."],
    },
    patient_case: {
      age: 49,
      gender: "Nữ",
      chiefComplaint: "Đột ngột khó thở dữ dội và đau nhói ngực phải khi vừa bước xuống giường",
      historyOfPresentIllness: "Bệnh nhân nữ 49 tuổi vừa mổ kết hợp xương đùi 5 ngày trước, nằm bất động tại giường. Sáng nay tập đi thì đột ngột khó thở dữ dội, vã mồ hôi, SpO2 tụt còn 84%. Chân trái sưng to hơn chân phải 4cm.",
      vitals: { bloodPressure: "85/50 mmHg", heartRate: 122, respiratoryRate: 28, spO2: 84, temperature: 37.1 },
      labResults: { "D-dimer": "5800 ng/mL", "Troponin T": "85 ng/L", "Khí máu": "pH 7.48, pO2 52 mmHg, pCO2 29 mmHg" },
    },
  },

  {
    id: "acute_pericarditis",
    name: "Viêm Màng Ngoài Tim Cấp",
    name_en: "Acute Pericarditis",
    category: "ischemia",
    severity: "abnormal",
    system_id: "cardiopulmonary_pericardial",
    system_name: "Cấp Cứu Tim Phổi & Màng Ngoài Tim",
    anatomical_region: "Màng ngoài tim lá tạng & lá thành lan tỏa",
    criteria: [
      "ST chênh lên dạng lõm lòng thuyền (concave upward) lan tỏa ở hầu hết các chuyển đạo (DI, DII, DIII, aVF, V2-V6)",
      "Đoạn PR chênh xuống (PR depression) lan tỏa do viêm nhĩ đi kèm (dấu hiệu rất đặc hiệu)",
      "Đoạn PR chênh lên và ST chênh xuống duy nhất ở chuyển đạo aVR (và đôi khi V1)",
      "KHÔNG CÓ hình ảnh ST soi gương ở các chuyển đạo khác (khác biệt mấu chốt so với STEMI)",
      "Dấu hiệu Spodick: Đoạn TP dốc xuống ở giai đoạn sớm",
    ],
    lead_manifestations: {
      DII: "ST chênh lên lõm lòng thuyền 2.0mm, đoạn PR chênh xuống 0.8mm rõ rệt",
      V5: "ST chênh lên dạng lõm 2.2mm, T dương",
      V2: "ST chênh lên lõm 2.5mm",
      aVR: "ST chênh xuống 1.2mm, đoạn PR chênh lên 0.8mm",
      DI: "ST chênh lên lõm, PR chênh xuống",
    },
    annotations: [
      { leadId: "DII", waveComponent: "ST", label: "▲ ST chênh lên lõm lòng thuyền lan tỏa", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "DII", waveComponent: "PR", label: "▼ Đoạn PR chênh xuống đặc hiệu (PR depression)", targetCyclePhase: 0.10, intervalEndPhase: 0.22, color: "#2563eb", badgePlacement: "interval", criterionIndex: 1 },
      { leadId: "aVR", waveComponent: "PR", label: "▲ PR chênh lên ở aVR", targetCyclePhase: 0.10, intervalEndPhase: 0.22, color: "#059669", badgePlacement: "interval", criterionIndex: 2 },
      { leadId: "V5", waveComponent: "ST", label: "ST lõm lòng thuyền ở V5-V6", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    ],
    ecg_metrics: {
      expected_hr: "75 - 100 bpm",
      pr_interval: "140 - 180 ms",
      qrs_duration: "80 - 95 ms",
      qt_interval: "360 - 400 ms",
      qrs_axis: "+60° (Bình thường)",
    },
    clinical_action: "Điều trị nội khoa bằng thuốc kháng viêm không steroid (NSAIDs liều cao: Ibuprofen 600mg x 3 lần/ngày) phối hợp Colchicine 0.5mg x 1-2 lần/ngày trong 3 tháng để chống tái phát. Siêu âm tim kiểm tra lượng dịch màng ngoài tim để loại trừ biến chứng Chèn ép tim cấp (Cardiac Tamponade).",
    differential_diagnoses: ["Nhồi máu cơ tim ST chênh lên (STEMI)", "Tái cực sớm lành tính", "Viêm cơ tim cấp"],
    clinical_presentation: {
      symptoms: ["Đau ngực nhói như dao đâm sau xương ức, đau tăng dữ dội khi hít sâu, khi ho hoặc khi nằm ngửa", "Đau giảm rõ rệt khi NGỒI DẬY VÀ CÚI NGƯỜI RA PHÍA TRƯỚC"],
      physical_signs: ["Tiếng cọ màng ngoài tim (Pericardial friction rub) nghe rõ ở bờ trái xương ức khi bệnh nhân ngồi cúi ra trước", "Sốt nhẹ"],
      risk_factors: ["Nhiễm virus đường hô hấp gần đây (Coxsackie, cúm, COVID-19), bệnh tự miễn (Lupus), suy thận urê huyết cao"],
    },
    emergency_management: {
      priorityLevel: "Mức 2 - Cần phân biệt với STEMI",
      initialStabilization: ["Giảm đau, siêu âm tim tại giường đánh giá tràn dịch"],
      medications: [
        { name: "Ibuprofen", dose: "600mg uống mỗi 8 giờ kèm thuốc bảo vệ dạ dày PPI", route: "Uống", notes: "Kháng viêm giảm đau chính" },
        { name: "Colchicine", dose: "0.5mg uống 1-2 lần/ngày trong 3 tháng", route: "Uống", notes: "Thuốc bắt buộc giúp ngăn ngừa viêm màng ngoài tim tái phát" },
      ],
      interventions: ["Chọc tháo dịch màng ngoài tim giải áp cấp cứu NẾU có dấu hiệu chèn ép tim cấp (Tamponade)"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Khảo sát ST: Thấy ST chênh lên lan tỏa ở hầu hết các chuyển đạo mà không theo vùng cấp máu của một động mạch vành đơn lẻ.",
        "2. Quan sát hình thái ST: ST có dạng lõm lòng thuyền (khác với dạng vòm lồi bia mộ của STEMI).",
        "3. Soi đoạn PR: Tìm dấu hiệu PR chênh xuống ở DII và PR chênh lên ở aVR -> Dấu hiệu vàng khẳng định Viêm màng ngoài tim.",
      ],
      key_differential_features: ["STEMI có ST lồi vòm và BẮT BUỘC có ST chênh xuống soi gương; Viêm màng ngoài tim có ST lõm và KHÔNG CÓ soi gương (trừ aVR)."],
    },
    red_flags: {
      contraindications: ["TRÁNH DÙNG THUỐC CHỐNG ĐÔNG (Heparin/DOAC) trừ khi có chỉ định bắt buộc khác, vì làm tăng nguy cơ chảy máu vào khoang màng ngoài tim gây Chèn ép tim cấp tử vong!"],
      pitfalls: ["Nhầm viêm màng ngoài tim với STEMI rồi chỉ định tiêu sợi huyết, dẫn đến xuất huyết khoang màng ngoài tim nguy kịch."],
    },
    patient_case: {
      age: 29,
      gender: "Nam",
      chiefComplaint: "Đau ngực nhói dữ dội tăng khi hít thở, đỡ đau khi ngồi cúi người",
      historyOfPresentIllness: "Nam thanh niên 29 tuổi bị cảm cúm sốt ho 1 tuần trước, 2 ngày nay đau nhói ngực trái, mỗi lần hít sâu hay nằm ngửa là đau chói, ngồi chồm người ra trước thì đỡ đau.",
      vitals: { bloodPressure: "120/75 mmHg", heartRate: 88, respiratoryRate: 18, spO2: 98, temperature: 37.8 },
      labResults: { "CRP": "38 mg/L", "Troponin I": "35 ng/L (tăng nhẹ do viêm lớp dưới thượng tâm mạc)", "WBC": "11.2 G/L" },
    },
  },

  // =========================================================================
  // HỆ IX: RỐI LOẠN ĐIỆN GIẢI & NHIỄM ĐỘC THUỐC (metabolic_toxicology)
  // =========================================================================
  {
    id: "hyperkalemia",
    name: "Tăng Kali Máu Nặng (K+ > 7.0 mmol/L)",
    name_en: "Severe Hyperkalemia (K+ > 7.0 mmol/L)",
    category: "metabolic",
    severity: "critical",
    system_id: "metabolic_toxicology",
    system_name: "Rối Loạn Điện Giải & Nhiễm Độc Thuốc",
    anatomical_region: "Rối loạn điện thế màng toàn tim do Kali máu cao",
    criteria: [
      "Sóng T cao nhọn hoắt, đáy hẹp, đối xứng hình lều (Peaked tent-like T waves) rõ nhất ở V2 - V4",
      "Đoạn PR kéo dài và sóng P dẹt dần rồi biến mất hoàn toàn (tê liệt tâm nhĩ)",
      "Phức bộ QRS dãn rộng, méo mó, hòa lẫn vào sóng T tạo thành dạng sóng hình sin (Sine wave pattern)",
      "Nguy cơ tử vong ngừng tim dạng vô tâm thu hoặc rung thất trong vài phút",
    ],
    lead_manifestations: {
      V2: "Sóng T nhọn hoắt hình lều khổng lồ cao 11.5mm, đáy hẹp đối xứng",
      V3: "Sóng T cao nhọn hình lều 12mm",
      DII: "Khoảng PR kéo dài 240ms, sóng P dẹt, QRS dãn rộng 135ms",
      II: "Dải nhịp Lead II: Sóng T lều cao nhọn đáy hẹp kinh điển",
    },
    annotations: [
      { leadId: "V2", waveComponent: "T", label: "▲ Sóng T lều nhọn hoắt đối xứng (11.5mm)", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "V3", waveComponent: "T", label: "▲ Sóng T nhọn hình lều > 10mm", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
      { leadId: "DII", waveComponent: "PR", label: "PR dài 240ms + QRS dãn rộng 135ms", targetCyclePhase: 0.12, intervalEndPhase: 0.29, color: "#d97706", badgePlacement: "interval", criterionIndex: 1 },
      { leadId: "II", waveComponent: "T", label: "▲ Sóng T cao nhọn đáy hẹp (Dấu hiệu lều)", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top", criterionIndex: 0 },
    ],
    ecg_metrics: {
      expected_hr: "50 - 80 bpm",
      pr_interval: "220 - 280 ms",
      qrs_duration: "120 - 150 ms (Dãn rộng)",
      qt_interval: "380 - 410 ms",
      qrs_axis: "Trục lệch trái / Vô định",
    },
    clinical_action: "CẤP CỨU HỒI SỨC TOÀN DIỆN NGAY LẬP TỨC! (1) TIÊM TĨNH MẠCH CANXI GLUCONAT 10% 10ml (hoặc Canxi Clorid) trong 2-3 phút ĐỂ ỔN ĐỊNH MÀNG TẾ BÀO CƠ TIM LẬP TỨC (tác dụng sau 1-3 phút); (2) Đẩy Kali vào trong tế bào: Truyền tĩnh mạch nhanh 10 đơn vị Insulin nhanh + 50ml Glucose 50% (hoặc 500ml Glucose 10%); (3) Khí dung Albuterol / Salbutamol 10-20mg; (4) Thải Kali ra ngoài: Thuốc lợi tiểu Furosemide hoặc nhựa trao đổi ion (Resonium); (5) LỌC MÁU CẤP CỨU nếu suy thận vô niệu.",
    differential_diagnoses: ["Sóng T tối cấp của nhồi máu cơ tim", "Tái cực sớm", "Hạ thân nhiệt"],
    clinical_presentation: {
      symptoms: ["Yếu cơ gốc chi tăng dần, liệt mềm hai chân lan lên hai tay", "Cảm giác tê bì quanh miệng, lơ mơ mệt lả"],
      physical_signs: ["Nhịp tim chậm, tiếng tim mờ", "Mất phản xạ gân xương, liệt mềm"],
      risk_factors: ["Suy thận cấp hoặc suy thận mạn giai đoạn cuối bỏ chạy thận, hội chứng tiêu cơ vân, toan ceton đái tháo đường"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Tối khẩn cấp (Code Red)",
      initialStabilization: ["Mắc monitor theo dõi nhịp tim liên tục từng giây", "Chuẩn bị máy phá rung"],
      medications: [
        { name: "Canxi Gluconat 10%", dose: "10ml tiêm TM chậm trong 2-3 phút", route: "IV Push", notes: "Thuốc đối kháng màng cơ tim cứu mạng, có thể lặp lại sau 5 phút nếu ECG chưa cải thiện" },
        { name: "Insulin Regular + Glucose 20-50%", dose: "10 UI Insulin nhanh pha 50ml Glucose 50%", route: "IV Push / Infusion", notes: "Đưa Kali vào nội bào, bắt đầu có tác dụng sau 15-30 phút" },
        { name: "Salbutamol", dose: "10 - 20mg khí dung", route: "Khí dung", notes: "Hỗ trợ đưa K+ vào tế bào qua thụ thể Beta-2" },
        { name: "Natri Bicarbonat 8.4%", dose: "50ml tiêm TM chậm", route: "IV Push", notes: "Chỉ định khi có toan chuyển hóa nặng đi kèm" },
      ],
      interventions: ["Chỉ định Lọc Máu Cấp Cứu (Hemodialysis) là biện pháp thải Kali triệt để nhất"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Thấy sóng T cao bất thường: Đo bề rộng đáy sóng T. Nếu đáy hẹp, nhọn hoắt đối xứng như dựng lều -> Tăng Kali.",
        "2. Kiểm tra sóng P và QRS: Nếu P dẹt dần, PR dài, QRS dãn rộng -> Tăng Kali máu rất nặng (K+ > 7.0 mmol/L).",
        "3. Tiêm ngay Canxi Gluconat 10% TM ngay không cần chờ kết quả xét nghiệm máu nếu lâm sàng nghi ngờ cao.",
      ],
      key_differential_features: ["Tối cấp STEMI có sóng T cao nhưng đáy rộng và ST chênh vòm; Tăng Kali có sóng T nhọn hoắt đáy rất hẹp."],
    },
    red_flags: {
      contraindications: ["CANXI KHÔNG LÀM HẠ NỒNG ĐỘ KALI TRONG MÁU! Canxi chỉ bảo vệ màng tim trong 30-60 phút. BẮT BUỘC PHẢI DÙNG KÈM Insulin + Glucose và Lọc máu để hạ Kali thực sự!"],
      pitfalls: ["Chờ đợi kết quả xét nghiệm máu từ phòng xét nghiệm mới xử trí. Tăng Kali máu có biểu hiện trên điện tim là CHỈ ĐỊNH ĐIỀU TRỊ CẤP CỨU NGAY."],
    },
    patient_case: {
      age: 64,
      gender: "Nam",
      chiefComplaint: "Mệt lả, yếu liệt hai chân sau khi bỏ chạy thận nhân tạo 4 ngày",
      historyOfPresentIllness: "Bệnh nhân nam 64 tuổi suy thận mạn giai đoạn 5 đang chạy thận chu kỳ 3 lần/tuần, do bão lũ nên bỏ lỡ 2 buổi chạy thận. Hôm nay mệt lả, hai chân yếu không đứng dậy được, buồn nôn.",
      vitals: { bloodPressure: "100/60 mmHg", heartRate: 52, respiratoryRate: 20, spO2: 95, temperature: 36.4 },
      labResults: { "K+ máu": "7.8 mmol/L (Cực kỳ nguy kịch)", "Creatinine": "850 umol/L", "pH máu": "7.22" },
    },
  },

  {
    id: "hypokalemia",
    name: "Hạ Kali Máu Nặng (K+ < 2.5 mmol/L)",
    name_en: "Severe Hypokalemia (K+ < 2.5 mmol/L)",
    category: "metabolic",
    severity: "critical",
    system_id: "metabolic_toxicology",
    system_name: "Rối Loạn Điện Giải & Nhiễm Độc Thuốc",
    anatomical_region: "Tái cực chậm trễ & tăng tính kích thích do Kali máu thấp",
    criteria: [
      "Sóng T dẹt, giảm biên độ hoặc đảo ngược thành sóng T âm",
      "Sóng U nổi bật xuất hiện ngay sau sóng T, biên độ sóng U > 1mm và có thể cao hơn sóng T ở V2, V3",
      "Đoạn ST chênh xuống nhẹ (thường từ 0.5 - 1.0mm)",
      "Khoảng QU kéo dài (thường bị nhầm lẫn là khoảng QT kéo dài)",
      "Nguy cơ cao khởi phát các loạn nhịp thất chết người: Ngoại tâm thu thất, Cơn nhanh thất và Xoắn đỉnh (Torsades de Pointes)",
    ],
    lead_manifestations: {
      V2: "Sóng T dẹt, sóng U dương cao 2.5mm vượt trội hơn sóng T",
      V3: "Sóng U nổi rõ > 2mm, ST chênh xuống 1mm",
      DII: "ST chênh xuống nhẹ, sóng T dẹt, sóng U đi kèm tạo cảm giác QT dài",
      II: "Dải nhịp Lead II: Mô hình sóng U nổi rõ và khoảng QU kéo dài",
    },
    annotations: [
      { leadId: "V2", waveComponent: "T", label: "▲ Sóng U nổi rõ > 1mm (Cao hơn sóng T)", targetCyclePhase: 0.55, color: "#9333ea", badgePlacement: "top", criterionIndex: 1 },
      { leadId: "V2", waveComponent: "ST", label: "▼ ST chênh xuống nhẹ & T dẹt", targetCyclePhase: 0.35, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 0 },
      { leadId: "DII", waveComponent: "RR", label: "Khoảng QU giả kéo dài > 500ms", targetCyclePhase: 0.30, intervalEndPhase: 0.65, color: "#d97706", badgePlacement: "interval", criterionIndex: 3 },
    ],
    ecg_metrics: {
      expected_hr: "75 - 105 bpm",
      pr_interval: "160 - 210 ms",
      qrs_duration: "85 - 100 ms",
      qt_interval: "QU interval > 500 ms",
      qrs_axis: "+60° (Bình thường)",
    },
    clinical_action: "BÙ KALI KHẨN CẤP! (1) Bù Kali tĩnh mạch: Truyền Kali Clorid (KCl) qua đường truyền tĩnh mạch có máy tiêm điện/truyền dịch có kiểm soát tốc độ (tối đa 10-20 mmol/giờ qua ngoại vi, 40 mmol/giờ qua tĩnh mạch trung tâm); (2) BẮT BUỘC BÙ MAGNE ĐỒNG THỜI (Magne là đồng yếu tố của bơm Na+/K+ ATPase, nếu không bù Magne thì không thể bù được Kali); (3) Mắc monitor theo dõi liên tục đề phòng Xoắn đỉnh.",
    differential_diagnoses: ["Hội chứng QT dài (LQTS)", "Ngộ độc Digitalis", "Thiếu máu cơ tim dưới nội tâm mạc"],
    clinical_presentation: {
      symptoms: ["Yếu mỏi cơ toàn thân, chuột rút bắp chân", "Bụng trướng hơi, liệt ruột cơ năng, táo bón"],
      physical_signs: ["Giảm trương lực cơ, giảm phản xạ gân xương", "Bụng trướng mềm, giảm nhu động ruột"],
      risk_factors: ["Nôn ói nhiều, tiêu chảy cấp mất nước, dùng thuốc lợi tiểu quai/thiazide không bù Kali, hẹp động mạch thận"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Cấp cứu hạ điện giải nặng",
      initialStabilization: ["Mắc monitor theo dõi nguy cơ xoắn đỉnh", "Lập đường truyền tĩnh mạch"],
      medications: [
        { name: "Kali Clorid (KCl)", dose: "Pha 1-2 ống KCl 10% (1-2g) vào 500ml NaCl 0.9% truyền TM tốc độ 10-20 mmol/h", route: "IV Infusion", notes: "TUYỆT ĐỐI KHÔNG TIÊM TRỰC TIẾP TĨNH MẠCH (gây ngừng tim lập tức)" },
        { name: "Magnesi Sulfat", dose: "1 - 2g truyền TM", route: "IV Infusion", notes: "Bù Magne đồng thời giúp giữ Kali trong tế bào" },
      ],
      interventions: ["Đặt catheter tĩnh mạch trung tâm nếu cần bù Kali nồng độ cao"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Thấy khoảng QT có vẻ rất dài: Soi kỹ xem đó là sóng T hay là phức hợp sóng T hòa lẫn sóng U (khoảng QU).",
        "2. Kiểm tra V2, V3: Nếu thấy sóng thứ hai dương tròn sau sóng T -> Sóng U nổi bật của Hạ Kali.",
        "3. Kiểm tra ST: Thấy ST chênh xuống nhẹ và T dẹt -> Khẳng định Hạ Kali máu.",
      ],
      key_differential_features: ["Hạ Kali có sóng U nổi rõ; Hội chứng QT dài bẩm sinh có sóng T thực sự kéo dài."],
    },
    red_flags: {
      contraindications: ["CẤM TIÊM TĨNH MẠCH TRỰC TIẾP KALI CLORID (IV Bolus/Push) - Đây là lỗi y khoa chết người gây ngừng tim ngay lập tức! Bắt buộc phải pha loãng và truyền qua máy kiểm soát tốc độ!"],
      pitfalls: ["Bù Kali mãi mà không tăng do quên xét nghiệm và bù Magne máu đi kèm."],
    },
    patient_case: {
      age: 42,
      gender: "Nữ",
      chiefComplaint: "Yếu liệt hai chân và chuột rút dữ dội sau 3 ngày tiêu chảy cấp",
      historyOfPresentIllness: "Bệnh nhân nữ 42 tuổi bị ngộ độc thực phẩm tiêu chảy phân lỏng 10-15 lần/ngày kéo dài 3 ngày, uống nước lọc không bù Oresol. Sáng nay hai chân bủn rủn không bước đi được, chuột rút co cứng bắp chân.",
      vitals: { bloodPressure: "95/60 mmHg", heartRate: 98, respiratoryRate: 18, spO2: 98, temperature: 36.8 },
      labResults: { "K+": "2.1 mmol/L (Cực thấp)", "Mg2+": "0.62 mmol/L", "Na+": "132 mmol/L" },
    },
  },

  {
    id: "digoxin_toxicity",
    name: "Nhiễm Độc Digitalis (Digoxin Toxicity)",
    name_en: "Digoxin Toxicity (Digitalis Effect & Dysrhythmias)",
    category: "metabolic",
    severity: "critical",
    system_id: "metabolic_toxicology",
    system_name: "Rối Loạn Điện Giải & Nhiễm Độc Thuốc",
    anatomical_region: "Ức chế bơm Na+/K+ ATPase cơ tim do ngộ độc Glycoside tim",
    criteria: [
      "Dấu hiệu ngấm Digoxin kinh điển: ST chênh xuống cong lõm hình đáy chén / hình muỗng (Scooped ST depression / Dấu hiệu ria mép họa sĩ Salvador Dali)",
      "Khoảng QT ngắn lại (đặc điểm phân biệt với hạ kali máu)",
      "Sóng T dẹt, hai pha hoặc âm",
      "Loạn nhịp tim do ngộ độc Digoxin: Ngoại tâm thu thất dạng nhịp đôi (Ventricular Bigeminy) là dấu hiệu phổ biến nhất",
      "Block nhĩ thất các độ (Block AV độ I, II, III) kèm nhịp nhanh nhĩ hoặc nhịp bộ nối gia tốc",
    ],
    lead_manifestations: {
      V5: "ST chênh xuống lõm hình muỗng Salvador Dali 2.0mm, QT ngắn",
      V6: "ST cong lõm hình đáy chén kinh điển",
      DII: "ST cong lõm, kèm ngoại tâm thu thất nhịp đôi (Bigeminy)",
      aVL: "ST cong lõm",
    },
    annotations: [
      { leadId: "V5", waveComponent: "ST", label: "▼ ST lõm hình đáy chén (Salvador Dali moustache)", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "bottom", criterionIndex: 0 },
      { leadId: "V5", waveComponent: "T", label: "QT ngắn lại + T dẹt hai pha", targetCyclePhase: 0.42, color: "#2563eb", badgePlacement: "bottom", criterionIndex: 1 },
      { leadId: "DII", waveComponent: "R", label: "Ngoại tâm thu thất nhịp đôi (Bigeminy do ngộ độc)", targetCyclePhase: 0.25, color: "#e11d48", badgePlacement: "top", criterionIndex: 3 },
    ],
    ecg_metrics: {
      expected_hr: "50 - 110 bpm (Tùy loạn nhịp)",
      pr_interval: "200 - 240 ms (PR dài)",
      qrs_duration: "85 - 105 ms",
      qt_interval: "300 - 340 ms (QT ngắn)",
      qrs_axis: "+45° (Bình thường)",
    },
    clinical_action: "CẤP CỨU NGỘ ĐỘC THUỐC TIM MẠCH! (1) NGƯNG NGAY DIGOXIN; (2) DÙNG THUỐC GIẢI ĐỘC ĐẶC HIỆU: Kháng thể kháng Digoxin đặc hiệu (Digoxin-specific Fab fragments - DigiFab); (3) Kiểm tra và điều chỉnh Kali máu (duy trì K+ 4.0 - 5.0 mmol/L) và Magne máu; (4) Nếu có nhịp chậm/Block AV: Atropin hoặc đặt máy tạo nhịp tạm thời; (5) Nếu có loạn nhịp thất: Dùng Lidocaine hoặc Phenytoin (TRÁNH dùng sốc điện chuyển nhịp vì gây rung thất trơ).",
    differential_diagnoses: ["Hạ Kali máu", "Thiếu máu cơ tim dưới nội tâm mạc", "Tăng gánh thất trái"],
    clinical_presentation: {
      symptoms: ["Nhìn mờ, nhìn thấy quầng màu vàng hoặc xanh lá cây quanh bóng đèn (Xanthopsia kinh điển)", "Chán ăn, buồn nôn, nôn mửa, đau quặn bụng", "Lú lẫn, chóng mặt ở người già"],
      physical_signs: ["Mạch chậm hoặc mạch không đều dạng nhịp đôi", "Dấu hiệu mất nước do nôn"],
      risk_factors: ["Bệnh nhân suy tim đang uống Digoxin bị suy thận cấp hoặc dùng kèm thuốc lợi tiểu hạ Kali hoặc Amiodarone làm tăng nồng độ Digoxin"],
    },
    emergency_management: {
      priorityLevel: "Mức 1 - Ngộ độc thuốc tim mạch nguy kịch",
      initialStabilization: ["Mắc monitor theo dõi nhịp liên tục", "Định lượng nồng độ Digoxin máu"],
      medications: [
        { name: "Digoxin-specific Fab (DigiFab)", dose: "Số lọ = (Nồng độ Digoxin x Cân nặng) / 100 hoặc dùng 5-10 lọ khẩn cấp", route: "IV Infusion", notes: "Thuốc giải độc trung hòa Digoxin tự do tức thì" },
        { name: "Lidocaine", dose: "1 - 1.5 mg/kg tiêm TM", route: "IV Push", notes: "Thuốc chống loạn nhịp thất an toàn nhất trong ngộ độc Digoxin" },
        { name: "Magnesi Sulfat", dose: "2g truyền TM", route: "IV Infusion", notes: "Ổn định màng cơ tim" },
      ],
      interventions: ["Đặt máy tạo nhịp tạm thời nếu Block AV độ cao có tụt huyết áp"],
    },
    approach_algorithm: {
      step_by_step_approach: [
        "1. Nhìn đoạn ST ở V5, V6, DII: Thấy đoạn ST chênh xuống có đường cong lõm mềm mại giống hình ria mép của họa sĩ Salvador Dali.",
        "2. Đo khoảng QT: Thấy QT ngắn (ngược với hạ kali có QT dài).",
        "3. Kiểm tra nhịp tim: Có ngoại tâm thu thất nhịp đôi (Bigeminy) hoặc block AV -> Khẳng định nhiễm độc Digoxin.",
      ],
      key_differential_features: ["Thiếu máu cơ tim có ST đi ngang hoặc dốc xuống góc cạnh; Digoxin có ST cong lõm võng xuống."],
    },
    red_flags: {
      contraindications: ["CHỐNG CHỈ ĐỊNH TIÊM CANXI TRONG NGỘ ĐỘC DIGOXIN (Canxi tiêm TM sẽ gây co cứng cơ tim không hồi phục - 'Stone heart' tử vong ngay lập tức)! TRÁNH SỐC ĐIỆN vì có thể gây Rung thất trơ."],
      pitfalls: ["Phối hợp Amiodarone hoặc Verapamil với Digoxin mà không giảm nửa liều Digoxin, dẫn đến ngộ độc Digoxin sau vài ngày."],
    },
    patient_case: {
      age: 76,
      gender: "Nữ",
      chiefComplaint: "Buồn nôn, chán ăn, nhìn vật gì cũng thấy quầng màu vàng 3 ngày nay",
      historyOfPresentIllness: "Cụ bà 76 tuổi suy tim rung nhĩ đang dùng Digoxin 0.25mg/ngày và Furosemide. Gần đây ăn uống kém, mệt mỏi, mắt nhìn bóng đèn thấy quầng sáng vàng, tim đập lúc nhanh lúc chậm.",
      vitals: { bloodPressure: "110/65 mmHg", heartRate: 54, respiratoryRate: 18, spO2: 96, temperature: 36.6 },
      labResults: { "Nồng độ Digoxin máu": "3.8 ng/mL (Ngộ độc nặng > 2.0)", "K+": "3.1 mmol/L", "Creatinine": "145 umol/L" },
    },
  },
];

// 3. Thực thi chèn hoặc cập nhật toàn bộ 31 bệnh lý vào SQLite
console.log(`Bắt đầu nạp ${diagnoses.length} bệnh lý ECG chuẩn theo 9 hệ thống...`);

const insertStmt = db.prepare(`
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

const insertMany = db.transaction((items) => {
  for (const item of items) {
    insertStmt.run(
      item.id,
      item.name,
      item.name_en,
      item.category,
      item.severity,
      item.system_id,
      item.system_name,
      item.anatomical_region || "",
      JSON.stringify(item.criteria || []),
      JSON.stringify(item.lead_manifestations || {}),
      JSON.stringify(ALL_COMPREHENSIVE_ANNOTATIONS[item.id] || item.annotations || []),
      JSON.stringify(item.ecg_metrics || {}),
      item.clinical_action || "",
      JSON.stringify(item.differential_diagnoses || []),
      JSON.stringify(item.clinical_presentation || {}),
      JSON.stringify(item.emergency_management || {}),
      JSON.stringify(item.approach_algorithm || {}),
      JSON.stringify(item.red_flags || {}),
      JSON.stringify(item.patient_case || {})
    );
  }
});

insertMany(diagnoses);

const total = db.prepare("SELECT COUNT(*) as count FROM ecg_diagnoses").get().count;
const systemsCount = db.prepare("SELECT system_name, COUNT(*) as c FROM ecg_diagnoses GROUP BY system_name").all();

console.log(`\n✅ THÀNH CÔNG! Tổng số bệnh lý trong SQLite: ${total} bản ghi.`);
console.log("Thống kê theo 9 hệ thống lâm sàng:");
systemsCount.forEach((s) => console.log(` - ${s.system_name}: ${s.c} bệnh lý`));

db.close();
