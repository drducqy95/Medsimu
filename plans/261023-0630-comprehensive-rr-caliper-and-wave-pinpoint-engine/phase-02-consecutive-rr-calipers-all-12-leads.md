# Phase 02: Consecutive RR Calipers on All 12 Leads

## Mục tiêu
Đảm bảo khi chọn các tiêu chuẩn nhịp đều / tần số tim, hệ thống hiển thị thước đo so sánh nối 2 khoảng $R-R$ liên tiếp trên tất cả các chuyển đạo đủ điều kiện:
1. **Tìm kiếm các đỉnh sóng R theo thứ tự thời gian tăng dần ($t_1 < t_2 < t_3$)**:
   - Thay vì duyệt qua `candidateCycles` bị xáo trộn do sort theo khoảng cách tới `tCenter` (dẫn tới việc thước 2 đè lên thước 1):
   - Thuật toán sẽ quét theo trục thời gian tuyến tính từ `tMin` đến `tMin + leadDuration`:
     - Xác định tất cả các đỉnh sóng R nằm trong phạm vi ô chuyển đạo: $R_0, R_1, R_2, ...$
     - Kiểm tra điều kiện biên nghiêm ngặt: $x \ge traceStart + 6$ và $x \le leadEndX - 6$.
2. **Dựng chuỗi thước đo kép 3 mốc ($R_1 \rightarrow R_2 \rightarrow R_3$) trên mọi chuyển đạo**:
   - Nếu có $\ge 3$ đỉnh R hợp lệ trong ô:
     - Thước 1: Đo từ $R_1 \rightarrow R_2$ ($x_{R1} \rightarrow x_{R2}$).
     - Thước 2: Đo từ $R_2 \rightarrow R_3$ ($x_{R2} \rightarrow x_{R3}$).
     - Nối liền nhau tại đỉnh $R_2$, thanh đo ngang đồng bộ độ cao `calY`.
     - Nhãn thước tinh gọn: `|<- R-R₁: 1000ms ->|` và `|<- R-R₂: 1000ms ->|`.
     - Badge đối chiếu nhịp đều đặt tại điểm nối $R_2$: `✓ Đều: R-R₁ = R-R₂`.
   - Nếu chỉ có 2 đỉnh R hợp lệ trong ô (ví dụ nhịp chậm 40 bpm):
     - Dựng thước đơn $R_1 \rightarrow R_2$ chính xác tuyệt đối từ đỉnh tới đỉnh.
3. **Triệt tiêu 100% hiện tượng đè thước hoặc thước xuất phát ngoài viền**:
   - Đảm bảo mỗi đoạn R-R chỉ được vẽ 1 lần duy nhất, không trùng lặp hay chồng khít.
