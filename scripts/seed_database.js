const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const DB_DIR = path.join(__dirname, "..", "data");
const DB_PATH = path.join(DB_DIR, "medsim.db");

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

console.log("🚀 Initializing MedSim SQLite Database at:", DB_PATH);

// Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS lessons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    specialty TEXT NOT NULL,
    category TEXT NOT NULL,
    read_time_minutes INTEGER NOT NULL,
    summary TEXT NOT NULL,
    pathophysiology_json TEXT NOT NULL,
    clinical_presentation_json TEXT NOT NULL,
    diagnostic_criteria_json TEXT NOT NULL,
    management_summary_json TEXT NOT NULL,
    related_drug_ids_json TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS drugs (
    id TEXT PRIMARY KEY,
    generic_name TEXT NOT NULL,
    brand_names_json TEXT NOT NULL,
    category TEXT NOT NULL,
    receptor_mechanism TEXT NOT NULL,
    standard_dose_json TEXT NOT NULL,
    routes_json TEXT NOT NULL,
    onset_time TEXT NOT NULL,
    half_life TEXT NOT NULL,
    indications_json TEXT NOT NULL,
    contraindications_json TEXT NOT NULL,
    fatal_mistakes_json TEXT NOT NULL,
    adverse_effects_json TEXT NOT NULL,
    monitoring_keys_json TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS quizzes (
    id TEXT PRIMARY KEY,
    topic_id TEXT NOT NULL,
    specialty TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    vignette TEXT NOT NULL,
    question TEXT NOT NULL,
    options_json TEXT NOT NULL,
    correct_option_index INTEGER NOT NULL,
    explanation_json TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS flashcards (
    id TEXT PRIMARY KEY,
    specialty TEXT NOT NULL,
    category TEXT NOT NULL,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    mnemonic TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Import Raw Seeds
// Since TypeScript files are in src/data, we compile or use require if ts-node, or parse the seeds directly.
// Let's create an elegant seeder that directly populates SQLite with the complete datasets!

console.log("📦 Seeding Clinical Lessons...");
const insertLesson = db.prepare(`
  INSERT INTO lessons (
    id, title, specialty, category, read_time_minutes, summary,
    pathophysiology_json, clinical_presentation_json, diagnostic_criteria_json,
    management_summary_json, related_drug_ids_json
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    title=excluded.title,
    specialty=excluded.specialty,
    category=excluded.category,
    read_time_minutes=excluded.read_time_minutes,
    summary=excluded.summary,
    pathophysiology_json=excluded.pathophysiology_json,
    clinical_presentation_json=excluded.clinical_presentation_json,
    diagnostic_criteria_json=excluded.diagnostic_criteria_json,
    management_summary_json=excluded.management_summary_json,
    related_drug_ids_json=excluded.related_drug_ids_json
`);

const lessons = [
  {
    id: "stemi",
    title: "Nhồi Máu Cơ Tim Cấp ST Chênh Lên (STEMI)",
    specialty: "cardiology",
    category: "emergency_protocol",
    readTimeMinutes: 7,
    summary: "Hội chứng vành cấp do mảng xơ vữa nứt vỡ hình thành huyết khối gây tắc nghẽn hoàn toàn động mạch vành cấp tính. Cần can thiệp tái tưới máu trong thời gian vàng 120 phút.",
    pathophysiology: {
      mechanism: "Nứt vỡ mảng xơ vữa mạch vành làm lộ lớp dưới nội mạc, tiểu cầu bám dính và ngưng tập tạo nút tiểu cầu, kích hoạt dòng thác đông máu hình thành cục máu đông giàu Fibrin làm tắc nghẽn 100% dòng máu nuôi dưỡng cơ tim.",
      keyHormonesOrReceptors: ["Glycoprotein IIb/IIIa", "Thromboxane A2", "ADP", "Troponin I / T"],
      hemodynamicChanges: "Thiếu máu cơ tim xuyên thành dẫn đến rối loạn chức năng tâm trương và tâm thu thất trái. Cung lượng tim (CO) giảm, áp lực cuối tâm trương thất trái (LVEDP) tăng, nguy cơ phù phổi cấp hoặc sốc tim."
    },
    clinicalPresentation: {
      chiefComplaints: [
        "Đau thắt ngực dữ dội sau xương ức kiểu bóp nghẹt, đè nặng, lan lên hàm dưới, vai trái và mặt trong cánh tay trái.",
        "Kéo dài trên 20-30 phút, không đỡ khi nghỉ ngơi hoặc ngậm Nitroglycerin.",
        "Kèm theo vã mồ hôi lạnh, khó thở, buồn nôn, cảm giác sợ chết."
      ],
      physicalFindings: [
        "Huyết áp có thể tăng do kích thích giao cảm hoặc tụt nếu có biến chứng sốc tim.",
        "Nghe tim có thể có tiếng T3, T4, tiếng thổi tâm thu mới xuất hiện nếu hở van 2 lá do đứt cột cơ.",
        "Phổi có thể có ran ẩm 2 đáy nếu có suy tim trái cấp (Killip II-III)."
      ],
      redFlags: [
        "Tụt huyết áp (HA tâm thu < 90 mmHg) hoặc mạch chậm < 50 bpm (dấu hiệu nhồi máu thất phải hoặc block nhĩ thất hoàn toàn).",
        "Khó thở dữ dội, ran ẩm dâng nhanh 2 phế trường (phù phổi cấp - Killip III).",
        "Rối loạn nhịp thất nguy hiểm: Nhanh thất (VT), Rung thất (VF)."
      ]
    },
    diagnosticCriteria: {
      goldStandard: "Điện tâm đồ 12 chuyển đạo ghi trong vòng 10 phút đầu tiên khi tiếp cận bệnh nhân.",
      ecgFindings: "ST chênh lên dạng vòm tại điểm J ở ít nhất 2 chuyển đạo liên tiếp: >= 1mm ở các chuyển đạo ngoại biên (DII, DIII, aVF trong STEMI thành dưới; DI, aVL trong STEMI thành bên); >= 2mm ở V1-V3 (nam) hoặc >= 1.5mm (nữ). Hình ảnh soi gương ST chênh xuống đối xứng.",
      imagingFindings: "Siêu âm tim cấp: Rối loạn vận động vùng cơ tim tương ứng vùng cấp máu động mạch vành bị tắc; đánh giá phân suất tống máu EF và chức năng thất phải.",
      labMarkers: ["Troponin I / T siêu nhạy (hs-cTn) tăng cao gấp nhiều lần giới hạn bình thường trên", "CK-MB", "Điện giải đồ, Men gan, Creatinin máu"]
    },
    managementSummary: {
      immediateSteps: [
        "Thở oxy nếu SpO2 < 90% (không chỉ định thường quy nếu SpO2 >= 90%).",
        "Aspirin nhai ngay lập tức liều nạp 300mg + Kháng kết tập tiểu cầu thứ 2 (Clopidogrel 300-600mg hoặc Ticagrelor 180mg).",
        "Giảm đau bằng Morphin Sulfat 2-4mg tiêm tĩnh mạch chậm nếu đau ngực dữ dội.",
        "Chống đông toàn thân bằng Heparin không phân đoạn hoặc Enoxaparin tiêm tĩnh mạch.",
        "Kích hoạt phòng Can thiệp Mạch vành (Cathlab) để can thiệp PCI thì đầu trong vòng 90-120 phút."
      ],
      firstLineDrugs: ["Aspirin", "Clopidogrel", "Heparin", "Morphin", "Nitroglycerin"],
      contraindicatedInterventions: [
        "TUYỆT ĐỐI KHÔNG dùng Nitroglycerin nếu nghi ngờ nhồi máu thất phải (STEMI DII, DIII, aVF có ST chênh lên ở V4R) hoặc huyết áp tâm thu < 90 mmHg.",
        "Không dùng thuốc ức chế men chuyển (ACEi) hoặc Chẹn Beta trong giai đoạn cấp nếu bệnh nhân đang có dấu hiệu tụt huyết áp hoặc suy tim mất bù."
      ]
    },
    relatedDrugIds: ["aspirin", "clopidogrel", "heparin", "morphin", "nitroglycerin"]
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
      hemodynamicChanges: "Bẫy khí phế nang (Air trapping) làm tăng áp lực trong lồng ngực, tăng hậu tải thất phải, giảm hồi lưu tĩnh mạch về tim, dẫn đến mạch nghịch đảo (Pulsus paradoxus) giảm huyết áp > 10 mmHg khi hít vào."
    },
    clinicalPresentation: {
      chiefComplaints: [
        "Khó thở dữ dội thì thở ra, tiếng thở rít ran khò khè nghe từ xa.",
        "Phải ngồi chồm hổm ra phía trước để thở (Orthopnea), nói từng từ ngắt quãng, không thể nói hết một câu.",
        "Cảm giác ngực bị bóp nghẹt, ho khan hoặc khạc đờm trắng dính khó khạc."
      ],
      physicalFindings: [
        "Nhịp thở nhanh > 30 lần/phút, co kéo cơ hô hấp phụ (cơ ức đòn chũm, rút lõm hõm ức, co kéo khoang gian sườn).",
        "Nghe phổi: Ran rít, ran ngáy lan tỏa khắp 2 phế trường cả 2 thì.",
        "Mạch nhanh > 120 bpm, vã mồ hôi, SpO2 thường < 90%."
      ],
      redFlags: [
        "Phổi im lặng (Silent Chest): Hoàn toàn không còn nghe tiếng ran hay rì rào phế nang do đường thở bị co thắt tắc nghẽn gần như tuyệt đối -> Dấu hiệu ngừng thở sắp xảy ra!",
        "Tri giác u ám, li bì, lú lẫn do ứ trệ CO2 máu và thiếu oxy não.",
        "Hô hấp nghịch đảo ngực - bụng, nhịp thở chậm dần < 12 lần/phút do kiệt sức cơ hô hấp."
      ]
    },
    diagnosticCriteria: {
      goldStandard: "Lâm sàng cấp tính kèm đo Lưu lượng đỉnh (PEF < 50% giá trị dự đoán) và Khí máu động mạch.",
      ecgFindings: "Nhịp nhanh xoang, dấu hiệu tâm phế cấp: S1Q3T3, P phế (sóng P cao nhọn > 2.5mm ở DII).",
      imagingFindings: "X-quang ngực thẳng: Lồng ngực căng phồng hình thùng, các xương sườn nằm ngang dãn rộng khoảng liên sườn, vòm hoành hạ thấp và dẹt, tăng sáng 2 phế trường.",
      labMarkers: ["Khí máu động mạch (ABG): Giai đoạn đầu PaO2 giảm, PaCO2 giảm do thở nhanh. Giai đoạn nặng PaCO2 bình thường hoặc tăng (dấu hiệu kiệt sức nguy kịch)", "Lưu lượng đỉnh PEF"]
    },
    managementSummary: {
      immediateSteps: [
        "Thở oxy qua mặt nạ hoặc kính mũi duy trì SpO2 mục tiêu 93 - 95%.",
        "Khí dung Salbutamol 5mg phối hợp Ipratropium Bromide 0.5mg liên tục mỗi 20 phút trong giờ đầu tiên.",
        "Corticoid toàn thân ngay lập tức: Methylprednisolon 40-80mg tiêm tĩnh mạch.",
        "Nếu đáp ứng kém sau 3 lần khí dung: Truyền tĩnh mạch Magie Sulfat 2g trong 20 phút.",
        "Chuẩn bị đặt nội khí quản nếu có phổi câm, kiệt sức thở, PaCO2 tăng cao."
      ],
      firstLineDrugs: ["Salbutamol", "Ipratropium", "Methylprednisolon", "Magie Sulfat", "Adrenalin"],
      contraindicatedInterventions: [
        "CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI thuốc an thần gây ức chế hô hấp (Morphin, Benzodiazepin) khi chưa đặt nội khí quản.",
        "Tuyệt đối không dùng thuốc chẹn Beta giao cảm (kể cả chọn lọc hay không chọn lọc)."
      ]
    },
    relatedDrugIds: ["salbutamol", "ipratropium", "methylprednisolon", "adrenalin"]
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
      hemodynamicChanges: "Giãn mạch hệ thống làm kháng lực mạch ngoại biên (SVR) tụt dốc thảm hại. Thoát dịch vào khoang gian bào làm giảm thể tích tuần hoàn hiệu dụng tới 35% trong vòng 10 phút. Cung lượng tim giảm, tưới máu tạng sụp đổ."
    },
    clinicalPresentation: {
      chiefComplaints: [
        "Xuất hiện đột ngột trong vòng vài phút đến vài giờ sau khi tiếp xúc dị nguyên (thuốc tiêm, thức ăn, ong đốt).",
        "Cảm giác nghẹt cổ họng, khàn tiếng, nuốt nghẹn, thở rít thanh quản (Stridor), thở khò khè.",
        "Chóng mặt hoa mắt, xây xẩm, ngất xỉu, vã mồ hôi, da nổi mày đay ngứa ngáy dữ dội."
      ],
      physicalFindings: [
        "Huyết áp tụt sâu: HA tâm thu < 90 mmHg hoặc giảm > 30% so với huyết áp nền.",
        "Mạch nhanh nhỏ khó bắt (> 120 bpm) hoặc mạch chậm do phản xạ Bezold-Jarisch nguy kịch.",
        "Da phù mạch (Angioedema): Phù môi, mắt, lưỡi, thanh môn.",
        "Nghe phổi có tiếng thở rít thanh quản thì hít vào hoặc ran rít ran ngáy co thắt phế quản."
      ],
      redFlags: [
        "Tiếng thở rít thanh quản to dần sau đó nhỏ dần kèm tím tái (phù nề đóng kín đường thở hoàn toàn).",
        "Mất tri giác, hôn mê, co giật do thiếu oxy não.",
        "Mạch cảnh không bắt được (ngừng tuần hoàn)."
      ]
    },
    diagnosticCriteria: {
      goldStandard: "Chẩn đoán hoàn toàn dựa trên lâm sàng cấp cứu theo Thông tư 51/2017/TT-BYT. Không được chờ đợi bất kỳ xét nghiệm cận lâm sàng nào để bắt đầu điều trị!",
      ecgFindings: "Nhịp nhanh xoang, thiếu máu cơ tim cấp thoáng qua do tụt huyết áp và co thắt mạch vành (Hội chứng Kounis).",
      imagingFindings: "Không chụp X-quang/CT trong giai đoạn cấp cứu hồi sức sốc.",
      labMarkers: ["Tryptase huyết thanh", "Khí máu động mạch"]
    },
    managementSummary: {
      immediateSteps: [
        "NGỪNG NGAY LẬP TỨC đường tiếp xúc dị nguyên (rút dây truyền dịch, ngừng tiêm thuốc).",
        "ADRENALIN 1mg/1ml (ống 1mg): TIÊM BẮP NGAY LẬP TỨC 1/2 ống (0.5mg) ở mặt trước ngoài đùi. Không chần chừ một giây nào!",
        "Đặt bệnh nhân nằm đầu bằng, kê cao hai chân (trừ khi đang khó thở thanh quản dữ dội thì cho ngồi nửa nằm).",
        "Thở oxy dòng cao qua mặt nạ có túi khí 10-15 L/phút.",
        "Thiết lập ngay 2 đường truyền tĩnh mạch lớn (kim 16G hoặc 18G), xả nhanh dịch NaCl 0.9% 1000 - 2000ml.",
        "Nếu sau 3-5 phút huyết áp vẫn chưa lên: Nhắc lại mũi Adrenalin tiêm bắp lần 2 và lần 3."
      ],
      firstLineDrugs: ["Adrenalin", "Natri Clorid 0.9%", "Methylprednisolon", "Diphenhydramin"],
      contraindicatedInterventions: [
        "TUYỆT ĐỐI KHÔNG tiêm Adrenalin tĩnh mạch trực tiếp (Bolus IV) khi bệnh nhân còn mạch đập (nguy cơ gây loạn nhịp thất chết người hoặc xuất huyết não) -> Chỉ tiêm bắp!",
        "Không dùng kháng histamin hay corticoid thay thế cho Adrenalin trong cấp cứu sốc phản vệ."
      ]
    },
    relatedDrugIds: ["adrenalin", "methylprednisolon"]
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
      hemodynamicChanges: "Giai đoạn sớm sinh hiệu bình thường. Khi ruột thừa thủng gây viêm phúc mạc: Mạch nhanh, sốt cao, tụt huyết áp do sốc nhiễm trùng nếu xử trí trễ."
    },
    clinicalPresentation: {
      chiefComplaints: [
        "Đau bụng khởi phát âm ỉ quanh rốn hoặc thượng vị, sau 4 - 12 giờ khu trú dần và đau tăng lên ở hố chậu phải.",
        "Chán ăn (dấu hiệu rất nhạy, hầu như luôn có), buồn nôn, nôn mửa 1-2 lần sau khi bắt đầu đau bụng.",
        "Sốt nhẹ 37.5 - 38.5 độ C (nếu sốt cao > 39 độ C thường đã có hoại tử hoặc vỡ mủ)."
      ],
      physicalFindings: [
        "Điểm đau McBurney (1/3 ngoài đường nối gai chậu trước trên phải đến rốn) ấn đau chói.",
        "Dấu hiệu Blumberg (phản ứng dội) dương tính: Ấn từ từ vào hố chậu phải rồi buông tay đột ngột làm bệnh nhân đau nhói.",
        "Phản ứng thành bụng (Defensive muscular guarding) và dấu hiệu gồng cứng bụng khi đã có viêm phúc mạc.",
        "Dấu hiệu Rovsing (+): Ấn vào hố chậu trái bệnh nhân thấy đau nhói ở hố chậu phải."
      ],
      redFlags: [
        "Đau bụng đang dữ dội bỗng đột ngột hết đau trong chốc lát, sau đó đau bùng phát dữ dội lan khắp bụng (ruột thừa vừa vỡ giải áp áp lực, giải phóng mủ vào ổ bụng).",
        "Bụng gồng cứng như gỗ (Board-like rigidity) -> Viêm phúc mạc toàn thể.",
        "Mạch nhanh > 120 bpm, thở nhanh, tụt huyết áp -> Sốc nhiễm khuẩn đường tiêu hóa."
      ]
    },
    diagnosticCriteria: {
      goldStandard: "Siêu âm bụng tổng quát và CT-Scanner ổ bụng có cản quang.",
      ecgFindings: "Thường bình thường hoặc nhịp nhanh xoang do đau/sốt.",
      imagingFindings: "Siêu âm: Ruột thừa hình bia đạn hoặc ống ngón tay tịt một đầu, đè không xẹp, đường kính ngoài > 6mm, thành dày > 2mm, thâm nhiễm mỡ tăng âm quanh ruột thừa, có thể thấy sỏi phân tạo bóng lưng âm. CT: Ruột thừa giãn to, ngấm thuốc kém thành, thâm nhiễm mỡ mạc treo xung quanh.",
      labMarkers: ["Công thức máu: Bạch cầu tăng cao (> 10.000/uL) với tăng tỷ lệ bạch cầu trung tính (> 75%)", "CRP tăng cao", "Xét nghiệm nước tiểu để loại trừ sỏi niệu quản hoặc nhiễm trùng tiểu"]
    },
    managementSummary: {
      immediateSteps: [
        "Bệnh nhân tuyệt đối nhịn ăn uống hoàn toàn để chuẩn bị phẫu thuật.",
        "Lập đường truyền tĩnh mạch, truyền dịch Ringer Lactate hoặc NaCl 0.9% bù nước điện giải.",
        "Kháng sinh phổ rộng đường tĩnh mạch dự phòng (Ceftriaxon phối hợp Metronidazol).",
        "Hội chẩn khẩn cấp chuyên khoa Ngoại tiêu hóa để phẫu thuật nội soi cắt ruột thừa."
      ],
      firstLineDrugs: ["Ceftriaxon", "Metronidazol", "Paracetamol IV", "Natri Clorid 0.9%"],
      contraindicatedInterventions: [
        "KHÔNG thụt tháo đại tràng hay cho thuốc nhuận tràng (nguy cơ làm vỡ ruột thừa).",
        "Không chườm ấm lên bụng (tăng phản ứng viêm và tốc độ hoại tử ruột thừa)."
      ]
    },
    relatedDrugIds: ["ceftriaxon", "paracetamol"]
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
      hemodynamicChanges: "Các rối loạn nhịp hoặc thiếu máu làm suy giảm tính đồng bộ co bóp giữa nhĩ và thất, làm giảm thể tích nhát bóp (SV) và cung lượng tim."
    },
    clinicalPresentation: {
      chiefComplaints: ["Hồi hộp đánh trống ngực", "Cảm giác tim đập hụt hẫng", "Choáng váng, ngất (Syncope)", "Đau tức ngực trái"],
      physicalFindings: ["Bắt mạch không đều", "Mạch quá nhanh (> 150 bpm) hoặc quá chậm (< 45 bpm)", "Huyết áp dao động"],
      redFlags: ["Nhịp nhanh thất (VT)", "Rung thất (VF)", "Vô tâm thu (Asystole)", "ST chênh lên dạng vòm trong STEMI", "QTc kéo dài > 500ms"]
    },
    diagnosticCriteria: {
      goldStandard: "Bản ghi ECG 12 chuyển đạo ghi ở tốc độ 25mm/s và biên độ 10mm/mV.",
      ecgFindings: "Đọc lần lượt 7 bước: 1. Nhịp (Xoang hay không xoang) -> 2. Tần số tim (300/số ô lớn) -> 3. Trục điện tim (Dựa vào DI và aVF) -> 4. Sóng P (Biên độ < 2.5mm, thời gian < 0.12s) -> 5. Khoảng PR (0.12 - 0.20s) -> 6. Phức bộ QRS (Rộng hay hẹp < 0.12s, sóng Q bệnh lý, phì đại thất) -> 7. Đoạn ST và sóng T (ST chênh lên/xuống, sóng T âm, sóng T nhọn, khoảng QTc).",
      imagingFindings: "Tương quan với Siêu âm tim Doppler màu.",
      labMarkers: ["Điện giải đồ (Kali, Canxi, Magie)", "Troponin tim hs-cTn"]
    },
    managementSummary: {
      immediateSteps: [
        "Kiểm tra chất lượng bản ghi ECG (tốc độ quét 25mm/s, test biên độ 10mm/mV, đường nền không nhiễu).",
        "Nếu phát hiện nhịp nguy kịch (VF, VT vô mạch) -> Sốc điện khử rung ngay lập tức!",
        "Nếu phát hiện STEMI -> Kích hoạt ngay phác đồ tái tưới máu mạch vành."
      ],
      firstLineDrugs: ["Atropin", "Amiodaron", "Adrenalin", "Magie Sulfat"],
      contraindicatedInterventions: ["Không chẩn đoán khi bản ghi bị nhiễu cơ hoặc mắc ngược điện cực tay phải - tay trái."]
    },
    relatedDrugIds: ["amiodaron", "atropin", "adrenalin"]
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
      hemodynamicChanges: "Phát hiện sớm tràn máu màng tim gây chèn ép tim cấp (Cardiac Tamponade) hoặc xuất huyết nội gây sốc giảm thể tích."
    },
    clinicalPresentation: {
      chiefComplaints: ["Bệnh nhân đa chấn thương", "Đau ngực cấp", "Khó thở đột ngột", "Chấn thương bụng kín"],
      physicalFindings: ["Bụng chướng, gõ đục vùng thấp", "Mạch nhanh tụt huyết áp không rõ nguyên nhân", "Tam chứng Beck trong ép tim: Tụt HA, tĩnh mạch cổ nổi, tiếng tim mờ xa xăm"],
      redFlags: ["Dải dịch đen đè sụp thất phải trong thì tâm trương", "Mất hoàn toàn dấu trượt màng phổi (Lung Sliding) trong tràn khí màng phổi áp lực"]
    },
    diagnosticCriteria: {
      goldStandard: "Siêu âm FAST 4 vị trí: Hạ sườn phải (RUQ), Hạ sườn trái (LUQ), Dưới mũi ức (Tim), Vùng hạ vị (Bàng quang) + E-FAST (Màng phổi).",
      ecgFindings: "Điện thế thấp toàn bộ chuyển đạo nếu tràn dịch màng ngoài tim lượng nhiều.",
      imagingFindings: "FAST (+): Dải echo trống giữa gan và thận (khoang Morison), giữa lách và thận, khoang màng ngoài tim, hoặc quanh bàng quang. E-FAST màng phổi: M-Mode thấy dấu mã vạch (Barcode sign) trong tràn khí, dấu bờ biển (Seashore sign) khi bình thường.",
      labMarkers: ["Hematocrit giảm", "Lactate máu tăng", "Khí máu động mạch"]
    },
    managementSummary: {
      immediateSteps: [
        "Nếu FAST (+) ở bệnh nhân chấn thương bụng có huyết động không ổn định (HA < 90 mmHg) -> Chuyển thẳng phòng mổ cấp cứu mở bụng cầm máu!",
        "Nếu tràn dịch màng ngoài tim có chèn ép tim cấp -> Chọc hút giải áp màng ngoài tim dưới mũi ức dưới hướng dẫn siêu âm.",
        "Nếu tràn khí màng phổi áp lực -> Chọc kim giải áp khoang liên sườn 2 đường trung đòn ngay lập tức."
      ],
      firstLineDrugs: ["Natri Clorid 0.9%", "Ringer Lactat", "Máu toàn phần"],
      contraindicatedInterventions: ["Không chuyển bệnh nhân huyết động không ổn định đi chụp CT nếu chưa hồi sức kiểm soát được sinh hiệu."]
    },
    relatedDrugIds: ["morphin"]
  }
];

lessons.forEach((l) => {
  insertLesson.run(
    l.id,
    l.title,
    l.specialty,
    l.category,
    l.readTimeMinutes,
    l.summary,
    JSON.stringify(l.pathophysiology),
    JSON.stringify(l.clinicalPresentation),
    JSON.stringify(l.diagnosticCriteria),
    JSON.stringify(l.managementSummary),
    JSON.stringify(l.relatedDrugIds)
  );
});
console.log(`✅ Seeded ${lessons.length} lessons into SQLite.`);

console.log("📦 Seeding Clinical Drugs...");
const insertDrug = db.prepare(`
  INSERT INTO drugs (
    id, generic_name, brand_names_json, category, receptor_mechanism,
    standard_dose_json, routes_json, onset_time, half_life, indications_json,
    contraindications_json, fatal_mistakes_json, adverse_effects_json, monitoring_keys_json
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    generic_name=excluded.generic_name,
    brand_names_json=excluded.brand_names_json,
    category=excluded.category,
    receptor_mechanism=excluded.receptor_mechanism,
    standard_dose_json=excluded.standard_dose_json,
    routes_json=excluded.routes_json,
    onset_time=excluded.onset_time,
    half_life=excluded.half_life,
    indications_json=excluded.indications_json,
    contraindications_json=excluded.contraindications_json,
    fatal_mistakes_json=excluded.fatal_mistakes_json,
    adverse_effects_json=excluded.adverse_effects_json,
    monitoring_keys_json=excluded.monitoring_keys_json
`);

const drugs = [
  {
    id: "adrenalin",
    genericName: "Adrenalin (Epinephrine)",
    brandNames: ["Adrenaline 1mg/1ml", "EpiPen"],
    category: "vasopressor_inotropic",
    receptorMechanism: "Chủ vận mạnh mẽ không chọn lọc trên cả thụ thể Alpha-1 (co mạch ngoại biên nâng huyết áp), Beta-1 (tăng sức co bóp và tần số tim), Beta-2 (giãn mạnh cơ trơn phế quản, ức chế giải phóng hóa chất trung gian từ tế bào Mast).",
    standardDose: {
      adultEmergency: "Sốc phản vệ: 0.5mg (1/2 ống 1mg) TIÊM BẮP mặt trước ngoài đùi. Ngừng tuần hoàn: 1mg TIÊM TĨNH MẠCH mỗi 3-5 phút.",
      maintenance: "Truyền tĩnh mạch liên tục qua bơm tiêm điện: 0.05 - 0.5 mcg/kg/phút chỉnh theo huyết áp mục tiêu."
    },
    routes: ["IM", "IV", "IV_Infusion"],
    onsetTime: "Tiêm bắp: 3 - 5 phút; Tiêm tĩnh mạch: < 1 phút",
    halfLife: "2 - 3 phút",
    indications: [
      "Sốc phản vệ từ độ II trở lên (chỉ định đầu tay duy nhất)",
      "Hồi sinh tim phổi nâng cao trong ngừng tuần hoàn (Asystole, PEA, VF, VT vô mạch)",
      "Cơn hen phế quản ác tính đe dọa ngừng thở khi không đáp ứng với khí dung",
      "Sốc tim hoặc sốc nhiễm trùng kháng Dopamin/Noradrenalin"
    ],
    contraindications: {
      absolute: ["Không có chống chỉ định tuyệt đối trong cấp cứu sốc phản vệ và ngừng tuần hoàn!"],
      relative: ["Tăng huyết áp nặng", "Bệnh động mạch vành chưa cấp cứu", "Cường giáp"]
    },
    fatalMistakes: [
      "TIÊM TĨNH MẠCH TRỰC TIẾP (BOLUS IV) LIỀU 1MG KHI BỆNH NHÂN CÒN MẠCH: Gây bùng phát cơn tăng huyết áp kịch phát, xuất huyết não, phù phổi cấp hoặc rung thất chết người! Chỉ tiêm bắp 0.5mg!",
      "Chần chừ không tiêm Adrenalin bắp sớm trong sốc phản vệ, dùng Hydrocortison hoặc Kháng histamin thay thế làm bệnh nhân ngạt thở tử vong."
    ],
    adverseEffects: ["Tim đập nhanh, hồi hộp, lo âu, run tay, nhức đầu", "Tăng huyết áp vọt", "Loạn nhịp thất"],
    monitoringKeys: ["Huyết áp liên tục mỗi 3 phút", "Điện tâm đồ (monitor nhịp tim)", "SpO2"]
  },
  {
    id: "noradrenalin",
    genericName: "Noradrenalin (Norepinephrine)",
    brandNames: ["Levophed 4mg/4ml", "Noradrenaline"],
    category: "vasopressor_inotropic",
    receptorMechanism: "Chủ vận rất mạnh trên thụ thể Alpha-1 adrenergic gây co thắt mạnh mẽ các tiểu động mạch và tĩnh mạch toàn thân, làm tăng kháng lực mạch máu ngoại biên (SVR) và nâng huyết áp tâm trương. Tác dụng Beta-1 yếu trên tim.",
    standardDose: {
      adultEmergency: "Pha truyền tĩnh mạch qua bơm tiêm điện: Bắt đầu 0.05 - 0.1 mcg/kg/phút, chuẩn độ tăng dần mỗi 2-5 phút đến khi đạt MAP >= 65 mmHg.",
      maintenance: "0.1 - 1.0 mcg/kg/phút."
    },
    routes: ["IV_Infusion"],
    onsetTime: "1 - 2 phút",
    halfLife: "1 - 2 phút",
    indications: [
      "Sốc nhiễm khuẩn (lựa chọn hàng đầu theo Surviving Sepsis Campaign)",
      "Sốc giãn mạch (sốc thần kinh, sốc phản vệ kháng Adrenalin)",
      "Tụt huyết áp nặng đe dọa tính mạng cần nâng huyết áp tức thì"
    ],
    contraindications: {
      absolute: ["Tụt huyết áp do giảm thể tích tuần hoàn chưa được bù đủ dịch."],
      relative: ["Bệnh động mạch ngoại biên nặng", "Huyết khối mạch mạc treo"]
    },
    fatalMistakes: [
      "Tiêm bắp hoặc tiêm dưới da (gây hoại tử thiếu máu mô nghiêm trọng).",
      "Truyền qua đường tĩnh mạch ngoại biên nhỏ ở mu bàn tay (nguy cơ thoát mạch gây hoại tử da bàn tay -> Bắt buộc dùng tĩnh mạch trung tâm hoặc tĩnh mạch lớn nếp khuỷu)."
    ],
    adverseEffects: ["Thiếu máu đầu chi (tím lạnh ngón tay/chân)", "Loạn nhịp tim", "Thiếu máu thận và tạng"],
    monitoringKeys: ["Huyết áp động mạch xâm lấn (IBP)", "Lactate máu", "Nước tiểu mỗi giờ", "Đầu chi"]
  },
  {
    id: "atropin",
    genericName: "Atropin Sulfat",
    brandNames: ["Atropine 0.25mg/1ml", "Atropine 0.5mg/1ml"],
    category: "vasopressor_inotropic",
    receptorMechanism: "Đối kháng cạnh tranh có hồi phục trên các thụ thể Muscarinic M2 tại nút xoang và nút nhĩ thất, ức chế trương lực dây thần kinh X (dây phế vị), làm tăng tần số phát nhịp của nút xoang và tăng tốc độ dẫn truyền qua nút AV.",
    standardDose: {
      adultEmergency: "Nhịp chậm có tụt huyết áp: 0.5mg - 1mg TIÊM TĨNH MẠCH NHANH mỗi 3-5 phút, liều tối đa 3mg. Ngộ độc phospho hữu cơ: 2 - 5mg IV nhắc lại đến khi có dấu hiệu ngấm Atropin."
    },
    routes: ["IV", "IM"],
    onsetTime: "< 1 phút khi tiêm tĩnh mạch",
    halfLife: "2 - 3 giờ",
    indications: [
      "Nhịp chậm xoang có triệu chứng (tụt HA, chóng mặt, đau ngực, suy tim)",
      "Block nhĩ thất độ I hoặc Block AV độ II Mobitz I",
      "Ngộ độc thuốc trừ sâu phospho hữu cơ hoặc thuốc diệt cỏ diệt nấm ức chế cholinesterase"
    ],
    contraindications: {
      absolute: ["Glaucoma góc đóng", "Phì đại tuyến tiền liệt có bí tiểu"],
      relative: ["Nhịp chậm do Block AV độ II Mobitz II hoặc Block AV độ III hoàn toàn (thường không đáp ứng -> Cần tạo nhịp nhân tạo)"]
    },
    fatalMistakes: [
      "Tiêm tĩnh mạch quá chậm liều < 0.5mg: Gây phản xạ nghịch đảo làm chậm nhịp tim hơn ban đầu!"
    ],
    adverseEffects: ["Khô miệng, giãn đồng tử, nhìn mờ", "Bí tiểu, táo bón", "Lú lẫn ở người già"],
    monitoringKeys: ["Nhịp tim trên monitor", "Đồng tử", "Lượng nước tiểu"]
  },
  {
    id: "aspirin",
    genericName: "Aspirin (Acetylsalicylic Acid)",
    brandNames: ["Aspirin 81mg", "Aspégic 100mg", "Aspirin 300mg"],
    category: "cardiovascular_antiplatelet",
    receptorMechanism: "Ức chế không hồi phục enzym Cyclooxygenase-1 (COX-1), ngăn chặn tổng hợp Thromboxane A2 trong tiểu cầu suốt đời sống của tiểu cầu (7 - 10 ngày), ức chế mạnh mẽ sự ngưng tập tiểu cầu và hình thành huyết khối.",
    standardDose: {
      adultEmergency: "Hội chứng vành cấp / STEMI: 162 - 325mg (thường dùng 300mg hoặc 4 viên 81mg) NHAI NÁT RỒI NUỐT ngay khi tiếp cận.",
      maintenance: "75 - 100mg uống hàng ngày sau bữa ăn."
    },
    routes: ["PO"],
    onsetTime: "Nhai nuốt: 20 - 30 phút",
    halfLife: "15 - 20 phút (nhưng tác dụng kháng tiểu cầu kéo dài 7 - 10 ngày)",
    indications: [
      "Hội chứng vành cấp (STEMI, NSTEMI, Đau thắt ngực không ổn định)",
      "Đột quỵ thiếu máu não cục bộ cấp (sau khi đã chụp CT loại trừ xuất huyết)",
      "Dự phòng tiên phát và thứ phát biến cố tim mạch"
    ],
    contraindications: {
      absolute: ["Đang xuất huyết tiêu hóa tiến triển", "Xuất huyết não", "Dị ứng nặng với Aspirin / NSAID (Tam chứng Widal: Hen + Polyp mũi + Dị ứng Aspirin)"],
      relative: ["Loét dạ dày tá tràng", "Rối loạn đông máu nặng (Hemophilia)"]
    },
    fatalMistakes: [
      "Cho bệnh nhân uống nguyên viên có bao tan trong ruột mà không nhai trong cấp cứu STEMI: Làm chậm hấp thu thuốc từ 2-4 tiếng, bỏ lỡ thời gian vàng ngăn chặn cục máu đông lan rộng!"
    ],
    adverseEffects: ["Khó tiêu, đau thượng vị, viêm trợt dạ dày", "Xuất huyết dạ dày", "Kéo dài thời gian chảy máu"],
    monitoringKeys: ["Dấu hiệu xuất huyết tiêu hóa (nôn ra máu, đi ngoài phân đen)", "Công thức máu (Hb, Hct)"]
  },
  {
    id: "clopidogrel",
    genericName: "Clopidogrel",
    brandNames: ["Plavix 75mg", "Clopidogrel 300mg"],
    category: "cardiovascular_antiplatelet",
    receptorMechanism: "Tiền chất thuốc được chuyển hóa tại gan qua enzym CYP2C19 thành chất chuyển hóa có hoạt tính, ức chế chọn lọc và không hồi phục thụ thể P2Y12 của Adenosine Diphosphate (ADP) trên bề mặt tiểu cầu.",
    standardDose: {
      adultEmergency: "STEMI can thiệp PCI: Liều nạp 300 - 600mg (4 - 8 viên 75mg) uống 1 lần duy nhất.",
      maintenance: "75mg uống 1 lần mỗi ngày."
    },
    routes: ["PO"],
    onsetTime: "Liều nạp 600mg: 2 giờ",
    halfLife: "6 giờ",
    indications: [
      "Kháng kết tập tiểu cầu kép (DAPT) phối hợp với Aspirin trong Hội chứng vành cấp",
      "Sau đặt stent mạch vành",
      "Thay thế Aspirin khi bệnh nhân có tiền sử dị ứng thực sự với Aspirin"
    ],
    contraindications: {
      absolute: ["Đang có chảy máu hoạt động (loét dạ dày chảy máu, xuất huyết nội sọ)."],
      relative: ["Suy gan nặng", "Chuẩn bị mổ bắc cầu mạch vành CABG trong vòng 5 ngày."]
    },
    fatalMistakes: [
      "Dùng đồng thời với Omeprazol liều cao làm ức chế CYP2C19, giảm hiệu quả kháng tiểu cầu (nên chọn Pantoprazol thay thế)."
    ],
    adverseEffects: ["Bầm tím dưới da, chảy máu cam", "Xuất huyết tiêu hóa", "Giảm tiểu cầu hiếm gặp"],
    monitoringKeys: ["Số lượng tiểu cầu", "Triệu chứng xuất huyết"]
  },
  {
    id: "heparin",
    genericName: "Heparin Không Phân Đoạn (UFH)",
    brandNames: ["Heparin 25.000 IU/5ml"],
    category: "cardiovascular_antiplatelet",
    receptorMechanism: "Gắn với Antithrombin III (AT-III), làm tăng hoạt tính ức chế của AT-III lên gấp 1000 lần đối với Thrombin (Yếu tố IIa) và Yếu tố Xa, ngăn cản chuyển Fibrinogen thành Fibrin.",
    standardDose: {
      adultEmergency: "STEMI đi can thiệp PCI: Tiêm tĩnh mạch bolus 70 - 100 IU/kg (nếu không dùng thuốc ức chế GP IIb/IIIa). Thuyên tắc phổi cấp: Bolus 80 IU/kg sau đó truyền liên tục 18 IU/kg/giờ."
    },
    routes: ["IV", "IV_Infusion", "SC"],
    onsetTime: "Tiêm tĩnh mạch: Ngay lập tức",
    halfLife: "60 - 90 phút",
    indications: [
      "Hội chứng vành cấp",
      "Thuyên tắc huyết khối tĩnh mạch sâu (DVT) và thuyên tắc động mạch phổi (PE)",
      "Dự phòng đông máu trong chạy thận nhân tạo và phẫu thuật tim mạch"
    ],
    contraindications: {
      absolute: ["Tiền sử giảm tiểu cầu do Heparin (HIT type II)", "Đang xuất huyết tạng nguy hiểm"],
      relative: ["Tăng huyết áp nặng không kiểm soát", "Vừa phẫu thuật mắt hoặc thần kinh"]
    },
    fatalMistakes: [
      "Quá liều gây xuất huyết ồ ạt mà không biết thuốc đối kháng: Thuốc giải độc đặc hiệu là Protamin Sulfat (1mg trung hòa 100 IU Heparin)."
    ],
    adverseEffects: ["Xuất huyết", "Giảm tiểu cầu do Heparin (HIT)", "Loãng xương khi dùng dài ngày"],
    monitoringKeys: ["Thời gian aPTT (mục tiêu 1.5 - 2.5 lần chứng)", "Số lượng tiểu cầu mỗi 2 ngày"]
  },
  {
    id: "nitroglycerin",
    genericName: "Nitroglycerin (Glyceryl Trinitrate)",
    brandNames: ["Nitroglycerin 0.5mg ngậm", "Nitromint xịt", "Nitrodur"],
    category: "cardiovascular_antiplatelet",
    receptorMechanism: "Chuyển hóa tại cơ trơn mạch máu giải phóng Nitric Oxide (NO), kích hoạt Guanylyl Cyclase làm tăng cGMP nội bào, gây giãn mạnh hệ tĩnh mạch (giảm tiền tải) và giãn động mạch vành (tăng tưới máu cơ tim).",
    standardDose: {
      adultEmergency: "Ngậm dưới lưỡi 0.4 - 0.5mg hoặc xịt dưới lưỡi 1-2 nhát. Có thể nhắc lại sau 5 phút, tối đa 3 lần. Truyền tĩnh mạch: Khởi đầu 5 - 10 mcg/phút tăng dần mỗi 5 phút."
    },
    routes: ["PO", "IV_Infusion"],
    onsetTime: "Ngậm dưới lưỡi: 1 - 3 phút",
    halfLife: "1 - 4 phút",
    indications: [
      "Cắt cơn đau thắt ngực do thiếu máu cơ tim",
      "Phù phổi cấp huyết động do suy tim trái",
      "Cơn tăng huyết áp cấp cứu kèm phù phổi"
    ],
    contraindications: {
      absolute: [
        "Huyết áp tâm thu < 90 mmHg hoặc giảm > 30 mmHg so với nền.",
        "NHỒI MÁU CƠ TIM THẤT PHẢI (STEMI thành dưới DII, DIII, aVF có tổn thương thất phải V4R).",
        "ĐÃ DÙNG THUỐC ĐIỀU TRỊ RỐI LOẠN CƯƠNG DƯƠNG (Sildenafil trong vòng 24h, Tadalafil trong vòng 48h) -> Nguy cơ tụt HA tử vong!"
      ],
      relative: ["Hẹp van động mạch chủ khít", "Bệnh cơ tim phì đại tắc nghẽn (HOCM)"]
    },
    fatalMistakes: [
      "DÙNG NITROGLYCERIN CHO BỆNH NHÂN STEMI THẤT PHẢI: Thất phải bị nhồi máu phụ thuộc hoàn toàn vào tiền tải. Nitroglycerin làm giãn tĩnh mạch giảm tiền tải ồ ạt -> Bệnh nhân tụt huyết áp sốc tim ngay lập tức và ngừng tuần hoàn!"
    ],
    adverseEffects: ["Nhức đầu dữ dội (rất phổ biến)", "Tụt huyết áp tư thế", "Mạch nhanh phản xạ"],
    monitoringKeys: ["Huyết áp động mạch trước và sau mỗi liều dùng", "Điện tâm đồ chuyển đạo V4R"]
  },
  {
    id: "morphin",
    genericName: "Morphin Sulfat",
    brandNames: ["Morphine 10mg/1ml"],
    category: "analgesic_sedative",
    receptorMechanism: "Chủ vận mạnh trên thụ thể Mu-opioid tại hệ thần kinh trung ương và tủy sống, làm biến đổi cảm nhận đau đớn, an thần và gây giãn tĩnh mạch nhẹ làm giảm tiền tải tim.",
    standardDose: {
      adultEmergency: "STEMI đau ngực dữ dội hoặc Phù phổi cấp: 2 - 4mg TIÊM TĨNH MẠCH CHẬM (pha loãng với 9ml NaCl 0.9% tiêm chậm trong 2-3 phút), nhắc lại mỗi 5-15 phút nếu cần."
    },
    routes: ["IV", "SC", "IM"],
    onsetTime: "Tiêm tĩnh mạch: 3 - 5 phút",
    halfLife: "2 - 3 giờ",
    indications: [
      "Cơn đau thắt ngực nặng trong STEMI không đáp ứng với Nitroglycerin",
      "Phù phổi cấp do suy tim có kích thích lo âu dữ dội",
      "Đau cấp tính dữ dội do chấn thương gãy xương lớn hoặc bỏng nặng"
    ],
    contraindications: {
      absolute: ["Suy hô hấp cấp chưa đặt nội khí quản", "Hôn mê chưa rõ nguyên nhân", "Chấn thương sọ não tăng áp lực nội sọ"],
      relative: ["Tụt huyết áp (HA tâm thu < 90 mmHg)", "Hen phế quản cấp"]
    },
    fatalMistakes: [
      "Tiêm tĩnh mạch nhanh nguyên chất làm ức chế trung tâm hô hấp gây ngừng thở đột ngột hoặc tụt huyết áp sốc.",
      "Quên thuốc giải độc đặc hiệu khi ngộ độc quá liều Opioid: Naloxone 0.4mg tiêm tĩnh mạch."
    ],
    adverseEffects: ["Ức chế hô hấp", "Buồn nôn, nôn mửa", "Tụt huyết áp, chậm nhịp tim", "Táo bón"],
    monitoringKeys: ["Tần số thở (nếu thở < 10 lần/phút -> Dừng ngay và chuẩn bị Naloxone)", "SpO2", "Huyết áp", "Đồng tử"]
  },
  {
    id: "salbutamol",
    genericName: "Salbutamol (Albuterol)",
    brandNames: ["Ventolin 2.5mg/2.5ml", "Ventolin xịt 100mcg"],
    category: "respiratory_bronchodilator",
    receptorMechanism: "Chủ vận chọn lọc trên thụ thể Beta-2 Adrenergic của cơ trơn phế quản, kích hoạt Adenylyl Cyclase làm tăng cAMP nội bào, gây giãn nhanh chóng và mạnh mẽ các cơ trơn tiểu phế quản.",
    standardDose: {
      adultEmergency: "Khí dung qua mặt nạ thở: 5mg (2 tép Ventolin 2.5mg) pha với khí dung oxy 6-8 L/phút, nhắc lại mỗi 20 phút trong 1 giờ đầu tiên."
    },
    routes: ["Inhalation", "IV_Infusion"],
    onsetTime: "Hít / Khí dung: 3 - 5 phút",
    halfLife: "3 - 5 giờ",
    indications: [
      "Cắt cơn co thắt phế quản cấp trong Hen phế quản",
      "Đợt cấp Bệnh phổi tắc nghẽn mạn tính (COPD)",
      "Hạ Kali máu cấp cứu trong tăng Kali máu nặng"
    ],
    contraindications: {
      absolute: ["Tiền sử quá mẫn với Salbutamol."],
      relative: ["Cường giáp chưa kiểm soát", "Rối loạn nhịp nhanh thất, thiếu máu cơ tim cấp."]
    },
    fatalMistakes: [
      "Dùng đơn độc Salbutamol kéo dài mà không phối hợp Corticoid kháng viêm trong cơn hen cấp làm tăng nguy cơ tử vong do tái phát cơn ác tính."
    ],
    adverseEffects: ["Run ngón tay (rất phổ biến)", "Tim đập nhanh, đánh trống ngực", "Hạ Kali máu"],
    monitoringKeys: ["Nhịp tim", "Tần số thở", "Nghe phổi (ran rít)", "Kali máu"]
  },
  {
    id: "methylprednisolon",
    genericName: "Methylprednisolon",
    brandNames: ["Solu-Medrol 40mg", "Solu-Medrol 125mg"],
    category: "corticosteroid",
    receptorMechanism: "Glucocorticoid tổng hợp có hoạt tính kháng viêm mạnh gấp 5 lần Hydrocortison, ức chế Phospholipase A2, ngăn chặn giải phóng Acid Arachidonic và tổng hợp Prostaglandin, Leukotrienes; ức chế thâm nhiễm bạch cầu vào mô viêm.",
    standardDose: {
      adultEmergency: "Cơn hen phế quản cấp nặng: 40 - 80mg TIÊM TĨNH MẠCH mỗi 6 - 8 giờ. Sốc phản vệ (giai đoạn 2 chống phản ứng pha muộn): 1 - 2 mg/kg tiêm tĩnh mạch."
    },
    routes: ["IV", "IM"],
    onsetTime: "Kháng viêm tế bào: 2 - 4 giờ",
    halfLife: "18 - 36 giờ",
    indications: [
      "Cơn hen cấp nặng và đợt cấp COPD",
      "Sốc phản vệ (sau khi đã dùng Adrenalin)",
      "Đợt bùng phát bệnh tự miễn (Lupus, Viêm cầu thận cấp)",
      "Phù não do khối u thần kinh"
    ],
    contraindications: {
      absolute: ["Nhiễm nấm toàn thân chưa điều trị."],
      relative: ["Loét dạ dày tá tràng tiến triển", "Đái tháo đường mất kiểm soát", "Nhiễm trùng nặng."]
    },
    fatalMistakes: [
      "DÙNG CORTICOID ĐƠN ĐỘC ĐỂ CẤP CỨU SỐC PHẢN VỆ THAY CHO ADRENALIN: Corticoid cần 2 - 4 tiếng mới bắt đầu phát huy tác dụng kháng viêm, không thể cứu bệnh nhân đang bị tụt huyết áp và nghẹt thở cấp trong 5 phút đầu!"
    ],
    adverseEffects: ["Tăng đường huyết cấp", "Kích ứng dạ dày", "Tăng huyết áp", "Mất ngủ, kích thích thần kinh"],
    monitoringKeys: ["Đường huyết mao mạch", "Huyết áp", "Dấu hiệu nhiễm trùng"]
  },
  {
    id: "ceftriaxon",
    genericName: "Ceftriaxon",
    brandNames: ["Rocephin 1g"],
    category: "antibiotic",
    receptorMechanism: "Kháng sinh Cephalosporin thế hệ 3, ức chế tổng hợp thành tế bào vi khuẩn bằng cách liên kết với các Penicillin-Binding Proteins (PBPs), làm ly giải tế bào vi khuẩn. Phổ kháng khuẩn rộng trên vi khuẩn Gram âm đường ruột và phế cầu.",
    standardDose: {
      adultEmergency: "Nhiễm trùng huyết / Viêm ruột thừa cấp / Viêm phổi nặng: 1 - 2g TIÊM TĨNH MẠCH CHẬM trong 3-5 phút hoặc truyền ngắt quãng trong 30 phút, 1 lần/ngày."
    },
    routes: ["IV", "IM"],
    onsetTime: "Đạt nồng độ đỉnh huyết tương ngay sau tiêm",
    halfLife: "8 giờ",
    indications: [
      "Nhiễm khuẩn ổ bụng (viêm ruột thừa, viêm phúc mạc) phối hợp Metronidazol",
      "Nhiễm khuẩn huyết và sốc nhiễm khuẩn",
      "Viêm màng não mủ do vi khuẩn",
      "Viêm phổi mắc phải cộng đồng nặng"
    ],
    contraindications: {
      absolute: ["Tiền sử sốc phản vệ hoặc dị ứng nghiêm trọng với kháng sinh nhóm Cephalosporin hoặc Penicillin."],
      relative: ["Trẻ sơ sinh có tăng bilirubin máu."]
    },
    fatalMistakes: [
      "Kê đơn Ceftriaxon hoặc nhóm Beta-lactam khi bệnh nhân có tiền sử rõ ràng bị sốc phản vệ với Amoxicillin/Penicillin mà không kiểm tra tiền sử dị ứng -> Gây sốc phản vệ chéo tử vong!"
    ],
    adverseEffects: ["Tiêu chảy, viêm ruột giả mạc do C.difficile", "Dị ứng phát ban", "Lắng đọng bùn mật"],
    monitoringKeys: ["Tiền sử dị ứng thuốc", "Nhiệt độ, công thức bạch cầu", "Chức năng gan thận"]
  },
  {
    id: "insulin_regular",
    genericName: "Insulin Regular (Nhanh / Hòa tan)",
    brandNames: ["Actrapid HM 100 IU/ml", "Humulin R"],
    category: "emergency_metabolic",
    receptorMechanism: "Insulin người tác dụng ngắn gắn vào thụ thể Tyrosine Kinase trên màng tế bào, kích hoạt chuyển các kênh GLUT-4 lên màng tế bào cơ và mỡ, tăng hấp thu Glucose từ máu vào tế bào, ức chế tân tạo đường tại gan và dập tắt quá trình tạo thể Ceton.",
    standardDose: {
      adultEmergency: "Nhiễm toan ceton ĐTĐ (DKA): Sau khi bù dịch đủ, truyền tĩnh mạch liên tục 0.1 IU/kg/giờ (không cần bolus). Mục tiêu hạ đường huyết 50 - 75 mg/dL mỗi giờ."
    },
    routes: ["IV", "IV_Infusion", "SC"],
    onsetTime: "Tiêm tĩnh mạch: 10 - 15 phút",
    halfLife: "Tiêm tĩnh mạch: 5 - 10 phút",
    indications: [
      "Nhiễm toan Ceton do đái tháo đường (DKA)",
      "Hội chứng tăng áp lực thẩm thấu do tăng đường huyết (HHS)",
      "Tăng Kali máu nặng cấp cứu (kết hợp Glucose 20%)"
    ],
    contraindications: {
      absolute: ["Hạ đường huyết (Glucose < 3.9 mmol/L).", "HẠ KALI MÁU (K+ < 3.3 mmol/L) -> Phải bù Kali trước khi truyền Insulin!"],
      relative: []
    },
    fatalMistakes: [
      "TRUYỀN INSULIN KHI KALI MÁU < 3.3 MMOL/L: Insulin đẩy Kali từ máu vào trong tế bào ồ ạt, làm hạ Kali máu thảm hại gây rung thất và ngừng tim đột ngột! Bắt buộc kiểm tra Kali máu trước khi truyền Insulin!"
    ],
    adverseEffects: ["Hạ đường huyết", "Hạ Kali máu", "Phù não nếu hạ đường huyết quá nhanh"],
    monitoringKeys: ["Đường huyết mao mạch mỗi 1 giờ", "Điện giải đồ (Kali) mỗi 2-4 giờ"]
  }
];

drugs.forEach((d) => {
  insertDrug.run(
    d.id,
    d.genericName,
    JSON.stringify(d.brandNames),
    d.category,
    d.receptorMechanism,
    JSON.stringify(d.standardDose),
    JSON.stringify(d.routes),
    d.onsetTime,
    d.halfLife,
    JSON.stringify(d.indications),
    JSON.stringify(d.contraindications),
    JSON.stringify(d.fatalMistakes),
    JSON.stringify(d.adverseEffects),
    JSON.stringify(d.monitoringKeys)
  );
});
console.log(`✅ Seeded ${drugs.length} drugs into SQLite.`);

console.log("📦 Seeding Clinical Quizzes...");
const insertQuiz = db.prepare(`
  INSERT INTO quizzes (
    id, topic_id, specialty, difficulty, vignette, question,
    options_json, correct_option_index, explanation_json
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    topic_id=excluded.topic_id,
    specialty=excluded.specialty,
    difficulty=excluded.difficulty,
    vignette=excluded.vignette,
    question=excluded.question,
    options_json=excluded.options_json,
    correct_option_index=excluded.correct_option_index,
    explanation_json=excluded.explanation_json
`);

const quizzes = [
  {
    id: "quiz_stemi_01",
    topicId: "stemi",
    specialty: "cardiology",
    difficulty: "intermediate",
    vignette: "Bệnh nhân nam 58 tuổi vào viện vì đau thắt ngực sau xương ức 45 phút, lan lên hàm dưới và cánh tay trái, vã mồ hôi. Điện tâm đồ ghi nhận ST chênh lên 3mm ở DII, DIII, aVF và ST chênh xuống ở DI, aVL. Huyết áp đo được 85/50 mmHg, nhịp tim 52 lần/phút.",
    question: "Xử trí nào dưới đây là CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI cho bệnh nhân này?",
    options: [
      "Cho nhai 300mg Aspirin ngay lập tức",
      "Ngậm dưới lưỡi 1 viên Nitroglycerin 0.5mg để giảm đau ngực",
      "Tiêm tĩnh mạch chậm 1000ml Natri Clorid 0.9%",
      "Mắc thêm các chuyển đạo V3R - V6R để khảo sát thất phải"
    ],
    correctOptionIndex: 1,
    explanation: {
      whyCorrect: "Bệnh nhân có STEMI thành dưới (ST chênh lên DII, DIII, aVF) kèm tụt huyết áp và nhịp chậm, rất điển hình của nhồi máu cơ tim thất phải kèm theo. Thất phải bị suy giảm sức co bóp phụ thuộc hoàn toàn vào áp lực đổ đầy (tiền tải). Dùng Nitroglycerin gây giãn tĩnh mạch làm tụt tiền tải ồ ạt, dẫn đến sốc tim trụy mạch tử vong!",
      whyOthersIncorrect: "Nhai Aspirin 300mg là bắt buộc. Mắc thêm V3R-V6R (đặc biệt V4R) là tiêu chuẩn vàng chẩn đoán nhồi máu thất phải. Bù dịch NaCl 0.9% là chỉ định điều trị đúng đắn để nâng tiền tải cho thất phải.",
      clinicalPearl: "Trong STEMI thành dưới (DII, DIII, aVF), luôn luôn đo chuyển đạo V4R và kiểm tra huyết áp trước khi nghĩ đến việc cho bất kỳ liều Nitrate nào!"
    }
  },
  {
    id: "quiz_anaphylaxis_01",
    topicId: "anaphylaxis",
    specialty: "emergency",
    difficulty: "beginner",
    vignette: "Bệnh nhân nữ 26 tuổi đang được tiêm kháng sinh Ceftriaxon điều trị viêm bể thận. Sau khi tiêm 3 phút, bệnh nhân kêu nghẹn họng khó thở, khàn tiếng, da nổi mày đay đỏ rực toàn thân, huyết áp tụt còn 75/40 mmHg, mạch 130 lần/phút.",
    question: "Hành động cấp cứu đầu tiên quan trọng nhất cần thực hiện ngay lập tức là gì?",
    options: [
      "Tiêm tĩnh mạch 1 ống Methylprednisolon 40mg",
      "Tiêm bắp 0.5mg Adrenalin (1/2 ống 1mg) ở mặt trước ngoài đùi",
      "Tiêm tĩnh mạch chậm 1 ống Diphenhydramin 10mg",
      "Đặt nội khí quản ngay lập tức"
    ],
    correctOptionIndex: 1,
    explanation: {
      whyCorrect: "Theo phác đồ Bộ Y Tế và quốc tế, Adrenalin tiêm bắp là thuốc đầu tay DUY NHẤT có tác dụng co mạch nâng huyết áp và giãn cơ trơn phế quản dập tắt phù nề thanh quản trong vòng 3-5 phút. Mỗi giây chần chừ đều làm tăng nguy cơ phù thanh môn bít tắc đường thở tử vong.",
      whyOthersIncorrect: "Methylprednisolon và Diphenhydramin chỉ là thuốc hỗ trợ ở giai đoạn sau (cần 2-4 tiếng mới có tác dụng tế bào), tuyệt đối không thể thay thế Adrenalin. Đặt nội khí quản chỉ thực hiện nếu sau tiêm Adrenalin bệnh nhân vẫn suy hô hấp đe dọa ngừng thở.",
      clinicalPearl: "Trong sốc phản vệ: Adrenalin tiêm bắp trước - Mọi thứ khác tính sau!"
    }
  },
  {
    id: "quiz_asthma_01",
    topicId: "acute_asthma",
    specialty: "pulmonology",
    difficulty: "advanced",
    vignette: "Bệnh nhân nam 22 tuổi tiền sử hen phế quản vào cấp cứu vì khó thở dữ dội. Bệnh nhân ngồi chồm ra trước, vã mồ hôi, thở 34 lần/phút. Nghe phổi thấy hoàn toàn im lặng, không còn nghe thấy tiếng ran hay tiếng thở phế nang (phổi câm / Silent Chest). SpO2 84%.",
    question: "Dấu hiệu 'Phổi im lặng' (Silent Chest) ở bệnh nhân này thể hiện điều gì?",
    options: [
      "Bệnh nhân đã đáp ứng tốt với thuốc và đường thở đã thông thoáng trở lại",
      "Tình trạng tắc nghẽn đường thở cực kỳ nghiêm trọng, lưu lượng khí lưu thông gần bằng 0, nguy cơ ngừng tuần hoàn hô hấp sắp xảy ra",
      "Bệnh nhân bị tràn dịch màng phổi lượng nhiều chèn ép",
      "Phản xạ co thắt phế quản đã tự hết"
    ],
    correctOptionIndex: 1,
    explanation: {
      whyCorrect: "Để phát ra tiếng ran rít, ran ngáy thì không khí bắt buộc phải di chuyển qua các phế quản bị hẹp. Khi đường thở bị co thắt tắc nghẽn đến mức cực hạn hoặc cơ hô hấp kiệt sức hoàn toàn, không khí không còn di chuyển được nữa -> Nghe phổi im lặng hoàn toàn. Đây là dấu hiệu báo trước ngừng thở tử vong trong vài phút!",
      whyOthersIncorrect: "Đây không phải là dấu hiệu cải thiện mà là dấu hiệu nguy kịch tối khẩn cấp cần can thiệp đặt nội khí quản và hồi sức tích cực.",
      clinicalPearl: "Trong cơn hen phế quản, ran rít to chưa chắc đã đáng sợ bằng một lồng ngực hoàn toàn im lặng!"
    }
  },
  {
    id: "quiz_dka_01",
    topicId: "dka",
    specialty: "endocrinology",
    difficulty: "intermediate",
    vignette: "Bệnh nhân nữ 19 tuổi đái tháo đường Type 1 nhập viện vì lơ mơ, thở nhanh sâu kiểu Kussmaul, mùi hơi thở táo thối (mùi ceton). Xét nghiệm: Đường huyết 420 mg/dL, pH máu 7.15, HCO3- 9 mEq/L, Kali máu 3.1 mmol/L.",
    question: "Bước xử trí ĐÚNG ĐẮN NHẤT tại thời điểm này là gì?",
    options: [
      "Tiêm tĩnh mạch bolus ngay 10 đơn vị Insulin Regular rồi truyền liên tục",
      "Bù dịch NaCl 0.9% và BÙ KALI MÁU trước, TRÌ HOÃN truyền Insulin cho đến khi Kali >= 3.3 mmol/L",
      "Tiêm Natri Bicarbonat 1.4% để nâng pH máu lên ngay",
      "Cho bệnh nhân uống nước đường để tránh hạ đường huyết"
    ],
    correctOptionIndex: 1,
    explanation: {
      whyCorrect: "Insulin kích hoạt bơm Na+/K+ ATPase đẩy Kali từ máu vào trong tế bào. Nếu truyền Insulin khi Kali máu đang thấp (< 3.3 mmol/L), nồng độ Kali ngoại bào sẽ tụt dốc thảm hại, gây rung thất, ngừng tim và yếu liệt cơ hô hấp. Phác đồ chuẩn yêu cầu bù Kali qua dịch truyền trước cho đến khi Kali >= 3.3 mmol/L mới bắt đầu truyền Insulin.",
      whyOthersIncorrect: "Truyền Insulin ngay lập tức khi K+ = 3.1 mmol/L là sai lầm chết người. Bicarbonat chỉ cân nhắc khi pH < 6.9.",
      clinicalPearl: "Nguyên tắc vàng DKA: Nước là số 1, Kali là số 2, Insulin chỉ là số 3!"
    }
  }
];

quizzes.forEach((q) => {
  insertQuiz.run(
    q.id,
    q.topicId,
    q.specialty,
    q.difficulty,
    q.vignette,
    q.question,
    JSON.stringify(q.options),
    q.correctOptionIndex,
    JSON.stringify(q.explanation)
  );
});
console.log(`✅ Seeded ${quizzes.length} clinical quizzes into SQLite.`);

console.log("📦 Seeding Medical Flashcards...");
const insertFlashcard = db.prepare(`
  INSERT INTO flashcards (id, specialty, category, front, back, mnemonic)
  VALUES (?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    specialty=excluded.specialty,
    category=excluded.category,
    front=excluded.front,
    back=excluded.back,
    mnemonic=excluded.mnemonic
`);

const flashcards = [
  {
    id: "fc_01",
    specialty: "cardiology",
    category: "STEMI",
    front: "Tiêu chuẩn chẩn đoán điện tâm đồ của Nhồi máu cơ tim ST chênh lên (STEMI) thành dưới là gì?",
    back: "ST chênh lên dạng vòm >= 1mm ở ít nhất 2 trong 3 chuyển đạo DII, DIII, aVF. Thường đi kèm hình ảnh soi gương ST chênh xuống ở DI và aVL.",
    mnemonic: "DII, DIII, aVF = 'Bottom of the heart' (Động mạch vành phải RCA cấp máu)"
  },
  {
    id: "fc_02",
    specialty: "emergency",
    category: "Anaphylaxis",
    front: "Vị trí tiêm và liều lượng khởi đầu chuẩn của Adrenalin trong cấp cứu sốc phản vệ người lớn là gì?",
    back: "0.5mg (1/2 ống 1mg/1ml) TIÊM BẮP ở mặt trước ngoài đùi (cơ tứ đầu đùi). Nhắc lại mỗi 3-5 phút nếu huyết áp chưa cải thiện.",
    mnemonic: "Luôn tiêm BẮP ĐÙI - Tuyệt đối không tiêm mạch máu liều bolus khi còn mạch!"
  },
  {
    id: "fc_03",
    specialty: "radiology",
    category: "Ultrasound",
    front: "Quy tắc BART trong siêu âm Doppler màu là gì?",
    back: "BART = Blue Away, Red Towards. Dòng máu chảy hướng về phía đầu dò siêu âm có màu ĐỎ; dòng máu chảy rời xa đầu dò có màu XANH.",
    mnemonic: "Blue Away, Red Towards"
  },
  {
    id: "fc_04",
    specialty: "radiology",
    category: "CT-Scan",
    front: "Thang đậm độ Hounsfield (HU) của Nước, Khí, Xương và Máu tụ cấp tính trên phim CT là bao nhiêu?",
    back: "• Nước tinh khiết: 0 HU\n• Không khí: -1000 HU\n• Mỡ: -100 HU\n• Máu tụ cấp tính: +60 đến +80 HU\n• Xương đặc: > +400 đến +1000 HU",
    mnemonic: "Khí đen (-1000) -> Mỡ (-100) -> Nước (0) -> Máu (+70) -> Xương trắng (+1000)"
  },
  {
    id: "fc_05",
    specialty: "pulmonology",
    category: "POCUS Lung",
    front: "Dấu hiệu 'Mã vạch' (Barcode / Stratosphere Sign) trên siêu âm M-Mode màng phổi biểu hiện bệnh lý gì?",
    back: "Tràn khí màng phổi (Pneumothorax). Không khí ngăn cách lá tạng và lá thành làm mất chuyển động trượt màng phổi (Lung Sliding), toàn bộ màn hình M-Mode chỉ còn các đường sọc ngang bất động.",
    mnemonic: "Bình thường = Dấu bờ biển (Seashore). Tràn khí = Dấu mã vạch (Barcode)."
  }
];

flashcards.forEach((f) => {
  insertFlashcard.run(f.id, f.specialty, f.category, f.front, f.back, f.mnemonic || null);
});
console.log(`✅ Seeded ${flashcards.length} medical flashcards into SQLite.`);

console.log("🎉 SQLite Database seeded successfully!");
db.close();
