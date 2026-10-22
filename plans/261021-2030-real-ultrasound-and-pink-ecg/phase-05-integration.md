# Phase 05: Verification, Export/Print & Testing

Status: ⬜ Pending
Dependencies: Phase 01, Phase 02, Phase 03, Phase 04

## Objective
Kiểm thử toàn diện, viết test tự động cho bộ xuất giấy điện tim màu hồng và truy xuất ảnh siêu âm thật từ SQLite, xác thực tính năng in ấn / tải file ảnh giấy điện tim, và nghiệm thu sản phẩm cuối cùng.

## Requirements

### Functional
- [ ] Viết Unit Test:
  - Kiểm tra thuật toán render lưới hồng 1mm/5mm và tọa độ sóng 12 đạo trình.
  - Kiểm tra tính toán các chỉ số PR, QRS, QTc Bazett trên giấy in.
  - Kiểm tra tính toàn vẹn của bảng `ultrasound_atlas` trong SQLite (10 chương, 49 topics, 319+ ảnh được map đầy đủ).
- [ ] Kiểm thử E2E:
  - Mở trang mô phỏng ECG `/simulators/ecg` $\rightarrow$ Chuyển sang Giấy hồng 12 đạo trình $\rightarrow$ Thử in và tải ảnh.
  - Mở trang mô phỏng Siêu âm `/simulators/ultrasound` $\rightarrow$ Chuyển sang xem ảnh thật $\rightarrow$ Chọn 9 chương cơ quan $\rightarrow$ Phóng to ảnh thật.
  - Mở ca bệnh cấp cứu `/treatment/case-inferior-stemi-rv` $\rightarrow$ Bấm mở ECG 12 CĐ $\rightarrow$ Thấy tờ giấy in màu hồng mang tên bệnh nhân Nguyễn Văn Hải.
- [ ] Chạy `npm run build` xác thực 100% production build không lỗi.

## Implementation Steps
1. [ ] Viết test file `tests/pink_ecg_and_ultrasound.test.js`.
2. [ ] Chạy `npm test`.
3. [ ] Chạy `npm run build`.
4. [ ] Viết báo cáo nghiệm thu vào `plans/261021-2030-real-ultrasound-and-pink-ecg/reports/test-report.md`.

## Files to Create/Modify
- `tests/pink_ecg_and_ultrasound.test.js`
- `plans/261021-2030-real-ultrasound-and-pink-ecg/reports/test-report.md`
- `project_progress.json`
- `.brain/session.json`

---
Tất cả các Phase đã được thiết lập sẵn sàng.
