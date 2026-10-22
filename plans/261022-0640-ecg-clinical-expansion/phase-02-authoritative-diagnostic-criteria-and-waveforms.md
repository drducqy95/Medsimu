# Phase 02: Waveform Generators & Dynamic Annotations Mapping (Sinh Sóng Toán Học Gaussian & Ánh Xạ Tiêu Chuẩn Lên 12 Chuyển Đạo)

Status: ✅ Complete
Dependencies: Phase 01

## 1. Mục Tiêu (Objective)
Cập nhật mô hình toán học hàm Gaussian 60 FPS trong `src/domain/simulators/ecgWaveforms.ts` và bộ tính toán `src/domain/simulators/ecgMetricsCalculator.ts` để sinh đúng hình thái sóng cho 11 bệnh lý mới (Block nhánh RBBB/LBBB, Sóng Delta WPW, S1Q3T3 Thuyên tắc phổi, Torsades de Pointes xoay trục quanh đường đẳng điện, Viêm màng ngoài tim cấp ST lõm lòng thuyền, Brugada coved-type, Hạ kali sóng U...). Đồng thời cấu hình mảng annotations ghim nhãn tiêu chuẩn vàng trực quan trên đúng từng chuyển đạo.

## 2. Yêu Cầu Kỹ Thuật (Requirements)
- Định nghĩa các hằng số và tham số sóng Gaussian cho 11 bệnh lý mới:
  - `rbbb`: QRS kéo dài (0.13s), sóng R thứ hai (R') cao hơn R ở V1-V2 (dạng tai thỏ rsR'), sóng S rộng sâu ở DI, aVL, V6.
  - `lbbb`: Mất sóng Q vách liên thất ở I, aVL, V5-V6; QRS dãn rộng (0.14s) có khía ở đỉnh R; ST chênh xuống trái chiều với QRS.
  - `wpw_syndrome`: Khoảng PR cực ngắn (0.09s), sườn dốc lên của R thoai thoải chậm (sóng Delta), QRS dãn rộng 0.12s.
  - `torsades_de_pointes`: Tần số 200-250 bpm, biên độ và cực tính QRS biến đổi hình sin liên tục "xoay quanh trục đẳng điện".
  - `brugada_type1`: ST chênh lên dạng vòm dốc xuống (coved-type) ≥ 2mm nối liền với sóng T âm ở V1-V2.
  - `pulmonary_embolism`: Dấu hiệu S1Q3T3 (sóng S sâu ở DI, sóng Q sâu ở DIII kèm T âm ở DIII), nhịp nhanh xoang 115 bpm, T âm đối xứng từ V1 đến V3.
  - `acute_pericarditis`: ST chênh lên dạng lõm lòng thuyền (concave upward) lan tỏa ở DI, DII, DIII, aVF, V2-V6; đoạn PR chênh xuống; đoạn PR chênh lên ở aVR.
  - `hypokalemia`: Sóng T dẹt/âm, xuất hiện sóng U dương cao sau T (> 1mm) tạo cảm giác khoảng QT giả kéo dài (khoảng QU).
- Gán nhãn `annotations` với đầy đủ `criterionIndex`, `leadId`, `waveComponent`, `targetCyclePhase`, `color`, `badgePlacement`.
- Đảm bảo thuật toán Anti-Collision & Single Focal Beat hoạt động trơn tru với toàn bộ 28 bệnh lý.

## 3. Các Bước Triển Khai (Implementation Steps)
1. [x] Bổ sung các loại nhịp mới vào kiểu dữ liệu `EcgRhythmType` trong `src/domain/simulators/ecgWaveforms.ts`.
2. [x] Viết hàm tính toán thành phần sóng Gaussian cho 11 bệnh lý mới (biên độ P, Q, R, S, T, U, độ lệch chuẩn width, điểm lệch mean).
3. [x] Cập nhật `computeEcgMetrics` trong `src/domain/simulators/ecgMetricsCalculator.ts` để tính đúng PR, QRS, QT/QTc, Trục điện tim cho các bệnh lý mới.
4. [x] Cập nhật `FALLBACK_ANNOTATIONS` trong `RealisticPinkEcgPaper.tsx` để đồng bộ fallback offline khi không kết nối SQLite.

## 4. Tệp Cần Tạo / Chỉnh Sửa
- `src/domain/simulators/ecgWaveforms.ts`
- `src/domain/simulators/ecgMetricsCalculator.ts`
- `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx`

## 5. Tiêu Chuẩn Nghiệm Thu
- [ ] 28 dạng sóng vẽ mượt mà trên Canvas ở tốc độ 60 FPS không giật lag.
- [ ] Các nhãn tiêu chuẩn vàng hiển thị đúng tọa độ vật lý của từng pha sóng (ví dụ: sóng Delta nằm ở pha đầu QRS; S1 nằm ở DI, Q3T3 nằm ở DIII...).
- [ ] Chế độ "Lọc chiếu riêng từng tiêu chuẩn" hoạt động chuẩn xác với các bệnh lý mới.
