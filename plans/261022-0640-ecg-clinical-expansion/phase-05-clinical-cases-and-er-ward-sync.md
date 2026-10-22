# Phase 05: Clinical Patient Cases & Module 3 ER Ward Sync (Kết Nối Hồ Sơ Ca Bệnh Mẫu & Buồng Cấp Cứu Module 3)

Status: ✅ Complete
Dependencies: Phase 01, Phase 04

## 1. Mục Tiêu (Objective)
Hiện thực hóa tính liên thông giữa **Module 2 (Diagnostic Lab - ECG Simulator)** và **Module 3 (Clinical ER Ward - Buồng Cấp Cứu)**:
1. Mỗi dạng nhịp bệnh lý trên ECG đều đi kèm một **Hồ sơ ca bệnh lâm sàng mẫu (Clinical Case Vignette)** với danh tính bệnh nhân, tuổi, giới tính, lý do vào viện, bệnh sử, dấu hiệu sinh tồn và xét nghiệm cận lâm sàng.
2. Thêm nút hành động: **"🚨 Chuyển Bệnh Nhân Này Vào Buồng Cấp Cứu (Module 3)"** ngay trên ECG Simulator, cho phép nạp trực tiếp dữ liệu ca bệnh vào phiên cấp cứu thực tế.

## 2. Yêu Cầu Kỹ Thuật (Requirements)
- Cập nhật Store điều phối cấp cứu (`src/store/` hoặc `useTreatmentStore` / `useErWardStore`) để nhận payload ca bệnh từ ECG.
- Truyền đúng các tham số:
  - Tên bệnh nhân, tuổi, giới tính, mã hồ sơ bệnh án
  - Sinh hiệu đầu vào: Huyết áp, Nhịp tim, Nhịp thở, SpO2, Tri giác GCS
  - Kết quả điện tim đồ ban đầu (mang theo dải ECG tương ứng)
  - Kết quả men tim Troponin I/T siêu nhạy, điện giải đồ K+/Na+
  - Danh mục y lệnh khẩn cấp đề xuất và bộ lọc chống chỉ định an toàn (Safety Guard contraindication checks)
- Điều hướng mượt mà sang `/treatment` hoặc `/simulators/er-ward` với trạng thái ca bệnh đã sẵn sàng.

## 3. Các Bước Triển Khai (Implementation Steps)
1. [x] Kiểm tra và cập nhật State Store của Module 3 (`src/store/erWardStore.ts` hoặc tương đương) để hỗ trợ nhận ca bệnh động từ ECG.
2. [x] Viết hàm chuyển đổi dữ liệu từ `patient_case_json` của `ecg_diagnoses` sang định dạng Patient Case của Buồng cấp cứu.
3. [x] Thêm nút CTA chuyển viện/cấp cứu vào `RealisticPinkEcgPaper.tsx` và `EcgSimulatorPage.tsx`.
4. [x] Kiểm tra luồng cấp cứu từ ECG sang Buồng Cấp Cứu Module 3, đảm bảo monitor hiển thị đúng dạng sóng và sinh hiệu.

## 4. Tệp Cần Tạo / Chỉnh Sửa
- `src/components/treatment/TransferredEcgPatientBanner.tsx`
- `src/components/simulators/ecg/EcgClinicalDeckModal.tsx`
- `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx`
- `src/app/simulators/ecg/page.tsx`
- `src/app/treatment/page.tsx`

## 5. Tiêu Chuẩn Nghiệm Thu
- [x] Bấm nút "Chuyển Bệnh Nhân Vào Buồng Cấp Cứu" chuyển trang thành công và nạp đúng thông tin bệnh nhân.
- [x] Monitor buồng cấp cứu Module 3 phản ánh chính xác nhịp tim và dạng sóng từ ca bệnh ECG đã chọn.
