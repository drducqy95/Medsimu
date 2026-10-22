# Plan: Tinh Giản Giao Diện Mobile - Triệt Tiêu Cuộn Trang & Ưu Tiên Màn Hình Giả Lập (Mobile Minimalist Redesign)

Created: 2026-10-22T09:30:00+07:00
Status: 🟢 Completed & Verified (All 5 Phases Done)
Author: Trinity Architect & System Kernel
Milestone Tracking: Milestone M6 in `project_progress.json`

---

## 1. Executive Summary & Root Cause Analysis (Phân Tích Nguyên Nhân "Rườm Rà, Phải Cuộn Nhiều")

### 1.1. Phản hồi thực tế từ Bác Sĩ (User Feedback)
> *"Hiển thị vẫn rườm rà, chưa tối ưu, phải cuộn nhiều trên màn hình mobile"*

### 1.2. Phân tích nguyên nhân gốc rễ (Root Causes):
1. **Thiếu triết lý "Waveform-First" (Màn hình chẩn đoán lên đầu)**:
   - Trên trang ECG (`/simulators/ecg`), người dùng mở ra chưa thấy ngay sóng điện tim mà bị đập vào mắt 3 khối cồng kềnh:
     1. Khối Header & 3 nút ViewMode + nút Phác đồ (`~100px`)
     2. Khối Main Control Deck gồm 4 ô: thanh trượt BPM, nút tốc độ quét 25/50, nút biên độ 5/10/20, nút Caliper (`~180px`)
     3. Khối thanh lọc tiêu chuẩn, bảng giải thích tiêu chuẩn (`~140px`)
   - **Hậu quả**: Giấy in điện tim bị đẩy xuống tận vị trí 450px - 500px bên dưới nếp gấp màn hình (Below the fold)!
2. **Khối chọn 31 bệnh lý & 9 hệ thống bị phơi bày toàn bộ (List Dump Antipattern)**:
   - Dưới giấy in điện tim, ứng dụng phơi bày nguyên 9 tab hệ thống + danh sách 31 thẻ bệnh lý to lớn.
   - **Hậu quả**: Người dùng phải cuộn qua hơn **3.000px chiều dọc** (khoảng 6-8 lần vuốt tay liên tục) mới duyệt hết danh sách bệnh lý!
3. **Trợ lý 7 bước (`EcgSevenStepAssistant`) chiếm nhiều chỗ**:
   - Dù đã thu gọn thành chip, 7 chip này vẫn chiếm thêm 150px chiều cao ngay dưới giấy in.
4. **Trang Cấp Cứu (`/treatment/[caseId]`) bị xếp chồng tuyến tính**:
   - Đồng hồ đếm ngược + Hồ sơ bệnh nhân chiếm nhiều diện tích, người dùng phải cuộn qua hồ sơ mới tới phần Khám & Ra y lệnh.

---

## 2. Giải Pháp Đột Phá: Mobile Minimalist & Bottom-Sheet Architecture

```
HIỆN TẠI (RƯỜM RÀ, CUỘN 3500px):          SAU KHI TINH GIẢN (GỌN GÀNG, VỪA 1 MÀN HÌNH):
┌───────────────────────────────┐          ┌───────────────────────────────┐
│ Header & Breadcrumb (100px)   │          │ Top Action Strip (40px)       │
├───────────────────────────────┤          ├───────────────────────────────┤
│ Control Deck 4 ô (180px)      │          │                               │
├───────────────────────────────┤          │ GIẤY IN ĐIỆN TIM CHÍNH        │
│ Criteria Filter Bar (140px)   │          │ (MÀN HÌNH CHÍNH LÊN ĐẦU,      │
├───────────────────────────────┤          │  VỪA KHÍT TẦM MẮT 100%)       │
│ GIẤY IN ĐIỆN TIM (Bị đẩy xa)  │          │                               │
├───────────────────────────────┤          ├───────────────────────────────┤
│ Trợ lý 7 bước (150px)         │          │ Thumb Toolbar:                │
├───────────────────────────────┤          │ [❤️ Nhịp Xoang ▼] [⚙️ Cài đặt]│
│ 9 Tabs Hệ thống (120px)       │          └───────────────────────────────┘
├───────────────────────────────┤              │ Bấm vào mở Bottom Sheet
│ 31 THẺ BỆNH LÝ DÀI 3000px     │              ▼
│ (Phải vuốt 8 lần màn hình)    │          ┌───────────────────────────────┐
│ ... ... ... ... ... ... ...   │          │ DRAWER TRƯỢT TỪ DƯỚI LÊN:     │
└───────────────────────────────┘          │ - Tìm kiếm nhanh              │
                                           │ - Lọc 9 hệ thống              │
                                           │ - Chọn bệnh là đóng ngay      │
                                           └───────────────────────────────┘
```

1. **Đưa Màn hình Giả lập lên vị trí Số 1 (Waveform-First)**:
   - Khi vào trang ECG hoặc Buồng cấp cứu, **Màn hình giả lập (Canvas) hiển thị ngay lập tức ở đỉnh màn hình**, không bị đẩy xuống bởi các bảng điều khiển.
2. **Gom các bảng điều khiển thành 1 Thanh Công Cụ Đáy Tối Giản (Single Thumb Toolbar)**:
   - Gom BPM, Tốc độ quét 25/50, Biên độ, Thước Caliper vào **1 nút bấm biểu tượng Cài đặt ⚙️ (Quick Settings Modal / Sheet)**.
3. **Bộ Chọn Bệnh Lý Dạng Drawer Trượt Từ Dưới Lên (Mobile Bottom Sheet Pathology Picker)**:
   - Triệt tiêu hoàn toàn danh sách 31 thẻ bệnh cồng kềnh bên dưới giấy in!
   - Thay thế bằng nút bấm gọn gàng: `[❤️ Tên bệnh lý hiện tại ▼ (Chạm để đổi bệnh)]`.
   - Bấm vào mở Drawer trượt mượt mà với ô tìm kiếm nhanh và 9 icon hệ thống. Bác sĩ chọn bệnh xong là Drawer đóng lại, màn hình trở về trạng thái sạch sẽ tuyệt đối!
4. **Trợ lý 7 bước chuẩn y khoa**:
   - Tích hợp thành nút icon nhỏ gọn `[📋 7 Bước]` hoặc Drawer, không chiếm diện tích màn hình chính.
5. **Buồng Hồi Sức Cấp Cứu (`/treatment/[caseId]`)**:
   - Cho phép thu gọn Hồ sơ bệnh nhân (`PatientBedsideView`) thành 1 dòng tóm tắt sau khi đã đọc để nhường không gian cho Monitor và 5 bước khám/ra y lệnh.

---

## 3. Chi Tiết Các Phase Thực Hiện

| Phase | Tên Giai Đoạn | Mục Tiêu Chính | Trạng Thái | Tiến Độ |
|:-----:|:--------------|:---------------|:----------:|:-------:|
| **01** | [Waveform-First Layout Cho Trang Điện Tim](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0930-mobile-minimalist-redesign/phase-01-waveform-first-ecg-layout.md) | Đưa giấy in ECG lên đầu, loại bỏ các khối header/control che khuất | 🟢 Done | 100% |
| **02** | [Bộ Chọn Bệnh Lý Trượt Drawer (Bottom Sheet Picker)](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0930-mobile-minimalist-redesign/phase-02-mobile-bottom-sheet-pathology-picker.md) | Triệt tiêu danh sách 31 thẻ dài 3000px, thay bằng Bottom Sheet Picker | 🟢 Done | 100% |
| **03** | [Hợp Nhất Bảng Điều Khiển & Trợ Lý 7 Bước Vào Quick Deck](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0930-mobile-minimalist-redesign/phase-03-consolidate-control-decks-and-assistants.md) | Gom BPM, Speed, Amp, Caliper, 7-Step vào popover/sheet gọn gàng | 🟢 Done | 100% |
| **04** | [Buồng Hồi Sức Cấp Cứu: Hồ Sơ Thu Gọn & Tab Tối Giản](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0930-mobile-minimalist-redesign/phase-04-treatment-collapsible-profile-and-tabs.md) | Hồ sơ bệnh nhân Accordion 1 chạm, ưu tiên Monitor và Y lệnh | 🟢 Done | 100% |
| **05** | [Kiểm Thử Tự Động, Đo Chiều Cao Màn Hình & Git Push](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0930-mobile-minimalist-redesign/phase-05-verification-and-device-testing.md) | Kiểm tra giảm 70% chiều cao cuộn trên mobile, 100% tests pass & push | 🟢 Done | 100% |

---

## 4. Cam Kết Kết Quả Sau Khi Tinh Giản
- 🚀 **Chiều cao cuộn trang trên mobile giảm từ ~3.500px xuống còn ~800px (giảm hơn 75% chiều dài trang)**.
- 🎯 **100% màn hình giả lập hiển thị ngay lập tức khi vừa mở trang (Zero-scroll First Fold)**.
- 📱 **Thao tác chuyển bệnh lý trong 1 chạm bằng ngón tay cái thông qua Bottom Sheet**.
