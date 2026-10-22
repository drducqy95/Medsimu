# Kế Hoạch Milestone M11: Hoàn Thiện Thuật Toán Ánh Xạ Tiêu Chuẩn Chẩn Đoán Lên Điện Tim 12 Chuyển Đạo

> **Hệ Thống:** MedSim ECG Simulator & Trinity Protocol v1.0  
> **Trạng Thái:** Đang Chờ Duyệt (Pending User Approval)  
> **Mã Kế Hoạch:** `M11-CRITERIA-MAPPING-ENGINE`  
> **Dựa trên phản hồi thực tế của Bác sĩ:** Hình ảnh chụp màn hình bệnh `stemi_inferior` (media_1792656760873_c4148371.jpg) khi tick chọn tiêu chuẩn 5 (Sóng Q hoại tử) và tiêu chuẩn 6 (ST chênh vòm & soi gương) nhưng giấy hồng không hiển thị nhãn/thước đo nào.

---

## 1. Phân Tích Thực Trạng & Nguyên Nhân Gốc Rễ (Root Cause Analysis)

### 1.1. Hiện Tượng Trong Ảnh Chụp Thực Tế
* Bác sĩ đang xem ca **STEMI Thành Dưới (`stemi_inferior`)** trên giao diện điện thoại.
* Danh mục 6 tiêu chuẩn lâm sàng mở ra:
  * `[ ] 1. Tần số: Thường 60 - 90 bpm`
  * `[ ] 2. Nhịp điệu: Đều đặn`
  * `[ ] 3. Sóng P: Xoang`
  * `[ ] 4. Khoảng PR: 0.12 - 0.20 giây`
  * `[✓] 5. Phức bộ QRS: Xuất hiện sóng Q hoại tử sâu ở DIII, aVF`
  * `[✓] 6. Đoạn ST & T: ST CHÊNH LÊN DẠNG VÒM >= 1mm ở DII, DIII, aVF. Soi gương ST CHÊNH XUỐNG ở DI, aVL`
* Bác sĩ đã tick chọn tiêu chuẩn 5 và 6 (nút phụ hiển thị `Tắt hết ánh xạ (2)`).
* **Vấn đề nghiêm trọng:** Trên dải giấy hồng 12 chuyển đạo phía dưới, **hoàn toàn không có bất kỳ nhãn hay thước đo nào xuất hiện** (không có thước đo Q hoại tử ở DIII/aVF, không có thước đo ST chênh vòm ở DII/DIII/aVF, không có thước đo ST soi gương ở DI/aVL).

### 1.2. Nguyên Nhân Gốc Rễ (Code-Level Root Cause)
1. Trong file `RealisticPinkEcgPaper.tsx`, hàm `getAnnotationCriterionIndex`:
   ```typescript
   if (typeof ann.criterionIndex === "number" && ann.criterionIndex >= 0 && ann.criterionIndex < criteria.length) {
     return ann.criterionIndex;
   }
   ```
2. Trong dữ liệu `ecgAnnotationsData.ts`, các annotation của `stemi_inferior` bị gán cứng:
   * Nhãn ST chênh vòm mang `criterionIndex: 0`
   * Nhãn ST soi gương mang `criterionIndex: 1`
   * Nhãn Sóng Q hoại tử mang `criterionIndex: 2`
3. Trong khi danh sách tiêu chuẩn hiển thị cho người dùng có 6 mục:
   * Mục 5 (sóng Q hoại tử) có **index = 4**
   * Mục 6 (ST chênh vòm & soi gương) có **index = 5**
4. Khi bác sĩ tick mục 5 và 6:
   * Tập hợp `activeCriteriaIndices` chứa `{4, 5}`.
   * Khi render, hệ thống thấy `ann.criterionIndex` là 0, 1, 2.
   * `activeCriteriaIndices.has(0)` -> **FALSE**
   * `activeCriteriaIndices.has(1)` -> **FALSE**
   * `activeCriteriaIndices.has(2)` -> **FALSE**
   * **Hệ quả:** 100% các nhãn bị bộ lọc loại bỏ thẳng tay, giấy hồng biến thành giấy trơn!
5. **Nghịch lý ngược đời:** Nếu bác sĩ bấm vào Tiêu chuẩn 1 ("Tần số" - index 0) thì trên giấy hồng lại đột ngột hiện ra... ST chênh vòm! Bấm Tiêu chuẩn 2 ("Nhịp điệu" - index 1) lại hiện ra ST soi gương!

---

## 2. Kiến Trúc Giải Pháp: Multi-Factorial Semantic Mapping Engine

Không thể dùng số nguyên cứng `criterionIndex: 0, 1, 2...` vì chỉ cần số lượng tiêu chuẩn thay đổi hoặc thứ tự hiển thị thay đổi là toàn bộ hệ thống bị gãy. Chúng ta sẽ xây dựng cơ chế ánh xạ ngữ nghĩa 3 tầng:

### Chi Tiết 3 Tầng Xử Lý:

1. **Tầng 1 - Chuẩn Hóa Danh Sách Tiêu Chuẩn & Đồng Nhất Dữ Liệu**:
   * Đồng bộ giữa `ECG_RHYTHM_DEFINITIONS` và SQLite `ecg_diagnoses`.
   * Đảm bảo mọi tiêu chuẩn hiển thị đều có cấu trúc rõ ràng:
     - Tên thành phần sóng (Sóng P, Khoảng PR, Phức bộ QRS, Đoạn ST & Sóng T, Khoảng QT / Tần số).
     - Nội dung tiêu chuẩn chẩn đoán AHA/ESC chi tiết.

2. **Tầng 2 - Thuật Toán Khớp Ngữ Nghĩa & Thành Phần Sóng (`matchCriterionToAnnotations`)**:
   * Thay thế hoàn toàn cách lấy `ann.criterionIndex` đơn sơ bằng hàm so khớp đa chiều:
     * **Chiều 1 - Wave Component**:
       - Khớp `RR` với các tiêu chuẩn tần số / nhịp điệu / loạn nhịp.
       - Khớp `P` với các tiêu chuẩn sóng P xoang / trục P.
       - Khớp `PR` với các tiêu chuẩn khoảng PR (kéo dài, ngắn, cố định).
       - Khớp `Q`, `QRS` với các tiêu chuẩn sóng Q hoại tử, thời gian QRS dãn rộng, sóng Delta.
       - Khớp `ST` với các tiêu chuẩn đoạn ST chênh lên dạng vòm, cong lõm, soi gương.
       - Khớp `T` với các tiêu chuẩn sóng T lều, T âm, T đối xứng, T hai pha.
       - Khớp `R`, `S` với tiêu chuẩn điện thế thất (Sokolow-Lyon, Cornell).
       - Khớp `QT`, `U` với tiêu chuẩn khoảng QT/QU kéo dài.
     * **Chiều 2 - Chuyển Đạo Liên Quan**:
       - Với tiêu chuẩn đa yếu tố như STEMI: Tiêu chuẩn ST bao gồm cả "ST chênh vòm ở DII, DIII, aVF" VÀ "ST soi gương ở DI, aVL". Thuật toán sẽ kích hoạt đồng thời cả 2 nhóm nhãn này khi bác sĩ chọn tiêu chuẩn ST!
       - Với tiêu chuẩn Q hoại tử ở DIII, aVF: Kích hoạt nhãn Q trên DIII và aVF.

3. **Tầng 3 - Kiểm Thử Toàn Diện Tự Động Cho Cả 31 Mặt Bệnh Lý (Zero Orphan Policy)**:
   * Viết test tự động duyệt qua tất cả 31 bệnh lý:
     - Giả lập việc tick lần lượt từng tiêu chuẩn từ 1 đến N.
     - Xác thực rằng mỗi khi tick một tiêu chuẩn, luôn có ít nhất một nhãn hoặc thước đo tương ứng được kích hoạt trên đúng chuyển đạo của nó.
     - Xác thực không còn bất kỳ nhãn nào bị kích hoạt nhầm bởi tiêu chuẩn khác.

---

## 3. Kế Hoạch Triển Khai Chi Tiết (Execution Phases)

| Phase | Nhiệm Vụ Cụ Thể | File Tác Động | Kết Quả Đầu Ra |
| :--- | :--- | :--- | :--- |
| **Phase 01** | Xây dựng thuật toán `matchAnnotationToCriterion` chuyên sâu và thay thế `getAnnotationCriterionIndex` cũ | `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx` | Khắc phục 100% lỗi tick tiêu chuẩn không hiện nhãn trên giấy hồng |
| **Phase 02** | Rà soát và chuẩn hóa dữ liệu `annotations` và `criteria` của toàn bộ 31 mặt bệnh lý (đặc biệt các bệnh STEMI, Block AV, WPW, Rối loạn điện giải) | `src/domain/simulators/ecgAnnotationsData.ts`, `src/domain/simulators/ecgWaveforms.ts`, SQLite | Danh mục tiêu chuẩn và nhãn sóng đồng bộ hoàn hảo |
| **Phase 03** | Hỗ trợ kích hoạt đa yếu tố (Multi-factorial) cho các tiêu chuẩn phức hợp (ST chênh + Soi gương; S1Q3T3; Sokolow SV1 + RV5...) | `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx` | 1 click kích hoạt đầy đủ các chuyển đạo liên quan |
| **Phase 04** | Viết bộ test tự động xác thực ánh xạ cho toàn bộ 31 mặt bệnh, kiểm tra Next.js build & TypeScript 0 lỗi | `tests/criteria_semantic_mapping.test.js` | 100% tests pass, không còn tiêu chuẩn mồ côi |

---

## 4. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

1. **Khớp đúng 100% ca `stemi_inferior`**:
   - Khi tick tiêu chuẩn 5 (Sóng Q hoại tử): Hiện ngay thước/nhãn sóng Q ở DIII và aVF.
   - Khi tick tiêu chuẩn 6 (ST chênh vòm & soi gương): Hiện ngay thước ST chênh vòm ở DII, DIII, aVF, Lead II VÀ thước ST soi gương ở DI, aVL.
   - Khi tick tiêu chuẩn 1 hoặc 2: Hiện thước kẹp R-R caliper.
   - Khi tick tiêu chuẩn 3: Hiện nhãn sóng P xoang.
   - Khi tick tiêu chuẩn 4: Hiện thước kẹp khoảng PR caliper.
2. **Áp dụng đồng bộ cho tất cả 31 bệnh lý**.
3. **Chất Lượng Kỹ Thuật**:
   - 0 lỗi TypeScript (`npx tsc --noEmit`).
   - Bộ test tự động kiểm thử 31 mặt bệnh lý pass 100%.
   - Next.js build thành công 13/13 static routes.
