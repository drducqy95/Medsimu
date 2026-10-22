# Phase 04: Rà Soát & Ánh Xạ Đa Yếu Tố Toàn Diện 139 Tiêu Chuẩn / 31 Bệnh Lý

Status: ⬜ Pending
Dependencies: Phase 01, Phase 02, Phase 03

## 1. Yêu Cầu Từ Bác Sĩ
> *"Với các tiêu chuẩn có đa yếu tố, cần thể hiện đầy đủ, ví dụ P dương ở DI, DII, aVF, âm ở aVR cần thể hiện đầy đủ, soát với tất cả tiêu chuẩn"*

---

## 2. Nguyên Tắc Ánh Xạ Đa Yếu Tố (Multi-Factorial Mapping Protocol)

1. **Nguyên Tắc Bật Đồng Thì (Simultaneous Multi-Lead Activation)**:
   - Khi một tiêu chuẩn được kích hoạt (`activeCriteriaIndices.has(criterionIndex)`), **TẤT CẢ** các chuyển đạo được tiêu chuẩn đó đề cập đều lập tức hiển thị nhãn/thước đo tương ứng.
   - Ví dụ: Bác sĩ click dòng tiêu chuẩn *"Sóng P âm ở aVR, dương ở DI, DII, aVF"*:
     - **DI**: `▲ Sóng P dương ở DI (+0.12 mV)`
     - **DII**: `▲ Sóng P dương ở DII (+0.15 mV)`
     - **aVF**: `▲ Sóng P dương ở aVF (+0.10 mV)`
     - **aVR**: `▼ Sóng P âm ở aVR (-0.12 mV)`
     - **Lead II Strip**: `▲ Sóng P xoang dẫn truyền`
2. **Triệt Tiêu 100% Tiêu Chuẩn Mồ Côi (Zero 0-Lead Criteria)**:
   - Hiện tại có 53/139 tiêu chuẩn chưa được gắn chuyển đạo nào.
   - Cần bổ sung đầy đủ nhãn/thước đo cho toàn bộ 53 tiêu chuẩn này trong cả CSDL SQLite (`data/medsim.db`) và dictionary fallback (`FALLBACK_ANNOTATIONS`).
3. **Phân Loại Thành Phần Sóng (Wave Components)**:
   - `P`: Thể hiện cực tính (+/-), biên độ và hình dạng sóng P.
   - `PR`: Thước đo khoảng PR từ chân P đến khởi đầu QRS.
   - `QRS`: Thể hiện độ rộng QRS (> 120ms), dạng tai thỏ (rsR'), sóng chữ M, sóng Q hoại tử hoặc sóng S sâu.
   - `ST`: Thước đo biên độ chênh lên / chênh xuống từ đường đẳng điện baseline.
   - `T`: Thước đo chiều cao sóng T lều, T âm hoặc T dẹt.
   - `U`: Thể hiện sóng U nổi bật sau T trong hạ kali máu.
   - `RR`: Thước đo kẹp calipers 2 đầu giữa 2 đỉnh R liên tiếp kèm số ms và ô lớn.

---

## 3. Danh Mục Rà Soát & Ánh Xạ Đa Yếu Tố Cho 31 Bệnh Lý

### 3.1. Hệ I: Nút Xoang & Nhịp Cơ Bản
- **Nhịp Xoang Bình Thường (`normal_sinus`)**:
  - Tiêu chuẩn 1 (P xoang): DII, V1, Rhythm II.
  - Tiêu chuẩn 2 (P âm aVR, dương DI, DII, aVF): **DI, DII, aVF, aVR, Rhythm II**.
  - Tiêu chuẩn 3 (PR 120-200ms): DII, V1, Rhythm II (Caliper).
  - Tiêu chuẩn 4 (R-R đều 60-100 bpm): DII, Rhythm II (Caliper).
  - Tiêu chuẩn 5 (QRS hẹp & ST đẳng điện): V1, V5, Rhythm II.
- **Nhịp Nhanh Xoang (`sinus_tachycardia`)**:
  - Tiêu chuẩn 1 (HR > 100 bpm, R-R ngắn): DII, Rhythm II (Caliper).
  - Tiêu chuẩn 2 (P xoang dương DI, DII, aVF, âm aVR): **DI, DII, aVF, aVR, Rhythm II**.
  - Tiêu chuẩn 3 (PR 120-200ms): DII, Rhythm II (Caliper).
- **Nhịp Chậm Xoang (`sinus_bradycardia`)**:
  - Tiêu chuẩn 1 (HR < 60 bpm, R-R dãn dài): DII, Rhythm II (Caliper).
  - Tiêu chuẩn 2 (P xoang dương DI, DII, aVF, âm aVR): **DI, DII, aVF, aVR, Rhythm II**.

### 3.2. Hệ II: Bệnh Mạch Vành Cấp & Mạn
- **STEMI Thành Dưới (`stemi_inferior`)**:
  - Tiêu chuẩn 1 (ST chênh lên vòm): **DII, DIII, aVF, Rhythm II** (Thước đo dọc ST).
  - Tiêu chuẩn 2 (ST chênh xuống soi gương): **DI, aVL** (Thước đo dọc ST).
  - Tiêu chuẩn 3 (Sóng Q hoại tử rộng): **DIII, aVF**.
  - Tiêu chuẩn 4 (Sóng T tối cấp): **DII, DIII, aVF**.
- **STEMI Thành Trước Rộng (`stemi_anterior`)**:
  - Tiêu chuẩn 1 (ST chênh lên vòm bia mộ): **V1, V2, V3, V4, V5, V6** (Thước đo dọc ST).
  - Tiêu chuẩn 2 (Mất r / dạng QS xuyên thành): **V1, V2, V3, V4**.
  - Tiêu chuẩn 3 (ST chênh xuống soi gương): **DII, DIII, aVF, Rhythm II**.
  - Tiêu chuẩn 4 (Sóng T tối cấp): **V2, V3, V4**.
- **STEMI Thành Bên (`stemi_lateral`)**:
  - Tiêu chuẩn 1 (ST chênh lên bên cao & bên thấp): **DI, aVL, V5, V6**.
  - Tiêu chuẩn 2 (ST soi gương): **DII, DIII, aVF, Rhythm II**.
- **STEMI Thành Sau Thực Thụ (`stemi_posterior`)**:
  - Tiêu chuẩn 1 (ST chênh xuống soi gương đi ngang): **V1, V2, V3**.
  - Tiêu chuẩn 2 (R cao nổi bật R/S > 1): **V1, V2**.
  - Tiêu chuẩn 3 (T dương cao nhọn đối xứng): **V1, V2**.
- **Thiếu Máu Dưới Nội Tâm Mạc / NSTEMI (`nemi_subendocardial`)**:
  - Tiêu chuẩn 1 (ST chênh xuống đi ngang/dốc xuống): **DI, aVL, V4, V5, V6**.
  - Tiêu chuẩn 2 (ST chênh lên duy nhất ở aVR): **aVR**.
  - Tiêu chuẩn 3 (T âm sâu đối xứng): **V4, V5, V6**.

### 3.3. Hệ III: Rối Loạn Dẫn Truyền & Block
- **Block AV Độ I (`av_block_first_degree`)**:
  - Tiêu chuẩn 1 (PR kéo dài > 200ms): **DII, V1, Rhythm II** (Caliper).
  - Tiêu chuẩn 2 (Tỉ lệ 1:1, không rớt QRS): **Rhythm II, DII**.
- **Block AV Độ II Mobitz I (`av_block_mobitz_1`)**:
  - Tiêu chuẩn 1 (PR dài dần): **DII, Rhythm II** (Caliper).
  - Tiêu chuẩn 2 (Rớt QRS sau P): **DII, Rhythm II**.
- **Block AV Độ II Mobitz II (`av_block_mobitz_2`)**:
  - Tiêu chuẩn 1 (PR cố định): **DII, Rhythm II**.
  - Tiêu chuẩn 2 (Đột ngột rớt QRS): **DII, Rhythm II**.
- **Block AV Độ III (`av_block_third_degree`)**:
  - Tiêu chuẩn 1 (Phân ly nhĩ - thất hoàn toàn): **Rhythm II, DII**.
  - Tiêu chuẩn 2 (Sóng P xoang đều tần số 60-90): **DII, Rhythm II**.
  - Tiêu chuẩn 3 (Thoát thất chậm 20-45 bpm): **DII, Rhythm II** (Caliper).
- **RBBB - Block Nhánh Phải (`rbbb`)**:
  - Tiêu chuẩn 1 (rsR' dạng tai thỏ): **V1, V2**.
  - Tiêu chuẩn 2 (Sóng S sâu rộng > 40ms): **DI, aVL, V5, V6**.
  - Tiêu chuẩn 3 (QRS dãn rộng ≥ 120ms): **V1, V6, Rhythm II** (Caliper).
  - Tiêu chuẩn 4 (ST chênh xuống & T âm thứ phát): **V1, V2**.
- **LBBB - Block Nhánh Trái (`lbbb`)**:
  - Tiêu chuẩn 1 (Sóng R rộng có khía dạng chữ M): **DI, aVL, V5, V6**.
  - Tiêu chuẩn 2 (Sóng QS hoặc rS sâu rộng): **V1, V2**.
  - Tiêu chuẩn 3 (Mất sóng Q vách liên thất): **DI, aVL, V5, V6**.
  - Tiêu chuẩn 4 (ST-T thứ phát ngược hướng QRS): **V1, V5, V6, Rhythm II**.

### 3.4. Hệ IV: Loạn Nhịp Trên Thất
- **Rung Nhĩ (`atrial_fibrillation`)**:
  - Tiêu chuẩn 1 (Mất sóng P xoang): **DII, V1, Rhythm II**.
  - Tiêu chuẩn 2 (Sóng lăn tăn f 400-600 cpm): **V1, Rhythm II**.
  - Tiêu chuẩn 3 (R-R hoàn toàn không đều): **Rhythm II, DII** (Dual Caliper).
- **Cuồng Nhĩ (`atrial_flutter`)**:
  - Tiêu chuẩn 1 (Sóng răng cưa F 300 cpm): **DII, DIII, aVF, Rhythm II**.
  - Tiêu chuẩn 2 (Sóng F âm liên tục không đường đẳng điện): **DII, DIII, aVF**.
  - Tiêu chuẩn 3 (Dẫn truyền 2:1 hoặc 4:1): **Rhythm II, DII** (Caliper).
- **Cơn Nhịp Nhanh Kịch Phát Trên Thất (`svt_psvt`)**:
  - Tiêu chuẩn 1 (QRS hẹp, đều, 150-250 bpm): **DII, Rhythm II** (Caliper).
  - Tiêu chuẩn 2 (P lẫn vào QRS hoặc âm giả r' ở V1): **V1, DII**.

### 3.5. Hệ V: Loạn Nhịp Thất & Nguy Kịch
- **Nhanh Thất Đơn Dạng (`vt_monomorphic`)**:
  - Tiêu chuẩn 1 (QRS dãn rộng > 140ms đồng dạng): **V1, V5, Rhythm II** (Caliper).
  - Tiêu chuẩn 2 (Tần số thất 150-250 bpm): **Rhythm II, DII**.
  - Tiêu chuẩn 3 (Phân ly nhĩ thất / Nhát bắt được thất): **Rhythm II**.
- **Xoắn Đỉnh (`torsades_de_pointes`)**:
  - Tiêu chuẩn 1 (Đỉnh QRS xoay quanh đường đẳng điện): **DII, Rhythm II**.
  - Tiêu chuẩn 2 (Chuỗi Ngắn - Dài - Ngắn khởi phát): **Rhythm II**.
- **Rung Thất (`ventricular_fibrillation`)**:
  - Tiêu chuẩn 1 (Mất hoàn toàn QRS, ST, T; sóng hỗn loạn vô định hình): **Toàn bộ 12 chuyển đạo & Rhythm II**.

### 3.6. Hệ VI: Phì Đại & Dày Buồng Tim
- **Phì Đại Thất Trái Tăng Gánh (`lvh_strain`)**:
  - Tiêu chuẩn 1 (Sokolow-Lyon: S V1 + R V5/V6 > 35mm): **V1** (S caliper) và **V5** (R caliper).
  - Tiêu chuẩn 2 (Cornell: R aVL + S V3 > 28mm nam / > 20mm nữ): **aVL** (R caliper) và **V3** (S caliper).
  - Tiêu chuẩn 3 (Strain pattern: ST chênh xuống và T âm): **DI, aVL, V5, V6**.
  - Tiêu chuẩn 4 (Trục lệch trái & thời gian nhánh nội điện kéo dài): **DI, aVL, V5**.

### 3.7. Hệ VII: Bệnh Lý Tim Phổi Cấp & Brugada
- **Thuyên Tắc Phổi Cấp (`pulmonary_embolism`)**:
  - Tiêu chuẩn 1 (Nhịp nhanh xoang): **DII, Rhythm II**.
  - Tiêu chuẩn 2 (Tam chứng S1Q3T3): **DI** (S sâu), **DIII** (Q sâu), **DIII** (T âm).
  - Tiêu chuẩn 3 (T âm đối xứng V1-V4): **V1, V2, V3, V4**.
  - Tiêu chuẩn 4 (Sóng P phế > 2.5mm): **DII, aVF**.
- **Hội Chứng Brugada Type 1 (`brugada_type1`)**:
  - Tiêu chuẩn 1 (ST chênh lên dạng vòm dốc xuống ≥ 2mm): **V1, V2** (Thước đo dọc ST).
  - Tiêu chuẩn 2 (ST nối tiếp T âm đối xứng sâu): **V1, V2**.
  - Tiêu chuẩn 3 (Không có khoảng đẳng điện): **V1, V2**.

### 3.8. Hệ VIII: Viêm Màng Ngoài Tim Cấp & Tái Cực Sớm
- **Viêm Màng Ngoài Tim Cấp (`acute_pericarditis`)**:
  - Tiêu chuẩn 1 (ST chênh lên lõm lòng thuyền lan tỏa): **DI, DII, DIII, aVF, V2, V3, V4, V5, V6** (9 chuyển đạo!).
  - Tiêu chuẩn 2 (PR chênh xuống lan tỏa): **DI, DII, aVF, V4, V5, V6**.
  - Tiêu chuẩn 3 (PR chênh lên và ST chênh xuống ở aVR & V1): **aVR, V1**.

### 3.9. Hệ IX: Rối Loạn Điện Giải & Nhiễm Độc Thuốc
- **Tăng Kali Máu Nặng (`hyperkalemia`)**:
  - Tiêu chuẩn 1 (Sóng T lều cao nhọn đối xứng): **V2, V3, V4, V5, V6, Rhythm II** (Thước đo chiều cao T).
  - Tiêu chuẩn 2 (PR kéo dài & QRS dãn rộng): **DII, V1, Rhythm II**.
  - Tiêu chuẩn 3 (Sóng P dẹt hoặc biến mất): **DII, aVF**.
- **Hạ Kali Máu Nặng (`hypokalemia`)**:
  - Tiêu chuẩn 1 (Sóng T dẹt hoặc âm): **V2, V3, V4, V5, DII**.
  - Tiêu chuẩn 2 (Sóng U nổi bật sau T): **V2, V3, V4**.
  - Tiêu chuẩn 3 (ST chênh xuống nhẹ): **V4, V5, V6**.
  - Tiêu chuẩn 4 (Khoảng QU kéo dài): **Rhythm II, DII** (Caliper).
- **Nhiễm Độc Digoxin (`digoxin_toxicity`)**:
  - Tiêu chuẩn 1 (ST cong lõm hình đáy chén / Salvador Dali): **DI, aVL, V4, V5, V6**.
  - Tiêu chuẩn 2 (Khoảng QT ngắn lại): **V5, Rhythm II** (Caliper).
  - Tiêu chuẩn 3 (Ngoại tâm thu thất dạng nhịp đôi Bigeminy): **Rhythm II, DII**.

---

## 4. Các File Cần Cập Nhật
1. `scripts/seed_ecg_comprehensive_diagnoses.js`: Nạp toàn bộ danh mục annotations đa yếu tố vào bảng `ecg_diagnoses`.
2. `data/medsim.db`: Thực thi seed script cập nhật SQLite.
3. `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx`: Cập nhật `FALLBACK_ANNOTATIONS` đồng bộ 100% với SQLite.
4. `src/domain/simulators/ecgWaveforms.ts`: Đảm bảo điện thế các sóng phù hợp các chuyển đạo kích hoạt.

---

## 5. Tiêu Chuẩn Nghiệm Thu
- [ ] 100% (139/139) tiêu chuẩn có ít nhất 2 đến 9 chuyển đạo ánh xạ (0 tiêu chuẩn mồ côi).
- [ ] Bật tiêu chuẩn "P âm aVR, dương DI, DII, aVF" -> Cả 4 chuyển đạo DI, DII, aVF, aVR đồng loạt sáng nhãn.
- [ ] Bật tiêu chuẩn "Sokolow-Lyon" -> V1 hiện thước đo sóng S sâu, V5 hiện thước đo sóng R cao.
- [ ] Bật tiêu chuẩn "Tam chứng S1Q3T3" -> DI hiện sóng S, DIII hiện sóng Q và sóng T âm.
- [ ] Bật tiêu chuẩn "Viêm màng ngoài tim" -> 9 chuyển đạo đồng loạt hiện thước đo ST chênh lên lõm lòng thuyền.
