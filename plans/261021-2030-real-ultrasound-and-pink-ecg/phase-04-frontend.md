# Phase 04: Bedside & Clinical Case Integration - Tích Hợp Vào Buồng Cấp Cứu Module 3

Status: ⬜ Pending
Dependencies: Phase 02, Phase 03

## Objective
Tích hợp trực tiếp hai công cụ nâng cấp (Bản in Điện tâm đồ giấy hồng 12 đạo trình và Trạm ảnh siêu âm thật từ Viable Ultrasound) vào Buồng cấp cứu hồi sức [Module 3](file:///d:/Downloads/Archives/GameYhoc/src/app/treatment/page.tsx) và các ca bệnh lâm sàng thực chiến.

## Requirements

### Functional
- [ ] **Mắc ECG 12 CĐ Tại Giường:**
  - Khi bác sĩ bấm nút "Mắc ECG 12 CĐ" trong [ParaclinicalStation.tsx](file:///d:/Downloads/Archives/GameYhoc/src/components/treatment/ParaclinicalStation.tsx):
    - Hiển thị ngay tờ giấy kẻ màu hồng chuẩn y tế với đúng thông tin bệnh nhân đang cấp cứu (Ví dụ: Bệnh nhân Nguyễn Văn Hải, 61T, Nam, Ngày giờ cấp cứu).
    - Tự động in kết quả dải nhịp tương ứng của ca bệnh đó (ví dụ Ca STEMI thành dưới sẽ hiển thị ST chênh lên ở DII, DIII, aVF và ST chênh xuống ở DI, aVL trên giấy hồng).
    - Có nút "In kết quả điện tim" và "Tải file ảnh tờ giấy điện tim".
- [ ] **Siêu âm POCUS & Bệnh học Tại Giường:**
  - Khi bấm nút "Siêu âm POCUS tại giường":
    - Cho phép bác sĩ vừa xem đầu dò quét vùng cấp cứu, vừa mở được các hình ảnh siêu âm thật tương ứng từ thư viện Viable Ultrasound (ví dụ: ca Viêm ruột thừa sẽ xem được hình ảnh thật ruột thừa viêm dãn lớn có sỏi phân và thâm nhiễm mỡ; ca Sốc nhiễm khuẩn xem được hình ảnh thật áp xe và dịch tự do ổ bụng).
- [ ] **Bổ sung các tình huống cấp cứu mới:**
  - Ca cấp cứu Sỏi kẹt cổ túi mật gây viêm túi mật cấp hoại tử (Acute Cholecystitis) tận dụng ảnh thật từ Chapter 2.
  - Ca cấp cứu Cơn đau quặn thận do sỏi niệu quản gây thận ứ nước độ III tận dụng ảnh thật từ Chapter 4.

## Implementation Steps
1. [ ] Cập nhật `src/components/treatment/ParaclinicalStation.tsx` nhúng `RealisticPinkEcgPaper` và `RealUltrasoundAtlasViewer`.
2. [ ] Đồng bộ hóa thông tin người bệnh và chẩn đoán vào tiêu đề giấy in điện tim.
3. [ ] Cập nhật trang `/treatment/[caseId]/page.tsx` và client component.

## Files to Create/Modify
- `src/components/treatment/ParaclinicalStation.tsx`
- `src/app/treatment/[caseId]/ResuscitationBayClient.tsx`
- `src/infrastructure/db/sqlite.ts`

---
Next Phase: [Phase 05: Verification, Export/Print & Testing](file:///d:/Downloads/Archives/GameYhoc/plans/261021-2030-real-ultrasound-and-pink-ecg/phase-05-integration.md)
