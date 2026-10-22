# Phase 04: Tối Ưu Quy Trình Cấp Cứu Buồng Hồi Sức Dọc (Treatment Bay Portrait UX)

Status: ⬜ Pending
Dependencies: Phase 01, Phase 03

---

## 1. Mục Tiêu (Objective)
Tối ưu hóa toàn bộ luồng khám và xử trí bệnh nhân cấp cứu tại Buồng Hồi Sức (`/treatment/[caseId]`) trên màn hình dọc, đảm bảo bác sĩ có thể ra quyết định lâm sàng và can thiệp sốc điện / ép tim CPR chỉ bằng một tay trong tình huống khẩn cấp.

---

## 2. Yêu Cầu Kỹ Thuật (Requirements)

### 2.1. Chức Năng (Functional)
- [ ] **Thanh Điều Hướng 5 Bước Lâm Sàng (Step Progress Bar)**:
  - Trên màn hình dọc, thay thế thanh nút ngang dài bằng thanh bước trực quan (1. Hỏi bệnh → 2. Khám → 3. Cận lâm sàng → 4. Ra y lệnh → 5. Chẩn đoán).
  - Cho phép vuốt ngang nhẹ hoặc chạm chuyển bước mượt mà với badge số lượng đã hoàn thành (VD: 3/5 câu hỏi, 4/6 hệ cơ quan).
- [ ] **Thao Tác Cứu Sống Khẩn Cấp (Sticky Emergency Code Blue FAB)**:
  - Khi bệnh nhân bị ngừng tuần hoàn (Code Blue / VFib / Vô tâm thu), nút **"SỐC ĐIỆN 200J / ÉP TIM CPR"** tự động ghim nổi (Sticky Floating Action Button) ở góc dưới màn hình dọc với hiệu ứng nhấp nháy đỏ-vàng khẩn cấp, giúp bác sĩ phản xạ can thiệp ngay lập tức mà không phải cuộn tìm kiếm.
- [ ] **Trang Hồ Sơ Bệnh Nhân Dọc (`PatientBedsideView.tsx`)**:
  - Tối ưu hóa khối đếm ngược "Thời Gian Vàng": hiển thị số đồng hồ to rõ nét kết hợp badge phân loại cấp cứu ESI (ESI-1, ESI-2).
  - Thu gọn danh sách tiền sử dị ứng và triệu chứng chính thành các chip thông tin nhỏ gọn.
- [ ] **Y Lệnh Cấp Cứu (`MedicalOrderSheet.tsx`)**:
  - Nhóm các y lệnh theo danh mục (Thuốc, Thở oxy, Đường truyền, Phẫu thuật) với nút áp dụng 1-chạm (One-tap apply) có phản hồi rung hoặc âm thanh.

### 2.2. Phi Chức Năng (Non-Functional)
- [ ] Tối ưu hóa độ trễ tương tác (< 16ms) khi ra y lệnh khẩn cấp.
- [ ] Giao diện trực quan, rõ ràng dưới ánh sáng phòng trực ban đêm (Dark Mode y tế tiêu chuẩn).

---

## 3. Các File Cần Chỉnh Sửa / Tạo Mới
- `src/app/treatment/[caseId]/ResuscitationBayClient.tsx`
- `src/components/treatment/PatientBedsideView.tsx`
- `src/components/treatment/MedicalOrderSheet.tsx`
- `src/components/treatment/ParaclinicalStation.tsx`

---

## 4. Tiêu Chí Kiểm Thử (Test Criteria)
- [ ] Khi kích hoạt Code Blue, nút sốc điện xuất hiện nổi bật ngay trong tầm ngón cái và thực hiện cứu sống ROSC tức thì.
- [ ] 5 bước lâm sàng chuyển đổi mượt mà không bị nhảy trang hay giật lag.
