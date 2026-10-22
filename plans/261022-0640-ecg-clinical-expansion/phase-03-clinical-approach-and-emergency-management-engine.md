# Phase 03: Clinical Approach & Emergency Management Engine (Công Cụ Lưu Đồ Tiếp Cận Chẩn Đoán & Phác Đồ Xử Trí Cấp Cứu)

Status: ✅ Complete
Dependencies: Phase 01, Phase 02

## 1. Mục Tiêu (Objective)
Xây dựng lõi nghiệp vụ y khoa (Domain Engine) cung cấp:
1. **Quy trình đọc ECG 7 bước chuẩn y khoa (Systematic 7-Step ECG Interpretation Protocol)**
2. **Lưu đồ tiếp cận chẩn đoán phân biệt hội chứng (Diagnostic Approach Algorithm)**
3. **Phác đồ xử trí cấp cứu khẩn cấp theo ACLS / AHA / ESC / Bộ Y Tế (Emergency Protocols Engine)**
4. **Hệ thống cảnh báo đỏ và chống chỉ định thuốc nguy kịch (Red Flags & Critical Contraindications Engine)**

## 2. Yêu Cầu Kỹ Thuật & Nghiệp Vụ Y Khoa (Requirements)

### 2.1. Quy Trình Tiếp Cận 7 Bước (Systematic 7-Step Protocol)
Xây dựng engine kiểm tra và đối chiếu tự động:
- **Bước 1: Kỹ thuật ghi & Test điện thế** (Tốc độ 25 mm/s, Test 1mV = 10mm, chuyển đạo aVR âm xác nhận không mắc ngược điện cực).
- **Bước 2: Tần số tim** (Công thức 300 / số ô lớn hoặc 1500 / số ô nhỏ; phân loại Chậm < 60, Bình thường 60-100, Nhanh > 100).
- **Bước 3: Nhịp tim** (Đều hay không đều; có sóng P xoang hay không; tương quan P và QRS).
- **Bước 4: Trục điện tim** (Góc trục QRS dựa trên DI và aVF; phân loại Trục bình thường 0° đến +90°, Trục lệch trái -30° đến -90°, Trục lệch phải +90° đến +180°, Trục vô định).
- **Bước 5: Sóng P & Khoảng PR** (Biên độ P > 2.5mm ở DII = Dày nhĩ phải; P > 0.12s có hai đỉnh ở DI, DII = Dày nhĩ trái; PR bình thường 0.12 - 0.20s; PR ngắn < 0.12s; PR kéo dài > 0.20s).
- **Bước 6: Phức bộ QRS & Đoạn ST, Sóng T** (QRS hẹp < 0.12s hay rộng ≥ 0.12s; Tiêu chuẩn phì đại thất Sokolow-Lyon; Sóng Q hoại tử; ST chênh lên/xuống; T nhọn/âm/dẹt).
- **Bước 7: Khoảng QT/QTc & Kết luận** (Công thức Bazett $QTc = QT / \sqrt{RR}$; QTc kéo dài > 450ms ở nam hoặc > 460ms ở nữ; Kết luận chẩn đoán xác định và chẩn đoán phân biệt).

### 2.2. Phác Đồ Xử Trí Khẩn Cấp (Emergency Protocols Engine)
- Định nghĩa cấu trúc dữ liệu thuốc chuẩn:
  - Liều lượng tiêm/truyền chính xác theo cân nặng hoặc liều cố định.
  - Phân loại can thiệp: Không xâm lấn (Nghiệm pháp Valsalva, xoa xoang cảnh) vs Dược lý (Adenosine, Amiodarone, Atropin, Adrenaline) vs Thủ thuật điện (Sốc điện đồng bộ Synchronized Cardioversion 50-200J, Khử rung Defibrillation 200-360J, Đặt máy tạo nhịp qua da TCP).
- Danh mục cạm bẫy lâm sàng (Red Flags):
  - Chống chỉ định Nitrat và Morphin khi có nhồi máu cơ tim thất phải (huyết động phụ thuộc tiền tải).
  - Chống chỉ định thuốc chẹn nút nhĩ thất (Verapamil, Diltiazem, Digoxin, Chẹn beta) trong rung nhĩ kèm WPW (dẫn truyền xung động qua đường phụ cực nhanh gây rung thất).
  - Chống chỉ định sốc điện không đồng bộ trong nhịp nhanh có mạch còn ổn định (nguy cơ R-on-T gây rung thất).

## 3. Các Bước Triển Khai (Implementation Steps)
1. [x] Tạo module `src/domain/simulators/ecgApproachEngine.ts` chứa dữ liệu và logic đánh giá 7 bước.
2. [x] Tạo module `src/domain/simulators/ecgEmergencyProtocols.ts` chứa danh mục phác đồ xử trí khẩn cấp và cạm bẫy lâm sàng.
3. [x] Viết hàm tính toán tự động đối chiếu các chỉ số ECG hiện tại với 7 bước phân tích.
4. [x] Tạo Unit Tests kiểm tra tính chính xác của các thuật toán xử trí và cảnh báo chống chỉ định.

## 4. Tệp Cần Tạo / Chỉnh Sửa
- `src/domain/simulators/ecgApproachEngine.ts`
- `src/domain/simulators/ecgEmergencyProtocols.ts`
- `src/domain/simulators/ecgMetricsCalculator.ts`
- `tests/ecg_comprehensive_clinical.test.js`

## 5. Tiêu Chuẩn Nghiệm Thu
- [x] Hàm phân tích 7 bước trả về đúng kết quả cho cả 31 bệnh lý.
- [x] Danh mục thuốc cấp cứu hiển thị đúng liều dùng chuẩn theo Bộ Y Tế & AHA.
- [x] Hệ thống cảnh báo đỏ phát hiện chính xác mọi chống chỉ định tương ứng với từng dạng nhịp.
