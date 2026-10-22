# Phase 03: Real Ultrasound Workstation - Bộ Mô Phỏng Siêu Âm Đầu Dò 3D Gắn Ảnh Thật

Status: ⬜ Pending
Dependencies: Phase 01

## Objective
Nâng cấp toàn diện trạm mô phỏng siêu âm [DynamicUltrasoundScreen.tsx](file:///d:/Downloads/Archives/GameYhoc/src/components/simulators/ultrasound/DynamicUltrasoundScreen.tsx) và [ThreeBodyViewport.tsx](file:///d:/Downloads/Archives/GameYhoc/src/components/simulators/ultrasound/ThreeBodyViewport.tsx): Thay thế/kết hợp đồ họa giả lập bằng **kho ảnh siêu âm lâm sàng thực tế 100%** từ CD Viable Ultrasound, hỗ trợ duyệt atlas 9 hệ cơ quan và tương tác tay di chuyển đầu dò trên cơ thể 3D để xem đúng lát cắt thật.

## Requirements

### Functional
- [ ] **Chế độ Kép (Dual View Mode):**
  - **Mode 1: Mô phỏng Động (Dynamic Waveform):** Xem co bóp tim, van tim đóng mở, trượt màng phổi (FAST Protocol cơ bản).
  - **Mode 2: Kho Ảnh Siêu Âm Thực Tế (Real CD Clinical Atlas):** Xem trực tiếp 1,245 ảnh siêu âm thật từ bệnh viện của CD Viable Ultrasound.
- [ ] **Bộ Duyệt 9 Hệ Cơ Quan Siêu Âm Lâm Sàng:**
  1. *Gan (Liver):* Nhu mô gan bình thường, Xơ gan, Ung thư gan HCC, U gan di căn, Gan nhiễm mỡ, Viêm gan, Nang gan, Áp xe gan, U mạch máu, Chấn thương gan vỡ.
  2. *Túi mật & Đường mật (Gallbladder & Biliary):* Sỏi túi mật, Viêm túi mật cấp, Viêm túi mật mạn, Polyp túi mật, Ung thư túi mật, Giãn đường mật, Sỏi ống mật chủ.
  3. *Tụy (Pancreas):* Nhu mô tụy bình thường, Viêm tụy cấp, Viêm tụy mạn, U tụy, Nang tụy.
  4. *Thận & Niệu quản (Kidneys & Ureters):* Thận bình thường, Thận ứ nước, Nang thận, Ung thư tế bào thận (RCC), Sỏi thận, Áp xe thận, Thận đa nang.
  5. *Bàng quang (Bladder):* U bàng quang, Sỏi bàng quang, Túi thừa bàng quang.
  6. *Tiền liệt tuyến & Bìu (Prostate & Scrotum):* Phì đại tuyến tiền liệt (BPH), Ung thư tiền liệt tuyến, Tràn dịch tinh mạc (Hydrocele), Giãn tĩnh mạch thừng tinh.
  7. *Tuyến giáp & Cổ (Thyroid & Neck):* Nhân tuyến giáp, Bướu giáp, Ung thư tuyến giáp, Viêm tuyến giáp Hashimoto, Hạch cổ.
  8. *Lồng ngực (Thorax):* Tràn dịch màng phổi, Đông đặc phổi.
  9. *Đường tiêu hóa (GI Tract):* Viêm ruột thừa cấp, Lồng ruột, Tắc ruột cơ học, Hạch mạc treo.
- [ ] **Đồng bộ Vị trí Đầu dò 3D với Lát Cắt Thật (Probe-To-Anatomy Sync):**
  - Khi người dùng đặt đầu dò vào:
    - *Hạ sườn phải (RUQ):* Tự động tải ảnh thật Gan phải, Túi mật, Khoang Morison và Thận phải.
    - *Thượng vị (Epigastric):* Tự động tải ảnh thật Tụy, Động mạch chủ bụng, Thùy gan trái.
    - *Hạ sườn trái (LUQ):* Tự động tải ảnh thật Lách và Thận trái.
    - *Hố chậu phải (RLQ):* Tự động tải ảnh thật Manh tràng và Ruột thừa viêm dãn lớn có sỏi phân.
    - *Hạ vị (Suprapubic):* Tự động tải ảnh thật Bàng quang và Tiền liệt tuyến / Tử cung.
    - *Vùng cổ (Neck):* Tự động tải ảnh thật Tuyến giáp và Bó mạch cảnh.
- [ ] **Bộ Công Cụ Thao Tác Chuyên Nghiệp:**
  - Zoom & Pan ảnh siêu âm thật.
  - Điều chỉnh Contrast & Brightness.
  - Thước đo Calipers đo đường kính khối u / sỏi / độ dày thành (đơn vị mm).
  - Khung giải thích chi tiết cơ chế phản hồi âm: Echo trống (dịch/nang), Echo kém (u ác tính), Echo dày kèm bóng lưng (sỏi mật/sỏi thận/sỏi phân ruột thừa).

### Non-Functional
- [ ] Giao diện máy siêu âm hiện đại (Medical Console) tạo cảm giác chân thực như ngồi trước máy siêu âm GE Voluson hay Mindray.

## Implementation Steps
1. [ ] Xây dựng Component `RealUltrasoundAtlasViewer.tsx` duyệt ảnh thật và video thật.
2. [ ] Nâng cấp `DynamicUltrasoundScreen.tsx` tích hợp chế độ xem ảnh thật.
3. [ ] Cập nhật trang `/simulators/ultrasound/page.tsx` cho phép chuyển đổi chế độ xem linh hoạt.

## Files to Create/Modify
- `src/components/simulators/ultrasound/RealUltrasoundAtlasViewer.tsx`
- `src/components/simulators/ultrasound/DynamicUltrasoundScreen.tsx`
- `src/app/simulators/ultrasound/page.tsx`

---
Next Phase: [Phase 04: Bedside & Clinical Case Integration](file:///d:/Downloads/Archives/GameYhoc/plans/261021-2030-real-ultrasound-and-pink-ecg/phase-04-frontend.md)
