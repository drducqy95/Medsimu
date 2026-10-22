# Phase 04: Two-Level System Navigation & Interactive Clinical UI (Điều Hướng Phân Nhóm 9 Hệ Thống & Trợ Lý Lâm Sàng)

Status: ✅ Complete
Dependencies: Phase 02, Phase 03

## 1. Mục Tiêu (Objective)
Xây dựng giao diện học tập lâm sàng có cấu trúc phân cấp (Hierarchical Two-Level Navigation) theo 9 hệ thống bệnh học tim mạch:
1. **System Selector Tabs (Thanh chọn 9 Hệ Thống Lâm Sàng):** Giúp người học không bị ngợp trước danh sách 30+ bệnh lý, dễ dàng lọc theo chuyên đề (Vành cấp, Block, Loạn nhịp trên thất, Thất, Kênh ion, Màng tim...).
2. **Pathology Cards Deck (Lưới bệnh lý trong hệ thống):** Hiển thị rõ vùng giải phẫu tổn thương (LAD, LCx, RCA, Bó His...) và mức độ cảnh báo (`CODE RED`, `CẤP CỨU`, `THEO DÕI`).
3. **Modal / Drawer "Bệnh Cảnh & Phác Đồ Xử Trí Khẩn Cấp" (Clinical Management Deck):** Phân chia tab rõ ràng (Triệu chứng, Phác đồ cấp cứu, Thuốc & Liều dùng, Cạm bẫy cấm kỵ).
4. **Interactive 7-Step Assistant (Trợ lý Đọc ECG 7 Bước):** Thanh hướng dẫn tương tác trực tiếp trên bản in giấy hồng.
5. **Cảnh Báo Đỏ (Red Flags Alert Banner):** Cảnh báo nguy cơ tử vong và các chống chỉ định đỏ nổi bật.

## 2. Thiết Kế Thanh Điều Hướng 9 Hệ Thống
- Tabs trên cùng:
  - 🟢 [Tất cả] (31 ca)
  - 🩺 [1. Nút Xoang] (3 ca)
  - 🫀 [2. Mạch Vành Cấp / ACS] (5 ca)
  - ⚡ [3. Block AV & Nhánh] (7 ca)
  - 🌊 [4. Loạn Nhịp Trên Thất & WPW] (4 ca)
  - 🚨 [5. Thất & Ngừng Tim] (5 ca)
  - 🏋️ [6. Phì Đại Buồng Tim] (1 ca)
  - 🧬 [7. Kênh Ion & Brugada] (1 ca)
  - 🫁 [8. Tim Phổi & Màng Ngoài Tim] (2 ca)
  - 🧪 [9. Điện Giải & Ngộ Độc] (3 ca)

## 3. Các Bước Triển Khai (Implementation Steps)
1. [x] Xây dựng component `src/components/simulators/ecg/EcgSystemCategoryTabs.tsx` hiển thị thanh 9 hệ thống.
2. [x] Xây dựng component `src/components/simulators/ecg/EcgClinicalDeckModal.tsx` hiển thị thông tin bệnh cảnh, phác đồ, thuốc và cạm bẫy.
3. [x] Xây dựng component `src/components/simulators/ecg/EcgSevenStepAssistant.tsx` hỗ trợ kiểm tra và đánh giá từng bước đọc ECG.
4. [x] Tích hợp vào `RealisticPinkEcgPaper.tsx` và `EcgSimulatorPage.tsx`.

## 4. Tệp Cần Tạo / Chỉnh Sửa
- `src/components/simulators/ecg/EcgSystemCategoryTabs.tsx`
- `src/components/simulators/ecg/EcgClinicalDeckModal.tsx`
- `src/components/simulators/ecg/EcgSevenStepAssistant.tsx`
- `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx`
- `src/app/simulators/ecg/page.tsx`

## 5. Tiêu Chuẩn Nghiệm Thu
- [x] Chuyển đổi giữa 9 hệ thống phản hồi tức thì, lọc đúng danh sách bệnh lý trực thuộc.
- [x] Giao diện mở mượt mà, không giật khung hình khi sóng 60 FPS đang quét trên Canvas.
- [x] Bấm vào từng bước trong trợ lý 7 bước cập nhật thông tin giải thích chuẩn xác theo hệ thống.
