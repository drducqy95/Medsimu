# Đặc Tả Kỹ Thuật: Hệ Thống Mô Phỏng Điện Tâm Đồ (ECG Simulator)

Created: 2026-10-21T19:25:00+07:00
Status: APPROVED SPECIFICATION
Module: Module 2A - Paraclinical Diagnostic Simulators

---

## 1. Mục Tiêu Kỹ Thuật
Xây dựng một máy tạo dải nhịp và điện tâm đồ 12 chuyển đạo tương tác thời gian thực (Interactive Real-time ECG Engine), mô phỏng chính xác tín hiệu điện thế sinh học của tim trên màn hình Canvas 60 FPS, đi kèm bộ công cụ đo đạc calipers chuyên dụng cho y khoa.

---

## 2. Mô Hình Toán Học Tổng Hợp Sóng Tim (ECG Signal Synthesis)

Tín hiệu điện tâm đồ cơ bản được tổng hợp từ chuỗi các hàm xung Gaussian (Gaussian Pulses) tương ứng với các giai đoạn khử cực và tái cực của cơ tim trong một chu chuyển tim:

$$V(t) = \sum_{i \in \{P, Q, R, S, S', T\}} A_i \cdot \exp\left( -\frac{(t - \mu_i)^2}{2\sigma_i^2} \right) + V_{\text{baseline}}(t)$$

Trong đó:
- $A_i$: Biên độ điện thế của sóng ($mV$).
- $\mu_i$: Vị trí thời gian của đỉnh sóng trong chu kỳ tim ($s$).
- $\sigma_i$: Độ rộng (thời gian tồn tại) của sóng ($s$).
- $V_{\text{baseline}}(t)$: Nhiễu đẳng điện sinh lý (đường nền trôi dạt nhẹ do hô hấp $0.15\text{ Hz}$).

### Bảng Tham Số Chuẩn Nhịp Xoang Bình Thường (Normal Sinus at 75 BPM, chu kỳ $T = 0.8s$):
| Sóng | Ý nghĩa sinh lý | Biên độ $A_i$ ($mV$) | Vị trí $\mu_i$ ($s$) | Độ rộng $\sigma_i$ ($s$) |
|---|---|---|---|---|
| **Sóng P** | Khử cực 2 tâm nhĩ | $+0.15$ | $0.12$ | $0.025$ |
| **Sóng Q** | Khử cực vách liên thất | $-0.15$ | $0.20$ | $0.010$ |
| **Sóng R** | Khử cực khối cơ tâm thất | $+1.50$ | $0.22$ | $0.012$ |
| **Sóng S** | Khử cực đáy tâm thất | $-0.35$ | $0.25$ | $0.015$ |
| **Đoạn ST**| Đẳng điện đầu tái cực thất | $0.00$ | $0.28 - 0.38$ | - |
| **Sóng T** | Tái cực 2 tâm thất | $+0.35$ | $0.46$ | $0.050$ |

---

## 3. Hệ Thống 15+ Dạng Sóng Bệnh Lý Chuẩn Y Khoa

Hệ thống cung cấp bộ Preset điều khiển tham số để sinh ra chính xác các dạng sóng bệnh lý:

1. **Rung Nhĩ (Atrial Fibrillation - AFib):**
   - Mất hoàn toàn sóng P, thay bằng các sóng lăn tăn $f$ không đều biên độ $0.05\text{ mV}$, tần số $400 - 600\text{ lần/phút}$.
   - Khoảng cách $R-R$ biến thiên ngẫu nhiên (hoàn toàn không đều).
2. **Cuồng Nhĩ (Atrial Flutter):**
   - Sóng $F$ hình răng cưa đều đặn tần số $300\text{ lần/phút}$, tỷ lệ dẫn truyền nhĩ-thất $2:1$ hoặc $4:1$.
3. **Cơn Nhịp Nhanh Kịch Phát Trên Thất (SVT):**
   - Tần số đều $160 - 220\text{ BPM}$, phức bộ QRS hẹp ($<0.12s$), sóng P lẫn vào sóng T hoặc không thấy.
4. **Ngoại Tâm Thu Thất (PVC):**
   - Xuất hiện nhát bóp sớm, phức bộ QRS dị dạng, giãn rộng ($>0.12s$), sóng T đảo chiều ngược hướng QRS, có khoảng nghỉ bù hoàn toàn.
5. **Nhanh Thất (Ventricular Tachycardia - VTach):**
   - Tần số thất $150 - 250\text{ BPM}$, QRS giãn rộng liên tục dạng một hình thái (Monomorphic) hoặc đa hình thái (Polymorphic/Torsades de Pointes).
6. **Rung Thất (Ventricular Fibrillation - VFib):**
   - Mất hoàn toàn phức bộ P-QRS-T, các dao động sóng hỗn loạn vô tổ chức (sóng thô chuyển dần sang sóng mịn), huyết áp tụt về 0.
7. **Vô Tâm Thu (Asystole):**
   - Đường đẳng điện phẳng hoàn toàn, báo động ngừng tim tối khẩn.
8. **Block Nhĩ Thất (AV Block):**
   - *Độ I:* Khoảng PR kéo dài cố định $>0.20s$ ($>5$ ô nhỏ).
   - *Độ II Mobitz I (Wenckebach):* Khoảng PR dài dần ra cho đến khi rụng một phức bộ QRS.
   - *Độ II Mobitz II:* Khoảng PR cố định nhưng đột ngột rụng một QRS.
   - *Độ III (Hoàn toàn):* Phân ly nhĩ thất hoàn toàn, nhịp nhĩ (sóng P) và nhịp thất (QRS) đập theo 2 nhịp độc lập.
9. **Nhồi Máu Cơ Tim Cấp ST Chênh Lên (STEMI):**
   - *STEMI thành dưới (DII, DIII, aVF):* ST chênh lên dạng vòm $>1\text{ mm}$, hình ảnh soi gương ST chênh xuống ở DI, aVL.
   - *STEMI trước rộng (V1 - V6):* ST chênh lên cao $>2\text{ mm}$ ở các chuyển đạo trước ngực, xuất hiện sóng Q hoại tử.
10. **Tăng Kali Máu Nặng (Hyperkalemia):**
    - Sóng T cao nhọn đối xứng, đáy hẹp ($K^+ > 6.0\text{ mmol/L}$); dãn rộng QRS và mất sóng P ($K^+ > 7.5\text{ mmol/L}$).

---

## 4. Công Nghệ Hiển Thị & Đo Đạc (Canvas 60 FPS & Calipers)

### 4.1. Lưới Kẻ Ô ECG Chuẩn Quốc Tế
- Tỷ lệ hiển thị: $1\text{ mm} = 0.04\text{ giây}$ (trục hoành) và $1\text{ mm} = 0.1\text{ mV}$ (trục tung).
- Lưới ô nhỏ $1\text{ mm}$ màu hồng nhạt/xanh rêu, lưới ô lớn $5\text{ mm}$ (gồm 5 ô nhỏ $= 0.20\text{ giây}$).
- Hỗ trợ đổi tốc độ quét: $25\text{ mm/s}$ (chuẩn) và $50\text{ mm/s}$ (khi cần phóng đại để phân tích nhịp nhanh).

### 4.2. Thước Kẹp Điện Tử Đo Đạc (Virtual Digital Calipers)
- Cho phép người học kéo thả 2 vạch đo dọc (Time Calipers) và 2 vạch đo ngang (Voltage Calipers):
  - Đo thời gian PR: Phát hiện Block AV độ I.
  - Đo độ rộng QRS: Phát hiện QRS dãn rộng trong Block nhánh, ngoại tâm thu thất.
  - Đo khoảng QT và tính toán tự động chỉ số **QTc** theo công thức Bazett:
    $$\text{QTc} = \frac{\text{QT}}{\sqrt{\text{RR}}}$$
  - Đưa ra kết luận lâm sàng tức thì: "QTc bình thường ($<440\text{ ms}$ ở nam, $<460\text{ ms}$ ở nữ)" vs "QTc kéo dài $\rightarrow$ Nguy cơ xoắn đỉnh".

### 4.3. Chuyển Đổi Chế Độ Xem:
- **Lead II Rhythm Strip (Dải nhịp kéo dài):** Theo dõi liên tục phục vụ chẩn đoán rối loạn nhịp.
- **12-Lead Complete ECG (Điện tâm đồ 12 cần hoàn chỉnh):** Bố cục $3 \times 4 + 1$ (DI, DII, DIII; aVR, aVL, aVF; V1, V2, V3; V4, V5, V6 + DII kéo dài) để định vị vùng nhồi máu cơ tim.
