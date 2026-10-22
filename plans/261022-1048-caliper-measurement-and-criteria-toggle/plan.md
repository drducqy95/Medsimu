# Plan: Thuật Toán Ánh Xạ Thước Đo R-R & Biên Độ Chuẩn Y Khoa Kèm Nút Bật/Tắt Tiêu Chuẩn

Created: 2026-10-22T10:48:00+07:00
Status: 🟡 In Progress / Awaiting User Approval
Author: Trinity Architect & System Kernel
Milestone Tracking: Milestone M9 in `project_progress.json`

---

## 1. Bối Cảnh Lâm Sàng & Yêu Cầu Của Bác Sĩ

> *"kiểm tra lại thuật toán ánh xạ tiêu chuẩn, ví dụ tiêu chuẩn RR phải đánh dấu và thể hiện được khoảng RR, biên độ phải đánh dấu được biên độ, chứ không chung chung. Bổ sung lại nút bật tắt hiển thị tiêu chuẩn chẩn đoán"*

### 1.1. Vấn Đề Kỹ Thuật & Lâm Sàng Cần Sửa Đổi
1. **Ánh xạ chung chung, thiếu thước đo hình học (Caliper & Dimension Markings)**:
   - Trước đây: Tiêu chuẩn R-R hoặc biên độ ST chỉ hiển thị một badge chữ bay lơ lửng, không có thước đo thực tế nối 2 đỉnh R hoặc đo độ chênh từ đường đẳng điện.
   - Bác sĩ yêu cầu:
     - **Khoảng R-R**: Phải vẽ thước đo calipers 2 đầu `|<──────── R-R = 800ms (4 ô lớn) ────────>|` nối trực tiếp từ đỉnh R chu kỳ 1 sang đỉnh R chu kỳ 2! Trong Rung nhĩ: thể hiện 2 khoảng R-R liên tiếp không đều (`R-R: 520ms` vs `R-R: 880ms`).
     - **Khoảng PR**: Phải vẽ thước đo `|<── PR = 240ms (> 200ms) ──>|` từ khởi đầu sóng P đến khởi đầu phức bộ QRS.
     - **Biên độ ST (ST Elevation / Depression)**: Phải vẽ thước đo chiều dọc `↕ +3.5mm` đo khoảng cách từ **Đường đẳng điện (Isoelectric Baseline)** lên đến điểm J / đoạn ST!
     - **Biên độ S và R trong Phì Đại Thất Trái (Sokolow-Lyon)**: Vẽ thước đo chiều dọc độ sâu sóng S ở V1 (`↕ S = 22mm`) và chiều cao sóng R ở V5 (`↕ R = 18mm`), thể hiện tổng $> 35\text{mm}$.
     - **Biên độ sóng T lều trong Tăng Kali Máu**: Vẽ thước đo chiều cao từ đẳng điện lên đỉnh sóng T `↕ T = 12mm (> 10mm)`.
2. **Khôi phục nút bật/tắt hiển thị tiêu chuẩn chẩn đoán**:
   - Thêm nút bấm chuyên dụng: `[📋 Tiêu Chuẩn Chẩn Đoán (AHA/ESC) ▼ / ▲]` trên dải tiêu đề giấy in.
   - Bác sĩ có thể bấm để **Thu gọn** (giúp giấy in hoàn toàn thông thoáng 100%) hoặc **Mở rộng** (để đọc từng tiêu chuẩn và click dòng kích hoạt thước đo caliper tương ứng trên sóng).

---

## 2. Kiến Trúc Thuật Toán Đo Lường Hình Học (Geometric Dimension Engine)

```
1. THƯỚC ĐO KHOẢNG R-R (HORIZONTAL R-R CALIPER):
      R1                                    R2
      ▲                                     ▲
      │                                     │
      ├───────────────── R-R ───────────────┤
      │   |<────── 800 ms (4 ô lớn) ──────>|   │
      │                                     │
───P──┴──S──────────T───────────P──┴──S──────────T─── (Đường điện tim)

2. THƯỚC ĐO BIÊN ĐỘ ST (VERTICAL ST DISPLACEMENT CALIPER):
                    ST Segment
                    ─────●─────
                         │  ▲
                         │  │ +3.5 mm (0.35 mV)
   Đường Đẳng Điện ──────┼──▼───────────────── (Isoelectric Baseline)
                         │ J-point
```

---

## 3. Các Phase Triển Khai Chi Tiết

| Phase | Tên Giai Đoạn | Mục Tiêu Chính | Trạng Thái | Tiến Độ |
|:-----:|:--------------|:---------------|:----------:|:-------:|
| **01** | [Khôi Phục Nút Bật/Tắt Hiển Thị Tiêu Chuẩn Trên Giấy Hồng](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1048-caliper-measurement-and-criteria-toggle/phase-01-criteria-toggle-button.md) | Thêm nút toggle `[📋 Tiêu Chuẩn AHA/ESC ▼/▲]` thu gọn / mở rộng khối tiêu chuẩn | ⬜ Pending | 0% |
| **02** | [Thuật Toán Thước Đo Khoảng (R-R, PR, QTc Intervals)](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1048-caliper-measurement-and-criteria-toggle/phase-02-interval-caliper-algorithm.md) | Vẽ thước đo calipers nối chính xác 2 đỉnh R hoặc P-QRS với số đo ms và số ô lớn | ⬜ Pending | 0% |
| **03** | [Thuật Toán Thước Đo Biên Độ (ST Chênh, T Lều, S & R LVH)](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1048-caliper-measurement-and-criteria-toggle/phase-03-amplitude-dimension-algorithm.md) | Vẽ đường đẳng điện baseline và thước đo biên độ chiều dọc `↕ +X.X mm` từ baseline | ⬜ Pending | 0% |
| **04** | [Ánh Xạ Đầy Đủ Các Dãy Đạo Trình Cho Toàn Bộ 31 Bệnh Lý](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1048-caliper-measurement-and-criteria-toggle/phase-04-12-lead-territory-mapping.md) | Đảm bảo mỗi tiêu chuẩn ánh xạ đồng thời trên toàn bộ các đạo trình giải phẫu | ⬜ Pending | 0% |
| **05** | [Kiểm Thử Tự Động, Đánh Giá Hiển Thị & Git Sync](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1048-caliper-measurement-and-criteria-toggle/phase-05-verification-and-git-sync.md) | Viết test kiểm tra caliper R-R, biên độ ST, nút toggle criteria & push GitHub | ⬜ Pending | 0% |

---

## 4. Cam Kết Tiêu Chuẩn Y Khoa
- **Thước đo khoảng R-R, PR thực sự đo đạc giữa 2 mốc sóng, ghi rõ số mili-giây và số ô trên giấy in**.
- **Thước đo biên độ ST thực sự đo từ đường đẳng điện baseline lên điểm chênh, ghi rõ milimet (mm) và điện thế (mV)**.
- **Bác sĩ có toàn quyền bật/tắt hiển thị khối tiêu chuẩn chỉ bằng 1 nút bấm trực quan**.
