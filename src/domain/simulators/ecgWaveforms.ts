export type EcgRhythmType =
  | "normal_sinus"
  | "sinus_tachycardia"
  | "sinus_bradycardia"
  | "stemi_inferior"
  | "stemi_anterior"
  | "stemi_lateral"
  | "stemi_posterior"
  | "nemi_subendocardial"
  | "av_block_first_degree"
  | "av_block_mobitz_1"
  | "av_block_mobitz_2"
  | "av_block_third_degree"
  | "rbbb"
  | "lbbb"
  | "lafb"
  | "atrial_fibrillation"
  | "atrial_flutter"
  | "svt"
  | "wpw_syndrome"
  | "pvc_frequent"
  | "ventricular_tachycardia"
  | "torsades_de_pointes"
  | "ventricular_fibrillation"
  | "asystole"
  | "lvh_strain"
  | "brugada_type1"
  | "pulmonary_embolism"
  | "acute_pericarditis"
  | "hyperkalemia"
  | "hypokalemia"
  | "digoxin_toxicity";

export interface EcgRhythmDefinition {
  id: EcgRhythmType;
  name: string;
  defaultBpm: number;
  allowedBpmRange?: { min: number; max: number; step?: number };
  category: "sinus" | "atrial" | "ventricular" | "conduction" | "ischemia_metabolic";
  systemId?: string;
  systemName?: string;
  anatomicalRegion?: string;
  description: string;
  ecgCharacteristics: {
    rate: string;
    rhythm: string;
    pWave: string;
    prInterval: string;
    qrsComplex: string;
    stSegmentTwave: string;
  };
  clinicalSignificance: string;
  treatmentSummary: string;
}

export const RHYTHM_TO_SYSTEM_MAP: Record<
  EcgRhythmType,
  { systemId: string; systemName: string; anatomicalRegion: string }
> = {
  normal_sinus: { systemId: "sinus_node", systemName: "Nút Xoang & Nhịp Cơ Bản", anatomicalRegion: "Nút xoang nhĩ (SA Node)" },
  sinus_tachycardia: { systemId: "sinus_node", systemName: "Nút Xoang & Nhịp Cơ Bản", anatomicalRegion: "Nút xoang nhĩ (SA Node)" },
  sinus_bradycardia: { systemId: "sinus_node", systemName: "Nút Xoang & Nhịp Cơ Bản", anatomicalRegion: "Nút xoang nhĩ (SA Node)" },
  stemi_inferior: { systemId: "acute_coronary", systemName: "Hội Chứng Mạch Vành Cấp", anatomicalRegion: "Thành dưới (ĐM Vành Phải RCA / Nhánh Mũ LCx)" },
  stemi_anterior: { systemId: "acute_coronary", systemName: "Hội Chứng Mạch Vành Cấp", anatomicalRegion: "Trước vách & Trước rộng (ĐM Liên Thất Trước LAD)" },
  stemi_lateral: { systemId: "acute_coronary", systemName: "Hội Chứng Mạch Vành Cấp", anatomicalRegion: "Thành bên cao & Bên thấp (ĐM Mũ LCx / Nhánh Chéo Diagonal)" },
  stemi_posterior: { systemId: "acute_coronary", systemName: "Hội Chứng Mạch Vành Cấp", anatomicalRegion: "Thành sau thực thụ (ĐM Liên Thất Sau PDA / RCA)" },
  nemi_subendocardial: { systemId: "acute_coronary", systemName: "Hội Chứng Mạch Vành Cấp", anatomicalRegion: "Dưới nội tâm mạc lan tỏa (Tổn thương thân chung LMCA / Đa nhánh)" },
  av_block_first_degree: { systemId: "conduction_blocks", systemName: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh", anatomicalRegion: "Nút nhĩ thất (AV Node)" },
  av_block_mobitz_1: { systemId: "conduction_blocks", systemName: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh", anatomicalRegion: "Nút nhĩ thất (AV Node - Chậm dần nội nút)" },
  av_block_mobitz_2: { systemId: "conduction_blocks", systemName: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh", anatomicalRegion: "Dưới nút AV (Bó His / Phân nhánh Purkinje)" },
  av_block_third_degree: { systemId: "conduction_blocks", systemName: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh", anatomicalRegion: "Nhĩ thất hoàn toàn (Nút AV / Thân bó His)" },
  rbbb: { systemId: "conduction_blocks", systemName: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh", anatomicalRegion: "Nhánh phải (Right Bundle Branch)" },
  lbbb: { systemId: "conduction_blocks", systemName: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh", anatomicalRegion: "Nhánh trái (Left Bundle Branch) - Che lấp sóng nhồi máu" },
  lafb: { systemId: "conduction_blocks", systemName: "Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh", anatomicalRegion: "Phân nhánh trái trước (Left Anterior Fascicle)" },
  atrial_fibrillation: { systemId: "supraventricular", systemName: "Loạn Nhịp Trên Thất & Kích Thích Sớm", anatomicalRegion: "Cơ tâm nhĩ / Quanh lỗ tĩnh mạch phổi" },
  atrial_flutter: { systemId: "supraventricular", systemName: "Loạn Nhịp Trên Thất & Kích Thích Sớm", anatomicalRegion: "Vòng vào lại eo van ba lá - tĩnh mạch chủ dưới (CTI)" },
  svt: { systemId: "supraventricular", systemName: "Loạn Nhịp Trên Thất & Kích Thích Sớm", anatomicalRegion: "Vòng vào lại nút AV (AVNRT) hoặc đường phụ (AVRT)" },
  wpw_syndrome: { systemId: "supraventricular", systemName: "Loạn Nhịp Trên Thất & Kích Thích Sớm", anatomicalRegion: "Đường dẫn truyền phụ nhĩ - thất (Cầu Kent)" },
  pvc_frequent: { systemId: "ventricular_arrest", systemName: "Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn", anatomicalRegion: "Cơ tâm thất / Đường ra thất phải RVOT" },
  ventricular_tachycardia: { systemId: "ventricular_arrest", systemName: "Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn", anatomicalRegion: "Cơ tâm thất / Vòng vào lại quanh sẹo nhồi máu cũ" },
  torsades_de_pointes: { systemId: "ventricular_arrest", systemName: "Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn", anatomicalRegion: "Cơ tâm thất kèm tái cực muộn (QT kéo dài)" },
  ventricular_fibrillation: { systemId: "ventricular_arrest", systemName: "Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn", anatomicalRegion: "Toàn bộ cơ tâm thất hỗn loạn" },
  asystole: { systemId: "ventricular_arrest", systemName: "Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn", anatomicalRegion: "Toàn bộ hệ thống điện tim ngừng trệ" },
  lvh_strain: { systemId: "chamber_hypertrophy", systemName: "Phì Đại Buồng Tim & Tăng Gánh", anatomicalRegion: "Thành cơ thất trái phì đại do tăng huyết áp / Hẹp van ĐMC" },
  brugada_type1: { systemId: "channelopathies", systemName: "Bệnh Lý Kênh Ion Di Truyền & Nguy Cơ Đột Tử", anatomicalRegion: "Kênh Natri SCN5A đường ra thất phải" },
  pulmonary_embolism: { systemId: "cardiopulmonary_pericardial", systemName: "Cấp Cứu Tim Phổi & Màng Ngoài Tim", anatomicalRegion: "Động mạch phổi chính & Thất phải cấp tính" },
  acute_pericarditis: { systemId: "cardiopulmonary_pericardial", systemName: "Cấp Cứu Tim Phổi & Màng Ngoài Tim", anatomicalRegion: "Màng ngoài tim lá tạng & lá thành lan tỏa" },
  hyperkalemia: { systemId: "metabolic_toxicology", systemName: "Rối Loạn Điện Giải & Nhiễm Độc Thuốc", anatomicalRegion: "Rối loạn điện thế màng toàn tim do Kali máu cao" },
  hypokalemia: { systemId: "metabolic_toxicology", systemName: "Rối Loạn Điện Giải & Nhiễm Độc Thuốc", anatomicalRegion: "Tái cực chậm trễ & tăng tính kích thích do Kali máu thấp" },
  digoxin_toxicity: { systemId: "metabolic_toxicology", systemName: "Rối Loạn Điện Giải & Nhiễm Độc Thuốc", anatomicalRegion: "Ức chế bơm Na+/K+ ATPase cơ tim do ngộ độc Glycoside tim" },
};

export const RHYTHM_ALLOWED_BPM_RANGE: Record<
  EcgRhythmType,
  { min: number; max: number; step?: number }
> = {
  normal_sinus: { min: 60, max: 100 },
  sinus_tachycardia: { min: 101, max: 160 },
  sinus_bradycardia: { min: 35, max: 59 },
  atrial_fibrillation: { min: 60, max: 180 },
  atrial_flutter: { min: 75, max: 150 },
  svt: { min: 140, max: 240 },
  pvc_frequent: { min: 55, max: 110 },
  ventricular_tachycardia: { min: 130, max: 220 },
  ventricular_fibrillation: { min: 0, max: 0 },
  asystole: { min: 0, max: 0 },
  av_block_first_degree: { min: 50, max: 100 },
  av_block_mobitz_1: { min: 40, max: 90 },
  av_block_mobitz_2: { min: 35, max: 75 },
  av_block_third_degree: { min: 25, max: 45 },
  stemi_inferior: { min: 50, max: 130 },
  stemi_anterior: { min: 60, max: 140 },
  hyperkalemia: { min: 40, max: 90 },
  stemi_lateral: { min: 60, max: 130 },
  stemi_posterior: { min: 50, max: 120 },
  nemi_subendocardial: { min: 60, max: 130 },
  rbbb: { min: 50, max: 110 },
  lbbb: { min: 50, max: 110 },
  lafb: { min: 50, max: 100 },
  wpw_syndrome: { min: 60, max: 200 },
  torsades_de_pointes: { min: 150, max: 250 },
  lvh_strain: { min: 50, max: 100 },
  brugada_type1: { min: 50, max: 100 },
  pulmonary_embolism: { min: 90, max: 140 },
  acute_pericarditis: { min: 70, max: 120 },
  hypokalemia: { min: 60, max: 110 },
  digoxin_toxicity: { min: 45, max: 85 },
};

export function getRhythmAllowedBpmRange(rhythmId: EcgRhythmType): {
  min: number;
  max: number;
  step: number;
} {
  const range = RHYTHM_ALLOWED_BPM_RANGE[rhythmId] || { min: 40, max: 160 };
  return {
    min: range.min,
    max: range.max,
    step: range.step || 1,
  };
}

export const ECG_RHYTHM_DEFINITIONS: EcgRhythmDefinition[] = [
  {
    id: "normal_sinus",
    name: "Nhịp Xoang Bình Thường (Normal Sinus)",
    defaultBpm: 75,
    category: "sinus",
    description: "Xung động phát sinh từ nút xoang (SA), dẫn truyền bình thường qua nhĩ và thất.",
    ecgCharacteristics: {
      rate: "60 - 100 lần/phút",
      rhythm: "Đều đặn",
      pWave: "Dương ở DI, DII, aVF; đi trước mỗi QRS",
      prInterval: "0.12 - 0.20 giây (3 - 5 ô nhỏ)",
      qrsComplex: "Hẹp < 0.12 giây (dưới 3 ô nhỏ)",
      stSegmentTwave: "ST đẳng điện, sóng T dương cùng chiều QRS",
    },
    clinicalSignificance: "Điện tâm đồ của người khỏe mạnh bình thường.",
    treatmentSummary: "Không cần xử trí.",
  },
  {
    id: "sinus_tachycardia",
    name: "Nhịp Nhanh Xoang (Sinus Tachycardia)",
    defaultBpm: 120,
    category: "sinus",
    description: "Nút xoang phát nhịp nhanh do kích thích giao cảm, sốt, mất máu, đau đớn hoặc thiếu oxy.",
    ecgCharacteristics: {
      rate: "101 - 160 lần/phút",
      rhythm: "Đều đặn",
      pWave: "Hình thái xoang bình thường",
      prInterval: "0.12 - 0.20 giây",
      qrsComplex: "Hẹp < 0.12 giây",
      stSegmentTwave: "Đẳng điện hoặc ST chênh xuống nhẹ do nhịp quá nhanh",
    },
    clinicalSignificance: "Thường là phản ứng thứ phát đối với một stress sinh lý (sốt, đau, sốc, thiếu máu, cường giáp).",
    treatmentSummary: "Điều trị nguyên nhân gốc rễ (hạ sốt, giảm đau, bù dịch trong sốc).",
  },
  {
    id: "sinus_bradycardia",
    name: "Nhịp Chậm Xoang (Sinus Bradycardia)",
    defaultBpm: 45,
    category: "sinus",
    description: "Nút xoang phát nhịp chậm do cường phế vị, thuốc (chẹn beta), hoặc suy nút xoang.",
    ecgCharacteristics: {
      rate: "< 60 lần/phút (thường 40 - 55)",
      rhythm: "Đều đặn",
      pWave: "Hình thái xoang bình thường",
      prInterval: "0.12 - 0.20 giây",
      qrsComplex: "Hẹp < 0.12 giây",
      stSegmentTwave: "Bình thường",
    },
    clinicalSignificance: "Có thể sinh lý ở vận động viên hoặc bệnh lý nếu kèm tụt huyết áp, chóng mặt, ngất.",
    treatmentSummary: "Nếu có triệu chứng tụt huyết áp: Tiêm tĩnh mạch Atropin 0.5 - 1mg, chuẩn bị tạo nhịp ngoài.",
  },
  {
    id: "atrial_fibrillation",
    name: "Rung Nhĩ (Atrial Fibrillation - AFib)",
    defaultBpm: 130,
    category: "atrial",
    description: "Nhiều ổ phát nhịp hỗn loạn trong tâm nhĩ (350-600 bpm), nút AV lọc bớt xung động xuống thất không đều.",
    ecgCharacteristics: {
      rate: "Thất thay đổi (đáp ứng thất nhanh 110-180 bpm)",
      rhythm: "Hoàn toàn không đều (khoảng R-R không theo quy luật)",
      pWave: "Mất hoàn toàn sóng P, thay bằng sóng lăn tăn f nhỏ vô tổ chức",
      prInterval: "Không đo được",
      qrsComplex: "Hẹp < 0.12 giây",
      stSegmentTwave: "ST có thể chênh xuống nhẹ",
    },
    clinicalSignificance: "Mất co bóp nhĩ làm giảm 20-30% cung lượng tim; ứ máu ở tiểu nhĩ trái tạo huyết khối gây đột quỵ não.",
    treatmentSummary: "Kiểm soát tần số thất (Chẹn Beta/Digoxin), chống đông dự phòng tắc mạch (NOAC/Warfarin).",
  },
  {
    id: "atrial_flutter",
    name: "Cuồng Nhĩ (Atrial Flutter)",
    defaultBpm: 150,
    category: "atrial",
    description: "Vòng vào lại lớn trong tâm nhĩ phát nhịp đều đặn 250 - 350 bpm, dẫn truyền qua nút AV theo tỷ lệ 2:1 hoặc 4:1.",
    ecgCharacteristics: {
      rate: "Tần số nhĩ 300 bpm; tần số thất 150 bpm (dẫn truyền 2:1)",
      rhythm: "Đều đặn",
      pWave: "Mất P, thay bằng sóng răng cưa F đều đặn rõ nhất ở DII, DIII, aVF",
      prInterval: "Không đo được",
      qrsComplex: "Hẹp < 0.12 giây",
      stSegmentTwave: "Nằm lẫn trong sóng răng cưa",
    },
    clinicalSignificance: "Gây hồi hộp đánh trống ngực, nguy cơ tắc mạch tương tự rung nhĩ.",
    treatmentSummary: "Sốc điện đồng bộ chuyển nhịp, triệt đốt qua ống thông (catheter ablation).",
  },
  {
    id: "svt",
    name: "Nhịp Nhanh Kịch Phát Trên Thất (SVT / PSVT)",
    defaultBpm: 185,
    category: "atrial",
    description: "Vòng vào lại tại nút nhĩ thất (AVNRT) hoặc đường phụ (AVRT) gây nhịp nhanh đột ngột 150 - 250 bpm.",
    ecgCharacteristics: {
      rate: "160 - 220 lần/phút",
      rhythm: "Rất đều đặn",
      pWave: "Thường ẩn vào trong QRS hoặc sóng T",
      prInterval: "Không xác định",
      qrsComplex: "Hẹp < 0.12 giây",
      stSegmentTwave: "ST chênh xuống nhẹ do thiếu máu dưới nội tâm mạc thoáng qua",
    },
    clinicalSignificance: "Bệnh nhân đột ngột cảm giác tim đập như nhảy khỏi lồng ngực, chóng mặt, tụt huyết áp nhẹ.",
    treatmentSummary: "Nghiệm pháp Valsalva xoa xoang cảnh -> Tiêm tĩnh mạch nhanh Adenosine 6mg -> Sốc điện nếu huyết động không ổn.",
  },
  {
    id: "pvc_frequent",
    name: "Ngoại Tâm Thu Thất (PVC / Extrasystole)",
    defaultBpm: 80,
    category: "ventricular",
    description: "Ổ ngoại vị ở tâm thất phát xung sớm trước nhịp xoang kế tiếp, QRS giãn rộng dị dạng.",
    ecgCharacteristics: {
      rate: "Phụ thuộc nhịp nền",
      rhythm: "Không đều do các nhát bóp sớm",
      pWave: "Không có sóng P đi trước nhát PVC",
      prInterval: "Không có",
      qrsComplex: "Dãn rộng > 0.12 giây, hình thái dị dạng quái đản",
      stSegmentTwave: "Đoạn ST và sóng T đảo chiều ngược hướng QRS; có khoảng nghỉ bù hoàn toàn",
    },
    clinicalSignificance: "Cảm giác tim bị 'hẫng' một nhịp. Nếu xuất hiện dày đặc hoặc dạng chùm cảnh báo nguy cơ nhịp nhanh thất.",
    treatmentSummary: "Tránh cà phê, stress. Dùng chẹn Beta nếu có triệu chứng nhiều.",
  },
  {
    id: "ventricular_tachycardia",
    name: "Nhanh Thất (Ventricular Tachycardia - VTach)",
    defaultBpm: 170,
    category: "ventricular",
    description: "Loạn nhịp thất nguy hiểm đe dọa tính mạng xuất phát từ cơ tâm thất, có thể dẫn tới rung thất và ngừng tim.",
    ecgCharacteristics: {
      rate: "140 - 220 lần/phút",
      rhythm: "Đều đặn",
      pWave: "Phân ly nhĩ thất (sóng P đập độc lập nếu nhìn thấy)",
      prInterval: "Không có",
      qrsComplex: "Rất rộng > 0.14 giây, hình thái một dạng đồng nhất",
      stSegmentTwave: "ST và T ngược chiều QRS",
    },
    clinicalSignificance: "Cấp cứu tối khẩn! Bệnh nhân thường tụt huyết áp nặng, ngất hoặc ngừng tuần hoàn.",
    treatmentSummary: "VT mất mạch: Sốc điện khử rung không đồng bộ ngay lập tức! VT có mạch ổn định: Truyền Amiodaron 150mg.",
  },
  {
    id: "ventricular_fibrillation",
    name: "Rung Thất (Ventricular Fibrillation - VFib)",
    defaultBpm: 0,
    category: "ventricular",
    description: "Tâm thất rung hỗn loạn vô tổ chức, hoàn toàn không có thể tích nhát bóp, ngừng tuần hoàn thực sự.",
    ecgCharacteristics: {
      rate: "Không đếm được (vô số dao động)",
      rhythm: "Hoàn toàn hỗn loạn, vô định hình",
      pWave: "Không có",
      prInterval: "Không có",
      qrsComplex: "Mất hoàn toàn phức bộ QRS, chỉ còn các đường sóng nhấp nhô thô hoặc mịn",
      stSegmentTwave: "Không phân biệt được",
    },
    clinicalSignificance: "BỆNH NHÂN NGỪNG TIM TỬ VONG TRONG VÒNG 3-5 PHÚT NẾU KHÔNG ĐƯỢC PHÁ RUNG!",
    treatmentSummary: "SỐC ĐIỆN KHỬ RUNG NGAY LẬP TỨC (Defibrillation 200J Biphasic) + Ép tim ngoài lồng ngực (CPR) + Adrenalin 1mg IV.",
  },
  {
    id: "asystole",
    name: "Vô Tâm Thu (Asystole / Flatline)",
    defaultBpm: 0,
    category: "ventricular",
    description: "Cơ tim hoàn toàn không còn hoạt động điện học, đường đẳng điện phẳng lì, tử vong lâm sàng.",
    ecgCharacteristics: {
      rate: "0 lần/phút",
      rhythm: "Đường thẳng đẳng điện",
      pWave: "Không có (hoặc có thể sót vài sóng P đơn độc)",
      prInterval: "Không có",
      qrsComplex: "Hoàn toàn không có",
      stSegmentTwave: "Đẳng điện phẳng",
    },
    clinicalSignificance: "Ngừng tuần hoàn, tiên lượng cực kỳ xấu.",
    treatmentSummary: "Ép tim CPR liên tục + Adrenalin 1mg tiêm tĩnh mạch mỗi 3-5 phút (TUYỆT ĐỐI KHÔNG SỐC ĐIỆN VÌ KHÔNG CÓ HOẠT ĐIỆN)!",
  },
  {
    id: "av_block_first_degree",
    name: "Block Nhĩ Thất Độ I (First Degree AV Block)",
    defaultBpm: 65,
    category: "conduction",
    description: "Xung động từ nhĩ qua nút AV bị chậm trễ kéo dài nhưng tất cả các xung đều được dẫn xuống thất.",
    ecgCharacteristics: {
      rate: "Bình thường",
      rhythm: "Đều đặn",
      pWave: "Bình thường, theo sau bởi 1 QRS",
      prInterval: "KÉO DÀI CỐ ĐỊNH > 0.20 giây (> 5 ô nhỏ)",
      qrsComplex: "Hẹp < 0.12 giây",
      stSegmentTwave: "Bình thường",
    },
    clinicalSignificance: "Thường lành tính, có thể do thuốc (chẹn beta, digoxin) hoặc thoái hóa hệ dẫn truyền.",
    treatmentSummary: "Theo dõi, ngừng hoặc giảm liều thuốc làm chậm dẫn truyền nút AV nếu có.",
  },
  {
    id: "av_block_mobitz_1",
    name: "Block AV Độ II Mobitz I (Wenckebach)",
    defaultBpm: 60,
    category: "conduction",
    description: "Thời gian dẫn truyền qua nút AV dài dần ra theo từng chu kỳ cho đến khi có một xung nhĩ bị block không xuống được thất.",
    ecgCharacteristics: {
      rate: "Thất chậm hơn nhĩ",
      rhythm: "Không đều theo chu kỳ",
      pWave: "Đều đặn",
      prInterval: "DÀI DẦN RA theo từng nhịp liên tiếp cho đến khi rụng một QRS, sau đó chu kỳ lặp lại",
      qrsComplex: "Hẹp < 0.12 giây",
      stSegmentTwave: "Bình thường",
    },
    clinicalSignificance: "Vị trí tắc nghẽn thường ở ngay tại nút AV, tiên lượng tương đối lành tính.",
    treatmentSummary: "Theo dõi. Nếu có triệu chứng tụt HA: Dùng Atropin.",
  },
  {
    id: "av_block_mobitz_2",
    name: "Block AV Độ II Mobitz II",
    defaultBpm: 50,
    category: "conduction",
    description: "Khoảng PR cố định nhưng đột ngột rụng một phức bộ QRS. Vị trí block dưới nút AV (bó His), nguy cơ tiến triển thành Block độ III.",
    ecgCharacteristics: {
      rate: "Thất chậm",
      rhythm: "Không đều đặn",
      pWave: "Đều đặn, một số P không có QRS theo sau",
      prInterval: "CỐ ĐỊNH (có thể bình thường hoặc dài)",
      qrsComplex: "Thường rộng > 0.12 giây (tổn thương nhánh)",
      stSegmentTwave: "Bất thường thứ phát",
    },
    clinicalSignificance: "Nguy hiểm! Nguy cơ đột ngột ngất (hội chứng Adams-Stokes) hoặc ngừng tim.",
    treatmentSummary: "Chỉ định cấy máy tạo nhịp tim vĩnh viễn (Pacemaker).",
  },
  {
    id: "av_block_third_degree",
    name: "Block AV Độ III Hoàn Toàn (Complete Heart Block)",
    defaultBpm: 35,
    category: "conduction",
    description: "Nhĩ và thất phân ly hoàn toàn, không có xung nhĩ nào xuống được thất. Thất đập nhờ nhịp thoát chậm chạp 20-40 bpm.",
    ecgCharacteristics: {
      rate: "Tần số nhĩ (P) 70-80 bpm; Tần số thất (QRS) chỉ 30-40 bpm",
      rhythm: "Nhĩ đều, Thất đều, nhưng HOÀN TOÀN KHÔNG LIÊN QUAN ĐẾN NHAU (Phân ly nhĩ thất)",
      pWave: "Sóng P rơi tự do khắp nơi (trước, trong, sau QRS hoặc sóng T)",
      prInterval: "Hoàn toàn thay đổi, không cố định",
      qrsComplex: "Rộng > 0.12 giây nếu nhịp thoát từ thất",
      stSegmentTwave: "Bất thường thứ phát",
    },
    clinicalSignificance: "Cấp cứu tim mạch khẩn cấp! Cung lượng tim tụt dốc, bệnh nhân ngất lịm, tụt huyết áp nặng.",
    treatmentSummary: "Tạo nhịp tạm thời qua da hoặc qua tĩnh mạch ngay lập tức -> Cấy máy tạo nhịp vĩnh viễn.",
  },
  {
    id: "stemi_inferior",
    name: "STEMI Thành Dưới (Inferior Wall STEMI)",
    defaultBpm: 80,
    category: "ischemia_metabolic",
    description: "Tắc nghẽn động mạch vành phải (RCA) gây hoại tử xuyên thành đáy thất trái. Hình ảnh ST chênh lên rõ ở DII, DIII, aVF.",
    ecgCharacteristics: {
      rate: "Thường 60 - 90 bpm (có thể chậm nếu block AV kèm)",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.12 - 0.20 giây",
      qrsComplex: "Xuất hiện sóng Q hoại tử sâu ở DIII, aVF",
      stSegmentTwave: "ST CHÊNH LÊN DẠNG VÒM >= 1mm ở DII, DIII, aVF. Soi gương ST CHÊNH XUỐNG ở DI, aVL",
    },
    clinicalSignificance: "Nhồi máu cơ tim cấp đe dọa sốc tim và rối loạn nhịp. Nguy cơ nhồi máu thất phải kèm theo cao.",
    treatmentSummary: "Aspirin 300mg + Clopidogrel 600mg + Heparin -> Chuyển can thiệp mạch vành PCI khẩn cấp. TUYỆT ĐỐI TRÁNH Nitrate nếu có nhồi máu thất phải!",
  },
  {
    id: "stemi_anterior",
    name: "STEMI Trước Rộng (Anterior Wall STEMI)",
    defaultBpm: 95,
    category: "ischemia_metabolic",
    description: "Tắc nghẽn động mạch liên thất trước (LAD) nuôi toàn bộ thành trước và mỏm tim thất trái, vùng tổn thương cơ tim rất rộng.",
    ecgCharacteristics: {
      rate: "80 - 110 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.12 - 0.20 giây",
      qrsComplex: "Sóng r nhỏ hoặc mất r dạng QS từ V1 đến V4",
      stSegmentTwave: "ST CHÊNH LÊN CAO DẠNG VÒM > 2mm ở V1, V2, V3, V4, V5, V6",
    },
    clinicalSignificance: "Tiên lượng nặng nhất trong các thể nhồi máu vành, nguy cơ suy tim cấp, phù phổi và sốc tim rất cao.",
    treatmentSummary: "Kích hoạt PCI khẩn cấp trong 90 phút đầu. Bù oxy, kháng đông, kháng kết tập tiểu cầu kép.",
  },
  {
    id: "hyperkalemia",
    name: "Tăng Kali Máu Nặng (Hyperkalemia K+ > 7.0)",
    defaultBpm: 55,
    category: "ischemia_metabolic",
    description: "Rối loạn điện giải tối khẩn cấp làm giảm điện thế nghỉ của màng tế bào cơ tim, ức chế khử cực và tăng tốc tái cực.",
    ecgCharacteristics: {
      rate: "Nhịp chậm dần",
      rhythm: "Đều hoặc không đều",
      pWave: "Dẹt dần và MẤT HOÀN TOÀN sóng P",
      prInterval: "Kéo dài rồi mất",
      qrsComplex: "DÃN RỘNG NHƯ SÓNG SIN (Sine wave)",
      stSegmentTwave: "SÓNG T CAO NHỌN ĐỐI XỨNG, đáy hẹp như mũi lều (Tent-like T wave)",
    },
    clinicalSignificance: "Nguy cơ chuyển thành Rung thất (VF) hoặc Vô tâm thu trong tích tắc nếu không hạ Kali ngay!",
    treatmentSummary: "Canxi Clorid 10% 10ml tiêm tĩnh mạch trong 3 phút (ổn định màng cơ tim) + Insulin 10 IU pha Glucose 20% + Khí dung Salbutamol.",
  },
  {
    id: "stemi_lateral",
    name: "STEMI Thành Bên (Lateral Wall STEMI)",
    defaultBpm: 85,
    category: "ischemia_metabolic",
    description: "Tắc nhánh mũ (LCx) hoặc nhánh chéo (Diagonal) gây ST chênh lên ở DI, aVL, V5, V6.",
    ecgCharacteristics: {
      rate: "75 - 100 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.12 - 0.20s",
      qrsComplex: "qR ở DI, aVL, V5-V6",
      stSegmentTwave: "ST chênh lên ở DI, aVL, V5, V6; ST chênh xuống soi gương ở DIII, aVF",
    },
    clinicalSignificance: "Hội chứng vành cấp thành bên, cần phân biệt với tái cực sớm.",
    treatmentSummary: "Kháng kết tập tiểu cầu kép + Heparin + Kích hoạt Cath Lab PCI khẩn cấp.",
  },
  {
    id: "stemi_posterior",
    name: "STEMI Thành Sau Thực Thụ (True Posterior STEMI)",
    defaultBpm: 75,
    category: "ischemia_metabolic",
    description: "Tắc nhánh liên thất sau PDA/RCA, biểu hiện soi gương trên V1-V3 (ST chênh xuống, R cao, T dương).",
    ecgCharacteristics: {
      rate: "60 - 90 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.12 - 0.20s",
      qrsComplex: "Sóng R cao vượt trội (R/S > 1) ở V1-V2",
      stSegmentTwave: "ST chênh xuống đi ngang ở V1-V3; ST chênh lên ≥ 0.5mm ở chuyển đạo lưng V7-V9",
    },
    clinicalSignificance: "Dễ bị chẩn đoán nhầm thành NSTEMI. Đo ngay V7, V8, V9 để khẳng định.",
    treatmentSummary: "Kích hoạt Cath Lab PCI khẩn cấp như một ca STEMI thực thụ.",
  },
  {
    id: "nemi_subendocardial",
    name: "Thiếu Máu Dưới Nội Tâm Mạc / NSTEMI",
    defaultBpm: 90,
    category: "ischemia_metabolic",
    description: "ST chênh xuống lan tỏa đi ngang hoặc dốc xuống, ST chênh lên ở aVR cảnh báo tắc thân chung LMCA.",
    ecgCharacteristics: {
      rate: "75 - 110 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.12 - 0.20s",
      qrsComplex: "QRS hẹp",
      stSegmentTwave: "ST chênh xuống đi ngang ≥ 1mm ở ≥ 2 chuyển đạo; aVR chênh lên",
    },
    clinicalSignificance: "Nguy cơ cao tắc thân chung LMCA hoặc 3 thân mạch vành.",
    treatmentSummary: "Chống đông + Kháng tiểu cầu kép + Can thiệp mạch vành sớm trong 2-24h.",
  },
  {
    id: "rbbb",
    name: "Block Nhánh Phải Hoàn Toàn (Complete RBBB)",
    defaultBpm: 75,
    category: "conduction",
    description: "Nút nhĩ thất dẫn bình thường nhưng nhánh phải bị nghẽn hoàn toàn, thất phải khử cực muộn qua vách liên thất.",
    ecgCharacteristics: {
      rate: "60 - 95 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.12 - 0.20s",
      qrsComplex: "QRS dãn rộng ≥ 0.12s, dạng tai thỏ rsR' ở V1-V2; sóng S rộng sâu ở DI, V6",
      stSegmentTwave: "ST chênh xuống và T âm thứ phát ở V1-V2",
    },
    clinicalSignificance: "Nếu RBBB mới xuất hiện kèm khó thở cấp: Cảnh giác thuyên tắc động mạch phổi cấp.",
    treatmentSummary: "Theo dõi nếu mạn tính. Tìm nguyên nhân thuyên tắc phổi/bệnh mạch vành nếu mới xuất hiện.",
  },
  {
    id: "lbbb",
    name: "Block Nhánh Trái Hoàn Toàn (Complete LBBB)",
    defaultBpm: 80,
    category: "conduction",
    description: "Tắc hoàn toàn thân nhánh trái, thất trái khử cực muộn và bất đồng bộ, che lấp các dấu hiệu nhồi máu cơ tim kinh điển.",
    ecgCharacteristics: {
      rate: "65 - 100 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.12 - 0.20s",
      qrsComplex: "QRS rộng ≥ 0.12s, R rộng có khía ở DI, aVL, V5-V6; dạng QS sâu ở V1-V2",
      stSegmentTwave: "ST-T biến đổi thứ phát trái chiều QRS (Tiêu chuẩn Sgarbossa chẩn đoán STEMI)",
    },
    clinicalSignificance: "LBBB mới xuất hiện tương đương STEMI. Tiên lượng suy tim nặng.",
    treatmentSummary: "Kích hoạt PCI nếu LBBB mới xuất hiện kèm đau ngực. Cân nhắc cấy máy tái đồng bộ CRT.",
  },
  {
    id: "lafb",
    name: "Block Phân Nhánh Trái Trước (LAFB / LAHB)",
    defaultBpm: 72,
    category: "conduction",
    description: "Tắc phân nhánh trái trước, trục điện tim lệch trái mạnh từ -45° đến -90°.",
    ecgCharacteristics: {
      rate: "60 - 90 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.12 - 0.20s",
      qrsComplex: "QRS < 0.12s, dạng qR ở DI, aVL; dạng rS ở DII, DIII, aVF",
      stSegmentTwave: "ST-T bình thường",
    },
    clinicalSignificance: "Dạng block phân nhánh phổ biến nhất, cần tầm soát bệnh động mạch vành (LAD).",
    treatmentSummary: "Theo dõi định kỳ, điều trị bệnh tim mạch nền.",
  },
  {
    id: "wpw_syndrome",
    name: "Hội Chứng Wolff-Parkinson-White (WPW Pre-excitation)",
    defaultBpm: 80,
    category: "atrial",
    description: "Có đường dẫn truyền phụ nhĩ - thất (cầu Kent) kích thích tâm thất sớm tạo sóng Delta và PR ngắn.",
    ecgCharacteristics: {
      rate: "70 - 100 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "Ngắn < 0.12s (< 120ms)",
      qrsComplex: "QRS dãn rộng ≥ 0.12s, có sóng Delta thoai thoải ở sườn lên",
      stSegmentTwave: "ST-T biến đổi thứ phát",
    },
    clinicalSignificance: "Nguy cơ rung nhĩ dẫn truyền qua đường phụ gây rung thất đột tử.",
    treatmentSummary: "CẤM dùng Adenosine/Digoxin/Chẹn Canxi khi WPW có Rung Nhĩ. Triệt đốt đường phụ qua Catheter.",
  },
  {
    id: "torsades_de_pointes",
    name: "Cơn Xoắn Đỉnh (Torsades de Pointes - TdP)",
    defaultBpm: 220,
    category: "ventricular",
    description: "Nhanh thất đa dạng trên nền QT kéo dài, đỉnh QRS xoắn vặn quanh đường đẳng điện như dải lụa.",
    ecgCharacteristics: {
      rate: "200 - 250 bpm",
      rhythm: "Nhanh không đều đa dạng",
      pWave: "Không thấy",
      prInterval: "Không có",
      qrsComplex: "QRS dãn rộng, biên độ nhấp nhô biến đổi liên tục xoay quanh trục",
      stSegmentTwave: "Nền QT cơ bản > 500ms",
    },
    clinicalSignificance: "Rất dễ thoái triển thành Rung Thất gây ngừng tuần hoàn tử vong.",
    treatmentSummary: "TIÊM MAGNESI SULFAT 2g TM ngay lập tức + Sốc điện khử rung nếu mất mạch + Tạo nhịp vượt tần số.",
  },
  {
    id: "lvh_strain",
    name: "Phì Đại Thất Trái Tăng Gánh (LVH Strain)",
    defaultBpm: 75,
    category: "ischemia_metabolic",
    description: "Dày thành cơ thất trái do tăng huyết áp mạn hoặc hẹp van ĐMC, Sokolow-Lyon > 35mm kèm ST-T strain.",
    ecgCharacteristics: {
      rate: "60 - 90 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.12 - 0.20s",
      qrsComplex: "S ở V1 + R ở V5/V6 > 35mm; R aVL > 11mm",
      stSegmentTwave: "ST chênh xuống và T âm không đối xứng ở V5, V6, DI, aVL",
    },
    clinicalSignificance: "Tổn thương cơ quan đích do tăng huyết áp, tăng nguy cơ suy tim và đột quỵ.",
    treatmentSummary: "Kiểm soát huyết áp tích cực bằng ức chế men chuyển (ACEi) hoặc chẹn thụ thể (ARB).",
  },
  {
    id: "brugada_type1",
    name: "Hội Chứng Brugada Type 1 (Coved-Type)",
    defaultBpm: 75,
    category: "ventricular",
    description: "Rối loạn kênh Natri di truyền gây ST chênh vòm coved-type ≥ 2mm ở V1-V2 nối tiếp T âm sâu, nguy cơ đột tử khi ngủ.",
    ecgCharacteristics: {
      rate: "65 - 85 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.12 - 0.20s",
      qrsComplex: "Dạng tai thỏ không hoàn toàn ở V1",
      stSegmentTwave: "ST chênh lên dạng vòm dốc xuống (coved-type) ≥ 2mm ở V1-V2 tiếp nối T âm đối xứng",
    },
    clinicalSignificance: "Nguy cơ đột tử do tim khi ngủ rất cao ở nam giới trẻ tuổi.",
    treatmentSummary: "Hạ sốt khẩn cấp nếu đang sốt. Tránh thuốc cấm. Chỉ định cấy máy phá rung tự động ICD.",
  },
  {
    id: "pulmonary_embolism",
    name: "Thuyên Tắc Động Mạch Phổi Cấp (S1Q3T3)",
    defaultBpm: 115,
    category: "ischemia_metabolic",
    description: "Cục máu đông bít tắc động mạch phổi gây tăng gánh thất phải cấp, biểu hiện nhịp nhanh xoang và tam chứng S1Q3T3.",
    ecgCharacteristics: {
      rate: "100 - 130 bpm",
      rhythm: "Nhanh xoang",
      pWave: "P phế nhọn DII",
      prInterval: "0.12 - 0.18s",
      qrsComplex: "Sóng S sâu ở DI, sóng Q ở DIII",
      stSegmentTwave: "Sóng T âm ở DIII (S1Q3T3) và T âm đối xứng từ V1 đến V4",
    },
    clinicalSignificance: "Cấp cứu tim phổi đe dọa tử vong, sốc tim do suy thất phải cấp.",
    treatmentSummary: "Tiêu sợi huyết (rtPA) nếu có sốc tụt huyết áp. Heparin liều điều trị nếu ổn định.",
  },
  {
    id: "acute_pericarditis",
    name: "Viêm Màng Ngoài Tim Cấp (Acute Pericarditis)",
    defaultBpm: 88,
    category: "ischemia_metabolic",
    description: "Viêm lá màng ngoài tim gây ST chênh lên lõm lòng thuyền lan tỏa và đoạn PR chênh xuống đặc hiệu.",
    ecgCharacteristics: {
      rate: "75 - 100 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "PR CHÊNH XUỐNG lan tỏa, PR chênh lên ở aVR",
      qrsComplex: "QRS bình thường",
      stSegmentTwave: "ST chênh lên DẠNG LÕM LÒNG THUYỀN lan tỏa (DI, DII, aVF, V2-V6), KHÔNG CÓ soi gương",
    },
    clinicalSignificance: "Cần phân biệt chính xác với STEMI để tránh dùng thuốc tiêu sợi huyết nguy hiểm.",
    treatmentSummary: "Kháng viêm NSAIDs liều cao (Ibuprofen) phối hợp Colchicine 3 tháng. Tránh thuốc chống đông.",
  },
  {
    id: "hypokalemia",
    name: "Hạ Kali Máu Nặng (Hypokalemia K+ < 2.5)",
    defaultBpm: 88,
    category: "ischemia_metabolic",
    description: "Nồng độ Kali ngoại bào thấp làm chậm tái cực màng cơ tim, tạo sóng U nổi bật và kéo dài khoảng QU.",
    ecgCharacteristics: {
      rate: "75 - 105 bpm",
      rhythm: "Đều đặn",
      pWave: "Xoang",
      prInterval: "0.14 - 0.20s",
      qrsComplex: "QRS bình thường",
      stSegmentTwave: "Sóng T dẹt, ST chênh xuống nhẹ, SÓNG U NỔI RÕ > 1mm ở V2-V3, khoảng QU kéo dài",
    },
    clinicalSignificance: "Nguy cơ cao kích phát loạn nhịp thất chết người và Xoắn đỉnh (Torsades de Pointes).",
    treatmentSummary: "Bù Kali Clorid truyền tĩnh mạch có kiểm soát tốc độ + Bắt buộc bù Magnesi đồng thời.",
  },
  {
    id: "digoxin_toxicity",
    name: "Nhiễm Độc Digitalis (Digoxin Toxicity)",
    defaultBpm: 60,
    category: "ischemia_metabolic",
    description: "Ngộ độc thuốc Glycoside tim gây ST chênh xuống lõm đáy chén Salvador Dali và ngoại tâm thu thất nhịp đôi.",
    ecgCharacteristics: {
      rate: "50 - 100 bpm",
      rhythm: "Không đều do ngoại tâm thu",
      pWave: "Xoang hoặc mất P nếu kèm rung nhĩ",
      prInterval: "Kéo dài > 0.20s",
      qrsComplex: "Ngoại tâm thu thất dạng nhịp đôi (Bigeminy)",
      stSegmentTwave: "ST cong lõm hình đáy chén / muỗng (Salvador Dali moustache) ở V5-V6, QT ngắn",
    },
    clinicalSignificance: "Ngộ độc thuốc tim mạch tối cấp, nguy cơ loạn nhịp thất ác tính.",
    treatmentSummary: "Ngưng Digoxin, dùng kháng thể đặc hiệu DigiFab, duy trì K+ 4.0-5.0. CẤM TIÊM CANXI!",
  },
];

// Populate physiological allowed BPM range for all rhythms
for (const def of ECG_RHYTHM_DEFINITIONS) {
  def.allowedBpmRange = RHYTHM_ALLOWED_BPM_RANGE[def.id];
}

// ----------------------------------------------------
// Mathematical ECG Signal Generator using Gaussian Pulses
// ----------------------------------------------------

export interface GaussianWavelet {
  amplitude: number; // in mV
  mu: number; // time offset in seconds from start of cardiac cycle
  sigma: number; // width in seconds
}

export function getRhythmWavelets(rhythm: EcgRhythmType, cycleDuration: number): GaussianWavelet[] {
  // Baseline Normal Sinus cycle template (T = 0.8s for 75 bpm)
  const scale = cycleDuration / 0.8;

  switch (rhythm) {
    case "normal_sinus":
    case "sinus_tachycardia":
    case "sinus_bradycardia":
      return [
        { amplitude: 0.15, mu: 0.12 * scale, sigma: 0.025 * scale }, // P wave
        { amplitude: -0.15, mu: 0.20 * scale, sigma: 0.010 * scale }, // Q wave
        { amplitude: 1.60, mu: 0.22 * scale, sigma: 0.014 * scale }, // R wave
        { amplitude: -0.35, mu: 0.25 * scale, sigma: 0.015 * scale }, // S wave
        { amplitude: 0.35, mu: 0.46 * scale, sigma: 0.050 * scale }, // T wave
      ];

    case "atrial_fibrillation":
      // Loss of P wave, small f-waves everywhere, normal QRS
      return [
        { amplitude: -0.12, mu: 0.20 * scale, sigma: 0.010 * scale }, // Q wave
        { amplitude: 1.55, mu: 0.22 * scale, sigma: 0.014 * scale }, // R wave
        { amplitude: -0.30, mu: 0.25 * scale, sigma: 0.015 * scale }, // S wave
        { amplitude: 0.25, mu: 0.45 * scale, sigma: 0.050 * scale }, // T wave
      ];

    case "atrial_flutter":
      // Saw-tooth F waves and QRS
      return [
        { amplitude: -0.25, mu: 0.08 * scale, sigma: 0.035 * scale }, // Sawtooth F1
        { amplitude: 0.20, mu: 0.14 * scale, sigma: 0.030 * scale },
        { amplitude: -0.15, mu: 0.20 * scale, sigma: 0.010 * scale }, // Q
        { amplitude: 1.60, mu: 0.22 * scale, sigma: 0.014 * scale }, // R
        { amplitude: -0.30, mu: 0.25 * scale, sigma: 0.015 * scale }, // S
        { amplitude: -0.25, mu: 0.35 * scale, sigma: 0.035 * scale }, // Sawtooth F2
        { amplitude: 0.30, mu: 0.45 * scale, sigma: 0.040 * scale }, // T + F3
      ];

    case "svt":
      // Rapid, no distinct P, tall narrow R
      return [
        { amplitude: -0.10, mu: 0.15 * scale, sigma: 0.008 * scale },
        { amplitude: 1.80, mu: 0.17 * scale, sigma: 0.012 * scale },
        { amplitude: -0.40, mu: 0.20 * scale, sigma: 0.012 * scale },
        { amplitude: 0.30, mu: 0.32 * scale, sigma: 0.035 * scale },
      ];

    case "pvc_frequent":
      // Giant wide inverted ventricular beat
      return [
        { amplitude: -0.60, mu: 0.12 * scale, sigma: 0.025 * scale },
        { amplitude: 2.20, mu: 0.18 * scale, sigma: 0.035 * scale }, // Wide R
        { amplitude: -1.20, mu: 0.25 * scale, sigma: 0.045 * scale }, // Deep wide S
        { amplitude: -0.80, mu: 0.45 * scale, sigma: 0.070 * scale }, // Inverted T
      ];

    case "ventricular_tachycardia":
      // Continuous wide monomorphic complexes
      return [
        { amplitude: 2.10, mu: 0.15 * scale, sigma: 0.038 * scale },
        { amplitude: -1.50, mu: 0.26 * scale, sigma: 0.045 * scale },
      ];

    case "ventricular_fibrillation":
      // Chaotic undulating waves
      return [
        { amplitude: 0.90, mu: 0.10 * scale, sigma: 0.045 * scale },
        { amplitude: -1.10, mu: 0.22 * scale, sigma: 0.055 * scale },
        { amplitude: 0.70, mu: 0.35 * scale, sigma: 0.040 * scale },
        { amplitude: -0.60, mu: 0.48 * scale, sigma: 0.050 * scale },
      ];

    case "asystole":
      return []; // Flatline

    case "av_block_first_degree":
      // Prolonged PR interval (P wave starts at 0.05s, QRS starts at 0.32s -> PR = 0.27s)
      return [
        { amplitude: 0.15, mu: 0.05 * scale, sigma: 0.025 * scale }, // Early P
        { amplitude: -0.15, mu: 0.32 * scale, sigma: 0.010 * scale }, // Delayed Q
        { amplitude: 1.60, mu: 0.34 * scale, sigma: 0.014 * scale }, // R
        { amplitude: -0.35, mu: 0.37 * scale, sigma: 0.015 * scale }, // S
        { amplitude: 0.35, mu: 0.55 * scale, sigma: 0.050 * scale }, // T
      ];

    case "stemi_inferior":
      // ST elevation of 3mm (+0.3mV) with tombstone shape in Lead II
      return [
        { amplitude: 0.15, mu: 0.12 * scale, sigma: 0.025 * scale }, // P
        { amplitude: -0.30, mu: 0.20 * scale, sigma: 0.015 * scale }, // Pathologic Q
        { amplitude: 1.40, mu: 0.23 * scale, sigma: 0.016 * scale }, // R
        { amplitude: 0.45, mu: 0.30 * scale, sigma: 0.060 * scale }, // ST Elevation Dome!
        { amplitude: 0.60, mu: 0.46 * scale, sigma: 0.060 * scale }, // Giant positive T
      ];

    case "stemi_anterior":
      // Massive ST elevation
      return [
        { amplitude: 0.12, mu: 0.12 * scale, sigma: 0.025 * scale },
        { amplitude: -0.40, mu: 0.20 * scale, sigma: 0.020 * scale },
        { amplitude: 1.20, mu: 0.23 * scale, sigma: 0.016 * scale },
        { amplitude: 0.65, mu: 0.32 * scale, sigma: 0.070 * scale }, // High ST dome
        { amplitude: 0.70, mu: 0.48 * scale, sigma: 0.065 * scale }, // Hyperacute T
      ];

    case "hyperkalemia":
      // Loss of P, widened QRS, giant peaked symmetrical T
      return [
        { amplitude: 0.05, mu: 0.12 * scale, sigma: 0.015 * scale }, // Barely visible P
        { amplitude: -0.25, mu: 0.20 * scale, sigma: 0.025 * scale },
        { amplitude: 1.30, mu: 0.24 * scale, sigma: 0.030 * scale }, // Wide QRS
        { amplitude: -0.50, mu: 0.29 * scale, sigma: 0.035 * scale },
        { amplitude: 1.15, mu: 0.45 * scale, sigma: 0.035 * scale }, // TALL PEAKED T TENT!
      ];

    case "stemi_lateral":
      return [
        { amplitude: 0.14, mu: 0.12 * scale, sigma: 0.024 * scale },
        { amplitude: -0.25, mu: 0.20 * scale, sigma: 0.012 * scale },
        { amplitude: 1.45, mu: 0.22 * scale, sigma: 0.015 * scale },
        { amplitude: 0.40, mu: 0.31 * scale, sigma: 0.060 * scale }, // ST elevation
        { amplitude: 0.55, mu: 0.46 * scale, sigma: 0.055 * scale },
      ];

    case "stemi_posterior":
      return [
        { amplitude: 0.14, mu: 0.12 * scale, sigma: 0.024 * scale },
        { amplitude: 1.85, mu: 0.22 * scale, sigma: 0.018 * scale }, // Tall R
        { amplitude: -0.28, mu: 0.32 * scale, sigma: 0.055 * scale }, // Reciprocal ST depression
        { amplitude: 0.65, mu: 0.45 * scale, sigma: 0.055 * scale }, // Tall upright T
      ];

    case "nemi_subendocardial":
      return [
        { amplitude: 0.14, mu: 0.12 * scale, sigma: 0.024 * scale },
        { amplitude: 1.40, mu: 0.22 * scale, sigma: 0.014 * scale },
        { amplitude: -0.35, mu: 0.32 * scale, sigma: 0.055 * scale }, // Diffuse ST depression
        { amplitude: -0.45, mu: 0.45 * scale, sigma: 0.050 * scale }, // Inverted T
      ];

    case "rbbb":
      return [
        { amplitude: 0.14, mu: 0.12 * scale, sigma: 0.024 * scale },
        { amplitude: 0.65, mu: 0.20 * scale, sigma: 0.012 * scale }, // r
        { amplitude: -0.30, mu: 0.23 * scale, sigma: 0.014 * scale }, // s
        { amplitude: 1.45, mu: 0.28 * scale, sigma: 0.022 * scale }, // Wide R'
        { amplitude: -0.35, mu: 0.46 * scale, sigma: 0.055 * scale }, // Secondary inverted T
      ];

    case "lbbb":
      return [
        { amplitude: 0.14, mu: 0.12 * scale, sigma: 0.024 * scale },
        { amplitude: 1.10, mu: 0.22 * scale, sigma: 0.020 * scale }, // First peak
        { amplitude: 1.45, mu: 0.27 * scale, sigma: 0.022 * scale }, // Notched second peak
        { amplitude: -0.25, mu: 0.36 * scale, sigma: 0.055 * scale },
        { amplitude: -0.45, mu: 0.48 * scale, sigma: 0.060 * scale }, // Inverted T
      ];

    case "lafb":
      return [
        { amplitude: 0.14, mu: 0.12 * scale, sigma: 0.024 * scale },
        { amplitude: -0.15, mu: 0.19 * scale, sigma: 0.010 * scale }, // q
        { amplitude: 1.55, mu: 0.22 * scale, sigma: 0.014 * scale }, // tall R
        { amplitude: 0.35, mu: 0.45 * scale, sigma: 0.050 * scale },
      ];

    case "wpw_syndrome":
      return [
        { amplitude: 0.15, mu: 0.08 * scale, sigma: 0.020 * scale }, // Short PR
        { amplitude: 0.50, mu: 0.16 * scale, sigma: 0.030 * scale }, // DELTA WAVE
        { amplitude: 1.65, mu: 0.23 * scale, sigma: 0.020 * scale }, // Main R
        { amplitude: -0.35, mu: 0.28 * scale, sigma: 0.022 * scale },
        { amplitude: -0.35, mu: 0.45 * scale, sigma: 0.055 * scale },
      ];

    case "torsades_de_pointes":
      return [
        { amplitude: 1.80, mu: 0.14 * scale, sigma: 0.035 * scale },
        { amplitude: -1.40, mu: 0.25 * scale, sigma: 0.040 * scale },
      ];

    case "lvh_strain":
      return [
        { amplitude: 0.16, mu: 0.12 * scale, sigma: 0.024 * scale },
        { amplitude: 2.60, mu: 0.22 * scale, sigma: 0.018 * scale }, // Giant R
        { amplitude: -0.30, mu: 0.32 * scale, sigma: 0.050 * scale }, // Strain ST depression
        { amplitude: -0.55, mu: 0.46 * scale, sigma: 0.055 * scale }, // Asymmetric T
      ];

    case "brugada_type1":
      return [
        { amplitude: 0.14, mu: 0.12 * scale, sigma: 0.024 * scale },
        { amplitude: 1.10, mu: 0.21 * scale, sigma: 0.016 * scale },
        { amplitude: 0.45, mu: 0.30 * scale, sigma: 0.060 * scale }, // Coved ST elevation
        { amplitude: -0.50, mu: 0.45 * scale, sigma: 0.055 * scale }, // Inverted T
      ];

    case "pulmonary_embolism":
      return [
        { amplitude: 0.22, mu: 0.10 * scale, sigma: 0.020 * scale }, // P phế
        { amplitude: 1.35, mu: 0.20 * scale, sigma: 0.014 * scale },
        { amplitude: -0.40, mu: 0.24 * scale, sigma: 0.018 * scale }, // Deep S
        { amplitude: -0.35, mu: 0.38 * scale, sigma: 0.050 * scale }, // Inverted T
      ];

    case "acute_pericarditis":
      return [
        { amplitude: 0.14, mu: 0.10 * scale, sigma: 0.022 * scale },
        { amplitude: -0.08, mu: 0.16 * scale, sigma: 0.035 * scale }, // PR depression
        { amplitude: 1.45, mu: 0.22 * scale, sigma: 0.015 * scale },
        { amplitude: 0.30, mu: 0.32 * scale, sigma: 0.065 * scale }, // Concave ST elevation
        { amplitude: 0.50, mu: 0.46 * scale, sigma: 0.055 * scale },
      ];

    case "hypokalemia":
      return [
        { amplitude: 0.12, mu: 0.12 * scale, sigma: 0.024 * scale },
        { amplitude: 1.40, mu: 0.22 * scale, sigma: 0.014 * scale },
        { amplitude: -0.12, mu: 0.32 * scale, sigma: 0.045 * scale }, // ST depression
        { amplitude: 0.08, mu: 0.42 * scale, sigma: 0.035 * scale }, // Flat T
        { amplitude: 0.35, mu: 0.55 * scale, sigma: 0.045 * scale }, // PROMINENT U WAVE
      ];

    case "digoxin_toxicity":
      return [
        { amplitude: 0.14, mu: 0.12 * scale, sigma: 0.024 * scale },
        { amplitude: 1.40, mu: 0.22 * scale, sigma: 0.014 * scale },
        { amplitude: -0.32, mu: 0.32 * scale, sigma: 0.060 * scale }, // Scooped ST
        { amplitude: 0.12, mu: 0.42 * scale, sigma: 0.035 * scale },
      ];

    default:
      return [
        { amplitude: 0.15, mu: 0.12 * scale, sigma: 0.025 * scale },
        { amplitude: -0.15, mu: 0.20 * scale, sigma: 0.010 * scale },
        { amplitude: 1.60, mu: 0.22 * scale, sigma: 0.014 * scale },
        { amplitude: -0.35, mu: 0.25 * scale, sigma: 0.015 * scale },
        { amplitude: 0.35, mu: 0.46 * scale, sigma: 0.050 * scale },
      ];
  }
}

/**
 * Calculates voltage V(t) in millivolts at time t (seconds) within cardiac cycle
 */
export function calculateEcgVoltage(
  tInCycle: number,
  rhythm: EcgRhythmType,
  cycleDuration: number
): number {
  if (rhythm === "asystole") {
    // Gentle baseline noise only
    return (Math.random() - 0.5) * 0.02;
  }

  const wavelets = getRhythmWavelets(rhythm, cycleDuration);
  let voltage = 0;

  for (const w of wavelets) {
    const diff = tInCycle - w.mu;
    voltage += w.amplitude * Math.exp(-(diff * diff) / (2 * w.sigma * w.sigma));
  }

  // Add micro-noise and breathing baseline wander (0.15 Hz)
  const breathingWander = 0.03 * Math.sin(2 * Math.PI * 0.15 * tInCycle);
  const microNoise = (Math.random() - 0.5) * 0.015;

  if (rhythm === "atrial_fibrillation") {
    // Continuous fibrillatory f-waves (tần số 400 - 600 cpm)
    const fWave = 0.05 * Math.sin(2 * Math.PI * 7.5 * tInCycle) + 0.03 * Math.cos(2 * Math.PI * 11.2 * tInCycle);
    return voltage + breathingWander + microNoise + fWave;
  }

  return voltage + breathingWander + microNoise;
}

/**
 * Calculates authentic lead-specific ECG voltage at continuous global time (seconds).
 * Accurately models real medical criteria on the abnormal leads:
 * - STEMI Inferior: ST elevation on DII, DIII, aVF; reciprocal ST depression on DI, aVL.
 * - STEMI Anterior: Massive tombstone ST elevation on V1-V4; reciprocal ST depression on DII, DIII, aVF.
 * - 1st Degree AV Block: Fixed PR = 260ms (> 200ms / 5 small boxes).
 * - 2nd Degree AV Block Mobitz 1 (Wenckebach): Progressive PR lengthening (160ms -> 240ms -> 320ms -> dropped QRS).
 * - 2nd Degree AV Block Mobitz 2: Fixed PR with sudden dropped QRS.
 * - 3rd Degree AV Block: P waves at 75 bpm and escape QRS at 36 bpm (complete AV dissociation).
 * - Atrial Fibrillation: Irregularly irregular RR intervals + continuous f-waves, no P.
 * - Atrial Flutter: 300 bpm sawtooth F waves on DII, DIII, aVF with 2:1 conduction.
 * - Frequent PVC: Trigeminy (2 sinus beats : 1 premature wide bizarre QRS with compensatory pause).
 * - Hyperkalemia: Symmetrical peaked tented T waves > 10mm in V2-V5, flattened P, widened QRS.
 */
export function calculateLeadEcgVoltage(
  globalTimeSec: number,
  leadId: string,
  rhythm: EcgRhythmType | string,
  bpm: number = 75
): number {
  const normLead = leadId.replace("_LONG", "");

  // 1. Asystole
  if (rhythm === "asystole") {
    return (Math.sin(globalTimeSec * 1.5) * 0.015) + ((Math.random() - 0.5) * 0.012);
  }

  // 2. Ventricular Fibrillation (Chaotic undulating waves)
  if (rhythm === "ventricular_fibrillation") {
    const t = globalTimeSec;
    return (
      0.45 * Math.sin(2 * Math.PI * 4.2 * t) +
      0.35 * Math.sin(2 * Math.PI * 6.8 * t + 1.2) +
      0.25 * Math.sin(2 * Math.PI * 9.1 * t + 2.5) +
      ((Math.random() - 0.5) * 0.04)
    );
  }

  // 3. Ventricular Tachycardia (Wide monomorphic complexes 175 bpm)
  if (rhythm === "ventricular_tachycardia") {
    const vtCycle = 60 / Math.max(140, bpm || 175);
    const tInCycle = (globalTimeSec % vtCycle);
    const rDiff = tInCycle - 0.14;
    const sDiff = tInCycle - 0.22;
    const rWave = 1.9 * Math.exp(-(rDiff * rDiff) / (2 * 0.035 * 0.035));
    const sWave = -1.3 * Math.exp(-(sDiff * sDiff) / (2 * 0.040 * 0.040));
    return rWave + sWave;
  }

  // 3b. Torsades de Pointes (Polymorphic VT with twisting amplitude)
  if (rhythm === "torsades_de_pointes") {
    const tdpCycle = 60 / Math.max(180, bpm || 220);
    const tInCycle = globalTimeSec % tdpCycle;
    const modulation = Math.sin(2 * Math.PI * 0.45 * globalTimeSec);
    const rDiff = tInCycle - 0.10;
    const sDiff = tInCycle - 0.18;
    const rWave = 1.9 * modulation * Math.exp(-(rDiff * rDiff) / (2 * 0.035 * 0.035));
    const sWave = -1.4 * modulation * Math.exp(-(sDiff * sDiff) / (2 * 0.040 * 0.040));
    return rWave + sWave;
  }

  // 4. 2nd Degree AV Block Mobitz 1 (Wenckebach: PR lengthens then QRS drops)
  if (rhythm === "av_block_mobitz_1") {
    const cycleT = 0.85; // ~70 bpm
    const totalCycle = cycleT * 4; // 4-beat Wenckebach cycle
    const phaseIn4 = globalTimeSec % totalCycle;
    const beatIndex = Math.floor(phaseIn4 / cycleT);
    const tInBeat = phaseIn4 - beatIndex * cycleT;

    let pAmp = 0.15;
    let qAmp = -0.12;
    let rAmp = 1.55;
    let sAmp = -0.32;
    let tAmp = 0.32;

    if (normLead === "aVR") {
      pAmp = -0.14;
      qAmp = 0.10;
      rAmp = -1.30;
      sAmp = 0.25;
      tAmp = -0.30;
    } else if (normLead === "V1") {
      pAmp = 0.10;
      qAmp = 0.00;
      rAmp = 0.35;
      sAmp = -1.10;
      tAmp = 0.15;
    } else if (normLead === "V2") {
      pAmp = 0.12;
      qAmp = -0.05;
      rAmp = 0.75;
      sAmp = -0.85;
      tAmp = 0.25;
    } else if (normLead === "V3") {
      pAmp = 0.14;
      qAmp = -0.08;
      rAmp = 1.15;
      sAmp = -0.55;
      tAmp = 0.30;
    } else if (normLead === "V5" || normLead === "V6") {
      pAmp = 0.15;
      qAmp = -0.12;
      rAmp = 1.85;
      sAmp = -0.20;
      tAmp = 0.40;
    } else if (normLead === "DI" || normLead === "I" || normLead === "aVL") {
      pAmp = 0.12;
      qAmp = -0.10;
      rAmp = 1.35;
      sAmp = -0.25;
      tAmp = 0.30;
    } else if (normLead === "DIII" || normLead === "III") {
      pAmp = 0.12;
      qAmp = -0.10;
      rAmp = 1.25;
      sAmp = -0.30;
      tAmp = 0.25;
    }

    // Sóng P at 0.06s in every beat
    const pDiff = tInBeat - 0.06;
    const pWave = pAmp * Math.exp(-(pDiff * pDiff) / (2 * 0.022 * 0.022));

    if (beatIndex === 3) {
      // Beat 4: DROPPED BEAT! Sóng P có mặt nhưng không có QRS và T!
      return pWave;
    }

    // PR intervals: Beat 0 = 160ms, Beat 1 = 280ms (+120ms), Beat 2 = 320ms (+40ms)
    // Sinh lý Wenckebach AHA/ESC: Gia số PR giảm dần (ΔPR1 = 120ms > ΔPR2 = 40ms)
    // dẫn tới khoảng R-R ngắn dần trước nhát rớt:
    // RR1 = 850 + 120 = 970ms > RR2 = 850 + 40 = 890ms
    const qrsMu = beatIndex === 0 ? 0.22 : beatIndex === 1 ? 0.34 : 0.38;
    const qDiff = tInBeat - (qrsMu - 0.02);
    const rDiff = tInBeat - qrsMu;
    const sDiff = tInBeat - (qrsMu + 0.03);
    const tDiff = tInBeat - (qrsMu + 0.24);

    const qWave = qAmp * Math.exp(-(qDiff * qDiff) / (2 * 0.010 * 0.010));
    const rWave = rAmp * Math.exp(-(rDiff * rDiff) / (2 * 0.014 * 0.014));
    const sWave = sAmp * Math.exp(-(sDiff * sDiff) / (2 * 0.015 * 0.015));
    const tWave = tAmp * Math.exp(-(tDiff * tDiff) / (2 * 0.045 * 0.045));

    return pWave + qWave + rWave + sWave + tWave;
  }

  // 5. 2nd Degree AV Block Mobitz 2 (Fixed PR with sudden non-conducted P)
  if (rhythm === "av_block_mobitz_2") {
    const cycleT = 0.90; // ~66 bpm
    const totalCycle = cycleT * 3; // 3-beat cycle: 2 conducted, 1 dropped
    const phaseIn3 = globalTimeSec % totalCycle;
    const beatIndex = Math.floor(phaseIn3 / cycleT);
    const tInBeat = phaseIn3 - beatIndex * cycleT;

    const pDiff = tInBeat - 0.08;
    const pWave = 0.15 * Math.exp(-(pDiff * pDiff) / (2 * 0.022 * 0.022));

    if (beatIndex === 2) {
      // Sudden dropped QRS!
      return pWave;
    }

    const qrsMu = 0.26; // Fixed PR = 180ms
    const qDiff = tInBeat - (qrsMu - 0.02);
    const rDiff = tInBeat - qrsMu;
    const sDiff = tInBeat - (qrsMu + 0.03);
    const tDiff = tInBeat - (qrsMu + 0.24);

    const qWave = -0.15 * Math.exp(-(qDiff * qDiff) / (2 * 0.012 * 0.012));
    const rWave = 1.50 * Math.exp(-(rDiff * rDiff) / (2 * 0.018 * 0.018));
    const sWave = -0.35 * Math.exp(-(sDiff * sDiff) / (2 * 0.020 * 0.020));
    const tWave = 0.30 * Math.exp(-(tDiff * tDiff) / (2 * 0.050 * 0.050));

    return pWave + qWave + rWave + sWave + tWave;
  }

  // 6. 3rd Degree AV Block (Complete AV Dissociation: P @ 75 bpm, QRS @ 36 bpm)
  if (rhythm === "av_block_third_degree") {
    // Sóng P phát độc lập với chu kỳ 0.80s (75 bpm)
    const pTimeInCycle = globalTimeSec % 0.80;
    const pDiff = pTimeInCycle - 0.15;
    const pWave = 0.16 * Math.exp(-(pDiff * pDiff) / (2 * 0.024 * 0.024));

    // Phức bộ QRS thất phát độc lập với chu kỳ 1.67s (36 bpm)
    const vTimeInCycle = globalTimeSec % 1.67;
    const rDiff = vTimeInCycle - 0.25;
    const sDiff = vTimeInCycle - 0.31;
    const tDiff = vTimeInCycle - 0.60;

    const rWave = 1.45 * Math.exp(-(rDiff * rDiff) / (2 * 0.030 * 0.030)); // Dãn rộng 130ms
    const sWave = -0.65 * Math.exp(-(sDiff * sDiff) / (2 * 0.035 * 0.035));
    const tWave = -0.40 * Math.exp(-(tDiff * tDiff) / (2 * 0.065 * 0.065)); // T đảo chiều rộng

    return pWave + rWave + sWave + tWave;
  }

  // 7. Frequent PVC (Ventricular Trigeminy: 2 Sinus : 1 Premature Bizarre Beat)
  if (rhythm === "pvc_frequent") {
    const trigeminyCycle = 2.40; // 3 beats: 0.0s, 0.8s, 1.35s (early!) then pause to 2.4s
    const tInTri = globalTimeSec % trigeminyCycle;

    if (tInTri < 0.78) {
      // Beat 1: Normal Sinus
      return calculateSingleBeat(tInTri, "normal", normLead);
    } else if (tInTri < 1.34) {
      // Beat 2: Normal Sinus
      return calculateSingleBeat(tInTri - 0.78, "normal", normLead);
    } else {
      // Beat 3: PREMATURE VENTRICULAR BEAT! (Starts at 1.34s instead of 1.56s)
      const tInPvc = tInTri - 1.34;
      // Giant wide bizarre QRS (duration 150ms) with discordant T
      const rDiff = tInPvc - 0.15;
      const sDiff = tInPvc - 0.24;
      const tDiff = tInPvc - 0.44;

      const rWave = 2.10 * Math.exp(-(rDiff * rDiff) / (2 * 0.038 * 0.038));
      const sWave = -1.25 * Math.exp(-(sDiff * sDiff) / (2 * 0.045 * 0.045));
      const tWave = -0.75 * Math.exp(-(tDiff * tDiff) / (2 * 0.070 * 0.070));

      return rWave + sWave + tWave;
    }
  }

  // 8. Atrial Fibrillation (Irregularly Irregular R-R intervals + continuous f-waves)
  if (rhythm === "atrial_fibrillation") {
    // 8 varying RR interval lengths: [0.42, 0.65, 0.48, 0.76, 0.52, 0.60, 0.72, 0.55] (sum = 4.70s)
    const rrIntervals = [0.42, 0.65, 0.48, 0.76, 0.52, 0.60, 0.72, 0.55];
    const totalCycle = 4.70;
    const phaseInAf = globalTimeSec % totalCycle;

    let accumulated = 0;
    let tInCurrentBeat = 0;
    for (const interval of rrIntervals) {
      if (phaseInAf < accumulated + interval) {
        tInCurrentBeat = phaseInAf - accumulated;
        break;
      }
      accumulated += interval;
    }

    // High frequency fibrillatory f-wave baseline (400-600 cpm)
    const fWave =
      0.045 * Math.sin(2 * Math.PI * 7.4 * globalTimeSec) +
      0.030 * Math.cos(2 * Math.PI * 11.2 * globalTimeSec) +
      0.020 * Math.sin(2 * Math.PI * 14.8 * globalTimeSec);

    // QRS and T (NO P WAVE)
    const qDiff = tInCurrentBeat - 0.12;
    const rDiff = tInCurrentBeat - 0.14;
    const sDiff = tInCurrentBeat - 0.17;
    const tDiff = tInCurrentBeat - 0.32;

    const qWave = -0.12 * Math.exp(-(qDiff * qDiff) / (2 * 0.010 * 0.010));
    const rWave = 1.55 * Math.exp(-(rDiff * rDiff) / (2 * 0.013 * 0.013));
    const sWave = -0.32 * Math.exp(-(sDiff * sDiff) / (2 * 0.014 * 0.014));
    const tWave = 0.28 * Math.exp(-(tDiff * tDiff) / (2 * 0.045 * 0.045));

    return fWave + qWave + rWave + sWave + tWave;
  }

  // 9. Atrial Flutter (Continuous Sawtooth F-waves at 300 bpm + 2:1 conduction)
  if (rhythm === "atrial_flutter") {
    const ventricularCycle = 0.40; // 150 bpm (2:1 conduction)
    const tInBeat = globalTimeSec % ventricularCycle;

    // Sawtooth wave on DII, DIII, aVF
    let fSawtooth = 0;
    if (normLead === "DII" || normLead === "DIII" || normLead === "aVF" || normLead === "II") {
      // 5 Hz = 300 bpm sawtooth
      const sawPhase = (globalTimeSec * 5.0) % 1.0;
      fSawtooth = -0.28 * (1 - 2 * sawPhase); // Asymmetric sawtooth
    } else if (normLead === "V1") {
      fSawtooth = 0.15 * Math.sin(2 * Math.PI * 5.0 * globalTimeSec);
    }

    const rDiff = tInBeat - 0.12;
    const sDiff = tInBeat - 0.15;
    const rWave = 1.50 * Math.exp(-(rDiff * rDiff) / (2 * 0.014 * 0.014));
    const sWave = -0.35 * Math.exp(-(sDiff * sDiff) / (2 * 0.015 * 0.015));

    return fSawtooth + rWave + sWave;
  }

  // 10. General Regular Cardiac Cycle (STEMI, Hyperkalemia, AV Block 1, Sinus...)
  const cycleDuration = 60 / Math.max(35, bpm);
  const tInCycle = globalTimeSec % cycleDuration;

  // STEMI INFERIOR (Criteria: DII, DIII, aVF ST elevation; DI, aVL reciprocal ST depression; Pathologic Q in DIII, aVF)
  if (rhythm === "stemi_inferior") {
    if (normLead === "DII" || normLead === "II") {
      return (
        0.15 * gaussian(tInCycle, 0.12, 0.024) - // P
        0.18 * gaussian(tInCycle, 0.19, 0.012) + // Q
        1.35 * gaussian(tInCycle, 0.22, 0.015) + // R
        0.32 * gaussian(tInCycle, 0.31, 0.060) + // ST ELEVATION DOME (+3.2mm)
        0.58 * gaussian(tInCycle, 0.46, 0.060)   // Giant T
      );
    } else if (normLead === "DIII" || normLead === "III") {
      return (
        0.12 * gaussian(tInCycle, 0.12, 0.024) - // P
        0.42 * gaussian(tInCycle, 0.185, 0.018) + // Pathologic Q (> 0.04s, > 25% R: đáy sâu tại 0.185s)
        1.10 * gaussian(tInCycle, 0.230, 0.015) + // R (đỉnh tại 0.230s)
        0.38 * gaussian(tInCycle, 0.310, 0.060) + // ST ELEVATION DOME (+3.8mm)
        0.62 * gaussian(tInCycle, 0.470, 0.060)   // Giant T
      );
    } else if (normLead === "aVF") {
      return (
        0.14 * gaussian(tInCycle, 0.12, 0.024) - // P
        0.35 * gaussian(tInCycle, 0.185, 0.016) + // Pathologic Q (> 0.04s, > 25% R: đáy sâu tại 0.185s)
        1.25 * gaussian(tInCycle, 0.230, 0.015) + // R (đỉnh tại 0.230s)
        0.34 * gaussian(tInCycle, 0.310, 0.060) + // ST ELEVATION DOME (+3.4mm)
        0.55 * gaussian(tInCycle, 0.460, 0.060)
      );
    } else if (normLead === "DI" || normLead === "I" || normLead === "aVL") {
      // RECIPROCAL ST DEPRESSION (-2.0mm to -2.7mm) and inverted T wave
      const mult = normLead === "aVL" ? 1.15 : 0.90;
      return (
        0.12 * gaussian(tInCycle, 0.12, 0.024) + // P
        1.10 * gaussian(tInCycle, 0.22, 0.015) * mult - // Upright R
        0.22 * gaussian(tInCycle, 0.33, 0.060) * mult - // RECIPROCAL ST DEPRESSION!
        0.32 * gaussian(tInCycle, 0.46, 0.055) * mult   // Inverted T
      );
    } else {
      // Precordial leads V1-V6: near normal with flat baseline
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // STEMI ANTERIOR (Criteria: V1-V4 Massive Tombstone ST elevation; DII, DIII, aVF reciprocal depression)
  if (rhythm === "stemi_anterior") {
    if (normLead === "V1" || normLead === "V2" || normLead === "V3" || normLead === "V4") {
      const peakSt = normLead === "V2" ? 0.52 : normLead === "V3" ? 0.48 : 0.38;
      return (
        0.10 * gaussian(tInCycle, 0.12, 0.022) - // P
        0.38 * gaussian(tInCycle, 0.20, 0.020) + // QS pattern (absent r)
        0.90 * gaussian(tInCycle, 0.22, 0.016) + // Stunted R
        peakSt * gaussian(tInCycle, 0.32, 0.075) + // MASSIVE TOMBSTONE ST ELEVATION (+4.8mm)!
        0.75 * gaussian(tInCycle, 0.48, 0.065)    // Hyperacute T
      );
    } else if (normLead === "V5" || normLead === "V6") {
      return (
        0.14 * gaussian(tInCycle, 0.12, 0.022) +
        1.35 * gaussian(tInCycle, 0.22, 0.015) +
        0.22 * gaussian(tInCycle, 0.32, 0.060) + // Moderate ST elevation (+2.2mm)
        0.45 * gaussian(tInCycle, 0.46, 0.055)
      );
    } else if (normLead === "DII" || normLead === "DIII" || normLead === "aVF" || normLead === "II" || normLead === "III") {
      // RECIPROCAL ST DEPRESSION in inferior leads
      return (
        0.12 * gaussian(tInCycle, 0.12, 0.022) +
        1.15 * gaussian(tInCycle, 0.22, 0.015) -
        0.18 * gaussian(tInCycle, 0.32, 0.055) - // RECIPROCAL ST DEPRESSION (-1.8mm)
        0.25 * gaussian(tInCycle, 0.46, 0.050)   // Inverted T
      );
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // 1st Degree AV Block (Fixed PR = 260ms > 200ms with Authentic 12-Lead Morphology)
  if (rhythm === "av_block_first_degree") {
    let pAmp = 0.15;
    let qAmp = -0.15;
    let rAmp = 1.60;
    let sAmp = -0.35;
    let tAmp = 0.35;

    if (normLead === "aVR") {
      pAmp = -0.14;
      qAmp = 0.10;
      rAmp = -1.30;
      sAmp = 0.25;
      tAmp = -0.30;
    } else if (normLead === "V1") {
      pAmp = 0.10;
      qAmp = 0.00;
      rAmp = 0.35;
      sAmp = -1.10;
      tAmp = 0.20;
    } else if (normLead === "V2") {
      pAmp = 0.12;
      qAmp = -0.05;
      rAmp = 0.75;
      sAmp = -0.85;
      tAmp = 0.28;
    } else if (normLead === "V3") {
      pAmp = 0.14;
      qAmp = -0.08;
      rAmp = 1.15;
      sAmp = -0.55;
      tAmp = 0.32;
    } else if (normLead === "V5" || normLead === "V6") {
      pAmp = 0.15;
      qAmp = -0.12;
      rAmp = 1.85;
      sAmp = -0.20;
      tAmp = 0.40;
    } else if (normLead === "DI" || normLead === "I" || normLead === "aVL") {
      pAmp = 0.12;
      qAmp = -0.10;
      rAmp = 1.35;
      sAmp = -0.25;
      tAmp = 0.30;
    } else if (normLead === "DIII" || normLead === "III") {
      pAmp = 0.12;
      qAmp = -0.10;
      rAmp = 1.25;
      sAmp = -0.30;
      tAmp = 0.25;
    }

    return (
      pAmp * gaussian(tInCycle, 0.055, 0.022) +
      qAmp * gaussian(tInCycle, 0.290, 0.010) +
      rAmp * gaussian(tInCycle, 0.320, 0.014) +
      sAmp * gaussian(tInCycle, 0.350, 0.015) +
      tAmp * gaussian(tInCycle, 0.540, 0.050)
    );
  }

  // Hyperkalemia (Criteria: Peaked symmetrical T tent > 10mm in V2-V5, flat P, wide QRS)
  if (rhythm === "hyperkalemia") {
    if (normLead.startsWith("V") && normLead !== "V1" && normLead !== "V6") {
      // V2, V3, V4, V5: TENT-LIKE T WAVE (+9.5mm)
      return (
        0.04 * gaussian(tInCycle, 0.12, 0.016) - // Flattened P
        0.25 * gaussian(tInCycle, 0.20, 0.022) +
        1.25 * gaussian(tInCycle, 0.24, 0.028) - // Widened QRS (130ms)
        0.50 * gaussian(tInCycle, 0.29, 0.035) +
        0.98 * gaussian(tInCycle, 0.45, 0.032)   // TALL SHARP PEAKED TENTED T!
      );
    } else {
      return (
        0.05 * gaussian(tInCycle, 0.12, 0.018) +
        1.10 * gaussian(tInCycle, 0.24, 0.025) +
        0.65 * gaussian(tInCycle, 0.45, 0.035)
      );
    }
  }

  // RBBB (Criteria: V1-V2 rsR' rabbit ears; DI, aVL, V6 deep broad S)
  if (rhythm === "rbbb") {
    if (normLead === "V1" || normLead === "V2") {
      const r1 = 0.55 * gaussian(tInCycle, 0.20, 0.012);
      const s1 = -0.30 * gaussian(tInCycle, 0.23, 0.014);
      const r2 = 1.45 * gaussian(tInCycle, 0.28, 0.022); // Broad tall R'
      const stT = -0.32 * gaussian(tInCycle, 0.46, 0.055); // Secondary inverted T
      return 0.12 * gaussian(tInCycle, 0.12, 0.022) + r1 + s1 + r2 + stT;
    } else if (normLead === "DI" || normLead === "I" || normLead === "aVL" || normLead === "V5" || normLead === "V6") {
      const p = 0.14 * gaussian(tInCycle, 0.12, 0.022);
      const q = -0.10 * gaussian(tInCycle, 0.20, 0.010);
      const r = 1.40 * gaussian(tInCycle, 0.22, 0.014);
      const sBroad = -0.65 * gaussian(tInCycle, 0.29, 0.028); // S rộng sâu
      const t = 0.35 * gaussian(tInCycle, 0.46, 0.050);
      return p + q + r + sBroad + t;
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // LBBB (Criteria: V5-V6, DI, aVL notched wide R, lost septal Q; V1-V2 deep QS)
  if (rhythm === "lbbb") {
    if (normLead === "V5" || normLead === "V6" || normLead === "DI" || normLead === "I" || normLead === "aVL") {
      const p = 0.12 * gaussian(tInCycle, 0.12, 0.022);
      const r1 = 1.25 * gaussian(tInCycle, 0.22, 0.020);
      const r2 = 1.55 * gaussian(tInCycle, 0.28, 0.022); // Notched second peak
      const stDown = -0.22 * gaussian(tInCycle, 0.36, 0.055);
      const tInv = -0.42 * gaussian(tInCycle, 0.48, 0.060);
      return p + r1 + r2 + stDown + tInv;
    } else if (normLead === "V1" || normLead === "V2") {
      const p = 0.08 * gaussian(tInCycle, 0.12, 0.020);
      const rSmall = 0.20 * gaussian(tInCycle, 0.20, 0.012);
      const sDeep = -1.85 * gaussian(tInCycle, 0.26, 0.030); // Deep QS
      const stUp = 0.18 * gaussian(tInCycle, 0.35, 0.050); // Secondary ST elevation
      const tPos = 0.45 * gaussian(tInCycle, 0.48, 0.060);
      return p + rSmall + sDeep + stUp + tPos;
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // LAFB (Criteria: qR in DI, aVL; rS in DII, DIII, aVF, left axis)
  if (rhythm === "lafb") {
    if (normLead === "DI" || normLead === "I" || normLead === "aVL") {
      const p = 0.14 * gaussian(tInCycle, 0.12, 0.022);
      const q = -0.20 * gaussian(tInCycle, 0.19, 0.010);
      const r = 1.75 * gaussian(tInCycle, 0.22, 0.014);
      const t = 0.32 * gaussian(tInCycle, 0.46, 0.050);
      return p + q + r + t;
    } else if (normLead === "DII" || normLead === "DIII" || normLead === "aVF" || normLead === "II" || normLead === "III") {
      const p = 0.12 * gaussian(tInCycle, 0.12, 0.022);
      const r = 0.45 * gaussian(tInCycle, 0.20, 0.012);
      const s = -1.55 * gaussian(tInCycle, 0.26, 0.020);
      const t = 0.28 * gaussian(tInCycle, 0.46, 0.050);
      return p + r + s + t;
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // WPW Syndrome (Criteria: Short PR < 120ms, Delta wave, wide QRS)
  if (rhythm === "wpw_syndrome") {
    const p = 0.14 * gaussian(tInCycle, 0.08, 0.020);
    const delta = 0.55 * gaussian(tInCycle, 0.16, 0.030);
    let rAmp = 1.70;
    let sAmp = -0.30;
    if (normLead === "V1") {
      rAmp = 1.90;
      sAmp = -0.10;
    }
    const r = rAmp * gaussian(tInCycle, 0.23, 0.018);
    const s = sAmp * gaussian(tInCycle, 0.28, 0.022);
    const t = -0.35 * gaussian(tInCycle, 0.46, 0.055);
    return p + delta + r + s + t;
  }

  // Brugada Type 1 (Criteria: V1-V2 coved-type ST elevation >= 2mm into inverted T)
  if (rhythm === "brugada_type1") {
    if (normLead === "V1" || normLead === "V2") {
      const p = 0.10 * gaussian(tInCycle, 0.12, 0.020);
      const r = 0.95 * gaussian(tInCycle, 0.21, 0.016);
      const stCoved = 0.45 * gaussian(tInCycle, 0.30, 0.065); // Vòm Coved-type
      const tInv = -0.55 * gaussian(tInCycle, 0.45, 0.055); // T âm sâu
      return p + r + stCoved + tInv;
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // Pulmonary Embolism (Criteria: S1Q3T3, sinus tachycardia, anterior T inversion)
  if (rhythm === "pulmonary_embolism") {
    if (normLead === "DI" || normLead === "I") {
      const p = 0.14 * gaussian(tInCycle, 0.10, 0.020);
      const r = 1.25 * gaussian(tInCycle, 0.20, 0.014);
      const s1 = -0.75 * gaussian(tInCycle, 0.26, 0.022);
      const t = 0.30 * gaussian(tInCycle, 0.40, 0.050);
      return p + r + s1 + t;
    } else if (normLead === "DIII" || normLead === "III") {
      const p = 0.12 * gaussian(tInCycle, 0.10, 0.020);
      const q3 = -0.35 * gaussian(tInCycle, 0.19, 0.016);
      const r = 1.05 * gaussian(tInCycle, 0.22, 0.014);
      const t3 = -0.45 * gaussian(tInCycle, 0.42, 0.055);
      return p + q3 + r + t3;
    } else if (normLead === "DII" || normLead === "II") {
      const pPhe = 0.28 * gaussian(tInCycle, 0.10, 0.018);
      const r = 1.35 * gaussian(tInCycle, 0.21, 0.014);
      const t = 0.30 * gaussian(tInCycle, 0.42, 0.050);
      return pPhe + r + t;
    } else if (normLead === "V1" || normLead === "V2" || normLead === "V3") {
      const p = 0.12 * gaussian(tInCycle, 0.10, 0.020);
      const r = 0.70 * gaussian(tInCycle, 0.21, 0.014);
      const s = -0.90 * gaussian(tInCycle, 0.25, 0.020);
      const tInv = -0.45 * gaussian(tInCycle, 0.42, 0.050);
      return p + r + s + tInv;
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // Acute Pericarditis (Criteria: Diffuse concave ST elevation, PR depression, aVR reciprocal)
  if (rhythm === "acute_pericarditis") {
    if (normLead === "aVR") {
      const p = -0.12 * gaussian(tInCycle, 0.10, 0.020);
      const prElev = 0.08 * gaussian(tInCycle, 0.16, 0.035);
      const qrs = -1.25 * gaussian(tInCycle, 0.22, 0.015);
      const stDep = -0.15 * gaussian(tInCycle, 0.32, 0.060);
      const t = -0.28 * gaussian(tInCycle, 0.46, 0.050);
      return p + prElev + qrs + stDep + t;
    } else {
      const p = 0.14 * gaussian(tInCycle, 0.10, 0.020);
      const prDep = -0.09 * gaussian(tInCycle, 0.16, 0.035);
      const r = 1.45 * gaussian(tInCycle, 0.22, 0.015);
      const stConcave = 0.26 * gaussian(tInCycle, 0.32, 0.065);
      const t = 0.50 * gaussian(tInCycle, 0.46, 0.055);
      return p + prDep + r + stConcave + t;
    }
  }

  // Hypokalemia (Criteria: Flat T, prominent U wave in V2-V4, slight ST depression)
  if (rhythm === "hypokalemia") {
    if (normLead === "V2" || normLead === "V3" || normLead === "V4") {
      const p = 0.12 * gaussian(tInCycle, 0.12, 0.024);
      const r = 1.40 * gaussian(tInCycle, 0.22, 0.014);
      const stDep = -0.12 * gaussian(tInCycle, 0.32, 0.045);
      const tFlat = 0.08 * gaussian(tInCycle, 0.42, 0.035);
      const uWave = 0.35 * gaussian(tInCycle, 0.56, 0.045);
      return p + r + stDep + tFlat + uWave;
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // Digoxin Toxicity (Criteria: Scooped ST depression Salvador Dali, short QT)
  if (rhythm === "digoxin_toxicity") {
    if (normLead === "V5" || normLead === "V6" || normLead === "DII" || normLead === "II") {
      const p = 0.12 * gaussian(tInCycle, 0.12, 0.022);
      const r = 1.40 * gaussian(tInCycle, 0.22, 0.014);
      const stScoop = -0.30 * gaussian(tInCycle, 0.31, 0.060);
      const tDip = 0.14 * gaussian(tInCycle, 0.40, 0.035);
      return p + r + stScoop + tDip;
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // STEMI Lateral (Criteria: DI, aVL, V5-V6 ST elevation; DIII, aVF reciprocal depression)
  if (rhythm === "stemi_lateral") {
    if (normLead === "DI" || normLead === "I" || normLead === "aVL" || normLead === "V5" || normLead === "V6") {
      return (
        0.14 * gaussian(tInCycle, 0.12, 0.022) -
        0.20 * gaussian(tInCycle, 0.20, 0.012) +
        1.45 * gaussian(tInCycle, 0.22, 0.015) +
        0.32 * gaussian(tInCycle, 0.31, 0.060) +
        0.50 * gaussian(tInCycle, 0.46, 0.055)
      );
    } else if (normLead === "DIII" || normLead === "III" || normLead === "aVF") {
      return (
        0.12 * gaussian(tInCycle, 0.12, 0.022) +
        1.15 * gaussian(tInCycle, 0.22, 0.015) -
        0.20 * gaussian(tInCycle, 0.32, 0.055) -
        0.28 * gaussian(tInCycle, 0.46, 0.050)
      );
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // STEMI Posterior (Criteria: V1-V3 reciprocal ST depression, tall R, upright T)
  if (rhythm === "stemi_posterior") {
    if (normLead === "V1" || normLead === "V2" || normLead === "V3") {
      return (
        0.12 * gaussian(tInCycle, 0.12, 0.022) +
        1.85 * gaussian(tInCycle, 0.22, 0.016) -
        0.32 * gaussian(tInCycle, 0.32, 0.060) +
        0.65 * gaussian(tInCycle, 0.45, 0.055)
      );
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // NSTEMI / Subendocardial Ischemia (Criteria: Diffuse ST depression, ST elevation in aVR)
  if (rhythm === "nemi_subendocardial") {
    if (normLead === "aVR") {
      return (
        -0.12 * gaussian(tInCycle, 0.12, 0.022) -
        1.20 * gaussian(tInCycle, 0.22, 0.015) +
        0.22 * gaussian(tInCycle, 0.30, 0.055) -
        0.25 * gaussian(tInCycle, 0.44, 0.050)
      );
    } else if (normLead.startsWith("V") || normLead === "DII" || normLead === "II") {
      return (
        0.14 * gaussian(tInCycle, 0.12, 0.022) +
        1.40 * gaussian(tInCycle, 0.22, 0.014) -
        0.35 * gaussian(tInCycle, 0.32, 0.055) -
        0.40 * gaussian(tInCycle, 0.45, 0.050)
      );
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // LVH with Strain (Criteria: V5-V6 huge R, strain ST-T; V1-V2 deep S)
  if (rhythm === "lvh_strain") {
    if (normLead === "V5" || normLead === "V6" || normLead === "DI" || normLead === "aVL") {
      return (
        0.15 * gaussian(tInCycle, 0.12, 0.022) +
        2.65 * gaussian(tInCycle, 0.22, 0.016) -
        0.28 * gaussian(tInCycle, 0.32, 0.055) -
        0.55 * gaussian(tInCycle, 0.46, 0.055)
      );
    } else if (normLead === "V1" || normLead === "V2") {
      return (
        0.10 * gaussian(tInCycle, 0.12, 0.020) +
        0.35 * gaussian(tInCycle, 0.20, 0.012) -
        2.20 * gaussian(tInCycle, 0.25, 0.018) +
        0.35 * gaussian(tInCycle, 0.46, 0.050)
      );
    } else {
      return calculateSingleBeat(tInCycle, "normal", normLead);
    }
  }

  // Default normal sinus / sinus brady / sinus tachy
  return calculateSingleBeat(tInCycle, "normal", normLead);
}

function gaussian(t: number, mu: number, sigma: number): number {
  const diff = t - mu;
  return Math.exp(-(diff * diff) / (2 * sigma * sigma));
}

function calculateSingleBeat(t: number, type: "normal", leadId: string): number {
  let pAmp = 0.15;
  let qAmp = -0.15;
  let rAmp = 1.60;
  let sAmp = -0.35;
  let tAmp = 0.35;

  if (leadId === "aVR") {
    pAmp = -0.14;
    qAmp = 0.10;
    rAmp = -1.30;
    sAmp = 0.25;
    tAmp = -0.30;
  } else if (leadId === "V1") {
    rAmp = 0.65;
    sAmp = -1.10;
  } else if (leadId === "V5" || leadId === "V6") {
    rAmp = 1.85;
    sAmp = -0.20;
  }

  return (
    pAmp * gaussian(t, 0.12, 0.024) +
    qAmp * gaussian(t, 0.20, 0.010) +
    rAmp * gaussian(t, 0.22, 0.014) +
    sAmp * gaussian(t, 0.25, 0.015) +
    tAmp * gaussian(t, 0.46, 0.050)
  );
}

// ----------------------------------------------------
// Web Audio Beep Synthesizer for Heart Rate Monitor
// ----------------------------------------------------

let audioCtx: AudioContext | null = null;

export function playMonitorBeep(volume: number = 0.5, pitchHz: number = 880) {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(pitchHz, audioCtx.currentTime);

    // Beep envelope: Instant attack, fast decay (70ms)
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(volume * 0.25, audioCtx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.075);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } catch (err) {
    console.warn("Could not play monitor beep:", err);
  }
}
