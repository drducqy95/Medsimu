# Phase 03: Hợp Nhất Bảng Điều Khiển & Trợ Lý 7 Bước Vào Quick Deck

## 1. Mục Tiêu & Vấn Đề Cần Giải Quyết
- **Vấn đề**:
  1. Main Control Deck (BPM, Tốc độ quét 25/50 mm/s, Biên độ 5/10/20 mm/mV, Thước Caliper) chiếm 1 ô chữ nhật lớn ~180px trên giao diện chính.
  2. Khối Trợ lý 7 bước chuẩn y khoa (`EcgSevenStepAssistant`) chiếm thêm ~150px.
  3. Bảng phân tích tiêu chuẩn chẩn đoán / lâm sàng / xử trí chiếm thêm ~200px.
- **Mục tiêu**:
  - Tối giản hóa thành **Thanh Thao Tác Nhanh (Mobile Quick Toolbar)** đặt ngay dưới giấy in điện tim:
    - Nút 1: `[❤️ Tên bệnh ▼]` (Mở Drawer chọn bệnh - Phase 02).
    - Nút 2: `[⚙️ Cài đặt]` (Mở Popover/Modal tinh chỉnh BPM, Tốc độ, Biên độ).
    - Nút 3: `[📐 Thước Caliper]` (Bật/tắt nhanh thước đo trên giấy in).
    - Nút 4: `[📋 Lâm sàng & Xử trí]` (Mở Bottom Sheet xem tiêu chuẩn chẩn đoán, phác đồ điều trị của bệnh hiện tại).
    - Nút 5: `[🔍 Phóng to chuyển đạo]` (Xem chi tiết từng đạo trình).

---

## 2. Các Thay Đổi Cụ Thể

### 2.1. Tạo Component: `src/components/ecg/EcgQuickToolbar.tsx`
- Thanh công cụ 1 dòng mỏng (cao ~48px) cố định hoặc đặt ngay sát đáy giấy in điện tim.
- Nút bấm to bản vừa vặn ngón tay cái (Thumb-friendly touch target >= 44px).
- Nút `⚙️ Cài đặt` mở Sheet nhỏ gọn:
  - Tần số tim: Slider BPM + 3 nút preset (60 / 80 / 120 bpm).
  - Tốc độ chạy giấy: Toggle button `[25 mm/s]` | `[50 mm/s]`.
  - Độ nhạy biên độ: Toggle button `[5 mm/mV]` | `[10 mm/mV]` | `[20 mm/mV]`.

### 2.2. Sheet Lâm Sàng & Phác Đồ Xử Trí (`EcgClinicalDrawer.tsx`)
- Khi người dùng muốn học tập hoặc tra cứu xử trí ca bệnh:
  - Bấm nút `[📋 Lâm sàng & Xử trí]`.
  - Drawer hiển thị:
    - Tình huống lâm sàng thực tế (Ví dụ: "Bệnh nhân nam 62 tuổi, đau ngực trái dữ dội lan ra vai...")
    - Tiêu chuẩn chẩn đoán theo từng chuyển đạo (Stent ST, sóng Q, đảo ngược T...)
    - Phác đồ xử trí cấp cứu khẩn cấp (Aspirin, Clopidogrel, Heparin, PCI can thiệp mạch vành...)
    - Nút mở Trợ lý 7 bước đọc điện tim có hệ thống.
  - Người dùng tra cứu xong đóng lại, không làm bẩn màn hình xem sóng chính.

---

## 3. Tiêu Chuẩn Nghiệm Thu (Acceptance Criteria)
- [ ] Không còn khối hộp chữ nhật điều khiển cồng kềnh chiếm chỗ trên màn hình chính mobile.
- [ ] Các thông số BPM, Tốc độ quét, Biên độ vẫn điều chỉnh được dễ dàng qua Quick Settings.
- [ ] Thước Caliper đo lường bật/tắt trực tiếp chỉ với 1 chạm.
- [ ] Bác sĩ có thể đọc phác đồ xử trí và tiêu chuẩn chẩn đoán đầy đủ khi cần mà không phải cuộn trang liên tục.
