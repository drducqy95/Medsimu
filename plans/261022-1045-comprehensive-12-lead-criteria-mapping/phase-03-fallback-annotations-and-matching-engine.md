# Phase 03: Đồng Bộ Fallback Annotations & Bộ Matcher Canvas

## 1. Mục Tiêu & Cơ Chế Dự Phòng (Resilience)
- `RealisticPinkEcgPaper.tsx` có `FALLBACK_ANNOTATIONS` dùng khi API tải chậm hoặc trong môi trường offline.
- Cần đồng bộ hóa `FALLBACK_ANNOTATIONS` trong `RealisticPinkEcgPaper.tsx` với bộ dữ liệu toàn diện 12 chuyển đạo mới:
  - Phủ đủ toàn bộ 31 bệnh lý.
  - Phủ đủ toàn bộ các tiêu chuẩn từ TC 0 đến TC N của từng bệnh.
- Nâng cấp hàm thông minh `getAnnotationCriterionIndex`:
  - Ưu tiên đọc trực tiếp thuộc tính `ann.criterionIndex`.
  - Nếu thiếu, dùng bộ phân tích ngữ nghĩa (semantic keyword matching) dự phòng để gán chính xác về chỉ số tiêu chuẩn.

---

## 2. Các Đạo Trình Được Đồng Bộ Hóa
- Đảm bảo tên chuyển đạo trong `ann.leadId` luôn đồng nhất với mã hiển thị trên canvas:
  - `DI`, `DII`, `DIII`
  - `aVR`, `aVL`, `aVF`
  - `V1`, `V2`, `V3`, `V4`, `V5`, `V6`
  - `II` / `RHYTHM` (cho dải nhịp Lead II kéo dài ở đáy giấy)

---

## 3. Tiêu Chuẩn Nghiệm Thu
- [ ] Dù API tải thành công hay rơi vào Fallback, khi Bác sĩ click vào tiêu chuẩn nào thì toàn bộ các chuyển đạo liên quan đều hiển thị nhãn ánh xạ chính xác.
