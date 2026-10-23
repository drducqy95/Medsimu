# Phase 04: Xây Dựng Test Suite Tự Động & Xác Thực Hệ Thống

## 1. Mục tiêu
Viết test suite tự động chuyên sâu `tests/physical_wave_peak_caliper.test.js` để kiểm thử thuật toán dò đỉnh vật lý, độ chính xác của các mốc đo trên 12 chuyển đạo, và chạy toàn bộ test suite dự án bảo đảm không có hồi quy.

## 2. Các Ca Kiểm Thử (Test Cases)
1. **Test Case 1: Lấy mẫu đỉnh vật lý trên Mobitz I (Wenckebach) ở 60 bpm:**
   - Cột 0 ($0 - 2.5\,\text{s}$): Tìm thấy chính xác 3 đỉnh tại $0.220\,\text{s}$, $1.190\,\text{s}$, $2.080\,\text{s}$.
   - Đoạn $R_0 \rightarrow R_1 = 970\,\text{ms}$, đoạn $R_1 \rightarrow R_2 = 890\,\text{ms}$.
   - Khẳng định $R-R_1 > R-R_2$ (ngắn dần trước nhát rớt).
2. **Test Case 2: Kiểm tra chuyển đạo âm aVR:**
   - Cực tiểu âm nhọn sâu $\le -1.0\,\text{mV}$ tại $0.220\,\text{s}$, $1.190\,\text{s}$, $2.080\,\text{s}$.
   - Không xuất hiện sai lệch tọa độ đo.
3. **Test Case 3: Kiểm tra chuyển đạo có nhát rớt (Cột 2 V1-V3):**
   - Khoảng cách giữa 2 đỉnh liên tiếp đo được chính xác $1540\,\text{ms}$ (thay vì $1000\,\text{ms}$).
4. **Test Case 4: Kiểm tra không đè lấn badge kết luận:**
   - Độ cao của badge cách thanh thước kẹp tối thiểu $22\,\text{px}$, khoảng cách biên an toàn $\ge 4\,\text{px}$.
5. **Test Case 5: Hồi quy toàn bộ hệ thống:**
   - Chạy `npm test` đạt $100\%$ (64+ tests pass).
   - Chạy `npx tsc --noEmit` đạt 0 lỗi.
   - Chạy `npm run build` xuất bản thành công.
