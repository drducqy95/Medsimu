// AUTO-GENERATED AUTHORITATIVE ECG DATABASE (SINGLE SOURCE OF TRUTH)
// Synchronized directly from SQLite medsim.db across all 31 clinical diagnoses

export interface StaticEcgDiagnosisItem {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  severity: "normal" | "borderline" | "abnormal" | "critical";
  criteria: string[];
  annotations: Array<{
    leadId: string;
    waveComponent: string;
    label: string;
    targetCyclePhase: number;
    color?: string;
    badgePlacement?: "top" | "bottom" | "interval" | "above" | "below";
    intervalEndPhase?: number;
    criterionIndex?: number;
  }>;
  leadManifestations: Record<string, string>;
  ecgMetrics: {
    expected_hr: string;
    pr_interval: string;
    qrs_duration: string;
    qt_interval: string;
    qrs_axis: string;
  };
  clinicalAction: string;
  differentialDiagnoses: string[];
}

export const ECG_STATIC_DATABASE: Record<string, StaticEcgDiagnosisItem> = {
  "stemi_inferior": {
    "id": "stemi_inferior",
    "name": "Nhồi Máu Cơ Tim Cấp ST Chênh Lên Thành Dưới",
    "nameEn": "Acute Inferior ST-Elevation Myocardial Infarction",
    "category": "ischemia",
    "severity": "critical",
    "criteria": [
      "ST chênh lên dạng vòm ≥ 1mm (0.1 mV) ở ít nhất 2 chuyển đạo liên tiếp thành dưới: DII, DIII, aVF",
      "Hình ảnh soi gương (reciprocal): ST chênh xuống ≥ 0.5 - 1mm ở chuyển đạo thành bên cao (DI, aVL)",
      "Sóng Q hoại tử rộng ≥ 0.04s hoặc sâu ≥ 1/4 biên độ sóng R tương ứng ở DIII, aVF",
      "Sóng T tối cấp dương cao đối xứng trước khi chuyển sang ST chênh vòm"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "ST",
        "label": "▲ ST chênh vòm +3.0mm (0.30 mV)",
        "targetCyclePhase": 0.32,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DIII",
        "waveComponent": "ST",
        "label": "▲ ST chênh vòm +4.5mm (0.45 mV)",
        "targetCyclePhase": 0.32,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "aVF",
        "waveComponent": "ST",
        "label": "▲ ST chênh vòm +3.8mm (0.38 mV)",
        "targetCyclePhase": 0.32,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "ST",
        "label": "▲ Dải nhịp Lead II: ST chênh vòm +3.0mm",
        "targetCyclePhase": 0.32,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DI",
        "waveComponent": "ST",
        "label": "▼ ST soi gương -1.5mm (-0.15 mV)",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "aVL",
        "waveComponent": "ST",
        "label": "▼ ST soi gương bên cao -2.2mm (-0.22 mV)",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DIII",
        "waveComponent": "Q",
        "label": "▼ Sóng Q hoại tử rộng 0.04s, sâu > 1/4 R",
        "targetCyclePhase": 0.2,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "aVF",
        "waveComponent": "Q",
        "label": "▼ Sóng Q bệnh lý ở aVF rộng 0.04s",
        "targetCyclePhase": 0.2,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "DII",
        "waveComponent": "T",
        "label": "▲ Sóng T tối cấp dương cao đối xứng",
        "targetCyclePhase": 0.44,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "DIII",
        "waveComponent": "T",
        "label": "▲ Sóng T tối cấp hòa lẫn vào ST",
        "targetCyclePhase": 0.44,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "T",
        "label": "▲ T tối cấp thành dưới",
        "targetCyclePhase": 0.44,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DII": "ST chênh lên dạng vòm 3.0mm, sóng T dương cao",
      "DIII": "ST chênh lên vòm 3.8mm, sóng Q bệnh lý sâu 0.35mV",
      "aVF": "ST chênh lên 3.2mm",
      "DI": "Hình ảnh soi gương: ST chênh xuống 1.5mm, T âm",
      "aVL": "Hình ảnh soi gương: ST chênh xuống 2.0mm, T âm sâu",
      "V1-V3": "Đẳng điện hoặc ST chênh xuống nhẹ (gợi ý thiếu máu sau dưới)"
    },
    "ecgMetrics": {
      "expected_hr": "50 - 90 bpm",
      "pr_interval": "160 - 210 ms",
      "qrs_duration": "85 - 100 ms",
      "qt_interval": "400 - 430 ms",
      "qrs_axis": "+90° đến +120° (Trục phải)"
    },
    "clinicalAction": "Kích hoạt Code STEMI chuyển Can thiệp mạch vành qua da (PCI) thì đầu trong 90 phút. Kháng kết tập tiểu cầu kép (Aspirin 300mg + Ticagrelor 180mg) + Heparin. Đo ngay V3R, V4R khảo sát thất phải. TUYỆT ĐỐI TRÁNH Nitrat nếu có nhồi máu thất phải!",
    "differentialDiagnoses": [
      "Viêm màng ngoài tim cấp",
      "Tái cực sớm lành tính",
      "Phình vách thất cũ"
    ]
  },
  "stemi_anterior": {
    "id": "stemi_anterior",
    "name": "Nhồi Máu Cơ Tim Cấp ST Chênh Lên Thành Trước Rộng",
    "nameEn": "Acute Anterior / Extensive Anterior STEMI",
    "category": "ischemia",
    "severity": "critical",
    "criteria": [
      "ST chênh lên dạng vòm bia mộ (Tombstoning) ≥ 2mm ở V1-V3 và/hoặc ≥ 1mm ở V4-V6",
      "Mất sóng r tăng trưởng bình thường (dạng rS cụt hoặc QS hoại tử xuyên thành từ V1-V4)",
      "ST chênh xuống soi gương ở các chuyển đạo thành dưới: DII, DIII, aVF",
      "Sóng T cao nhọn tối cấp hoặc hòa lẫn trực tiếp vào đoạn ST tạo thành vòm bia mộ"
    ],
    "annotations": [
      {
        "leadId": "V1",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên +2.5mm (0.25 mV)",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V2",
        "waveComponent": "ST",
        "label": "▲ ST vòm bia mộ +5.2mm (0.52 mV)",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V3",
        "waveComponent": "ST",
        "label": "▲ ST vòm bia mộ +4.8mm (0.48 mV)",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V4",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên mỏm tim +3.0mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V5",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên bên thấp +1.8mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V6",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên +1.2mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "▼ Dạng QS hoại tử xuyên thành (Mất r)",
        "targetCyclePhase": 0.22,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "V2",
        "waveComponent": "QRS",
        "label": "▼ Dạng rS cụt mất tăng trưởng sóng r",
        "targetCyclePhase": 0.22,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "V3",
        "waveComponent": "QRS",
        "label": "▼ Mất sóng r tăng trưởng vách - mỏm",
        "targetCyclePhase": 0.22,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "V4",
        "waveComponent": "QRS",
        "label": "▼ Sóng r nhỏ, hoại tử thành trước",
        "targetCyclePhase": 0.22,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "ST",
        "label": "▼ ST soi gương thành dưới -1.2mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "DIII",
        "waveComponent": "ST",
        "label": "▼ ST soi gương -1.8mm (-0.18 mV)",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "aVF",
        "waveComponent": "ST",
        "label": "▼ ST soi gương -1.5mm (-0.15 mV)",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "ST",
        "label": "▼ Dải nhịp: ST soi gương -1.2mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V2",
        "waveComponent": "T",
        "label": "▲ T cao nhọn tối cấp hòa lẫn ST",
        "targetCyclePhase": 0.44,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "V3",
        "waveComponent": "T",
        "label": "▲ Sóng T vòm khổng lồ (Hyperacute T)",
        "targetCyclePhase": 0.44,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "V1": "ST chênh lên 3.0mm, sóng r nhỏ cụt ngủn",
      "V2": "ST chênh lên dạng bia mộ khổng lồ 5.0mm, sóng T khổng lồ",
      "V3": "ST chênh lên dạng bia mộ 4.5mm, mất sóng R dạng QS",
      "V4": "ST chênh lên 3.5mm, sóng T dương cao",
      "V5": "ST chênh lên 2.0mm",
      "V6": "ST chênh lên 1.5mm",
      "DII": "ST chênh xuống soi gương 1.5mm",
      "DIII": "ST chênh xuống soi gương 2.0mm",
      "aVF": "ST chênh xuống soi gương 1.8mm"
    },
    "ecgMetrics": {
      "expected_hr": "80 - 110 bpm",
      "pr_interval": "150 - 180 ms",
      "qrs_duration": "95 - 115 ms",
      "qt_interval": "410 - 450 ms",
      "qrs_axis": "-15° đến -45° (Trục trái)"
    },
    "clinicalAction": "Báo động đỏ Can thiệp Mạch vành cấp cứu (Primary PCI) trong 90 phút. Đây là thể nhồi máu có vùng hoại tử lớn nhất, nguy cơ suy tim cấp, phù phổi cấp và sốc tim cực cao. Chống ngưng tập tiểu cầu kép + Heparin + Chuẩn bị bóng đối xung nội động mạch chủ IABP nếu sốc tim.",
    "differentialDiagnoses": [
      "Phình vách thất trái cũ",
      "Viêm cơ tim cấp",
      "Hội chứng Brugada"
    ]
  },
  "av_block_first_degree": {
    "id": "av_block_first_degree",
    "name": "Block Nhĩ Thất Độ I",
    "nameEn": "First-Degree Atrioventricular Block",
    "category": "conduction",
    "severity": "borderline",
    "criteria": [
      "Khoảng PR kéo dài thường xuyên và cố định > 0.20s (> 200 ms, tức > 5 ô nhỏ)",
      "Mỗi sóng P đều dẫn một phức bộ QRS (tỉ lệ dẫn 1:1, không có nhát nào bị rớt)",
      "Hình thái sóng P và phức bộ QRS hoàn toàn bình thường",
      "Nhịp tim đều đặn"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "↔ PR kéo dài cố định 260ms (> 200ms)",
        "targetCyclePhase": 0.08,
        "intervalEndPhase": 0.28,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "PR",
        "label": "↔ PR = 260ms (6.5 ô nhỏ) cố định",
        "targetCyclePhase": 0.08,
        "intervalEndPhase": 0.28,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "↔ Dải nhịp Lead II: PR = 260ms cố định",
        "targetCyclePhase": 0.08,
        "intervalEndPhase": 0.28,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Sóng P dẫn 1:1 sau mỗi nhát bóp",
        "targetCyclePhase": 0.1,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "Dẫn truyền nhĩ thất 1:1 hoàn toàn",
        "targetCyclePhase": 0.1,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS hẹp 85ms bình thường",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V5",
        "waveComponent": "QRS",
        "label": "QRS bình thường, không dãn rộng",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "↔ R-R đều đặn (HR = 65 bpm)",
        "targetCyclePhase": 0.22,
        "intervalEndPhase": 0.82,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Dải nhịp: R-R đều đặn 920ms",
        "targetCyclePhase": 0.22,
        "intervalEndPhase": 0.82,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DII": "Khoảng PR kéo dài 260ms cố định trên mọi chu kỳ nhịp, P dẫn QRS 1:1",
      "V1": "PR kéo dài 260ms",
      "II": "Dải nhịp Lead II: PR dài 260ms đều tăm tắp"
    },
    "ecgMetrics": {
      "expected_hr": "60 - 90 bpm",
      "pr_interval": "240 - 320 ms",
      "qrs_duration": "80 - 100 ms",
      "qt_interval": "380 - 420 ms",
      "qrs_axis": "+45° (Bình thường)"
    },
    "clinicalAction": "Thường lành tính, không cần điều trị can thiệp khẩn cấp. Rà soát các thuốc làm chậm dẫn truyền qua nút AV (chẹn Beta, Digoxin, chẹn Canxi diltiazem/verapamil).",
    "differentialDiagnoses": [
      "Nhịp chậm xoang",
      "Block nhĩ thất độ II Mobitz I"
    ]
  },
  "av_block_mobitz_1": {
    "id": "av_block_mobitz_1",
    "name": "Block Nhĩ Thất Độ II Kiểu Mobitz I (Wenckebach)",
    "nameEn": "Second-Degree AV Block Mobitz I (Wenckebach Periodicity)",
    "category": "conduction",
    "severity": "abnormal",
    "criteria": [
      "Khoảng PR dài dần ra qua từng chu kỳ tim liên tiếp",
      "Cho đến khi có một sóng P hoàn toàn không dẫn được (rớt một phức bộ QRS)",
      "Sau nhát rớt, chu kỳ lặp lại với khoảng PR ngắn nhất",
      "Khoảng R-R ngắn dần trước nhát rớt; phức bộ QRS thường hẹp (< 0.12s)"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "PR dài dần qua từng chu kỳ (160ms → 320ms)",
        "targetCyclePhase": 0.06,
        "intervalEndPhase": 0.3,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "PR dài dần qua từng chu kỳ (160ms → 320ms)",
        "targetCyclePhase": 0.06,
        "intervalEndPhase": 0.3,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "DROPPED",
        "label": "❌ Sóng P không dẫn (Rớt phức bộ QRS)",
        "targetCyclePhase": 0.06,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "DROPPED",
        "label": "❌ Sóng P không dẫn (Rớt phức bộ QRS)",
        "targetCyclePhase": 0.06,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "PR lập lại ngắn nhất sau nhát rớt (160ms)",
        "targetCyclePhase": 0.08,
        "intervalEndPhase": 0.24,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "PR lập lại ngắn nhất sau nhát rớt (160ms)",
        "targetCyclePhase": 0.08,
        "intervalEndPhase": 0.24,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Khoảng R-R ngắn dần trước nhát rớt",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.75,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DII": "PR dài dần từ 160ms -> 220ms -> 300ms, sau đó có sóng P đơn độc không có QRS, rồi chu kỳ lặp lại",
      "V1": "QRS hẹp, thỉnh thoảng rớt 1 nhát bóp",
      "II": "Dải nhịp Lead II: Chu kỳ Wenckebach 4:3 điển hình"
    },
    "ecgMetrics": {
      "expected_hr": "45 - 75 bpm",
      "pr_interval": "160 - 320 ms (biến thiên)",
      "qrs_duration": "85 - 100 ms",
      "qt_interval": "400 - 430 ms",
      "qrs_axis": "+45° (Bình thường)"
    },
    "clinicalAction": "Đa số tổn thương tại nút AV, tiên lượng tương đối lành tính. Nếu không có triệu chứng: theo dõi. Nếu có triệu chứng tụt HA hoặc kèm NMCT thành dưới: Atropin 0.5 - 1mg TM. Tạm ngừng các thuốc ức chế nút AV.",
    "differentialDiagnoses": [
      "Block nhĩ thất độ II Mobitz II",
      "Ngoại tâm thu nhĩ bị block",
      "Block xoang nhĩ"
    ]
  },
  "av_block_mobitz_2": {
    "id": "av_block_mobitz_2",
    "name": "Block Nhĩ Thất Độ II Kiểu Mobitz II",
    "nameEn": "Second-Degree AV Block Mobitz II",
    "category": "conduction",
    "severity": "critical",
    "criteria": [
      "Khoảng PR của các nhát dẫn hoàn toàn cố định và không thay đổi trước khi có nhát rớt",
      "Đột ngột rớt một hoặc nhiều phức bộ QRS sau sóng P bình thường",
      "Phức bộ QRS thường dãn rộng (≥ 0.12s) do tổn thương hệ thống dẫn truyền dưới bó His",
      "Nguy cơ tiến triển thành Block AV độ III hoàn toàn và vô tâm thu rất cao"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "PR cố định hoàn toàn (180ms)",
        "targetCyclePhase": 0.08,
        "intervalEndPhase": 0.26,
        "color": "#2563eb",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "↔ PR không thay đổi trước khi rớt nhát",
        "targetCyclePhase": 0.08,
        "intervalEndPhase": 0.26,
        "color": "#2563eb",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "DROPPED",
        "label": "❌ Đột ngột rớt QRS sau sóng P",
        "targetCyclePhase": 0.08,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "DROPPED",
        "label": "❌ Rớt QRS đột ngột tỉ lệ dẫn 3:2 / 2:1",
        "targetCyclePhase": 0.08,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS dãn rộng 130ms (Tổn thương dưới bó His)",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "QRS",
        "label": "Phức bộ QRS dãn rộng ≥ 120ms",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "⚠️ Nguy cơ cao tiến triển Block AV III & vô tâm thu",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DII": "Khoảng PR cố định 180ms, đột ngột có sóng P không dẫn QRS (dạng dẫn truyền 3:2 hoặc 4:3)",
      "V1": "QRS dãn rộng 130ms dạng block phân nhánh",
      "II": "Dải nhịp Lead II: Đột ngột rớt QRS sau sóng P xoang"
    },
    "ecgMetrics": {
      "expected_hr": "35 - 60 bpm",
      "pr_interval": "160 - 200 ms (cố định)",
      "qrs_duration": "110 - 140 ms (thường rộng)",
      "qt_interval": "410 - 450 ms",
      "qrs_axis": "-30° (Trục lệch trái)"
    },
    "clinicalAction": "TÌNH HUỐNG NGUY HIỂM! Dán ngay miếng dán máy tạo nhịp qua da (Transcutaneous Pacing - TCP). Chuẩn bị đặt máy tạo nhịp tạm thời đường tĩnh mạch. Atropin thường KHÔNG HIỆU QUẢ và có thể làm block nặng hơn. Chỉ định đặt máy tạo nhịp vĩnh viễn Class I.",
    "differentialDiagnoses": [
      "Block nhĩ thất độ II Mobitz I",
      "Block AV độ III",
      "Block xoang nhĩ độ II"
    ]
  },
  "av_block_third_degree": {
    "id": "av_block_third_degree",
    "name": "Block Nhĩ Thất Độ III (Hoàn Toàn)",
    "nameEn": "Third-Degree Atrioventricular Block (Complete Heart Block)",
    "category": "conduction",
    "severity": "critical",
    "criteria": [
      "Hiện tượng phân ly nhĩ - thất hoàn toàn (AV Dissociation): Nhĩ và thất đập hoàn toàn độc lập",
      "Sóng P xoang đều đặn với tần số riêng (thường 60 - 90 bpm, khoảng P-P đều)",
      "Phức bộ QRS đều đặn với tần số thoát thất chậm hơn nhiều (20 - 45 bpm, khoảng R-R đều)",
      "Không có bất kỳ mối liên hệ nào giữa sóng P và phức bộ QRS (PR thay đổi liên tục, P có thể rơi vào đỉnh sóng T, đoạn ST hoặc bên trong QRS)"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "⚡ Phân ly nhĩ - thất hoàn toàn (AV Dissociation)",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "⚡ Nhĩ & Thất đập độc lập hoàn toàn",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Sóng P xoang đều đặn (tần số riêng 75 bpm)",
        "targetCyclePhase": 0.15,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V1",
        "waveComponent": "P",
        "label": "Sóng P xoang độc lập (Khoảng P-P đều)",
        "targetCyclePhase": 0.15,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "Sóng P xoang độc lập rơi tự do",
        "targetCyclePhase": 0.15,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "R",
        "label": "Nhịp thoát thất rộng 135ms (36 bpm)",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "R",
        "label": "QRS thoát thất dãn rộng, tần số 36 bpm",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ R-R thoát thất đều rất chậm (36 bpm)",
        "targetCyclePhase": 0.22,
        "intervalEndPhase": 0.85,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "PR biến thiên liên tục, không có liên hệ P-QRS",
        "targetCyclePhase": 0.15,
        "intervalEndPhase": 0.35,
        "color": "#7c3aed",
        "badgePlacement": "interval",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DII": "Sóng P xoang đều đặn tần số 75 bpm; Phức bộ QRS dãn rộng đều đặn tần số 34 bpm đập độc lập",
      "V1": "Sóng P rơi ngẫu nhiên vào sóng T và phức bộ QRS",
      "II": "Dải nhịp Lead II: Phân ly nhĩ thất hoàn toàn kinh điển"
    },
    "ecgMetrics": {
      "expected_hr": "25 - 45 bpm (Thoát thất)",
      "pr_interval": "Không cố định (Phân ly)",
      "qrs_duration": "120 - 160 ms (Thoát thất rộng)",
      "qt_interval": "460 - 520 ms",
      "qrs_axis": "Vô định / Lệch trục nặng"
    },
    "clinicalAction": "CẤP CỨU HỒI SỨC TIM MẠCH! Kích hoạt máy tạo nhịp qua da (TCP) ngay lập tức. Đặt máy tạo nhịp tạm thời qua buồng tim cấp cứu. Chuẩn bị Adrenaline / Isoproterenol truyền tĩnh mạch duy trì tưới máu não.",
    "differentialDiagnoses": [
      "Phân ly nhĩ thất do nhịp nhanh thất",
      "Nhịp chậm xoang nặng",
      "Block AV độ II 2:1"
    ]
  },
  "atrial_fibrillation": {
    "id": "atrial_fibrillation",
    "name": "Rung Nhĩ Đáp Ứng Thất Nhanh",
    "nameEn": "Atrial Fibrillation with Rapid Ventricular Response (AFib RVR)",
    "category": "atrial",
    "severity": "abnormal",
    "criteria": [
      "Mất hoàn toàn sóng P xoang bình thường",
      "Thay thế bằng các sóng lăn tăn f (fibrillation waves) tần số cực nhanh 400 - 600 cpm, biên độ và hình dạng không đều",
      "Các khoảng R-R hoàn toàn không đều (loạn nhịp hoàn toàn - irregularly irregular rhythm)",
      "Phức bộ QRS thường hẹp (< 0.12s), trừ khi có dẫn truyền lệch hướng"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Mất hoàn toàn sóng P xoang bình thường",
        "targetCyclePhase": 0.1,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "P",
        "label": "Đường đẳng điện không có sóng P xoang",
        "targetCyclePhase": 0.1,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "Mất hẳn sóng P xoang ở dải nhịp",
        "targetCyclePhase": 0.1,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "P",
        "label": "~ Sóng lăn tăn f (400 - 600 cpm)",
        "targetCyclePhase": 0.12,
        "color": "#7c3aed",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "~ Sóng f nhĩ lăn tăn không đều",
        "targetCyclePhase": 0.12,
        "color": "#7c3aed",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "~ Sóng f nhĩ lăn tăn hỗn loạn",
        "targetCyclePhase": 0.12,
        "color": "#7c3aed",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "↔ R-R hoàn toàn không đều (Loạn nhịp)",
        "targetCyclePhase": 0.14,
        "intervalEndPhase": 0.65,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ R-R không đều: 520ms vs 880ms (AFib)",
        "targetCyclePhase": 0.14,
        "intervalEndPhase": 0.65,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS hẹp 85ms dẫn truyền bình thường",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "V5",
        "waveComponent": "QRS",
        "label": "QRS hẹp < 120ms",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DII": "Khoảng cách R-R hoàn toàn không đều, mất sóng P xoang",
      "V1": "Sóng f lăn tăn rõ nét với tần số nhĩ > 400 chu kỳ/phút",
      "II": "Dải nhịp Lead II: R-R biến thiên hỗn loạn, tần số thất trung bình 135 bpm"
    },
    "ecgMetrics": {
      "expected_hr": "120 - 170 bpm (Thất nhanh)",
      "pr_interval": "Không đo được (Mất P)",
      "qrs_duration": "80 - 100 ms (Hẹp)",
      "qt_interval": "320 - 360 ms",
      "qrs_axis": "+60° (Bình thường)"
    },
    "clinicalAction": "Đánh giá huyết động! Nếu huyết động không ổn định (tụt HA, suy tim cấp, đau ngực): Sốc điện đồng bộ chuyển nhịp khẩn (100 - 200J). Nếu huyết động ổn định: Kiểm soát tần số thất bằng thuốc (Metoprolol tiêm TM, Diltiazem hoặc Digoxin). Đánh giá thang điểm CHA2DS2-VASc để chỉ định kháng đông dự phòng đột quỵ.",
    "differentialDiagnoses": [
      "Cuồng nhĩ dẫn truyền thay đổi",
      "Nhịp nhanh nhĩ đa ổ (MAT)",
      "Ngoại tâm thu nhĩ dày"
    ]
  },
  "atrial_flutter": {
    "id": "atrial_flutter",
    "name": "Cuồng Nhĩ Dẫn Truyền 2:1",
    "nameEn": "Atrial Flutter with 2:1 Conduction",
    "category": "atrial",
    "severity": "abnormal",
    "criteria": [
      "Mất hoàn toàn sóng P xoang bình thường",
      "Thay thế bằng sóng cuồng nhĩ dạng răng cưa (F waves - Sawtooth pattern) đều đặn, tần số nhĩ điển hình 300 cpm (250 - 350 cpm)",
      "Sóng F âm rõ rệt và liên tục không có đường đẳng điện ở DII, DIII, aVF",
      "Dẫn truyền nhĩ thất thường có tỉ lệ cố định 2:1 (tần số thất chính xác 150 bpm) hoặc 4:1 (75 bpm)",
      "Phức bộ QRS thường hẹp (< 0.12s)"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Mất hoàn toàn sóng P xoang bình thường",
        "targetCyclePhase": 0.05,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "Mất sóng P, thay bằng sóng răng cưa F",
        "targetCyclePhase": 0.05,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Sóng răng cưa F (Sawtooth, 300 cpm)",
        "targetCyclePhase": 0.05,
        "color": "#d97706",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DIII",
        "waveComponent": "P",
        "label": "Sóng F răng cưa đều đặn",
        "targetCyclePhase": 0.05,
        "color": "#d97706",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "aVF",
        "waveComponent": "P",
        "label": "Sóng răng cưa F tần số nhĩ 300 bpm",
        "targetCyclePhase": 0.05,
        "color": "#d97706",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "Răng cưa F tần số nhĩ 300 cpm",
        "targetCyclePhase": 0.05,
        "color": "#d97706",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Sóng F âm liên tục không đẳng điện",
        "targetCyclePhase": 0.08,
        "color": "#d97706",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "DIII",
        "waveComponent": "P",
        "label": "Sóng F âm liên tục thành dưới",
        "targetCyclePhase": 0.08,
        "color": "#d97706",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "aVF",
        "waveComponent": "P",
        "label": "Không có đường đẳng điện giữa các sóng F",
        "targetCyclePhase": 0.08,
        "color": "#d97706",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "↔ R-R = 400ms (Dẫn truyền 2:1 • 150 bpm)",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.6,
        "color": "#2563eb",
        "badgePlacement": "interval",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Dải nhịp: Tỉ lệ cố định 2:1 (150 bpm)",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.6,
        "color": "#2563eb",
        "badgePlacement": "interval",
        "criterionIndex": 3
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS hẹp 85ms",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "DII": "Sóng răng cưa F đều đặn tần số 300 cpm, không có đường đẳng điện giữa các sóng",
      "DIII": "Sóng F âm hình răng cưa kinh điển liên tiếp",
      "aVF": "Sóng F răng cưa rõ rệt",
      "V1": "Sóng F dương nhọn",
      "II": "Dải nhịp Lead II: Cứ 2 sóng răng cưa F có 1 phức bộ QRS (dẫn truyền 2:1, tần số thất đều 150 bpm)"
    },
    "ecgMetrics": {
      "expected_hr": "150 bpm (Dẫn 2:1)",
      "pr_interval": "Không đo được (Sóng F)",
      "qrs_duration": "80 - 95 ms",
      "qt_interval": "300 - 340 ms",
      "qrs_axis": "+60° (Bình thường)"
    },
    "clinicalAction": "Kiểm soát tần số thất bằng thuốc chẹn Beta/chẹn Canxi (dù cuồng nhĩ đáp ứng thuốc kém hơn rung nhĩ). Sốc điện đồng bộ chuyển nhịp mức năng lượng thấp (50 - 100J) cho hiệu quả cắt cơn rất cao (> 90%). Chỉ định triệt đốt vòng vào lại eo van ba lá (CTI Ablation) bằng sóng cao tần RF có tỉ lệ thành công triệt để > 95%. Kháng đông dự phòng tương tự rung nhĩ.",
    "differentialDiagnoses": [
      "Nhịp nhanh xoang 150 bpm",
      "Nhịp nhanh kịch phát trên thất (SVT)",
      "Rung nhĩ"
    ]
  },
  "svt": {
    "id": "svt",
    "name": "Nhịp Nhanh Kịch Phát Trên Thất (SVT / AVNRT)",
    "nameEn": "Paroxysmal Supraventricular Tachycardia",
    "category": "atrial",
    "severity": "abnormal",
    "criteria": [
      "Nhịp nhanh đều đặn tần số rất cao, thường từ 160 đến 220 chu kỳ/phút",
      "Phức bộ QRS hẹp (< 0.12s, thường 80 - 90 ms)",
      "Sóng P thường bị vùi lấp hoàn toàn trong phức bộ QRS hoặc xuất hiện ngay sau QRS dưới dạng sóng giả r' ở V1 hoặc giả s ở DII, DIII",
      "Khởi phát đột ngột và kết thúc đột ngột (hiện tượng On / Off)"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "↔ R-R đều tăm tắp (HR = 185 bpm, 1.6 ô lớn)",
        "targetCyclePhase": 0.15,
        "intervalEndPhase": 0.5,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Dải nhịp: Cơn nhịp nhanh đều 185 bpm",
        "targetCyclePhase": 0.15,
        "intervalEndPhase": 0.5,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS hẹp 80ms (< 120ms)",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V5",
        "waveComponent": "QRS",
        "label": "QRS hẹp thanh mảnh nguồn gốc trên thất",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V1",
        "waveComponent": "P",
        "label": "Sóng giả r' ở V1 (P vùi lấp cuối QRS)",
        "targetCyclePhase": 0.26,
        "color": "#7c3aed",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Sóng giả s ở DII (Dấu hiệu AVNRT điển hình)",
        "targetCyclePhase": 0.26,
        "color": "#7c3aed",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "DIII",
        "waveComponent": "P",
        "label": "Sóng giả s ở DIII",
        "targetCyclePhase": 0.26,
        "color": "#7c3aed",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "Khởi phát & kết thúc đột ngột (Hiện tượng On/Off)",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DII": "Tần số nhanh đều 185 bpm, QRS hẹp, không thấy sóng P xoang",
      "V1": "Sóng giả r' (pseudo-r') nhỏ xuất hiện ở cuối QRS",
      "II": "Dải nhịp Lead II: Nhịp nhanh đều tăm tắp 185 bpm"
    },
    "ecgMetrics": {
      "expected_hr": "160 - 220 bpm",
      "pr_interval": "Không đo được (P vùi lấp)",
      "qrs_duration": "75 - 90 ms",
      "qt_interval": "260 - 300 ms",
      "qrs_axis": "+60° (Bình thường)"
    },
    "clinicalAction": "XỬ TRÍ CẮT CƠN THEO BẬC: (1) Nghiệm pháp Valsalva cải biên (thổi xi-lanh 15 giây rồi hạ đầu nâng chân) cho tỉ lệ cắt cơn 43%; (2) Nếu thất bại: Tiêm Adenosine 6mg tiêm tĩnh mạch cực nhanh (bolus trong 1-2 giây) kèm bơm đuổi 20ml nước muối sinh lý; nếu sau 1-2 phút chưa cắt cơn tiêm tiếp liều 12mg; (3) Sốc điện đồng bộ (50 - 100J) nếu huyết động tụt.",
    "differentialDiagnoses": [
      "Nhịp nhanh xoang",
      "Cuồng nhĩ dẫn truyền 2:1",
      "Nhịp nhanh nhĩ"
    ]
  },
  "pvc_frequent": {
    "id": "pvc_frequent",
    "name": "Ngoại Tâm Thu Thất Dày Dạng Nhịp Ba (Trigeminy)",
    "nameEn": "Frequent Premature Ventricular Complexes (Trigeminy)",
    "category": "ventricular",
    "severity": "abnormal",
    "criteria": [
      "Xuất hiện các nhát bóp đến sớm có phức bộ QRS dãn rộng dị dạng (≥ 0.12s)",
      "Không có sóng P xoang đi trước nhát bóp ngoại tâm thu",
      "Đoạn ST và sóng T thứ phát biến đổi trái chiều với hướng của phức bộ QRS",
      "Khoảng nghỉ bù hoàn toàn (khoảng cách giữa 2 nhịp xoang kẹp giữa ngoại tâm thu bằng đúng 2 chu kỳ nhịp xoang)",
      "Dạng nhịp ba (Trigeminy): Cứ 2 nhát xoang bình thường đi kèm 1 nhát ngoại tâm thu thất lặp lại đều đặn"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "R",
        "label": "PVC dãn rộng 140ms đến sớm dị dạng",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "R",
        "label": "QRS ngoại tâm thu thất dãn rộng ≥ 120ms",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "R",
        "label": "Nhát bóp thất đến sớm dị dạng",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Không có sóng P xoang đi trước PVC",
        "targetCyclePhase": 0.15,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "Mất sóng P trước nhát ngoại tâm thu",
        "targetCyclePhase": 0.15,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "T",
        "label": "ST-T biến đổi trái chiều QRS",
        "targetCyclePhase": 0.45,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "T",
        "label": "Sóng T âm sâu thứ phát sau PVC",
        "targetCyclePhase": 0.45,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "↔ Nghỉ bù hoàn toàn (Full compensatory pause)",
        "targetCyclePhase": 0.3,
        "intervalEndPhase": 0.7,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Khoảng nghỉ bù bằng đúng 2 chu kỳ nhịp xoang",
        "targetCyclePhase": 0.3,
        "intervalEndPhase": 0.7,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "Dạng nhịp ba (Trigeminy): 2 nhát xoang + 1 PVC",
        "targetCyclePhase": 0.2,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "DII": "2 nhát xoang bình thường kèm 1 nhát QRS dị dạng dãn rộng 140ms có sóng T âm sâu",
      "V1": "Nhát PVC dãn rộng hình thái block nhánh",
      "II": "Dải nhịp Lead II: Mô hình nhịp ba (2 xoang : 1 PVC) lặp lại liên tục"
    },
    "ecgMetrics": {
      "expected_hr": "65 - 85 bpm",
      "pr_interval": "Không có P trước PVC",
      "qrs_duration": "135 - 150 ms (PVC rộng)",
      "qt_interval": "420 - 450 ms",
      "qrs_axis": "Trục thay đổi từng nhát"
    },
    "clinicalAction": "Đánh giá tải lượng PVC (Holter 24h). Tầm soát bệnh tim thực tổn (thiếu máu cơ tim, suy tim, bệnh cơ tim) và điện giải đồ (K+, Mg2+). Nếu PVC dày > 15-20% tổng số nhịp hoặc gây suy giảm chức năng tim: Điều trị bằng chẹn Beta hoặc triệt đốt điện sinh lý bằng sóng cao tần (Catheter Ablation).",
    "differentialDiagnoses": [
      "Ngoại tâm thu nhĩ dẫn truyền lệch hướng",
      "Ngoại tâm thu bộ nối"
    ]
  },
  "ventricular_tachycardia": {
    "id": "ventricular_tachycardia",
    "name": "Cơn Nhanh Thất Đơn Dạng (Monomorphic VT)",
    "nameEn": "Monomorphic Ventricular Tachycardia",
    "category": "ventricular",
    "severity": "critical",
    "criteria": [
      "Nhịp nhanh tần số 140 - 250 chu kỳ/phút với phức bộ QRS dãn rộng dị dạng (≥ 0.12s)",
      "Các phức bộ QRS có cùng một hình dạng đồng nhất qua từng chu kỳ (đơn dạng - monomorphic)",
      "Dấu hiệu phân ly nhĩ thất (AV Dissociation): Sóng P xoang độc lập đôi khi nhìn thấy được",
      "Nhát bắt được thất (Capture beat) hoặc nhát bóp hỗn hợp (Fusion beat) là tiêu chuẩn vàng khẳng định nguồn gốc thất",
      "Dấu hiệu đồng hướng (Concordance): Toàn bộ QRS ở V1-V6 đều dương hoặc đều âm"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "QRS",
        "label": "QRS dãn rộng 150ms dị dạng (HR = 180 bpm)",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS dãn rộng > 140ms",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Tần số thất 180 bpm dãn rộng (CẤP CỨU)",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.55,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "R",
        "label": "QRS đồng nhất hình dạng (Đơn dạng)",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V5",
        "waveComponent": "R",
        "label": "Hình dạng QRS lặp lại đơn dạng",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Sóng P xoang độc lập vùi lấp (Phân ly AV)",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "Dấu hiệu phân ly nhĩ - thất (AV Dissociation)",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "R",
        "label": "Tiêu chuẩn vàng: Nhát bắt được thất (Capture beat)",
        "targetCyclePhase": 0.25,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "Đồng hướng dương toàn bộ V1-V6",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 4
      },
      {
        "leadId": "V6",
        "waveComponent": "QRS",
        "label": "Đồng hướng dương chuyển đạo trước tim",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "DII": "Dải sóng QRS khổng lồ dãn rộng 160ms, tần số đều đặn 175 bpm, không thấy sóng P",
      "V1": "QRS dãn rộng cực độ dạng block nhánh trái dị dạng",
      "aVR": "Sóng R đơn độc ở aVR (Tiêu chuẩn Brugada / Vereckei)"
    },
    "ecgMetrics": {
      "expected_hr": "140 - 220 bpm",
      "pr_interval": "Không có PR",
      "qrs_duration": "140 - 180 ms (Dãn rộng)",
      "qt_interval": "Không đo được",
      "qrs_axis": "Trục vô định (Northwest axis -90° đến 180°)"
    },
    "clinicalAction": "CẤP CỨU HỒI SỨC TIM MẠCH! BƯỚC 1: BẮT MẠCH CẢNH/MẠCH BẸN NGAY LẬP TỨC. (1) Nếu MẤT MẠCH (Pulseless VT) -> Xử trí như Rung Thất: Phá rung không đồng bộ ngay (Defibrillation 200J Biphasic) + Ép tim CPR; (2) Nếu CÒN MẠCH nhưng tụt HA, lơ mơ -> Sốc điện đồng bộ (Synchronized Cardioversion 100J); (3) Nếu còn mạch huyết động ổn định -> Truyền Amiodarone 150mg trong 10 phút.",
    "differentialDiagnoses": [
      "SVT dẫn truyền lệch hướng",
      "Nhịp nhanh do đường phụ (Antidromic AVRT)"
    ]
  },
  "ventricular_fibrillation": {
    "id": "ventricular_fibrillation",
    "name": "Rung Thất Sóng Thô / Sóng Mịn (VFib)",
    "nameEn": "Ventricular Fibrillation (Coarse / Fine VFib)",
    "category": "ventricular",
    "severity": "critical",
    "criteria": [
      "Mất hoàn toàn các phức bộ P, QRS, T bình thường",
      "Thay thế bằng các dao động sóng hỗn loạn vô tổ chức, không xác định được hình dạng, biên độ hay tần số cụ thể",
      "Sóng thô (Coarse VF): Biên độ dao động > 3mm (tiên lượng hồi phục tốt hơn)",
      "Sóng mịn (Fine VF): Biên độ < 3mm (gần chuyển sang vô tâm thu, cơ tim cạn kiệt năng lượng)",
      "Bệnh nhân rơi vào trạng thái ngừng tuần hoàn tử vong lâm sàng ngay lập tức"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "R",
        "label": "☠️ RUNG THẤT: Mất hoàn toàn phức bộ P-QRS-T",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "R",
        "label": "Mất hoàn toàn hoạt động tim có tổ chức",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "R",
        "label": "☠️ Mất phức bộ điện tim cơ bản",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "Sóng hỗn loạn vô tổ chức (Tử vong lâm sàng)",
        "targetCyclePhase": 0.15,
        "intervalEndPhase": 0.55,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "Sóng rung thất hỗn loạn vô định hình",
        "targetCyclePhase": 0.15,
        "intervalEndPhase": 0.55,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "R",
        "label": "Sóng thô (Coarse VF): Biên độ dao động > 3mm",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "R",
        "label": "Sóng thô: Tiên lượng sốc điện tốt hơn",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "R",
        "label": "Sóng mịn (Fine VF): Cơ tim cạn kiệt năng lượng",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "bottom",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "🚨 BÁO ĐỘNG ĐỎ: PHÁ RUNG KHẨN CẤP 200J",
        "targetCyclePhase": 0.25,
        "intervalEndPhase": 0.65,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "DII": "Đường sóng hỗn loạn nhấp nhô vô định hình, không có chu kỳ",
      "V1": "Sóng rung thất thô biên độ 4-6mm",
      "II": "Dải nhịp Lead II: Sóng rung thất hỗn loạn hoàn toàn"
    },
    "ecgMetrics": {
      "expected_hr": "Vô số (Không có nhát bóp hiệu quả)",
      "pr_interval": "Không có",
      "qrs_duration": "Vô định hình",
      "qt_interval": "Không có",
      "qrs_axis": "Hỗn loạn"
    },
    "clinicalAction": "NGỪNG TUẦN HOÀN - CẤP CỨU CODE BLUE LẬP TỨC! THỜI GIAN LÀ MẠNG SỐNG! (1) ÉP TIM CPR NGAY LẬP TỨC 100-120 lần/phút; (2) SẠC VÀ PHÁ RUNG KHÔNG ĐỒNG BỘ (Defibrillation) 200J Biphasic CÀNG NHANH CÀNG TỐT; (3) Tiếp tục ép tim ngay 2 phút không dừng lại kiểm tra mạch; (4) Adrenaline 1mg tiêm TM sau cú sốc thứ 2, Amiodarone 300mg tiêm TM sau cú sốc thứ 3.",
    "differentialDiagnoses": [
      "Nhiễu điện do cử động / tuột dây điện cực",
      "Xoắn đỉnh"
    ]
  },
  "asystole": {
    "id": "asystole",
    "name": "Vô Tâm Thu (Đường Đẳng Điện Phẳng - Flatline)",
    "nameEn": "Ventricular Asystole (Flatline)",
    "category": "ventricular",
    "severity": "critical",
    "criteria": [
      "Đường đẳng điện phẳng lì, hoàn toàn không có hoạt động điện học của tim",
      "Thỉnh thoảng có thể thấy vài sóng P đơn độc trơ trọi không có phức bộ QRS đi kèm (P-wave asystole)",
      "Bắt buộc kiểm tra ở ít nhất 2 chuyển đạo vuông góc và kiểm tra dây dẫn để loại trừ tuột điện cực hoặc rung thất sóng mịn",
      "Tiên lượng sống sót cực kỳ xấu nếu không tái lập được tuần hoàn nhanh chóng"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "DROPPED",
        "label": "☠️ VÔ TÂM THU: Đường đẳng điện phẳng lì",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "DROPPED",
        "label": "Đường thẳng phẳng lì, hoàn toàn mất nhịp",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Sóng P đơn độc trơ trọi (P-wave asystole)",
        "targetCyclePhase": 0.15,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "P trơ trọi không có QRS",
        "targetCyclePhase": 0.15,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DI",
        "waveComponent": "DROPPED",
        "label": "Kiểm tra chuyển đạo DI (Loại trừ tuột dây)",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "aVF",
        "waveComponent": "DROPPED",
        "label": "Kiểm tra chuyển đạo aVF vuông góc",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "DROPPED",
        "label": "🚨 ÉP TIM CPR + ADRENALINE 1MG (KHÔNG SỐC ĐIỆN)",
        "targetCyclePhase": 0.3,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DII": "Đường thẳng nằm ngang phẳng lì (Flatline)",
      "V1": "Đường đẳng điện phẳng lì",
      "II": "Dải nhịp Lead II: Hoàn toàn không có xung điện"
    },
    "ecgMetrics": {
      "expected_hr": "0 bpm",
      "pr_interval": "Không có",
      "qrs_duration": "Không có",
      "qt_interval": "Không có",
      "qrs_axis": "Không có"
    },
    "clinicalAction": "TUYỆT ĐỐI KHÔNG SỐC ĐIỆN! Sốc điện vô tâm thu sẽ đốt cháy cơ tim và triệt tiêu cơ hội hồi phục tế bào tạo nhịp. PHÁC ĐỒ ACLS: (1) Ép tim CPR liên tục chất lượng cao; (2) Adrenaline 1mg tiêm TM càng sớm càng tốt mỗi 3-5 phút; (3) Tìm kiếm và xử trí khẩn cấp các nguyên nhân có thể đảo ngược (5T & 5H: Hypovolemia, Hypoxia, Hydrogen ion toan, Hypo/Hyperkalemia, Hypothermia; Tension pneumothorax, Tamponade, Toxins, Thrombosis phổi, Thrombosis vành).",
    "differentialDiagnoses": [
      "Tuột dây điện cực / hỏng máy",
      "Rung thất sóng mịn (Fine VF)"
    ]
  },
  "hyperkalemia": {
    "id": "hyperkalemia",
    "name": "Tăng Kali Máu Nặng (K+ > 7.0 mmol/L)",
    "nameEn": "Severe Hyperkalemia (K+ > 7.0 mmol/L)",
    "category": "metabolic",
    "severity": "critical",
    "criteria": [
      "Sóng T cao nhọn hoắt, đáy hẹp, đối xứng hình lều (Peaked tent-like T waves) rõ nhất ở V2 - V4",
      "Đoạn PR kéo dài và sóng P dẹt dần rồi biến mất hoàn toàn (tê liệt tâm nhĩ)",
      "Phức bộ QRS dãn rộng, méo mó, hòa lẫn vào sóng T tạo thành dạng sóng hình sin (Sine wave pattern)",
      "Nguy cơ tử vong ngừng tim dạng vô tâm thu hoặc rung thất trong vài phút"
    ],
    "annotations": [
      {
        "leadId": "V2",
        "waveComponent": "T",
        "label": "▲ Sóng T lều nhọn hoắt đối xứng +9.8mm",
        "targetCyclePhase": 0.45,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V3",
        "waveComponent": "T",
        "label": "▲ Sóng T nhọn hình lều > 10mm (1.0 mV)",
        "targetCyclePhase": 0.45,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V4",
        "waveComponent": "T",
        "label": "▲ Sóng T đáy hẹp cao vút đối xứng",
        "targetCyclePhase": 0.45,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V5",
        "waveComponent": "T",
        "label": "▲ Sóng T cao nhọn do tăng Kali",
        "targetCyclePhase": 0.45,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "T",
        "label": "▲ Dấu hiệu lều (Peaked tent-like T)",
        "targetCyclePhase": 0.45,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "PR dài 220ms + Sóng P dẹt dần",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.29,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 1
      },
      {
        "leadId": "aVF",
        "waveComponent": "P",
        "label": "Sóng P dẹt, tê liệt nhĩ do Kali máu cao",
        "targetCyclePhase": 0.12,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "PR kéo dài dãn rộng",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.29,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "QRS",
        "label": "QRS dãn rộng 135ms hòa lẫn vào sóng T",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V2",
        "waveComponent": "QRS",
        "label": "Dạng sóng hình sin (Sine wave pattern)",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "QRS",
        "label": "Dạng sóng hình sin nguy kịch",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "⚠️ Tiêm Canxi Clorid 10% bảo vệ cơ tim khẩn cấp",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "V2": "Sóng T nhọn hoắt hình lều khổng lồ cao 11.5mm, đáy hẹp đối xứng",
      "V3": "Sóng T cao nhọn hình lều 12mm",
      "DII": "Khoảng PR kéo dài 240ms, sóng P dẹt, QRS dãn rộng 135ms",
      "II": "Dải nhịp Lead II: Sóng T lều cao nhọn đáy hẹp kinh điển"
    },
    "ecgMetrics": {
      "expected_hr": "50 - 80 bpm",
      "pr_interval": "220 - 280 ms",
      "qrs_duration": "120 - 150 ms (Dãn rộng)",
      "qt_interval": "380 - 410 ms",
      "qrs_axis": "Trục lệch trái / Vô định"
    },
    "clinicalAction": "CẤP CỨU HỒI SỨC TOÀN DIỆN NGAY LẬP TỨC! (1) TIÊM TĨNH MẠCH CANXI GLUCONAT 10% 10ml (hoặc Canxi Clorid) trong 2-3 phút ĐỂ ỔN ĐỊNH MÀNG TẾ BÀO CƠ TIM LẬP TỨC (tác dụng sau 1-3 phút); (2) Đẩy Kali vào trong tế bào: Truyền tĩnh mạch nhanh 10 đơn vị Insulin nhanh + 50ml Glucose 50% (hoặc 500ml Glucose 10%); (3) Khí dung Albuterol / Salbutamol 10-20mg; (4) Thải Kali ra ngoài: Thuốc lợi tiểu Furosemide hoặc nhựa trao đổi ion (Resonium); (5) LỌC MÁU CẤP CỨU nếu suy thận vô niệu.",
    "differentialDiagnoses": [
      "Sóng T tối cấp của nhồi máu cơ tim",
      "Tái cực sớm",
      "Hạ thân nhiệt"
    ]
  },
  "normal_sinus": {
    "id": "normal_sinus",
    "name": "Nhịp Xoang Bình Thường",
    "nameEn": "Normal Sinus Rhythm (NSR)",
    "category": "sinus",
    "severity": "normal",
    "criteria": [
      "Sóng P xoang: Đồng dạng đi trước mỗi phức bộ QRS",
      "Trục sóng P bình thường: Dương ở DI, DII, aVF; Luôn luôn âm ở aVR",
      "Khoảng PR bình thường: Cố định và bình thường từ 0.12s đến 0.20s (3 - 5 ô nhỏ)",
      "Khoảng cách R-R đều: Tần số tim bình thường 60 đến 100 chu kỳ/phút",
      "QRS hẹp & ST đẳng điện: QRS < 120ms, đoạn ST đẳng điện và sóng T bình thường"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "Sóng P xoang dương trước QRS",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "P",
        "label": "Sóng P hai pha (+/-) nhẹ",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "Sóng P đồng dạng đi trước mỗi nhát QRS",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DI",
        "waveComponent": "P",
        "label": "▲ Sóng P dương ở DI (+0.12 mV)",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "▲ Sóng P dương ở DII (+0.15 mV)",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "aVF",
        "waveComponent": "P",
        "label": "▲ Sóng P dương ở aVF (+0.10 mV)",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "aVR",
        "waveComponent": "P",
        "label": "▼ Sóng P âm ở aVR (-0.12 mV)",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "▲ Dải nhịp: Sóng P xoang trục bình thường",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "↔ PR bình thường 152ms (3.8 ô nhỏ)",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "PR",
        "label": "↔ PR = 152ms cố định (3.8 ô nhỏ)",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "↔ Dải nhịp: PR bình thường 152ms (Cố định 0.12s - 0.20s)",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "↔ R-R đều (HR = 75 bpm, 4.0 ô lớn)",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.8,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Dải nhịp: R-R đều đặn 800ms (75 bpm • Chuẩn: 60-100 bpm)",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.8,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 3
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS hẹp 84ms (< 120ms)",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 4
      },
      {
        "leadId": "V5",
        "waveComponent": "QRS",
        "label": "QRS hẹp 84ms, R cao bình thường",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 4
      },
      {
        "leadId": "DII",
        "waveComponent": "ST",
        "label": "ST đẳng điện (0.0 mV)",
        "targetCyclePhase": 0.35,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 4
      },
      {
        "leadId": "II",
        "waveComponent": "ST",
        "label": "Dải nhịp: ST đẳng điện, sóng T bình thường",
        "targetCyclePhase": 0.35,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "DII": "Sóng P dương rõ nét 1.5mm, khoảng PR = 160ms, QRS hẹp 85ms",
      "aVR": "Sóng P âm, QRS âm, T âm toàn bộ",
      "V1": "P hai pha (+/-) nhẹ, rS nhỏ",
      "V5": "Sóng R cao, T dương bình thường"
    },
    "ecgMetrics": {
      "expected_hr": "60 - 100 bpm",
      "pr_interval": "120 - 200 ms",
      "qrs_duration": "80 - 100 ms",
      "qt_interval": "380 - 420 ms",
      "qrs_axis": "+30° đến +60° (Trục bình thường)"
    },
    "clinicalAction": "Điện tâm đồ cơ bản bình thường. Duy trì lối sống lành mạnh, tái khám sức khỏe định kỳ.",
    "differentialDiagnoses": [
      "Nhịp bộ nối",
      "Nhịp nhĩ lạc chỗ"
    ]
  },
  "sinus_bradycardia": {
    "id": "sinus_bradycardia",
    "name": "Nhịp Chậm Xoang",
    "nameEn": "Sinus Bradycardia",
    "category": "sinus",
    "severity": "borderline",
    "criteria": [
      "Tần số phát nhịp của nút xoang < 60 chu kỳ/phút",
      "Sóng P xoang bình thường đi trước mỗi phức bộ QRS",
      "Khoảng PR bình thường (0.12 - 0.20s)",
      "Phức bộ QRS hẹp bình thường (< 0.12s), R-R đều kéo dài"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "↔ Tần số tim chậm 48 bpm (R-R = 1250ms, 6.2 ô lớn)",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.85,
        "color": "#2563eb",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Dải nhịp: Nhịp chậm 48 bpm",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.85,
        "color": "#2563eb",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "DI",
        "waveComponent": "P",
        "label": "▲ Sóng P dương ở DI (+0.12 mV)",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "▲ Sóng P xoang dương ở DII",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "aVF",
        "waveComponent": "P",
        "label": "▲ Sóng P dương ở aVF",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "aVR",
        "waveComponent": "P",
        "label": "▼ Sóng P âm ở aVR (-0.12 mV)",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "▲ Sóng P xoang đi trước mỗi QRS",
        "targetCyclePhase": 0.12,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "↔ PR bình thường 170ms",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "↔ PR trong giới hạn bình thường 170ms",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS hẹp 85ms",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "V5",
        "waveComponent": "QRS",
        "label": "QRS hẹp bình thường",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DII": "Khoảng R-R kéo dài 6-7 ô lớn (tần số 45-50 bpm), P xoang dương",
      "aVF": "Sóng P dương, khoảng PR = 170ms",
      "V1-V6": "Hình thái sóng bình thường nhưng chu kỳ chậm"
    },
    "ecgMetrics": {
      "expected_hr": "40 - 59 bpm",
      "pr_interval": "140 - 200 ms",
      "qrs_duration": "80 - 100 ms",
      "qt_interval": "420 - 460 ms",
      "qrs_axis": "+45° (Bình thường)"
    },
    "clinicalAction": "Đánh giá triệu chứng huyết động (choáng váng, tụt huyết áp). Nếu có triệu chứng: Atropin 0.5 - 1mg TM. Nếu không triệu chứng (vận động viên): theo dõi.",
    "differentialDiagnoses": [
      "Block nhĩ thất độ II kiểu 2:1",
      "Hội chứng suy nút xoang",
      "Ngừng xoang"
    ]
  },
  "sinus_tachycardia": {
    "id": "sinus_tachycardia",
    "name": "Nhịp Nhanh Xoang",
    "nameEn": "Sinus Tachycardia",
    "category": "sinus",
    "severity": "borderline",
    "criteria": [
      "Tần số nhát bóp nút xoang > 100 chu kỳ/phút (thường 100 - 150 bpm)",
      "Sóng P xoang bình thường đi trước mỗi phức bộ QRS",
      "Khoảng cách R-R đều đặn, khoảng PR hơi ngắn lại sinh lý",
      "Khởi đầu và kết thúc từ từ, đáp ứng với nghiệm pháp cường phó giao cảm"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "↔ Tần số nhanh 125 bpm (R-R = 480ms, 2.4 ô lớn)",
        "targetCyclePhase": 0.18,
        "intervalEndPhase": 0.65,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Dải nhịp: Nhịp nhanh xoang 125 bpm",
        "targetCyclePhase": 0.18,
        "intervalEndPhase": 0.65,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "DI",
        "waveComponent": "P",
        "label": "▲ Sóng P dương ở DI (+0.12 mV)",
        "targetCyclePhase": 0.1,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "▲ Sóng P xoang dương trước QRS",
        "targetCyclePhase": 0.1,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "aVF",
        "waveComponent": "P",
        "label": "▲ Sóng P dương ở aVF",
        "targetCyclePhase": 0.1,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "aVR",
        "waveComponent": "P",
        "label": "▼ Sóng P âm ở aVR",
        "targetCyclePhase": 0.1,
        "color": "#059669",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "P",
        "label": "▲ Sóng P xoang đi trước QRS",
        "targetCyclePhase": 0.1,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "↔ PR hơi ngắn lại sinh lý (130ms)",
        "targetCyclePhase": 0.1,
        "intervalEndPhase": 0.24,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "↔ PR ngắn lại sinh lý khi tần số nhanh",
        "targetCyclePhase": 0.1,
        "intervalEndPhase": 0.24,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "Khởi đầu & kết thúc từ từ, đáp ứng phó giao cảm",
        "targetCyclePhase": 0.2,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DII": "Khoảng R-R ngắn < 3 ô lớn (tần số 120 bpm), P xoang dương",
      "V1": "QRS hẹp, T có thể trùng nhẹ vào pha cuối của P chu kỳ kế",
      "aVR": "Sóng P âm rõ"
    },
    "ecgMetrics": {
      "expected_hr": "101 - 150 bpm",
      "pr_interval": "120 - 160 ms",
      "qrs_duration": "75 - 95 ms",
      "qt_interval": "300 - 350 ms",
      "qrs_axis": "+60° (Bình thường)"
    },
    "clinicalAction": "Tìm và điều trị nguyên nhân gốc rễ (sốt, mất máu, giảm thể tích, đau đớn, nhiễm trùng, cường giáp, thuyên tắc phổi). Không điều trị cắt cơn bằng sốc điện.",
    "differentialDiagnoses": [
      "Nhịp nhanh kịch phát trên thất (SVT)",
      "Cuồng nhĩ dẫn truyền 2:1",
      "Rung nhĩ đáp ứng thất nhanh"
    ]
  },
  "stemi_lateral": {
    "id": "stemi_lateral",
    "name": "Nhồi Máu Cơ Tim Cấp ST Chênh Lên Thành Bên",
    "nameEn": "Acute Lateral ST-Elevation Myocardial Infarction",
    "category": "ischemia",
    "severity": "critical",
    "criteria": [
      "ST chênh lên ≥ 1mm ở chuyển đạo thành bên cao (DI, aVL) và/hoặc thành bên thấp (V5, V6)",
      "ST chênh xuống soi gương ở các chuyển đạo thành dưới (DIII, aVF)",
      "Sóng Q hoại tử mới xuất hiện ở DI, aVL, V5, V6",
      "Thường đi kèm với nhồi máu thành trước hoặc thành dưới (nhồi máu nhiều vùng)"
    ],
    "annotations": [
      {
        "leadId": "DI",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên bên cao +2.0mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "aVL",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên bên cao +2.5mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V5",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên bên thấp +1.8mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V6",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên bên thấp +2.0mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "ST",
        "label": "▼ ST soi gương thành dưới -1.2mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DIII",
        "waveComponent": "ST",
        "label": "▼ ST soi gương thành dưới -1.8mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "aVF",
        "waveComponent": "ST",
        "label": "▼ ST soi gương -1.5mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "ST",
        "label": "▼ Dải nhịp: ST soi gương -1.2mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DI",
        "waveComponent": "Q",
        "label": "▼ Sóng Q hoại tử mới thành bên",
        "targetCyclePhase": 0.2,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "aVL",
        "waveComponent": "Q",
        "label": "▼ Sóng Q hoại tử rộng > 0.04s",
        "targetCyclePhase": 0.2,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V6",
        "waveComponent": "Q",
        "label": "▼ Sóng Q hoại tử V6",
        "targetCyclePhase": 0.2,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V4",
        "waveComponent": "ST",
        "label": "ST chênh lan sang mỏm tim V4",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "DI": "ST chênh lên dạng vòm 2.0mm, T dương nhọn",
      "aVL": "ST chênh lên 2.5mm, có sóng Q hoại tử nhỏ",
      "V5": "ST chênh lên 2.2mm",
      "V6": "ST chênh lên 2.0mm",
      "DIII": "ST chênh xuống soi gương 1.8mm, T âm",
      "aVF": "ST chênh xuống soi gương 1.5mm"
    },
    "ecgMetrics": {
      "expected_hr": "75 - 100 bpm",
      "pr_interval": "150 - 180 ms",
      "qrs_duration": "85 - 105 ms",
      "qt_interval": "400 - 430 ms",
      "qrs_axis": "-30° (Trục lệch trái)"
    },
    "clinicalAction": "Kích hoạt Cath Lab can thiệp nhánh mũ (LCx) hoặc nhánh Diagonal. Dùng phác đồ kháng kết tập tiểu cầu kép + kháng đông toàn thân.",
    "differentialDiagnoses": [
      "Viêm cơ tim cấp",
      "Tái cực sớm lành tính",
      "Viêm màng ngoài tim cấp"
    ]
  },
  "stemi_posterior": {
    "id": "stemi_posterior",
    "name": "Nhồi Máu Cơ Tim Cấp ST Chênh Lên Thành Sau",
    "nameEn": "True Posterior ST-Elevation Myocardial Infarction",
    "category": "ischemia",
    "severity": "critical",
    "criteria": [
      "ST chênh xuống đi ngang hoặc dốc xuống ≥ 0.5mm ở V1, V2, V3 (hình ảnh soi gương của ST chênh lên thành sau)",
      "Sóng R cao vượt trội (tỉ lệ R/S > 1) và rộng ≥ 0.04s ở V2 (tương đương sóng Q hoại tử thành sau)",
      "Sóng T dương cao nhọn, thẳng đứng đối xứng ở V1-V3 (tương đương T âm thành sau)",
      "Khẳng định chẩn đoán bằng cách mắc thêm chuyển đạo lưng: ST chênh lên ≥ 0.5mm ở V7, V8, V9"
    ],
    "annotations": [
      {
        "leadId": "V1",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống soi gương -1.5mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V2",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống đi ngang soi gương -2.5mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V3",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống soi gương -2.0mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "R",
        "label": "▲ R cao thành trước phải (Gương của Q)",
        "targetCyclePhase": 0.22,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V2",
        "waveComponent": "R",
        "label": "▲ R cao vượt trội R/S > 1 (Gương của Q sau)",
        "targetCyclePhase": 0.22,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V1",
        "waveComponent": "T",
        "label": "▲ T dương cao nhọn (Gương của T âm)",
        "targetCyclePhase": 0.45,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V2",
        "waveComponent": "T",
        "label": "▲ T dương cao nhọn đối xứng (Gương của T âm)",
        "targetCyclePhase": 0.45,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V3",
        "waveComponent": "T",
        "label": "▲ T dương đối xứng thành sau",
        "targetCyclePhase": 0.45,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V5",
        "waveComponent": "ST",
        "label": "Chỉ định đo thêm V7, V8, V9 ở lưng",
        "targetCyclePhase": 0.32,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "V6",
        "waveComponent": "ST",
        "label": "Khẳng định: ST chênh lên ≥ 0.5mm ở V7-V9",
        "targetCyclePhase": 0.32,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "V1": "ST chênh xuống 1.5mm, sóng R cao nhọn",
      "V2": "ST chênh xuống 2.5mm đi ngang, sóng R khổng lồ (R/S = 2.2), T dương đối xứng",
      "V3": "ST chênh xuống 2.0mm, R cao",
      "V7-V9": "ST chênh lên dạng vòm 1.5 - 2.0mm (chuyển đạo lưng)",
      "DII": "Có thể chênh lên nhẹ nếu đi kèm NMCT thành dưới"
    },
    "ecgMetrics": {
      "expected_hr": "60 - 90 bpm",
      "pr_interval": "160 - 190 ms",
      "qrs_duration": "85 - 100 ms",
      "qt_interval": "400 - 430 ms",
      "qrs_axis": "+60° (Bình thường)"
    },
    "clinicalAction": "Đo ngay chuyển đạo thành sau lưng (V7, V8, V9). Nếu V7-V9 ST chênh lên ≥ 0.5mm -> Báo động đỏ Cath Lab can thiệp PCI khẩn cấp như một ca STEMI thực thụ!",
    "differentialDiagnoses": [
      "Phì đại thất phải (RVH)",
      "Hội chứng WPW type A",
      "Block nhánh phải"
    ]
  },
  "nemi_subendocardial": {
    "id": "nemi_subendocardial",
    "name": "Thiếu Máu Cơ Tim Dưới Nội Tâm Mạc / NSTEMI",
    "nameEn": "Subendocardial Ischemia / NSTEMI",
    "category": "ischemia",
    "severity": "critical",
    "criteria": [
      "ST chênh xuống đi ngang (horizontal) hoặc dốc xuống (downsloping) ≥ 1mm (0.1 mV) ở ≥ 2 chuyển đạo liên tiếp",
      "Sóng T âm sâu đối xứng hoặc hai pha",
      "ST chênh lên ở aVR (đặc biệt nếu ST chênh lên ở aVR ≥ 1mm và cao hơn V1 gợi ý tổn thương thân chung LMCA hoặc 3 thân mạch vành)",
      "Không có sóng Q hoại tử mới"
    ],
    "annotations": [
      {
        "leadId": "DI",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống đi ngang -1.5mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "aVL",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống -1.8mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V4",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống mỏm tim -2.0mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V5",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống đi ngang -2.5mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V6",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống -2.0mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V4",
        "waveComponent": "T",
        "label": "▼ Sóng T âm sâu thiếu máu dưới nội tâm mạc",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "V5",
        "waveComponent": "T",
        "label": "▼ Sóng T âm nhọn đối xứng sâu -3.0mm",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "V6",
        "waveComponent": "T",
        "label": "▼ Sóng T âm đối xứng",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "aVR",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên ở aVR ≥ 1mm (Gợi ý LMCA/3 thân)",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "ST",
        "label": "ST chênh nhẹ ở V1 (< aVR)",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "DI",
        "waveComponent": "Q",
        "label": "Không có sóng Q hoại tử xuyên thành",
        "targetCyclePhase": 0.2,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "V5",
        "waveComponent": "Q",
        "label": "Không có sóng Q bệnh lý",
        "targetCyclePhase": 0.2,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "V4": "ST chênh xuống đi ngang 2.0mm, T âm đối xứng",
      "V5": "ST chênh xuống đi ngang 2.5mm, T âm",
      "V6": "ST chênh xuống 2.2mm",
      "DI": "ST chênh xuống 1.5mm",
      "DII": "ST chênh xuống 1.8mm",
      "aVR": "ST chênh lên 1.5mm (dấu hiệu tắc thân chung ĐM vành trái LMCA)"
    },
    "ecgMetrics": {
      "expected_hr": "75 - 110 bpm",
      "pr_interval": "150 - 180 ms",
      "qrs_duration": "85 - 100 ms",
      "qt_interval": "400 - 440 ms",
      "qrs_axis": "+45° (Bình thường)"
    },
    "clinicalAction": "Đánh giá thang điểm nguy cơ GRACE / TIMI. Nếu có ST chênh lên ở aVR kèm ST chênh xuống lan tỏa ≥ 6 chuyển đạo: Xếp vào nhóm nguy cơ cực cao (Very High Risk) -> Can thiệp mạch vành khẩn cấp trong vòng 2 giờ! Dùng kháng kết tập tiểu cầu kép + Heparin.",
    "differentialDiagnoses": [
      "Ngộ độc Digitalis",
      "Tăng gánh thất trái (LVH strain)",
      "Hạ Kali máu"
    ]
  },
  "rbbb": {
    "id": "rbbb",
    "name": "Block Nhánh Phải Hoàn Toàn (RBBB)",
    "nameEn": "Complete Right Bundle Branch Block",
    "category": "conduction",
    "severity": "abnormal",
    "criteria": [
      "Thời gian phức bộ QRS dãn rộng ≥ 0.12s (≥ 120 ms / 3 ô nhỏ)",
      "Dạng sóng 'tai thỏ' rsR', rSR' hoặc R rộng có khía ở chuyển đạo trước ngực phải (V1, V2)",
      "Sóng S rộng và sâu (> 0.04s) ở các chuyển đạo thành bên (DI, aVL, V5, V6)",
      "ST chênh xuống và sóng T âm thứ phát trái chiều với nhánh cuối QRS ở V1, V2"
    ],
    "annotations": [
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS dãn rộng 135ms (≥ 120ms)",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V6",
        "waveComponent": "QRS",
        "label": "Thời gian QRS ≥ 0.12s",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "QRS",
        "label": "Dải nhịp: QRS dãn rộng ≥ 120ms",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "R",
        "label": "Dạng tai thỏ rsR' kinh điển (R' > r)",
        "targetCyclePhase": 0.26,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V2",
        "waveComponent": "R",
        "label": "Dạng sóng tai thỏ rSR' ở V2",
        "targetCyclePhase": 0.26,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DI",
        "waveComponent": "S",
        "label": "▼ Sóng S rộng sâu > 40ms",
        "targetCyclePhase": 0.28,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "aVL",
        "waveComponent": "S",
        "label": "▼ Sóng S dãn rộng thành bên cao",
        "targetCyclePhase": 0.28,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V5",
        "waveComponent": "S",
        "label": "▼ Sóng S rộng > 0.04s",
        "targetCyclePhase": 0.28,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V6",
        "waveComponent": "S",
        "label": "▼ Sóng S rộng và tù ở V6",
        "targetCyclePhase": 0.28,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "T",
        "label": "▼ ST chênh xuống và T âm thứ phát",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 3
      },
      {
        "leadId": "V2",
        "waveComponent": "T",
        "label": "▼ Sóng T âm thứ phát ở V2",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "V1": "Dạng tai thỏ rsR' điển hình: sóng R' thứ hai cao 12mm, QRS rộng 135ms, T âm thứ phát",
      "V2": "Dạng rSR' với đỉnh R' nhọn, ST chênh xuống nhẹ",
      "DI": "Sóng S rộng > 40ms, nhẵn tròn",
      "V6": "Sóng S rộng sâu > 40ms, QRS rộng 135ms"
    },
    "ecgMetrics": {
      "expected_hr": "60 - 95 bpm",
      "pr_interval": "140 - 180 ms",
      "qrs_duration": "125 - 145 ms (≥ 120ms)",
      "qt_interval": "390 - 430 ms",
      "qrs_axis": "+90° đến +110° (Trục lệch phải)"
    },
    "clinicalAction": "RBBB đơn độc thường lành tính. Tuy nhiên, nếu RBBB MỚI XUẤT HIỆN trên bệnh nhân đau ngực/khó thở cấp: Cảnh giác thuyên tắc phổi cấp hoặc nhồi máu cơ tim trước vách (tắc nhánh LAD nuôi vách).",
    "differentialDiagnoses": [
      "Hội chứng Brugada",
      "Phì đại thất phải (RVH)",
      "Hội chứng WPW type A"
    ]
  },
  "lbbb": {
    "id": "lbbb",
    "name": "Block Nhánh Trái Hoàn Toàn (LBBB)",
    "nameEn": "Complete Left Bundle Branch Block",
    "category": "conduction",
    "severity": "critical",
    "criteria": [
      "Thời gian phức bộ QRS dãn rộng ≥ 0.12s (≥ 120 ms)",
      "Sóng R rộng, có khía ở đỉnh (dạng chữ M) ở các chuyển đạo thành bên (DI, aVL, V5, V6)",
      "Mất hoàn toàn sóng Q vách liên thất sinh lý ở DI, aVL, V5, V6",
      "Sóng r nhỏ kèm sóng S rất sâu và rộng dạng QS hoặc rS ở V1, V2",
      "Thay đổi ST-T thứ phát trái chiều với phức bộ QRS (ST chênh xuống và T âm ở V5, V6; ST chênh lên ở V1-V3)",
      "Chẩn đoán STEMI trên nền LBBB dựa vào Tiêu Chuẩn Sgarbossa cải biên"
    ],
    "annotations": [
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS dãn rộng 145ms (≥ 120ms)",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V6",
        "waveComponent": "QRS",
        "label": "QRS dãn rộng mất đồng bộ thất",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "QRS",
        "label": "Dải nhịp: QRS dãn rộng ≥ 120ms",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DI",
        "waveComponent": "R",
        "label": "▲ Sóng R rộng có khía (dạng chữ M)",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "aVL",
        "waveComponent": "R",
        "label": "▲ Sóng R có khía đỉnh ở aVL",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V5",
        "waveComponent": "R",
        "label": "▲ R rộng có khía dạng chữ M ở V5",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V6",
        "waveComponent": "R",
        "label": "▲ R rộng có khía đỉnh ở V6",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DI",
        "waveComponent": "Q",
        "label": "Mất hoàn toàn sóng Q vách liên thất",
        "targetCyclePhase": 0.2,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "aVL",
        "waveComponent": "Q",
        "label": "Mất sóng Q sinh lý ở aVL",
        "targetCyclePhase": 0.2,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V5",
        "waveComponent": "Q",
        "label": "Mất sóng Q vách sinh lý ở V5",
        "targetCyclePhase": 0.2,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V6",
        "waveComponent": "Q",
        "label": "Mất sóng Q ở V6",
        "targetCyclePhase": 0.2,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "S",
        "label": "▼ Sóng QS sâu rộng khổng lồ ở V1",
        "targetCyclePhase": 0.26,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 3
      },
      {
        "leadId": "V2",
        "waveComponent": "S",
        "label": "▼ Dạng rS cụt sóng S rất sâu ở V2",
        "targetCyclePhase": 0.26,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 3
      },
      {
        "leadId": "V1",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên thứ phát ngược chiều S",
        "targetCyclePhase": 0.32,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 4
      },
      {
        "leadId": "V5",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống và T âm thứ phát",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 4
      },
      {
        "leadId": "V6",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống thứ phát ở V6",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 4
      },
      {
        "leadId": "V5",
        "waveComponent": "ST",
        "label": "Áp dụng Sgarbossa cải biên chẩn đoán MI",
        "targetCyclePhase": 0.32,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 5
      }
    ],
    "leadManifestations": {
      "V1": "Dạng rS nhỏ kèm sóng S cực sâu rộng 140ms, ST chênh lên nhẹ thứ phát 1.5mm",
      "V2": "Dạng QS rộng sâu, T dương",
      "V5": "Sóng R rộng có khía ở đỉnh 140ms, ST chênh xuống 1.5mm, T âm",
      "V6": "Sóng R rộng đỉnh có khía dạng tai thỏ LBBB, mất hoàn toàn sóng Q vách",
      "DI": "R rộng có khía",
      "aVL": "R rộng có khía"
    },
    "ecgMetrics": {
      "expected_hr": "65 - 100 bpm",
      "pr_interval": "160 - 200 ms",
      "qrs_duration": "135 - 160 ms (≥ 120ms)",
      "qt_interval": "430 - 480 ms",
      "qrs_axis": "-15° đến -45° (Trục lệch trái)"
    },
    "clinicalAction": "LBBB thường là dấu hiệu của bệnh lý tim thực tổn nặng (suy tim, bệnh cơ tim giãn, xơ vữa mạch vành). NẾU LBBB MỚI XUẤT HIỆN KÈM ĐAU NGỰC: Phải kích hoạt can thiệp mạch vành khẩn cấp như một ca STEMI! Áp dụng Tiêu chuẩn Sgarbossa.",
    "differentialDiagnoses": [
      "Phì đại thất trái nặng",
      "Hội chứng WPW",
      "Nhịp tự thất"
    ]
  },
  "lafb": {
    "id": "lafb",
    "name": "Block Phân Nhánh Trái Trước (LAFB / LAHB)",
    "nameEn": "Left Anterior Fascicular Block",
    "category": "conduction",
    "severity": "abnormal",
    "criteria": [
      "Trục điện tim lệch trái mạnh từ -45° đến -90°",
      "Dạng sóng qR ở các chuyển đạo thành bên (DI, aVL)",
      "Dạng sóng rS ở các chuyển đạo thành dưới (DII, DIII, aVF), với sóng S sâu ở DIII",
      "Độ rộng phức bộ QRS bình thường hoặc chỉ dãn rộng nhẹ (< 0.12s, thường 0.09 - 0.11s)",
      "Thời gian xuất hiện nhánh nội điện ở aVL > 0.045s"
    ],
    "annotations": [
      {
        "leadId": "DI",
        "waveComponent": "QRS",
        "label": "Trục lệch trái mạnh: DI dương trội",
        "targetCyclePhase": 0.24,
        "color": "#2563eb",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "aVF",
        "waveComponent": "QRS",
        "label": "Trục lệch trái mạnh: aVF âm sâu",
        "targetCyclePhase": 0.24,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "QRS",
        "label": "Trục QRS lệch trái từ -45° đến -90°",
        "targetCyclePhase": 0.24,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "DI",
        "waveComponent": "R",
        "label": "▲ Dạng qR ở DI",
        "targetCyclePhase": 0.22,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "aVL",
        "waveComponent": "R",
        "label": "▲ Dạng qR với sóng R cao ở aVL",
        "targetCyclePhase": 0.22,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "S",
        "label": "▼ Dạng rS ở DII",
        "targetCyclePhase": 0.26,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "DIII",
        "waveComponent": "S",
        "label": "▼ Dạng rS với sóng S sâu ở DIII",
        "targetCyclePhase": 0.26,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "aVF",
        "waveComponent": "S",
        "label": "▼ Dạng rS ở aVF",
        "targetCyclePhase": 0.26,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS thanh mảnh 95ms (< 120ms)",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "aVL",
        "waveComponent": "R",
        "label": "Thời gian nhánh nội điện > 0.045s",
        "targetCyclePhase": 0.24,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "aVL": "Sóng q nhỏ kèm sóng R cao (dạng qR), QRS hẹp 95ms",
      "DI": "Dạng qR với R cao",
      "DII": "Dạng rS với sóng S sâu",
      "DIII": "Sóng S cực sâu (rS), trục điện tim -60°",
      "aVF": "Dạng rS"
    },
    "ecgMetrics": {
      "expected_hr": "60 - 90 bpm",
      "pr_interval": "140 - 180 ms",
      "qrs_duration": "90 - 105 ms (< 120ms)",
      "qt_interval": "380 - 410 ms",
      "qrs_axis": "-60° (Trục lệch trái mạnh -45° đến -90°)"
    },
    "clinicalAction": "LAFB là dạng block phân nhánh phổ biến nhất vì nhánh trái trước mỏng và dài. Tầm soát bệnh mạch vành (LAD), tăng huyết áp hoặc bệnh cơ tim. Nếu kết hợp RBBB tạo thành Block hai phân nhánh (Bifascicular Block) cần theo dõi sát nguy cơ tiến triển thành Block AV độ III.",
    "differentialDiagnoses": [
      "Nhồi máu cơ tim cũ thành dưới (sóng Q ở DIII)",
      "Khí phế thũng",
      "Phì đại thất trái"
    ]
  },
  "wpw_syndrome": {
    "id": "wpw_syndrome",
    "name": "Hội Chứng Wolff-Parkinson-White (WPW)",
    "nameEn": "Wolff-Parkinson-White Syndrome (Pre-excitation)",
    "category": "atrial",
    "severity": "critical",
    "criteria": [
      "Khoảng PR ngắn < 0.12s (< 120 ms / 3 ô nhỏ)",
      "Sóng Delta (Delta wave): Sườn dốc lên của phức bộ QRS thoai thoải chậm ở giai đoạn đầu do tâm thất bị kích thích sớm qua đường phụ",
      "Phức bộ QRS dãn rộng ≥ 0.12s (> 120 ms)",
      "Thay đổi đoạn ST và sóng T thứ phát trái chiều với sóng Delta",
      "Tiền sử hoặc nguy cơ xuất hiện các cơn nhịp nhanh kịch phát (AVRT) hoặc rung nhĩ dẫn truyền qua đường phụ cực kỳ nguy hiểm"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "↔ Khoảng PR ngắn 90ms (< 120ms)",
        "targetCyclePhase": 0.08,
        "intervalEndPhase": 0.18,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "PR",
        "label": "↔ PR ngắn do kích thích sớm qua cầu Kent",
        "targetCyclePhase": 0.08,
        "intervalEndPhase": 0.18,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "↔ Dải nhịp: PR ngắn < 3 ô nhỏ",
        "targetCyclePhase": 0.08,
        "intervalEndPhase": 0.18,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "R",
        "label": "▲ Sóng Delta: Sườn thoai thoải đầu QRS",
        "targetCyclePhase": 0.19,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V1",
        "waveComponent": "R",
        "label": "▲ Sóng Delta kích thích sớm ở V1",
        "targetCyclePhase": 0.19,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V4",
        "waveComponent": "R",
        "label": "▲ Sóng Delta rõ nét ở V4",
        "targetCyclePhase": 0.19,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "R",
        "label": "▲ Sóng Delta điển hình",
        "targetCyclePhase": 0.19,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "QRS dãn rộng 130ms (≥ 120ms)",
        "targetCyclePhase": 0.24,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V5",
        "waveComponent": "QRS",
        "label": "QRS dãn rộng do sóng Delta",
        "targetCyclePhase": 0.24,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "T",
        "label": "▼ ST-T biến đổi thứ phát ngược hướng Delta",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 3
      },
      {
        "leadId": "V2",
        "waveComponent": "T",
        "label": "▼ Sóng T âm thứ phát",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "⚠️ Nguy cơ cao cơn nhịp nhanh kịch phát AVRT / AFib",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "V1": "Sóng Delta dương cao, PR ngắn 90ms, QRS dãn rộng 130ms (Type A - đường phụ bên trái)",
      "V2": "Sóng Delta rõ, sườn dốc lên thoai thoải",
      "DII": "PR cực ngắn < 100ms, sóng Delta nhọn ở đỉnh",
      "aVF": "Sóng Delta dương"
    },
    "ecgMetrics": {
      "expected_hr": "70 - 100 bpm (Lúc nghỉ)",
      "pr_interval": "80 - 110 ms (< 120ms)",
      "qrs_duration": "120 - 145 ms (≥ 120ms)",
      "qt_interval": "390 - 430 ms",
      "qrs_axis": "+30° (Bình thường / Lệch nhẹ)"
    },
    "clinicalAction": "Nếu bệnh nhân có cơn nhịp nhanh vào lại (AVRT): xử trí tương tự SVT. NẾU WPW ĐI KÈM RUNG NHĨ (AFib + WPW): CẤP CỨU TỐI KHẨN! Điện tim có nhịp nhanh QRS rộng, không đều, tần số thất > 200 - 300 bpm. CHỈ ĐỊNH DUY NHẤT: SỐC ĐIỆN ĐỒNG BỘ HOẶC DÙNG PROCAINAMIDE / IBUTILIDE. Triệt đốt đường phụ (Catheter Ablation) chữa khỏi dứt điểm.",
    "differentialDiagnoses": [
      "Block nhánh trái (LBBB)",
      "Phì đại thất trái",
      "Nhồi máu cơ tim cũ (sóng Delta âm giả sóng Q)"
    ]
  },
  "torsades_de_pointes": {
    "id": "torsades_de_pointes",
    "name": "Cơn Xoắn Đỉnh (Torsades de Pointes - TdP)",
    "nameEn": "Torsades de Pointes (Polymorphic VT with Long QT)",
    "category": "ventricular",
    "severity": "critical",
    "criteria": [
      "Cơn nhịp nhanh thất đa dạng (Polymorphic VT) với tần số rất nhanh 200 - 250 bpm",
      "Đặc điểm hình thái kinh điển: Đỉnh của các phức bộ QRS liên tục thay đổi biên độ và cực tính, xoắn vặn quanh đường đẳng điện như một dải ruy-băng",
      "Xuất hiện trên nền khoảng QT kéo dài (QTc > 500ms) lúc nhịp xoang cơ bản",
      "Khởi phát bằng chu kỳ 'Ngắn - Dài - Ngắn' (Short-Long-Short sequence)",
      "Dễ thoái triển thành Rung Thất gây ngừng tuần hoàn tử vong"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "↔ Tần số thất rất nhanh 220 bpm (R-R = 270ms)",
        "targetCyclePhase": 0.15,
        "intervalEndPhase": 0.42,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Dải nhịp: Nhanh thất đa dạng 220 bpm",
        "targetCyclePhase": 0.15,
        "intervalEndPhase": 0.42,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "R",
        "label": "⚡ Đỉnh QRS xoay quanh đường đẳng điện",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V1",
        "waveComponent": "R",
        "label": "Hình thái xoắn vặn dải ruy-băng điển hình",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "R",
        "label": "⚡ Biên độ và cực tính thay đổi liên tục",
        "targetCyclePhase": 0.24,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "QT",
        "label": "↔ Xuất hiện trên nền QTc kéo dài > 500ms",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.7,
        "color": "#9333ea",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "QT",
        "label": "↔ QTc nền > 500ms (Hội chứng QT dài)",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.7,
        "color": "#9333ea",
        "badgePlacement": "interval",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "Khởi phát bằng chu kỳ 'Ngắn - Dài - Ngắn'",
        "targetCyclePhase": 0.2,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "🚨 Xử trí: Tiêm Magnesi Sulfat 2g IV khẩn cấp",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "DII": "Phức bộ QRS dãn rộng, biên độ nhấp nhô lượn sóng lúc cao lúc thấp, đỉnh xoắn quanh trục đẳng điện",
      "V1": "Hình thái đa dạng biến đổi liên tục",
      "II": "Dải nhịp Lead II: Hình ảnh dải lụa xoắn vặn kinh điển của Torsades de Pointes"
    },
    "ecgMetrics": {
      "expected_hr": "200 - 250 bpm",
      "pr_interval": "Không đo được",
      "qrs_duration": "140 - 200 ms (Đa dạng)",
      "qt_interval": "QTc cơ bản > 500 ms",
      "qrs_axis": "Xoay liên tục quanh trục"
    },
    "clinicalAction": "CẤP CỨU TỐI KHẨN CẤP! (1) TIÊM TĨNH MẠCH MAGNESI SULFAT 2g TRONG 1-2 PHÚT (bất kể nồng độ Magne máu bình thường hay hạ); (2) Nếu mất mạch hoặc thoái triển sang Rung Thất: Phá rung khử rung không đồng bộ (Defibrillation 200J) lập tức; (3) Tăng tần số tim bằng tạo nhịp tạm thời (Overdrive Pacing 90-110 bpm) hoặc truyền Isoproterenol để rút ngắn khoảng QT; (4) Ngừng ngay mọi thuốc kéo dài khoảng QT.",
    "differentialDiagnoses": [
      "Nhanh thất đa dạng thiếu máu cơ tim (không có QT dài)",
      "Rung thất"
    ]
  },
  "lvh_strain": {
    "id": "lvh_strain",
    "name": "Phì Đại Thất Trái Tăng Gánh (LVH with Strain)",
    "nameEn": "Left Ventricular Hypertrophy with Strain Pattern",
    "category": "ischemia",
    "severity": "abnormal",
    "criteria": [
      "Tiêu chuẩn điện thế Sokolow-Lyon: S ở V1 + R ở V5 (hoặc V6) > 35 mm (3.5 mV)",
      "Tiêu chuẩn điện thế Cornell: R ở aVL + S ở V3 > 28 mm (nam) hoặc > 20 mm (nữ)",
      "Dấu hiệu tăng gánh thất trái (Strain pattern): Đoạn ST chênh xuống không đối xứng và sóng T âm sâu ở các chuyển đạo thành bên (DI, aVL, V5, V6)",
      "Trục điện tim lệch trái (thường từ 0° đến -30°), thời gian nhánh nội điện ở V5-V6 kéo dài > 0.05s"
    ],
    "annotations": [
      {
        "leadId": "V1",
        "waveComponent": "S",
        "label": "▼ Sóng S sâu ở V1 = 22mm (2.2 mV)",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V5",
        "waveComponent": "R",
        "label": "▲ Sóng R cao ở V5 = 18mm (1.8 mV)",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V6",
        "waveComponent": "R",
        "label": "▲ R ở V6 cao vượt trội [Sokolow-Lyon > 35mm]",
        "targetCyclePhase": 0.22,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "aVL",
        "waveComponent": "R",
        "label": "▲ Sóng R cao ở aVL = 15mm (1.5 mV)",
        "targetCyclePhase": 0.22,
        "color": "#9333ea",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V3",
        "waveComponent": "S",
        "label": "▼ Sóng S sâu ở V3 = 16mm [Cornell = 31mm > 28mm]",
        "targetCyclePhase": 0.25,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DI",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống tăng gánh thất trái",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "aVL",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống & T âm ở aVL",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V5",
        "waveComponent": "ST",
        "label": "▼ Strain pattern: ST chênh xuống không đối xứng -2.5mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V6",
        "waveComponent": "T",
        "label": "▼ Sóng T âm sâu không đối xứng ở V6",
        "targetCyclePhase": 0.45,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "DI",
        "waveComponent": "QRS",
        "label": "Trục điện tim lệch trái (0° đến -30°)",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "V5",
        "waveComponent": "QRS",
        "label": "Thời gian nhánh nội điện kéo dài > 0.05s",
        "targetCyclePhase": 0.24,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      }
    ],
    "leadManifestations": {
      "V1": "Sóng S cực sâu 22mm",
      "V5": "Sóng R cực cao 25mm (Sokolow-Lyon = 22 + 25 = 47mm > 35mm), ST chênh xuống dạng strain 1.8mm, T âm không đối xứng",
      "V6": "R cao 20mm, ST chênh xuống và T âm",
      "aVL": "Sóng R cao 14mm (> 11mm)"
    },
    "ecgMetrics": {
      "expected_hr": "60 - 90 bpm",
      "pr_interval": "160 - 200 ms",
      "qrs_duration": "95 - 110 ms (< 120ms)",
      "qt_interval": "420 - 460 ms",
      "qrs_axis": "-15° (Trục lệch trái)"
    },
    "clinicalAction": "Kiểm soát chặt chẽ huyết áp mục tiêu (< 130/80 mmHg). Thuốc ức chế men chuyển (ACEi) hoặc ức chế thụ thể (ARB) là lựa chọn ưu tiên vì có tác dụng thoái triển phì đại cơ tim. Chỉ định siêu âm tim kiểm tra bề dày vách liên thất và chức năng tống máu.",
    "differentialDiagnoses": [
      "Thiếu máu cơ tim dưới nội tâm mạc",
      "Block nhánh trái",
      "Hội chứng Brugada"
    ]
  },
  "brugada_type1": {
    "id": "brugada_type1",
    "name": "Hội Chứng Brugada Type 1 (Coved-Type)",
    "nameEn": "Brugada Syndrome Type 1 (Coved-Type ST Elevation)",
    "category": "ventricular",
    "severity": "critical",
    "criteria": [
      "ST chênh lên dạng vòm dốc xuống (Coved-type) ≥ 2mm (0.2 mV) ở ≥ 1 chuyển đạo trước ngực phải (V1, V2)",
      "Đoạn ST chênh lên nối tiếp trực tiếp bằng một sóng T âm đối xứng sâu",
      "Không có khoảng cách đẳng điện giữa ST và T",
      "Tiền sử gia đình có người đột tử do tim khi ngủ hoặc ngất không rõ nguyên nhân",
      "Có thể bộc lộ rõ khi bệnh nhân sốt cao hoặc dùng thuốc chẹn kênh Natri (Ajmaline, Flecainide)"
    ],
    "annotations": [
      {
        "leadId": "V1",
        "waveComponent": "ST",
        "label": "▲ ST vòm dốc xuống (Coved-type) +3.5mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V2",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên dạng vòm dốc xuống +4.0mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V1",
        "waveComponent": "T",
        "label": "▼ Sóng T âm đối xứng sâu nối tiếp sau ST",
        "targetCyclePhase": 0.45,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "V2",
        "waveComponent": "T",
        "label": "▼ T âm đối xứng sâu ở V2",
        "targetCyclePhase": 0.45,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "V1",
        "waveComponent": "ST",
        "label": "Không có khoảng cách đẳng điện giữa ST và T",
        "targetCyclePhase": 0.38,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V2",
        "waveComponent": "ST",
        "label": "ST liên tục chuyển thành T âm",
        "targetCyclePhase": 0.38,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "Nguy cơ cao đột tử do tim khi ngủ / Rung thất",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "V1",
        "waveComponent": "ST",
        "label": "Bộc lộ rõ khi sốt cao hoặc dùng thuốc chẹn kênh Natri",
        "targetCyclePhase": 0.31,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "V1": "ST chênh lên dạng vòm coved-type 3.5mm tiếp nối sóng T âm sâu kinh điển",
      "V2": "ST chênh vòm 3.0mm, T âm",
      "V3": "ST chênh nhẹ 1.0mm",
      "DI-V6": "Hình thái sóng bình thường"
    },
    "ecgMetrics": {
      "expected_hr": "65 - 85 bpm",
      "pr_interval": "160 - 200 ms",
      "qrs_duration": "95 - 115 ms",
      "qt_interval": "380 - 420 ms",
      "qrs_axis": "+60° (Bình thường)"
    },
    "clinicalAction": "NGUY CƠ ĐỘT TỬ DO TIM TRONG LÚC NGỦ CỰC KỲ CAO (do rung thất kịch phát). (1) HẠ SỐT TÍCH CỰC NGAY LẬP TỨC nếu bệnh nhân đang sốt (nhiệt độ cao làm bộc lộ kênh ion bất thường); (2) Tránh tuyệt đối danh sách thuốc chống chỉ định (brugadadrugs.org); (3) CHỈ ĐỊNH CẤY MÁY PHÁ RUNG TỰ ĐỘNG (ICD) là biện pháp duy nhất đã chứng minh cứu sống tính mạng người bệnh; (4) Tầm soát gen và điện tim cho toàn bộ người thân trực hệ.",
    "differentialDiagnoses": [
      "Block nhánh phải (RBBB)",
      "Viêm màng ngoài tim cấp",
      "Tái cực sớm lành tính",
      "Nhồi máu cơ tim trước vách"
    ]
  },
  "pulmonary_embolism": {
    "id": "pulmonary_embolism",
    "name": "Thuyên Tắc Động Mạch Phổi Cấp (S1Q3T3)",
    "nameEn": "Acute Pulmonary Embolism (McGinn-White S1Q3T3 Sign)",
    "category": "ischemia",
    "severity": "critical",
    "criteria": [
      "Nhịp nhanh xoang (dấu hiệu điện tim phổ biến nhất của thuyên tắc phổi)",
      "Tam chứng McGinn-White kinh điển: Sóng S sâu ở DI (> 1.5mm), sóng Q bệnh lý ở DIII, sóng T âm ở DIII (dạng S1Q3T3)",
      "Sóng T âm đối xứng từ V1 đến V4 (dấu hiệu quá tải áp lực thất phải cấp tính)",
      "Block nhánh phải (RBBB) hoàn toàn hoặc không hoàn toàn mới xuất hiện",
      "Sóng P phế (P pulmonale): Sóng P cao nhọn > 2.5mm ở DII do tăng áp lực nhĩ phải"
    ],
    "annotations": [
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "↔ Nhịp nhanh xoang (115 bpm) - Dấu hiệu thường gặp nhất",
        "targetCyclePhase": 0.18,
        "intervalEndPhase": 0.7,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "↔ Dải nhịp: Nhịp nhanh xoang 115 bpm",
        "targetCyclePhase": 0.18,
        "intervalEndPhase": 0.7,
        "color": "#e11d48",
        "badgePlacement": "interval",
        "criterionIndex": 0
      },
      {
        "leadId": "DI",
        "waveComponent": "S",
        "label": "▼ Sóng S sâu ở DI = 2.5mm (> 1.5mm) [S1]",
        "targetCyclePhase": 0.26,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DIII",
        "waveComponent": "Q",
        "label": "▼ Sóng Q hoại tử bệnh lý ở DIII [Q3]",
        "targetCyclePhase": 0.2,
        "color": "#9333ea",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DIII",
        "waveComponent": "T",
        "label": "▼ Sóng T âm ở DIII [T3]",
        "targetCyclePhase": 0.44,
        "color": "#e11d48",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "V1",
        "waveComponent": "T",
        "label": "▼ Sóng T âm đối xứng (Quá tải thất phải cấp)",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V2",
        "waveComponent": "T",
        "label": "▼ Sóng T âm ở V2",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V3",
        "waveComponent": "T",
        "label": "▼ Sóng T âm ở V3",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V4",
        "waveComponent": "T",
        "label": "▼ Sóng T âm ở V4",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "QRS",
        "label": "Block nhánh phải (RBBB) cấp tính",
        "targetCyclePhase": 0.24,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "V6",
        "waveComponent": "S",
        "label": "Sóng S rộng ở V6 do RBBB",
        "targetCyclePhase": 0.26,
        "color": "#d97706",
        "badgePlacement": "bottom",
        "criterionIndex": 3
      },
      {
        "leadId": "DII",
        "waveComponent": "P",
        "label": "▲ Sóng P phế (P pulmonale) cao nhọn > 2.5mm",
        "targetCyclePhase": 0.12,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 4
      },
      {
        "leadId": "aVF",
        "waveComponent": "P",
        "label": "▲ P phế tăng áp nhĩ phải ở aVF",
        "targetCyclePhase": 0.12,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "DI": "Sóng S sâu rõ nét 2.5mm (S1)",
      "DIII": "Sóng Q sâu 2mm kèm sóng T âm sâu 3mm (Q3T3)",
      "DII": "Nhịp nhanh xoang 115 bpm, P phế cao 2.8mm",
      "V1": "T âm đối xứng, dạng rSR' mới xuất hiện",
      "V2-V3": "Sóng T âm sâu đối xứng do căng giãn thất phải"
    },
    "ecgMetrics": {
      "expected_hr": "100 - 130 bpm (Nhanh xoang)",
      "pr_interval": "130 - 160 ms",
      "qrs_duration": "90 - 120 ms",
      "qt_interval": "320 - 360 ms",
      "qrs_axis": "+110° (Trục lệch phải cấp)"
    },
    "clinicalAction": "CẤP CỨU HỒI SỨC TIM PHỔI KHẨN CẤP! (1) Đánh giá phân tầng nguy cơ PESI và huyết động: Nếu có sốc tụt huyết áp (High-Risk PE) -> CHỈ ĐỊNH TIÊU SỢI HUYẾT KHẨN CẤP (Alteplase / rtPA 100mg truyền TM trong 2 giờ); (2) Nếu huyết động ổn định -> Dùng ngay Heparin không phân đoạn hoặc Enoxaparin liều điều trị 1mg/kg mỗi 12h; (3) Chụp CT mạch máu phổi có cản quang (CTPA) là tiêu chuẩn vàng xác định huyết khối.",
    "differentialDiagnoses": [
      "Nhồi máu cơ tim cấp thành dưới",
      "Hội chứng vành cấp",
      "Tràn khí màng phổi"
    ]
  },
  "acute_pericarditis": {
    "id": "acute_pericarditis",
    "name": "Viêm Màng Ngoài Tim Cấp",
    "nameEn": "Acute Pericarditis",
    "category": "ischemia",
    "severity": "abnormal",
    "criteria": [
      "ST chênh lên dạng lõm lòng thuyền (concave upward) lan tỏa ở hầu hết các chuyển đạo (DI, DII, DIII, aVF, V2-V6)",
      "Đoạn PR chênh xuống (PR depression) lan tỏa do viêm nhĩ đi kèm (dấu hiệu rất đặc hiệu)",
      "Đoạn PR chênh lên và ST chênh xuống duy nhất ở chuyển đạo aVR (và đôi khi V1)",
      "KHÔNG CÓ hình ảnh ST soi gương ở các chuyển đạo khác (khác biệt mấu chốt so với STEMI)",
      "Dấu hiệu Spodick: Đoạn TP dốc xuống ở giai đoạn sớm"
    ],
    "annotations": [
      {
        "leadId": "DI",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên lõm lòng thuyền +1.8mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên cong lõm +2.5mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DIII",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên lõm lòng thuyền +1.5mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "aVF",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên +2.0mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V2",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên lõm +3.0mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V3",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên lõm +3.2mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V4",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên lõm +2.8mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V5",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên cong lõm lòng thuyền +2.5mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "V6",
        "waveComponent": "ST",
        "label": "▲ ST chênh lên lõm +2.0mm",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "ST",
        "label": "▲ Dải nhịp: ST chênh lên cong lõm lan tỏa",
        "targetCyclePhase": 0.31,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 0
      },
      {
        "leadId": "DI",
        "waveComponent": "PR",
        "label": "▼ PR chênh xuống lan tỏa",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "▼ PR chênh xuống (PR depression - Dấu hiệu viêm nhĩ)",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "aVF",
        "waveComponent": "PR",
        "label": "▼ PR chênh xuống ở aVF",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "V5",
        "waveComponent": "PR",
        "label": "▼ PR chênh xuống ở V5",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "▼ PR chênh xuống lan tỏa",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 1
      },
      {
        "leadId": "aVR",
        "waveComponent": "PR",
        "label": "▲ PR chênh lên & ▼ ST chênh xuống duy nhất ở aVR",
        "targetCyclePhase": 0.12,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "V1",
        "waveComponent": "PR",
        "label": "PR chênh lên nhẹ ở V1",
        "targetCyclePhase": 0.12,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 2
      },
      {
        "leadId": "DII",
        "waveComponent": "ST",
        "label": "Không có hình ảnh ST soi gương (Khác biệt với STEMI)",
        "targetCyclePhase": 0.35,
        "color": "#059669",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "DII",
        "waveComponent": "ST",
        "label": "Dấu hiệu Spodick: Đoạn TP dốc xuống giai đoạn sớm",
        "targetCyclePhase": 0.55,
        "color": "#7c3aed",
        "badgePlacement": "bottom",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "DII": "ST chênh lên lõm lòng thuyền 2.0mm, đoạn PR chênh xuống 0.8mm rõ rệt",
      "V5": "ST chênh lên dạng lõm 2.2mm, T dương",
      "V2": "ST chênh lên lõm 2.5mm",
      "aVR": "ST chênh xuống 1.2mm, đoạn PR chênh lên 0.8mm",
      "DI": "ST chênh lên lõm, PR chênh xuống"
    },
    "ecgMetrics": {
      "expected_hr": "75 - 100 bpm",
      "pr_interval": "140 - 180 ms",
      "qrs_duration": "80 - 95 ms",
      "qt_interval": "360 - 400 ms",
      "qrs_axis": "+60° (Bình thường)"
    },
    "clinicalAction": "Điều trị nội khoa bằng thuốc kháng viêm không steroid (NSAIDs liều cao: Ibuprofen 600mg x 3 lần/ngày) phối hợp Colchicine 0.5mg x 1-2 lần/ngày trong 3 tháng để chống tái phát. Siêu âm tim kiểm tra lượng dịch màng ngoài tim để loại trừ biến chứng Chèn ép tim cấp (Cardiac Tamponade).",
    "differentialDiagnoses": [
      "Nhồi máu cơ tim ST chênh lên (STEMI)",
      "Tái cực sớm lành tính",
      "Viêm cơ tim cấp"
    ]
  },
  "hypokalemia": {
    "id": "hypokalemia",
    "name": "Hạ Kali Máu Nặng (K+ < 2.5 mmol/L)",
    "nameEn": "Severe Hypokalemia (K+ < 2.5 mmol/L)",
    "category": "metabolic",
    "severity": "critical",
    "criteria": [
      "Sóng T dẹt, giảm biên độ hoặc đảo ngược thành sóng T âm",
      "Sóng U nổi bật xuất hiện ngay sau sóng T, biên độ sóng U > 1mm và có thể cao hơn sóng T ở V2, V3",
      "Đoạn ST chênh xuống nhẹ (thường từ 0.5 - 1.0mm)",
      "Khoảng QU kéo dài (thường bị nhầm lẫn là khoảng QT kéo dài)",
      "Nguy cơ cao khởi phát các loạn nhịp thất chết người: Ngoại tâm thu thất, Cơn nhanh thất và Xoắn đỉnh (Torsades de Pointes)"
    ],
    "annotations": [
      {
        "leadId": "V2",
        "waveComponent": "T",
        "label": "▼ Sóng T dẹt / đảo ngược thành T âm",
        "targetCyclePhase": 0.42,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V3",
        "waveComponent": "T",
        "label": "▼ Sóng T dẹt giảm biên độ",
        "targetCyclePhase": 0.42,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V4",
        "waveComponent": "T",
        "label": "▼ Sóng T dẹt thành trước",
        "targetCyclePhase": 0.42,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "DII",
        "waveComponent": "T",
        "label": "▼ Sóng T dẹt ở DII",
        "targetCyclePhase": 0.42,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V2",
        "waveComponent": "U",
        "label": "▲ Sóng U nổi bật > 1mm cao hơn sóng T",
        "targetCyclePhase": 0.58,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V3",
        "waveComponent": "U",
        "label": "▲ Sóng U khổng lồ xuất hiện sau sóng T",
        "targetCyclePhase": 0.58,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V4",
        "waveComponent": "U",
        "label": "▲ Sóng U nổi bật ở V4",
        "targetCyclePhase": 0.58,
        "color": "#d97706",
        "badgePlacement": "top",
        "criterionIndex": 1
      },
      {
        "leadId": "V4",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống nhẹ -0.8mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V5",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống -0.8mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V6",
        "waveComponent": "ST",
        "label": "▼ ST chênh xuống -0.6mm",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "DII",
        "waveComponent": "QT",
        "label": "↔ Khoảng QU kéo dài 520ms (Bao gồm sóng U)",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.7,
        "color": "#9333ea",
        "badgePlacement": "interval",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "QT",
        "label": "↔ Dải nhịp: QU kéo dài > 500ms",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.7,
        "color": "#9333ea",
        "badgePlacement": "interval",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "⚠️ Nguy cơ cao khởi phát Xoắn đỉnh (Torsades) & Rung thất",
        "targetCyclePhase": 0.2,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "V2": "Sóng T dẹt, sóng U dương cao 2.5mm vượt trội hơn sóng T",
      "V3": "Sóng U nổi rõ > 2mm, ST chênh xuống 1mm",
      "DII": "ST chênh xuống nhẹ, sóng T dẹt, sóng U đi kèm tạo cảm giác QT dài",
      "II": "Dải nhịp Lead II: Mô hình sóng U nổi rõ và khoảng QU kéo dài"
    },
    "ecgMetrics": {
      "expected_hr": "75 - 105 bpm",
      "pr_interval": "160 - 210 ms",
      "qrs_duration": "85 - 100 ms",
      "qt_interval": "QU interval > 500 ms",
      "qrs_axis": "+60° (Bình thường)"
    },
    "clinicalAction": "BÙ KALI KHẨN CẤP! (1) Bù Kali tĩnh mạch: Truyền Kali Clorid (KCl) qua đường truyền tĩnh mạch có máy tiêm điện/truyền dịch có kiểm soát tốc độ (tối đa 10-20 mmol/giờ qua ngoại vi, 40 mmol/giờ qua tĩnh mạch trung tâm); (2) BẮT BUỘC BÙ MAGNE ĐỒNG THỜI (Magne là đồng yếu tố của bơm Na+/K+ ATPase, nếu không bù Magne thì không thể bù được Kali); (3) Mắc monitor theo dõi liên tục đề phòng Xoắn đỉnh.",
    "differentialDiagnoses": [
      "Hội chứng QT dài (LQTS)",
      "Ngộ độc Digitalis",
      "Thiếu máu cơ tim dưới nội tâm mạc"
    ]
  },
  "digoxin_toxicity": {
    "id": "digoxin_toxicity",
    "name": "Nhiễm Độc Digitalis (Digoxin Toxicity)",
    "nameEn": "Digoxin Toxicity (Digitalis Effect & Dysrhythmias)",
    "category": "metabolic",
    "severity": "critical",
    "criteria": [
      "Dấu hiệu ngấm Digoxin kinh điển: ST chênh xuống cong lõm hình đáy chén / hình muỗng (Scooped ST depression / Dấu hiệu ria mép họa sĩ Salvador Dali)",
      "Khoảng QT ngắn lại (đặc điểm phân biệt với hạ kali máu)",
      "Sóng T dẹt, hai pha hoặc âm",
      "Loạn nhịp tim do ngộ độc Digoxin: Ngoại tâm thu thất dạng nhịp đôi (Ventricular Bigeminy) là dấu hiệu phổ biến nhất",
      "Block nhĩ thất các độ (Block AV độ I, II, III) kèm nhịp nhanh nhĩ hoặc nhịp bộ nối gia tốc"
    ],
    "annotations": [
      {
        "leadId": "DI",
        "waveComponent": "ST",
        "label": "▼ ST lõm hình muỗng / đáy chén",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "aVL",
        "waveComponent": "ST",
        "label": "▼ ST cong lõm đáy chén ở aVL",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V4",
        "waveComponent": "ST",
        "label": "▼ ST cong lõm đáy chén ở V4",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V5",
        "waveComponent": "ST",
        "label": "▼ Dấu hiệu ngấm Digoxin: ST cong lõm đáy chén (Ria mép Dali)",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V6",
        "waveComponent": "ST",
        "label": "▼ ST cong lõm hình muỗng ở V6",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "II",
        "waveComponent": "ST",
        "label": "▼ ST đáy chén kinh điển",
        "targetCyclePhase": 0.32,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 0
      },
      {
        "leadId": "V5",
        "waveComponent": "QT",
        "label": "↔ Khoảng QT ngắn lại (320ms)",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.5,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 1
      },
      {
        "leadId": "II",
        "waveComponent": "QT",
        "label": "↔ Dải nhịp: QT ngắn lại (Phân biệt với hạ Kali)",
        "targetCyclePhase": 0.2,
        "intervalEndPhase": 0.5,
        "color": "#059669",
        "badgePlacement": "interval",
        "criterionIndex": 1
      },
      {
        "leadId": "V4",
        "waveComponent": "T",
        "label": "▼ Sóng T dẹt hai pha",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V5",
        "waveComponent": "T",
        "label": "▼ Sóng T hai pha ở V5",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "V6",
        "waveComponent": "T",
        "label": "▼ Sóng T dẹt ở V6",
        "targetCyclePhase": 0.44,
        "color": "#2563eb",
        "badgePlacement": "bottom",
        "criterionIndex": 2
      },
      {
        "leadId": "DII",
        "waveComponent": "RR",
        "label": "Loạn nhịp ngộ độc Digoxin: PVC dạng nhịp đôi (Bigeminy)",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "II",
        "waveComponent": "RR",
        "label": "PVC dạng nhịp đôi phổ biến nhất",
        "targetCyclePhase": 0.25,
        "color": "#e11d48",
        "badgePlacement": "top",
        "criterionIndex": 3
      },
      {
        "leadId": "DII",
        "waveComponent": "PR",
        "label": "Block AV các độ kèm nhịp nhanh nhĩ",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 4
      },
      {
        "leadId": "II",
        "waveComponent": "PR",
        "label": "Block AV nhĩ thất",
        "targetCyclePhase": 0.12,
        "intervalEndPhase": 0.28,
        "color": "#d97706",
        "badgePlacement": "interval",
        "criterionIndex": 4
      }
    ],
    "leadManifestations": {
      "V5": "ST chênh xuống lõm hình muỗng Salvador Dali 2.0mm, QT ngắn",
      "V6": "ST cong lõm hình đáy chén kinh điển",
      "DII": "ST cong lõm, kèm ngoại tâm thu thất nhịp đôi (Bigeminy)",
      "aVL": "ST cong lõm"
    },
    "ecgMetrics": {
      "expected_hr": "50 - 110 bpm (Tùy loạn nhịp)",
      "pr_interval": "200 - 240 ms (PR dài)",
      "qrs_duration": "85 - 105 ms",
      "qt_interval": "300 - 340 ms (QT ngắn)",
      "qrs_axis": "+45° (Bình thường)"
    },
    "clinicalAction": "CẤP CỨU NGỘ ĐỘC THUỐC TIM MẠCH! (1) NGƯNG NGAY DIGOXIN; (2) DÙNG THUỐC GIẢI ĐỘC ĐẶC HIỆU: Kháng thể kháng Digoxin đặc hiệu (Digoxin-specific Fab fragments - DigiFab); (3) Kiểm tra và điều chỉnh Kali máu (duy trì K+ 4.0 - 5.0 mmol/L) và Magne máu; (4) Nếu có nhịp chậm/Block AV: Atropin hoặc đặt máy tạo nhịp tạm thời; (5) Nếu có loạn nhịp thất: Dùng Lidocaine hoặc Phenytoin (TRÁNH dùng sốc điện chuyển nhịp vì gây rung thất trơ).",
    "differentialDiagnoses": [
      "Hạ Kali máu",
      "Thiếu máu cơ tim dưới nội tâm mạc",
      "Tăng gánh thất trái"
    ]
  }
};
