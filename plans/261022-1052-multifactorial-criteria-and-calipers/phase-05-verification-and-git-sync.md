# Phase 05: Kiểm Thử Tự Động, Verify Hiển Thị & Git Sync

Status: ⬜ Pending
Dependencies: Phase 01, Phase 02, Phase 03, Phase 04

## 1. Kịch Bản Kiểm Thử Tự Động (`tests/calipers_and_multifactorial_criteria.test.js`)

1. **Kiểm tra nút Bật/Tắt khối tiêu chuẩn**:
   - `RealisticPinkEcgPaper` có nút toggle `[📋 Tiêu Chuẩn Chẩn Đoán]` và quản lý state `showCriteriaBlock`.
   - Thu gọn / mở rộng không làm gián đoạn canvas animation loop.
2. **Kiểm tra thước đo khoảng R-R Caliper**:
   - Caliper nối từ đỉnh R1 sang R2, tính đúng thời gian ms và số ô lớn theo công thức $N = \Delta t / 200$.
   - Khi thay đổi BPM slider, thời gian caliper tự động tính lại tức thì.
3. **Kiểm tra thước đo biên độ ST & sóng T**:
   - Thước đo chiều dọc đo khoảng cách từ đường đẳng điện baseline (midY) đến J-point/ST.
   - Thể hiện đúng milimet ($10\text{ mm} = 1\text{ mV}$) và mili-volt.
4. **Kiểm tra độ phủ 100% tiêu chuẩn & ánh xạ đa yếu tố**:
   - Chạy script kiểm tra toàn bộ 139 tiêu chuẩn: **0 tiêu chuẩn mồ côi** (`zeroLeadCriteria === 0`).
   - Tiêu chuẩn "P âm aVR, dương DI, DII, aVF" phủ đủ DI, DII, aVF, aVR.
   - Tiêu chuẩn Sokolow-Lyon phủ V1 và V5.
   - Tiêu chuẩn S1Q3T3 phủ DI và DIII.
   - Tiêu chuẩn Viêm màng ngoài tim phủ 9 chuyển đạo.
5. **Kiểm tra TypeScript & Next.js Build**:
   - `npx tsc --noEmit` đạt 0 lỗi.
   - `npm test` đạt 100% pass (Green).

---

## 2. Đồng Bộ Hóa GitHub
- Commit các thay đổi với thông điệp rõ ràng theo chuẩn Trinity Protocol.
- Push trực tiếp lên nhánh `main` của repository [drducqy95/Medsimu](https://github.com/drducqy95/Medsimu).
