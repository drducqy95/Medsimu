# Phase 01: Khôi Phục Nút Bật/Tắt Hiển Thị Tiêu Chuẩn Trên Giấy Hồng

## 1. Mục Tiêu & Vấn Đề
- **Vấn đề**: Việc in cố định khối tiêu chuẩn chẩn đoán có thể chiếm diện tích dải giấy khi Bác sĩ muốn quan sát toàn bộ sóng một cách tuyệt đối thông thoáng.
- **Mục tiêu**:
  - Bổ sung state `showCriteriaBlock` (mặc định: `false` trên mobile hoặc cho phép người dùng tùy ý bật/tắt).
  - Thêm nút bấm chuyên dụng:
    `[📋 Tiêu Chuẩn Chẩn Đoán (AHA/ESC) ▼]` khi đang ẩn.
    `[📋 Thu Gọn Tiêu Chuẩn ▲]` khi đang mở.
  - Vị trí đặt: Đặt ngay trên dải tiêu đề thông tin hành chính của giấy in điện tim (`RealisticPinkEcgPaper.tsx`).

---

## 2. Trải Nghiệm Tương Tác
- Khi **Ẩn** (`showCriteriaBlock === false`):
  - Dải giấy in chỉ hiển thị 2 dòng: Thông tin hành chính bệnh nhân + Dòng kết luận tóm tắt 1 dòng.
  - Chiều cao dải giấy được tối ưu tuyệt đối, dành 100% không gian cho 12 đạo trình điện tim.
- Khi **Mở** (`showCriteriaBlock === true`):
  - Khối tiêu chuẩn bung ra mượt mà ngay trên giấy in.
  - Từng dòng tiêu chuẩn hiển thị kèm ô chọn `[  ]` hoặc `[✓]`.
  - Bác sĩ click vào từng dòng để kích hoạt thước đo calipers và biên độ trên dải sóng.

---

## 3. Tiêu Chuẩn Nghiệm Thu
- [ ] Có nút bấm bật/tắt rõ ràng trên dải header giấy in.
- [ ] Chuyển đổi trạng thái đóng/mở mượt mà, không làm giật lag vòng lặp vẽ sóng 60 FPS.
