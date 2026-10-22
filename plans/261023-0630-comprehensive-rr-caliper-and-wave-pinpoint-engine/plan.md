# Plan: Milestone M19 - Comprehensive Wave Extremum Pinpoint & Consecutive RR Caliper Synchronization Across All 12 Leads

Created: 2026-10-23T06:30:00+07:00
Status: 🟡 In Progress (Awaiting User Approval)

## Overview & Clinical Objectives
Rà soát toàn diện và chuẩn hóa triệt để thuật toán **đặt điểm sóng (Pinpoint Dots)** và **đánh dấu khoảng R-R (Consecutive RR Calipers)** trên tất cả 12 chuyển đạo và dải nhịp:
1. **Điểm đặt sóng (Pinpoint Dots) tại đỉnh sóng R**:
   - Khắc phục hiện tượng đường gióng cắm vào sườn dốc hoặc lệch khỏi đỉnh sóng do mốc tĩnh `anchors.rPeak` không scale theo BPM (`mu = 0.22 * (cycleDuration / 0.8)`).
   - Tự động mở rộng cửa sổ dò cực trị động `snapToWaveExtremum` lên $\pm 80\text{ms}$ với bước quét siêu mịn $0.5\text{ms}$.
   - Tự động nhận diện cực trị ưu thế theo hình thái QRS thực tế của từng chuyển đạo (tìm `max` cho sóng dương, tìm `min` cho sóng âm như aVR, V1, trục lệch).
   - **Vẽ chấm tròn Target Pinpoint Dot** trực tiếp tại chóp đỉnh sóng R ($R_1, R_2, R_3...$) với tâm trắng viền màu sắc, đường gióng nét đứt cắm chính xác 100% vào đỉnh nhọn của sóng.
2. **Đánh dấu khoảng R-R trên các đạo trình (12 Chuyển Đạo & Dải Nhịp)**:
   - Khắc phục hiện tượng thước $R-R_1$ và $R-R_2$ bị đè lên nhau hoặc chỉ hiện 1 thước đơn trên 12 chuyển đạo.
   - Trên mọi chuyển đạo có $\ge 3$ đỉnh R nhìn thấy: tự động dựng chuỗi 2 khoảng liên tiếp $R_1 \rightarrow R_2$ và $R_2 \rightarrow R_3$ nối liền mạch tại đỉnh $R_2$, chứng minh nhịp đều $R-R_1 = R-R_2$.
   - Trên các ô chuyển đạo có 2 đỉnh R: dựng thước $R_1 \rightarrow R_2$ chuẩn xác từ đỉnh tới đỉnh.
3. **Chuẩn hóa toán học Wenckebach (Mobitz I) cho khoảng R-R ngắn dần trước nhát rớt**:
   - Hiệu chỉnh gia số PR trong `ecgWaveforms.ts` theo đúng sinh lý Wenckebach (gia số tăng PR giảm dần):
     $PR_0 = 160\text{ms} \rightarrow PR_1 = 280\text{ms} (+120\text{ms}) \rightarrow PR_2 = 320\text{ms} (+40\text{ms})$.
   - Tạo ra 2 khoảng R-R trước nhát rớt thực sự ngắn dần trên đồ thị: $R-R_1 = 970\text{ms} > R-R_2 = 890\text{ms}$.
   - Thước đo và badge đối chiếu ăn khớp hoàn toàn với sóng điện tim thực tế.

---

## Tech Stack & Affected Modules
- **Frontend Canvas Engine**: `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx`
- **12-Lead Morphological Waveforms**: `src/domain/simulators/ecgWaveforms.ts`
- **ECG Metrics & Dynamic Wave Anchors**: `src/domain/simulators/ecgMetricsCalculator.ts`
- **Static Databases**: `src/domain/simulators/ecgStaticDatabase.ts`, `src/domain/simulators/ecgAnnotationsData.ts`
- **Unit Testing Suite**: `tests/consecutive_rr_multilead_precision.test.js`

---

## Phases Breakdown

| Phase | Name | Description | Status |
|-------|------|-------------|--------|
| **01** | **Exact Wave Extremum & Visual Pinpoint Dots** | Tự động thích ứng mốc dò sóng theo BPM, mở rộng cửa sổ quét, vẽ chấm tròn pinpoint trực tiếp tại đỉnh sóng R trên mọi chuyển đạo. | ⬜ Pending |
| **02** | **Consecutive RR Calipers on All 12 Leads** | Rà soát và triển khai thước kép 2 đoạn liên tiếp $R_1 \rightarrow R_2 \rightarrow R_3$ nối liền tại đỉnh $R_2$ trên tất cả các đạo trình khi đủ nhát bóp. | ⬜ Pending |
| **03** | **Wenckebach Mathematical RR Shortening** | Chuẩn hóa gia số PR giảm dần trong `ecgWaveforms.ts` để khoảng $R-R_1 (970\text{ms}) > R-R_2 (890\text{ms})$, đồng bộ tuyệt đối giữa đồ thị và thước kẹp. | ⬜ Pending |
| **04** | **Automated Multi-Lead Verification & Testing** | Viết suite test `tests/consecutive_rr_multilead_precision.test.js`, chạy 57+ tests pass 100%, verify type check và build Next.js. | ⬜ Pending |

---

## Quick Reference Commands
- Duyệt kế hoạch: Gõ `ok` hoặc `/trinity-code` để thực thi.
- Xem tiến độ: `/trinity-next`
- Lưu bộ nhớ dài hạn: `/trinity-save-brain`
