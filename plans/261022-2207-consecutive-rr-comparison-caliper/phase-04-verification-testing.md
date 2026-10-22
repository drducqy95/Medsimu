# Phase 04: Verification, Automated Testing & Git Sync

Status: ⬜ Pending
Dependencies: Phase 03

## Objective
Kiểm thử toàn diện, đảm bảo không có bất kỳ lỗi hồi quy nào (0 regressions), cập nhật tiến độ và đẩy mã nguồn lên GitHub.

## Tasks
1. Viết bộ kiểm thử chuyên biệt `tests/consecutive_rr_comparison_caliper.test.js`:
   - Xác thực cả 3 mốc thời gian $R_1, R_2, R_3$ tồn tại và liên tục trên dải nhịp.
   - Xác thực khoảng cách $R_2 - R_1 = R_3 - R_2$.
   - Xác thực mốc $R_1, R_2, R_3$ trùng khít với cực trị Gauss của sóng R.
2. Chạy test suite: 100% tests pass.
3. Chạy type-check: `npx tsc --noEmit` đạt 0 lỗi.
4. Chạy production build: `npm run build` thành công.
5. Cập nhật `project_progress.json` đánh dấu Milestone M17 hoàn tất.
6. Commit và push lên GitHub repo.

## Test Criteria
- [ ] 100% unit tests pass.
- [ ] 0 TypeScript compile errors.
- [ ] Next.js static build 13/13 routes pass.
