# KẾ HOẠCH MILESTONE M16: RR CALIPER STRICT CONTAINMENT & CONSECUTIVE RHYTHM STRIP PRECISION

> **Yêu cầu trực tiếp từ Bác sĩ (19:09):** *"Tiếp tục rà soát. Đoạn RR đánh dấu sai vị trí"*

## 1. Nguyên nhân cốt lõi
- Dòng 997, 1057, 1106, 1155 dùng điều kiện giao thoa `x2 >= traceStart + 10 && x1 <= leadEndX - 10`.
- Khi đỉnh sóng 1 chưa xuất hiện ($x_1 < \text{traceStart}$), nó vẫn nhận chu kỳ $k = -1$ và vẽ thước đo từ mép trái rỗng vào đỉnh sóng đầu tiên!
- Trên dải nhịp, Caliper 1 và Caliper 2 đang dùng chung chu kỳ $k$ nên bị vẽ đè lên nhau.

## 2. Kế hoạch giải quyết
- **Phase 01:** Thay bằng điều kiện bao hàm trọn vẹn: `if (x1 >= traceStart + 6 && x2 <= leadEndX - 6)`.
- **Phase 02:** Tách chu kỳ dải nhịp: Thước 1 dùng $k \rightarrow k+1$, Thước 2 dùng $k+1 \rightarrow k+2$.
- **Phase 03:** Viết unit test xác thực vị trí định vị.
- **Phase 04:** Verify test, build, restart dev server.
