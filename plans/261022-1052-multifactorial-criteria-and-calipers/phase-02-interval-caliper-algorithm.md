# Phase 02: Thuật Toán Thước Đo Khoảng (R-R, PR, QTc Calipers)

Status: ⬜ Pending
Dependencies: Phase 01

## 1. Yêu Cầu Từ Bác Sĩ
> *"ví dụ tiêu chuẩn RR phải đánh dấu và thể hiện được khoảng RR... chứ không chung chung"*

---

## 2. Thiết Kế Thuật Toán Thước Đo Khoảng (Horizontal Caliper)

### 2.1. Xác Định Tọa Độ 2 Đỉnh R Kế Tiếp
- Trong một chu kỳ tim chuẩn:
  - Đỉnh sóng R của chu kỳ thứ $k$ xuất hiện tại thời điểm $t_{R1} = (k + 0.20) \times T_{\text{cycle}}$.
  - Đỉnh sóng R của chu kỳ kế tiếp $k+1$ xuất hiện tại thời điểm $t_{R2} = (k + 1 + 0.20) \times T_{\text{cycle}}$.
- Tọa độ hoành độ trên canvas:
  - $x_1 = \text{traceStart} + (t_{R1} - t_{\text{min}}) \times \text{pixelsPerSecond}$
  - $x_2 = \text{traceStart} + (t_{R2} - t_{\text{min}}) \times \text{pixelsPerSecond}$
- Khoảng cách thời gian:
  - $\Delta t = t_{R2} - t_{R1} = \frac{60}{\text{BPM}} \times 1000 \text{ (ms)}$.
  - Số ô lớn trên giấy: $N_{\text{boxes}} = \frac{\Delta t}{200 \text{ ms}}$.

### 2.2. Vẽ Thước Calipers Trên Canvas
1. **Đường gióng dọc từ 2 đỉnh R**:
   - Từ đỉnh R1 $(x_1, y_{R1})$ và R2 $(x_2, y_{R2})$, vẽ 2 vạch gióng mảnh ngắt quãng lên độ cao thước đo $y_{\text{caliper}}$.
2. **Thanh ngang Calipers**:
   - Vẽ đường kẻ ngang từ $x_1$ sang $x_2$ với nét liền hoặc đứt đoạn màu vàng cam `#d97706` hoặc lục `#059669`.
3. **Mũi tên / Móc kẹp 2 đầu (Ticks / Arrowheads)**:
   - Hai đầu $x_1$ và $x_2$ có vạch đứng vuông góc `|` hoặc mũi tên nhọn `|<` và `>|`.
4. **Nhãn thông số chi tiết (Dimension Label)**:
   - Hiển thị ngay trung tâm thanh đo:
     - Với nhịp xoang đều: `|<── R-R = 800 ms (4.0 ô lớn) • 75 bpm ──>|`
     - Với rung nhĩ: Vẽ 2 khoảng R-R liên tiếp thể hiện sự không đều:
       `R-R(1) = 520 ms` và `R-R(2) = 880 ms (Không đều)`
     - Với cuồng nhĩ: `R-R = 400 ms (Dẫn truyền 2:1 • 150 bpm)`

### 2.3. Áp Dụng Cho Khoảng PR & QTc
- **Khoảng PR (Block AV)**:
  - Nối từ điểm bắt đầu sóng P ($t_P$) đến điểm bắt đầu sóng Q ($t_Q$).
  - Ghi nhãn: `|<── PR = 260 ms (> 200 ms / 5 ô nhỏ) [Kéo dài] ──>|`.
- **Khoảng QTc (Hạ Kali / Torsades / Hội chứng QT dài)**:
  - Nối từ điểm bắt đầu sóng Q đến điểm kết thúc sóng T.
  - Ghi nhãn: `|<── QT = 480 ms • QTc = 530 ms (> 460 ms) ──>|`.

---

## 3. Tiêu Chuẩn Nghiệm Thu
- [ ] Thước đo R-R bắt đúng vào 2 đỉnh sóng R liên tiếp.
- [ ] Nhãn thể hiện chính xác thời gian mili-giây (ms), số ô giấy và tần số tim tương ứng.
- [ ] Tự động co dãn tức thì khi người dùng thay đổi tần số tim BPM.
