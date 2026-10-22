# Phase 03: Tối Ưu Monitor Sinh Hiệu & Cận Lâm Sàng Dọc (Telemetry & Simulators Portrait Optimization)

Status: ⬜ Pending
Dependencies: Phase 01

---

## 1. Mục Tiêu (Objective)
Tối ưu hóa các thiết bị cận lâm sàng còn lại: Máy theo dõi sinh hiệu tại giường (Bedside Telemetry Monitor), Máy siêu âm 3D (Ultrasound), Máy X-quang và Máy cắt lớp vi tính (CT Workstation) để đạt trải nghiệm hiển thị và tương tác hoàn hảo trên màn hình dọc.

---

## 2. Yêu Cầu Kỹ Thuật (Requirements)

### 2.1. Bedside Telemetry Monitor (`BedsideMonitor.tsx`)
- [ ] Bố cục màn hình dọc chuyên dụng:
  - Nửa trên: Dải sóng Lead II và dải SpO2 Pleth co giãn 100% bề ngang (`w-full`), tỉ lệ chiều cao tự động thích ứng (`h-[160px]`).
  - Nửa dưới: 4 ô số sinh hiệu (HR, NIBP/MAP, SpO2, Temp) bố trí dạng thanh 4 cột ngang hoặc lưới 2x2 siêu gọn.
  - Tích hợp nút bật/tắt bíp tim và cảnh báo Code Blue ngay trong tầm tay.

### 2.2. Máy Quét CT-Scanner Đa Lát Cắt (`CtSliceViewer.tsx`)
- [ ] Sắp xếp lại layout 12 cột thành layout dọc 1 cột:
  - Khung ảnh lát cắt (Canvas CT 512x512) đặt ở trung tâm phía trên, tỉ lệ vuông `aspect-square`, tối đa hóa kích thước hiển thị theo bề ngang điện thoại.
  - Thanh trượt lát cắt (Slice Scrubber) với nút Previous/Next đặt ngay dưới canvas.
  - Dải phím tắt Preset cửa sổ (Nhu mô, Xương, Phổi) hiển thị dạng thanh chip ngang dễ chạm bằng 1 ngón tay.
  - HUD đo Hounsfield Unit (HU Probe) hiển thị nổi ở góc dưới canvas không che mất vùng tổn thương chính.

### 2.3. Máy Siêu Âm Đầu Dò 3D (`Probe3DViewer.tsx`) & X-Quang (`XrayViewer.tsx`)
- [ ] Màn hình quạt siêu âm (Ultrasound sector) và ảnh X-quang đặt ở vị trí trung tâm (Center Stage).
- [ ] Sơ đồ định vị giải phẫu đầu dò (Probe Body Map) trên mobile chuyển thành dạng nút nổi (Floating Pin) hoặc Drawer có thể thu/phóng nhanh để không chiếm không gian hiển thị của màn hình siêu âm chính.
- [ ] Thanh checklist giao thức FAST cấp cứu chuyển thành dạng dải tiến độ cuộn ngang.

---

## 3. Các File Cần Chỉnh Sửa / Tạo Mới
- `src/components/treatment/BedsideMonitor.tsx`
- `src/components/simulators/ct/CtSliceViewer.tsx`
- `src/components/simulators/ultrasound/Probe3DViewer.tsx`
- `src/components/simulators/xray/XrayViewer.tsx`

---

## 4. Tiêu Chí Kiểm Thử (Test Criteria)
- [ ] Trên màn hình dọc, canvas hiển thị ảnh y khoa không bị tràn viền hay méo tỉ lệ.
- [ ] Các thanh điều khiển cuộn lát cắt CT và đổi vị trí đầu dò siêu âm phản hồi nhạy với thao tác chạm vuốt (Touch Drag / Scrub).
