# Phase 02: Chế Độ Điện Tim Màn Hình Dọc Chuyên Dụng (ECG Portrait Mode Engine)

Status: ⬜ Pending
Dependencies: Phase 01

---

## 1. Mục Tiêu (Objective)
Giải quyết triệt để vấn đề khổ giấy in điện tim 12 cần (vốn thiết kế tỉ lệ ngang A4 `min-w-[900px]`) bị tràn ngang trên màn hình dọc smartphone. Bổ sung chế độ hiển thị dọc thông minh (Portrait Stacked Mode) và chế độ soi phóng to từng chuyển đạo (Lead Focus / Zoom Mode).

---

## 2. Yêu Cầu Kỹ Thuật (Requirements)

### 2.1. Chức Năng (Functional)
- [ ] Bổ sung thanh chọn chế độ hiển thị trên bản in điện tim:
  1. 📄 **Bản In A4 Chuẩn (Standard 12-Lead EMR)**: Giữ nguyên lưới ngang truyền thống (3x4 + DII rhythm strip) có hỗ trợ thanh cuộn mượt.
  2. 📱 **Màn Hình Dọc Điện Thoại (Portrait Stacked Grid)**:
     - Tự động chuyển đổi sang lưới phù hợp bề ngang hẹp: hiển thị dải chuyển đạo ngoại biên (DI, DII, DIII, aVR, aVL, aVF) và chuyển đạo trước tim (V1 - V6) với tỉ lệ mm co giãn thông minh không bị méo sóng.
  3. 🔍 **Soi Phóng To 1 Chuyển Đạo (Lead Focus & Inspection Zoom)**:
     - Cho phép bác sĩ chạm vào bất kỳ chuyển đạo nào (VD: DII xem P-QRS, V2-V3 xem ST chênh vòm STEMI) để phóng to toàn màn hình dọc sắc nét 60 FPS.
     - Hiển thị thước đo Caliper điện tử trực tiếp trên chuyển đạo phóng to.
- [ ] Nút **Xoay Màn Hình Ngang Ảo (Virtual Landscape Toggle)**:
  - Cho phép người dùng chuyển nhanh chế độ xoay ngang canvas 90 độ ngay trong giao diện web mà không cần phải tắt khóa xoay màn hình của hệ điều hành.
- [ ] **Bộ Lọc Tiêu Chuẩn Chuẩn Dọc (Portrait Criteria Carousel)**:
  - Thanh lọc tiêu chuẩn chuyển thành dạng thanh cuộn ngang mượt mà (Snap Carousel) với các thẻ chip nhỏ gọn dễ vuốt bằng ngón cái.

### 2.2. Phi Chức Năng (Non-Functional)
- [ ] Giữ nguyên độ chuẩn xác toán học của các sóng Gaussian (không bị mất đỉnh R hay biến dạng sóng T khi co giãn canvas).
- [ ] Tốc độ render đạt mượt mà 60 FPS trên chip di động (dùng `requestAnimationFrame` và offscreen grid canvas).

---

## 3. Các File Cần Chỉnh Sửa / Tạo Mới
- `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx` (Bổ sung bộ chọn chế độ xem dọc, lead focus và responsive canvas)
- `src/components/simulators/ecg/EcgLeadFocusModal.tsx` (Tạo mới: Modal soi phóng to chuyển đạo chuyên sâu)
- `src/app/simulators/ecg/page.tsx` (Tối ưu hóa layout màn hình dọc)

---

## 4. Tiêu Chí Kiểm Thử (Test Criteria)
- [ ] Trên màn hình rộng 375px (iPhone SE/13 mini), người dùng có thể xem trọn vẹn dải nhịp và các sóng bất thường mà không bắt buộc phải cuộn ngang.
- [ ] Bấm vào chuyển đạo bất kỳ mở được chế độ Focus Zoom sắc nét.
- [ ] Chuyển đổi qua lại giữa các tiêu chuẩn vàng hiển thị chính xác các nhãn ghim trên sóng.
