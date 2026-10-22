# Plan: Milestone M17 - Dual-Segment Consecutive RR Comparison Caliper Engine & Precision Wave Snapping

Created: 2026-10-22T22:08:00+07:00
Status: ✅ Complete

## Overview
Giải quyết dứt điểm 2 vấn đề trọng tâm được Bác sĩ phản ánh:
1. **Khắc phục hiện tượng lệch đỉnh sóng ("Vẫn đang lệch")**: Căn chỉnh mốc `anchors.rPeak` trùng khớp 100% với hàm Gauss thực tế, đồng thời kích hoạt thuật toán **Dynamic Wave Snapping Engine** (`snapToWaveExtremum`) cho toàn bộ các mốc đo RR Interval trên từng chuyển đạo (bắt đúng điểm cực đại/cực tiểu trên từng vector).
2. **Thiết kế Thước Đo So Sánh Nhịp Kép Liên Tục ("Đường so sánh phải nối 2 đoạn 2 R liên tục để đưa ra so sánh")**:
   - Khi kích hoạt tiêu chuẩn Nhịp tim đều đặn, trên dải nhịp (và các chuyển đạo đủ độ rộng) hiển thị **đường thước kẹp 3 mốc dóng liên tục**:
     $$R_1 \xrightarrow{R\text{-}R_1 = 923\text{ms}} R_2 \xrightarrow{R\text{-}R_2 = 923\text{ms}} R_3$$
   - Điểm đỉnh $R_2$ là điểm chốt chung (shared junction), dóng thẳng lên thanh đo.
   - Hiển thị song song 2 đoạn $R\text{-}R_1$ và $R\text{-}R_2$ kề cận nhau, đối chiếu trực tiếp độ dài $\Delta RR = 0\text{ms} \rightarrow$ chứng minh nhịp đều đặn $65\text{ bpm}$ theo đúng chuẩn compas đo ECG lâm sàng.

---

## Tech Stack & Affected Modules
- **Frontend Canvas Engine**: `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx`
- **ECG Metrics & Wave Anchors**: `src/domain/simulators/ecgMetricsCalculator.ts`
- **Fallback Pathology Annotations**: `src/domain/simulators/ecgAnnotationsData.ts`
- **Unit Testing Suite**: `tests/consecutive_rr_comparison_caliper.test.js`

---

## Phases Breakdown

| Phase | Name | Description | Status |
|-------|------|-------------|--------|
| **01** | **Precision Wave Snapping for RR Calipers** | Đồng bộ `anchors.rPeak` và áp dụng `snapToWaveExtremum` cho mọi mốc đo $t_1, t_2$ của thước kẹp RR, triệt tiêu 100% lỗi lệch đỉnh sóng. | ✅ Complete |
| **02** | **Dual-Segment Consecutive RR Caliper Engine** | Thiết kế thanh thước đo so sánh kép 3 mốc ($R_1 \rightarrow R_2 \rightarrow R_3$) trên dải nhịp Lead II kéo dài, nối tiếp liền mạch tại đỉnh $R_2$. | ✅ Complete |
| **03** | **Anti-Collision Layout & Multi-Lead Support** | Tinh gọn nhãn hiển thị tránh đè chữ ($R\text{-}R_1$ bên trái, $R\text{-}R_2$ bên phải, badge đối chiếu đều $\Delta = 0\text{ms}$), hỗ trợ vẽ thước kép trên các ô chuyển đạo khi đủ 3 nhát bóp. | ✅ Complete |
| **04** | **Verification, Visual Testing & Git Sync** | Viết suite kiểm thử tự động, kiểm tra trên canvas, xác nhận type-check, build production và đẩy lên GitHub. | ✅ Complete |

---

## Quick Commands
- Start Implementation: `/code`
- Check Status: `/next`
- Memory Save: `/save-brain`
