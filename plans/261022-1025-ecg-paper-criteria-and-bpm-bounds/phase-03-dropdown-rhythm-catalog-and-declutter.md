# Phase 03: Chuyển Danh Mục Bệnh Lý Sang Dropdown List & Xóa Khối Thừa

## 1. Yêu Cầu Từ Bác Sĩ
> *"Bỏ các block thừa, gây rối mắt. Chuyển danh mục bệnh lý sang dạng dropdown list"*

---

## 2. Thiết Kế Dropdown List Chọn Bệnh Lý (`EcgPathologySelectDropdown.tsx`)
- Tạo component chuyên dụng: `src/components/simulators/ecg/EcgPathologySelectDropdown.tsx`.
- Giao diện:
  - Một Dropdown Select / Combobox chuyên nghiệp, hỗ trợ:
    - Gom nhóm theo **9 Phân Hệ Lâm Sàng (AHA/ESC)**:
      - `1. Bệnh Lý Nút Xoang (3 bệnh)`
      - `2. Hội Chứng Mạch Vành Cấp (5 bệnh)`
      - `3. Rối Loạn Dẫn Truyền & Block (7 bệnh)`
      - `4. Loạn Nhịp Trên Thất (4 bệnh)`
      - `5. Loạn Nhịp Thất Nguy Kịch (5 bệnh)`
      - `6. Phì Đại Buồng Tim (1 bệnh)`
      - `7. Rối Loạn Điện Giải (2 bệnh)`
      - `8. Bệnh Lý Màng Ngoài Tim & Độc Chất (3 bệnh)`
      - `9. Bệnh Di Truyền & Kênh Ion (1 bệnh)`
    - Từng tùy chọn bệnh hiển thị:
      - Tên tiếng Việt rõ ràng
      - Badge: `[CẤP CỨU]` (cho VT, VF, Asystole, STEMI, Brugada, Rung thất)
      - Khoảng BPM cho phép: `[Ví dụ: 101-160 bpm]`
- Vị trí đặt:
  - Đặt ngay trên thanh công cụ trên cùng (Top Action Bar), chiếm đúng **1 dòng mỏng (cao ~40px)**!
  - Cả người dùng Desktop và Mobile đều chọn bệnh trực tiếp từ dropdown này chỉ trong 1 chạm.

---

## 3. Loại Bỏ Các Khối Thừa Gây Rối Mắt (Decluttering)
Vì tiêu chuẩn chẩn đoán đã in trực tiếp trên giấy hồng và danh mục bệnh lý đã chuyển thành Dropdown List gọn gàng:
1. **Loại bỏ**:
   - Khối bảng lọc tiêu chuẩn lơ lửng ngoài giấy in (`selectedCriterion !== "all"`).
   - Panel tiêu chuẩn chẩn đoán to lớn (`showCriteriaPanel`) nằm đè lên trang.
   - Khối lưới 31 thẻ bệnh lý cồng kềnh dưới chân trang.
   - Khối 9 tab hệ thống chiếm chỗ.
2. **Giữ lại**:
   - Giấy in điện tim chuẩn mực y tế.
   - Thanh Micro Header kèm Dropdown chọn bệnh lý.
   - Thanh điều khiển BPM (bị khóa theo khoảng bệnh) và Tốc độ 25/50, Biên độ 10, Caliper.
   - Nút mở Phác đồ cấp cứu khẩn cấp (`EcgClinicalDeckModal`) khi bác sĩ cần xem xử trí.

---

## 4. Tiêu Chuẩn Nghiệm Thu
- [ ] Danh mục 31 bệnh lý nằm trong 1 Dropdown List duy nhất, phân nhóm theo 9 hệ thống.
- [ ] Không còn bất kỳ block thừa nào chiếm chỗ bên dưới hoặc lơ lửng ngoài giấy in.
- [ ] Màn hình giả lập điện tim sáng sủa, trang nhã, không còn cảm giác rườm rà.
