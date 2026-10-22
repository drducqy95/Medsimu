# Phase 03: Anti-Collision Layout & Multi-Lead Support

Status: ⬜ Pending
Dependencies: Phase 02

## Objective
Ngăn chặn triệt để tình trạng đè chữ (label overlap) giữa 2 đoạn đo kề cận và tối ưu hóa hiển thị trên 12 chuyển đạo.

## Architectural Design
1. **Thiết Kế Nhãn Chống Đè (Anti-Collision Pill Layout)**:
   - Khoảng cách giữa 2 tâm nhãn chỉ là $1$ chu kỳ ($\approx 138\text{px}$ ở 25mm/s).
   - Nếu mỗi nhãn dài $> 200\text{px}$, hai nhãn sẽ đè lên nhau.
   - **Giải pháp**:
     - Đoạn $R_1 \rightarrow R_2$: Ghi nhãn ngắn gọn bên trong thanh: `|<── R-R₁: 923ms ──>|`.
     - Đoạn $R_2 \rightarrow R_3$: Ghi nhãn ngắn gọn bên trong thanh: `|<── R-R₂: 923ms ──>|`.
     - Phía trên điểm nối $R_2$ (hoặc pill trung tâm): Đặt nhãn kết luận đối chiếu: `[✓ Đều: R-R₁ = R-R₂ (65 bpm)]`.

2. **Hỗ trợ trên 12 chuyển đạo (12-Lead Grid)**:
   - Kiểm tra chiều dài ô chuyển đạo $leadLen$:
     - Nếu $leadLen$ đủ chỗ cho 3 đỉnh R (ví dụ ở chế độ màn hình dọc 2 cột, hoặc khi nhịp tim $> 80\text{ bpm}$): Vẽ đầy đủ 2 đoạn liên tục $R_1 \rightarrow R_2 \rightarrow R_3$.
     - Nếu $leadLen$ chỉ đủ 2 đỉnh R (1 nhịp): Giữ 1 đoạn $R_1 \rightarrow R_2$ gọn gàng, kẹp chính xác tuyệt đối đỉnh R.

## Test Criteria
- [ ] Không có bất kỳ nhãn nào bị đè chữ lên nhau.
- [ ] Giao diện trực quan, rõ ràng, thẩm mỹ cao trên cả Desktop và Mobile.
