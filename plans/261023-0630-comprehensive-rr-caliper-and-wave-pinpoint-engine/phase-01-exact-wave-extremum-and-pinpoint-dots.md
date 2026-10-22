# Phase 01: Exact Wave Extremum & Visual Pinpoint Dots

## Mục tiêu
Khắc phục hiện tượng mốc đo lệch khỏi đỉnh sóng R và thiếu điểm chấm trực quan trên sóng:
1. **Dynamic Anchor Scaling theo BPM**:
   - Trong `ecgWaveforms.ts`, xung sóng Gaussian scale theo tỷ lệ `scale = cycleDuration / 0.8`.
   - Vì thế, mốc ước lượng ban đầu của đỉnh R phải được tính động:
     `estimatedRPeak = rhythm === "normal_sinus" || rhythm === "sinus_tachycardia" || rhythm === "sinus_bradycardia" ? 0.220 * (cycleDuration / 0.8) : anchors.rPeak;`
   - Điều này triệt tiêu sai số ban đầu từ $55\text{ms} - 110\text{ms}$ khi nhịp tim khác 75 bpm.
2. **Nâng cấp thuật toán `snapToWaveExtremum`**:
   - Cửa sổ dò tìm mở rộng lên $\pm 80\text{ms}$ với bước quét $0.0005\text{s}$ ($0.5\text{ms}$) để bắt dính cực trị đỉnh nhọn tuyệt đối.
   - Nhận diện tự động cực tính của QRS trên chuyển đạo đó:
     - Lấy mẫu $v_{\text{test}}$ tại vùng lân cận.
     - Nếu chuyển đạo có biên độ âm ưu thế (ví dụ aVR, V1, các chuyển đạo trục lệch) -> tìm cực tiểu `min`.
     - Nếu chuyển đạo có biên độ dương ưu thế -> tìm cực đại `max`.
3. **Hiển thị Target Pinpoint Dots trực tiếp trên đỉnh sóng**:
   - Trong hàm render của thước đo `isInterval` (R-R, PR, QT):
     Vẽ chấm tròn Target Pinpoint Dot tại tọa độ $(x_1, y_1)$ và $(x_2, y_2)$ (tại điểm tiếp xúc với sóng tim):
     - Vòng tròn ngoài: bán kính $3.5\text{px}$, màu thước kẹp (xanh emerald/amber).
     - Điểm tâm: bán kính $1.5\text{px}$, màu trắng `#ffffff`.
   - Vạch gióng nét đứt nối thẳng từ tâm điểm chấm này lên thước kẹp ngang.
   - Bác sĩ và người học sẽ nhìn thấy rõ ràng 100% điểm mốc đặt dính chuẩn xác tại chóp nhọn của sóng!
