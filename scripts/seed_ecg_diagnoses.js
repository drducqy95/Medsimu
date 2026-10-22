/**
 * Seed Script: Nạp danh mục tiêu chuẩn chẩn đoán điện tim đồ lâm sàng vào SQLite
 * Kèm hệ thống ánh xạ vị trí trực quan lên từng sóng chuyển đạo (ECG Waveform Mapped Annotations)
 */

const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "medsim.db");
const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");

// 1. Tạo bảng ecg_diagnoses nếu chưa có (có cột annotations_json)
db.exec(`
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
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Migration an toàn nếu bảng đã tồn tại từ trước nhưng thiếu cột annotations_json
try {
  db.exec(`ALTER TABLE ecg_diagnoses ADD COLUMN annotations_json TEXT DEFAULT '[]';`);
} catch (e) {
  // Cột đã tồn tại
}

// 2. Dữ liệu 17 bệnh lý điện tâm đồ chuẩn y khoa kèm ánh xạ vị trí sóng
const diagnosesData = [
  {
    id: "stemi_inferior",
    name: "Nhồi Máu Cơ Tim Cấp Có ST Chênh Lên Thành Dưới",
    name_en: "Acute Inferior ST-Elevation Myocardial Infarction (Inferior STEMI)",
    category: "ischemia",
    severity: "critical",
    criteria: [
      "ST chênh lên dạng vòm ≥ 1mm (0.1 mV) ở ít nhất 2 chuyển đạo liên tiếp thành dưới: DII, DIII, aVF",
      "Hình ảnh soi gương (reciprocal): ST chênh xuống ≥ 0.5 - 1mm ở chuyển đạo thành bên cao (DI, aVL)",
      "Sóng Q hoại tử rộng ≥ 0.04s hoặc sâu ≥ 1/4 biên độ sóng R tương ứng ở DIII, aVF (giai đoạn tiến triển)",
      "Tối cấp: Sóng T khổng lồ, dương đối xứng trước khi ST chênh vòm",
    ],
    lead_manifestations: {
      DII: "ST chênh lên dạng vòm 2.5 - 3.2mm, sóng T dương cao",
      DIII: "ST chênh lên dạng vòm 3.0 - 4.0mm, sóng Q bệnh lý sâu 0.3mV",
      aVF: "ST chênh lên 2.8 - 3.5mm",
      DI: "Hình ảnh soi gương: ST chênh xuống 1.5 - 2.0mm, T âm",
      aVL: "Hình ảnh soi gương: ST chênh xuống 1.8 - 2.5mm, T âm sâu",
      "V1-V3": "Đẳng điện hoặc ST chênh xuống nhẹ (gợi ý thiếu máu sau dưới)",
      "V4-V6": "Gần như bình thường (trừ khi tổn thương lan rộng mỏm)",
    },
    annotations: [
      { leadId: "DII", waveComponent: "ST", label: "▲ ST chênh vòm +3.2mm (≥1mm)", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top" },
      { leadId: "DIII", waveComponent: "Q", label: "Q hoại tử ≥0.04s", targetCyclePhase: 0.20, color: "#9333ea", badgePlacement: "bottom" },
      { leadId: "DIII", waveComponent: "ST", label: "▲ ST chênh lên +3.8mm", targetCyclePhase: 0.31, color: "#e11d48", badgePlacement: "top" },
      { leadId: "aVF", waveComponent: "ST", label: "▲ ST chênh lên +3.4mm", targetCyclePhase: 0.30, color: "#e11d48", badgePlacement: "top" },
      { leadId: "aVL", waveComponent: "ST", label: "▼ ST soi gương -1.8mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom" },
      { leadId: "DI", waveComponent: "ST", label: "▼ ST soi gương -1.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom" },
    ],
    ecg_metrics: {
      expected_hr: "50 - 90 bpm",
      pr_interval: "160 - 210 ms",
      qrs_duration: "85 - 100 ms",
      qt_interval: "400 - 430 ms",
      qrs_axis: "+90° đến +120° (Trục phải)",
    },
    clinical_action:
      "Báo động đỏ Can thiệp Mạch vành (Cath Lab PCI) trong vòng 90 phút. Cho Aspirin 300mg + Ticagrelor 180mg + Heparin không phân đoạn. Đo ngay V3R, V4R khảo sát thất phải; TUYỆT ĐỐI TRÁNH Nitroglycerin và Morphin nếu có nhồi máu thất phải kèm theo!",
    differential_diagnoses: [
      "Viêm màng ngoài tim cấp",
      "Tái cực sớm lành tính",
      "Phình vách thất cũ",
    ],
  },
  {
    id: "stemi_anterior",
    name: "Nhồi Máu Cơ Tim Cấp Có ST Chênh Lên Thành Trước Rộng",
    name_en: "Acute Anterior / Extensive Anterior STEMI",
    category: "ischemia",
    severity: "critical",
    criteria: [
      "ST chênh lên dạng vòm bia mộ (Tombstoning) ≥ 2mm ở V1-V3 và/hoặc ≥ 1mm ở V4-V6",
      "Mất sóng r tăng trưởng bình thường (dạng rS hoặc QS hoại tử xuyên thành từ V1-V4)",
      "ST chênh xuống soi gương ở các chuyển đạo thành dưới: DII, DIII, aVF",
      "Sóng T cao nhọn tối cấp hoặc hòa lẫn trực tiếp vào đoạn ST tạo thành một khối vòm",
    ],
    lead_manifestations: {
      V1: "ST chênh lên 3.0mm, sóng r nhỏ cụt ngủn",
      V2: "ST chênh lên dạng bia mộ khổng lồ 4.5 - 5.5mm, sóng T khổng lồ",
      V3: "ST chênh lên dạng bia mộ 4.0 - 5.0mm, mất sóng R dạng QS",
      V4: "ST chênh lên 3.5mm, sóng T dương cao",
      V5: "ST chênh lên 2.0 - 2.5mm",
      V6: "ST chênh lên 1.5mm",
      DII: "ST chênh xuống soi gương 1.5mm",
      DIII: "ST chênh xuống soi gương 2.0mm",
      aVF: "ST chênh xuống soi gương 1.8mm",
    },
    annotations: [
      { leadId: "V2", waveComponent: "ST", label: "▲ ST Vòm Bia Mộ (Tombstone) +4.8mm", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "top" },
      { leadId: "V3", waveComponent: "ST", label: "▲ ST Tombstone +4.2mm", targetCyclePhase: 0.32, color: "#e11d48", badgePlacement: "top" },
      { leadId: "V1", waveComponent: "Q", label: "Mất sóng r dạng QS", targetCyclePhase: 0.20, color: "#9333ea", badgePlacement: "bottom" },
      { leadId: "DIII", waveComponent: "ST", label: "▼ ST soi gương -1.8mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom" },
      { leadId: "aVF", waveComponent: "ST", label: "▼ ST soi gương -1.5mm", targetCyclePhase: 0.32, color: "#2563eb", badgePlacement: "bottom" },
    ],
    ecg_metrics: {
      expected_hr: "80 - 110 bpm",
      pr_interval: "150 - 180 ms",
      qrs_duration: "95 - 115 ms",
      qt_interval: "410 - 450 ms",
      qrs_axis: "-15° đến -45° (Trục trái)",
    },
    clinical_action:
      "Báo động đỏ PCI cấp cứu mở thông nhánh LAD ngay lập tức! Thở oxy nếu SpO2 < 90%, kiểm soát đau ngực bằng Fentanyl/Morphin, kháng đông và kháng kết tập tiểu cầu kép (DAPT). Theo dõi sát sốc tim và phù phổi cấp.",
    differential_diagnoses: [
      "Block nhánh trái hoàn toàn (LBBB)",
      "Hội chứng Brugada",
      "Phì đại thất trái (LVH)",
    ],
  },
  {
    id: "av_block_first_degree",
    name: "Block Nhĩ Thất Độ I",
    name_en: "First-Degree Atrioventricular Block (1st Degree AV Block)",
    category: "conduction",
    severity: "borderline",
    criteria: [
      "Khoảng PR kéo dài cố định > 0.20 giây (200 ms, tức > 5 ô nhỏ trên giấy in milimet)",
      "Tất cả các sóng P đều được dẫn truyền xuống thất (Tỷ lệ dẫn 1:1, không có nhát nào bị rớt)",
      "Khoảng PR không đổi qua mọi chu chuyển tim trên cùng một đạo trình",
      "Phức bộ QRS hẹp (< 120 ms) trừ khi có block nhánh kèm theo",
    ],
    lead_manifestations: {
      DII: "Khoảng PR đo được 260 ms (6.5 ô nhỏ), sóng P đi trước QRS cố định",
      V1: "PR kéo dài 260 ms, hình thái QRS bình thường",
      ALL: "Toàn bộ 12 chuyển đạo thể hiện khoảng PR dài > 200 ms đồng nhất",
    },
    annotations: [
      { leadId: "DII", waveComponent: "PR", label: "↔ PR = 260ms (> 200ms / 5 ô nhỏ)", targetCyclePhase: 0.04, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval" },
      { leadId: "V1", waveComponent: "PR", label: "↔ PR kéo dài cố định 260ms", targetCyclePhase: 0.04, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval" },
      { leadId: "II", waveComponent: "PR", label: "↔ Dải nhịp Lead II: PR = 260ms cố định", targetCyclePhase: 0.04, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval" },
    ],
    ecg_metrics: {
      expected_hr: "60 - 80 bpm",
      pr_interval: "240 - 280 ms (> 200 ms)",
      qrs_duration: "80 - 95 ms",
      qt_interval: "380 - 410 ms",
      qrs_axis: "+30° đến +60°",
    },
    clinical_action:
      "Thường lành tính, không cần xử trí cấp cứu. Rà soát lại các thuốc đang dùng làm chậm dẫn truyền nút nhĩ thất (Chẹn beta, chẹn calci diltiazem/verapamil, digoxin, amiodarone).",
    differential_diagnoses: [
      "Nhịp bộ nối gia tốc",
      "Sóng P lẫn vào sóng T của nhát trước",
    ],
  },
  {
    id: "av_block_mobitz_1",
    name: "Block Nhĩ Thất Độ II Kiểu Mobitz I (Chu Kỳ Wenckebach)",
    name_en: "Second-Degree AV Block Mobitz Type I (Wenckebach Phenomenon)",
    category: "conduction",
    severity: "abnormal",
    criteria: [
      "Khoảng PR dài dần ra qua từng chu chuyển tim liên tiếp (PR1 < PR2 < PR3)",
      "Đến một chu kỳ thì sóng P bị block hoàn toàn, không dẫn ra thất (rớt một phức bộ QRS và T)",
      "Khoảng nghỉ (P không dẫn) ngắn hơn 2 lần khoảng RR bình thường",
      "Sau nhát rơi, chu kỳ lặp lại bắt đầu bằng khoảng PR ngắn nhất",
    ],
    lead_manifestations: {
      DII: "Dải nhịp ghi nhận: Nhát 1 PR=160ms, Nhát 2 PR=240ms, Nhát 3 PR=320ms, Nhát 4 có P đơn độc rơi QRS",
      RHYTHM_STRIP: "Chu kỳ Wenckebach 4:3 (4 sóng P cho ra 3 phức bộ QRS)",
      ALL: "Sóng P hình dạng xoang bình thường, tần số nhĩ đều",
    },
    annotations: [
      { leadId: "DII", waveComponent: "PR", label: "PR dài dần (160ms → 240ms → 320ms)", targetCyclePhase: 0.06, intervalEndPhase: 0.30, color: "#d97706", badgePlacement: "interval" },
      { leadId: "DII", waveComponent: "DROPPED", label: "❌ P không dẫn (Rớt QRS)", targetCyclePhase: 0.06, color: "#e11d48", badgePlacement: "top" },
      { leadId: "II", waveComponent: "DROPPED", label: "❌ Chu kỳ Wenckebach: Rớt 1 nhát QRS", targetCyclePhase: 0.06, color: "#e11d48", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "45 - 60 bpm",
      pr_interval: "Biến thiên 160ms → 320ms",
      qrs_duration: "80 - 95 ms",
      qt_interval: "390 - 420 ms",
      qrs_axis: "Bình thường",
    },
    clinical_action:
      "Vị trí tắc nghẽn thường lành tính tại nút nhĩ thất. Nếu có triệu chứng tụt HA: Dùng Atropin 0.5 - 1mg tiêm tĩnh mạch. Ngừng thuốc ức chế nút AV.",
    differential_diagnoses: [
      "Ngoại tâm thu nhĩ bị block",
      "Block AV độ II Mobitz 2",
    ],
  },
  {
    id: "av_block_mobitz_2",
    name: "Block Nhĩ Thất Độ II Kiểu Mobitz II",
    name_en: "Second-Degree AV Block Mobitz Type II",
    category: "conduction",
    severity: "critical",
    criteria: [
      "Khoảng PR cố định không đổi ở các nhát dẫn truyền bình thường",
      "Đột ngột rớt một hoặc nhiều phức bộ QRS sau sóng P mà KHÔNG CÓ sự dài dần của PR báo trước",
      "Tần số sóng P đều đặn (P-P cố định), tỷ lệ dẫn truyền thường là 2:1, 3:1 hoặc 4:1",
      "Phức bộ QRS thường giãn rộng > 120 ms do vị trí block nằm ở dưới bó His (tổn thương hệ Purkinje)",
    ],
    lead_manifestations: {
      DII: "Hai nhát dẫn PR=180ms cố định, nhát thứ ba xuất hiện sóng P bình thường nhưng mất hoàn toàn QRS",
      V1: "Hình ảnh block nhánh phải hoặc trái kèm theo do tổn thương nhánh dẫn truyền",
      ALL: "Khoảng P-P đều chằn chặn, các nhát QRS rớt đột ngột không dấu hiệu báo trước",
    },
    annotations: [
      { leadId: "DII", waveComponent: "PR", label: "PR cố định 180ms", targetCyclePhase: 0.08, intervalEndPhase: 0.26, color: "#2563eb", badgePlacement: "interval" },
      { leadId: "DII", waveComponent: "DROPPED", label: "❌ Đột ngột rớt QRS sau sóng P", targetCyclePhase: 0.08, color: "#e11d48", badgePlacement: "top" },
      { leadId: "II", waveComponent: "DROPPED", label: "❌ Block dưới bó His: Rớt QRS 3:2", targetCyclePhase: 0.08, color: "#e11d48", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "35 - 55 bpm",
      pr_interval: "180 ms",
      qrs_duration: "115 - 135 ms",
      qt_interval: "420 - 450 ms",
      qrs_axis: "Lệch trục",
    },
    clinical_action:
      "Tối khẩn cấp! Nguy cơ rất cao tiến triển thành Block AV độ III hoàn toàn hoặc vô tâm thu gây ngất ngã (Hội chứng Adams-Stokes). Chuẩn bị máy tạo nhịp tim tạm thời, chỉ định cấy máy tạo nhịp vĩnh viễn.",
    differential_diagnoses: [
      "Block AV độ II Mobitz 1",
      "Ngoại tâm thu nhĩ không dẫn",
    ],
  },
  {
    id: "av_block_third_degree",
    name: "Block Nhĩ Thất Độ III (Phân Ly Nhĩ - Thất Hoàn Toàn)",
    name_en: "Third-Degree Atrioventricular Block (Complete Heart Block - CHB)",
    category: "conduction",
    severity: "critical",
    criteria: [
      "Hiện tượng phân ly nhĩ - thất hoàn toàn: Sóng P và phức bộ QRS đập hoàn toàn độc lập, không liên hệ",
      "Tần số nhĩ (sóng P) nhanh hơn tần số thất (P-P đều đặn 60-90 bpm; R-R đều đặn 30-45 bpm)",
      "Khoảng PR hoàn toàn ngẫu nhiên và biến thiên liên tục (sóng P rơi trước, đè lên hoặc sau QRS và T)",
      "Nhịp thoát thất tự động có QRS dãn rộng dị dạng > 120ms nếu ổ phát nhịp ở mạng Purkinje",
    ],
    lead_manifestations: {
      DII: "Dải nhịp thấy rõ các sóng P nhọn đều đặn tần số 75 bpm, lướt tự do đè lên phức bộ QRS chậm 36 bpm",
      V1: "Phức bộ QRS dãn rộng 140ms dạng nhịp thoát thất chậm",
      ALL: "Khoảng cách giữa các sóng P đều, khoảng cách giữa các QRS đều, nhưng không có sự tương quan",
    },
    annotations: [
      { leadId: "DII", waveComponent: "P", label: "Sóng P xoang (75 bpm) độc lập", targetCyclePhase: 0.15, color: "#059669", badgePlacement: "top" },
      { leadId: "DII", waveComponent: "R", label: "Nhịp thoát thất rộng 135ms (36 bpm)", targetCyclePhase: 0.25, color: "#e11d48", badgePlacement: "bottom" },
      { leadId: "II", waveComponent: "RR", label: "⚡ Phân ly nhĩ - thất hoàn toàn (CHB)", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "30 - 42 bpm",
      pr_interval: "Không xác định",
      qrs_duration: "130 - 155 ms",
      qt_interval: "460 - 520 ms",
      qrs_axis: "Lệch trục vô định",
    },
    clinical_action:
      "Cấp cứu tim mạch tối khẩn! Đặt miếng dán tạo nhịp tim qua da (Transcutaneous Pacing) ngay lập tức hoặc truyền Adrenaline / Isoprenaline nâng nhịp tim. Đặt máy tạo nhịp tim tạm thời buồng thất phải.",
    differential_diagnoses: [
      "Phân ly nhĩ thất do nhịp bộ nối gia tốc",
      "Block AV độ II dẫn truyền 2:1",
    ],
  },
  {
    id: "atrial_fibrillation",
    name: "Rung Nhĩ Đáp Ứng Thất Nhanh",
    name_en: "Atrial Fibrillation with Rapid Ventricular Response (AFib with RVR)",
    category: "atrial",
    severity: "abnormal",
    criteria: [
      "Mất hoàn toàn sóng P sinh lý bình thường trên toàn bộ 12 chuyển đạo",
      "Thay thế bằng các sóng lăn tăn f biên độ nhỏ, tần số nhĩ cực nhanh 350 - 600 chu kỳ/phút",
      "Đáp ứng thất hoàn toàn không đều (Khoảng R-R hoàn toàn không có quy luật - 'Loạn nhịp hoàn toàn')",
      "Phức bộ QRS hẹp (< 120 ms) trừ khi có dẫn truyền lệch hướng",
    ],
    lead_manifestations: {
      V1: "Sóng lăn tăn f rõ nét nhất với dao động mấp mô không đều",
      DII: "Mất đường đẳng điện phẳng, thay bằng sóng f lăn tăn, khoảng cách giữa các đỉnh R thay đổi ngẫu nhiên",
      ALL: "Khoảng R-R co giãn bất thường, không có quy luật chu kỳ",
    },
    annotations: [
      { leadId: "DII", waveComponent: "RR", label: "↔ R-R hoàn toàn không đều (Loạn nhịp)", targetCyclePhase: 0.14, intervalEndPhase: 0.65, color: "#d97706", badgePlacement: "interval" },
      { leadId: "V1", waveComponent: "P", label: "~ Sóng f lăn tăn 400-600 cpm (Mất P)", targetCyclePhase: 0.10, color: "#7c3aed", badgePlacement: "bottom" },
      { leadId: "II", waveComponent: "RR", label: "↔ R-R không theo quy luật chu kỳ", targetCyclePhase: 0.14, intervalEndPhase: 0.65, color: "#d97706", badgePlacement: "interval" },
    ],
    ecg_metrics: {
      expected_hr: "110 - 160 bpm",
      pr_interval: "0 ms (mất P)",
      qrs_duration: "85 - 95 ms",
      qt_interval: "320 - 360 ms",
      qrs_axis: "Bình thường",
    },
    clinical_action:
      "Đánh giá huyết động: Nếu tụt huyết áp -> SỐC ĐIỆN ĐỒNG BỘ 100 - 200J. Nếu huyết động ổn: Kiểm soát tần số thất bằng Metoprolol IV hoặc Diltiazem IV. Khởi động thuốc chống đông phòng ngừa đột quỵ.",
    differential_diagnoses: [
      "Cuồng nhĩ dẫn truyền thay đổi",
      "Nhịp nhanh nhĩ đa ổ (MAT)",
    ],
  },
  {
    id: "atrial_flutter",
    name: "Cuồng Nhĩ Dẫn Truyền 2:1",
    name_en: "Atrial Flutter with 2:1 Conduction",
    category: "atrial",
    severity: "abnormal",
    criteria: [
      "Mất đường đẳng điện, thay bằng các sóng răng cưa hình F (Sawtooth pattern) liên tục, đều đặn",
      "Tần số sóng nhĩ F điển hình là 300 bpm (khoảng cách giữa 2 đỉnh F đúng bằng 1 ô lớn 5mm / 0.20s)",
      "Sóng F âm rõ nhất ở các chuyển đạo thành dưới: DII, DIII, aVF; dương ở V1",
      "Tỷ lệ dẫn truyền nhĩ:thất thường cố định 2:1 (tần số thất 150 bpm) hoặc 4:1 (75 bpm)",
    ],
    lead_manifestations: {
      DII: "Dòng sóng răng cưa F liên tục 300 bpm, không có đoạn đẳng điện phẳng giữa các sóng",
      DIII: "Sóng răng cưa F âm sâu rõ nét",
      aVF: "Sóng F răng cưa điển hình",
      V1: "Sóng F dương nhỏ tần số 300 bpm",
    },
    annotations: [
      { leadId: "DII", waveComponent: "P", label: "Sóng răng cưa F (300 bpm, 2:1)", targetCyclePhase: 0.05, color: "#d97706", badgePlacement: "bottom" },
      { leadId: "DIII", waveComponent: "P", label: "Sóng F âm liên tục không đẳng điện", targetCyclePhase: 0.05, color: "#d97706", badgePlacement: "bottom" },
      { leadId: "II", waveComponent: "P", label: "Răng cưa F tần số nhĩ 300 bpm", targetCyclePhase: 0.05, color: "#d97706", badgePlacement: "bottom" },
    ],
    ecg_metrics: {
      expected_hr: "150 bpm",
      pr_interval: "Không xác định",
      qrs_duration: "85 - 95 ms",
      qt_interval: "300 - 330 ms",
      qrs_axis: "Bình thường",
    },
    clinical_action:
      "Sốc điện chuyển nhịp đồng bộ mức năng lượng thấp (50J - 100J). Kiểm soát tần số hoặc triệt đốt vòng vào lại qua catheter (Catheter Ablation).",
    differential_diagnoses: [
      "Nhịp nhanh kịch phát trên thất",
      "Nhịp nhanh xoang 150 bpm",
    ],
  },
  {
    id: "svt",
    name: "Nhịp Nhanh Kịch Phát Trên Thất (AVNRT / AVRT)",
    name_en: "Paroxysmal Supraventricular Tachycardia (PSVT / SVT)",
    category: "atrial",
    severity: "abnormal",
    criteria: [
      "Nhịp tim đều chằn chặn, tần số rất nhanh: 150 - 250 lần/phút (thường 170 - 200 bpm)",
      "Phức bộ QRS hẹp (< 0.12s, tức < 3 ô nhỏ) với hình thái thanh mảnh",
      "Không thấy rõ sóng P (sóng P ẩn lẫn trong phức bộ QRS hoặc sóng T)",
      "Có thể thấy giả sóng r' (pseudo r') ở V1 hoặc giả sóng s ở DII",
      "Đoạn ST có thể chênh xuống nhẹ do thiếu máu dưới nội tâm mạc cơ năng",
    ],
    lead_manifestations: {
      DII: "Nhịp đều tăm tắp 185 bpm, không thấy sóng P đi trước QRS, ST chênh xuống nhẹ",
      V1: "Giả sóng r' nhỏ ở cuối phức bộ QRS",
      ALL: "Khoảng R-R đều tuyệt đối, chu kỳ ngắn ~320ms",
    },
    annotations: [
      { leadId: "DII", waveComponent: "R", label: "QRS hẹp đều tăm tắp (185 bpm, mất P)", targetCyclePhase: 0.17, color: "#0284c7", badgePlacement: "top" },
      { leadId: "V1", waveComponent: "R", label: "Giả sóng r' (Pseudo r')", targetCyclePhase: 0.20, color: "#7c3aed", badgePlacement: "top" },
      { leadId: "II", waveComponent: "RR", label: "↔ Chu kỳ R-R đều chằn chặn 320ms", targetCyclePhase: 0.17, intervalEndPhase: 0.49, color: "#0284c7", badgePlacement: "interval" },
    ],
    ecg_metrics: {
      expected_hr: "170 - 210 bpm",
      pr_interval: "0 ms",
      qrs_duration: "75 - 88 ms",
      qt_interval: "260 - 290 ms",
      qrs_axis: "+45° đến +70°",
    },
    clinical_action:
      "Bước 1: Nghiệm pháp Valsalva cải tiến. Bước 2: Tiêm TM nhanh Adenosine 6mg, nếu không cắt tiêm 12mg. Nếu huyết động không ổn: Sốc điện đồng bộ 50 - 100J.",
    differential_diagnoses: [
      "Cuồng nhĩ dẫn truyền 2:1",
      "Nhanh nhĩ đơn ổ",
    ],
  },
  {
    id: "pvc_frequent",
    name: "Ngoại Tâm Thu Thất Dày Dạng Nhịp Ba (Ventricular Trigeminy)",
    name_en: "Frequent Premature Ventricular Complexes (PVCs - Trigeminy)",
    category: "ventricular",
    severity: "abnormal",
    criteria: [
      "Phức bộ QRS xuất hiện sớm bất thường trước thời điểm của nhát xoang kế tiếp",
      "QRS dãn rộng ≥ 0.12s (≥ 3 ô nhỏ), hình dạng quái dị, dị dạng",
      "Không có sóng P đi trước nhát bóp ngoại vị",
      "Đoạn ST và sóng T biến đổi ngược chiều với đỉnh chính của QRS",
      "Khoảng nghỉ bù hoàn toàn (khoảng cách trước và sau PVC đúng bằng 2 chu kỳ xoang)",
      "Dạng nhịp ba (Trigeminy): Cứ 2 nhát xoang bình thường thì tiếp nối bằng 1 nhát PVC",
    ],
    lead_manifestations: {
      DII: "Hai nhịp xoang bình thường -> 1 nhát QRS khổng lồ 145ms đỉnh R dương cao kèm T âm sâu -> Khoảng nghỉ bù",
      V1: "Nhát PVC dạng hình ảnh block nhánh dị dạng",
      RHYTHM_STRIP: "Chuỗi lặp nhịp nhàng 2 nhát xoang : 1 nhát ngoại tâm thu thất",
    },
    annotations: [
      { leadId: "DII", waveComponent: "R", label: "QRS dị dạng dãn rộng 150ms (Đến sớm)", targetCyclePhase: 0.15, color: "#e11d48", badgePlacement: "top" },
      { leadId: "DII", waveComponent: "RR", label: "Khoảng nghỉ bù hoàn toàn", targetCyclePhase: 0.25, intervalEndPhase: 0.70, color: "#2563eb", badgePlacement: "interval" },
      { leadId: "II", waveComponent: "R", label: "Nhịp ba thất: 2 nhát xoang : 1 nhát PVC", targetCyclePhase: 0.15, color: "#e11d48", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "75 bpm",
      pr_interval: "160 ms (xoang)",
      qrs_duration: "85 ms (xoang) / 145 ms (PVC)",
      qt_interval: "380 ms",
      qrs_axis: "Nhát xoang +60°, nhát PVC -60°",
    },
    clinical_action:
      "Khảo sát các yếu tố kích thích: hạ kali, hạ magie, thiếu máu cơ tim, quá liều Digoxin/cafein. Dùng chẹn Beta nếu có triệu chứng nhiều.",
    differential_diagnoses: [
      "Ngoại tâm thu nhĩ dẫn truyền lệch hướng",
      "Hiện tượng Ashman",
    ],
  },
  {
    id: "ventricular_tachycardia",
    name: "Cơn Nhanh Thất Đơn Dạng (Monomorphic VT)",
    name_en: "Monomorphic Ventricular Tachycardia",
    category: "ventricular",
    severity: "critical",
    criteria: [
      "Chuỗi ≥ 3 phức bộ thất liên tiếp với tần số tim > 100 lần/phút (thường 140 - 220 bpm)",
      "Phức bộ QRS dãn rất rộng ≥ 0.14s (≥ 3.5 ô nhỏ) với hình thái một dạng đồng nhất",
      "Phân ly nhĩ thất (AV dissociation): Sóng P đập độc lập với tần số chậm hơn nếu bộc lộ",
      "Sự đồng hướng âm hoặc dương trên toàn bộ các chuyển đạo trước tim từ V1 đến V6",
      "Đoạn ST và sóng T đảo chiều ngược hướng với đỉnh chính của phức bộ QRS",
    ],
    lead_manifestations: {
      DII: "Dòng sóng QRS rộng 155ms liên tiếp, hình thái đều đặn, tần số 180 bpm",
      V1: "QRS đơn dạng rộng > 140ms dạng rS hoặc R cao ưu thế",
      ALL: "Toàn bộ 12 chuyển đạo ghi nhận nhịp nhanh QRS giãn rộng đồng dạng",
    },
    annotations: [
      { leadId: "DII", waveComponent: "R", label: "QRS rất rộng 155ms (>140ms)", targetCyclePhase: 0.14, color: "#e11d48", badgePlacement: "top" },
      { leadId: "V1", waveComponent: "R", label: "Nhịp nhanh thất 180 bpm đơn dạng", targetCyclePhase: 0.14, color: "#e11d48", badgePlacement: "top" },
      { leadId: "II", waveComponent: "R", label: "Chuỗi phức bộ thất rộng liên tiếp", targetCyclePhase: 0.14, color: "#e11d48", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "160 - 200 bpm",
      pr_interval: "0 ms",
      qrs_duration: "150 - 175 ms",
      qt_interval: "Không xác định",
      qrs_axis: "-90° đến -180° (Trục Tây Bắc)",
    },
    clinical_action:
      "Tối khẩn cấp! Mất mạch: SỐC ĐIỆN KHỬ RUNG NGAY (200J Biphasic) + CPR. Có mạch nhưng tụt HA: Sốc điện đồng bộ 100 - 200J. Có mạch ổn định: Truyền Amiodarone 150mg trong 10 phút.",
    differential_diagnoses: [
      "SVT dẫn truyền lệch hướng",
      "Nhịp nhanh có hội chứng WPW",
    ],
  },
  {
    id: "ventricular_fibrillation",
    name: "Rung Thất Sóng Thô / Mịn (VFib)",
    name_en: "Ventricular Fibrillation (Coarse / Fine VFib)",
    category: "ventricular",
    severity: "critical",
    criteria: [
      "Mất hoàn toàn phức bộ P-QRS-T có tổ chức trên toàn bộ 12 chuyển đạo",
      "Thay thế bằng các dao động sóng hỗn loạn vô định hình về cả biên độ, hình thái và tần số",
      "Tần số dao động cực nhanh 300 - 500 chu kỳ/phút, không thể đo đếm được khoảng QT hay QRS",
      "Tương đương với tình trạng ngừng tim thực sự, không có cung lượng tim hữu hiệu",
    ],
    lead_manifestations: {
      ALL: "Các dao động sóng hỗn loạn, nhấp nhô vô tổ chức, không phân biệt được sóng nào",
    },
    annotations: [
      { leadId: "DII", waveComponent: "R", label: "Dao động sóng thô hỗn loạn (Mất P-QRS-T)", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top" },
      { leadId: "II", waveComponent: "R", label: "CẤP CỨU NGỪNG TIM: SỐC ĐIỆN 200J NGAY!", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "0 bpm",
      pr_interval: "0 ms",
      qrs_duration: "0 ms",
      qt_interval: "0 ms",
      qrs_axis: "Không xác định",
    },
    clinical_action:
      "CẤP CỨU NGỪNG TUẦN HOÀN CODE BLUE! SỐC ĐIỆN PHÁ RUNG NGAY (200J Biphasic) + Ép tim CPR 30:2 liên tục -> Adrenaline 1mg TM mỗi 3-5 phút -> Amiodarone 300mg.",
    differential_diagnoses: [
      "Xoắn đỉnh (Torsades de Pointes)",
      "Nhiễu chuyển động cơ học",
    ],
  },
  {
    id: "asystole",
    name: "Vô Tâm Thu (Đường Đẳng Điện Phẳng / Flatline)",
    name_en: "Asystole / Cardiac Arrest Flatline",
    category: "ventricular",
    severity: "critical",
    criteria: [
      "Đường thẳng đẳng điện hoàn toàn, không có bất kỳ hoạt động điện học thất nào",
      "Biên độ dao động < 0.1 mV (chỉ còn nhiễu nền tối thiểu)",
      "Hoàn toàn không có phức bộ QRS",
      "Bệnh nhân mất tri giác, mất mạch cảnh/bẹn, ngừng thở hoàn toàn",
    ],
    lead_manifestations: {
      ALL: "Đường đẳng điện phẳng lì qua toàn bộ 12 chuyển đạo và dải nhịp kéo dài",
    },
    annotations: [
      { leadId: "DII", waveComponent: "R", label: "Đường đẳng điện phẳng lì (0 bpm)", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top" },
      { leadId: "II", waveComponent: "R", label: "CPR + Adrenalin 1mg (KHÔNG SỐC ĐIỆN)", targetCyclePhase: 0.20, color: "#e11d48", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "0 bpm",
      pr_interval: "0 ms",
      qrs_duration: "0 ms",
      qt_interval: "0 ms",
      qrs_axis: "Không có",
    },
    clinical_action:
      "TUYỆT ĐỐI KHÔNG ĐƯỢC SỐC ĐIỆN! Ép tim CPR liên tục không ngừng nghỉ. Tiêm tĩnh mạch Adrenaline 1mg mỗi 3 - 5 phút. Tìm và giải quyết các nguyên nhân 5H - 5T.",
    differential_diagnoses: [
      "Rung thất sóng mịn",
      "Tuột điện cực",
    ],
  },
  {
    id: "hyperkalemia",
    name: "Tăng Kali Máu Nặng (K+ > 7.0 mmol/L)",
    name_en: "Severe Hyperkalemia (Serum Potassium > 7.0 mEq/L)",
    category: "metabolic",
    severity: "critical",
    criteria: [
      "Sóng T cao vút, nhọn hoắt, đối xứng, đáy hẹp hình lều (Tented / Peaked T waves) biên độ > 5mm ở chi hoặc > 10mm ở trước tim",
      "Khoảng PR kéo dài (> 200 ms), sóng P dẹt dần rồi biến mất hoàn toàn khi Kali tăng cao",
      "Phức bộ QRS dãn rộng dần ra, hợp nhất với sóng T tạo thành dạng sóng sin (Sine-wave pattern)",
      "Nhịp tim có xu hướng chậm dần, đe dọa ngừng tim vô tâm thu hoặc rung thất đột ngột",
    ],
    lead_manifestations: {
      V2: "Sóng T cao nhọn đối xứng khổng lồ 9.5mm, đáy hẹp, QRS dãn 130ms",
      V3: "Sóng T cao nhọn hình lều 10.2mm, sóng P dẹt khó nhận diện",
      V4: "Sóng T cao nhọn 9.0mm",
      DII: "Khoảng PR kéo dài 220ms, QRS dãn rộng, sóng T cao đối xứng",
      ALL: "Sóng T nhọn đối xứng nổi bật ở tất cả các chuyển đạo có R cao",
    },
    annotations: [
      { leadId: "V2", waveComponent: "T", label: "▲ Sóng T lều nhọn hoắt đối xứng (9.8mm)", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top" },
      { leadId: "V3", waveComponent: "T", label: "▲ Sóng T nhọn hình lều > 10mm", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top" },
      { leadId: "V2", waveComponent: "P", label: "Sóng P dẹt mờ nhạt", targetCyclePhase: 0.12, color: "#7c3aed", badgePlacement: "bottom" },
      { leadId: "DII", waveComponent: "PR", label: "PR dài 220ms + QRS dãn rộng 130ms", targetCyclePhase: 0.12, intervalEndPhase: 0.29, color: "#d97706", badgePlacement: "interval" },
      { leadId: "II", waveComponent: "T", label: "▲ Sóng T cao nhọn đáy hẹp (Dấu hiệu lều)", targetCyclePhase: 0.45, color: "#e11d48", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "50 - 65 bpm",
      pr_interval: "220 - 260 ms",
      qrs_duration: "120 - 145 ms",
      qt_interval: "390 - 420 ms",
      qrs_axis: "Lệch trục",
    },
    clinical_action:
      "Cấp cứu nội khoa tối khẩn! Tiêm TM chậm Canxi Clorid 10% 10ml trong 3-5 phút (bảo vệ màng tế bào cơ tim). Truyền Insulin 10 IU pha Glucose 20% 100ml + Khí dung Salbutamol 10-20mg. Lọc máu cấp cứu nếu suy thận vô niệu.",
    differential_diagnoses: [
      "Sóng T tối cấp của nhồi máu cơ tim",
      "Tái cực sớm",
    ],
  },
  {
    id: "normal_sinus",
    name: "Nhịp Xoang Bình Thường",
    name_en: "Normal Sinus Rhythm (NSR)",
    category: "sinus",
    severity: "normal",
    criteria: [
      "Sóng P xuất phát từ nút xoang: Dương ở DI, DII, aVF, V4-V6; Âm ở aVR",
      "Mỗi sóng P đều được dẫn truyền bởi một phức bộ QRS theo sau (Tỷ lệ 1:1)",
      "Tần số tim bình thường nằm trong khoảng 60 - 100 lần/phút, nhịp đều đặn",
      "Khoảng PR bình thường: 0.12 - 0.20 giây (120 - 200 ms, tức 3 - 5 ô nhỏ)",
      "Độ rộng phức bộ QRS bình thường: < 0.12 giây (80 - 100 ms, tức < 3 ô nhỏ)",
      "Đoạn ST nằm trên đường đẳng điện, sóng T dương cùng hướng với phức bộ QRS",
    ],
    lead_manifestations: {
      DII: "Sóng P dương rõ nét, PR 160ms, QRS thanh mảnh 85ms, ST đẳng điện, T dương",
      aVR: "Toàn bộ sóng P, QRS, T đều âm",
      V1: "Dạng rS bình thường (r nhỏ, S sâu)",
      V5: "Dạng qR với R cao thanh mảnh",
    },
    annotations: [
      { leadId: "DII", waveComponent: "P", label: "P xoang (+)", targetCyclePhase: 0.12, color: "#059669", badgePlacement: "top" },
      { leadId: "DII", waveComponent: "PR", label: "PR = 160ms (3-5 ô nhỏ)", targetCyclePhase: 0.12, intervalEndPhase: 0.22, color: "#2563eb", badgePlacement: "interval" },
      { leadId: "DII", waveComponent: "R", label: "QRS = 85ms (< 3 ô)", targetCyclePhase: 0.22, color: "#059669", badgePlacement: "bottom" },
      { leadId: "DII", waveComponent: "ST", label: "ST đẳng điện", targetCyclePhase: 0.32, color: "#059669", badgePlacement: "bottom" },
      { leadId: "aVR", waveComponent: "R", label: "P-QRS-T âm toàn bộ", targetCyclePhase: 0.22, color: "#2563eb", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "60 - 95 bpm",
      pr_interval: "140 - 180 ms",
      qrs_duration: "80 - 95 ms",
      qt_interval: "360 - 410 ms",
      qrs_axis: "+30° đến +75°",
    },
    clinical_action: "Điện tâm đồ trong giới hạn bình thường. Không cần can thiệp điều trị.",
    differential_diagnoses: [],
  },
  {
    id: "sinus_bradycardia",
    name: "Nhịp Chậm Xoang",
    name_en: "Sinus Bradycardia",
    category: "sinus",
    severity: "borderline",
    criteria: [
      "Hình thái sóng P bình thường của nhịp xoang (dương ở DI, DII, aVF; âm ở aVR)",
      "Tần số tim chậm < 60 lần/phút (thường 40 - 55 bpm)",
      "Khoảng PR, phức bộ QRS và đoạn ST-T hoàn toàn bình thường",
      "Khoảng R-R kéo dài nhưng đều đặn",
    ],
    lead_manifestations: {
      ALL: "Hình thái sóng P-QRS-T hoàn toàn bình thường, chỉ có khoảng cách giữa các nhịp bóp kéo dài thưa thớt",
    },
    annotations: [
      { leadId: "DII", waveComponent: "RR", label: "↔ Khoảng R-R kéo dài (HR < 60 bpm)", targetCyclePhase: 0.22, intervalEndPhase: 0.85, color: "#d97706", badgePlacement: "interval" },
      { leadId: "DII", waveComponent: "P", label: "Sóng P xoang bình thường", targetCyclePhase: 0.12, color: "#059669", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "40 - 55 bpm",
      pr_interval: "160 - 200 ms",
      qrs_duration: "80 - 95 ms",
      qt_interval: "420 - 460 ms",
      qrs_axis: "Bình thường",
    },
    clinical_action:
      "Có thể là sinh lý bình thường ở vận động viên. Nếu có triệu chứng tụt HA, chóng mặt: Dùng Atropin 0.5 - 1mg tiêm TM. Xem xét ngừng thuốc chẹn beta/digoxin.",
    differential_diagnoses: [
      "Nhịp bộ nối chậm",
      "Block xoang nhĩ",
    ],
  },
  {
    id: "sinus_tachycardia",
    name: "Nhịp Nhanh Xoang",
    name_en: "Sinus Tachycardia",
    category: "sinus",
    severity: "borderline",
    criteria: [
      "Hình thái sóng P bình thường của nhịp xoang đi trước mỗi phức bộ QRS",
      "Tần số tim nhanh > 100 lần/phút (thường 105 - 150 bpm)",
      "Khoảng PR có thể hơi ngắn lại sinh lý do tăng trương lực giao cảm (< 160ms)",
      "Khoảng R-R đều đặn, phức bộ QRS thanh mảnh bình thường",
    ],
    lead_manifestations: {
      ALL: "Nhịp tim xoang đập nhanh đều, sóng P có thể nằm sát sóng T của nhịp trước",
    },
    annotations: [
      { leadId: "DII", waveComponent: "RR", label: "↔ Khoảng R-R ngắn đều (HR > 100 bpm)", targetCyclePhase: 0.22, intervalEndPhase: 0.45, color: "#d97706", badgePlacement: "interval" },
      { leadId: "DII", waveComponent: "P", label: "P xoang đi trước mỗi QRS", targetCyclePhase: 0.12, color: "#059669", badgePlacement: "top" },
    ],
    ecg_metrics: {
      expected_hr: "105 - 145 bpm",
      pr_interval: "130 - 155 ms",
      qrs_duration: "80 - 90 ms",
      qt_interval: "290 - 330 ms",
      qrs_axis: "Bình thường",
    },
    clinical_action:
      "Tìm và điều trị nguyên nhân gốc rễ (Sốt, mất nước, đau, thiếu máu, cường giáp, suy tim, lo âu, thuốc kích thích). KHÔNG dùng thuốc hạ nhịp tim nếu nhịp nhanh là đáp ứng bù trừ sinh lý.",
    differential_diagnoses: [
      "Nhịp nhanh kịch phát trên thất",
      "Cuồng nhĩ dẫn truyền 2:1",
    ],
  },
];

function getAnnotationCriterionIndex(ann, criteria) {
  if (typeof ann.criterionIndex === 'number') return ann.criterionIndex;
  const labelLower = (ann.label + ' ' + ann.waveComponent + ' ' + ann.leadId).toLowerCase();
  for (let i = 0; i < criteria.length; i++) {
    const cLower = criteria[i].toLowerCase();
    if (labelLower.includes('soi gương') && cLower.includes('soi gương')) return i;
    if (labelLower.includes('q hoại tử') && cLower.includes('sóng q')) return i;
    if ((labelLower.includes('tombstone') || labelLower.includes('bia mộ')) &&
        (cLower.includes('bia mộ') || cLower.includes('tombstoning'))) return i;
    if (labelLower.includes('qs') && cLower.includes('qs')) return i;
    if (labelLower.includes('st chênh') && cLower.includes('st chênh lên')) return i;
    if (labelLower.includes('nghỉ bù') && cLower.includes('nghỉ bù')) return i;
    if (labelLower.includes('pr') && cLower.includes('pr')) return i;
    if ((labelLower.includes('rớt') || labelLower.includes('không dẫn')) &&
        (cLower.includes('rớt') || cLower.includes('block'))) return i;
    if (labelLower.includes('lều') && (cLower.includes('lều') || cLower.includes('sóng t'))) return i;
    if (labelLower.includes('r-r') && (cLower.includes('r-r') || cLower.includes('loạn nhịp') || cLower.includes('không đều'))) return i;
    if (labelLower.includes('răng cưa') && cLower.includes('răng cưa')) return i;
    if (labelLower.includes('sóng f') && (cLower.includes('sóng f') || cLower.includes('lăn tăn'))) return i;
    if (labelLower.includes('thoát thất') && cLower.includes('thoát thất')) return i;
    if (labelLower.includes('phân ly') && cLower.includes('phân ly')) return i;
    if (labelLower.includes('sóng p') && cLower.includes('sóng p')) return i;
    if (labelLower.includes('qrs') && cLower.includes('qrs')) return i;
  }
  return 0;
}

// 3. Chèn vào CSDL
const insertStmt = db.prepare(`
  INSERT OR REPLACE INTO ecg_diagnoses (
    id, name, name_en, category, severity, criteria_json, lead_manifestations_json, annotations_json, ecg_metrics_json, clinical_action, differential_diagnoses_json
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

db.transaction(() => {
  for (const item of diagnosesData) {
    const enrichedAnnotations = (item.annotations || []).map(a => ({
      ...a,
      criterionIndex: getAnnotationCriterionIndex(a, item.criteria)
    }));

    insertStmt.run(
      item.id,
      item.name,
      item.name_en,
      item.category,
      item.severity,
      JSON.stringify(item.criteria),
      JSON.stringify(item.lead_manifestations),
      JSON.stringify(enrichedAnnotations),
      JSON.stringify(item.ecg_metrics),
      item.clinical_action,
      JSON.stringify(item.differential_diagnoses)
    );
  }
})();

console.log(`✅ Đã nạp thành công ${diagnosesData.length} danh mục tiêu chuẩn chẩn đoán điện tim đồ KÈM HỆ THỐNG ÁNH XẠ VỊ TRÍ SÓNG vào SQLite!`);
db.close();
