export interface DoctorSkill {
  id: string;
  name: string;
  category: "diagnostics" | "pharmacology" | "procedures" | "resuscitation";
  tier: 1 | 2 | 3 | 4;
  xpCost: number;
  description: string;
  clinicalBenefit: string;
  prerequisites: string[];
}

export const DOCTOR_SKILL_TREE: DoctorSkill[] = [
  // Tier 1
  {
    id: "basic_ecg_reading",
    name: "Nhận Diện Sóng ECG Căn Bản",
    category: "diagnostics",
    tier: 1,
    xpCost: 150,
    description: "Đọc chuẩn các chuyển đạo DII, V1-V6, phát hiện nhịp nhanh xoang, nhịp chậm xoang và ngoại tâm thu.",
    clinicalBenefit: "Tự động hiển thị đường đo Caliper thời gian và điện thế trên màn hình ECG.",
    prerequisites: [],
  },
  {
    id: "pocus_fundamentals",
    name: "Siêu Âm POCUS Cơ Bản",
    category: "diagnostics",
    tier: 1,
    xpCost: 200,
    description: "Nhận biết các mặt cắt chuẩn dưới mũi ức, khoang Morison và màng phổi.",
    clinicalBenefit: "Hiển thị khung hướng dẫn căn chỉnh góc đầu dò siêu âm 3D tối ưu.",
    prerequisites: [],
  },

  // Tier 2
  {
    id: "fast_protocol_mastery",
    name: "Làm Chủ Quy Trình FAST Cấp Cứu",
    category: "diagnostics",
    tier: 2,
    xpCost: 500,
    description: "Khảo sát siêu âm 5 vị trí phát hiện tràn dịch màng ngoài tim và máu ổ bụng trong vòng 60 giây.",
    clinicalBenefit: "Mở khóa checklist 5 cửa sổ FAST tự động ghi nhận tổn thương.",
    prerequisites: ["pocus_fundamentals"],
  },
  {
    id: "rapid_pharmacology",
    name: "Dược Lý Cấp Cứu Phản Ứng Nhanh",
    category: "pharmacology",
    tier: 2,
    xpCost: 600,
    description: "Nắm vững liều lượng và đường dùng của Adrenalin, Aspirin, Heparin, Morphin trong cấp cứu.",
    clinicalBenefit: "Rút ngắn 30% thời gian khởi phát tác dụng thuốc trên sinh hiệu người bệnh.",
    prerequisites: [],
  },

  // Tier 3
  {
    id: "ct_multi_slice_reading",
    name: "Phân Tích Lát Cắt CT-Scanner Đa Dãy",
    category: "diagnostics",
    tier: 3,
    xpCost: 1000,
    description: "Đo chuẩn tỷ trọng đơn vị Hounsfield (HU), phân biệt máu tụ cấp (+75 HU) và nhồi máu não.",
    clinicalBenefit: "Tự động gắn cờ các lát cắt có tổn thương bệnh lý nguy hiểm.",
    prerequisites: ["basic_ecg_reading"],
  },
  {
    id: "advanced_airway",
    name: "Kiểm Soát Đường Thở Nâng Cao (RSI)",
    category: "procedures",
    tier: 3,
    xpCost: 1200,
    description: "Thành thạo quy trình đặt ống nội khí quản trình tự nhanh (RSI) và chọc kim giải áp màng phổi.",
    clinicalBenefit: "Ngăn chặn tụt oxy não khi bệnh nhân hôn mê Glasgow <= 8 điểm.",
    prerequisites: ["rapid_pharmacology"],
  },

  // Tier 4
  {
    id: "golden_hour_resuscitation",
    name: "Bản Lĩnh Hồi Sức Thời Gian Vàng",
    category: "resuscitation",
    tier: 4,
    xpCost: 2000,
    description: "Khả năng phối hợp đa cơ quan trong tình huống cấp cứu ngừng tuần hoàn (Code Blue) phức tạp.",
    clinicalBenefit: "Tăng 50% cơ hội tái lập tuần hoàn tự nhiên (ROSC) khi sốc điện hoặc ép tim CPR.",
    prerequisites: ["advanced_airway", "fast_protocol_mastery"],
  },
  {
    id: "contraindication_shield",
    name: "Lá Chắn An Toàn Người Bệnh (Safety Shield)",
    category: "pharmacology",
    tier: 4,
    xpCost: 2500,
    description: "Hệ miễn dịch số phát hiện và cảnh báo trước mọi nguy cơ chống chỉ định chết người.",
    clinicalBenefit: "Hiển thị cảnh báo trực quan trước khi xác nhận các y lệnh có thể gây tụt huyết áp trụy mạch.",
    prerequisites: ["rapid_pharmacology"],
  },
];
