export interface XrayCase {
  id: string;
  title: string;
  modality: "CXR" | "AXR" | "BONE";
  summary: string;
  patientInfo: {
    age: number;
    gender: "Nam" | "Nữ";
    chiefComplaint: string;
  };
  keyFindings: string[];
  radiologyReport: string;
  anatomicalHighlights: {
    label: string;
    description: string;
    color: string;
    coords: { x: number; y: number; width?: number; height?: number };
  }[];
  pathologyHighlights: {
    label: string;
    description: string;
    color: string;
    box: { x: number; y: number; width: number; height: number };
  }[];
  teachingPoints: string[];
}

export const XRAY_CASES: XrayCase[] = [
  {
    id: "lobar_pneumonia",
    title: "X-Quang Ngực Thẳng: Viêm Phổi Thùy Dưới Phải",
    modality: "CXR",
    summary: "Đám mờ đông đặc đồng nhất thùy dưới phổi phải, có hình ảnh phế quản hơi (Air Bronchogram), vòm hoành phải vẫn nhìn rõ (không xóa mờ bờ tim phải).",
    patientInfo: {
      age: 46,
      gender: "Nam",
      chiefComplaint: "Sốt cao rét run 39°C, ho khạc đờm màu rỉ sắt, đau ngực kiểu màng phổi bên phải khi hít sâu.",
    },
    keyFindings: [
      "Đám mờ đồng nhất đậm độ mô mềm ở vùng đáy phổi phải (thùy dưới).",
      "Dấu hiệu phế quản hơi (Air Bronchogram): Các nhánh phế quản chứa khí màu đen nổi bật trên nền phế nang đông đặc mủ màu trắng.",
      "Góc sườn hoành phải nhọn, bờ tim phải rõ nét (Dấu hiệu bóng mờ Silhouette âm tính -> tổn thương ở thùy dưới, không phải thùy giữa).",
    ],
    radiologyReport: "Hình ảnh X-quang ngực thẳng tư thế sau-trước (PA): Đám mờ đông đặc thùy dưới phổi phải kèm dấu hiệu phế quản hơi, không có tràn dịch màng phổi hay tràn khí. Bóng tim kích thước bình thường (CTR = 0.44). Kết luận: Viêm phổi thùy dưới phổi phải.",
    anatomicalHighlights: [
      { label: "Bóng tim", description: "Bóng tim bình thường, CTR = 0.44", color: "#38bdf8", coords: { x: 340, y: 320, width: 140, height: 160 } },
      { label: "Vòm hoành P", description: "Vòm hoành phải cao hơn vòm hoành trái 1.5cm (bình thường)", color: "#4ade80", coords: { x: 260, y: 480 } },
      { label: "Góc sườn hoành P", description: "Góc sườn hoành phải sáng nhọn bình thường", color: "#a855f7", coords: { x: 160, y: 490 } },
    ],
    pathologyHighlights: [
      {
        label: "Đông đặc thùy dưới phổi phải",
        description: "Vùng đông đặc phế nang chứa dịch viêm xuất tiết, phế quản hơi rõ",
        color: "#f59e0b",
        box: { x: 190, y: 360, width: 150, height: 130 },
      },
    ],
    teachingPoints: [
      "Dấu hiệu bóng mờ (Silhouette Sign): Nếu tổn thương nằm ở thùy giữa phổi phải sẽ xóa mờ bờ tim phải; nếu nằm ở thùy dưới sẽ KHÔNG xóa mờ bờ tim phải.",
      "Hình ảnh phế quản hơi là bằng chứng chắc chắn của đông đặc phế nang (viêm phổi, phù phổi).",
    ],
  },
  {
    id: "pleural_effusion",
    title: "X-Quang Ngực Thẳng: Tràn Dịch Màng Phổi Trái Lượng Vừa",
    modality: "CXR",
    summary: "Mờ đồng nhất đáy phổi trái làm tù góc sườn hoành trái, có đường cong giới hạn trên lồi lên trên và ra ngoài (Đường cong Damoiseau / Meniscus Sign).",
    patientInfo: {
      age: 62,
      gender: "Nữ",
      chiefComplaint: "Khó thở tăng dần khi nằm, sốt nhẹ về chiều, đau tức âm ỉ ngực trái 2 tuần.",
    },
    keyFindings: [
      "Mờ đồng nhất vùng thấp đáy phổi trái, mất hoàn toàn góc sườn hoành trái và xóa mờ vòm hoành trái.",
      "Đường cong Damoiseau (Meniscus Sign): Mặt trên của đám mờ cong lõm hướng lên trên và chếch ra ngoài thành ngực.",
      "Trung thất không bị đẩy lệch (lượng dịch mức độ trung bình khoảng 500 - 800ml).",
    ],
    radiologyReport: "Hình ảnh X-quang ngực thẳng tư thế đứng: Mờ đồng nhất góc sườn hoành và đáy phổi trái dạng đường cong Damoiseau. Phổi phải thông khí tốt, không thấy tổn thương khu trú. Bóng tim không to. Kết luận: Tràn dịch màng phổi trái lượng vừa.",
    anatomicalHighlights: [
      { label: "Góc sườn hoành P", description: "Bình thường, sáng nhọn", color: "#4ade80", coords: { x: 160, y: 490 } },
      { label: "Khí quản", description: "Đường thở nằm chính giữa, không bị xô lệch", color: "#38bdf8", coords: { x: 395, y: 150 } },
    ],
    pathologyHighlights: [
      {
        label: "Tràn dịch màng phổi trái (Đường cong Damoiseau)",
        description: "Dịch tự do khoang màng phổi đọng ở vùng thấp, kéo cong chếch lên nách",
        color: "#06b6d4",
        box: { x: 440, y: 350, width: 170, height: 160 },
      },
    ],
    teachingPoints: [
      "Cần ít nhất 175 - 200ml dịch trên phim ngực thẳng tư thế đứng để thấy rõ dấu hiệu tù góc sườn hoành.",
      "Nếu lượng dịch lớn (> 1500ml) sẽ gây mờ toàn bộ một bên phế trường và đẩy lệch trung thất sang bên đối diện.",
    ],
  },
  {
    id: "pneumothorax_tension",
    title: "X-Quang Ngực Thẳng: Tràn Khí Màng Phổi Phải Áp Lực",
    modality: "CXR",
    summary: "Phế trường phải sáng vô mạch hoàn toàn, đường màng phổi lá tạng co rúm về rốn phổi, đẩy lệch khí quản và tim sang bên trái. Cấp cứu tối khẩn!",
    patientInfo: {
      age: 23,
      gender: "Nam",
      chiefComplaint: "Đau nhói ngực phải đột ngột dữ dội sau khi mang vác nặng, khó thở tím tái, huyết áp tụt 80/50 mmHg.",
    },
    keyFindings: [
      "Phế trường phải tăng sáng vô mạch hoàn toàn (không thấy mạch máu phổi chạy ra ngoại vi).",
      "Đường bờ màng phổi lá tạng (Visceral Pleural Line) màu trắng mảnh phân cách giữa nhu mô phổi bị xẹp và khoang khí màng phổi.",
      "Nhu mô phổi phải bị ép co rúm lại thành một khối nhỏ ở rốn phổi.",
      "Đẩy lệch khí quản và bóng tim dữ dội sang bên trái -> Tràn khí màng phổi áp lực (Tension Pneumothorax) chèn ép tĩnh mạch chủ dưới!",
    ],
    radiologyReport: "Cấp cứu tối khẩn: Tràn khí màng phổi phải lượng nhiều, xẹp toàn bộ phổi phải, đè bẹp và đẩy lệch trung thất, tim và khí quản sang trái. Kết luận: Tràn khí màng phổi phải áp lực.",
    anatomicalHighlights: [
      { label: "Khí quản lệch T", description: "Bị đẩy lệch mạnh sang trái do áp lực dương khoang ngực phải", color: "#f43f5e", coords: { x: 440, y: 150 } },
      { label: "Bóng tim lệch T", description: "Bị đẩy dạt hoàn toàn sang phế trường trái", color: "#f43f5e", coords: { x: 450, y: 340 } },
    ],
    pathologyHighlights: [
      {
        label: "Khoang khí tăng sáng vô mạch & Nhu mô phổi xẹp",
        description: "Khí tự do áp lực cao, không có vân phổi, lá tạng co rúm",
        color: "#ef4444",
        box: { x: 130, y: 180, width: 240, height: 320 },
      },
    ],
    teachingPoints: [
      "Trong tràn khí màng phổi áp lực: KHÔNG được chờ chụp phim X-quang nếu đã có triệu chứng lâm sàng tụt huyết áp và mất thông khí -> Phải chọc kim giải áp khoang liên sườn 2 ngay lập tức!",
      "Nhận diện đường màng phổi lá tạng là tiêu chuẩn vàng phân biệt với bóng khí phế thũng khổng lồ.",
    ],
  },
  {
    id: "pneumoperitoneum",
    title: "X-Quang Bụng Đứng: Liềm Hơi Dưới Cơ Hoành (Thủng Tạng Rỗng)",
    modality: "AXR",
    summary: "Liềm hơi màu đen hình bán nguyệt nằm ngay dưới vòm hoành phải (giữa vòm hoành và bao gan). Dấu hiệu kinh điển của thủng ổ loét dạ dày - tá tràng.",
    patientInfo: {
      age: 52,
      gender: "Nam",
      chiefComplaint: "Đau bụng đột ngột dữ dội như dao đâm vùng thượng vị 3 giờ trước, bụng gồng cứng như gỗ.",
    },
    keyFindings: [
      "Dải sáng màu đen (khí tự do) hình liềm nằm ngăn cách giữa vòm hoành phải và bóng gan.",
      "Thành vòm hoành mỏng và sắc nét.",
      "Dấu hiệu Rigler (dấu hiệu 2 thành ruột) có thể thấy khi lượng khí nhiều.",
    ],
    radiologyReport: "Hình ảnh X-quang bụng không sửa soạn tư thế đứng: Khí tự do dưới vòm hoành phải dạng liềm hơi sắc nét. Không thấy mức nước hơi tắc ruột. Kết luận: Thủng tạng rỗng (nghi thủng dạ dày tá tràng). Chỉ định phẫu thuật cấp cứu.",
    anatomicalHighlights: [
      { label: "Vòm hoành phải", description: "Bình thường áp sát mặt trên gan", color: "#4ade80", coords: { x: 300, y: 220 } },
    ],
    pathologyHighlights: [
      {
        label: "Liềm hơi dưới vòm hoành phải",
        description: "Khí tự do từ dạ dày/ruột thoát ra đọng ở vị trí cao nhất ổ bụng khi đứng",
        color: "#f59e0b",
        box: { x: 230, y: 190, width: 170, height: 50 },
      },
    ],
    teachingPoints: [
      "Chụp bụng đứng hoặc ngực đứng là tư thế tốt nhất để phát hiện liềm hơi (chỉ cần 1-2ml khí tự do là đã có thể nhìn thấy).",
      "Nếu bệnh nhân quá yếu không đứng được: Chụp tư thế nằm nghiêng trái tia chiếu ngang (Left Lateral Decubitus) để tìm khí đọng giữa gan và thành bụng.",
    ],
  },
];
