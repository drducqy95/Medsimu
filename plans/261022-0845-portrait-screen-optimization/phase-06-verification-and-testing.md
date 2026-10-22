# Phase 06: Kiểm Thử Tự Động & Xác Thực Quy Chuẩn Y Khoa (Verification & Testing)

Status: ⬜ Pending
Dependencies: Phase 01, Phase 02, Phase 03, Phase 04, Phase 05

---

## 1. Mục Tiêu (Objective)
Tiến hành kiểm thử tự động toàn bộ ứng dụng trên các kích thước màn hình dọc phổ biến, xác minh tính toàn vẹn của mô phỏng y khoa (ECG, Siêu âm, X-quang, CT, Cấp cứu) và đẩy mã nguồn hoàn chỉnh lên GitHub repository `drducqy95/Medsimu`.

---

## 2. Kịch Bản Kiểm Thử & Ma Trận Thiết Bị (Device Matrix)

### 2.1. Ma Trận Kích Thước Màn Hình Dọc (Portrait Viewports)
| Thiết Bị Đại Diện | Độ Phân Giải (CSS Pixels) | Tiêu Chí Kiểm Tra |
|:-----------------|:-------------------------:|:------------------|
| **iPhone SE / 8** | `375 x 667` | Màn hình siêu nhỏ: không tràn viền, text không bị cắt, bottom nav hiển thị chuẩn |
| **iPhone 14 / 15 / 16** | `393 x 852` | Màn hình chuẩn có Dynamic Island: ECG Portrait mode hiển thị sắc nét |
| **Samsung Galaxy S23/S24** | `360 x 780` | Màn hình Android hẹp: Canvas tự co giãn, không bị méo tỉ lệ |
| **iPad Portrait** | `768 x 1024` | Tablet dọc: Chuyển đổi linh hoạt giữa giao diện mobile và tablet |

### 2.2. Kiểm Thử Nghiệp Vụ Y Khoa (Medical Integrity Checks)
- [ ] Tính toán toán học sóng điện tim (BPM, PR, QRS, QTc theo Bazett) bảo toàn độ chính xác 100% trong cả 3 chế độ xem (A4, Portrait Grid, Lead Focus).
- [ ] 31 bệnh lý điện tim đồ và 9 hệ thống hiển thị chính xác các nhãn tiêu chuẩn vàng ST chênh, T âm, PR kéo dài.
- [ ] Luồng cấp cứu ngừng tuần hoàn (Code Blue / Sốc điện 200J) hoạt động chuẩn xác theo hướng dẫn AHA 2025.
- [ ] Toàn bộ 14 bài unit tests hiện có trong thư mục `tests/` vượt qua 100%.
- [ ] Bổ sung bài unit test mới `tests/portrait-responsive.test.js` kiểm tra các component responsive cho màn hình dọc.

---

## 3. Các Bước Thực Hiện
1. Viết test case `tests/portrait-responsive.test.js`.
2. Chạy kiểm thử tự động `npm test`.
3. Kiểm tra biên dịch TypeScript `npx tsc --noEmit`.
4. Cập nhật `project_progress.json` đánh dấu Milestone M5 hoàn tất.
5. Commit git và push lên `https://github.com/drducqy95/Medsimu.git`.

---

## 4. Tiêu Chí Nghiệm Thu (Acceptance Criteria)
- [ ] Toàn bộ test suites pass (15/15 tests).
- [ ] 0 lỗi TypeScript compiler (`npx tsc --noEmit`).
- [ ] Mã nguồn đã được push lên branch `main` của repository GitHub.
