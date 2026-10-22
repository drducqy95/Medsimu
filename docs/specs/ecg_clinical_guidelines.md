# Hướng Dẫn Lâm Sàng Toàn Diện Mô Phỏng Điện Tâm Đồ (ECG Simulator Clinical Guidelines)

> **Tiêu chuẩn học thuật:** Phân nhóm theo Braunwald's Heart Disease & Harrison's Principles of Internal Medicine  
> **Quy chuẩn phác đồ cấp cứu:** Hồi sinh tim phổi nâng cao ACLS / AHA 2020-2025, ESC 2023-2024, Hướng dẫn Chẩn đoán và Điều trị Bệnh Tim Mạch - Bộ Y Tế Việt Nam (VNHA).

---

## 1. Phân Loại 9 Phân Hệ Bệnh Học Tim Mạch (9-System Cardiology Taxonomy)

Hệ thống điện tâm đồ lâm sàng bao phủ toàn diện **31 bệnh lý** phân bổ trên 9 phân hệ tim mạch chuẩn mực:

| STT | Phân Hệ Lâm Sàng | Mã Hệ Thống | Số Ca | Các Bệnh Lý Đại Diện |
|:---:|:---|:---|:---:|:---|
| 1 | **Nút Xoang & Nhịp Cơ Bản** | `sinus_node` | 3 | Nhịp Xoang Bình Thường, Nhịp Nhanh Xoang, Nhịp Chậm Xoang |
| 2 | **Hội Chứng Mạch Vành Cấp (ACS)** | `acute_coronary` | 5 | STEMI Thành Dưới, STEMI Thành Trước Rộng, STEMI Thành Bên, STEMI Thành Sau, NSTEMI / Thiếu Máu Dưới Nội Tâm Mạc Lan Tỏa (Tổn thương Thân Chung LMCA) |
| 3 | **Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh** | `conduction_blocks` | 7 | Block AV Độ I, Block AV Độ II Mobitz I (Wenckebach), Block AV Độ II Mobitz II, Block AV Độ III (Phân Ly Nhĩ - Thất Hoàn Toàn), Block Nhánh Phải (RBBB), Block Nhánh Trái (LBBB), Block Phân Nhánh Trái Trước (LAFB) |
| 4 | **Loạn Nhịp Trên Thất & Kích Thích Sớm** | `supraventricular` | 4 | Rung Nhĩ (AFib), Cuồng Nhĩ (AFlutter), Nhịp Nhanh Kịch Phát Trên Thất (SVT / AVNRT), Hội Chứng Kích Thích Sớm Wolff-Parkinson-White (WPW) |
| 5 | **Loạn Nhịp Thất & Cấp Cứu Ngừng Tuần Hoàn** | `ventricular_arrest` | 5 | Ngoại Tâm Thu Thất Dày (PVC Trigeminy), Cơn Nhanh Thất (VT), Cơn Xoắn Đỉnh (Torsades de Pointes), Rung Thất (VFib), Vô Tâm Thu (Asystole) |
| 6 | **Phì Đại Buồng Tim & Tăng Gánh** | `chamber_hypertrophy` | 1 | Phì Đại Thất Trái Kèm Tăng Gánh Tâm Thu (LVH with Strain) |
| 7 | **Bệnh Lý Kênh Ion Di Truyền & Đột Tử** | `channelopathies` | 1 | Hội Chứng Brugada Type 1 (Coved-type) |
| 8 | **Cấp Cứu Tim Phổi & Màng Ngoài Tim** | `cardiopulmonary_pericardial` | 2 | Thuyên Tắc Động Mạch Phổi Cấp (Tam chứng S1Q3T3), Viêm Màng Ngoài Tim Cấp |
| 9 | **Rối Loạn Điện Giải & Nhiễm Độc Thuốc** | `metabolic_toxicology` | 3 | Tăng Kali Máu Nặng (Sóng T hình lều), Hạ Kali Máu (Sóng U nổi bật), Ngộ Độc Thuốc Digitalis / Digoxin (ST hình đáy chén Salvador Dali) |

---

## 2. Quy Trình Phân Tích Điện Tâm Đồ 7 Bước Chuẩn Y Khoa

Nhằm phòng tránh việc bỏ sót tổn thương nguy hiểm, toàn bộ các ca bệnh đều được đối chiếu tự động qua engine 7 bước:

1. **Bước 1: Kỹ thuật ghi & Test điện thế (Calibration & Artifacts):**
   - Tốc độ chuẩn: 25 mm/s (1 ô nhỏ = 0.04s, 1 ô lớn = 0.20s).
   - Test điện thế: 10 mm/mV (1 ô nhỏ = 0.1 mV, 1 ô lớn = 0.5 mV).
   - Kiểm tra chuyển đạo aVR: Phải có sóng P âm, phức bộ QRS âm, sóng T âm. Nếu dương: cảnh báo mắc ngược điện cực hai tay hoặc đảo ngược phủ tạng.
2. **Bước 2: Tần số tim (Heart Rate):**
   - Công thức: 300 / số ô lớn hoặc 1500 / số ô nhỏ giữa 2 sóng R liên tiếp.
   - Phân loại: Nhịp chậm (< 60 bpm), Bình thường (60 - 100 bpm), Nhịp nhanh (> 100 bpm).
3. **Bước 3: Nhịp tim & Tính đều đặn (Rhythm & Regularity):**
   - Đánh giá khoảng R-R có đều không.
   - Sóng P xoang: Dương ở DI, DII, aVF; âm ở aVR. Mỗi sóng P đi trước một phức bộ QRS.
4. **Bước 4: Trục điện tim (QRS Electrical Axis):**
   - Dựa trên tổng đại số QRS ở DI và aVF.
   - Trục bình thường: 0° đến +90°.
   - Trục lệch trái: -30° đến -90° (LAFB, LVH nặng, sẹo NMCT thành dưới cũ).
   - Trục lệch phải: +90° đến +180° (RBBB, RVH, Thuyên tắc phổi cấp S1Q3T3).
   - Trục vô định (Northwest Axis): Cực đoan chỉ điểm Cơn nhanh thất (VT) hoặc tăng kali máu nặng.
5. **Bước 5: Sóng P & Khoảng PR (Atrial Depolarization & AV Conduction):**
   - P bình thường: Biên độ < 2.5 mm, thời gian < 0.12s.
   - Khoảng PR chuẩn: 0.12 - 0.20s (3 - 5 ô nhỏ).
   - PR > 0.20s: Block AV độ I hoặc chu kỳ Wenckebach.
   - PR < 0.12s: Hội chứng kích thích sớm WPW (kèm sóng Delta).
6. **Bước 6: Phức bộ QRS, Đoạn ST & Sóng T (Ventricular Depolarization & Repolarization):**
   - QRS hẹp: < 0.12s. QRS rộng: ≥ 0.12s (Block nhánh, nhịp thoát thất, ngoại tâm thu thất, tăng kali máu).
   - Sóng Q hoại tử: Rộng ≥ 0.04s hoặc sâu ≥ 25% chiều cao sóng R kế tiếp.
   - Đoạn ST: Điểm J chênh lên dạng bia mộ (STEMI) hoặc chênh xuống đi ngang/dốc xuống (thiếu máu cơ tim).
   - Sóng T: T cao nhọn đối xứng hình lều (Tăng K+), T đảo ngược sâu đối xứng (thiếu máu), T dẹt kèm sóng U (Hạ K+).
7. **Bước 7: Khoảng QT/QTc & Kết luận toàn diện (QT Interval & Final Conclusion):**
   - Công thức Bazett: $QTc = QT / \sqrt{RR}$.
   - QTc kéo dài > 460ms (nữ) hoặc > 450ms (nam): Nguy cơ R-on-T kích phát Cơn Xoắn Đỉnh (Torsades de Pointes).
   - QTc ngắn < 340ms: Nhiễm độc Digoxin hoặc tăng canxi máu.

---

## 3. Ma Trận Cạm Bẫy Lâm Sàng & Chống Chỉ Định Tuyệt Đối (Red Flags Matrix)

| Bệnh Lý ECG | Y Lệnh Nguy Hiểm Cấm Kỵ | Hậu Quả Lâm Sàng | Cơ Chế Bệnh Sinh & Giải Pháp An Toàn |
|:---|:---|:---|:---|
| **STEMI Thành Dưới + Thất Phải** (`stemi_inferior`) | **Nitroglycerin / Morphin** | Tụt huyết áp trụy mạch đột ngột, sốc tim tử vong | Thất phải bị nhồi máu mất co bóp, phụ thuộc 100% vào tiền tải tĩnh mạch. Nitrat gây giãn tĩnh mạch triệt tiêu tiền tải. **Xử trí: Truyền nhanh 500-1000ml NaCl 0.9% và chuyển PCI thì đầu.** |
| **Rung Nhĩ Kèm WPW** (`wpw_syndrome` + `atrial_fibrillation`) | **Verapamil, Diltiazem, Digoxin, Chẹn Beta, Adenosine** | Khởi phát ngay lập tức Rung Thất (VF) gây đột tử | Chẹn nút AV sẽ dồn toàn bộ xung động nhĩ cực nhanh (400-600 cpm) dẫn truyền qua cầu Kent (đường phụ không trơ), kích hoạt thất co bóp 300-400 bpm chuyển thành rung thất. **Xử trí: Sốc điện đồng bộ 200J.** |
| **Ngộ Độc Digitalis** (`digoxin_toxicity`) | **Canxi Gluconat / Canxi Clorid 10%** | Ngừng tim thể co cứng ("Stone Heart") không hồi phục | Digoxin ức chế bơm Na+/K+ ATPase gây thừa canxi nội bào. Tiêm canxi ngoại bào làm canxi tràn ngập ty thể khiến actin-myosin co rút cứng đờ vĩnh viễn. **Xử trí: Dùng kháng thể đặc hiệu DigiFab 10-20 lọ, Magnesi 2g.** |
| **Vô Tâm Thu** (`asystole`) | **Sốc điện phá rung (Defibrillation / Cardioversion)** | Phá hủy cơ tim nặng, mất thời gian vàng ép tim | Vô tâm thu không có hoạt động điện để khử cực. Phóng điện chỉ sinh nhiệt làm cháy cơ tim. **Xử trí: Ép tim CPR liên tục 100-120 l/p + Adrenaline 1mg IV mỗi 3-5 phút.** |
| **Cơn Xoắn Đỉnh** (`torsades_de_pointes`) | **Amiodarone, Sotalol, Procainamide** | Kéo dài thêm QT, thoái triển thành Rung thất | Thuốc nhóm III chẹn kênh Kali IKr làm chậm thêm tái cực thất. **Xử trí: Tiêm Magnesi Sulfat 2g IV trong 1-2 phút, tạo nhịp thất nhanh (Overdrive Pacing 90-110 bpm).** |
| **Hội Chứng Brugada Type 1** (`brugada_type1`) | **Flecainide, Propafenone, Lignocaine** | Bùng phát ST vòm bia mộ và kích hoạt rung thất | Thuốc chẹn kênh Natri làm trầm trọng thêm khiếm khuyết dòng INa của đột biến SCN5A. **Xử trí: Hạ sốt tích cực, chỉ định cấy máy ICD, truyền Isoproterenol nếu có bão nhịp.** |

---

## 4. Liên Thông Hai Chiều: Module 2 (ECG Lab) ↔ Module 3 (ER Ward)

Khi người học phát hiện một ca bệnh cấp cứu nguy kịch trên màn hình mô phỏng ECG:
1. Bấm nút **"🚨 Chuyển Bệnh Nhân Này Vào Buồng Cấp Cứu (Module 3)"**.
2. Hệ thống đóng gói toàn bộ dữ liệu:
   - Danh tính bệnh nhân, tuổi, giới, lý do vào viện, bệnh sử tóm tắt.
   - Sinh hiệu đầu vào (Huyết áp, Mạch, Nhịp thở, SpO2, Thân nhiệt).
   - Kết quả xét nghiệm cấp cứu tại giường (Troponin I siêu nhạy, K+, Na+, BNP).
   - Mức độ ưu tiên ACLS (`CODE RED` / `STAT`).
3. Điều hướng người học trực tiếp vào buồng hồi sức tích cực (`/treatment/[caseId]`), nơi monitor đầu giường phản ánh chính xác nhịp tim và hình dạng sóng đã chọn, sẵn sàng cho việc ra y lệnh cứu sống người bệnh.
