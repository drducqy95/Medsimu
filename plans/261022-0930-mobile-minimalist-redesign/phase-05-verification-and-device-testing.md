# Phase 05: Kiểm Thử Tự Động, Đo Chiều Cao Màn Hình & Git Push

## 1. Mục Tiêu & Kịch Bản Kiểm Thử
- **Mục tiêu**:
  - Đảm bảo toàn bộ kiến trúc tối giản mới không làm vỡ bất kỳ logic y khoa, công thức tính toán sóng hay tương thích giao diện nào.
  - Viết bộ kiểm thử tự động bổ sung trong `tests/` để xác thực:
    1. Drawer chọn bệnh lý trượt lên/xuống, tìm kiếm và phân loại 9 hệ thống.
    2. Quick Toolbar điều khiển tần số, tốc độ quét, độ nhạy, caliper.
    3. Drawer xem lâm sàng & tiêu chuẩn chẩn đoán.
    4. Accordion thu gọn hồ sơ bệnh nhân trên màn hình buồng cấp cứu.
    5. Tổng chiều cao cuộn trang (scroll height) trên mobile giảm >= 70%.

---

## 2. Kịch Bản Kiểm Thử Cụ Thể (`tests/mobile_minimalist_layout.test.js`)
1. **Kiểm tra hiển thị Waveform-First**:
   - Xác nhận trên màn hình mobile, giấy in điện tim được đặt ngay sau thanh micro header (không có các khối control cồng kềnh phía trên).
2. **Kiểm tra Bottom Sheet Drawer Picker**:
   - Khi mở Drawer: 31 bệnh lý được phân loại đầy đủ theo 9 hệ thống.
   - Khi tìm kiếm: Từ khóa "STEMI", "rung nhĩ", "VT" lọc chính xác các ca bệnh liên quan.
   - Khi chọn bệnh: Cập nhật state `selectedRhythm` và đóng drawer.
3. **Kiểm tra Quick Toolbar & Clinical Drawer**:
   - Nút bật Caliper thay đổi đúng state `isCalipersActive`.
   - Nút Settings mở điều khiển BPM, Speed, Amp.
   - Nút Lâm sàng mở đầy đủ tiêu chuẩn và phác đồ xử trí.
4. **Kiểm tra Accordion Hồ sơ bệnh nhân**:
   - Click thu gọn/mở rộng chuyển trạng thái `isCollapsed`.
5. **Kiểm tra TypeScript & Next.js Build**:
   - `npx tsc --noEmit` không có bất kỳ lỗi cú pháp hoặc kiểu dữ liệu nào.
   - Toàn bộ test suite chạy đạt 100% (Green).

---

## 3. Hoàn Tất & Đồng Bộ Git
- Commit toàn bộ thay đổi với thông điệp rõ ràng theo quy chuẩn Trinity.
- Push trực tiếp lên repository: `drducqy95/Medsimu` nhánh `main`.
