# Plan: Ánh Xạ Đa Yếu Tố 139 Tiêu Chuẩn, Thước Đo R-R & Biên Độ Chuẩn Y Khoa Kèm Nút Bật/Tắt Tiêu Chuẩn

Created: 2026-10-22T10:52:00+07:00
Status: 🟡 In Progress / Awaiting User Approval
Author: Trinity Architect & System Kernel
Milestone Tracking: Milestone M8 in `project_progress.json`

---

## 1. Bối Cảnh Lâm Sàng & Yêu Cầu Của Bác Sĩ

> *"Với các tiêu chuẩn có đa yếu tố, cần thể hiện đầy đủ, ví dụ P dương ở DI, DII, aVF, âm ở aVR cần thể hiện đầy đủ, soát với tất cả tiêu chuẩn"*
> *"kiểm tra lại thuật toán ánh xạ tiêu chuẩn, ví dụ tiêu chuẩn RR phải đánh dấu và thể hiện được khoảng RR, biên độ phải đánh dấu được biên độ, chứ không chung chung. Bổ sung lại nút bật tắt hiển thị tiêu chuẩn chẩn đoán"*

### 1.1. Vấn Đề Kỹ Thuật & Lâm Sàng Cần Sửa Đổi
1. **Thiếu ánh xạ đa yếu tố (Multi-Factorial Criteria Incomplete)**:
   - Một tiêu chuẩn y khoa thường bao gồm nhiều yếu tố trên nhiều chuyển đạo khác nhau (ví dụ: *"Sóng P âm ở aVR, dương ở DI, DII, aVF"*). Hiện tại hệ thống chỉ gắn 1 nhãn duy nhất tại aVR, khi người dùng bấm chọn thì DI, DII, aVF bị bỏ sót.
   - Khi bác sĩ click vào 1 tiêu chuẩn đa yếu tố, **toàn bộ các chuyển đạo được nhắc tới phải đồng loạt kích hoạt nhãn/thước đo tương ứng**.
2. **53 tiêu chuẩn mồ côi (Zero-Lead Criteria)**:
   - Trong 139 tiêu chuẩn của 31 bệnh lý, có tới 53 tiêu chuẩn chưa được gắn bất kỳ chuyển đạo nào trong CSDL SQLite hoặc dictionary fallback.
   - Cần rà soát 100% và gán đầy đủ chuyển đạo cho tất cả 139 tiêu chuẩn.
3. **Thước đo hình học chính xác thay cho nhãn chung chung**:
   - **Khoảng R-R**: Vẽ thước kẹp calipers `|<── R-R = 800ms (4.0 ô lớn) ──>|` nối trực tiếp giữa 2 đỉnh R liên tiếp (chu kỳ $k$ và $k+1$). Trong Rung nhĩ: vẽ 2 khoảng R-R liên tiếp không đều (`520ms` vs `880ms`).
   - **Khoảng PR / QTc**: Nối từ chân sóng P đến QRS, hoặc QRS đến hết T, ghi rõ ms và số ô.
   - **Biên độ ST / T / S / R**: Vẽ vạch đường đẳng điện **Isoelectric Baseline (0 mV)** ngắt quãng và thước đo chiều dọc `↕ +X.X mm (0.XX mV)` nối từ baseline lên điểm chênh / đỉnh sóng.
4. **Nút Bật/Tắt Khối Tiêu Chuẩn Trên Bản In Giấy Hồng**:
   - Thêm nút bấm `[📋 Tiêu Chuẩn AHA/ESC ▼ / ▲]` trên dải tiêu đề giấy in. Cho phép bác sĩ **Thu gọn** (giấy thông thoáng 100%) hoặc **Mở rộng** (xem & click kích hoạt thước đo caliper).

---

## 2. Kiến Trúc Thuật Toán & Mô Hình Dữ Liệu

### 2.1. Ma Trận Ánh Xạ Đa Yếu Tố (Multi-Factorial Mapping Matrix)

```
Tiêu Chuẩn: "Sóng P âm ở aVR, dương ở DI, DII, aVF" (Normal Sinus Rhythm)
   │
   ├── DI  ──────> [▲ Sóng P dương (+0.12 mV)]
   ├── DII ──────> [▲ Sóng P dương (+0.15 mV)]
   ├── aVF ──────> [▲ Sóng P dương (+0.10 mV)]
   ├── aVR ──────> [▼ Sóng P âm (-0.12 mV)]
   └── Lead II ──> [▲ Sóng P xoang dẫn truyền]
```

```
Tiêu Chuẩn: "ST chênh lên V1-V3 và ST soi gương chênh xuống DII, DIII, aVF" (STEMI Trước Rộng)
   │
   ├── V1, V2, V3 ───> [↕ ST chênh vòm bia mộ +3.5mm đến +5.0mm (từ Baseline 0mV)]
   ├── V4, V5, V6 ───> [↕ ST chênh lên +1.5mm đến +2.5mm]
   └── DII, DIII, aVF ─> [↕ ST chênh xuống soi gương -1.5mm đến -2.0mm]
```

```
Tiêu Chuẩn: "Tam chứng McGinn-White: S sâu ở DI, Q ở DIII, T âm ở DIII" (S1Q3T3 Thuyên Tắc Phổi)
   │
   ├── DI  ──────> [▼ Sóng S sâu 2.0mm (> 1.5mm)]
   ├── DIII ─────> [▼ Sóng Q hoại tử rộng 0.04s + ▼ Sóng T âm đối xứng]
   └── V1-V4 ────> [▼ Sóng T âm do quá tải áp lực thất phải]
```

---

## 3. Lộ Trình 5 Phase Chi Tiết

| Phase | Tên Giai Đoạn | Mục Tiêu Chính | Trạng Thái | Tiến Độ |
|:-----:|:--------------|:---------------|:----------:|:-------:|
| **01** | [Nút Bật/Tắt Hiển Thị Khối Tiêu Chuẩn Trên Giấy Hồng](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1052-multifactorial-criteria-and-calipers/phase-01-criteria-toggle-button.md) | Nút toggle `[📋 Tiêu Chuẩn AHA/ESC ▼/▲]` thu gọn / mở rộng khối tiêu chuẩn | ⬜ Pending | 0% |
| **02** | [Thuật Toán Thước Đo Khoảng (R-R, PR, QTc Calipers)](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1052-multifactorial-criteria-and-calipers/phase-02-interval-caliper-algorithm.md) | Vẽ thước calipers 2 đầu nối chính xác các đỉnh sóng kèm số mili-giây, số ô lớn & BPM | ⬜ Pending | 0% |
| **03** | [Thuật Toán Thước Đo Biên Độ Chiều Dọc (ST Chênh, T Lều, S & R LVH)](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1052-multifactorial-criteria-and-calipers/phase-03-amplitude-dimension-algorithm.md) | Vẽ đường đẳng điện baseline và thước đo chiều dọc `↕ +X.X mm (0.XX mV)` từ baseline | ⬜ Pending | 0% |
| **04** | [Rà Soát & Ánh Xạ Đa Yếu Tố Toàn Diện 139 Tiêu Chuẩn / 31 Bệnh Lý](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1052-multifactorial-criteria-and-calipers/phase-04-multifactorial-12lead-criteria-audit.md) | Thể hiện đầy đủ mọi chuyển đạo cho tiêu chuẩn đa yếu tố, triệt tiêu 53 tiêu chuẩn mồ côi | ⬜ Pending | 0% |
| **05** | [Kiểm Thử Tự Động, Verify Hiển Thị & Git Sync](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1052-multifactorial-criteria-and-calipers/phase-05-verification-and-git-sync.md) | Test tự động kiểm tra calipers, multi-lead coverage, 0 lỗi TypeScript & push GitHub | ⬜ Pending | 0% |

---

## 4. Cam Kết Tiêu Chuẩn Y Khoa
- **Mọi tiêu chuẩn có đa yếu tố (nhắc đến 2 chuyển đạo trở lên) đều kích hoạt đồng thời toàn bộ các chuyển đạo liên quan**.
- **Không có bất kỳ tiêu chuẩn nào trong số 139 tiêu chuẩn bị bỏ trống (0 tiêu chuẩn mồ côi)**.
- **Thước đo khoảng và thước đo biên độ chuẩn milimet và milivolt theo quy chuẩn 25mm/s và 10mm/mV**.
