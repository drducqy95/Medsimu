# Plan: Milestone M18 - Wenckebach (Mobitz I) Precision Criteria Mapping & Multi-Lead Vector Engine

Created: 2026-10-23T05:54:00+07:00
Status: 🟢 Completed (100% Verified)

## Overview
Rà soát và hoàn thiện triệt để thuật toán ánh xạ tiêu chuẩn chẩn đoán cho ca bệnh **Block Nhĩ Thất Độ II Kiểu Mobitz I (Wenckebach Periodicity)** dựa trên 4 ảnh chụp thực tế lúc 05:48:
1. **Tiêu chuẩn 1 ("PR dài dần ra qua từng chu kỳ liên tiếp")**: Dựng chuỗi 3 thước kẹp PR tăng dần thực tế qua 3 nhát bóp ($PR_1 = 160\text{ms} \rightarrow PR_2 = 240\text{ms} \rightarrow PR_3 = 320\text{ms}$), kèm badge đối chiếu tổng hợp `[✓ PR dài dần: 160ms → 240ms → 320ms]`.
2. **Tiêu chuẩn 2 ("Sóng P hoàn toàn không dẫn được - rớt một QRS")**: Sửa bộ lọc `isPActive` và `isAnnotationMatchingCriterion`, loại trừ triệt để các nhãn trục P ("P xoang...", "P dương...", "P âm..."), triệt tiêu 100% hiện tượng đè 3 nhãn lên nhau, chỉ ghim duy nhất nhãn `❌ Sóng P không dẫn (Rớt phức bộ QRS)` tại nhát thứ 4 ($t = 2.61\text{s}$).
3. **Tiêu chuẩn 3 ("Sau nhát rớt, chu kỳ lặp lại với khoảng PR ngắn nhất")**: Định vị chính xác vào nhát bóp phục hồi sau nhát rớt (Beat 0 của chu kỳ mới tại $t = 3.46\text{s} \rightarrow 3.62\text{s}$), đo thước kẹp $PR = 160\text{ms}$ (ngắn nhất), đi kèm badge `[✓ Chu kỳ mới: PR hồi phục 160ms]`.
4. **Tiêu chuẩn 4 ("Khoảng R-R ngắn dần trước nhát rớt; QRS hẹp")**: Sửa badge so sánh; thay vì hiển thị sai lệch `✓ Đều đặn` trên một bệnh lý loạn nhịp, hệ thống hiển thị đúng bản chất lâm sàng `[✓ R-R ngắn dần trước nhát rớt: 1079ms → 921ms (QRS hẹp 88ms)]`.
5. **Chiếu vector giải phẫu 12 chuyển đạo cho Mobitz I**: aVR luôn âm toàn diện ($rAmp = -1.30$, $pAmp = -0.14$), V1 dạng $rS$, triệt tiêu việc sóng dương $+1.55\text{mV}$ trên toàn bộ 12 chuyển đạo.

---

## Tech Stack & Affected Modules
- **Frontend Canvas Engine**: `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx`
- **12-Lead Morphological Waveforms**: `src/domain/simulators/ecgWaveforms.ts`
- **ECG Metrics & Dynamic Wenckebach Anchors**: `src/domain/simulators/ecgMetricsCalculator.ts`
- **Static & Fallback Annotations**: `src/domain/simulators/ecgStaticDatabase.ts`, `src/domain/simulators/ecgAnnotationsData.ts`
- **Unit Testing Suite**: `tests/wenckebach_criteria_mapping.test.js`

---

## Phases Breakdown

| Phase | Name | Description | Status |
|-------|------|-------------|--------|
| **01** | **Dynamic Wenckebach PR Progression Engine** | Hiển thị chuỗi thước đo PR tăng dần qua 3 chu kỳ ($160\text{ms} \rightarrow 240\text{ms} \rightarrow 320\text{ms}$) cho Tiêu chuẩn 1 và bắt dính nhát PR ngắn nhất ($160\text{ms}$) sau nhát rớt cho Tiêu chuẩn 3. | 🟢 Completed |
| **02** | **Semantic Isolation & Elimination of P Stacking** | Sửa `isPActive`, ngăn chặn nhãn trục P lạc đề; ghim chính xác sóng P không dẫn duy nhất cho Tiêu chuẩn 2, triệt tiêu 100% lỗi đè 3 nhãn. | 🟢 Completed |
| **03** | **Progressive RR Shortening & Adaptive Badge** | Tùy biến badge so sánh cho nhịp không đều Mobitz I: hiển thị `[✓ R-R ngắn dần trước nhát rớt: R-R₁ > R-R₂]` thay vì nhãn sai `✓ Đều đặn`. | 🟢 Completed |
| **04** | **12-Lead Vector Projection & Automated Verification** | Bổ sung vector giải phẫu Mobitz I (aVR âm, V1 rS), viết suite test `tests/wenckebach_criteria_mapping.test.js`, kiểm thử 56/56 pass và build Next.js. | 🟢 Completed |

---

## Quick Commands
- Start Implementation: `/code`
- Check Status: `/next`
- Memory Save: `/save-brain`
