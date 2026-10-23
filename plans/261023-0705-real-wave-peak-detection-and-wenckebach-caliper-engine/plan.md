# Kế hoạch Milestone M20: Động Cơ Dò Đỉnh Sóng Vật Lý Thật (Physical Wave Peak Detector) & Khắc Phục Triệt Để Định Vị Thước Đo R-R / Wenckebach Trên 12 Chuyển Đạo

## 1. Bối cảnh & Phân tích Nguyên nhân Gốc rễ từ Ảnh Bác sĩ cung cấp

Qua ảnh chụp màn hình thực tế của Bác sĩ khi chọn Tiêu chuẩn 4 của **Block AV độ II kiểu Mobitz I (Wenckebach)** (`Khoảng R-R ngắn dần trước nhát rớt; phức bộ QRS thường hẹp (< 0.12s)`):
1. **Lỗi 1 (Sai định vị sóng & khoảng trên 12 chuyển đạo):**
   - Trên cả 12 đạo trình (Lead I, II, III, aVR, aVL, aVF, V1-V6), toàn bộ thước kẹp hiển thị cứng nhắc `|<- R-R = 1000ms ->|` và các chấm tròn định vị (Pinpoint Dots) cắm vào **khoảng trống vô định / đường đẳng điện**, hoàn toàn trật khỏi đỉnh sóng $R$ thực tế!
   - **Nguyên nhân cốt lõi:** Khối `LINEAR CONSECUTIVE RR CALIPER ENGINE` đang dùng công thức giả định `rawT = k * cycleDuration + dynamicRPeakOffset` với $cycleDuration = 60 / \text{BPM} = 1.0\,\text{s}$ ($1000\,\text{ms}$). Nó giả định mọi nhịp tim đều có các nhát bóp cách đều nhau $1.0\,\text{s}$! Trong khi đó, với chu kỳ Wenckebach $4:3$, các nhát bóp thực tế được tổng hợp tại $0.220\,\text{s}$, $1.190\,\text{s}$, $2.080\,\text{s}$ ($R-R_1 = 970\,\text{ms}$, $R-R_2 = 890\,\text{ms}$) và nhát thứ 4 bị rớt ($1540\,\text{ms}$ pause). Việc dò theo bước nhảy $1.0\,\text{s}$ khiến thước kẹp rơi vào khoảng trống không có sóng!
2. **Lỗi 2 (Đè nhãn so sánh lên thước kẹp ở dải nhịp):**
   - Trên dải nhịp Lead II, badge kết luận `[✓ R-R ngắn dần trước nhát rớt: 970ms → 890ms (QRS hẹp 88ms)]` có chiều rộng $\sim 340\,\text{px}$, được đặt tại tọa độ $xR1$ và độ cao $calY - 16$. Nó đè trực tiếp lên thanh thước kẹp và con số `|<- R-R₂: 890ms ->|` của thước kẹp thứ 2.
3. **Lỗi 3 (Thiếu cơ chế dò đỉnh trực tiếp trên tín hiệu sóng vật lý - Physical Waveform Sampling):**
   - Khi chuyển đạo có vector âm sâu ($\text{aVR}$ hoặc $V_1$), hoặc khi nhịp tim là loạn nhịp không đều (Rung nhĩ, Wenckebach, Ngoại tâm thu), thuật toán lưới lý thuyết $k \times cycleDuration$ hoàn toàn phá sản.

---

## 2. Kiến Trúc Giải Pháp: Physical Waveform Peak Detector Engine

```
+-----------------------------------------------------------------------------------+
|               HỆ THỐNG DÒ ĐỈNH SÓNG VẬT LÝ THẬT (PHYSICAL WAVE PEAK SAMPLER)     |
+-----------------------------------------------------------------------------------+
|  Đầu vào: Hàm sóng calculateLeadEcgVoltage(t, leadId, rhythm, bpm)              |
|  Cửa sổ quét: [tMin + 0.04s, tMin + leadDuration - 0.04s] trên từng ô chuyển đạo  |
|  Bước lấy mẫu: dt = 0.002s (2ms - tương đương tần số lấy mẫu 500 Hz chuẩn y tế)   |
|                                                                                   |
|  1. Nhận diện cực tính đạo trình (Polarity):                                     |
|     - Nhóm Upright (Lead I, II, III, aVF, V4, V5, V6): Dò cực đại đỉnh nhọn       |
|       (slope chuyển từ dương sang âm, V(t) >= 0.4 mV)                             |
|     - Nhóm Inverted (aVR, V1 rS): Dò cực tiểu đáy nhọn / sóng QS âm               |
|       (slope chuyển từ âm sang dương, V(t) <= -0.4 mV)                            |
|                                                                                   |
|  2. Tinh chỉnh chính xác cực độ (Sub-millisecond Snap):                           |
|     - Quét mịn xung quanh đỉnh tìm được với bước 0.5ms để cắm mốc trúng 100% chóp|
|                                                                                   |
|  3. Xếp hạng & Kết nối thước kẹp theo thực tế đồ thị:                             |
|     - Nếu ô có >= 3 đỉnh R: Dựng chuỗi thước kép R1->R2 và R2->R3 nối liền        |
|       (hiển thị đúng 970ms và 890ms trên Lead I, II, III!)                        |
|     - Nếu ô có 2 đỉnh R: Dựng thước đơn đúng khoảng cách thực tế                  |
|     - Nếu ô có nhát rớt (khoảng nghỉ dài): Hiển thị đúng khoảng cách thực tế      |
+-----------------------------------------------------------------------------------+
```

---

## 3. Lộ Trình 4 Giai Đoạn Chi Tiết

- **Phase 01:** Xây dựng `detectPhysicalRPeaksOnTrace` - Động cơ lấy mẫu tín hiệu trực tiếp từ hàm sóng, tự động phát hiện mọi đỉnh $R$ và đáy $QS$ thực tế mà không cần giả định chu kỳ.
- **Phase 02:** Tích hợp bộ dò đỉnh vào toàn bộ 12 chuyển đạo và dải nhịp, đồng bộ kích thước thước kẹp theo các đỉnh thực tế tìm được.
- **Phase 03:** Thiết kế lại bố cục không gian (Collision Prevention) cho dải nhịp Lead II: dịch badge kết luận lên độ cao an toàn, căn giữa toàn dải chuỗi đo $R_0 \rightarrow R_2$, triệt tiêu $100\%$ hiện tượng đè chữ lên thước kẹp.
- **Phase 04:** Viết Test Suite tự động `tests/physical_wave_peak_caliper.test.js` kiểm tra 12 chuyển đạo của Wenckebach, Rung nhĩ, Ngoại tâm thu và chạy toàn bộ test suite dự án đảm bảo $100\%$ pass.
