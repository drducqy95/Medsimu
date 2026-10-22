# Phase 04: Kiểm Thử Tự Động, Đánh Giá Y Khoa & Git Push

## 1. Kịch Bản Kiểm Thử Tự Động (`tests/ecg_paper_criteria_and_bpm_bounds.test.js`)
1. **Kiểm tra giới hạn tần số tim sinh lý (BPM Range Bounds)**:
   - Toàn bộ 31 bệnh lý đều có trường `allowedBpmRange` với `min <= defaultBpm <= max`.
   - `sinus_tachycardia.allowedBpmRange.min >= 100` (nhịp nhanh không được < 100 bpm).
   - `sinus_bradycardia.allowedBpmRange.max <= 60` (nhịp chậm không được > 60 bpm).
   - `av_block_third_degree.allowedBpmRange.max <= 50` (nhịp thoát thất luôn chậm).
   - `asystole` và `ventricular_fibrillation` có BPM = 0.
2. **Kiểm tra in tiêu chuẩn trực tiếp trên giấy hồng & mặc định không ánh xạ**:
   - `RealisticPinkEcgPaper` render khối tiêu chuẩn chẩn đoán trực tiếp bên trong vùng giấy hồng.
   - **Xác thực trạng thái mặc định: không có bất kỳ nhãn ánh xạ nào hiển thị trên đường sóng khi vừa tải bệnh**.
   - Mỗi tiêu chuẩn có thể click để bật ánh xạ tương ứng trên sóng; click lại sẽ tắt đi.
3. **Kiểm tra Dropdown List chọn bệnh lý**:
   - Có component `EcgPathologySelectDropdown` hỗ trợ 9 phân hệ lâm sàng.
   - Khi đổi giá trị dropdown, cập nhật đúng bệnh lý.
4. **Kiểm tra xóa bỏ các block thừa**:
   - Không còn các panel lơ lửng bên ngoài giấy in gây rối mắt.

---

## 2. Quy Trình Xác Minh & Đồng Bộ Git
- Chạy `npx tsc --noEmit` xác nhận 0 lỗi TypeScript.
- Chạy `npm test` xác nhận 100% tests pass.
- Commit theo chuẩn Trinity và push lên GitHub [drducqy95/Medsimu](https://github.com/drducqy95/Medsimu).
