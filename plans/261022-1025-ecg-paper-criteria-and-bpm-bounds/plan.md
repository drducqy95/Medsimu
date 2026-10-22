# Plan: Khóa Tần Số Tim Theo Mặt Bệnh, In Tiêu Chuẩn Trực Tiếp Trên Giấy Hồng & Dropdown Bệnh Lý Tối Giản

Created: 2026-10-22T10:25:00+07:00
Status: 🟢 Completed & Verified (All 4 Phases Done)
Author: Trinity Architect & System Kernel
Milestone Tracking: Milestone M7 in `project_progress.json`

---

## 1. Bối Cảnh & Động Lực (User Directives)
Từ phản hồi lâm sàng của Bác sĩ:
1. **Khóa tần số tim theo mặt bệnh (BPM Physiological Bounds)**:
   > *"Phần điều chỉnh tần số tim phải tương ứng với mặt bệnh lý đang hiển thị, không thể nhịp xoang nhanh mà tần số chỉ có 40 được, chỉ cho dao động trong tần số cho phép tương ứng với bệnh lý."*
   - Khắc phục lỗ hổng lâm sàng: Trước đây slider 30-220 bpm áp dụng bừa bãi cho mọi bệnh. Nay mỗi bệnh lý có khoảng giới hạn sinh lý nghiêm ngặt (`minBpm`, `maxBpm`).
2. **In tiêu chuẩn chẩn đoán trực tiếp trên giấy hồng (Direct Embedded Criteria on Pink Paper)**:
   > *"Ghi tiêu chuẩn chẩn đoán trực tiếp trên giấy hồng, cỡ chữ tương đương với thông tin hành chính, mỗi dòng đều có thể click vào được, click dòng sẽ kích hoạt chế độ hiển thị hoặc không hiển thị ánh xạ tiêu chuẩn đó lên đường điện tim. Các tiêu chuẩn mặc định không ánh xạ."*
   - Mô phỏng chính xác bản in máy ECG lâm sàng bệnh viện (GE MAC, Philips PageWriter, Nihon Kohden).
   - Chữ monospace chuẩn in y tế, cỡ chữ tương đương dải hành chính (`text-[9.5px]` - `text-[10px]`).
   - **Mặc định khi xem bệnh:** Đường sóng điện tim hiển thị hoàn toàn sạch sẽ, KHÔNG có nhãn hay mũi tên ánh xạ che khuất (giúp bác sĩ/học viên rèn luyện kỹ năng tự đọc điện tim thực tế).
   - **Tương tác theo nhu cầu:** Mỗi dòng tiêu chuẩn in trên giấy là một công tắc tương tác: Click vào dòng nào thì nhãn ánh xạ của riêng tiêu chuẩn đó mới xuất hiện trên sóng; click lần nữa sẽ ẩn đi.
3. **Bỏ các block thừa, gây rối mắt (Declutter Redundant External Panels)**:
   > *"Bỏ các block thừa, gây rối mắt."*
   - Triệt tiêu toàn bộ panel chẩn đoán rời rạc bên ngoài, dải lọc tiêu chuẩn bay lơ lửng, trả lại màn hình sạch sẽ, trang nhã.
4. **Chuyển danh mục bệnh lý sang dạng Dropdown List**:
   > *"Chuyển danh mục bệnh lý sang dạng dropdown list"*
   - Thay thế toàn bộ khối 31 thẻ bệnh lý bằng một **Dropdown Select phân nhóm theo 9 hệ thống lâm sàng** siêu gọn (chiếm đúng 1 dòng ~40px).

---

## 2. Kiến Trúc Giải Pháp & Sơ Đồ Thiết Kế

```
GIAO DIỆN MỚI CỦA TRANG ĐIỆN TIM (SẠCH SẼ, CHUẨN Y KHOA BỆNH VIỆN):
┌────────────────────────────────────────────────────────────────────────┐
│ [← Quay lại]  [📋 Dropdown Chọn Bệnh Lý: 9 Hệ Thống ▼]  [⚙️] [🔊] [🚨]  │ (1 hàng duy nhất ~42px)
├────────────────────────────────────────────────────────────────────────┤
│ Tần số tim: [──●──────] 125 BPM (Khoảng cho phép: 101 - 160 BPM)       │ (Tự động khóa theo bệnh)
├────────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ 📋 BV ĐA KHOA TRUNG ƯƠNG • KHOA TIM MẠCH                           │ │
│ │ BN: NGUYỄN VĂN A • 58T • NAM • TỐC ĐỘ: 25mm/s • BIÊN ĐỘ: 10mm/mV   │ │
│ │ ────────────────────────────────────────────────────────────────── │ │
│ │ KẾT LUẬN: NHỒI MÁU CƠ TIM THÀNH DƯỚI CẤP (STEMI DII, DIII, aVF)    │ │
│ │ [ ] 1. ST chênh lên dạng vòm >= 1mm ở DII, DIII, aVF (Click để xem)│ │
│ │ [ ] 2. ST chênh xuống soi gương ở DI, aVL (Click để xem)            │ │
│ │ [ ] 3. Sóng Q hoại tử rộng >= 0.04s ở DIII, aVF (Click để xem)      │ │
│ │ (Mặc định không ánh xạ - Click vào từng dòng để đối chiếu trên sóng)│ │
│ │ ────────────────────────────────────────────────────────────────── │ │
│ │ [ SÓNG ĐIỆN TIM 12 CHUYỂN ĐẠO & DẢI LEAD II CHẠY MƯỢT MÀ 60 FPS ]  │ │
│ │                                                                    │ │
│ └────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Các Phase Triển Khai Chi Tiết

| Phase | Tên Giai Đoạn | Mục Tiêu Chính | Trạng Thái | Tiến Độ |
|:-----:|:--------------|:---------------|:----------:|:-------:|
| **01** | [Giới Hạn Tần Số Tim Chuẩn Sinh Lý Cho 31 Bệnh Lý](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1025-ecg-paper-criteria-and-bpm-bounds/phase-01-pathology-bpm-bounds.md) | Bổ sung `allowedBpmRange` [min, max] chuẩn y khoa cho 31 bệnh; khóa slider tự động | 🟢 Done | 100% |
| **02** | [In Tiêu Chuẩn Trực Tiếp Trên Giấy Hồng & Click Ánh Xạ](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1025-ecg-paper-criteria-and-bpm-bounds/phase-02-pink-paper-criteria-direct-printing.md) | In tiêu chuẩn font mono tương đương hành chính; click dòng bật/tắt ánh xạ trên sóng | 🟢 Done | 100% |
| **03** | [Chuyển Danh Mục Bệnh Lý Sang Dropdown List & Xóa Khối Thừa](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1025-ecg-paper-criteria-and-bpm-bounds/phase-03-dropdown-rhythm-catalog-and-declutter.md) | Tạo Grouped Dropdown List 9 hệ thống; gỡ bỏ các block ngoài gây rối mắt | 🟢 Done | 100% |
| **04** | [Kiểm Thử Tự Động, Đánh Giá Y Khoa & Git Push](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1025-ecg-paper-criteria-and-bpm-bounds/phase-04-verification-and-clinical-testing.md) | Viết bộ test xác thực BPM bounds, click toggle criteria và push GitHub | 🟢 Done | 100% |

---

## 4. Cam Kết Tiêu Chuẩn Y Khoa
- **Tuyệt đối không có chuyện Nhịp nhanh xoang mà 40 bpm hay Nhịp chậm xoang mà 150 bpm**.
- **Tiêu chuẩn chẩn đoán in đồng bộ trên giấy hồng chuẩn máy in EMR bệnh viện**.
- **Không còn các khối lỉnh kỉnh che khuất không gian quan sát sóng**.
