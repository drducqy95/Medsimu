# Phase 01: Nút Bật/Tắt Hiển Thị Khối Tiêu Chuẩn Trên Giấy Hồng

Status: ⬜ Pending
Dependencies: None

## 1. Mục Tiêu & Vấn Đề
- **Vấn đề**: Hiện nay khối tiêu chuẩn chẩn đoán in trực tiếp trên giấy in cố định chiếm diện tích dải giấy khi bác sĩ muốn nhìn tổng thể 12 đạo trình điện tim mà không bị cản trở tầm nhìn.
- **Mục tiêu**:
  - Bổ sung state `showCriteriaBlock` (mặc định: `false` trên mobile hoặc đóng gọn, cho phép mở rộng nhanh).
  - Bổ sung nút bấm chuyên dụng:
    `[📋 Tiêu Chuẩn AHA/ESC ▼]` khi đang ẩn.
    `[📋 Thu Gọn Tiêu Chuẩn ▲]` khi đang mở.
  - Vị trí: Đặt ngay trên dải tiêu đề thông tin hành chính của giấy in điện tim (`RealisticPinkEcgPaper.tsx`).

---

## 2. Trải Nghiệm Tương Tác
- Khi **Ẩn** (`showCriteriaBlock === false`):
  - Dải giấy in chỉ hiển thị 2 dòng: Thông tin hành chính bệnh nhân + Dòng kết luận tóm tắt 1 dòng + nút bấm mở tiêu chuẩn.
  - Dành 100% không gian cho 12 đạo trình điện tim và dải nhịp Lead II.
- Khi **Mở** (`showCriteriaBlock === true`):
  - Khối tiêu chuẩn bung ra mượt mà ngay trên giấy in.
  - Từng dòng tiêu chuẩn hiển thị kèm ô chọn `[  ]` hoặc `[✓]`.
  - Bác sĩ click vào từng dòng để kích hoạt thước đo calipers và biên độ trên dải sóng.
  - Có nút "Tắt hết ánh xạ" tiện lợi.

---

## 3. Các Bước Triển Khai
1. [ ] Thêm `const [showCriteriaBlock, setShowCriteriaBlock] = useState<boolean>(false);` vào `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx`.
2. [ ] Thêm nút toggle bên cạnh dòng Kết luận chẩn đoán.
3. [ ] Bọc khối danh sách tiêu chuẩn trong điều kiện `{showCriteriaBlock && (...)}`.
4. [ ] Kiểm tra responsive trên cả desktop và mobile dọc/ngang.

---

## 4. Tiêu Chuẩn Nghiệm Thu
- [ ] Bấm nút toggle đóng/mở mượt mà, không làm giật lag vòng lặp vẽ sóng 60 FPS.
- [ ] Khi đóng, giấy in thông thoáng 100%. Khi mở, có đầy đủ các dòng tiêu chuẩn để click chọn.
