# Phase 05: Kiểm Thử Tự Động, Đánh Giá Hiển Thị & Git Sync

## 1. Kịch Bản Kiểm Thử Tự Động (`tests/calipers_and_criteria_toggle.test.js`)
1. **Kiểm tra nút Bật/Tắt khối tiêu chuẩn**:
   - `RealisticPinkEcgPaper` có nút toggle `[📋 Tiêu Chuẩn Chẩn Đoán]` và quản lý state `showCriteriaBlock`.
2. **Kiểm tra thước đo khoảng R-R**:
   - Kiểm tra thuật toán caliper R-R nối từ đỉnh R1 sang R2, tính đúng thời gian ms và số ô.
3. **Kiểm tra thước đo biên độ ST & sóng T**:
   - Kiểm tra thước đo chiều dọc từ baseline đến J-point/ST, thể hiện đúng số đo milimet và mili-volt.
4. **Kiểm tra độ phủ 100% tiêu chuẩn trên đầy đủ các dãy chuyển đạo**:
   - 0 tiêu chuẩn mồ côi trên 31 bệnh lý.
   - Các tiêu chuẩn vùng (thành dưới, thành trước, block nhánh) phủ đủ các chuyển đạo liên quan.
5. **Kiểm tra TypeScript & Next.js Build**:
   - `npx tsc --noEmit` đạt 0 lỗi.
   - `npm test` đạt 100% pass (Green).

---

## 2. Hoàn Tất & Đẩy Lên GitHub
- Commit các thay đổi với thông điệp rõ ràng theo chuẩn Trinity Protocol.
- Push trực tiếp lên nhánh `main` của repository [drducqy95/Medsimu](https://github.com/drducqy95/Medsimu).
