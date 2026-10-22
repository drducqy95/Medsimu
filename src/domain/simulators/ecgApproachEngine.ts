/**
 * Systematic 7-Step ECG Interpretation Engine
 * Chuẩn hóa theo quy trình đọc điện tâm đồ lâm sàng 7 bước của Hội Tim Mạch Việt Nam (VNHA) & AHA/ACC
 */

import { EcgCalculatedMetrics } from "./ecgMetricsCalculator";

export interface EcgStepAnalysis {
  stepNumber: number;
  stepName: string;
  category: "technical" | "rate" | "rhythm" | "axis" | "p_pr" | "qrs_st_t" | "qt_conclusion";
  title: string;
  findings: string;
  isNormal: boolean;
  clinicalNote: string;
}

export interface EcgFull7StepReport {
  rhythmId: string;
  steps: EcgStepAnalysis[];
  primaryDiagnosis: string;
  keyDifferentials: string[];
}

export function evaluate7StepApproach(
  rhythmId: string,
  metrics: EcgCalculatedMetrics
): EcgFull7StepReport {
  const steps: EcgStepAnalysis[] = [];

  // =========================================================================
  // BƯỚC 1: KỸ THUẬT GHI & TEST ĐIỆN THẾ (CALIBRATION & TECHNICAL CHECKS)
  // =========================================================================
  steps.push({
    stepNumber: 1,
    stepName: "Kỹ Thuật Ghi & Test Điện Thế",
    category: "technical",
    title: "Tốc độ giấy 25 mm/s • Biên độ 10 mm/mV • Chuyển đạo aVR",
    findings: "Tốc độ quét 25 mm/s (1 ô nhỏ = 0.04s, 1 ô lớn = 0.20s). Biên độ chuẩn 10 mm/mV (1 ô nhỏ = 0.1 mV). Chuyển đạo aVR âm xác nhận mắc đúng điện cực ngoại biên.",
    isNormal: true,
    clinicalNote: "Luôn kiểm tra test điện thế 1mV = 10mm trước khi đo biên độ sóng. Nếu aVR dương: Cảnh báo mắc ngược dây tay phải và tay trái hoặc đảo ngược phủ tạng.",
  });

  // =========================================================================
  // BƯỚC 2: TẦN SỐ TIM (HEART RATE CALCULATION)
  // =========================================================================
  const hr = metrics.heartRate;
  let hrStatus = "Bình thường (60 - 100 bpm)";
  let hrIsNormal = true;
  let hrNote = "Tần số tim bình thường lúc nghỉ.";

  if (hr === 0) {
    hrStatus = "0 bpm (Ngừng tim / Vô tâm thu / Rung thất)";
    hrIsNormal = false;
    hrNote = "TỐI KHẨN: Bệnh nhân mất mạch, ngừng tuần hoàn!";
  } else if (hr < 60) {
    hrStatus = `Nhịp chậm (${hr} bpm < 60 bpm)`;
    hrIsNormal = false;
    hrNote = "Nhịp chậm: Cần đánh giá triệu chứng choáng váng, tụt huyết áp và rà soát các thuốc ức chế nút xoang/nút AV.";
  } else if (hr > 100) {
    hrStatus = `Nhịp nhanh (${hr} bpm > 100 bpm)`;
    hrIsNormal = false;
    hrNote = "Nhịp nhanh: Tìm nguyên nhân sốt, đau, thiếu dịch, thiếu máu, cường giáp hoặc các rối loạn nhịp kịch phát.";
  }

  steps.push({
    stepNumber: 2,
    stepName: "Tần Số Tim",
    category: "rate",
    title: `Tần số thất: ${hr} chu kỳ/phút`,
    findings: `Đo khoảng cách R-R: Tần số tim tính toán = ${hr} bpm. Phân loại: ${hrStatus}.`,
    isNormal: hrIsNormal,
    clinicalNote: hrNote,
  });

  // =========================================================================
  // BƯỚC 3: NHỊP TIM & TÍNH ĐỀU ĐẶN (RHYTHM & REGULARITY)
  // =========================================================================
  let rhythmFindings = "Nhịp xoang đều đặn, khoảng R-R không đổi.";
  let rhythmIsNormal = true;
  let rhythmNote = "Xung động chủ nhịp bắt nguồn từ nút xoang (SA node).";

  if (rhythmId === "atrial_fibrillation") {
    rhythmFindings = "Mất sóng P xoang, thay bằng sóng lăn tăn f (400-600 cpm). Khoảng cách R-R hoàn toàn không đều (loạn nhịp hoàn toàn).";
    rhythmIsNormal = false;
    rhythmNote = "Rung nhĩ: Nguy cơ cao hình thành huyết khối tiểu nhĩ trái gây thuyên tắc mạch não (đột quỵ). Cần tính thang điểm CHA2DS2-VASc.";
  } else if (rhythmId === "atrial_flutter") {
    rhythmFindings = "Sóng F răng cưa điển hình tần số 300 cpm ở DII, DIII, aVF. Tỉ lệ dẫn truyền 2:1 tạo tần số thất đều 150 bpm.";
    rhythmIsNormal = false;
    rhythmNote = "Cuồng nhĩ: Nhịp đều tăm tắp 150 bpm do vòng vào lại eo van ba lá CTI.";
  } else if (rhythmId === "svt") {
    rhythmFindings = "Nhịp nhanh kịch phát trên thất đều tăm tắp 160-220 bpm, không thấy sóng P xoang (bị vùi trong QRS).";
    rhythmIsNormal = false;
    rhythmNote = "SVT: Thường do vòng vào lại nút AV (AVNRT). Cắt cơn bằng Valsalva hoặc Adenosine.";
  } else if (rhythmId === "pvc_frequent") {
    rhythmFindings = "Nhịp không đều dạng nhịp ba (Trigeminy): Cứ 2 nhát xoang đi kèm 1 nhát ngoại tâm thu thất đến sớm có khoảng nghỉ bù hoàn toàn.";
    rhythmIsNormal = false;
    rhythmNote = "Ngoại tâm thu thất dày: Cần kiểm tra điện giải đồ (K+, Mg2+) và loại trừ thiếu máu cơ tim.";
  } else if (rhythmId === "ventricular_tachycardia") {
    rhythmFindings = "Cơn nhịp nhanh thất đơn dạng (VT) rất nhanh đều đặn 140-220 bpm, QRS dãn rộng dị dạng.";
    rhythmIsNormal = false;
    rhythmNote = "NGUY CƠ ĐỘT TỬ: Đánh giá ngay có mạch hay mất mạch để sốc điện!";
  } else if (rhythmId === "torsades_de_pointes") {
    rhythmFindings = "Xoắn đỉnh: Nhanh thất đa dạng 200-250 bpm, đỉnh phức bộ QRS liên tục thay đổi cực tính xoay quanh đường đẳng điện.";
    rhythmIsNormal = false;
    rhythmNote = "TỐI CẤP CỨU: Tiêm Magnesi Sulfat 2g TM ngay lập tức!";
  } else if (rhythmId === "ventricular_fibrillation") {
    rhythmFindings = "Rung thất: Mất hoàn toàn cấu trúc chu kỳ P-QRS-T, các dao động sóng hỗn loạn vô tổ chức.";
    rhythmIsNormal = false;
    rhythmNote = "NGỪNG TUẦN HOÀN TỬ VONG: Ép tim CPR + Phá rung 200J ngay!";
  } else if (rhythmId === "asystole") {
    rhythmFindings = "Vô tâm thu: Đường đẳng điện phẳng lì, hoàn toàn không có xung động cơ tim.";
    rhythmIsNormal = false;
    rhythmNote = "NGỪNG TUẦN HOÀN: Ép tim CPR + Adrenaline 1mg tiêm TM (TUYỆT ĐỐI KHÔNG SỐC ĐIỆN).";
  }

  steps.push({
    stepNumber: 3,
    stepName: "Nhịp Tim & Tính Đều Đặn",
    category: "rhythm",
    title: `Nhịp: ${rhythmIsNormal ? "Nhịp Xoang Đều" : "Rối Loạn Nhịp"}`,
    findings: rhythmFindings,
    isNormal: rhythmIsNormal,
    clinicalNote: rhythmNote,
  });

  // =========================================================================
  // BƯỚC 4: TRỤC ĐIỆN TIM (CARDIAC AXIS)
  // =========================================================================
  const axis = metrics.qrsAxisDeg;
  let axisName = "Trục trung gian bình thường (0° đến +90°)";
  let axisIsNormal = true;
  let axisNote = "Khử cực tâm thất cân đối giữa hai thất.";

  if (axis < -30) {
    axisName = `Trục lệch trái mạnh (${axis}°)`;
    axisIsNormal = false;
    axisNote = "Trục lệch trái: Nghĩ đến Block phân nhánh trái trước (LAFB), phì đại thất trái nặng (LVH) hoặc sẹo NMCT thành dưới cũ.";
  } else if (axis > 90 && axis <= 180) {
    axisName = `Trục lệch phải (${axis}°)`;
    axisIsNormal = false;
    axisNote = "Trục lệch phải: Gặp trong Block nhánh phải (RBBB), phì đại thất phải (RVH), hoặc Thuyên tắc phổi cấp tính (S1Q3T3).";
  } else if (axis < -90 || axis > 180) {
    axisName = `Trục vô định (Northwest Axis ${axis}°)`;
    axisIsNormal = false;
    axisNote = "Trục vô định cực đoan: Dấu hiệu rất mạnh chỉ điểm Cơn nhanh thất (VT) hoặc tăng Kali máu nặng.";
  }

  steps.push({
    stepNumber: 4,
    stepName: "Trục Điện Tim",
    category: "axis",
    title: `Góc trục QRS: ${axis}° (${axisName})`,
    findings: `Đo tổng đại số QRS ở DI và aVF: Trục điện tim hướng ${axis}°. Phân loại: ${axisName}.`,
    isNormal: axisIsNormal,
    clinicalNote: axisNote,
  });

  // =========================================================================
  // BƯỚC 5: SÓNG P & KHOẢNG PR (ATRIAL & AV CONDUCTION)
  // =========================================================================
  const pr = metrics.prIntervalMs;
  let pPrFindings = `Sóng P xoang bình thường. Khoảng PR = ${pr} ms (bình thường 120 - 200 ms / 3 - 5 ô nhỏ).`;
  let pPrIsNormal = true;
  let pPrNote = "Dẫn truyền từ tâm nhĩ qua nút nhĩ thất xuống tâm thất bình thường.";

  if (rhythmId === "av_block_first_degree") {
    pPrFindings = `Khoảng PR kéo dài cố định = ${pr} ms (> 200 ms). Tỉ lệ P:QRS là 1:1.`;
    pPrIsNormal = false;
    pPrNote = "Block AV độ I: Chậm dẫn truyền qua nút AV. Thường lành tính, rà soát thuốc chẹn beta, digoxin.";
  } else if (rhythmId === "av_block_mobitz_1") {
    pPrFindings = "Chu kỳ Wenckebach: Khoảng PR dài dần ra qua từng nhát bóp liên tiếp (160ms -> 240ms -> 320ms) cho đến khi rớt 1 phức bộ QRS.";
    pPrIsNormal = false;
    pPrNote = "Block AV độ II Mobitz I: Tổn thương trong nút AV, tiên lượng tốt hơn Mobitz II.";
  } else if (rhythmId === "av_block_mobitz_2") {
    pPrFindings = "Khoảng PR cố định nhưng đột ngột rớt một phức bộ QRS sau sóng P (dẫn truyền 3:2 hoặc 2:1).";
    pPrIsNormal = false;
    pPrNote = "NGUY HIỂM: Tổn thương dưới nút AV / Bó His. Cần đặt máy tạo nhịp phòng ngừa vô tâm thu!";
  } else if (rhythmId === "av_block_third_degree") {
    pPrFindings = "Phân ly nhĩ - thất hoàn toàn (CHB): Sóng P xoang đều đặn độc lập (75 bpm) và phức bộ QRS thoát thất chậm đều đặn (35 bpm). Khoảng PR biến thiên liên tục.";
    pPrIsNormal = false;
    pPrNote = "TỐI CẤP CỨU: Đặt máy tạo nhịp tạm thời khẩn cấp!";
  } else if (rhythmId === "wpw_syndrome") {
    pPrFindings = `Khoảng PR rất ngắn = ${pr} ms (< 120 ms). Sườn lên QRS có sóng Delta thoai thoải.`;
    pPrIsNormal = false;
    pPrNote = "Hội chứng kích thích sớm WPW: Xung động đi tắt qua cầu Kent vào thất sớm trước khi qua nút AV.";
  } else if (rhythmId === "acute_pericarditis") {
    pPrFindings = "Đoạn PR chênh xuống lan tỏa ở DII, DIII, aVF, V2-V6; PR chênh lên ở aVR.";
    pPrIsNormal = false;
    pPrNote = "Dấu hiệu viêm màng ngoài tim lá tạng lan đến thành tâm nhĩ.";
  }

  steps.push({
    stepNumber: 5,
    stepName: "Sóng P & Khoảng PR",
    category: "p_pr",
    title: `PR: ${pr > 0 ? `${pr} ms` : "Không đo được"}`,
    findings: pPrFindings,
    isNormal: pPrIsNormal,
    clinicalNote: pPrNote,
  });

  // =========================================================================
  // BƯỚC 6: PHỨC BỘ QRS, ĐOẠN ST & SÓNG T (VENTRICULAR COMPLEX & REPOLARIZATION)
  // =========================================================================
  const qrs = metrics.qrsDurationMs;
  let qrsFindings = `QRS hẹp = ${qrs} ms (< 120 ms). ST đẳng điện, sóng T dương bình thường.`;
  let qrsIsNormal = true;
  let qrsNote = "Khử cực và tái cực tâm thất bình thường.";

  if (rhythmId.startsWith("stemi")) {
    qrsFindings = `ST CHÊNH LÊN DẠNG VÒM BỆNH LÝ BIA MỘ (Tombstone). Có sóng Q hoại tử và ST chênh xuống soi gương.`;
    qrsIsNormal = false;
    qrsNote = "BÁO ĐỘNG ĐỎ NHỒI MÁU CƠ TIM CẤP (STEMI): Kích hoạt Cath Lab can thiệp PCI thì đầu trong vòng 90 phút!";
  } else if (rhythmId === "nemi_subendocardial") {
    qrsFindings = "ST chênh xuống đi ngang hoặc dốc xuống ≥ 1mm ở nhiều chuyển đạo; ST chênh lên ở aVR.";
    qrsIsNormal = false;
    qrsNote = "Thiếu máu cơ tim dưới nội tâm mạc lan tỏa hoặc tổn thương Thân Chung ĐM Vành Trái (LMCA).";
  } else if (rhythmId === "rbbb") {
    qrsFindings = `QRS dãn rộng = ${qrs} ms (≥ 120 ms). Dạng tai thỏ rsR' ở V1-V2; sóng S rộng sâu ở DI, V6.`;
    qrsIsNormal = false;
    qrsNote = "Block nhánh phải hoàn toàn (RBBB).";
  } else if (rhythmId === "lbbb") {
    qrsFindings = `QRS dãn rộng = ${qrs} ms (≥ 120 ms). Sóng R rộng có khía ở DI, aVL, V5-V6; dạng QS sâu ở V1-V2. Mất sóng Q vách.`;
    qrsIsNormal = false;
    qrsNote = "Block nhánh trái hoàn toàn (LBBB). Áp dụng tiêu chuẩn Sgarbossa để không bỏ sót nhồi máu cơ tim.";
  } else if (rhythmId === "hyperkalemia") {
    qrsFindings = `QRS dãn rộng = ${qrs} ms. SÓNG T CAO NHỌN ĐỐI XỨNG HÌNH LỀU (Tent-like T wave).`;
    qrsIsNormal = false;
    qrsNote = "Tăng Kali máu nặng: Tiêm Canxi Gluconat 10% TM ngay lập tức để ổn định màng tim!";
  } else if (rhythmId === "hypokalemia") {
    qrsFindings = "Sóng T dẹt, ST chênh xuống nhẹ, SÓNG U NỔI BẬT > 1mm ở V2-V4 (khoảng QU kéo dài).";
    qrsIsNormal = false;
    qrsNote = "Hạ Kali máu: Bù Kali qua đường truyền TM kiểm soát tốc độ + bù Magnesi đồng thời.";
  } else if (rhythmId === "digoxin_toxicity") {
    qrsFindings = "Đoạn ST chênh xuống cong lõm hình đáy chén / muỗng (Salvador Dali moustache). QT ngắn.";
    qrsIsNormal = false;
    qrsNote = "Nhiễm độc Digitalis: Ngưng thuốc, dùng DigiFab. CẤM TIÊM CANXI.";
  } else if (rhythmId === "brugada_type1") {
    qrsFindings = "ST chênh lên dạng vòm dốc xuống (coved-type) ≥ 2mm ở V1-V2 tiếp nối trực tiếp với sóng T âm sâu.";
    qrsIsNormal = false;
    qrsNote = "Hội chứng Brugada Type 1: Nguy cơ đột tử khi ngủ. Cần hạ sốt tích cực và chỉ định cấy ICD.";
  } else if (rhythmId === "pulmonary_embolism") {
    qrsFindings = "Tam chứng McGinn-White S1Q3T3: Sóng S sâu ở DI, sóng Q và T âm ở DIII; T âm V1-V4.";
    qrsIsNormal = false;
    qrsNote = "Thuyên tắc phổi cấp: Xem xét tiêu sợi huyết nếu tụt HA, dùng Heparin nếu ổn định.";
  } else if (rhythmId === "lvh_strain") {
    qrsFindings = "Sokolow-Lyon > 35mm (SV1 + RV5/V6). Đoạn ST chênh xuống và T âm không đối xứng dạng Strain ở V5-V6.";
    qrsIsNormal = false;
    qrsNote = "Phì đại thất trái tăng gánh tâm thu do tăng huyết áp mạn tính.";
  }

  steps.push({
    stepNumber: 6,
    stepName: "Phức Bộ QRS, Đoạn ST & Sóng T",
    category: "qrs_st_t",
    title: `QRS: ${qrs} ms • Biến đổi ST-T`,
    findings: qrsFindings,
    isNormal: qrsIsNormal,
    clinicalNote: qrsNote,
  });

  // =========================================================================
  // BƯỚC 7: KHOẢNG QT/QTC & KẾT LUẬN TOÀN DIỆN (QT INTERVAL & CONCLUSION)
  // =========================================================================
  const qt = metrics.qtIntervalMs;
  const qtc = metrics.qtcIntervalMs;
  let qtStatus = `QT = ${qt} ms, QTc (Bazett) = ${qtc} ms (Bình thường < 440ms nam, < 460ms nữ).`;
  let qtIsNormal = true;
  let qtNote = "Thời gian tái cực tâm thất trong giới hạn an toàn.";

  if (qtc > 480) {
    qtStatus = `QTc kéo dài nguy hiểm = ${qtc} ms (> 480 ms).`;
    qtIsNormal = false;
    qtNote = "CẢNH BÁO: Khoảng QT kéo dài làm tăng vọt nguy cơ xảy ra hiện tượng R-on-T kích phát Cơn Xoắn Đỉnh (TdP) và Rung thất tử vong.";
  } else if (qtc > 0 && qtc < 340) {
    qtStatus = `QTc ngắn = ${qtc} ms (< 340 ms).`;
    qtIsNormal = false;
    qtNote = "Khoảng QT ngắn: Gặp trong ngộ độc Digoxin hoặc tăng Canxi máu.";
  }

  steps.push({
    stepNumber: 7,
    stepName: "Khoảng QT/QTc & Kết Luận Lâm Sàng",
    category: "qt_conclusion",
    title: `QTc: ${qtc} ms • Kết Luận Chẩn Đoán`,
    findings: `${qtStatus} Kết luận chẩn đoán: ${metrics.interpretationLines[0] || "Điện tâm đồ bình thường"}.`,
    isNormal: qtIsNormal && metrics.severity === "normal",
    clinicalNote: metrics.interpretationLines[metrics.interpretationLines.length - 1] || qtNote,
  });

  return {
    rhythmId,
    steps,
    primaryDiagnosis: metrics.interpretationLines[0] || "Nhịp xoang bình thường",
    keyDifferentials: metrics.interpretationLines.slice(1),
  };
}
