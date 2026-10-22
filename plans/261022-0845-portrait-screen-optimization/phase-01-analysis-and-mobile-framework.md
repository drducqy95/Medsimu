# Phase 01: Kiến Trúc Màn Hình Dọc & Thanh Điều Hướng Đáy (Mobile Bottom App Bar & Viewport Architecture)

Status: ⬜ Pending | Awaiting Plan Approval
Dependencies: None

---

## 1. Mục Tiêu (Objective)
Xây dựng nền tảng layout chuyên dụng cho màn hình dọc (portrait mode) trên smartphone và tablet, đưa toàn bộ các chức năng điều hướng quan trọng vào **Khu vực ngón tay cái (Thumb Zone)** ở đáy màn hình, đồng thời loại bỏ các lỗi che khuất do thanh điều hướng hệ thống (Safe Area Insets).

---

## 2. Yêu Cầu Kỹ Thuật (Requirements)

### 2.1. Chức Năng (Functional)
- [ ] Xây dựng component `MobileBottomNav.tsx` cố định ở chân màn hình (`fixed bottom-0 z-50 md:hidden`).
- [ ] Tích hợp 4 nút chuyển Module chính với icon, nhãn rõ ràng và chỉ báo badge thông báo:
  - 🏠 **Trang Chủ** (`/`)
  - 📚 **Viện Hàn Lâm** (`/academy`) - Module 1
  - 🩺 **Cận Lâm Sàng** (`/simulators`) - Module 2 (ECG, Siêu âm, X-quang, CT)
  - 🚨 **Cấp Cứu ER** (`/treatment`) - Module 3 (Buồng hồi sức cấp cứu)
- [ ] Tích hợp nút xem nhanh Hồ sơ Bác sĩ & Cây kỹ năng (`SkillTreeModal`) tại góc phải bottom bar hoặc header thu nhỏ.
- [ ] Bổ sung padding đáy tự động trong `src/app/layout.tsx` (`pb-20 md:pb-0`) để nội dung không bao giờ bị bottom bar che khuất.

### 2.2. Phi Chức Năng (Non-Functional)
- [ ] **Thumb Zone Ergonomics**: Toàn bộ các nút bấm có kích thước tối thiểu `44x44px` theo tiêu chuẩn Apple Human Interface Guidelines / Google Material 3.
- [ ] **Safe Area Insets**: Hỗ trợ CSS `env(safe-area-inset-bottom)` cho iPhone có thanh Home Indicator.
- [ ] **Touch Optimization**: Thiết lập `touch-action: manipulation` để ngăn chặn double-tap zoom ngoài ý muốn khi thao tác nhanh trong game.

---

## 3. Các File Cần Chỉnh Sửa / Tạo Mới
- `src/components/layout/MobileBottomNav.tsx` (Tạo mới)
- `src/components/layout/HospitalNavbar.tsx` (Chỉnh sửa: Thu gọn trên mobile, đồng bộ trạng thái)
- `src/app/layout.tsx` (Chỉnh sửa: Thêm `MobileBottomNav`, bổ sung padding an toàn)
- `src/app/globals.css` (Bổ sung safe area variables và utilities)

---

## 4. Tiêu Chí Kiểm Thử (Test Criteria)
- [ ] Trên màn hình có độ rộng `< 768px`, thanh điều hướng đáy hiển thị rõ ràng, cố định và nổi bật.
- [ ] Khi chuyển trang, tab tương ứng sáng màu và có hiệu ứng chỉ báo trực quan.
- [ ] Trên màn hình desktop (`>= 768px`), thanh điều hướng đáy tự động ẩn đi, nhường chỗ cho top navbar hiện tại.
