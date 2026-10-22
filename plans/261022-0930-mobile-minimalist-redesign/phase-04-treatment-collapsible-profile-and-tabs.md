# Phase 04: Buồng Hồi Sức Cấp Cứu: Hồ Sơ Thu Gọn & Tab Tối Giản

## 1. Mục Tiêu & Vấn Đề Cần Giải Quyết
- **Vấn đề**:
  - Tại trang buồng cấp cứu `/treatment/[caseId]`:
    - Khối `PatientBedsideView` (Hồ sơ bệnh nhân, lý do vào viện, tiền sử, dị ứng) hiện diện dạng thẻ lớn. Trên mobile, người dùng phải cuộn qua toàn bộ phần hồ sơ bệnh nhân này mới tới được Monitor sinh hiệu và Bảng ra y lệnh / khám lâm sàng.
    - Trong tình huống cấp cứu nguy kịch (Code Blue / Sốc / Ngưng tuần hoàn), bác sĩ cần hành động ngay lập tức (ép tim, sốc điện, đặt nội khí quản, dùng Adrenaline), việc phải cuộn trang dài làm giảm tốc độ phản xạ và gây bối rối.
- **Mục tiêu**:
  - **Accordion 1 chạm cho Hồ sơ bệnh nhân (`PatientBedsideView`)**:
    - Mặc định trên mobile: Thu gọn thành 1 thanh tóm tắt siêu mỏng cao ~42px:
      `[👤 Nguyễn Văn A (58T) • Đau thắt ngực cấp • Dị ứng: Penicillin ▼ (Chạm để xem chi tiết)]`.
    - Khi cần xem tiền sử/khám: Chạm để bung ra, chạm lần nữa để gấp lại.
  - **Màn hình Monitor Sinh Hiệu & Thanh Đếm Ngược Lên Hàng Đầu**:
    - Monitor theo dõi nhịp tim/huyết áp/SpO2/EtCO2 luôn nằm ngay tầm mắt.
  - **Hệ thống 5 Tab Khám/Y lệnh Tối Giản**:
    - Giữ các tab: Khám nhanh, Thuốc, Thủ thuật, CLS, Đánh giá dạng horizontal scrollable pills mượt mà, không tràn lề.

---

## 2. Các Thay Đổi Cụ Thể

### File: `src/components/treatment/PatientBedsideView.tsx`
- Thêm state `isCollapsed` (mặc định `true` trên mobile, `false` trên desktop).
- Render chế độ thu gọn (Compact Banner) với badge dị ứng cảnh báo màu đỏ nổi bật.
- Nút bấm `[▼ Xem toàn bộ hồ sơ]` / `[▲ Thu gọn hồ sơ]` mượt mà.

### File: `src/app/treatment/[caseId]/ResuscitationBayClient.tsx`
- Tối ưu khoảng cách margin giữa Monitor, Hồ sơ bệnh nhân và Bảng điều trị.
- Đảm bảo thanh FAB Cấp cứu ngưng tim (Code Blue Defib FAB) luôn nổi ở vị trí thuận tiện ngón tay cái mà không che khuất các nút bấm ra y lệnh.

---

## 3. Tiêu Chuẩn Nghiệm Thu (Acceptance Criteria)
- [ ] Hồ sơ bệnh nhân trên mobile có thể thu gọn/mở rộng chỉ với 1 chạm.
- [ ] Monitor sinh hiệu và thanh đếm thời gian cấp cứu hiển thị rõ ràng ngay nếp gấp đầu tiên.
- [ ] Bác sĩ có thể thao tác ra y lệnh cấp cứu ngay mà không cần cuộn qua trang hồ sơ dài.
