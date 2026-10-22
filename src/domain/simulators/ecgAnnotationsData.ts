export interface EcgAnnotationItem {
  leadId: string;
  waveComponent: string;
  label: string;
  targetCyclePhase: number;
  intervalEndPhase?: number;
  color?: string;
  badgePlacement?: "top" | "bottom" | "interval" | "above" | "below";
  criterionIndex?: number;
}

export const COMPREHENSIVE_FALLBACK_ANNOTATIONS: Record<string, EcgAnnotationItem[]> = {
  "stemi_inferior": [
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
  "stemi_anterior": [
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
  "av_block_first_degree": [
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
  "av_block_mobitz_1": [
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
  "av_block_mobitz_2": [
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
  "av_block_third_degree": [
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
  "atrial_fibrillation": [
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
  "atrial_flutter": [
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
  "svt": [
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
  "pvc_frequent": [
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
  "ventricular_tachycardia": [
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
  "ventricular_fibrillation": [
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
  "asystole": [
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
  "hyperkalemia": [
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
  "normal_sinus": [
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
  "sinus_bradycardia": [
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
  "sinus_tachycardia": [
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
  "stemi_lateral": [
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
  "stemi_posterior": [
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
  "nemi_subendocardial": [
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
  "rbbb": [
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
  "lbbb": [
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
  "lafb": [
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
  "wpw_syndrome": [
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
  "torsades_de_pointes": [
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
  "lvh_strain": [
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
  "brugada_type1": [
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
  "pulmonary_embolism": [
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
  "acute_pericarditis": [
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
  "hypokalemia": [
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
  "digoxin_toxicity": [
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
  ]
};
