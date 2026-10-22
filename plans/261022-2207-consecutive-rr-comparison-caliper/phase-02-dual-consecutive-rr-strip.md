# Phase 02: Dual-Segment Consecutive RR Caliper Engine

Status: ⬜ Pending
Dependencies: Phase 01

## Objective
Hiện thực hóa yêu cầu của Bác sĩ: *"đường so sánh phải nối 2 đoạn 2 R liên tục để đưa ra so sánh"*.

## Architectural Design
1. **Mô hình Thước Đo Kép 3 Mốc (Dual-Segment Caliper)**:
   - Thay vì vẽ các thước kẹp đơn lẻ hoặc bị đè lên nhau, hệ thống thiết lập một kết cấu đo gồm 3 điểm mốc liên tiếp:
     - Mốc 1: $R_1$ (tại chu kỳ $k$)
     - Mốc 2: $R_2$ (tại chu kỳ $k+1$)
     - Mốc 3: $R_3$ (tại chu kỳ $k+2$)
   - Cả 3 mốc đều được dóng bằng đường nét đứt (dashed lines) từ đỉnh sóng thực tế lên thanh đo ngang chung.
   - Điểm $R_2$ đóng vai trò là **khớp nối liên tục (Shared Junction)** nối giữa Đoạn 1 ($R_1 \rightarrow R_2$) và Đoạn 2 ($R_2 \rightarrow R_3$).

2. **Dữ liệu Đo Lường Đối Chiếu**:
   - Khoảng 1 ($R_1 \rightarrow R_2$): Đoạn đo $R\text{-}R_1 = \Delta t_1 = 923\text{ms}$ ($4.6$ ô lớn).
   - Khoảng 2 ($R_2 \rightarrow R_3$): Đoạn đo $R\text{-}R_2 = \Delta t_2 = 923\text{ms}$ ($4.6$ ô lớn).
   - Độ chênh lệch: $\Delta RR = |\Delta t_1 - \Delta t_2| = 0\text{ms}$.
   - Kết luận tiêu chuẩn: *"Nhịp đều: R-R₁ = R-R₂ = 923ms (Δ = 0ms)"*.

3. **Sửa lỗi đè nhãn trong `ecgAnnotationsData.ts`**:
   - Khi có sẵn nhãn tĩnh trong `COMPREHENSIVE_FALLBACK_ANNOTATIONS`, cần phân định rõ ràng nhãn 1 (chu kỳ $k$) và nhãn 2 (chu kỳ $k+1$) hoặc tái tạo thước đo kép chuyên dụng khi `isRrActive = true`.

## Test Criteria
- [ ] Dải nhịp Lead II kéo dài xuất hiện rõ ràng 2 khoảng đo $R_1 \rightarrow R_2$ và $R_2 \rightarrow R_3$.
- [ ] Điểm $R_2$ là điểm chung nối liền 2 đoạn, không bị đứt đoạn hay ngắt quãng.
- [ ] Hiển thị đầy đủ số đo của cả 2 đoạn để người dùng so sánh trực quan.
