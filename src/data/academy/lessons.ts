import { MedicalLesson } from "@/domain/academy/types";

export const MEDICAL_LESSONS: MedicalLesson[] = [
  {
    id: "stemi",
    title: "Nhồi Máu Cơ Tim Cấp ST Chênh Lên (STEMI)",
    specialty: "cardiology",
    category: "emergency_protocol",
    readTimeMinutes: 7,
    summary: "Hội chứng vành cấp do mảng xơ vữa nứt vỡ hình thành huyết khối gây tắc nghẽn hoàn toàn động mạch vành cấp tính. Cần can thiệp tái tưới máu trong thời gian vàng 120 phút.",
    pathophysiology: {
      mechanism: "Nứt vỡ mảng xơ vữa mạch vành làm lộ lớp dưới nội mạc, tiểu cầu bám dính và ngưng tập tạo nút tiểu cầu, kích hoạt dòng thác đông máu hình thành cục máu đông giàu Fibrin làm tắc nghẽn 100% dòng máu nuôi dưỡng cơ tim.",
      keyHormonesOrReceptors: ["Glycoprotein IIb/IIIa", "Thromboxane A2", "Adenosine Diphosphate (ADP)", "Troponin I / T"],
      hemodynamicChanges: "Thiếu máu cơ tim xuyên thành dẫn đến rối loạn chức năng tâm trương và tâm thu thất trái. Cung lượng tim (CO) giảm, áp lực cuối tâm trương thất trái (LVEDP) tăng, nguy cơ phù phổi cấp hoặc sốc tim.",
    },
    clinicalPresentation: {
      chiefComplaints: [
        "Đau thắt ngực dữ dội sau xương ức kiểu bóp nghẹt, đè nặng, lan lên hàm dưới, vai trái và mặt trong cánh tay trái.",
        "Kéo dài trên 20-30 phút, không đỡ khi nghỉ ngơi hoặc ngậm Nitroglycerin.",
        "Kèm theo vã mồ hôi lạnh, khó thở, buồn nôn, cảm giác sợ chết.",
      ],
      physicalFindings: [
        "Huyết áp có thể tăng do kích thích giao cảm hoặc tụt nếu có biến chứng sốc tim.",
        "Nghe tim có thể có tiếng T3, T4, tiếng thổi tâm thu mới xuất hiện nếu hở van 2 lá do đứt cột cơ.",
        "Phổi có thể có ran ẩm 2 đáy nếu có suy tim trái cấp (Killip II-III).",
      ],
      redFlags: [
        "Tụt huyết áp (HA tâm thu < 90 mmHg) hoặc mạch chậm < 50 bpm (dấu hiệu nhồi máu thất phải hoặc block nhĩ thất hoàn toàn).",
        "Khó thở dữ dội, ran ẩm dâng nhanh 2 phế trường (phù phổi cấp - Killip III).",
        "Rối loạn nhịp thất nguy hiểm: Nhanh thất (VT), Rung thất (VF).",
      ],
    },
    diagnosticCriteria: {
      goldStandard: "Điện tâm đồ 12 chuyển đạo ghi trong vòng 10 phút đầu tiên khi tiếp cận bệnh nhân.",
      ecgFindings: "ST chênh lên dạng vòm tại điểm J ở ít nhất 2 chuyển đạo liên tiếp: >= 1mm ở các chuyển đạo ngoại biên (DII, DIII, aVF trong STEMI thành dưới; DI, aVL trong STEMI thành bên); >= 2mm ở V1-V3 (nam) hoặc >= 1.5mm (nữ). Hình ảnh soi gương ST chênh xuống đối xứng.",
      imagingFindings: "Siêu âm tim cấp: Rối loạn vận động vùng cơ tim tương ứng vùng cấp máu động mạch vành bị tắc; đánh giá phân suất tống máu EF và chức năng thất phải.",
      labMarkers: ["Troponin I / T siêu nhạy (hs-cTn) tăng cao gấp nhiều lần giới hạn bình thường trên", "CK-MB", "Điện giải đồ, Men gan, Creatinin máu"],
    },
    managementSummary: {
      immediateSteps: [
        "Thở oxy nếu SpO2 < 90% (không chỉ định thường quy nếu SpO2 >= 90%).",
        "Aspirin nhai ngay lập tức liều nạp 300mg + Kháng kết tập tiểu cầu thứ 2 (Clopidogrel 300-600mg hoặc Ticagrelor 180mg).",
        "Giảm đau bằng Morphin Sulfat 2-4mg tiêm tĩnh mạch chậm nếu đau ngực dữ dội.",
        "Chống đông toàn thân bằng Heparin không phân đoạn hoặc Enoxaparin tiêm tĩnh mạch.",
        "Kích hoạt phòng Can thiệp Mạch vành (Cathlab) để can thiệp PCI thì đầu trong vòng 90-120 phút.",
      ],
      firstLineDrugs: ["Aspirin", "Clopidogrel", "Heparin", "Morphin", "Nitroglycerin"],
      contraindicatedInterventions: [
        "TUYỆT ĐỐI KHÔNG dùng Nitroglycerin nếu nghi ngờ nhồi máu thất phải (STEMI DII, DIII, aVF có ST chênh lên ở V4R) hoặc huyết áp tâm thu < 90 mmHg.",
        "Không dùng thuốc ức chế men chuyển (ACEi) hoặc Chẹn Beta trong giai đoạn cấp nếu bệnh nhân đang có dấu hiệu tụt huyết áp hoặc suy tim mất bù.",
      ],
    },
    relatedDrugIds: ["aspirin", "clopidogrel", "heparin", "morphin", "nitroglycerin"],
  },
  {
    id: "acute_asthma",
    title: "Cơn Hen Phế Quản Cấp Mức Độ Nặng",
    specialty: "pulmonology",
    category: "emergency_protocol",
    readTimeMinutes: 6,
    summary: "Viêm mạn tính đường thở bùng phát đợt cấp với co thắt cơ trơn phế quản, phù nề niêm mạc và ứ đọng đờm nhầy gây tắc nghẽn đường dẫn khí nguy kịch.",
    pathophysiology: {
      mechanism: "Các dị nguyên hoặc kích thích kích hoạt tế bào Mast và bạch cầu ái toan giải phóng Histamin, Leukotrienes (LTC4, LTD4, LTE4) gây co thắt dữ dội cơ trơn phế quản, tăng tính thấm mao mạch gây phù nề phế quản và tăng tiết dịch nhầy đặc quánh.",
      keyHormonesOrReceptors: ["Thụ thể Beta-2 Adrenergic", "Thụ thể Muscarinic M3", "Leukotriene Receptors", "IgE"],
      hemodynamicChanges: "Bẫy khí phế nang (Air trapping) làm tăng áp lực trong lồng ngực, tăng hậu tải thất phải, giảm hồi lưu tĩnh mạch về tim, dẫn đến mạch nghịch đảo (Pulsus paradoxus) giảm huyết áp > 10 mmHg khi hít vào.",
    },
    clinicalPresentation: {
      chiefComplaints: [
        "Khó thở dữ dội thì thở ra, tiếng thở rít ran khò khè nghe từ xa.",
        "Phải ngồi chồm hổm ra phía trước để thở (Orthopnea), nói từng từ ngắt quãng, không thể nói hết một câu.",
        "Cảm giác ngực bị bóp nghẹt, ho khan hoặc khạc đờm trắng dính khó khạc.",
      ],
      physicalFindings: [
        "Nhịp thở nhanh > 30 lần/phút, co kéo cơ hô hấp phụ (cơ ức đòn chũm, rút lõm hõm ức, co kéo khoang gian sườn).",
        "Nghe phổi: Ran rít, ran ngáy lan tỏa khắp 2 phế trường cả 2 thì.",
        "Mạch nhanh > 120 bpm, vã mồ hôi, SpO2 thường < 90%.",
      ],
      redFlags: [
        "Phổi im lặng (Silent Chest): Hoàn toàn không còn nghe tiếng ran hay rì rào phế nang do đường thở bị co thắt tắc nghẽn gần như tuyệt đối -> Dấu hiệu ngừng thở sắp xảy ra!",
        "Tri giác u ám, li bì, lú lẫn do ứ trệ CO2 máu và thiếu oxy não.",
        "Hô hấp nghịch đảo ngực - bụng, nhịp thở chậm dần < 12 lần/phút do kiệt sức cơ hô hấp.",
      ],
    },
    diagnosticCriteria: {
      goldStandard: "Lâm sàng cấp tính kèm đo Lưu lượng đỉnh (PEF < 50% giá trị dự đoán) và Khí máu động mạch.",
      ecgFindings: "Nhịp nhanh xoang, dấu hiệu tâm phế cấp: S1Q3T3, P phế (sóng P cao nhọn > 2.5mm ở DII).",
      imagingFindings: "X-quang ngực thẳng: Lồng ngực căng phồng hình thùng, các xương sườn nằm ngang dãn rộng khoảng liên sườn, vòm hoành hạ thấp và dẹt, tăng sáng 2 phế trường.",
      labMarkers: ["Khí máu động mạch (ABG): Giai đoạn đầu PaO2 giảm, PaCO2 giảm do thở nhanh. Giai đoạn nặng PaCO2 bình thường hoặc tăng (dấu hiệu kiệt sức nguy kịch)", "Lưu lượng đỉnh PEF"],
    },
    managementSummary: {
      immediateSteps: [
        "Thở oxy qua mặt nạ hoặc kính mũi duy trì SpO2 mục tiêu 93 - 95%.",
        "Khí dung Salbutamol 5mg phối hợp Ipratropium Bromide 0.5mg liên tục mỗi 20 phút trong giờ đầu tiên.",
        "Corticoid toàn thân ngay lập tức: Methylprednisolon 40-80mg tiêm tĩnh mạch.",
        "Nếu đáp ứng kém sau 3 lần khí dung: Truyền tĩnh mạch Magie Sulfat 2g trong 20 phút.",
        "Chuẩn bị đặt nội khí quản nếu có phổi câm, kiệt sức thở, PaCO2 tăng cao.",
      ],
      firstLineDrugs: ["Salbutamol", "Ipratropium", "Methylprednisolon", "Magie Sulfat", "Adrenalin"],
      contraindicatedInterventions: [
        "CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI thuốc an thần gây ức chế hô hấp (Morphin, Benzodiazepin) khi chưa đặt nội khí quản.",
        "Tuyệt đối không dùng thuốc chẹn Beta giao cảm (kể cả chọn lọc hay không chọn lọc).",
      ],
    },
    relatedDrugIds: ["salbutamol", "ipratropium", "methylprednisolon", "adrenalin"],
  },
  {
    id: "anaphylaxis",
    title: "Sốc Phản Vệ Độ III Nguy Kịch",
    specialty: "emergency",
    category: "emergency_protocol",
    readTimeMinutes: 5,
    summary: "Phản ứng dị ứng cấp tính toàn thân qua trung gian IgE đe dọa trực tiếp tính mạng do giãn mạch ồ ạt và phù nề đường thở cấp tính. Adrenalin tiêm bắp là thuốc cứu mạng duy nhất phải dùng ngay lập tức.",
    pathophysiology: {
      mechanism: "Dị nguyên liên kết chéo với các phân tử IgE đặc hiệu trên bề mặt tế bào Mast và bạch cầu kiềm, giải phóng ồ ạt các hóa chất trung gian: Histamin, Tryptase, Prostaglandin D2, Leukotrienes. Gây giãn tiểu động mạch và tĩnh mạch toàn thân, tăng tính thấm thành mạch thoát huyết tương làm tụt huyết áp sốc thể tích tuần hoàn và phù nề thanh quản.",
      keyHormonesOrReceptors: ["Thụ thể H1, H2 Histamin", "Thụ thể Alpha-1, Beta-1, Beta-2 Adrenergic"],
      hemodynamicChanges: "Giãn mạch hệ thống làm kháng lực mạch ngoại biên (SVR) tụt dốc thảm hại. Thoát dịch vào khoang gian bào làm giảm thể tích tuần hoàn hiệu dụng tới 35% trong vòng 10 phút. Cung lượng tim giảm, tưới máu tạng sụp đổ.",
    },
    clinicalPresentation: {
      chiefComplaints: [
        "Xuất hiện đột ngột trong vòng vài phút đến vài giờ sau khi tiếp xúc dị nguyên (thuốc tiêm, thức ăn, ong đốt).",
        "Cảm giác nghẹt cổ họng, khàn tiếng, nuốt nghẹn, thở rít thanh quản (Stridor), thở khò khè.",
        "Chóng mặt hoa mắt, xây xẩm, ngất xỉu, vã mồ hôi, da nổi mày đay ngứa ngáy dữ dội.",
      ],
      physicalFindings: [
        "Huyết áp tụt sâu: HA tâm thu < 90 mmHg hoặc giảm > 30% so với huyết áp nền.",
        "Mạch nhanh nhỏ khó bắt (> 120 bpm) hoặc mạch chậm do phản xạ Bezold-Jarisch nguy kịch.",
        "Da phù mạch (Angioedema): Phù môi, mắt, lưỡi, thanh môn.",
        "Nghe phổi có tiếng thở rít thanh quản thì hít vào hoặc ran rít ran ngáy co thắt phế quản.",
      ],
      redFlags: [
        "Tiếng thở rít thanh quản to dần sau đó nhỏ dần kèm tím tái (phù nề đóng kín đường thở hoàn toàn).",
        "Mất tri giác, hôn mê, co giật do thiếu oxy não.",
        "Mạch cảnh không bắt được (ngừng tuần hoàn).",
      ],
    },
    diagnosticCriteria: {
      goldStandard: "Chẩn đoán hoàn toàn dựa trên lâm sàng cấp cứu theo Thông tư 51/2017/TT-BYT. Không được chờ đợi bất kỳ xét nghiệm cận lâm sàng nào để bắt đầu điều trị!",
      ecgFindings: "Nhịp nhanh xoang, thiếu máu cơ tim cấp thoáng qua do tụt huyết áp và co thắt mạch vành (Hội chứng Kounis).",
      imagingFindings: "Không chụp X-quang/CT trong giai đoạn cấp cứu hồi sức sốc.",
      labMarkers: ["Tryptase huyết thanh (lấy mẫu sau 1-2 giờ để xác nhận chẩn đoán hồi cứu)", "Khí máu động mạch"],
    },
    managementSummary: {
      immediateSteps: [
        "NGỪNG NGAY LẬP TỨC đường tiếp xúc dị nguyên (rút dây truyền dịch, ngừng tiêm thuốc).",
        "ADRENALIN 1mg/1ml (ống 1mg): TIÊM BẮP NGAY LẬP TỨC 1/2 ống (0.5mg) ở mặt trước ngoài đùi. Không chần chừ một giây nào!",
        "Đặt bệnh nhân nằm đầu bằng, kê cao hai chân (trừ khi đang khó thở thanh quản dữ dội thì cho ngồi nửa nằm).",
        "Thở oxy dòng cao qua mặt nạ có túi khí 10-15 L/phút.",
        "Thiết lập ngay 2 đường truyền tĩnh mạch lớn (kim 16G hoặc 18G), xả nhanh dịch NaCl 0.9% 1000 - 2000ml.",
        "Nếu sau 3-5 phút huyết áp vẫn chưa lên: Nhắc lại mũi Adrenalin tiêm bắp lần 2 và lần 3.",
      ],
      firstLineDrugs: ["Adrenalin", "Natri Clorid 0.9%", "Methylprednisolon", "Diphenhydramin"],
      contraindicatedInterventions: [
        "TUYỆT ĐỐI KHÔNG tiêm Adrenalin tĩnh mạch trực tiếp (Bolus IV) khi bệnh nhân còn mạch đập (nguy cơ gây loạn nhịp thất chết người hoặc xuất huyết não) -> Chỉ tiêm bắp!",
        "Không dùng kháng histamin hay corticoid thay thế cho Adrenalin trong cấp cứu sốc phản vệ.",
      ],
    },
    relatedDrugIds: ["adrenalin", "methylprednisolon"],
  },
  {
    id: "appendicitis",
    title: "Viêm Ruột Thừa Cấp & Hội Chứng Bụng Ngoại Khoa",
    specialty: "gastroenterology",
    category: "pathophysiology",
    readTimeMinutes: 5,
    summary: "Bệnh lý cấp cứu ngoại khoa bụng phổ biến nhất do lòng ruột thừa bị tắc nghẽn, dẫn đến ứ trệ dịch, thiếu máu thành và nguy cơ hoại tử thủng gây viêm phúc mạc toàn thể.",
    pathophysiology: {
      mechanism: "Lòng ruột thừa bị bít tắc (do sỏi phân Fecalith, quá sản nang bạch huyết mạc treo, hoặc dị vật) làm tăng tiết dịch và áp lực trong lòng ruột thừa. Ứ trệ tĩnh mạch dẫn đến thiếu máu nuôi dưỡng niêm mạc, vi khuẩn xâm nhập thành ruột thừa gây hoại tử và thủng vỡ.",
      keyHormonesOrReceptors: ["Bạch cầu trung tính", "Cytokine viêm (IL-1, IL-6, TNF-alpha)"],
      hemodynamicChanges: "Giai đoạn sớm sinh hiệu bình thường. Khi ruột thừa thủng gây viêm phúc mạc: Mạch nhanh, sốt cao, tụt huyết áp do sốc nhiễm trùng nếu xử trí trễ.",
    },
    clinicalPresentation: {
      chiefComplaints: [
        "Đau bụng khởi phát âm ỉ quanh rốn hoặc thượng vị, sau 4 - 12 giờ khu trú dần và đau tăng lên ở hố chậu phải.",
        "Chán ăn (dấu hiệu rất nhạy, hầu như luôn có), buồn nôn, nôn mửa 1-2 lần sau khi bắt đầu đau bụng.",
        "Sốt nhẹ $37.5 - 38.5^\circ\text{C}$ (nếu sốt cao $>39^\circ\text{C}$ thường đã có hoại tử hoặc vỡ mủ).",
      ],
      physicalFindings: [
        "Điểm đau McBurney (1/3 ngoài đường nối gai chậu trước trên phải đến rốn) ấn đau chói.",
        "Dấu hiệu Blumberg (phản ứng dội) dương tính: Ấn từ từ vào hố chậu phải rồi buông tay đột ngột làm bệnh nhân đau nhói.",
        "Phản ứng thành bụng (Defensive muscular guarding) và dấu hiệu gồng cứng bụng khi đã có viêm phúc mạc.",
        "Dấu hiệu Rovsing (+): Ấn vào hố chậu trái bệnh nhân thấy đau nhói ở hố chậu phải.",
      ],
      redFlags: [
        "Đau bụng đang dữ dội bỗng đột ngột hết đau trong chốc lát, sau đó đau bùng phát dữ dội lan khắp bụng (ruột thừa vừa vỡ giải áp áp lực, giải phóng mủ vào ổ bụng).",
        "Bụng gồng cứng như gỗ (Board-like rigidity) -> Viêm phúc mạc toàn thể.",
        "Mạch nhanh > 120 bpm, thở nhanh, tụt huyết áp -> Sốc nhiễm khuẩn đường tiêu hóa.",
      ],
    },
    diagnosticCriteria: {
      goldStandard: "Siêu âm bụng tổng quát và CT-Scanner ổ bụng có cản quang.",
      ecgFindings: "Thường bình thường hoặc nhịp nhanh xoang do đau/sốt.",
      imagingFindings: "Siêu âm: Ruột thừa hình bia đạn hoặc ống ngón tay tịt một đầu, đè không xẹp, đường kính ngoài > 6mm, thành dày > 2mm, thâm nhiễm mỡ tăng âm quanh ruột thừa, có thể thấy sỏi phân tạo bóng lưng âm. CT: Ruột thừa giãn to, ngấm thuốc kém thành, thâm nhiễm mỡ mạc treo xung quanh.",
      labMarkers: ["Công thức máu: Bạch cầu tăng cao (> 10.000/uL) với tăng tỷ lệ bạch cầu trung tính (> 75%)", "CRP tăng cao", "Xét nghiệm nước tiểu để loại trừ sỏi niệu quản hoặc nhiễm trùng tiểu"],
    },
    managementSummary: {
      immediateSteps: [
        "Bệnh nhân tuyệt đối nhịn ăn uống hoàn toàn để chuẩn bị phẫu thuật.",
        "Lập đường truyền tĩnh mạch, truyền dịch Ringer Lactate hoặc NaCl 0.9% bù nước điện giải.",
        "Kháng sinh phổ rộng đường tĩnh mạch dự phòng (Ceftriaxon phối hợp Metronidazol).",
        "Hội chẩn khẩn cấp chuyên khoa Ngoại tiêu hóa để phẫu thuật nội soi cắt ruột thừa.",
      ],
      firstLineDrugs: ["Ceftriaxon", "Metronidazol", "Paracetamol IV", "Natri Clorid 0.9%"],
      contraindicatedInterventions: [
        "KHÔNG thụt tháo đại tràng hay cho thuốc nhuận tràng (nguy cơ làm vỡ ruột thừa).",
        "Không chườm ấm lên bụng (tăng phản ứng viêm và tốc độ hoại tử ruột thừa).",
      ],
    },
    relatedDrugIds: ["ceftriaxon", "paracetamol"],
  },
  {
    id: "ecg_principles",
    title: "Nguyên Lý 7 Bước Đọc Điện Tâm Đồ (ECG) Có Hệ Thống",
    specialty: "radiology",
    category: "paraclinical_theory",
    readTimeMinutes: 8,
    summary: "Quy trình đọc điện tâm đồ chuẩn quốc tế giúp bác sĩ không bỏ sót bất kỳ tổn thương điện sinh lý hay dấu hiệu nhồi máu cơ tim nào.",
    pathophysiology: {
      mechanism: "Điện tâm đồ ghi lại tổng đại số các vectơ khử cực và tái cực của hàng triệu tế bào cơ tim theo thời gian trên các mặt phẳng đứng dọc (chuyển đạo chi) và mặt phẳng nằm ngang (chuyển đạo ngực).",
      keyHormonesOrReceptors: ["Kênh Na+ điện thế nhanh", "Kênh Ca2+ L-type", "Kênh K+ nội bào"],
      hemodynamicChanges: "Các rối loạn nhịp hoặc thiếu máu làm suy giảm tính đồng bộ co bóp giữa nhĩ và thất, làm giảm thể tích nhát bóp (SV) và cung lượng tim.",
    },
    clinicalPresentation: {
      chiefComplaints: ["Hồi hộp đánh trống ngực", "Cảm giác tim đập hụt hẫng", "Choáng váng, ngất (Syncope)", "Đau tức ngực trái"],
      physicalFindings: ["Bắt mạch không đều", "Mạch quá nhanh (> 150 bpm) hoặc quá chậm (< 45 bpm)", "Huyết áp dao động"],
      redFlags: ["Nhịp nhanh thất (VT)", "Rung thất (VF)", "Vô tâm thu (Asystole)", "ST chênh lên dạng vòm trong STEMI", "QTc kéo dài > 500ms"],
    },
    diagnosticCriteria: {
      goldStandard: "Bản ghi ECG 12 chuyển đạo ghi ở tốc độ 25mm/s và biên độ 10mm/mV.",
      ecgFindings: "Đọc lần lượt 7 bước: 1. Nhịp (Xoang hay không xoang) -> 2. Tần số tim (300/số ô lớn) -> 3. Trục điện tim (Dựa vào DI và aVF) -> 4. Sóng P (Biên độ < 2.5mm, thời gian < 0.12s) -> 5. Khoảng PR (0.12 - 0.20s) -> 6. Phức bộ QRS (Rộng hay hẹp < 0.12s, sóng Q bệnh lý, phì đại thất) -> 7. Đoạn ST và sóng T (ST chênh lên/xuống, sóng T âm, sóng T nhọn, khoảng QTc).",
      imagingFindings: "Tương quan với Siêu âm tim Doppler màu.",
      labMarkers: ["Điện giải đồ (Kali, Canxi, Magie)", "Troponin tim hs-cTn"],
    },
    managementSummary: {
      immediateSteps: [
        "Kiểm tra chất lượng bản ghi ECG (tốc độ quét 25mm/s, test biên độ 10mm/mV, đường nền không nhiễu).",
        "Nếu phát hiện nhịp nguy kịch (VF, VT vô mạch) -> Sốc điện khử rung ngay lập tức!",
        "Nếu phát hiện STEMI -> Kích hoạt ngay phác đồ tái tưới máu mạch vành.",
      ],
      firstLineDrugs: ["Atropin", "Amiodaron", "Adrenalin", "Magie Sulfat"],
      contraindicatedInterventions: ["Không chẩn đoán khi bản ghi bị nhiễu cơ hoặc mắc ngược điện cực tay phải - tay trái."],
    },
    relatedDrugIds: ["amiodaron", "atropin", "adrenalin"],
  },
  {
    id: "pocus_fast_principles",
    title: "Nguyên Lý Siêu Âm Tại Giường (POCUS) & Giao Thức FAST",
    specialty: "radiology",
    category: "paraclinical_theory",
    readTimeMinutes: 7,
    summary: "Kỹ thuật siêu âm cấp cứu tại giường có trọng điểm giúp bác sĩ phát hiện nhanh dịch tự do ổ bụng, tràn dịch màng ngoài tim, tràn khí màng phổi trong vòng 3 phút.",
    pathophysiology: {
      mechanism: "Sóng siêu âm phản xạ tại ranh giới giữa các môi trường có trở kháng âm khác nhau. Dịch tự do (máu, nước tiểu, thanh dịch) không phản hồi âm, biểu hiện thành vùng màu đen (Echo trống). Xương và sỏi phản xạ âm gần như hoàn toàn, tạo dải trắng sáng (Echo dày) kèm bóng lưng đen (Acoustic shadow).",
      keyHormonesOrReceptors: [],
      hemodynamicChanges: "Phát hiện sớm tràn máu màng tim gây chèn ép tim cấp (Cardiac Tamponade) hoặc xuất huyết nội gây sốc giảm thể tích.",
    },
    clinicalPresentation: {
      chiefComplaints: ["Bệnh nhân đa chấn thương", "Đau ngực cấp", "Khó thở đột ngột", "Chấn thương bụng kín"],
      physicalFindings: ["Bụng chướng, gõ đục vùng thấp", "Mạch nhanh tụt huyết áp không rõ nguyên nhân", "Tam chứng Beck trong ép tim: Tụt HA, tĩnh mạch cổ nổi, tiếng tim mờ xa xăm"],
      redFlags: ["Dải dịch đen đè sụp thất phải trong thì tâm trương", "Mất hoàn toàn dấu trượt màng phổi (Lung Sliding) trong tràn khí màng phổi áp lực"],
    },
    diagnosticCriteria: {
      goldStandard: "Siêu âm FAST 4 vị trí: Hạ sườn phải (RUQ), Hạ sườn trái (LUQ), Dưới mũi ức (Tim), Vùng hạ vị (Bàng quang) + E-FAST (Màng phổi).",
      ecgFindings: "Điện thế thấp toàn bộ chuyển đạo nếu tràn dịch màng ngoài tim lượng nhiều.",
      imagingFindings: "FAST (+): Dải echo trống giữa gan và thận (khoang Morison), giữa lách và thận, khoang màng ngoài tim, hoặc quanh bàng quang. E-FAST màng phổi: M-Mode thấy dấu mã vạch (Barcode sign) trong tràn khí, dấu bờ biển (Seashore sign) khi bình thường.",
      labMarkers: ["Hematocrit giảm", "Lactate máu tăng", "Khí máu động mạch"],
    },
    managementSummary: {
      immediateSteps: [
        "Nếu FAST (+) ở bệnh nhân chấn thương bụng có huyết động không ổn định (HA < 90 mmHg) -> Chuyển thẳng phòng mổ cấp cứu mở bụng cầm máu!",
        "Nếu tràn dịch màng ngoài tim có chèn ép tim cấp -> Chọc hút giải áp màng ngoài tim dưới mũi ức dưới hướng dẫn siêu âm.",
        "Nếu tràn khí màng phổi áp lực -> Chọc kim giải áp khoang liên sườn 2 đường trung đòn ngay lập tức.",
      ],
      firstLineDrugs: ["Natri Clorid 0.9%", "Ringer Lactat", "Máu toàn phần"],
      contraindicatedInterventions: ["Không chuyển bệnh nhân huyết động không ổn định đi chụp CT nếu chưa hồi sức kiểm soát được sinh hiệu."],
    },
    relatedDrugIds: ["morphin"],
  },
];
