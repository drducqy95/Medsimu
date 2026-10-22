export type UltrasoundZone =
  | "subxiphoid"
  | "ruq"
  | "luq"
  | "suprapubic"
  | "lung_anterior";

export type ProbeType = "convex" | "phased_array" | "linear";

export interface UltrasoundZoneDefinition {
  id: UltrasoundZone;
  name: string;
  recommendedProbe: ProbeType;
  bodyTarget: { x: number; y: number; z: number }; // Relative position on 3D torso
  normalDescription: string;
  pathologyDescription: string;
  anatomicalStructures: string[];
  clinicalSignificance: string;
}

export const ULTRASOUND_ZONES: UltrasoundZoneDefinition[] = [
  {
    id: "subxiphoid",
    name: "Dưới Mũi Ức (Subxiphoid 4-Chamber View)",
    recommendedProbe: "phased_array",
    bodyTarget: { x: 0, y: 120, z: 20 },
    normalDescription: "Thùy gan trái làm cửa sổ âm học, thấy rõ 4 buồng tim. Tâm thất phải nằm sát đầu dò nhất. Không có dịch màng ngoài tim, cơ tim co bóp nhịp nhàng.",
    pathologyDescription: "Tràn dịch màng ngoài tim (Pericardial Effusion): Xuất hiện dải dịch đen (Echo trống) bao bọc xung quanh cơ tim. Khi có chèn ép tim cấp (Tamponade), thành thất phải bị đè sụp trong thì tâm trương.",
    anatomicalStructures: ["Thùy gan trái", "Tâm thất phải (RV)", "Tâm thất trái (LV)", "Tâm nhĩ phải (RA)", "Tâm nhĩ trái (LA)", "Màng ngoài tim"],
    clinicalSignificance: "Phát hiện nhanh tràn máu màng tim trong vết thương thấu ngực hoặc viêm màng ngoài tim cấp gây ép tim.",
  },
  {
    id: "ruq",
    name: "Hạ Sườn Phải (RUQ - Khoang Morison)",
    recommendedProbe: "convex",
    bodyTarget: { x: -80, y: 170, z: 15 },
    normalDescription: "Giao diện giữa bao gan và bao thận phải (Khoang Morison) áp sát nhau, không có lớp dịch ngăn cách. Nhu mô gan mịn, thận có xoang thận tăng âm.",
    pathologyDescription: "Tràn máu ổ bụng (Hemoperitoneum): Dải dịch màu đen (Echo trống) len lỏi giữa bao gan và thận phải tại đáy khoang Morison do rách vỡ gan hoặc chấn thương bụng.",
    anatomicalStructures: ["Nhu mô gan", "Bao gan (Glisson)", "Thận phải", "Khoang Morison", "Vòm hoành phải"],
    clinicalSignificance: "Khoang Morison là vị trí trũng nhất của khoang phúc mạc khi nằm ngửa, nơi phát hiện dịch tự do sớm nhất.",
  },
  {
    id: "luq",
    name: "Hạ Sườn Trái (LUQ - Khoang Lách Thận)",
    recommendedProbe: "convex",
    bodyTarget: { x: 80, y: 170, z: 15 },
    normalDescription: "Nhu mô lách tăng âm vừa, cực trên thận trái áp sát lách. Vòm hoành trái liên tục, không có dịch tự do khoang lách thận.",
    pathologyDescription: "Vỡ lách xuất huyết nội: Dải dịch đen đọng quanh bao lách và cực trên thận trái, có thể thấy khối tụ máu dưới bao lách bờ không đều.",
    anatomicalStructures: ["Nhu mô lách", "Cực trên thận trái", "Khoang lách - thận", "Góc sườn hoành trái"],
    clinicalSignificance: "Lách là tạng đặc dễ bị tổn thương nhất trong chấn thương bụng kín (tai nạn giao thông, ngã cao).",
  },
  {
    id: "suprapubic",
    name: "Hạ Vị (Suprapubic View - Vùng Trên Xương Mu)",
    recommendedProbe: "convex",
    bodyTarget: { x: 0, y: 320, z: 25 },
    normalDescription: "Bàng quang căng nước tiểu tạo thành khối echo trống hình thang hoặc tròn. Phía sau bàng quang thành ruột trơn láng, không có dịch tự do.",
    pathologyDescription: "Dịch tự do túi cùng Douglas: Máu hoặc dịch đọng ở khoang sau bàng quang (túi cùng trực tràng - bàng quang ở nam hoặc túi cùng Douglas ở nữ).",
    anatomicalStructures: ["Bàng quang căng nước tiểu", "Túi cùng Douglas", "Tuyến tiền liệt / Tử cung", "Thành trực tràng"],
    clinicalSignificance: "Vị trí trũng thứ hai của ổ bụng, phát hiện tràn dịch tiểu khung trong xuất huyết nội hoặc vỡ tạng rỗng.",
  },
  {
    id: "lung_anterior",
    name: "Màng Phổi Trước (Lung POCUS - Khe Gian Sườn 2-3)",
    recommendedProbe: "linear",
    bodyTarget: { x: -50, y: 50, z: 25 },
    normalDescription: "Thấy 2 bóng xương sườn kèm bóng lưng âm đen. Đường màng phổi màu trắng sáng lấp lánh dấu trượt màng phổi (Lung Sliding) theo nhịp thở. Các đường A-line nằm ngang song song.",
    pathologyDescription: "Tràn khí màng phổi (Pneumothorax): Không khí ngăn cách lá tạng và lá thành làm MẤT HOÀN TOÀN dấu trượt màng phổi. Trên M-Mode xuất hiện dấu mã vạch (Barcode Sign). Ngược lại trong Phù phổi cấp xuất hiện nhiều đường B-line dày đặc (đuôi sao chổi).",
    anatomicalStructures: ["Cơ liên sườn", "Bóng xương sườn (Echo dày + Bóng lưng)", "Đường màng phổi (Pleural line)", "Nhu mô phổi"],
    clinicalSignificance: "Loại trừ hoặc xác định ngay lập tức tràn khí màng phổi áp lực hoặc phù phổi cấp trong vòng 30 giây.",
  },
];
