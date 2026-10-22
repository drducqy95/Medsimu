# Phase 06: Verification, Automated Testing & Documentation (Kiểm Thử Tự Động, Xác Minh Y Khoa & Hoàn Tất Kế Hoạch)

Status: ✅ Complete
Dependencies: Phase 01, Phase 02, Phase 03, Phase 04, Phase 05

## 1. Mục Tiêu (Objective)
Đảm bảo chất lượng toàn diện của toàn bộ hệ thống sau khi nâng cấp:
1. Viết bộ kiểm thử tự động toàn diện kiểm tra đầy đủ 31 bệnh lý, tính nhất quán của tọa độ sóng Gaussian, độ chính xác của tiêu chuẩn AHA/ESC, các trường phác đồ xử trí và cạm bẫy.
2. Kiểm tra độ ổn định hiệu năng của Canvas 60 FPS với offscreen caching khi vẽ các dạng sóng phức tạp (Torsades de Pointes, VFib, Brugada).
3. Kiểm tra kiểu TypeScript (`tsc --noEmit`), đảm bảo 0 lỗi.
4. Cập nhật tài liệu dự án, cập nhật `project_progress.json` và tạo trang Wiki quyết định y khoa.

## 2. Kịch Bản Kiểm Thử Tự Động (Test Scenarios)
- **Suite 1: SQLite & Database Integrity**
  - Kiểm tra đủ 31 bệnh lý trong bảng `ecg_diagnoses`.
  - Kiểm tra tất cả các cột JSON đều parse được hợp lệ.
  - Kiểm tra các bệnh lý tối khẩn (`severity === "critical"`) đều có phác đồ cấp cứu và cảnh báo đỏ.
- **Suite 2: Waveform Math & Criteria Mapped Coordinates**
  - Kiểm tra hàm `computeEcgMetrics` không trả về giá trị `NaN` hoặc `Infinity` cho bất kỳ nhịp nào trong số 31 nhịp.
  - Kiểm tra mảng `annotations` của mỗi bệnh lý: tọa độ pha `targetCyclePhase` nằm trong khoảng $[0.0, 1.0]$.
  - Kiểm tra các chuyển đạo bất thường khớp với `leadManifestations`.
- **Suite 3: 7-Step Assistant & Emergency Protocol Accuracy**
  - Kiểm tra bộ phân tích 7 bước trả về đầy đủ 7 bước đánh giá.
  - Kiểm tra danh mục chống chỉ định đỏ bắt đúng các cạm bẫy cấm kỵ (ví dụ: Nitrat trong STEMI thất dưới/phải).
- **Suite 4: Module 3 Synchronization**
  - Kiểm tra hàm chuyển đổi ca bệnh sang buồng cấp cứu tạo ra payload hợp lệ.

## 3. Các Bước Triển Khai (Implementation Steps)
1. [x] Viết bộ test `tests/ecg_comprehensive_clinical.test.js`.
2. [x] Chạy `npm test` và kiểm tra 100% test cases pass.
3. [x] Chạy `npx tsc --noEmit` để xác nhận TypeScript không có lỗi.
4. [x] Cập nhật `project_progress.json`, `.brain/session.json`.
5. [x] Đăng ký Wiki Decision Page về kiến trúc tích hợp lâm sàng ECG.

## 4. Tệp Cần Tạo / Chỉnh Sửa
- `tests/ecg_comprehensive_clinical.test.js`
- `project_progress.json`
- `.brain/session.json`
- `docs/specs/ecg_clinical_guidelines.md`

## 5. Tiêu Chuẩn Nghiệm Thu
- [x] Tất cả các bài kiểm thử tự động đều thành công (PASSED).
- [x] TypeScript biên dịch sạch 100%.
- [x] Hệ thống sẵn sàng cho bác sĩ và sinh viên y khoa trải nghiệm và học tập.
