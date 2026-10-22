# Phase 05: Kiểm Thử Tự Động 100% Tiêu Chuẩn & Đồng Bộ Git

## 1. Kịch Bản Kiểm Thử Tự Động (`tests/comprehensive_12_lead_criteria.test.js`)
1. **Kiểm tra độ phủ 100% tiêu chuẩn chẩn đoán**:
   - Duyệt qua tất cả 31 bệnh lý trong SQLite và Fallback.
   - Xác nhận: **Số tiêu chuẩn có 0 nhãn ánh xạ = 0** (100% tiêu chuẩn đều có nhãn liên kết `criterionIndex`).
2. **Kiểm tra độ phủ đa chuyển đạo**:
   - Đối với các bệnh lý có nhiều chuyển đạo chỉ định (STEMI DII-DIII-aVF, STEMI V1-V4, RBBB V1-V6, Tăng Kali V1-V6...):
     - Xác nhận mảng `annotations` chứa đầy đủ các `leadId` tương ứng.
3. **Kiểm tra dải nhịp Lead II kéo dài**:
   - Dải nhịp Lead II nhận diện đúng nhãn từ `leadId: "II"` hoặc `leadId: "DII"`.
4. **Kiểm tra build & TypeScript**:
   - `npx tsc --noEmit` đạt 0 lỗi.
   - Toàn bộ test suite `npm test` đạt 100% pass (Green).

---

## 2. Đồng Bộ Hóa Git
- Commit toàn bộ thay đổi với thông điệp chuẩn y khoa.
- Push trực tiếp lên repository [drducqy95/Medsimu](https://github.com/drducqy95/Medsimu).
