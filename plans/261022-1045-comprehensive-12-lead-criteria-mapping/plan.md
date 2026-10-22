# Plan: Ánh Xạ Toàn Diện Tiêu Chuẩn Lên Đầy Đủ Các Dãy Đạo Trình (12-Lead Complete Criteria Mapping)

Created: 2026-10-22T10:45:00+07:00
Status: 🟡 In Progress / Awaiting User Approval
Author: Trinity Architect & System Kernel
Milestone Tracking: Milestone M8 in `project_progress.json`

---

## 1. Bối Cảnh Lâm Sàng & Vấn Đề Cần Giải Quyết (Root Cause Analysis)

### 1.1. Yêu Cầu Của Bác Sĩ
> *"Các tiêu chuẩn phải được ánh xạ trên đầy đủ các dãy đạo trình"*

### 1.2. Phân Tích Thực Trạng Mã Nguồn
- **53 tiêu chuẩn chẩn đoán đang có 0 nhãn ánh xạ**: Khi Bác sĩ click vào tiêu chuẩn trên giấy in, một số tiêu chuẩn không hiện bất kỳ nhãn nào trên sóng vì mảng `annotations` trong SQLite/Fallback chưa được khai báo!
- **Ánh xạ thiếu đạo trình**:
  - Tiêu chuẩn ghi: *"ST chênh lên ở DII, DIII, aVF"* nhưng dữ liệu chỉ mới gán nhãn cho `DII`, bỏ sót `DIII` và `aVF` hoặc dải nhịp Lead II.
  - Tiêu chuẩn ghi: *"Sóng Q hoại tử ở DIII, aVF"* nhưng chỉ gán nhãn ở `DIII`, bỏ sót `aVF`.
  - Tiêu chuẩn ghi: *"Sóng T lều nhọn đối xứng ở các chuyển đạo trước ngực"* nhưng chỉ gán ở `V2`, bỏ sót `V1, V3, V4, V5, V6`.
  - Tiêu chuẩn ghi: *"Block nhánh phải: rsR' dạng tai thỏ ở V1, V2; S rộng ở DI, aVL, V6"* nhưng chỉ gán ở `V1`, bỏ sót `V2, DI, aVL, V6`.
  - Tiêu chuẩn ghi: *"Viêm màng ngoài tim: ST chênh lên lan tỏa"* nhưng chỉ gán ở 1-2 chuyển đạo thay vì bao phủ hầu hết các chuyển đạo ngoại vi và trước tim.

---

## 2. Kiến Trúc Giải Pháp: 12-Lead Comprehensive Mapping Engine

```
BẢNG MA TRẬN ÁNH XẠ ĐẦY ĐỦ CÁC DÃY ĐẠO TRÌNH:
┌────────────────────────────────────────────────────────────────────────┐
│ [✓] 1. ST chênh lên dạng vòm ≥ 1mm ở DII, DIII, aVF                    │ (Được click)
├────────────────────────────────────────────────────────────────────────┤
│ GIẤY IN ĐIỆN TIM 12 CHUYỂN ĐẠO:                                        │
│  [DI]                      [aVR]               [V1]             [V4]   │
│                                                                        │
│  [DII] ▲ ST chênh +3.2mm   [aVL]               [V2]             [V5]   │
│                                                                        │
│  [DIII] ▲ ST chênh +3.8mm  [aVF] ▲ ST +3.4mm   [V3]             [V6]   │
│                                                                        │
│  [DẢI LEAD II NHỊP KÉO DÀI] ▲ ST chênh vòm +3.2mm liên tục             │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Chuẩn Hóa Ma Trận 12 Chuyển Đạo Theo Vùng Giải Phẫu**:
   - **Thành dưới (Inferior)**: Đồng bộ gắn nhãn trên `DII`, `DIII`, `aVF` và `Lead II Rhythm Strip`.
   - **Thành bên cao (High Lateral)**: Soi gương trên `DI`, `aVL`.
   - **Trước vách & Mỏm (Anterior/Septal)**: Đồng bộ gắn nhãn trên `V1`, `V2`, `V3`, `V4`.
   - **Thành bên thấp (Low Lateral)**: Đồng bộ trên `V5`, `V6`.
   - **Lan tỏa toàn tim (Metabolic/Pericardial)**: Phủ sóng toàn bộ chuyển đạo trước tim `V1-V6` và chi `DI, DII, aVF`.
2. **100% Tiêu Chuẩn Đều Có Ánh Xạ**:
   - Triệt tiêu hoàn toàn 53 tiêu chuẩn mồ côi (không có nhãn). Mỗi tiêu chuẩn khi Bác sĩ click vào đều kích hoạt nhãn trực quan trên đúng các chuyển đạo tương ứng!

---

## 3. Các Phase Triển Khai Chi Tiết

| Phase | Tên Giai Đoạn | Mục Tiêu Chính | Trạng Thái | Tiến Độ |
|:-----:|:--------------|:---------------|:----------:|:-------:|
| **01** | [Kiểm Kê & Thiết Lập Ma Trận Đạo Trình Toàn Diện](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1045-comprehensive-12-lead-criteria-mapping/phase-01-audit-and-clinical-lead-matrix.md) | Xây dựng ma trận ánh xạ 100% tiêu chuẩn chẩn đoán cho 31 bệnh lý lên đầy đủ các dãy đạo trình | ⬜ Pending | 0% |
| **02** | [Cập Nhật CSDL SQLite & Kịch Bản Seed Dữ Liệu](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1045-comprehensive-12-lead-criteria-mapping/phase-02-sqlite-comprehensive-seed-engine.md) | Nạp toàn bộ annotations đa chuyển đạo vào `data/medsim.db` qua `seed_ecg_comprehensive_diagnoses.js` | ⬜ Pending | 0% |
| **03** | [Đồng Bộ Fallback Annotations & Bộ Matcher Canvas](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1045-comprehensive-12-lead-criteria-mapping/phase-03-fallback-annotations-and-matching-engine.md) | Đồng bộ `FALLBACK_ANNOTATIONS` trong `RealisticPinkEcgPaper.tsx`, đảm bảo chạy mượt cả offline | ⬜ Pending | 0% |
| **04** | [Thuật Toán Chống Đè Lấn Nhãn & Render 12 Chuyển Đạo](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1045-comprehensive-12-lead-criteria-mapping/phase-04-multi-lead-canvas-rendering-and-anti-overlap.md) | Tinh chỉnh hiển thị trên cả 12 ô chuyển đạo và dải nhịp Lead II, triệt tiêu chồng đè | ⬜ Pending | 0% |
| **05** | [Kiểm Thử Tự Động 100% Tiêu Chuẩn & Đồng Bộ Git](file:///d:/Downloads/Archives/GameYhoc/plans/261022-1045-comprehensive-12-lead-criteria-mapping/phase-05-automated-testing-and-git-sync.md) | Test tự động kiểm tra 0 tiêu chuẩn mồ côi, 100% tiêu chuẩn sáng đúng đạo trình & push GitHub | ⬜ Pending | 0% |

---

## 4. Cam Kết Tiêu Chuẩn Y Khoa
- **100% tiêu chuẩn chẩn đoán khi click đều sáng đúng các chuyển đạo tương ứng**.
- **Không còn tiêu chuẩn nào bị bỏ quên không có ánh xạ**.
- **Đầy đủ trên toàn bộ các dãy chuyển đạo: Chuyển đạo mẫu (DI, DII, DIII), chuyển đạo chi tăng cường (aVR, aVL, aVF), chuyển đạo trước ngực (V1 - V6) và Dải nhịp kéo dài (Lead II Strip)**.
