# MEDSIM PRO RPG - SỔ TAY VẬN HÀNH & ĐẶC TẢ HỆ THỐNG Y KHOA

> **Hệ thống Web App Mô Phỏng Học Tập & Thực Hành Điều Trị Y Khoa Lâm Sàng**  
> **Kiến trúc:** Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand, Canvas 60 FPS Engine, Better-SQLite3 WAL.

---

## I. TỔNG QUAN HỆ THỐNG 3 MODULE LIÊN HOÀN

Dự án được thiết kế chuẩn theo 3 trụ cột y khoa đào tạo bác sĩ:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MEDSIM PRO RPG ARCHITECTURE                     │
└────────────────────────────────────────────────────────────────────────┘
          │                                 │                    │
          ▼                                 ▼                    ▼
   [ MODULE 1 ]                      [ MODULE 2 ]          [ MODULE 3 ]
VIỆN HÀN LÂM Y KHOA           PHÒNG MÔ PHỎNG CẬN LÂM SÀNG   BUỒNG CẤP CỨU & HỒI SỨC
───────────────────           ───────────────────────────   ───────────────────────
• Bài giảng cơ chế sinh lý     • Máy chạy ECG 60 FPS         • Tiếp nhận ca ESI-1,2,3
• Dược thư & Chống chỉ định   • Siêu âm đầu dò 3D POCUS     • Monitor sinh hiệu động
• Ngân hàng Quiz ca lâm sàng  • Soi phim X-Quang DICOM      • Mắc máy Module 2 tại giường
• Flashcard ghi nhớ nhanh      • Cuộn lát cắt CT Hounsfield  • Ra y lệnh & Thuốc cấp cứu
• Lưu trữ 100% SQLite         • Caliper & Phép đo chuẩn     • Code Blue & Sốc điện CPR
                                                            • Debriefing 4 trụ cột điểm
```

---

## II. QUY CHUẨN LƯU TRỮ DỮ LIỆU ĐỘNG (SQLITE WAL ENGINE)

Toàn bộ kiến thức y khoa, bài giảng, dược lý, câu hỏi trắc nghiệm, thẻ nhớ và ca bệnh cấp cứu được lưu trữ tập trung tại cơ sở dữ liệu `data/medsim.db` (chế độ Write-Ahead Logging `WAL`), đảm bảo **không hardcode trong mã nguồn**:

1. **`lessons`**: Chứa bệnh học, cơ chế bệnh sinh chi tiết, tiêu chuẩn chẩn đoán (ACC/AHA, GOLD, SSC, KDIGO), phác đồ xử trí và ID các thuốc liên quan.
2. **`drugs`**: Dược thư lâm sàng với thụ thể tác dụng, liều dùng chuẩn, đường dùng, thời gian khởi phát (onset), thời gian bán thải ($t_{1/2}$), chỉ định, chống chỉ định và **các sai lầm chết người (Fatal Mistakes)**.
3. **`quizzes`**: Vignette ca lâm sàng thực tế, các đáp án nhiễu logic và giải thích cơ chế sinh lý bệnh cho từng lựa chọn.
4. **`flashcards`**: Thẻ nhớ thuật ngữ, công thức tính toán và câu ghi nhớ thần kinh (Mnemonic).
5. **`clinical_cases`**: Bệnh án cấp cứu hoàn chỉnh: Hồ sơ người bệnh, sinh hiệu ban đầu, diễn tiến bệnh sinh tự nhiên, cây hỏi bệnh, khám thực thể, dữ liệu cận lâm sàng (ECG, Siêu âm, X-quang, CT, Labs), danh mục y lệnh và thang điểm chấm Debriefing.

---

## III. CHI TIẾT KỸ THUẬT CÁC CÔNG CỤ CẬN LÂM SÀNG (MODULE 2)

### 1. Máy chạy Điện tâm đồ (ECG Workstation)
- **Phương trình sóng Gaussian tổng quát:**
  $$V(t) = \sum_{i \in \{P, Q, R, S, ST, T\}} A_i \cdot \exp\left( -\frac{(t - \mu_i)^2}{2 \sigma_i^2} \right)$$
- **Công thức hiệu chỉnh Bazett QTc:**
  $$QTc = \frac{QT}{\sqrt{RR}}$$
- **Thước đo điện tử Calipers:** Kéo thả 2 thước dọc để đo khoảng thời gian ($\Delta t$ tính bằng $ms$) và 2 thước ngang để đo biên độ điện áp ($\Delta V$ tính bằng $mV$). Tự động cảnh báo khi QTc kéo dài $> 450ms$ (nam) hoặc $> 460ms$ (nữ).
- **Lưới chuẩn ECG:** $1mm = 0.04s$ (trục hoành) và $1mm = 0.1mV$ (trục tung). Chạy 60 FPS mượt mà trên Canvas.

### 2. Mô phỏng Siêu âm Đầu dò 3D Động (Ultrasound POCUS)
- **Đầu dò 3D ảo 6 DoF:** Người dùng dùng chuột xoay góc $0^\circ - 360^\circ$, nghiêng đầu dò $\pm 45^\circ$, và tăng giảm độ nén mô (Compression 0-100%).
- **5 Cửa sổ FAST chuẩn:**
  1. *Subxiphoid:* Khảo sát 4 buồng tim, nhận diện tràn dịch màng ngoài tim và đè sụp thất phải trong ép tim cấp (Tamponade).
  2. *RUQ (Khoang Morison):* Giao diện gan - thận, nơi đọng dịch tự do sớm nhất trong xuất huyết ổ bụng.
  3. *LUQ (Khoang lách - thận):* Khảo sát chấn thương vỡ lách và tụ máu dưới bao.
  4. *Suprapubic (Hạ vị):* Khảo sát dịch tự do túi cùng Douglas.
  5. *Lung POCUS:* Đánh giá dấu trượt màng phổi (Lung Sliding), phân biệt dấu bờ biển (Seashore Sign) bình thường với dấu mã vạch (Barcode Sign) trong tràn khí màng phổi.
- **Chế độ hiển thị:** B-Mode (hình ảnh 2D độ phân giải cao), M-Mode (chuyển động theo thời gian) và Color Doppler (dòng chảy theo nguyên lý BART: Blue Away, Red Towards).

### 3. Bộ Soi Phim X-Quang Kỹ Thuật Số (Digital X-Ray Viewer)
- **Bộ lọc tương phản & độ sáng:** Điều chỉnh Window Width (WW) và Window Level (WL) theo thời gian thực bằng CSS matrix filters.
- **Thước đo tỷ lệ tim/lồng ngực (Cardiothoracic Ratio - CTR):**
  $$CTR = \frac{A + B}{C}$$
  Tự động phát hiện bóng tim to khi $CTR > 0.50$.
- **Lớp phủ giải phẫu học:** Bật/tắt đường viền phế trường, vòm hoành, góc sườn hoành và tổn thương bệnh lý (đông đặc phổi, tràn khí vô mạch).

### 4. Bộ Cuộn Lát Cắt CT-Scanner Đa Tầng (Multi-Slice CT Workstation)
- **Cuộn lát cắt liên tục (Scrubbing / Mouse Wheel):** Di chuyển mượt mà qua 20 lát cắt trục ngang (Axial slices) từ đỉnh sọ đến đáy sọ hoặc ngực/bụng.
- **Chuyển đổi cửa sổ chuyên biệt (Window Presets):**
  - Cửa sổ Nhu mô não (Brain): $WW: 80, WL: 40$
  - Cửa sổ Dưới màng cứng (Subdural): $WW: 150, WL: 50$
  - Cửa sổ Xương (Bone): $WW: 2500, WL: 500$
  - Cửa sổ Trung thất: $WW: 350, WL: 40$
  - Cửa sổ Phổi (Lung): $WW: 1500, WL: -600$
- **Đầu dò Tỷ trọng Hounsfield (HU Probe):** Rê chuột lên bất kỳ điểm nào trên lát cắt để hiển thị ngay tức thì giá trị HU và loại mô tương ứng:
  - Khí: $-1000$ HU
  - Nhu mô phổi: $-700$ HU
  - Mỡ dưới da: $-100$ HU
  - Nước: $0$ HU
  - Dịch não tủy: $+15$ HU
  - Mô mềm / Chất trắng não: $+35 \rightarrow +45$ HU
  - Máu tươi cấp (Tụ máu ngoài màng cứng): $+60 \rightarrow +85$ HU
  - Thuốc cản quang lòng mạch: $+250 \rightarrow +400$ HU
  - Xương đặc / Vôi hóa sỏi phân: $+800 \rightarrow +1500$ HU

---

## IV. BẢN ĐỒ LÂM SÀNG 5 CA CẤP CỨU THỰC CHIẾN (MODULE 3)

| Mã Ca Bệnh | Chẩn Đoán Xác Định | Vấn Đề Cốt Lõi | Y Lệnh Vàng Bắt Buộc | Chống Chỉ Định Tử Vong (Gây Code Blue) |
|---|---|---|---|---|
| `case-inferior-stemi-rv` | Nhồi máu cơ tim cấp thành dưới - thất phải (ST DII, DIII, aVF, V4R) | Thất phải phụ thuộc tiền gánh; tụt huyết áp nghiêm trọng nếu dùng thuốc giãn mạch | Aspirin 300mg, Ticagrelor 180mg, Heparin, bù NaCl 0.9%, chuyển Cath Lab | **Nitroglycerin / Morphin liều cao** (Gây sụp đổ tiền gánh $\rightarrow$ Sốc tim $\rightarrow$ Rung thất VFib) |
| `case-anaphylaxis-grade3` | Phản vệ độ III (nguy kịch) do dị ứng thức ăn | Co thắt thanh quản nghẹt thở, giãn mạch tụt HA toàn thân | **Adrenalin 0.5mg tiêm bắp đùi trước ngoài ngay lập tức**, thở mask túi, truyền dịch xả nhanh | **Chỉ uống Corticoid/Kháng Histamine mà không tiêm Adrenalin** (Bệnh nhân ngạt thở tử vong) |
| `case-tension-pneumothorax` | Tràn khí màng phổi áp lực do chấn thương ngực kín | Cơ chế van 1 chiều đè bẹp trung thất và cản trở tĩnh mạch chủ | **Chọc kim lớn giải áp KLS 2 đường trung đòn**, đặt ống dẫn lưu kín | **Trì hoãn giải áp để đưa đi chụp X-quang/CT** hoặc bóp bóng dương trước giải áp |
| `case-septic-shock-appendix` | Sốc nhiễm khuẩn do viêm ruột thừa hoại tử vỡ mủ | Viêm phúc mạc toàn thể, sốc phân bố, toan chuyển hóa | Gói SSC Hour-1: Dịch Ringer 30ml/kg, Cấy máu, Kháng sinh Ceftriaxone + Metro, Mổ cấp cứu | Trì hoãn kháng sinh để chờ mổ; chỉ bù dịch mà không dùng sớm Noradrenaline |
| `case-tbi-edh-herniation` | Tụ máu ngoài màng cứng cấp (EDH) thái dương phải dọa tụt kẹt não | Rách động mạch màng não giữa, khoảng tỉnh, Tam chứng Cushing | Đặt nội khí quản bảo vệ đường thở, Mannitol 20% 1g/kg, Nâng đầu 30°, Mổ mở sọ giải áp | **Dùng thuốc hạ huyết áp mạnh (Nicardipine)** làm mất áp lực tưới máu não $CPP = MAP - ICP \rightarrow$ Chết não |

---

## V. HỆ THỐNG ĐÁNH GIÁ DEBRIEFING & THĂNG CẤP BÁC SĨ

### 1. Bảng chấm điểm 4 Trụ Cột (100 Điểm)
- **Chẩn đoán chuẩn xác (40 điểm):** Nhận diện đúng bệnh lý nguyên nhân và bệnh kèm theo.
- **An toàn người bệnh (30 điểm):** Không vi phạm chống chỉ định chết người; trừ 15 điểm/lỗi sai; 0 điểm an toàn nếu kích hoạt Code Blue.
- **Hiệu quả y lệnh (20 điểm):** Tỷ lệ các y lệnh đúng phác đồ được ban hành.
- **Tốc độ thời gian vàng (10 điểm):** Hoàn thành xử trí trong vòng 3 phút (10đ), 5 phút (7đ), $>5$ phút (4đ).
- *Điều kiện vượt qua ca bệnh:* Tổng điểm $\ge 70$ điểm và **không gây tử vong Code Blue**.

### 2. Cấp bậc Bác Sĩ & Điểm Kinh Nghiệm (XP)
1. **Sinh Viên Y Thực Tập (Y4):** 0 - 499 XP
2. **Bác Sĩ Thực Hành Lâm Sàng (Y6):** 500 - 1499 XP
3. **Bác Sĩ Nội Trú (Resident):** 1500 - 3499 XP
4. **Bác Sĩ Điều Trị Cấp Cứu (Attending):** 3500 - 6999 XP
5. **Trưởng Khoa Cấp Cứu (Chief of ER):** 7000 - 11999 XP
6. **Chuyên Gia Hồi Sức Cấp Cứu Toàn Năng:** $\ge 12000$ XP
