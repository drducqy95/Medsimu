export interface WindowPreset {
  name: string;
  windowWidth: number; // WW
  windowLevel: number; // WL
  description: string;
}

export interface CtAnnotation {
  id: string;
  sliceIndex: number;
  xPercent: number; // 0-100%
  yPercent: number; // 0-100%
  label: string;
  expectedHU: number;
  finding: string;
}

export interface CtCase {
  id: string;
  title: string;
  organ: "brain" | "chest" | "abdomen";
  clinicalScenario: string;
  vitals: string;
  indication: string;
  totalSlices: number;
  sliceThickness: string;
  defaultSlice: number;
  keyFindingSliceRange: [number, number];
  windowPresets: WindowPreset[];
  annotations: CtAnnotation[];
  pathologySummary: string;
  clinicalAction: string;
}

export const CT_CASES: CtCase[] = [
  {
    id: "ct-brain-edh",
    title: "CT Sọ Não Cấp: Tụ Máu Ngoài Màng Cứng & Đè Lệch Đường Giữa",
    organ: "brain",
    clinicalScenario:
      "Bệnh nhân nam 26 tuổi, ngã xe máy đập đầu thái dương phải xuống đường, có khoảng tỉnh 2 giờ, sau đó lú lẫn, đồng tử phải giãn 4mm kém phản xạ ánh sáng, yếu nửa người trái (Glasgow 10 điểm).",
    vitals: "HA 160/95 mmHg, Mạch 52 l/p (Tam chứng Cushing), SpO2 97%",
    indication: "Nghi ngờ chấn thương sọ não nặng, theo dõi tụ máu ngoài màng cứng cấp tiến triển nhanh gây thoát vị não.",
    totalSlices: 20,
    sliceThickness: "5 mm",
    defaultSlice: 10,
    keyFindingSliceRange: [8, 14],
    windowPresets: [
      { name: "Nhu mô não (Brain)", windowWidth: 80, windowLevel: 40, description: "Phân biệt chất xám - chất trắng và khối tụ máu" },
      { name: "Dưới màng cứng (Subdural)", windowWidth: 150, windowLevel: 50, description: "Nhận diện ranh giới máu tụ sát bản sọ" },
      { name: "Cửa sổ xương (Bone)", windowWidth: 2500, windowLevel: 500, description: "Tìm đường nứt vỡ xương thái dương - đỉnh" },
    ],
    annotations: [
      {
        id: "edh-core",
        sliceIndex: 10,
        xPercent: 74,
        yPercent: 44,
        label: "Khối tụ máu ngoài màng cứng (EDH)",
        expectedHU: 75,
        finding: "Vùng tăng tỷ trọng hình thấu kính hai mặt lồi (biconvex) vùng thái dương phải, giới hạn bởi đường khớp sọ. Tỷ trọng +75 HU điển hình của máu tươi.",
      },
      {
        id: "midline-shift",
        sliceIndex: 10,
        xPercent: 50,
        yPercent: 48,
        label: "Đè lệch đường giữa (Midline Shift)",
        expectedHU: 38,
        finding: "Đường giữa bị đẩy lệch sang trái 7.5 mm. Não thất bên phải bị đè sụp hoàn toàn, dãn não thất bên trái do chèn ép dòng lưu thông DNT.",
      },
      {
        id: "bone-fracture",
        sliceIndex: 10,
        xPercent: 78,
        yPercent: 40,
        label: "Đường nứt xương sọ",
        expectedHU: 1100,
        finding: "Mất liên tục bản xương thái dương phải, tương ứng vị trí đi qua của rãnh động mạch màng não giữa.",
      },
    ],
    pathologySummary:
      "Tụ máu ngoài màng cứng (Epidural Hematoma) vùng thái dương phải kích thước lớn (độ dày 24 mm), tỷ trọng cao +75 HU, gây hiệu ứng khối rõ rệt: đè xẹp não thất bên cùng bên, đẩy lệch vách trong suốt sang trái 7.5 mm. Nứt xương thái dương phải kèm rách động mạch màng não giữa (MMA).",
    clinicalAction:
      "Báo động đỏ ngoại thần kinh phẫu thuật mở sọ giải áp khẩn cấp (Emergency Craniotomy). Truyền Mannitol 20% 1g/kg hạ áp lực nội sọ trong lúc chờ chuyển phòng mổ.",
  },
  {
    id: "ct-chest-pe",
    title: "CT Mạch Máu Phổi (CTPA): Thuyên Tắc Động Mạch Phổi Ngựa Yên (Saddle PE)",
    organ: "chest",
    clinicalScenario:
      "Bệnh nhân nữ 54 tuổi, sau phẫu thuật thay khớp háng 1 tuần xuất hiện khó thở đột ngột dữ dội, đau ngực kiểu màng phổi, thở nhanh nông, vã mồ hôi, tĩnh mạch cổ nổi.",
    vitals: "HA 90/60 mmHg, Mạch 128 l/p, SpO2 86% (khí trời), RR 32 l/p",
    indication: "Nghi ngờ thuyên tắc mạch phổi cấp nguy cơ cao (PESI nhóm V) có suy huyết động.",
    totalSlices: 20,
    sliceThickness: "1.25 mm",
    defaultSlice: 11,
    keyFindingSliceRange: [9, 13],
    windowPresets: [
      { name: "Trung thất / Mạch máu", windowWidth: 350, windowLevel: 40, description: "Đánh giá khuyết thuốc lòng động mạch phổi" },
      { name: "Cửa sổ nhu mô phổi", windowWidth: 1500, windowLevel: -600, description: "Phát hiện nhồi máu phổi hình chêm và tràn dịch" },
      { name: "Cửa sổ xương", windowWidth: 2000, windowLevel: 450, description: "Loại trừ chấn thương xương sườn" },
    ],
    annotations: [
      {
        id: "saddle-pe",
        sliceIndex: 11,
        xPercent: 51,
        yPercent: 46,
        label: "Huyết khối ngựa yên (Saddle PE)",
        expectedHU: 42,
        finding: "Khuyết thuốc cản quang lòng mạch tại ngã ba thân động mạch phổi, vắt ngang sang cả nhánh ĐM phổi phải và trái. HU vùng huyết khối ~40 HU so với thuốc cản quang ~320 HU.",
      },
      {
        id: "rv-strain",
        sliceIndex: 12,
        xPercent: 42,
        yPercent: 58,
        label: "Dãn thất phải (RV/LV ratio > 1.0)",
        expectedHU: 250,
        finding: "Buồng thất phải dãn lớn, tỷ lệ đường kính RV/LV = 1.3 (> 1.0), vách liên thất bị đẩy dẹt sang thất trái biểu hiện quá tải áp lực cấp.",
      },
      {
        id: "hampton-hump",
        sliceIndex: 14,
        xPercent: 24,
        yPercent: 62,
        label: "Nhồi máu phổi ngoại vi (Hampton's Hump)",
        expectedHU: 25,
        finding: "Vùng đông đặc hình nêm đáy quay ra màng phổi ở thùy dưới phổi phải do tắc mạch nuôi ngoại vi.",
      },
    ],
    pathologySummary:
      "Thuyên tắc huyết khối động mạch phổi cấp diện rộng kiểu ngựa yên (Saddle Embolism) làm tắc nghẽn thân chung và cả 2 nhánh chính ĐM phổi. Dấu hiệu căng dãn thất phải cấp (RV/LV > 1.0, vách liên thất dẹt), nhồi máu nhu mô phổi ngoại vi đáy phổi phải.",
    clinicalAction:
      "Thuyên tắc phổi nguy cơ tử vong cao có tụt huyết áp. Chỉ định dùng thuốc tiêu sợi huyết Alteplase (rtPA 50-100 mg truyền TM 2 giờ) hoặc can thiệp hút huyết khối qua catheter.",
  },
  {
    id: "ct-abdomen-appendicitis",
    title: "CT Bụng Chậu Có Thuốc: Viêm Ruột Thừa Cấp Biến Chứng Vỡ Mủ",
    organ: "abdomen",
    clinicalScenario:
      "Bệnh nhân nam 35 tuổi, đau âm ỉ quanh rốn sau 12 giờ khu trú về hố chậu phải, sốt 38.8°C, bụng gồng cứng vùng hố chậu phải, phản ứng thành bụng (+), bạch cầu 16.500/uL.",
    vitals: "HA 125/80 mmHg, Mạch 98 l/p, Thân nhiệt 38.8°C, SpO2 99%",
    indication: "Xác định chẩn đoán viêm ruột thừa, đánh giá biến chứng viêm phúc mạc hoặc áp xe hóa trước mổ.",
    totalSlices: 20,
    sliceThickness: "3 mm",
    defaultSlice: 13,
    keyFindingSliceRange: [11, 16],
    windowPresets: [
      { name: "Cửa sổ Nhu mô / Ổ bụng", windowWidth: 400, windowLevel: 40, description: "Quan sát ruột thừa, thâm nhiễm mỡ và dịch ổ bụng" },
      { name: "Cửa sổ Gan Mật", windowWidth: 150, windowLevel: 30, description: "Độ tương phản cao giữa dịch và mô" },
      { name: "Cửa sổ Khí / Phổi", windowWidth: 1200, windowLevel: -500, description: "Phát hiện bọt khí tự do ngoài lòng ruột (thủng tạng)" },
    ],
    annotations: [
      {
        id: "dilated-appendix",
        sliceIndex: 13,
        xPercent: 32,
        yPercent: 65,
        label: "Ruột thừa viêm dãn lớn",
        expectedHU: 55,
        finding: "Ruột thừa dãn đường kính ngang 12 mm (> 6 mm), thành dày 3.5 mm ngấm thuốc mạnh dạng viền. Lòng chứa dịch tăng tỷ trọng.",
      },
      {
        id: "appendicolith",
        sliceIndex: 13,
        xPercent: 34,
        yPercent: 62,
        label: "Sỏi phân kẹt cổ ruột thừa (Appendicolith)",
        expectedHU: 450,
        finding: "Nốt vôi hóa tăng tỷ trọng cao (+450 HU) gây tắc nghẽn hoàn toàn lỗ ruột thừa đổ vào manh tràng.",
      },
      {
        id: "fat-stranding",
        sliceIndex: 13,
        xPercent: 28,
        yPercent: 70,
        label: "Thâm nhiễm mỡ mạc treo & Dịch quanh ruột thừa",
        expectedHU: -40,
        finding: "Mô mỡ bình thường -110 HU bị mờ đục và thâm nhiễm tăng lên -40 HU, kèm vài bóng khí tự do li ti chứng tỏ đã có vi thủng thành ruột thừa.",
      },
    ],
    pathologySummary:
      "Viêm ruột thừa cấp do sỏi phân kẹt cổ ruột thừa, đường kính 12 mm, thành ngấm thuốc không đều. Biến chứng vi thủng mủ có bọt khí ngoài thành ruột thừa, thâm nhiễm mỡ mạc treo hố chậu phải nặng và dịch khu trú rãnh đại tràng phải.",
    clinicalAction:
      "Phẫu thuật cắt ruột thừa nội soi cấp cứu (Laparoscopic Appendectomy) kèm súc rửa dẫn lưu ổ bụng. Nhịn ăn uống, bù dịch Ringer Lactate, kháng sinh phổ rộng TM (Ceftriaxone + Metronidazole).",
  },
];
