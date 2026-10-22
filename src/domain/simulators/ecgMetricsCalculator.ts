import { EcgRhythmType } from "@/domain/simulators/ecgWaveforms";

export interface EcgCalculatedMetrics {
  heartRate: number;
  prIntervalMs: number;
  qrsDurationMs: number;
  qtIntervalMs: number;
  qtcIntervalMs: number; // Bazett formula
  pAxisDeg: number;
  qrsAxisDeg: number;
  tAxisDeg: number;
  interpretationLines: string[];
  severity: "normal" | "borderline" | "abnormal" | "critical";
}

export function calculateBazettQTc(qtMs: number, hr: number): number {
  if (hr <= 0) return 0;
  const rrSeconds = 60 / hr;
  return Math.round(qtMs / Math.sqrt(rrSeconds));
}

export function computeEcgMetrics(
  rhythm: EcgRhythmType | string,
  customBpm?: number
): EcgCalculatedMetrics {
  let hr = customBpm || 75;
  let pr = 156;
  let qrs = 86;
  let qt = 380;
  let pAxis = 48;
  let qrsAxis = 58;
  let tAxis = 42;
  let lines: string[] = ["Nhịp xoang đều, dẫn truyền nhĩ - thất bình thường"];
  let severity: EcgCalculatedMetrics["severity"] = "normal";

  switch (rhythm as string) {
    case "normal_sinus":
      hr = customBpm || 72;
      pr = 152;
      qrs = 84;
      qt = 384;
      lines = ["Nhịp xoang đều", "Đoạn ST đẳng điện, không có biến đổi bệnh lý sóng T", "Điện tâm đồ trong giới hạn bình thường"];
      severity = "normal";
      break;

    case "sinus_bradycardia":
      hr = customBpm || 48;
      pr = 175;
      qrs = 88;
      qt = 440;
      lines = ["Nhịp chậm xoang (Sinus Bradycardia)", "Các sóng P-QRS-T hình dạng bình thường"];
      severity = "borderline";
      break;

    case "sinus_tachycardia":
      hr = customBpm || 128;
      pr = 138;
      qrs = 82;
      qt = 310;
      lines = ["Nhịp nhanh xoang (Sinus Tachycardia)", "Đoạn ST dốc nhẹ do nhịp nhanh, không thiếu máu cơ tim"];
      severity = "borderline";
      break;

    case "stemi_anterior":
      hr = customBpm || 88;
      pr = 160;
      qrs = 104;
      qt = 410;
      qrsAxis = -15;
      lines = [
        "Nhịp xoang, tần số 88 l/p",
        "ST chênh lên dạng vòm (Tombstoning) >3.5mm ở V1, V2, V3, V4",
        "ST chênh xuống soi gương ở DII, DIII, aVF",
        "KẾT LUẬN: NHỒI MÁU CƠ TIM CẤP CÓ ST CHÊNH LÊN THÀNH TRƯỚC (ACUTE ANTERIOR STEMI) - BÁO ĐỘNG ĐỎ CATH LAB!",
      ];
      severity = "critical";
      break;

    case "stemi_inferior":
      hr = customBpm || 56;
      pr = 188;
      qrs = 92;
      qt = 420;
      qrsAxis = 105;
      lines = [
        "Nhịp chậm xoang 56 l/p",
        "ST chênh lên dạng vòm >2.5mm ở DII, DIII, aVF",
        "ST chênh xuống soi gương ở DI, aVL",
        "KẾT LUẬN: NHỒI MÁU CƠ TIM CẤP THÀNH DƯỚI (ACUTE INFERIOR STEMI) - CẦN ĐO THÊM V3R, V4R TÌM NHỒI MÁU THẤT PHẢI!",
      ];
      severity = "critical";
      break;

    case "atrial_fibrillation":
      hr = customBpm || 118;
      pr = 0; // Mất sóng P
      qrs = 90;
      qt = 340;
      lines = [
        "Rung nhĩ đáp ứng thất nhanh (Atrial Fibrillation with RVR)",
        "Mất hoàn toàn sóng P, thay bằng sóng f lăn tăn",
        "Khoảng R-R hoàn toàn không đều",
      ];
      severity = "abnormal";
      break;

    case "ventricular_tachycardia":
      hr = customBpm || 185;
      pr = 0;
      qrs = 160;
      qt = 480;
      qrsAxis = -120;
      lines = [
        "Cơn Nhanh Thất Đơn Dạng (Monomorphic Ventricular Tachycardia)",
        "Phức bộ QRS dãn rộng >140ms, nhịp tim đều rất nhanh",
        "BÁO ĐỘNG ĐỎ: ĐÁNH GIÁ NGAY HUYẾT ĐỘNG ĐỂ SỐC ĐIỆN ĐỒNG BỘ HOẶC DÙNG AMIODARONE!",
      ];
      severity = "critical";
      break;

    case "ventricular_fibrillation":
      hr = 0;
      pr = 0;
      qrs = 0;
      qt = 0;
      lines = [
        "RUNG THẤT (VENTRICULAR FIBRILLATION - VFIB)",
        "Mất hoàn toàn phức bộ P-QRS-T, các dao động sóng thô không đều",
        "CẤP CỨU NGỪNG TUẦN HOÀN: KHỞI ĐỘNG SỐC ĐIỆN PHÁ RUNG 200J BIFASIC + ÉP TIM CPR NGAY!",
      ];
      severity = "critical";
      break;

    case "asystole":
      hr = 0;
      pr = 0;
      qrs = 0;
      qt = 0;
      lines = [
        "VÔ TÂM THU (ASYSTOLE / FLATLINE)",
        "Đường đẳng điện hoàn toàn, không có hoạt động điện học cơ tim",
        "TIẾN HÀNH CPR + ADRENALIN 1MG TIÊM TM MỖI 3-5 PHÚT (KHÔNG SỐC ĐIỆN)",
      ];
      severity = "critical";
      break;

    case "hyperkalemia":
      hr = customBpm || 62;
      pr = 210;
      qrs = 125;
      qt = 390;
      lines = [
        "Tăng Kali máu nặng (Severe Hyperkalemia)",
        "Sóng T cao nhọn đối xứng đáy hẹp ở V2-V5",
        "Khoảng PR kéo dài, phức bộ QRS dãn rộng dọa ngừng tim dạng sóng sin",
      ];
      severity = "critical";
      break;

    case "stemi_lateral":
      hr = customBpm || 85;
      pr = 165;
      qrs = 92;
      qt = 410;
      qrsAxis = -30;
      lines = [
        "Nhồi máu cơ tim cấp thành bên (Lateral STEMI)",
        "ST chênh lên ở DI, aVL, V5, V6",
        "ST chênh xuống soi gương ở DIII, aVF",
      ];
      severity = "critical";
      break;

    case "stemi_posterior":
      hr = customBpm || 76;
      pr = 170;
      qrs = 95;
      qt = 415;
      lines = [
        "Nhồi máu cơ tim cấp thành sau thực thụ (Posterior STEMI)",
        "ST chênh xuống đi ngang ở V1-V3 với sóng R cao vượt trội (R/S > 1) và T dương nhọn",
        "Chỉ định đo ngay chuyển đạo lưng V7, V8, V9",
      ];
      severity = "critical";
      break;

    case "nemi_subendocardial":
      hr = customBpm || 92;
      pr = 160;
      qrs = 90;
      qt = 420;
      lines = [
        "Thiếu máu dưới nội tâm mạc lan tỏa / NSTEMI",
        "ST chênh xuống đi ngang ≥ 1mm ở nhiều chuyển đạo",
        "ST chênh lên ở aVR cảnh báo tắc thân chung LMCA hoặc 3 thân mạch vành",
      ];
      severity = "critical";
      break;

    case "rbbb":
      hr = customBpm || 75;
      pr = 165;
      qrs = 135;
      qt = 410;
      qrsAxis = 100;
      lines = [
        "Block nhánh phải hoàn toàn (Complete RBBB)",
        "QRS dãn rộng ≥ 120ms, dạng tai thỏ rsR' ở V1-V2",
        "Sóng S rộng sâu ở DI, aVL, V6",
      ];
      severity = "abnormal";
      break;

    case "lbbb":
      hr = customBpm || 82;
      pr = 175;
      qrs = 145;
      qt = 460;
      qrsAxis = -30;
      lines = [
        "Block nhánh trái hoàn toàn (Complete LBBB)",
        "QRS dãn rộng ≥ 120ms, R rộng có khía ở DI, aVL, V5-V6, mất Q vách",
        "Áp dụng tiêu chuẩn Sgarbossa chẩn đoán nhồi máu cơ tim đi kèm",
      ];
      severity = "critical";
      break;

    case "lafb":
      hr = customBpm || 72;
      pr = 160;
      qrs = 98;
      qt = 395;
      qrsAxis = -60;
      lines = [
        "Block phân nhánh trái trước (LAFB)",
        "Trục lệch trái mạnh (-45° đến -90°)",
        "Dạng qR ở DI, aVL; dạng rS ở DII, DIII, aVF",
      ];
      severity = "abnormal";
      break;

    case "wpw_syndrome":
      hr = customBpm || 80;
      pr = 95; // Short PR
      qrs = 132;
      qt = 405;
      lines = [
        "Hội chứng Wolff-Parkinson-White (WPW Pre-excitation)",
        "Khoảng PR ngắn < 120ms, sóng Delta thoai thoải, QRS dãn rộng",
        "Cảnh giác nguy cơ Rung nhĩ dẫn truyền qua đường phụ",
      ];
      severity = "critical";
      break;

    case "torsades_de_pointes":
      hr = customBpm || 220;
      pr = 0;
      qrs = 170;
      qt = 550;
      lines = [
        "Cơn Xoắn Đỉnh (Torsades de Pointes - TdP)",
        "Nhanh thất đa dạng trên nền QT dài, QRS xoắn quanh trục đẳng điện",
        "CẤP CỨU KHẨN CẤP: TIÊM MAGNESI SULFAT 2G TM + SỐC ĐIỆN NẾU MẤT MẠCH",
      ];
      severity = "critical";
      break;

    case "lvh_strain":
      hr = customBpm || 76;
      pr = 175;
      qrs = 105;
      qt = 445;
      qrsAxis = -20;
      lines = [
        "Phì đại thất trái tăng gánh (LVH with Strain pattern)",
        "Tiêu chuẩn Sokolow-Lyon > 35mm (SV1 + RV5/V6)",
        "ST chênh xuống và sóng T âm không đối xứng ở V5, V6, DI, aVL",
      ];
      severity = "abnormal";
      break;

    case "brugada_type1":
      hr = customBpm || 74;
      pr = 170;
      qrs = 105;
      qt = 400;
      lines = [
        "Hội chứng Brugada Type 1 (Coved-type)",
        "ST chênh lên dạng vòm dốc xuống ≥ 2mm ở V1-V2 tiếp nối sóng T âm sâu",
        "NGUY CƠ ĐỘT TỬ DO TIM KHI NGỦ - HẠ SỐT KHẨN & CHỈ ĐỊNH CẤY ICD",
      ];
      severity = "critical";
      break;

    case "pulmonary_embolism":
      hr = customBpm || 116;
      pr = 145;
      qrs = 100;
      qt = 330;
      qrsAxis = 110;
      lines = [
        "Thuyên tắc động mạch phổi cấp (Acute Pulmonary Embolism)",
        "Nhịp nhanh xoang, dấu hiệu S1Q3T3 McGinn-White kinh điển",
        "Sóng T âm đối xứng từ V1 đến V4 do quá tải áp lực thất phải cấp",
      ];
      severity = "critical";
      break;

    case "acute_pericarditis":
      hr = customBpm || 88;
      pr = 160;
      qrs = 88;
      qt = 375;
      lines = [
        "Viêm màng ngoài tim cấp (Acute Pericarditis)",
        "ST chênh lên dạng lõm lòng thuyền lan tỏa không có soi gương",
        "Đoạn PR chênh xuống lan tỏa, PR chênh lên ở aVR đặc hiệu",
      ];
      severity = "abnormal";
      break;

    case "hypokalemia":
      hr = customBpm || 90;
      pr = 180;
      qrs = 92;
      qt = 520; // QU interval
      lines = [
        "Hạ Kali máu nặng (Severe Hypokalemia K+ < 2.5)",
        "Sóng T dẹt, sóng U nổi rõ > 1mm ở V2-V4, khoảng QU giả kéo dài",
        "BÙ KALI TĨNH MẠCH CÓ KIỂM SOÁT TỐC ĐỘ + BÙ MAGNESI ĐỒNG THỜI",
      ];
      severity = "critical";
      break;

    case "digoxin_toxicity":
      hr = customBpm || 58;
      pr = 220;
      qrs = 95;
      qt = 320; // QT ngắn
      lines = [
        "Nhiễm độc Digitalis (Digoxin Toxicity)",
        "ST chênh xuống cong lõm hình đáy chén Salvador Dali, QT ngắn",
        "Ngoại tâm thu thất nhịp đôi (Bigeminy) - NGƯNG THUỐC, DÙNG DIGIFAB",
      ];
      severity = "critical";
      break;

    case "long_qt_syndrome":
      hr = customBpm || 68;
      pr = 158;
      qrs = 88;
      qt = 540;
      lines = [
        "Hội chứng QT kéo dài (Long QT Syndrome - LQTS)",
        "Nguy cơ cao kích phát ngoại tâm thu R-on-T gây Xoắn Đỉnh (Torsades de Pointes)",
      ];
      severity = "abnormal";
      break;

    default:
      hr = customBpm || 75;
      lines = ["Nhịp tim ổn định, không ghi nhận loạn nhịp ác tính"];
      severity = "normal";
      break;
  }

  const qtc = calculateBazettQTc(qt, hr);

  return {
    heartRate: hr,
    prIntervalMs: pr,
    qrsDurationMs: qrs,
    qtIntervalMs: qt,
    qtcIntervalMs: qtc,
    pAxisDeg: pAxis,
    qrsAxisDeg: qrsAxis,
    tAxisDeg: tAxis,
    interpretationLines: lines,
    severity,
  };
}
