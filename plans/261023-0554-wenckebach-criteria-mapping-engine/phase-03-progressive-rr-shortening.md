# Phase 03: Progressive RR Shortening & Adaptive Comparison Badge (Tiêu chuẩn 4)

Status: ⬜ Pending
Dependencies: Phase 02

## Objective
Sửa lỗi badge so sánh hiển thị sai lệch: biến nhãn `✓ Đều đặn: R-R₁ = R-R₂ = 1079ms (60 bpm)` thành nhãn lâm sàng chuẩn xác cho Mobitz I Wenckebach:
`[✓ R-R ngắn dần trước nhát rớt: 1079ms → 921ms]`
đồng thời bổ sung nhãn đo QRS hẹp (`88ms < 0.12s`).

## Root Cause
- Logic so sánh ở Milestone M17 dùng điều kiện `diffMs <= 160` để gán nhãn `✓ Đều đặn`.
- Với Mobitz I Wenckebach, sự chênh lệch giữa $R\text{-}R_1$ ($1079\text{ms}$) và $R\text{-}R_2$ ($921\text{ms}$) là $158\text{ms} \le 160\text{ms}$, khiến thuật toán hiểu nhầm là nhịp đều, mâu thuẫn trực tiếp với bản chất rối loạn nhịp của Block AV độ II.

## Implementation Steps
1. Trong `RealisticPinkEcgPaper.tsx`:
   - Kiểm tra `rhythm === "av_block_mobitz_1"`:
     - Nếu Tiêu chuẩn 4 được chọn, badge so sánh tại điểm nối $R_2$ sẽ hiển thị:
       `[✓ R-R ngắn dần trước nhát rớt: ${deltaMs1}ms → ${deltaMs2}ms (Δ = -${diffMs}ms)]`
     - Bổ sung thước kẹp hoặc badge cho phức bộ QRS:
       `|← QRS hẹp: 88ms (< 0.12s) →|`
2. Bảo lưu nhãn `✓ Đều đặn` cho các nhịp xoang đều thực sự (`normal_sinus`, `av_block_first_degree`, `sinus_bradycardia`...).

## Test Criteria
- [ ] Khi tick Tiêu chuẩn 4 ở Mobitz I, badge hiển thị rõ ràng tính chất "R-R ngắn dần trước nhát rớt".
- [ ] Tuyệt đối không hiển thị nhãn "Đều đặn" ở Mobitz I.
