# Phase 02: Bộ Chọn Bệnh Lý Trượt Drawer (Mobile Bottom Sheet Pathology Picker)

## 1. Mục Tiêu & Vấn Đề Cần Giải Quyết
- **Vấn đề**: Hiện tại bên dưới giấy in điện tim, trang web render toàn bộ 9 Tabs Phân Loại Hệ Thống và **31 Thẻ Bệnh Lý chi tiết** xếp dọc nối tiếp nhau. Để tìm hoặc chuyển bệnh lý, người dùng mobile phải vuốt màn hình liên tục từ 6 đến 8 lần (chiều cao danh sách ~3.000px). Điều này tạo cảm giác cực kỳ rườm rà, rối mắt và mỏi tay.
- **Mục tiêu**:
  - Triệt tiêu hoàn toàn danh sách 31 thẻ bệnh lý nằm thường trực trên màn hình mobile.
  - Thay thế bằng **1 Nút Bấm Thumb Pill** đặt ngay dưới giấy in điện tim:
    - Hiển thị: `[❤️ Tên Bệnh Hiện Tại ▼ | Chạm để đổi bệnh]`.
  - Khi chạm vào nút: Mở ra **Mobile Bottom Sheet Drawer** (Ngăn kéo trượt từ cạnh dưới màn hình lên với hiệu ứng trượt êm ái).

---

## 2. Thiết Kế & Tính Năng Của Bottom Sheet Drawer
Tạo component mới: `src/components/ecg/EcgMobilePathologyDrawer.tsx`
- **Giao diện trong Drawer**:
  1. **Thanh kéo (Grab handle)**: Kéo xuống để đóng hoặc bấm nút `✕`.
  2. **Ô tìm kiếm tức thì (Instant Search Input)**: Tìm nhanh theo tên tiếng Việt hoặc tên y khoa tiếng Anh (ví dụ gõ "STEMI", "rung nhĩ", "AV", "suy tim"...).
  3. **Thanh phân loại nhanh 9 Hệ thống (Horizontal Scroll Chips)**:
     - Tất cả (31)
     - Nhịp Xoang & Nhĩ (4)
     - Loạn Nhịp Thất (4)
     - Nhồi Máu Cơ Tim (5)
     - Block Dẫn Truyền (4)
     - Phì Đại Buồng Tim (3)
     - Rối Loạn Điện Giải (3)
     - Bệnh Màng Ngoài Tim (2)
     - Độc Chất & Thuốc (3)
     - Hội Chứng Di Truyền (3)
  4. **Danh sách bệnh lý dạng List Item gọn gàng**:
     - Mỗi bệnh lý là 1 hàng ngang siêu gọn (chiều cao 52px), gồm icon, tên bệnh, độ nguy cấp (Khẩn cấp / Nguy kịch / Bình thường / Cảnh báo), và nút chọn.
     - Khi bác sĩ chạm vào 1 bệnh:
       - Cập nhật ngay sóng điện tim tương ứng.
       - Tự động đóng Drawer mượt mà.
       - Trả người dùng về lại màn hình ECG ngay lập tức!

---

## 3. Tiêu Chuẩn Nghiệm Thu (Acceptance Criteria)
- [ ] Không còn 31 thẻ bệnh lý chiếm 3.000px màn hình bên dưới giấy in trên mobile.
- [ ] Drawer trượt lên/xuống mượt mà, hỗ trợ đóng khi bấm ra ngoài (backdrop) hoặc vuốt xuống.
- [ ] Tìm kiếm bệnh lý hoạt động tức thì (lọc theo từ khóa không dấu hoặc có dấu).
- [ ] Lọc theo 9 hệ thống chuẩn xác.
- [ ] Khi chọn bệnh, giấy in cập nhật ngay lập tức mà không bị giật lag.
