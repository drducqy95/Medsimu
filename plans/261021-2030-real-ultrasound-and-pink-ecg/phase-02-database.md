# Phase 02: Realistic Pink ECG Paper - Giấy Kẻ Điện Tim Màu Hồng 12 Đạo Trình Chuẩn

Status: ⬜ Pending
Dependencies: None

## Objective
Xây dựng bộ hiển thị và in ấn Điện tâm đồ chuẩn 12 đạo trình trên nền **giấy kẻ điện tim màu hồng y tế thật** (Medical Pink Millimeter Grid Paper), tái hiện chính xác bố cục bản in của các dòng máy đo điện tim chuyên dụng (Philips, GE, Nihon Kohden, Fukuda Denshi) với đầy đủ thông số kỹ thuật, thông số đo tự động và kết luận lâm sàng.

## Requirements

### Functional
- [ ] **Lưới giấy kẻ màu hồng chuẩn y tế (Pink Millimeter Grid Paper):**
  - Màu nền: Hồng phấn y tế (`#fff1f2` hoặc `#fff5f5`).
  - Lưới ô nhỏ $1mm \times 1mm$ kẻ nét thanh màu đỏ hồng (`#fda4af` / `#f43f5e`).
  - Lưới ô lớn $5mm \times 5mm$ kẻ nét đậm màu hồng đậm (`#f43f5e` / `#e11d48`).
  - Tỷ lệ chuẩn: $25 mm/s$ (trục ngang, mỗi ô nhỏ = $0.04s$, ô lớn = $0.20s$) và $10 mm/mV$ (trục dọc, mỗi ô nhỏ = $0.1mV$, ô lớn = $0.5mV$).
- [ ] **Bố cục 12 Đạo trình Hoàn chỉnh (Standard 12-Lead Clinical Layout):**
  - Ma trận $4 \times 3$ chuẩn quốc tế:
    - Cột 1: I, II, III
    - Cột 2: aVR, aVL, aVF
    - Cột 3: V1, V2, V3
    - Cột 4: V4, V5, V6
  - **Đạo trình nhịp kéo dài (Long Rhythm Strip Lead II):** Chạy liên tục từ đầu đến cuối trang ở dải đáy nhằm phân tích toàn diện nhịp xoang và ngoại tâm thu.
  - **Xung chuẩn độ (1mV Calibration Pulse):** Hình chữ nhật $10mm \times 5mm$ ($1mV \times 0.2s$) in ở đầu mỗi dải đạo trình.
- [ ] **Tiêu đề Hành chính & Thông số Kỹ thuật In ấn Giống Thật:**
  - Tiêu đề cơ sở: `BỆNH VIỆN ĐA KHOA TRUNG ƯƠNG - TRUNG TÂM TIM MẠCH QUỐC GIA`
  - Hành chính người bệnh: Họ tên bệnh nhân, Tuổi, Giới tính, Mã hồ sơ, Ngày giờ đo.
  - Cấu hình máy ghi: `Tốc độ: 25 mm/s | Biên độ: 10 mm/mV | Lọc thông thấp: 150 Hz | Lọc thông cao: 0.05 Hz | Lọc nguồn xoay chiều AC: 50 Hz`.
  - Kết quả đo tự động máy (Automated Metrics):
    - Nhịp tim (HR): `xx bpm`
    - Khoảng PR: `xxx ms` (Chuẩn: 120 - 200 ms)
    - Độ rộng phức bộ QRS: `xx ms` (Chuẩn: 80 - 120 ms)
    - Khoảng QT / QTc (Bazett): `xxx / xxx ms`
    - Trục điện tim P - QRS - T: `xx° / xx° / xx°`
  - Đọc tự động kết luận (Machine Diagnostic Statement): VD: `Nhịp xoang đều 75 l/p, Đoạn ST chênh lên dạng vòm 3mm ở DII, DIII, aVF - THEO DÕI NHỒI MÁU CƠ TIM CẤP THÀNH DƯỚI`.
  - Vị trí ký duyệt của Bác sĩ chuyên khoa Tim mạch.
- [ ] **Chức năng Tương tác:**
  - Chuyển đổi qua lại giữa:
    - Chế độ **Màn hình Monitor cấp cứu ban đêm (Black Dark Monitor)**
    - Chế độ **Tờ giấy in điện tim màu hồng (Realistic Pink Paper)**
  - Nút **In bản ghi (Print)** / **Tải ảnh giấy in (Export PNG/PDF)**.

### Non-Functional
- [ ] Tỷ lệ lưới và biên độ sóng tuyệt đối chính xác với chuẩn điện sinh lý tim.
- [ ] Sóng vẽ nét mực đen mượt mà sắc nét trên nền giấy hồng, không răng cưa.

## Implementation Steps
1. [ ] Xây dựng thuật toán tính toán các thông số PR, QRS, QT, QTc, Trục điện tim trong `src/domain/simulators/ecgMetricsCalculator.ts`.
2. [ ] Xây dựng Component `RealisticPinkEcgPaper.tsx` trên Canvas/SVG.
3. [ ] Tích hợp vào trang `/simulators/ecg/page.tsx` cho phép chọn hiển thị giấy hồng toàn màn hình và in ấn.

## Files to Create/Modify
- `src/domain/simulators/ecgMetricsCalculator.ts`
- `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx`
- `src/app/simulators/ecg/page.tsx`

---
Next Phase: [Phase 03: Real Ultrasound Workstation](file:///d:/Downloads/Archives/GameYhoc/plans/261021-2030-real-ultrasound-and-pink-ecg/phase-03-backend.md)
