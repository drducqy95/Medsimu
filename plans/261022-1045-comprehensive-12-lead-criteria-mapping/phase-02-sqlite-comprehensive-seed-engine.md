# Phase 02: Cập Nhật CSDL SQLite & Kịch Bản Seed Dữ Liệu

## 1. Mục Tiêu & Phạm Vi
- Nạp lại toàn bộ dữ liệu tiêu chuẩn và ánh xạ chuyển đạo đầy đủ vào bảng `ecg_diagnoses` trong CSDL SQLite (`data/medsim.db`).
- Nâng cấp file kịch bản seed: `scripts/seed_ecg_comprehensive_diagnoses.js`.
- Đảm bảo mỗi bệnh lý có đầy đủ mảng `annotations` với:
  - `leadId`: Tên chuyển đạo chuẩn (`DI`, `DII`, `DIII`, `aVR`, `aVL`, `aVF`, `V1`, `V2`, `V3`, `V4`, `V5`, `V6`, `II` cho rhythm strip).
  - `waveComponent`: Thành phần sóng (`P`, `PR`, `Q`, `QRS`, `ST`, `T`, `U`, `RR`).
  - `label`: Nhãn y khoa rõ ràng, có mũi tên định hướng (`▲ ST chênh +3.2mm`, `▼ ST soi gương -1.8mm`, `↔ PR dài 240ms`, `~ Sóng f lăn tăn`).
  - `targetCyclePhase`: Vị trí pha trong chu kỳ tim (0.0 đến 1.0).
  - `color`: Màu chỉ thị y khoa (Đỏ rose `#e11d48` cho ST chênh lên/cấp cứu, Xanh lam `#2563eb` cho soi gương/ST chênh xuống, Vàng cam `#d97706` cho PR/khoảng đo, Tím `#9333ea` cho sóng Q, Xanh lục `#059669` cho sóng xoang).
  - `criterionIndex`: Chỉ số liên kết trực tiếp với tiêu chuẩn (0, 1, 2, ...).
  - `badgePlacement`: Vị trí gắn badge (`top`, `bottom`, `interval`).

---

## 2. Quy Trình Cập Nhật Dữ Liệu
1. Viết kịch bản nâng cấp `scripts/seed_ecg_comprehensive_diagnoses.js`.
2. Chạy kịch bản nạp lại vào `data/medsim.db`:
   ```bash
   node scripts/seed_ecg_comprehensive_diagnoses.js
   ```
3. Xác nhận qua truy vấn SQL:
   - Tổng số bệnh lý: 31/31.
   - Số tiêu chuẩn có 0 nhãn ánh xạ: **0** (Giảm từ 53 về 0).
   - Trung bình mỗi tiêu chuẩn liên kết với 2 - 5 chuyển đạo.

---

## 3. Tiêu Chuẩn Nghiệm Thu
- [ ] Bảng `ecg_diagnoses` trong SQLite chứa toàn bộ annotations liên kết chính xác với `criterionIndex`.
- [ ] API `/api/simulators/ecg/diagnoses/[id]` trả về đầy đủ mảng annotations đa chuyển đạo.
