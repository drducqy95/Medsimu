# Phase 01: Kiểm Kê & Thiết Lập Ma Trận Đạo Trình Toàn Diện

## 1. Mục Tiêu & Phương Pháp Luận
- Khắc phục triệt để tình trạng: Tiêu chuẩn chẩn đoán đề cập nhiều chuyển đạo nhưng chỉ có 1 chuyển đạo được gắn nhãn, hoặc có tiêu chuẩn hoàn toàn không có nhãn.
- Xây dựng ma trận ánh xạ 12 chuyển đạo theo giải phẫu tim mạch:
  - **Dãy chi ngoại vi**: `DI, DII, DIII, aVR, aVL, aVF`.
  - **Dãy trước tim**: `V1, V2, V3, V4, V5, V6`.
  - **Dải nhịp liên tục**: `Lead II Rhythm Strip`.

---

## 2. Ma Trận Ánh Xạ Chi Tiết Cho Các Nhóm Bệnh Trọng Điểm

### 2.1. Hội Chứng Mạch Vành Cấp (STEMI / NSTEMI)
1. **STEMI Thành Dưới (`stemi_inferior`)**:
   - TC 0 (ST chênh lên dạng vòm): Phủ đủ **DII, DIII, aVF** VÀ **Lead II Strip**.
   - TC 1 (ST soi gương chênh xuống): Phủ đủ **DI, aVL**.
   - TC 2 (Sóng Q hoại tử): Phủ đủ **DIII, aVF** (và DII nếu sâu).
   - TC 3 (Sóng T tối cấp / T âm): Phủ đủ **DII, DIII, aVF**.
2. **STEMI Trước Vách / Trước Rộng (`stemi_anterior`)**:
   - TC 0 (ST chênh vòm / Tombstone): Phủ đủ **V1, V2, V3, V4**.
   - TC 1 (Mất sóng r dạng QS hoại tử): Phủ đủ **V1, V2, V3**.
   - TC 2 (ST soi gương): Phủ đủ **DIII, aVF**.
   - TC 3 (Sóng T tối cấp): Phủ đủ **V2, V3, V4**.
3. **STEMI Thành Bên (`stemi_lateral`)**:
   - TC 0 (ST chênh bên cao): Phủ đủ **DI, aVL**.
   - TC 1 (ST chênh bên thấp): Phủ đủ **V5, V6**.
   - TC 2 (Q hoại tử thành bên): Phủ đủ **DI, aVL, V6**.
   - TC 3 (Soi gương thành dưới): Phủ đủ **DIII, aVF**.
4. **STEMI Thành Sau (`stemi_posterior`)**:
   - TC 0 (R cao ưu thế ở V1-V2): Phủ đủ **V1, V2**.
   - TC 1 (ST chênh xuống nằm ngang ở V1-V3): Phủ đủ **V1, V2, V3**.
   - TC 2 (Sóng T dương thẳng đứng ở V1-V2): Phủ đủ **V1, V2**.
   - TC 3 (Xác nhận chuyển đạo sau V7-V9): Ghi chú chuyển đạo bổ sung.

### 2.2. Rối Loạn Dẫn Truyền & Block
1. **Block AV độ 1 (`av_block_first_degree`)**:
   - TC 0 (PR kéo dài > 200ms cố định): Phủ đủ **DII, V1, V5** VÀ **Lead II Strip**.
   - TC 1 (Mỗi sóng P đều dẫn QRS): Phủ đủ **DII, Lead II Strip**.
   - TC 2 (Hình thái P và QRS bình thường): Phủ đủ **DI, V1**.
   - TC 3 (Nhịp tim đều đặn): Phủ đủ **Lead II Strip**.
2. **Block AV độ 2 Mobitz 1 (Wenckebach) (`av_block_mobitz_1`)**:
   - TC 0 (PR dài dần qua các chu kỳ): Phủ đủ **DII, Lead II Strip**.
   - TC 1 (P bị rớt không dẫn QRS): Phủ đủ **DII, Lead II Strip**.
   - TC 2 (Chu kỳ lặp lại PR ngắn nhất): Phủ đủ **Lead II Strip**.
   - TC 3 (QRS hẹp bình thường): Phủ đủ **V1, V5**.
3. **Block AV độ 2 Mobitz 2 (`av_block_mobitz_2`)**:
   - TC 0 (PR cố định trước nhát rớt): Phủ đủ **DII, Lead II Strip**.
   - TC 1 (Rớt QRS đột ngột): Phủ đủ **DII, Lead II Strip**.
   - TC 2 (Tỷ lệ dẫn 2:1, 3:1): Phủ đủ **Lead II Strip**.
   - TC 3 (QRS dãn rộng nếu block dưới bó His): Phủ đủ **V1, V6**.
4. **Block AV độ 3 hoàn toàn (`av_block_third_degree`)**:
   - TC 0 (Phân ly nhĩ thất hoàn toàn): Phủ đủ **DII, Lead II Strip**.
   - TC 1 (Sóng P xoang tần số 70-80 đều): Phủ đủ **DII, aVR, V1**.
   - TC 2 (Nhịp thoát thất rộng chậm 30-40): Phủ đủ **V1, V5, Lead II Strip**.
   - TC 3 (PR biến thiên liên tục): Phủ đủ **Lead II Strip**.
5. **Block Nhánh Phải (`rbbb`)**:
   - TC 0 (QRS dãn rộng ≥ 120ms): Phủ đủ **V1, V6, Lead II Strip**.
   - TC 1 (rsR' dạng tai thỏ): Phủ đủ **V1, V2**.
   - TC 2 (Sóng S sâu rộng, tù): Phủ đủ **DI, aVL, V6**.
   - TC 3 (ST chênh xuống và T âm thứ phát): Phủ đủ **V1, V2**.
6. **Block Nhánh Trái (`lbbb`)**:
   - TC 0 (QRS dãn rộng ≥ 120ms): Phủ đủ **DI, aVL, V5, V6, Lead II Strip**.
   - TC 1 (Sóng R rộng chẻ đôi / có khấc): Phủ đủ **DI, aVL, V5, V6**.
   - TC 2 (Mất sóng Q sinh lý): Phủ đủ **DI, aVL, V5, V6**.
   - TC 3 (Dạng rS hoặc QS sâu rộng): Phủ đủ **V1, V2, V3**.
   - TC 4 (ST và T thứ phát trái chiều): Phủ đủ **V1, V6**.

### 2.3. Rối Loạn Điện Giải & Chuyển Hóa
1. **Tăng Kali Máu (`hyperkalemia`)**:
   - TC 0 (Sóng T lều nhọn đối xứng đáy hẹp): Phủ trọn vẹn **V1, V2, V3, V4, V5, V6** VÀ **Lead II Strip**.
   - TC 1 (PR kéo dài & Sóng P dẹt): Phủ đủ **DII, V1**.
   - TC 2 (QRS dãn rộng hòa vào sóng T hình sin): Phủ đủ **V1, V2, V3, Lead II Strip**.
   - TC 3 (Nguy cơ rung thất / ngừng tim): Phủ đủ **Lead II Strip**.
2. **Hạ Kali Máu (`hypokalemia`)**:
   - TC 0 (Sóng U nổi bật): Phủ đủ **V2, V3, V4**.
   - TC 1 (Sóng T dẹt hoặc đảo ngược): Phủ đủ **DI, DII, V4, V5**.
   - TC 2 (ST chênh xuống nhẹ): Phủ đủ **DII, V5, V6**.
   - TC 3 (Khoảng QU kéo dài): Phủ đủ **V2, V3, Lead II Strip**.

### 2.4. Loạn Nhịp Trên Thất & Thất
- **Rung Nhĩ (`atrial_fibrillation`)**:
  - TC 0 (Mất sóng P, thay bằng sóng f lăn tăn): Phủ đủ **V1, DII**.
  - TC 1 (Khoảng R-R hoàn toàn không đều): Phủ đủ **DII, V1, V5, Lead II Strip**.
  - TC 2 (Tần số đáp ứng thất không theo quy luật): Phủ đủ **Lead II Strip**.
  - TC 3 (QRS hẹp bình thường): Phủ đủ **V1, V5**.
- **Cuồng Nhĩ (`atrial_flutter`)**:
  - TC 0 (Sóng răng cưa F âm liên tục): Phủ đủ **DII, DIII, aVF, Lead II Strip**.
  - TC 1 (Tần số nhĩ 300 bpm): Phủ đủ **DII, Lead II Strip**.
  - TC 2 (Dẫn truyền 2:1 tần số thất 150 bpm): Phủ đủ **Lead II Strip**.
- **Nhanh Kịch Phát Trên Thất (`svt`)**:
  - TC 0 (Nhịp đều nhanh 150-250 bpm): Phủ đủ **DII, Lead II Strip**.
  - TC 1 (QRS hẹp < 120ms): Phủ đủ **V1, V5, Lead II Strip**.
  - TC 2 (Sóng P bị vùi trong QRS hoặc đi ngay sau r'): Phủ đủ **V1, DII**.
- **Nhanh Thất (`ventricular_tachycardia`)**:
  - TC 0 (QRS dãn rộng dị dạng > 120ms): Phủ đủ **DI, DII, V1, V4, V6, Lead II Strip**.
  - TC 1 (Tần số thất nhanh 140-220 bpm đều): Phủ đủ **Lead II Strip**.
  - TC 2 (Phân ly nhĩ thất / P độc lập): Phủ đủ **DII, V1**.
  - TC 3 (Nhát bắt được thất Capture / Fusion beat): Phủ đủ **Lead II Strip**.

---

## 3. Tiêu Chuẩn Nghiệm Thu
- [ ] Ma trận phủ kín 100% (31/31 bệnh lý, không còn bất kỳ tiêu chuẩn nào thiếu ánh xạ).
- [ ] Mỗi tiêu chuẩn có ít nhất từ 2 đến 6 đạo trình được gắn nhãn tương ứng theo đúng vị trí giải phẫu.
