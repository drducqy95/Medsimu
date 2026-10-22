# Phase 01: Precision Wave Snapping for RR Calipers

Status: ⬜ Pending
Dependencies: None

## Objective
Triệt tiêu hoàn toàn hiện tượng lệch đỉnh sóng ("Vẫn đang lệch") bằng cách đồng bộ toán học mốc `anchors.rPeak` và tích hợp bộ định vị cực trị động `snapToWaveExtremum` cho thước kẹp RR.

## Root Cause Analysis
1. Mốc `anchors.rPeak` trong `ecgMetricsCalculator.ts` đang khai báo là `0.320s`, trong khi hàm Gauss thực tế trong `ecgWaveforms.ts` định nghĩa đỉnh R tại $\mu = 0.340\text{s}$.
2. Thước đo RR trước đây chưa gọi hàm `snapToWaveExtremum` mà chỉ lấy tọa độ tĩnh từ `anchors.rPeak`, dẫn đến sai lệch 20ms (tương đương 3px trên giấy) so với chóp nhọn đỉnh sóng thực tế.

## Implementation Steps
1. Cập nhật `ecgMetricsCalculator.ts`:
   - Chuẩn hóa `rPeak = 0.340` (cho `av_block_first_degree` và kiểm tra lại toàn bộ danh sách 31 bệnh lý).
2. Cập nhật `RealisticPinkEcgPaper.tsx`:
   - Trong khối xử lý `ann.waveComponent === "RR"`, xác định hướng cực trị của QRS trên chuyển đạo đích (ví dụ `aVR` hoặc `V1` có vector âm thì tìm `min`, các chuyển đạo `Lead I, II, V5, V6` tìm `max`).
   - Gọi `snapToWaveExtremum(t1, calcLead, extremumType, 0.040, 0.001)` và `snapToWaveExtremum(t2, calcLead, extremumType, 0.040, 0.001)`.
   - Gán tọa độ $x_1, x_2$ sau khi đã bắt dính chuẩn xác vào chóp sóng.

## Test Criteria
- [ ] Vạch dóng đứng và tick mark của thước kẹp RR cắm thẳng hàng tuyệt đối vào chóp nhọn đỉnh R (sai số < 0.5px).
- [ ] Hoạt động chuẩn xác trên cả chuyển đạo dương (Lead II) và chuyển đạo âm (aVR, V1).
