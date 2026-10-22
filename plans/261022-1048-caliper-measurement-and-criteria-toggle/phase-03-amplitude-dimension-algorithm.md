# Phase 03: Thuật Toán Thước Đo Biên Độ (ST Chênh, T Lều, S & R LVH)

## 1. Yêu Cầu Từ Bác Sĩ
> *"biên độ phải đánh dấu được biên độ, chứ không chung chung"*

---

## 2. Thiết Kế Thuật Toán Đo Biên Độ Chiều Dọc (Vertical Dimension Caliper)

### 2.1. Thước Đo Độ Chênh Lên / Chênh Xuống Của Đoạn ST
1. **Xác định Đường Đẳng Điện (Isoelectric Baseline)**:
   - Trong điện tim chuẩn, đường đẳng điện là đoạn PR hoặc đoạn TP trước phức bộ QRS ($V = 0.0\text{ mV}$, tương ứng tung độ $y_{\text{baseline}} = \text{midY}$).
   - Vẽ một đoạn vạch ngang mảnh ngắt quãng đại diện cho đường đẳng điện tại vùng đo:
     `── ── ── ── ── (Đẳng điện: 0 mV)` màu xám y tế hoặc lục nhạt.
2. **Xác định Điểm J & Đoạn ST**:
   - Tọa độ điểm chênh $x_{\text{ST}}$, tung độ $y_{\text{ST}} = \text{midY} - V_{\text{ST}} \times \text{voltageScale}$.
   - Độ chênh lệch milimet trên giấy:
     $\Delta h_{\text{mm}} = \frac{y_{\text{baseline}} - y_{\text{ST}}}{\text{pixelsPerMm}} = V_{\text{ST (mV)}} \times 10\text{ (với biên độ 10mm/mV)}$.
3. **Vẽ Thước Đo Chiều Dọc (Vertical Dimension Line)**:
   - Kẻ đường thẳng đứng nối từ $y_{\text{baseline}}$ lên $y_{\text{ST}}$.
   - Hai đầu có vạch ngang giới hạn:
     - Chân thước tại đường đẳng điện: `---`
     - Đỉnh thước tại đoạn ST: `---`
     - Mũi tên 2 đầu chỉ hướng chênh: `▲` (nếu chênh lên) hoặc `▼` (nếu chênh xuống soi gương).
4. **Nhãn Số Đo Chi Tiết**:
   - `▲ ST +3.5 mm (0.35 mV) [≥ 1mm: Tiêu chuẩn STEMI (+)]`
   - Soi gương: `▼ ST -1.8 mm (0.18 mV) [Soi gương]`

### 2.2. Thước Đo Biên Độ Phì Đại Thất Trái (Sokolow-Lyon & Cornell)
1. **Tại V1 (Độ sâu sóng S)**:
   - Kẻ thước đo từ baseline xuống đáy sóng S:
     `↕ S = 22 mm (2.2 mV)`.
2. **Tại V5 / V6 (Chiều cao sóng R)**:
   - Kẻ thước đo từ baseline lên đỉnh sóng R:
     `↕ R = 18 mm (1.8 mV)`.
3. **Công thức Sokolow-Lyon**:
   - Tổng: `S(V1) + R(V5) = 22 + 18 = 40 mm (> 35 mm) [Sokolow-Lyon (+)]`.

### 2.3. Thước Đo Sóng T Lều Trong Tăng Kali Máu
- Kẻ thước đo từ baseline lên đỉnh sóng T nhọn:
  `↕ T = 12.5 mm (> 10 mm ở trước tim) [Sóng T lều nhọn đối xứng]`.

---

## 3. Tiêu Chuẩn Nghiệm Thu
- [ ] Mọi tiêu chuẩn liên quan đến ST, biên độ sóng T, hoặc phì đại buồng tim đều vẽ thước đo chiều dọc có mốc xuất phát từ đường đẳng điện baseline.
- [ ] Nhãn ghi rõ số milimet (mm) và mili-volt (mV), đối chiếu trực tiếp với ngưỡng chẩn đoán y khoa.
