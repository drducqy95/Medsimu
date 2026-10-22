# Đặc Tả Kỹ Thuật: Hệ Thống Mô Phỏng Siêu Âm Đầu Dò 3D & Màn Hình Động (3D Ultrasound Simulator)

Created: 2026-10-21T19:26:00+07:00
Status: APPROVED SPECIFICATION
Module: Module 2B - Paraclinical Diagnostic Simulators

---

## 1. Mục Tiêu Kỹ Thuật
Xây dựng một hệ thống mô phỏng siêu âm tại giường chuyên sâu (POCUS & FAST Protocol Simulator) với hai thành phần tích hợp:
1. **Khung nhìn Thao tác Đầu dò 3D (Interactive 3D Probe & Body Viewport):** Mô hình cơ thể bệnh nhân 3 chiều cho phép cầm, xoay, nghiêng và di chuyển đầu dò siêu âm 3D theo thời gian thực bằng chuột hoặc cảm ứng tay.
2. **Màn hình Hiển thị Siêu âm Cắt lớp Động (Dynamic Ultrasound Monitor):** Màn hình hiển thị hình ảnh echo siêu âm động (B-Mode, M-Mode, Color Doppler) biến đổi trực tiếp và tức thì theo đúng tọa độ, góc xoay và góc nghiêng của tay người dùng.

---

## 2. Khung Nhìn Thao Tác Đầu Dò 3D (3D Probe Viewport)

```
┌────────────────────────────────────────────────────────────────────────┐
│                   3D INTERACTIVE PROBE VIEWPORT                        │
│                                                                        │
│          [ Mô hình Cơ thể 3D - Bệnh nhân nằm ngửa / nghiêng ]          │
│                                                                        │
│                      [ Đầu dò 3D ]                                     │
│                           ║                                            │
│                      ┌────╨────┐  ◄── Tia quét siêu âm ảo (Cone/Sector)│
│                      │  Probe  │                                       │
│                      └─────────┘                                       │
│                                                                        │
│   Thao tác tay:                                                        │
│   • Kéo chuột: Di chuyển vị trí (X, Y, Z) trên bề mặt cơ thể          │
│   • Chuột phải / Thanh trượt: Xoay trục đầu dò 0° - 360° (Marker)      │
│   • Phím Alt / Shift: Nghiêng góc đầu dò (Tilt / Fanning ±45°)        │
│   • Đè chuột: Tăng áp lực tỳ đè (Compression depth)                    │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1. Động Học & Bậc Tự Do Của Đầu Dò (Probe Kinematics - 6 DoF):
Đầu dò siêu âm trên mô hình 3D được điều khiển với các bậc tự do mô phỏng thao tác thực tế của bác sĩ siêu âm:
1. **Tọa độ tiếp xúc mặt da $(X, Y, Z)$:**
   - Đầu dò bám trượt dọc theo bề mặt cơ thể (Surface Raycasting trên mesh giải phẫu 3D).
2. **Góc xoay quanh trục (Rotation / Axial Rotation $\alpha \in [0^\circ, 360^\circ]$):**
   - Đổi hướng chỉ điểm (Probe Marker Orientation):
     - $\alpha = 0^\circ$: Trục dọc (Longitudinal / Sagittal axis).
     - $\alpha = 90^\circ$: Trục ngang (Transverse axis).
     - $\alpha = 45^\circ$: Trục chéo theo khoang gian sườn (Oblique axis).
3. **Góc nghiêng / Quét quạt (Tilt / Fanning Angle $\beta \in [-45^\circ, +45^\circ]$):**
   - Thao tác quét quạt (Fanning) chùm tia để quan sát toàn bộ thể tích tạng từ cực trên xuống cực dưới.
4. **Áp lực tỳ đè (Compression Force $P \in [0, 1]$):**
   - Đè mạnh đầu dò giúp đuổi bớt khí ruột và tăng độ xuyên sâu.

### 2.2. Lựa Chọn 3 Loại Đầu Dò Chuyên Dụng:
- **Đầu dò Cong (Convex Probe $3.5 - 5.0\text{ MHz}$):** Tần số thấp, độ đâm xuyên sâu ($15 - 25\text{ cm}$), trường quét hình rẻ quạt rộng. Chuyên dùng siêu âm ổ bụng tổng quát, gan, thận, bàng quang.
- **Đầu dò Tim (Phased Array Probe $1.5 - 3.5\text{ MHz}$):** Đầu dò nhỏ gọn lọt qua khe sườn, chùm tia dạng nón hẹp ở đỉnh mở rộng ở đáy. Chuyên dùng siêu âm tim tại giường.
- **Đầu dò Thẳng (Linear Probe $7.5 - 12.0\text{ MHz}$):** Tần số cao, độ đâm xuyên nông ($3 - 6\text{ cm}$), độ phân giải mô cao, trường quét hình chữ nhật. Chuyên dùng siêu âm màng phổi, mạch máu, tuyến giáp.

---

## 3. Màn Hình Hiển Thị Siêu Âm Động (Dynamic Ultrasound Screen)

Hình ảnh siêu âm không phải là ảnh tĩnh, mà là **hình ảnh cắt lớp chuyển động sinh học thời gian thực (Procedural & Dynamic Biological Motion)** dựa trên pha chu kỳ tim và pha hô hấp:

$$I_{\text{ultrasound}}(u, v, t) = \mathcal{F}\left( \text{TissueSlice}(X, Y, Z, \alpha, \beta), \Phi_{\text{cardiac}}(t), \Phi_{\text{resp}}(t) \right) + N_{\text{speckle}}$$

### 3.1. Các Vùng Cắt Siêu Âm Cấp Cứu Chuẩn (FAST Protocol & Lung POCUS):

#### 1. Vùng Hạ Sườn Phải (Right Upper Quadrant - RUQ / Morison's Pouch):
- **Cấu trúc nhận diện:** Nhu mô gan mịn (Echo dày vừa), Thận phải với vỏ thận (Echo kém) và xoang thận (Echo dày).
- **Phản ứng khi xoay đầu dò:**
  - Trục dọc ($\alpha = 0^\circ$): Cắt dọc qua gan và chiều dài quả thận phải.
  - Trục ngang ($\alpha = 90^\circ$): Cắt ngang thấy thận hình bầu dục tròn.
- **Tình trạng bệnh lý:**
  - *Xuất huyết nội / Tràn máu ổ bụng:* Xuất hiện dải dịch màu đen (Echo trống hoàn toàn) len lỏi giữa bao gan và bao thận tại khoang Morison.

#### 2. Vùng Hạ Sườn Trái (Left Upper Quadrant - LUQ / Splenorenal Recess):
- **Cấu trúc nhận diện:** Nhu mô lách, cực trên thận trái, vòm hoành trái.
- **Tình trạng bệnh lý:** Dải dịch đen đọng ở khoang lách - thận và dưới vòm hoành khi vỡ lách trong chấn thương.

#### 3. Vùng Dưới Mũi Ức - Cắt 4 Buồng Tim (Subxiphoid 4-Chamber View):
- **Cấu trúc nhận diện:** Thùy gan trái làm cửa sổ âm học xuyên qua tim. Thấy rõ 4 buồng tim: Tâm thất phải (nằm sát đầu dò nhất), Tâm thất trái, Tâm nhĩ phải, Tâm nhĩ trái.
- **Chuyển động sinh học thời gian thực ($\Phi_{\text{cardiac}}$):**
  - Cơ tâm thất co bóp tống máu tuần hoàn theo nhịp tim.
  - Van 2 lá và van 3 lá mở đóng nhịp nhàng.
- **Tình trạng bệnh lý:**
  - *Tràn dịch màng ngoài tim (Pericardial Effusion):* Xuất hiện khoảng trống âm (dịch đen) bao bọc xung quanh cơ tim. Khi dịch nhiều gây chèn ép tim cấp (Tamponade) $\rightarrow$ Thất phải bị đè sụp trong thì tâm trương!

#### 4. Vùng Siêu Âm Màng Phổi (Lung POCUS):
- **Cấu trúc nhận diện:** Hai bóng xương sườn (Echo dày kèm bóng lưng âm đen phía sau), đường màng phổi màu trắng sáng nằm sâu cách mặt da $1 - 2\text{ cm}$.
- **Chuyển động sinh học thời gian thực ($\Phi_{\text{resp}}$):**
  - **Dấu trượt màng phổi (Lung Sliding):** Lá thành và lá tạng trượt qua lại lấp lánh như "đàn kiến bò" đồng bộ theo nhịp thở của bệnh nhân.
  - **Đường A-line:** Các đường phản hồi ngang nằm song song phía dưới đường màng phổi (hình ảnh phổi bình thường chứa khí).
- **Tình trạng bệnh lý:**
  - *Tràn khí màng phổi (Pneumothorax):* Không khí ngăn cách lá thành và lá tạng $\rightarrow$ **Mất hoàn toàn dấu trượt màng phổi**!
  - *Phù phổi cấp / Hội chứng kẽ:* Xuất hiện nhiều **đường B-line** (dấu đuôi sao chổi laser xuất phát từ màng phổi quét thẳng xuống đáy màn hình, xóa các đường A-line).

#### 5. Vùng Hạ Vị (Suprapubic View):
- **Cấu trúc nhận diện:** Bàng quang căng nước tiểu tạo thành khối echo trống hình thang/tròn.
- **Tình trạng bệnh lý:** Dịch tự do len lỏi phía sau bàng quang (Túi cùng Douglas).

---

## 4. Các Chế Độ Siêu Âm Chuyên Nghiệp (B-Mode, M-Mode, Color Doppler)

### 4.1. Chế Độ B-Mode (Brightness Mode - 2D Gray Scale)
- Màn hình quét rẻ quạt (Sector) với bảng màu thang xám y khoa (256 mức xám).
- Núm chỉnh **Depth** (độ sâu $5 - 25\text{ cm}$) và **Gain** (độ khuếch đại sáng tối của ảnh echo).
- Hạt nhiễu siêu âm (Speckle Texture) tạo cảm giác như máy siêu âm lâm sàng thực thụ.

### 4.2. Chế Độ M-Mode (Motion Mode - Đo Vận Động Theo Thời Gian)
- Người dùng đặt một đường con trỏ (M-Line) cắt ngang qua cấu trúc đang chuyển động:
  - **Khám Màng Phổi:**
    - Bình thường: **Dấu bờ biển (Seashore Sign)** - Phần mô mềm tĩnh tạo các đường ngang, phần phổi chuyển động tạo hạt cát mịn.
    - Tràn khí màng phổi: **Dấu mã vạch / Tầng bình lưu (Barcode / Stratosphere Sign)** - Toàn bộ màn hình chỉ gồm các đường sọc ngang bất động.
  - **Khám Tim:** Đo độ co rút phân số thất trái (Fractional Shortening) và di động vòng van 2 lá (MAPSE).

### 4.3. Chế Độ Color Doppler (Doppler Màu Dòng Chảy Mạch Máu)
- Hiển thị hộp màu (Color Box) trên màn hình:
  - Áp dụng quy tắc **BART (Blue Away, Red Towards)**: Dòng máu chảy hướng về phía đầu dò mã hóa màu Đỏ; dòng máu chảy ra xa đầu dò mã hóa màu Xanh.
  - Giúp phân biệt động mạch (dòng chảy xung đập) vs tĩnh mạch (dòng chảy liên tục).
