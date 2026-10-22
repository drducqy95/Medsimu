/**
 * ECG Emergency Protocols, Drug Formulary & Safety Guard Rules
 * Biên soạn theo chuẩn ACLS/AHA 2020-2025, ESC và Hướng dẫn chẩn đoán và điều trị bệnh tim mạch Bộ Y Tế Việt Nam.
 */

export interface EmergencyDrug {
  id: string;
  name: string;
  brandName?: string;
  category: string;
  dosage: string;
  mechanism: string;
  indications: string[];
  contraindications: string[];
  adverseEffects: string;
  administrationInstructions: string;
}

export interface EmergencyIntervention {
  id: string;
  name: string;
  type: "electrical" | "procedural" | "mechanical" | "revascularization";
  energyOrSetting: string;
  description: string;
  indications: string[];
  contraindications: string[];
}

export interface ContraindicationAlert {
  isContraindicated: boolean;
  severity: "FATAL" | "CRITICAL" | "CONTRAINDICATED" | "CAUTION";
  title: string;
  danger: string;
  mechanism: string;
  safeAlternative: string;
}

export interface RhythmEmergencyProtocol {
  rhythmId: string;
  aclsCategory: "cardiac_arrest" | "tachycardia_unstable" | "tachycardia_stable" | "bradycardia_unstable" | "acs_stemi" | "toxic_metabolic" | "urgent_observation";
  priorityLevel: "CODE RED (Tối khẩn)" | "STAT (Khẩn cấp)" | "URGENT (Khẩn)" | "ROUTINE (Theo dõi)";
  primaryGoal: string;
  actionSequence: {
    step: number;
    action: string;
    details: string;
  }[];
  firstLineDrugs: string[];
  secondLineDrugs: string[];
  recommendedInterventions: string[];
  absoluteContraindications: string[];
  targetDisposition: "Phòng Can Thiệp Mạch Vành (Cath Lab)" | "Hồi Sức Cấp Cứu (ICU)" | "Đơn Vị Chăm Sóc Mạch Vành (CCU)" | "Khoa Cấp Cứu (ED)" | "Phòng Khám / Nội Trú Tim Mạch";
}

// ============================================================================
// 1. DƯỢC THƯ CẤP CỨU TIM MẠCH (EMERGENCY DRUG FORMULARY)
// ============================================================================
export const EMERGENCY_DRUGS: Record<string, EmergencyDrug> = {
  adenosine: {
    id: "adenosine",
    name: "Adenosine",
    brandName: "Adenocor 6mg/2ml",
    category: "Thuốc ức chế dẫn truyền qua nút nhĩ thất (Nhóm V)",
    dosage: "Khởi đầu 6 mg IV push cực nhanh; nếu sau 1-2 phút không cắt cơn tiêm tiếp 12 mg IV.",
    mechanism: "Kích hoạt thụ thể A1 adenosine ở nút AV, gây tăng dòng K+ ra và ức chế dòng Ca2+ vào, làm chậm hoặc ức chế tạm thời dẫn truyền nút nhĩ thất.",
    indications: ["Cơn tim nhanh kịch phát trên thất (PSVT / AVNRT / AVRT)", "Chẩn đoán phân biệt nhịp nhanh QRS hẹp đều"],
    contraindications: ["Hen phế quản nặng", "Block AV độ II hoặc độ III không có máy tạo nhịp", "Rung nhĩ kèm hội chứng kích thích sớm WPW (Pre-excited AF)"],
    adverseEffects: "Cảm giác ngừng tim, thắt ngực, khó thở dữ dội, đỏ bừng mặt trong vài giây (thoáng qua do thời gian bán thải < 10 giây).",
    administrationInstructions: "Kỹ thuật 2 bơm tiêm qua chốt ba ngã (stopcock): 1 bơm chứa Adenosine, 1 bơm chứa 20ml NaCl 0.9%. Tiêm Adenosine cực nhanh trong 1-2 giây rồi xả ngay lập tức 20ml NaCl và nâng cao tay bệnh nhân.",
  },
  amiodarone: {
    id: "amiodarone",
    name: "Amiodarone",
    brandName: "Cordarone 150mg/3ml",
    category: "Thuốc chống loạn nhịp nhóm III (Kênh Kali)",
    dosage: "Ngừng tim (VF/pVT): 300 mg IV bolus nhanh, có thể nhắc lại 150 mg sau 3-5 phút. Nhanh thất có mạch / Loạn nhịp thất: 150 mg truyền tĩnh mạch trong 10 phút, sau đó truyền duy trì 1 mg/phút trong 6 giờ đầu.",
    mechanism: "Kéo dài thời gian điện thế hoạt động và trơ của cơ tim bằng cách ức chế kênh Kali, đồng thời có hoạt tính chẹn beta, chẹn kênh natri và chẹn kênh canxi nhẹ.",
    indications: ["Rung thất (VF) và Nhanh thất mất mạch (pVT) trơ với sốc điện", "Cơn nhanh thất có mạch huyết động ổn định", "Rung nhĩ đáp ứng thất nhanh ở bệnh nhân suy tim EF giảm"],
    contraindications: ["Khoảng QT kéo dài bẩm sinh hoặc mắc phải (QTc > 500ms)", "Cơn Xoắn đỉnh (Torsades de Pointes)", "Block AV độ cao", "Nhịp chậm xoang nặng"],
    adverseEffects: "Tụt huyết áp do giãn mạch (dung môi Polysorbate 80), chậm nhịp tim, viêm tĩnh mạch huyết khối nếu truyền ngoại vi kéo dài.",
    administrationInstructions: "Pha trong dung dịch Dextrose 5% (tuyệt đối không pha trong NaCl 0.9% vì gây tủa khi để lâu). Truyền qua bơm tiêm điện hoặc máy đếm giọt.",
  },
  atropine: {
    id: "atropine",
    name: "Atropin Sulfat",
    brandName: "Atropin 0.25mg/ml hoặc 0.5mg/ml",
    category: "Thuốc đối kháng hệ phó giao cảm (Kháng Muscarinic)",
    dosage: "0.5 mg đến 1.0 mg IV push mỗi 3 - 5 phút. Tổng liều tối đa 3 mg (hoặc 0.04 mg/kg).",
    mechanism: "Cạnh tranh ức chế acetylcholine tại thụ thể muscarinic của nút xoang và nút AV, giải phóng phanh phó giao cảm làm tăng tính tự động nút xoang và tăng tốc độ dẫn truyền qua nút AV.",
    indications: ["Nhịp chậm xoang có triệu chứng tụt huyết áp/choáng váng", "Block nhĩ thất độ I hoặc Block AV độ II Mobitz I (tổn thương tầng nút nhĩ thất)"],
    contraindications: ["Block AV độ II Mobitz II hoặc Block AV độ III với phức bộ QRS dãn rộng (tổn thương tầng dưới bó His - Atropin không hiệu quả hoặc gây phản tác dụng)", "Glaucoma góc đóng"],
    adverseEffects: "Khô miệng, nhìn mờ, giãn đồng tử, bí tiểu, tăng nhu cầu oxy cơ tim có thể làm nặng thêm thiếu máu cục bộ trong nhồi máu cơ tim.",
    administrationInstructions: "Tuyệt đối không dùng liều < 0.5 mg vì có thể gây chậm nhịp nghịch ngôn (paradoxical bradycardia) do kích thích trung tâm phó giao cảm trung ương.",
  },
  adrenaline: {
    id: "adrenaline",
    name: "Adrenaline (Epinephrine)",
    brandName: "Adrenalin 1mg/1ml",
    category: "Thuốc kích thích thụ thể Adrenergic (Alpha & Beta giao cảm)",
    dosage: "Ngừng tuần hoàn: 1 mg IV/IO mỗi 3 - 5 phút (kèm tráng 20ml dịch). Nhịp chậm triệu chứng kháng Atropin / Sốc tim: Truyền TM liên tục 2 - 10 mcg/phút.",
    mechanism: "Chủ vận alpha-1 (co mạch ngoại vi mạnh làm tăng áp lực tưới máu mạch vành và não trong CPR); chủ vận beta-1 (tăng co bóp và tần số tim); beta-2 (giãn phế quản).",
    indications: ["Ngừng tuần hoàn (Mọi dạng nhịp: Vô tâm thu, PEA, Rung thất, Nhanh thất vô mạch)", "Sốc phản vệ", "Nhịp chậm trơ tụt huyết áp"],
    contraindications: ["Không có chống chỉ định tuyệt đối trong tình huống ngừng tim cấp cứu."],
    adverseEffects: "Loạn nhịp thất nguy hiểm, tăng gánh oxy cơ tim, thiếu máu cục bộ ngoại vi.",
    administrationInstructions: "Tiêm tĩnh mạch trung tâm hoặc tĩnh mạch ngoại vi lớn, tráng ngay 20ml dịch và nâng chi.",
  },
  calcium_gluconate: {
    id: "calcium_gluconate",
    name: "Canxi Gluconat 10%",
    brandName: "Calcium Gluconate 10% (ống 10ml = 1g)",
    category: "Chất ổn định màng tế bào cơ tim / Bổ sung điện giải",
    dosage: "10 ml (1 ống = 1g) IV tiêm chậm trong 5 - 10 phút. Có thể nhắc lại sau 5 phút nếu QRS còn dãn rộng.",
    mechanism: "Đối kháng trực tiếp tác dụng khử cực của Kali trên màng cơ tim, nâng ngưỡng điện thế hoạt động, phục hồi tính ổn định điện học của màng tim mà không làm thay đổi nồng độ Kali huyết thanh.",
    indications: ["Tăng Kali máu nặng (K+ > 6.5 mmol/L hoặc có biến đổi sóng T nhọn, QRS dãn rộng)", "Ngộ độc thuốc chẹn kênh canxi", "Hạ Canxi máu nặng có triệu chứng"],
    contraindications: ["NGỘ ĐỘC DIGOXIN (Digitalis Toxicity) - Chống chỉ định tuyệt đối do gây ngừng tim thể co cứng 'Stone Heart'"],
    adverseEffects: "Tiêm quá nhanh gây tụt huyết áp, nhịp chậm xoang, ngừng tim.",
    administrationInstructions: "Tiêm TM chậm có theo dõi liên tục điện tâm đồ trên monitor. Tránh tiêm chung đường truyền với dung dịch chứa Bicarbonate (gây tủa CaCO3).",
  },
  magnesium_sulfate: {
    id: "magnesium_sulfate",
    name: "Magnesi Sulfat 15%",
    brandName: "Magnesium Sulfate 15% (ống 10ml = 1.5g)",
    category: "Chất ổn định màng / Đồng vận kênh ion",
    dosage: "Cơn Xoắn đỉnh (Torsades de Pointes): 2g IV pha trong 10-20ml Glucose 5% tiêm chậm trong 1 - 2 phút; sau đó truyền duy trì 1 - 2 g/giờ.",
    mechanism: "Chẹn dòng canxi đi vào tế bào cơ tim, ức chế các hiện tượng khử cực sớm sau (EAD - early afterdepolarizations) vốn là cơ chế kích phát xoắn đỉnh.",
    indications: ["Cơn xoắn đỉnh (Torsades de Pointes)", "Hạ Magnesi máu nặng", "Rối loạn nhịp thất do ngộ độc Digoxin", "Tiền sản giật / Sản giật"],
    contraindications: ["Block AV độ cao", "Suy thận nặng vô niệu", "Nhược cơ"],
    adverseEffects: "Mất phản xạ gân xương, ức chế hô hấp, tụt huyết áp.",
    administrationInstructions: "Theo dõi phản xạ gân bánh chè và nhịp thở trong suốt quá trình truyền.",
  },
  nitroglycerin: {
    id: "nitroglycerin",
    name: "Nitroglycerin (Glyceril Trinitrat)",
    brandName: "Nitromint 0.4mg xịt dưới lưỡi / Nitroglycerin 10mg/10ml truyền TM",
    category: "Thuốc giãn mạch nhóm Nitrat hữu cơ",
    dosage: "Xịt dưới lưỡi 0.4 mg mỗi 5 phút (tối đa 3 lần). Truyền tĩnh mạch liên tục khởi đầu 5 - 10 mcg/phút, tăng dần 5 mcg/phút mỗi 5 phút đến khi giảm đau ngực.",
    mechanism: "Chuyển hóa thành Nitric Oxide (NO), kích hoạt guanylyl cyclase làm tăng cGMP, gây giãn tĩnh mạch ngoại vi (giảm tiền tải) và giãn các động mạch vành thượng tâm mạc.",
    indications: ["Hội chứng vành cấp (STEMI / NSTEMI / Đau thắt ngực không ổn định)", "Phù phổi cấp huyết động"],
    contraindications: [
      "Nhồi máu cơ tim thất phải (kèm STEMI thành dưới có ST chênh lên ở V4R)",
      "Huyết áp tâm thu < 90 mmHg hoặc tụt > 30 mmHg so với ban đầu",
      "Đã sử dụng thuốc ức chế PDE-5 (Sildenafil trong 24h, Tadalafil trong 48h)",
      "Hẹp van động mạch chủ khít",
    ],
    adverseEffects: "Tụt huyết áp nặng, nhịp nhanh phản xạ, đau đầu dữ dội.",
    administrationInstructions: "Đo huyết áp trước mỗi lần xịt hoặc chỉnh liều truyền. Phải có đường truyền tĩnh mạch sẵn sàng bù dịch nếu tụt áp.",
  },
  aspirin: {
    id: "aspirin",
    name: "Aspirin (Acid Acetylsalicylic)",
    brandName: "Aspégic / Aspirin 81mg - 100mg - 325mg",
    category: "Thuốc chống kết tập tiểu cầu (Ức chế COX-1 không hồi phục)",
    dosage: "Liều nạp khẩn cấp: 162 mg - 325 mg uống nhai nát ngay khi tiếp cận.",
    mechanism: "Acetyl hóa không thuận nghịch enzyme cyclooxygenase-1 (COX-1) của tiểu cầu, ngăn chặn tổng hợp Thromboxane A2 trong suốt vòng đời của tiểu cầu (7-10 ngày).",
    indications: ["Hội chứng mạch vành cấp (STEMI, NSTEMI, Đau thắt ngực không ổn định)", "Nghi ngờ nhồi máu não cấp tính (sau khi loại trừ xuất huyết)"],
    contraindications: ["Dị ứng nghiêm trọng với Aspirin", "Xuất huyết tiêu hóa đang hoạt động", "Rối loạn đông máu nặng"],
    adverseEffects: "Kích ứng dạ dày, loét, chảy máu vi thể.",
    administrationInstructions: "Phải yêu cầu bệnh nhân nhai vụn viên thuốc trước khi nuốt để hấp thu nhanh qua niêm mạc miệng và dạ dày.",
  },
  ticagrelor: {
    id: "ticagrelor",
    name: "Ticagrelor",
    brandName: "Brilinta 90mg",
    category: "Thuốc chống kết tập tiểu cầu ức chế P2Y12 trực tiếp có hồi phục",
    dosage: "Liều nạp khẩn cấp: 180 mg (2 viên 90mg) uống stat một lần duy nhất; sau đó duy trì 90 mg x 2 lần/ngày.",
    mechanism: "Đối kháng chọn lọc và có hồi phục tại thụ thể P2Y12 của ADP trên bề mặt tiểu cầu, không cần qua bước hoạt hóa enzyme gan CYP2C19.",
    indications: ["Hội chứng mạch vành cấp phối hợp cùng Aspirin để can thiệp PCI thì đầu"],
    contraindications: ["Tiền sử xuất huyết nội sọ", "Đang chảy máu tạng nguy hiểm", "Suy gan trung bình đến nặng"],
    adverseEffects: "Khó thở (do tăng nồng độ adenosine ngoại bào), chảy máu, nhịp chậm thất.",
    administrationInstructions: "Có thể nghiền nát viên thuốc hòa nước cho uống hoặc qua sonde dạ dày nếu bệnh nhân không nuốt được.",
  },
  heparin_ufh: {
    id: "heparin_ufh",
    name: "Heparin không phân đoạn (UFH)",
    brandName: "Heparin 25.000 IU/5ml",
    category: "Thuốc chống đông đường tiêm tĩnh mạch",
    dosage: "Liều nạp: 60 IU/kg tiêm TM (tối đa 4000 IU); sau đó truyền liên tục 12 IU/kg/giờ (tối đa 1000 IU/giờ) điều chỉnh theo aPTT mục tiêu 1.5 - 2.0 lần chứng.",
    mechanism: "Gắn kết và tăng hoạt tính của Antithrombin III lên 1000 lần, bất hoạt yếu tố IIa (Thrombin) và Xa.",
    indications: ["STEMI can thiệp PCI thì đầu", "Thuyên tắc động mạch phổi cấp nguy cơ cao", "Rung nhĩ có nguy cơ huyết khối cao"],
    contraindications: ["Giảm tiểu cầu do heparin (HIT) trong tiền sử", "Xuất huyết tạng tiến triển", "Chọc dò tủy sống gần đây"],
    adverseEffects: "Xuất huyết, giảm tiểu cầu do miễn dịch (HIT).",
    administrationInstructions: "Dễ dàng hóa giải nhanh chóng bằng Protamine Sulfate nếu có biến chứng chảy máu.",
  },
  alteplase_tpa: {
    id: "alteplase_tpa",
    name: "Alteplase (rt-PA)",
    brandName: "Actilyse 50mg lọ bột đông khô",
    category: "Thuốc tiêu sợi huyết chọn lọc trên Fibrin",
    dosage: "Thuyên tắc phổi cấp đe dọa tính mạng: 100 mg truyền tĩnh mạch liên tục trong 2 giờ. STEMI (nếu không PCI được trong 120 phút): Phác đồ gia tốc 15mg bolus, 0.75 mg/kg trong 30 phút, 0.5 mg/kg trong 60 phút.",
    mechanism: "Hoạt hóa trực tiếp plasminogen liên kết với fibrin thành plasmin, cắt vụn mạng lưới fibrin của cục máu đông.",
    indications: ["Thuyên tắc phổi diện rộng có sốc tụt huyết áp", "STEMI giờ thứ 0 - 12 khi không thể chuyển can thiệp mạch vành kịp thời", "Đột quỵ thiếu máu não cấp < 4.5 giờ"],
    contraindications: ["Tiền sử xuất huyết não bất kỳ thời điểm nào", "Chấn thương sọ não hoặc phẫu thuật lớn < 3 tháng", "Bóc tách động mạch chủ"],
    adverseEffects: "Chảy máu nội sọ tử vong, xuất huyết nội tạng nặng.",
    administrationInstructions: "Theo dõi tri giác và huyết áp mỗi 15 phút trong suốt thời gian truyền.",
  },
  digifab: {
    id: "digifab",
    name: "Digoxin Immune Fab (DigiFab)",
    brandName: "DigiFab lọ 40mg",
    category: "Kháng thể gắn đặc hiệu Digoxin (Antidote ngộ độc Digitalis)",
    dosage: "Ngộ độc cấp đe dọa tính mạng chưa rõ liều: 10 - 20 lọ IV pha trong 100ml NaCl 0.9% truyền trong 30 phút. Nếu ngừng tim tiêm bolus tĩnh mạch trực tiếp.",
    mechanism: "Các mảnh kháng thể đơn dòng gắn đặc hiệu với phân tử Digoxin tự do trong huyết tương, kéo Digoxin ra khỏi vị trí gắn trên bơm Na+/K+ ATPase của tế bào cơ tim.",
    indications: ["Ngộ độc Digoxin có rối loạn nhịp thất đe dọa tính mạng, block AV độ III kháng Atropin hoặc K+ > 5.0 mmol/L"],
    contraindications: ["Dị ứng với protein cừu"],
    adverseEffects: "Tụt Kali máu sau khi thuốc tác dụng, làm tái phát suy tim sung huyết.",
    administrationInstructions: "Nồng độ Digoxin máu sau khi dùng DigiFab sẽ tăng vọt vì đo cả phức hợp gắn kháng thể; không dùng nồng độ định lượng để đánh giá hiệu quả mà dựa vào lâm sàng và ECG.",
  },
  insulin_glucose: {
    id: "insulin_glucose",
    name: "Insulin Regular + Glucose 20-50%",
    brandName: "Actrapid 100 UI/ml + Dextrose 50% hoặc 20%",
    category: "Phương pháp vận chuyển Kali nội bào cấp cứu",
    dosage: "10 đơn vị Insulin Regular tiêm TM tĩnh mạch cùng lúc với 50 ml Glucose 50% (hoặc 250ml Glucose 20%) truyền nhanh trong 15-30 phút.",
    mechanism: "Insulin kích thích trực tiếp bơm Na+/K+ ATPase trên màng tế bào vân và gan, bơm ion K+ từ huyết tương vào nội bào, làm giảm K+ máu 0.5 - 1.2 mmol/L trong 4 - 6 giờ.",
    indications: ["Tăng Kali máu cấp cứu (K+ > 6.0 mmol/L)"],
    contraindications: ["Hạ đường huyết (đường huyết mao mạch < 4.0 mmol/L) - phải bù thêm đường trước"],
    adverseEffects: "Hạ đường huyết muộn (sau 1-2 giờ).",
    administrationInstructions: "Bắt buộc thử đường huyết mao mạch trước khi tiêm và kiểm tra lại mỗi giờ trong 4 giờ sau đó.",
  },
  potassium_chloride: {
    id: "potassium_chloride",
    name: "Kali Clorid (KCl 10%)",
    brandName: "KCl 10% (ống 10ml chứa 13.4 mEq K+)",
    category: "Dung dịch bù điện giải",
    dosage: "Hạ Kali máu cấp có biến đổi ECG: Pha loãng vào 500ml NaCl 0.9%, truyền TM ngoại vi tối đa 10 - 20 mEq/giờ; qua catheter tĩnh mạch trung tâm có thể lên đến 40 mEq/giờ có monitor.",
    mechanism: "Tái nạp nồng độ Kali ngoại bào, phục hồi điện thế nghỉ của màng tế bào cơ tim và chống lại hiện tượng tái cực muộn kích phát loạn nhịp thất.",
    indications: ["Hạ Kali máu có biến đổi ECG (sóng U cao, T dẹt, ngoại tâm thu thất, QT kéo dài)", "Hạ Kali máu < 3.0 mmol/L"],
    contraindications: ["Suy thận cấp vô niệu", "Tăng Kali máu", "TUYỆT ĐỐI CẤM TIÊM TĨNH MẠCH TRỰC TIẾP (IV BOLUS) VÌ GÂY NGỪNG TIM NGAY LẬP TỨC"],
    adverseEffects: "Đau bỏng rát dọc tĩnh mạch ngoại vi, viêm tĩnh mạch huyết khối, ngừng tim nếu truyền quá nhanh.",
    administrationInstructions: "Tuyệt đối không bao giờ tiêm bolus tĩnh mạch. Luôn kiểm tra nồng độ Magnesi máu đi kèm vì nếu hạ Mg2+ thì bù K+ sẽ không hiệu quả.",
  },
};

// ============================================================================
// 2. DANH MỤC THỦ THUẬT CAN THIỆP CẤP CỨU (EMERGENCY INTERVENTIONS)
// ============================================================================
export const EMERGENCY_INTERVENTIONS: Record<string, EmergencyIntervention> = {
  synchronized_cardioversion: {
    id: "synchronized_cardioversion",
    name: "Sốc Điện Chuyển Nhịp Đồng Bộ (Synchronized Cardioversion)",
    type: "electrical",
    energyOrSetting: "50J - 100J - 200J (Máy 2 pha Biphasic)",
    description: "Phát xung điện đồng bộ chính xác với đỉnh sóng R của phức bộ QRS để tránh phát nhầm vào sườn sau sóng T (hiện tượng R-on-T gây rung thất).",
    indications: ["Cơn nhịp nhanh trên thất (SVT), Rung nhĩ, Cuồng nhĩ, Nhanh thất có mạch (VT) CÓ DẤU HIỆU HUYẾT ĐỘNG KHÔNG ỔN ĐỊNH (Tụt HA, đau ngực, phù phổi, lơ mơ)."],
    contraindications: ["Rung thất (VF) và Nhanh thất mất mạch (pVT) - PHẢI SỐC PHÁ RUNG KHÔNG ĐỒNG BỘ", "Ngộ độc Digitalis (nguy cơ phát sinh VF trơ)"],
  },
  defibrillation: {
    id: "defibrillation",
    name: "Sốc Điện Phá Rung Không Đồng Bộ (Defibrillation)",
    type: "electrical",
    energyOrSetting: "200J (Máy 2 pha Biphasic) hoặc 360J (Máy 1 pha Monophasic)",
    description: "Phóng xung điện năng lượng cao tức thì khử cực toàn bộ khối cơ tim cùng lúc để tạo cơ hội cho nút xoang tái chiếm quyền chủ nhịp.",
    indications: ["Rung thất (Ventricular Fibrillation - VF)", "Cơn nhanh thất mất mạch (Pulseless VT)"],
    contraindications: ["VÔ TÂM THU (ASYSTOLE) HOẶC PHÂN LY ĐIỆN CƠ (PEA) - TUYỆT ĐỐI CHỐNG CHỈ ĐỊNH VÌ GÂY BỎNG CƠ TIM VÀ MẤT THỜI GIAN ÉP TIM"],
  },
  transcutaneous_pacing: {
    id: "transcutaneous_pacing",
    name: "Đặt Máy Tạo Nhịp Qua Da Cấp Cứu (TCP - Transcutaneous Pacing)",
    type: "electrical",
    energyOrSetting: "Tần số: 60 - 70 bpm; Dòng điện: Tăng dần từ 30mA đến khi bắt được thất (Electrical & Mechanical capture) + thêm 10% ngưỡng an toàn.",
    description: "Dán hai bản điện cực lớn trước ngực và sau lưng nối với máy sốc điện có chức năng pacing để kích thích tâm thất co bóp nhân tạo qua thành ngực.",
    indications: ["Nhịp chậm triệu chứng nặng kháng Atropin", "Block AV độ II Mobitz II", "Block AV độ III phân ly nhĩ thất hoàn toàn"],
    contraindications: ["Hạ thân nhiệt nặng", "Vô tâm thu kéo dài"],
  },
  cpr: {
    id: "cpr",
    name: "Hồi Sinh Tim Phổi Cơ Bản & Nâng Cao (ACLS CPR)",
    type: "mechanical",
    energyOrSetting: "Tần số ép tim 100 - 120 lần/phút, độ sâu 5 - 6 cm, để ngực nở hoàn toàn sau mỗi lần ép. Tỉ lệ 30 ép : 2 bóp bóng.",
    description: "Ép tim liên tục chất lượng cao nhằm duy trì áp lực tưới máu mạch vành tối thiểu (> 15 mmHg) và tưới máu não.",
    indications: ["Ngừng tuần hoàn (Không thở/thở ngáp, không bắt được mạch cảnh)"],
    contraindications: ["Bệnh nhân còn mạch rõ hoặc có chỉ định DNR (Do Not Resuscitate) hợp pháp"],
  },
  primary_pci: {
    id: "primary_pci",
    name: "Can Thiệp Động Mạch Vành Qua Da Thì Đầu (Primary PCI)",
    type: "revascularization",
    energyOrSetting: "Mục tiêu thời gian Door-to-Balloon < 90 phút (tại viện có cathlab) hoặc Door-in-Door-out < 120 phút (chuyển viện)",
    description: "Chụp mạch vành qua đường động mạch quay hoặc đùi, hút huyết khối và nong đặt stent phủ thuốc tái thông dòng chảy mạch vành bị tắc nghẽn.",
    indications: ["Nhồi máu cơ tim cấp ST chênh lên (STEMI) trong vòng 12 giờ đầu từ khi khởi phát đau ngực"],
    contraindications: ["Không có chống chỉ định tuyệt đối nếu lợi ích cứu sống tính mạng vượt trội."],
  },
  valsalva_maneuver: {
    id: "valsalva_maneuver",
    name: "Nghiệm Pháp Valsalva Cải Tiến (Modified REVERT Valsalva)",
    type: "procedural",
    energyOrSetting: "Thổi vào ống tiêm 10ml tạo áp lực 40 mmHg trong 15 giây, sau đó hạ ngay đầu giường xuống phẳng và giơ hai chân bệnh nhân lên cao 45 độ trong 15 giây.",
    description: "Tăng áp lực trong lồng ngực kích thích phản xạ cung phản xạ xoang cảnh - phó giao cảm, làm tăng xung động thần kinh phế vị ức chế nút AV để cắt cơn SVT.",
    indications: ["Cơn nhịp nhanh kịch phát trên thất (SVT/AVNRT) huyết động còn ổn định."],
    contraindications: ["Huyết động không ổn định (tụt HA, phù phổi cấp)", "Hẹp van động mạch chủ nặng", "Tăng nhãn áp cấp"],
  },
};

// ============================================================================
// 3. MA TRẬN CẢM BẪY & CHỐNG CHỈ ĐỊNH ĐỎ (CRITICAL SAFETY GUARD RULES)
// ============================================================================
export const CRITICAL_CONTRAINDICATION_RULES: ContraindicationAlert[] = [
  {
    isContraindicated: true,
    severity: "FATAL",
    title: "Chống Chỉ Định Dùng Nitrat / Morphin Trong Nhồi Máu Thất Phải (Inferior STEMI + RV Infarct)",
    danger: "Gây tụt huyết áp trụy mạch đột ngột, sốc tim và ngừng tuần hoàn không hồi phục.",
    mechanism: "Tâm thất phải bị nhồi máu mất khả năng co bóp tống máu, cung lượng tim phụ thuộc hoàn toàn vào áp lực đổ đầy tĩnh mạch (tiền tải). Nitroglycerin và Morphin gây giãn hệ tĩnh mạch cực mạnh, triệt tiêu tiền tải dẫn đến tụt huyết áp thảm họa.",
    safeAlternative: "Tuyệt đối không dùng Nitrat/Morphin. Hồi sức tích cực bằng truyền dịch đẳng trương NaCl 0.9% 500 - 1000ml để nâng tiền tải, và kích hoạt PCI thì đầu khẩn cấp.",
  },
  {
    isContraindicated: true,
    severity: "FATAL",
    title: "Chống Chỉ Định Dùng Thuốc Chẹn Nút AV (Chẹn Beta, Verapamil, Diltiazem, Digoxin, Adenosine) Trong Rung Nhĩ Kèm Hội Chứng WPW",
    danger: "Khởi phát ngay lập tức Rung Thất (Ventricular Fibrillation) gây đột tử trên bàn điều trị.",
    mechanism: "Khi ức chế dẫn truyền qua nút nhĩ thất bình thường, toàn bộ hàng trăm xung động nhĩ cực nhanh (400-600 cpm) sẽ dẫn truyền độc quyền qua cầu Kent (đường phụ không có trơ), dẫn thẳng vào tâm thất với tỉ lệ 1:1, biến rung nhĩ thành rung thất trong chớp mắt.",
    safeAlternative: "Sốc điện đồng bộ (Synchronized Cardioversion) ngay nếu có tụt áp; hoặc dùng thuốc chống loạn nhịp ức chế đường phụ như Procainamide hoặc Ibutilide.",
  },
  {
    isContraindicated: true,
    severity: "FATAL",
    title: "Chống Chỉ Định Tuyệt Đối Tiêm Canxi Trong Ngộ Độc Digoxin (Digitalis Toxicity)",
    danger: "Gây hiện tượng tim co cứng không thể giãn ra ('Stone Heart') và ngừng tim vĩnh viễn.",
    mechanism: "Digoxin ức chế bơm Na+/K+ ATPase dẫn đến tích tụ nồng độ canxi nội bào rất cao. Tiêm thêm canxi ngoại bào sẽ làm canxi tràn ồ ạt vào ty thể và tơ cơ, gắn chặt actin-myosin khiến tim bị co rút cứng đờ không thể tái giãn thì tâm trương.",
    safeAlternative: "Sử dụng kháng thể đặc hiệu DigiFab (Fab fragments) 10-20 lọ, bù Magnesi Sulfat 2g TM, và điều trị nhịp chậm bằng Atropin hoặc đặt máy tạo nhịp tạm thời.",
  },
  {
    isContraindicated: true,
    severity: "CRITICAL",
    title: "Chống Chỉ Định Sốc Điện Trong Vô Tâm Thu (Asystole) Hoặc Phân Ly Điện Cơ (PEA)",
    danger: "Lãng phí thời gian vàng ép tim, gây bỏng hoại tử cơ tim nặng và triệt tiêu cơ hội nút xoang tự hồi phục.",
    mechanism: "Sốc điện chỉ có tác dụng đồng bộ hóa lại các tế bào cơ tim đang khử cực hỗn loạn vô tổ chức (như Rung thất, Nhanh thất). Trong vô tâm thu hoàn toàn không có hoạt động điện, sốc điện không có tác dụng khử cực mà chỉ sinh nhiệt phá hủy tế bào cơ tim còn sót lại.",
    safeAlternative: "Ép tim CPR liên tục chất lượng cao không gián đoạn, tiêm Adrenaline 1mg IV mỗi 3-5 phút, và truy tìm tích cực 5H & 5T (Hypoxia, Hypovolemia, Hydrogen ion, Hypo/Hyperkalemia, Hypothermia, Tension pneumo, Tamponade, Toxins, Thrombosis).",
  },
  {
    isContraindicated: true,
    severity: "FATAL",
    title: "Chống Chỉ Định Dùng Amiodarone Hoặc Sotalol Trong Cơn Xoắn Đỉnh (Torsades de Pointes)",
    danger: "Kéo dài thêm khoảng QT dẫn đến cơn xoắn đỉnh kéo dài liên tục, thoái triển thành Rung thất và tử vong.",
    mechanism: "Amiodarone và Sotalol là thuốc nhóm III chẹn kênh Kali IKr, làm chậm hơn nữa thời gian tái cực của thất, kéo dài thêm khoảng QT và gia tăng hiện tượng điện thế kích hoạt sớm (early afterdepolarization).",
    safeAlternative: "Tiêm tĩnh mạch Magnesi Sulfat 2g trong 1-2 phút; tăng tần số tim cơ bản bằng máy tạo nhịp tạm thời hoặc truyền Isoproterenol để rút ngắn khoảng QT; ngừng ngay mọi thuốc kéo dài QT.",
  },
  {
    isContraindicated: true,
    severity: "CRITICAL",
    title: "Chống Chỉ Định Thuốc Chẹn Kênh Natri (Flecainide, Propafenone, Procainamide) Trong Hội Chứng Brugada",
    danger: "Làm bùng phát ST chênh lên dạng bia mộ ở V1-V2 và kích hoạt cơn rung thất tử vong trong giấc ngủ.",
    mechanism: "Brugada là bệnh lý đột biến mất chức năng kênh Natri Nav1.5 (SCN5A). Các thuốc chống loạn nhịp nhóm I chẹn kênh Natri sẽ làm suy sụp trầm trọng hơn dòng Na+ vào, gây mất cân bằng điện thế xuyên thành và khởi phát bão điện học.",
    safeAlternative: "Hạ sốt tích cực bằng Paracetamol (sốt là yếu tố kích phát hàng đầu); chỉ định cấy máy phá rung tự động (ICD); nếu bão nhịp dùng Isoproterenol hoặc Quinidine.",
  },
  {
    isContraindicated: true,
    severity: "CRITICAL",
    title: "Chống Chỉ Định Thuốc Chẹn Beta & Chẹn Canxi Không Dihydropyridine Trong Block Nhĩ Thất Độ II Mobitz II & Độ III",
    danger: "Ức chế nút nhĩ thất và tầng dẫn truyền dưới bó His, đẩy nhịp thất rơi vào vô tâm thu (asystole) tử vong.",
    mechanism: "Các thuốc này làm giảm dẫn truyền dromotropic âm tính và giảm tính tự động của các ổ chủ nhịp thoát thất dự phòng.",
    safeAlternative: "Chuẩn bị đặt máy tạo nhịp tạm thời qua da (TCP) hoặc qua buồng tim khẩn cấp; dùng Atropin thận trọng hoặc truyền Adrenaline / Dopamine duy trì huyết động.",
  },
];

// ============================================================================
// 4. HÀM KIỂM TRA CHỐNG CHỈ ĐỊNH ĐỘNG (SAFETY GUARD CHECKER)
// ============================================================================
export function checkEmergencyContraindications(
  rhythmId: string,
  actionOrDrugId: string
): ContraindicationAlert {
  const normAction = actionOrDrugId.toLowerCase();
  const normRhythm = rhythmId.toLowerCase();

  // 1. STEMI thành dưới / thất phải + Nitrat/Morphin
  if (
    normRhythm === "stemi_inferior" &&
    (normAction.includes("nitrat") || normAction.includes("nitro") || normAction.includes("morphin") || normAction === "nitroglycerin")
  ) {
    return CRITICAL_CONTRAINDICATION_RULES[0];
  }

  // 2. Rung nhĩ + WPW (hoặc WPW đơn thuần) + Thuốc chẹn nút AV
  if (
    (normRhythm === "wpw_syndrome" || normRhythm === "atrial_fibrillation") &&
    (normAction.includes("verapamil") || normAction.includes("diltiazem") || normAction.includes("digoxin") || normAction.includes("metoprolol") || normAction.includes("chẹn beta") || normAction === "adenosine")
  ) {
    if (normRhythm === "wpw_syndrome" || normAction.includes("wpw")) {
      return CRITICAL_CONTRAINDICATION_RULES[1];
    }
  }

  // 3. Ngộ độc Digoxin + Canxi
  if (
    normRhythm === "digoxin_toxicity" &&
    (normAction.includes("calcium") || normAction.includes("canxi") || normAction === "calcium_gluconate")
  ) {
    return CRITICAL_CONTRAINDICATION_RULES[2];
  }

  // 4. Vô tâm thu / PEA + Sốc điện
  if (
    normRhythm === "asystole" &&
    (normAction.includes("sốc") || normAction.includes("cardioversion") || normAction.includes("defibrillation") || normAction === "defibrillation" || normAction === "synchronized_cardioversion")
  ) {
    return CRITICAL_CONTRAINDICATION_RULES[3];
  }

  // 5. Xoắn đỉnh + Amiodarone / Sotalol
  if (
    normRhythm === "torsades_de_pointes" &&
    (normAction.includes("amiodarone") || normAction.includes("sotalol") || normAction.includes("cordarone"))
  ) {
    return CRITICAL_CONTRAINDICATION_RULES[4];
  }

  // 6. Brugada + Thuốc chẹn kênh Natri
  if (
    normRhythm === "brugada_type1" &&
    (normAction.includes("flecainide") || normAction.includes("propafenone") || normAction.includes("procainamide"))
  ) {
    return CRITICAL_CONTRAINDICATION_RULES[5];
  }

  // 7. Block AV độ cao + Thuốc chẹn AV
  if (
    (normRhythm === "av_block_mobitz_2" || normRhythm === "av_block_third_degree") &&
    (normAction.includes("metoprolol") || normAction.includes("chẹn beta") || normAction.includes("verapamil") || normAction.includes("diltiazem"))
  ) {
    return CRITICAL_CONTRAINDICATION_RULES[6];
  }

  // Mặc định an toàn
  return {
    isContraindicated: false,
    severity: "CAUTION",
    title: "Y lệnh phù hợp",
    danger: "Không phát hiện chống chỉ định tuyệt đối theo phác đồ cấp cứu chuẩn.",
    mechanism: "Phù hợp với hướng dẫn thực hành lâm sàng của Bộ Y Tế và ACLS.",
    safeAlternative: "Tiến hành theo dõi sát các chỉ số sinh tồn và đáp ứng điện tim của bệnh nhân.",
  };
}

// ============================================================================
// 5. HÀM TRÍCH XUẤT PHÁC ĐỒ CẤP CỨU TOÀN DIỆN CHO TỪNG BỆNH LÝ
// ============================================================================
export function getEmergencyProtocolForRhythm(rhythmId: string): RhythmEmergencyProtocol {
  switch (rhythmId) {
    case "stemi_inferior":
    case "stemi_anterior":
    case "stemi_lateral":
    case "stemi_posterior":
      return {
        rhythmId,
        aclsCategory: "acs_stemi",
        priorityLevel: "CODE RED (Tối khẩn)",
        primaryGoal: "Tái tưới máu mạch vành khẩn cấp (Primary PCI) trong vòng 90 phút kể từ lúc tiếp cận.",
        actionSequence: [
          { step: 1, action: "Bất động tuyệt đối, thở Oxy nếu SpO2 < 90%", details: "Giảm gánh nặng tiêu thụ oxy cho vùng cơ tim đang thiếu máu cục bộ cấp tính." },
          { step: 2, action: "Nhai ngay Aspirin 300mg + Ticagrelor 180mg", details: "Kháng kết tập tiểu cầu kép (DAPT) ức chế hình thành thêm huyết khối cấp." },
          { step: 3, action: "Kiểm tra đo thêm chuyển đạo thất phải V3R-V4R", details: "Nếu ST chênh lên ở V4R: Chẩn đoán nhồi máu thất phải -> TUYỆT ĐỐI KHÔNG DÙNG NITRAT HOẶC MORPHIN." },
          { step: 4, action: "Báo động Cath Lab phòng can thiệp", details: "Chuyển thẳng phòng Can thiệp mạch vành thì đầu, không chờ kết quả men tim nếu ECG đã rõ ràng." },
        ],
        firstLineDrugs: ["aspirin", "ticagrelor", "heparin_ufh"],
        secondLineDrugs: ["nitroglycerin", "metoprolol"],
        recommendedInterventions: ["primary_pci"],
        absoluteContraindications: [
          "Cấm dùng Nitroglycerin / Morphin nếu có nhồi máu thất phải hoặc huyết áp tâm thu < 90 mmHg.",
          "Cấm dùng thuốc tiêu sợi huyết nếu đã quá 12 giờ hoặc có tiền sử xuất huyết não.",
        ],
        targetDisposition: "Phòng Can Thiệp Mạch Vành (Cath Lab)",
      };

    case "ventricular_fibrillation":
      return {
        rhythmId,
        aclsCategory: "cardiac_arrest",
        priorityLevel: "CODE RED (Tối khẩn)",
        primaryGoal: "Phá rung ngay lập tức + Ép tim ngoài lồng ngực liên tục để tái lập tuần hoàn tự nhiên (ROSC).",
        actionSequence: [
          { step: 1, action: "Sốc điện phá rung không đồng bộ 200J Biphasic ngay", details: "Mỗi phút chậm trễ làm giảm 7-10% cơ hội sống sót của bệnh nhân." },
          { step: 2, action: "Ép tim CPR 2 phút ngay sau cú sốc", details: "Tần số 100-120 l/p, không dừng lại kiểm tra mạch ngay mà ép tim 2 phút liền." },
          { step: 3, action: "Thiết lập đường truyền TM/IO & Tiêm Adrenaline 1mg", details: "Tiêm Adrenaline 1mg mỗi 3-5 phút sau lần sốc điện thứ 2." },
          { step: 4, action: "Amiodarone 300mg IV bolus nếu VF trơ", details: "Tiêm sau lần sốc thứ 3; nếu còn rung thất nhắc lại 150mg." },
        ],
        firstLineDrugs: ["adrenaline", "amiodarone"],
        secondLineDrugs: ["magnesium_sulfate"],
        recommendedInterventions: ["defibrillation", "cpr"],
        absoluteContraindications: [
          "CẤM SỐC ĐỒNG BỘ (máy sẽ không thể nhận diện sóng R để phát xung).",
          "CẤM NGỪNG ÉP TIM QUÁ 10 GIÂY.",
        ],
        targetDisposition: "Hồi Sức Cấp Cứu (ICU)",
      };

    case "asystole":
      return {
        rhythmId,
        aclsCategory: "cardiac_arrest",
        priorityLevel: "CODE RED (Tối khẩn)",
        primaryGoal: "Hồi sinh tim phổi liên tục chất lượng cao và truy tìm nguyên nhân có thể đảo ngược (5H & 5T).",
        actionSequence: [
          { step: 1, action: "Ép tim ngoài lồng ngực CPR chất lượng cao", details: "Tần số 100-120 l/p, độ sâu 5-6cm, đổi người ép mỗi 2 phút." },
          { step: 2, action: "Tiêm Adrenaline 1mg TM/IO lập tức", details: "Nhắc lại mỗi 3 - 5 phút một lần, tráng 20ml dịch muối sinh lý." },
          { step: 3, action: "Đặt ống nội khí quản và kiểm tra đường thở", details: "Thở bóp bóng 1 nhịp mỗi 6 giây (10 nhịp/phút) không ngắt quãng ép tim." },
          { step: 4, action: "Rà soát điều trị 5H & 5T", details: "Đặc biệt chú ý tăng Kali máu (tiêm Canxi), toan chuyển hóa nặng (Bicarbonate), thiếu oxy, tràn khí màng phổi áp lực." },
        ],
        firstLineDrugs: ["adrenaline"],
        secondLineDrugs: ["calcium_gluconate", "sodium_bicarbonate"],
        recommendedInterventions: ["cpr"],
        absoluteContraindications: [
          "TUYỆT ĐỐI CẤM SỐC ĐIỆN PHÁ RUNG (sẽ phá hủy hoàn toàn cơ tim còn lại).",
          "Không dùng Atropin trong ngừng tim thường quy (hướng dẫn AHA đã loại bỏ).",
        ],
        targetDisposition: "Hồi Sức Cấp Cứu (ICU)",
      };

    case "torsades_de_pointes":
      return {
        rhythmId,
        aclsCategory: "tachycardia_unstable",
        priorityLevel: "CODE RED (Tối khẩn)",
        primaryGoal: "Cắt cơn xoắn đỉnh bằng Magnesi Sulfat và rút ngắn khoảng QT bằng tăng tần số tim.",
        actionSequence: [
          { step: 1, action: "Tiêm Magnesi Sulfat 2g IV trong 1-2 phút", details: "Bất kể nồng độ Magnesi máu bình thường hay giảm, Magnesi là thuốc đặc hiệu hàng đầu." },
          { step: 2, action: "Sốc điện khử rung nếu mất mạch hoặc tụt HA", details: "Do dạng sóng liên tục thay đổi cực tính, phải sốc không đồng bộ 200J như VF." },
          { step: 3, action: "Tăng tần số tim bằng máy tạo nhịp (Overdrive Pacing)", details: "Tạo nhịp tần số 90 - 110 bpm để rút ngắn khoảng QT phòng ngừa cơn tái phát." },
          { step: 4, action: "Ngừng ngay tất cả các thuốc kéo dài QT", details: "Rà soát kháng sinh Quinolone, Macrolide, thuốc chống loạn thần, thuốc chống trầm cảm." },
        ],
        firstLineDrugs: ["magnesium_sulfate"],
        secondLineDrugs: ["potassium_chloride"],
        recommendedInterventions: ["defibrillation", "transcutaneous_pacing"],
        absoluteContraindications: [
          "TUYỆT ĐỐI CẤM DÙNG AMIODARONE, SOTALOL, PROCAINAMIDE (làm QT dài thêm gây tử vong tức thì).",
        ],
        targetDisposition: "Hồi Sức Cấp Cứu (ICU)",
      };

    case "hyperkalemia":
      return {
        rhythmId,
        aclsCategory: "toxic_metabolic",
        priorityLevel: "CODE RED (Tối khẩn)",
        primaryGoal: "Ổn định màng tế bào cơ tim bằng Canxi, sau đó dịch chuyển Kali vào tế bào và thải trừ Kali.",
        actionSequence: [
          { step: 1, action: "Tiêm Canxi Gluconat 10% 10ml (1g) IV trong 5 phút", details: "Bảo vệ màng tế bào tim trong vòng 1-3 phút. Nếu QRS còn dãn rộng sau 5 phút: Tiêm thêm 1 liều nữa." },
          { step: 2, action: "Tiêm Insulin Regular 10 UI + 50ml Glucose 50% IV", details: "Kéo Kali từ ngoại bào vào trong tế bào, tác dụng sau 15-30 phút kéo dài 4-6 giờ." },
          { step: 3, action: "Khí dung Salbutamol liều cao 10 - 20mg", details: "Kích thích thụ thể beta-2 vận chuyển Kali vào tế bào hiệp đồng với Insulin." },
          { step: 4, action: "Chỉ định lọc máu cấp cứu (Hemodialysis)", details: "Phương pháp triệt để duy nhất loại bỏ hoàn toàn Kali dư thừa nếu suy thận vô niệu." },
        ],
        firstLineDrugs: ["calcium_gluconate", "insulin_glucose"],
        secondLineDrugs: ["furosemide", "sodium_bicarbonate"],
        recommendedInterventions: [],
        absoluteContraindications: [
          "Cấm tiêm Canxi nếu nghi ngờ ngộ độc Digitalis (gây co cứng tim tử vong).",
          "Cấm dùng các thuốc tăng kali máu (Spironolactone, ACEI, ARB, NSAID).",
        ],
        targetDisposition: "Hồi Sức Cấp Cứu (ICU)",
      };

    case "svt":
      return {
        rhythmId,
        aclsCategory: "tachycardia_stable",
        priorityLevel: "STAT (Khẩn cấp)",
        primaryGoal: "Cắt cơn nhịp nhanh kịch phát bằng ức chế dẫn truyền qua nút nhĩ thất (AV Node).",
        actionSequence: [
          { step: 1, action: "Thực hiện Nghiệm pháp Valsalva cải tiến (REVERT)", details: "Thổi syringe 10ml 15s rồi nằm ngửa giơ chân cao 45 độ. Tỉ lệ cắt cơn thành công lên đến 43%." },
          { step: 2, action: "Tiêm Adenosine 6mg IV push cực nhanh", details: "Tiêm qua chốt 3 ngã, xả ngay 20ml NaCl 0.9% và nâng cao tay." },
          { step: 3, action: "Nếu không cắt cơn: Tiêm tiếp Adenosine 12mg IV", details: "Sau 1 - 2 phút có thể tiêm thêm liều 12mg lần thứ hai nếu cần." },
          { step: 4, action: "Sốc điện đồng bộ 50 - 100J nếu tụt huyết áp", details: "Nếu bệnh nhân có tụt HA, đau ngực dữ dội hoặc suy tim cấp: Sốc điện ngay lập tức." },
        ],
        firstLineDrugs: ["adenosine"],
        secondLineDrugs: ["verapamil", "diltiazem", "metoprolol"],
        recommendedInterventions: ["valsalva_maneuver", "synchronized_cardioversion"],
        absoluteContraindications: [
          "Cấm Adenosine ở bệnh nhân hen phế quản nặng co thắt.",
          "Cấm xoa xoang cảnh đồng thời cả hai bên hoặc khi có âm thổi động mạch cảnh.",
        ],
        targetDisposition: "Khoa Cấp Cứu (ED)",
      };

    default:
      return {
        rhythmId,
        aclsCategory: "urgent_observation",
        priorityLevel: "URGENT (Khẩn)",
        primaryGoal: "Đánh giá toàn diện huyết động, điều trị bệnh nền và theo dõi điện tâm đồ liên tục.",
        actionSequence: [
          { step: 1, action: "Mắc monitor theo dõi liên tục 12 chuyển đạo", details: "Phát hiện sớm các đợt rối loạn nhịp kịch phát hoặc thiếu máu cục bộ tiến triển." },
          { step: 2, action: "Xét nghiệm điện giải đồ K+, Na+, Mg2+, Ca2+ và Men tim", details: "Loại trừ các rối loạn chuyển hóa và hoại tử cơ tim cấp tính." },
          { step: 3, action: "Rà soát tiền sử dùng thuốc gây độc tim mạch", details: "Các thuốc chống loạn nhịp, digitalis, thuốc hướng thần, thuốc chống nôn." },
          { step: 4, action: "Hội chẩn chuyên khoa Tim Mạch", details: "Lập kế hoạch thăm dò chuyên sâu (Siêu âm tim qua thành ngực, Holter ECG 24h, thăm dò điện sinh lý tim EPS)." },
        ],
        firstLineDrugs: [],
        secondLineDrugs: [],
        recommendedInterventions: [],
        absoluteContraindications: [],
        targetDisposition: "Đơn Vị Chăm Sóc Mạch Vành (CCU)",
      };
  }
}
