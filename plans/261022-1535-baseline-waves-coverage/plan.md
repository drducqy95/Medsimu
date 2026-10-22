# Kế Hoạch Milestone M12: Toàn Diện Hóa Thước Đo Cơ Bản (R-R, PR, Sóng P) & Ánh Xạ Phủ Kín 100% Tiêu Chuẩn Cho Cả 31 Mặt Bệnh Lý

> **Hệ Thống:** MedSim ECG Simulator & Trinity Protocol v1.0  
> **Trạng Thái:** Đang Chờ Duyệt (Pending User Approval)  
> **Mã Kế Hoạch:** `M12-BASELINE-WAVES-COVERAGE`  
> **Dựa trên phản hồi thực tế của Bác sĩ:** Hình ảnh chụp màn hình lúc 15:32 (`media_1792657959317_de779f2f.jpg`) khi Bác sĩ tick chọn 4 tiêu chuẩn cơ bản: `[✓] 1. Tần số`, `[✓] 2. Nhịp điệu`, `[✓] 3. Sóng P`, `[✓] 4. Khoảng PR` nhưng giấy hồng vẫn trơn lùi.

---

## 1. Phân Tích Thực Trạng & Phát Hiện Đột Phá

### 1.1. Hiện Tượng Trong Ảnh Mới (Lúc 15:32)
* Bác sĩ mở ca bệnh **STEMI Thành Dưới (`stemi_inferior`)**.
* Bác sĩ đã tick chọn 4 tiêu chuẩn cơ bản đầu tiên:
  * `[✓] 1. Tần số: Thường 60 - 90 bpm (có thể chậm nếu block AV kèm)`
  * `[✓] 2. Nhịp điệu: Đều đặn`
  * `[✓] 3. Sóng P: Xoang`
  * `[✓] 4. Khoảng PR: 0.12 - 0.20 giây`
* Nút phụ hiển thị: `Tắt hết ánh xạ (4)`.
* **Kết quả trên giấy hồng:** Vẫn trơn lùi, không có thước kẹp R-R, không có thước kẹp PR, không có nhãn sóng P xoang!

### 1.2. Nguyên Nhân Sâu Xa (Data & Architectural Root Cause)
* Rà soát toàn bộ CSDL và file `ecgAnnotationsData.ts`:
  - Trong ca `stemi_inferior` (và rất nhiều bệnh lý mạch vành, phì đại buồng tim, block nhánh khác): Dữ liệu nhãn sóng `annotations` **chỉ chứa các sóng bệnh lý đặc thù** (ST chênh vòm, ST soi gương, Sóng Q hoại tử, Sóng T tối cấp).
  - Dữ liệu **HOÀN TOÀN KHÔNG CÓ BẤT KỲ NHÃN NÀO CHO CÁC SÓNG NỀN CƠ BẢN**:
    - Không có nhãn `waveComponent: "RR"` để vẽ thước kẹp R-R caliper!
    - Không có nhãn `waveComponent: "PR"` để vẽ thước kẹp PR caliper!
    - Không có nhãn `waveComponent: "P"` để vẽ nhãn sóng P xoang!
* **Hậu quả tất yếu:** Khi Bác sĩ tick chọn Tiêu chuẩn 1, 2, 3, 4, bộ lọc tìm kiếm các nhãn tương ứng và nhận về **mảng rỗng `[]`**, dẫn đến giấy hồng không có gì để vẽ!
* **Thống kê đối soát:** Có tới **19/31 mặt bệnh lý** đang bị khuyết thiếu các nhãn sóng cơ bản này (STEMI thành dưới, trước, bên, sau, NSTEMI, RBBB, LBBB, LAFB, LVH Strain, Brugada...).

---

## 2. Kiến Trúc Giải Pháp: Dynamic Baseline Synthesis & Comprehensive Database Ingestion

Để đảm bảo **BẤT KỲ LÚC NÀO người dùng tick chọn Tiêu chuẩn 1, 2, 3, hoặc 4, thước đo và nhãn sóng nền PHẢI XUẤT HIỆN NGAY LẬP TỨC trên giấy hồng**, chúng ta triển khai 2 tầng giải pháp đồng bộ:

### Chi Tiết Kỹ Thuật:

#### 1. Tầng 1: Dynamic Baseline Synthesizer Trong `RealisticPinkEcgPaper.tsx`
Khi Bác sĩ bật các tiêu chuẩn cơ bản:
* **Nếu bật Tiêu chuẩn 1 hoặc 2 (Tần số / Nhịp điệu):**
  - Tự động sinh thước kẹp **R-R Caliper** trên chuyển đạo **DII** và **Dải nhịp chuẩn Lead II**, đo đúng khoảng cách R-R và tần số nhịp tim thực tế của ca bệnh (`metrics.heartRate`, ví dụ `80 bpm` trong ảnh của Bác sĩ).
* **Nếu bật Tiêu chuẩn 4 (Khoảng PR):**
  - Tự động sinh thước kẹp **PR Caliper** trên chuyển đạo **DII** và **Dải nhịp chuẩn Lead II**, bắt đầu tại chân sóng P và kết thúc tại chân sóng Q, độ dài thước khớp đúng số đo thực tế `metrics.prIntervalMs` (ví dụ `188 ms` như trên màn hình ca bệnh của Bác sĩ).
* **Nếu bật Tiêu chuẩn 3 (Sóng P):**
  - Tự động sinh nhãn **Sóng P xoang đồng dạng** trên **DI, DII, aVF** (+0.15mV) và **Sóng P âm** trên **aVR** (-0.14mV).

#### 2. Tầng 2: Nạp Bổ Sung Toàn Bộ Baseline Annotations Cho Cả 31 Mặt Bệnh Lý
* Bổ sung các nhãn `RR`, `PR`, `P` chuẩn hóa vào `src/domain/simulators/ecgAnnotationsData.ts` và CSDL SQLite `ecg_diagnoses`.
* Đảm bảo mọi bệnh lý trong CSDL đều có sẵn bộ nhãn cơ bản để dùng cho API và xuất PDF / in ấn.

---

## 3. Kế Hoạch Triển Khai Chi Tiết (Phases)

| Phase | Nhiệm Vụ Cụ Thể | File Tác Động | Kết Quả Đầu Ra |
| :--- | :--- | :--- | :--- |
| **Phase 01** | Tích hợp **Dynamic Baseline Synthesizer** vào hàm `drawWaveAnnotations` trong `RealisticPinkEcgPaper.tsx` | `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx` | Tick chọn 1, 2, 3, 4 lập tức hiện ngay thước R-R, PR, Sóng P dù bệnh lý có nhãn sẵn hay chưa |
| **Phase 02** | Bổ sung đầy đủ nhãn `RR`, `PR`, `P` vào dữ liệu tĩnh `COMPREHENSIVE_FALLBACK_ANNOTATIONS` cho 19 bệnh lý còn thiếu | `src/domain/simulators/ecgAnnotationsData.ts` | 31/31 bệnh lý có đầy đủ baseline annotations |
| **Phase 03** | Cập nhật CSDL SQLite `ecg_diagnoses` đồng bộ 100% với dữ liệu nhãn mới | `data/medsim.db` | CSDL toàn vẹn, API trả về đầy đủ nhãn |
| **Phase 04** | Viết bộ test tự động xác thực: Tick lần lượt từ 1 đến 6 trên ca `stemi_inferior` và cả 31 bệnh lý đều phải kích hoạt được thước đo/nhãn sóng tương ứng | `tests/baseline_waves_coverage.test.js` | 100% tests pass, TypeScript 0 lỗi, Next.js build thành công |

---

## 4. Tiêu Chí Nghiệm Thu (Acceptance Criteria)

1. **Khớp đúng 100% ca `stemi_inferior` trong ảnh mới của Bác sĩ:**
   - Tick `[✓] 1. Tần số` hoặc `[✓] 2. Nhịp điệu` -> **Thước kẹp R-R Caliper** lập tức hiện ra trên DII và Lead II (đo đúng `80 bpm`, $R_1 \rightarrow R_2$).
   - Tick `[✓] 3. Sóng P` -> **Nhãn Sóng P xoang** hiện ra trên DI, DII, aVF (+0.15mV) và aVR (-0.14mV).
   - Tick `[✓] 4. Khoảng PR` -> **Thước kẹp PR Caliper** lập tức hiện ra trên DII và Lead II (đo đúng `188ms` từ chân P đến chân Q).
   - Tick `[✓] 5. Sóng Q` -> **Thước đo Sóng Q hoại tử** hiện ra ở DIII, aVF.
   - Tick `[✓] 6. ST & T` -> **Thước đo ST chênh vòm** ở DII, DIII, aVF, Lead II VÀ **ST soi gương** ở DI, aVL.
2. **Áp dụng đồng bộ cho tất cả 31 bệnh lý**.
3. **Chất lượng kỹ thuật**:
   - 0 lỗi TypeScript (`npx tsc --noEmit`).
   - 100% automated tests pass.
   - Next.js production build thành công 13/13 static routes.
