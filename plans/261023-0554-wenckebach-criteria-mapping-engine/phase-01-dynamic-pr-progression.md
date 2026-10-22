# Phase 01: Dynamic Wenckebach PR Progression Engine (Tiêu chuẩn 1 & 3)

Status: ⬜ Pending
Dependencies: None

## Objective
Hiện thực hóa Tiêu chuẩn 1 ("Khoảng PR dài dần ra qua từng chu kỳ liên tiếp") và Tiêu chuẩn 3 ("Sau nhát rớt, chu kỳ lặp lại với khoảng PR ngắn nhất").

## Root Cause
- Thước kẹp PR hiện tại đang dùng công thức tĩnh: `t1 = tCycleStart + anchors.pOnset`, `t2 = tCycleStart + anchors.qrsOnset` với `anchors.pr = 240ms` cố định cho mọi chu kỳ.
- Không phân biệt được 3 nhát bóp liên tiếp có PR tăng dần ($160\text{ms} \rightarrow 240\text{ms} \rightarrow 320\text{ms}$) trong hàm sóng `ecgWaveforms.ts`.

## Implementation Steps
1. Trong `RealisticPinkEcgPaper.tsx`:
   - Khi `rhythm === "av_block_mobitz_1"` và Tiêu chuẩn 1 được chọn:
     - Tính toán tọa độ của 3 nhát bóp liên tiếp trong chu kỳ 4 nhát:
       - Beat 0: $P = 0.06\text{s}$, $QRS = 0.22\text{s} \rightarrow PR_1 = 160\text{ms}$.
       - Beat 1: $P = 0.06\text{s}$, $QRS = 0.30\text{s} \rightarrow PR_2 = 240\text{ms}$.
       - Beat 2: $P = 0.06\text{s}$, $QRS = 0.38\text{s} \rightarrow PR_3 = 320\text{ms}$.
     - Vẽ 3 thước kẹp PR tăng dần trên dải nhịp Lead II kéo dài:
       - `|<- PR₁ = 160ms (4.0 ô nhỏ) ->|`
       - `|<- PR₂ = 240ms (6.0 ô nhỏ) ->|`
       - `|<- PR₃ = 320ms (8.0 ô nhỏ) ->|`
     - Hiển thị badge tổng hợp: `[✓ PR dài dần: 160ms → 240ms → 320ms]`.
   - Khi Tiêu chuẩn 3 được chọn:
     - Định vị ngay vào Beat 0 (nhát bóp đầu tiên ngay sau nhát rớt Beat 3).
     - Đặt thước kẹp: `|<- PR = 160ms (ngắn nhất sau nhát rớt) ->|`.
     - Hiển thị badge: `[✓ Tái lập chu kỳ mới: PR ngắn nhất 160ms]`.

## Test Criteria
- [ ] Tiêu chuẩn 1 hiển thị rõ ràng 3 thước kẹp PR tăng dần (160ms, 240ms, 320ms).
- [ ] Tiêu chuẩn 3 hiển thị chính xác thước đo PR ngắn nhất 160ms ngay sau nhát rớt.
