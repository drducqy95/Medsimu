# Phase 04: Multi-Lead Automated Verification & Regression Testing

## Mục tiêu
Đảm bảo chất lượng toàn diện, không có lỗi hồi quy (zero regression) cho toàn bộ hệ thống mô phỏng ECG:
1. **Bộ kiểm thử tự động `tests/consecutive_rr_multilead_precision.test.js`**:
   - Kiểm tra mốc đỉnh sóng R toán học tại các mức BPM khác nhau ($60, 75, 100\,\text{bpm}$) luôn bắt dính đỉnh sóng thật với sai số $< 1\text{ms}$.
   - Kiểm tra thuật toán dựng thước kép trên cả 12 chuyển đạo: $R_1 \rightarrow R_2$ và $R_2 \rightarrow R_3$ nối liền mạch tại đỉnh $R_2$, không đè chữ, không xuất phát ngoài viền.
   - Kiểm tra chu kỳ Wenckebach: $R-R_1 = 970\text{ms} > R-R_2 = 890\text{ms}$ (ngắn dần thực tế trên hàm sóng).
   - Kiểm tra sự hiện diện của các điểm chấm Pinpoint Dots tại đỉnh sóng R trên canvas.
2. **Kiểm thử toàn bộ hệ sinh thái dự án**:
   - Chạy `npm test` xác nhận 57/57 tests pass 100%.
   - Chạy `npx tsc --noEmit` xác nhận 0 lỗi TypeScript.
   - Chạy `npm run build` xác nhận 13/13 static routes Next.js compile thành công.
3. **Cập nhật tiến độ & Git Synchronization**:
   - Cập nhật `project_progress.json` với Milestone M19.
   - Commit và push lên GitHub `origin/main`.
