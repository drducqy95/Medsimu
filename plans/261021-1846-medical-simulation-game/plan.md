# BẢN KẾ HOẠCH TỔNG THỂ TOÀN DIỆN (MASTER PLAN)
## DỰ ÁN: MEDSIM - NỀN TẢNG HỌC TẬP & MÔ PHỎNG Y KHOA LÂM SÀNG

- **Phiên bản:** v2.0 (Trinity Protocol Standard)
- **Ngày lập:** 2026-10-21T18:46:00+07:00
- **Cập nhật tổng hợp:** 2026-10-21T19:27:00+07:00
- **Trạng thái:** 🟡 SẴN SÀNG TRIỂN KHAI (PLAN READY - AWAITING /code)
- **Kiến trúc:** Clean Architecture (Domain, Use Cases, Infrastructure, Interfaces, Components, Data)
- **Tech Stack:** Next.js 14+ (App Router, TypeScript), Tailwind CSS, Zustand, Three.js (3D Viewport), Canvas 2D (60 FPS ECG), SQLite/Prisma

---

## 1. TỔNG QUAN HỆ THỐNG VÀ ĐỊNH VỊ SẢN PHẨM

**MedSim** là Web App học tập và rèn luyện kỹ năng lâm sàng y khoa tương tác cao, kết hợp chặt chẽ giữa:
1. **Lý thuyết y khoa chuẩn xác** (Bệnh học, Sinh lý bệnh, Dược lý học lâm sàng theo phác đồ Bộ Y Tế, AHA/ACC, GINA, Harrison).
2. **Phòng thực hành cận lâm sàng ảo đỉnh cao** (Máy chạy ECG thời gian thực, Máy siêu âm đầu dò 3D thao tác tay hiển thị ảnh động, Soi phim X-quang, Cuộn lát cắt CT).
3. **Mô phỏng cấp cứu và điều trị thực chiến** (Động cơ sinh thái học biến thiên, phản hồi tức thì với y lệnh, kiểm soát an toàn và chống chỉ định nghiêm ngặt).

---

## 2. KIẾN TRÚC 3 MODULE ĐỘC LẬP VÀ LIÊN HOÀN

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 MEDSIM PLATFORM HUB                                     │
├───────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│         MODULE 1          │          MODULE 2           │           MODULE 3            │
│    HỌC TẬP KIẾN THỨC      │   MÔ PHỎNG CẬN LÂM SÀNG     │      MÔ PHỎNG ĐIỀU TRỊ        │
│        (ACADEMY)          │      (DIAGNOSTIC LAB)       │       (CLINICAL & ER)         │
│                           │  [ƯU TIÊN XÂY DỰNG TRƯỚC]   │                               │
│ • Giáo trình tương tác    │ 1. Máy chạy ECG 60 FPS      │ • Tiếp nhận & Triage          │
│ • Dược lý 30+ thuốc       │ 2. Siêu âm Đầu dò 3D Động   │ • Monitor sinh hiệu động      │
│ • Cơ chế bệnh sinh        │ 3. Phòng soi phim X-quang   │ • Mở trực tiếp máy từ Mod 2   │
│ • Nguyên lý cận lâm sàng  │ 4. Bộ cuộn lát cắt CT-Scan  │ • Ra y lệnh thuốc/thủ thuật   │
│ • Flashcards & Quiz nhanh │                             │ • Debriefing cơ chế bệnh sinh │
└───────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

---

## 3. CHI TIẾT TỪNG MODULE

### 📚 MODULE 1: HỌC TẬP KIẾN THỨC (Medical Academy)
- **Bệnh học chuyên khoa:**
  - *Tim mạch:* Điện sinh lý cơ tim, các sóng P-QRS-T, các dạng rối loạn nhịp, cơ chế thiếu máu & nhồi máu cơ tim (STEMI/NSTEMI).
  - *Hô hấp:* Sinh lý thông khí và khuếch tán, cơ chế co thắt phế quản trong hen/COPD, suy hô hấp giảm oxy máu và tăng CO2 máu.
  - *Tiêu hóa - Ngoại khoa:* Cơ chế viêm phúc mạc, tắc nghẽn ruột thừa cấp, xuất huyết tiêu hóa.
  - *Cấp cứu - Hồi sức:* Cơ chế sốc phản vệ type I qua IgE, toan ceton đái tháo đường (DKA), hồi sinh tim phổi nâng cao (ACLS).
- **Dược lý học lâm sàng tương tác (30+ thuốc thiết yếu):**
  - Nhóm vận mạch (Adrenalin, Noradrenalin), Kháng đông/Kháng kết tập tiểu cầu (Aspirin, Clopidogrel, Heparin), Giãn phế quản (Salbutamol, Ipratropium), Corticoid, Kháng sinh, Giảm đau (Morphin, Paracetamol), Lợi tiểu, Hạ áp...
  - Mỗi thuốc có chi tiết: Cơ chế tác dụng, liều dùng chuẩn, đường dùng (IV, IM, PO, Khí dung), chống chỉ định tuyệt đối/tương đối, tương tác bất lợi.
- **Sổ tay Nguyên lý Đọc Cận lâm sàng:**
  - Quy trình 7 bước đọc ECG, quy trình A-B-C-D-E đọc X-quang, nguyên lý siêu âm (Echo dày/kém/trống, bóng lưng), thang đậm độ Hounsfield (HU) của CT.
- **Hệ thống Kiểm tra Nhanh:** Trắc nghiệm tình huống lâm sàng (Instant feedback) & Flashcards ghi nhớ nhanh.

---

### 🔬 MODULE 2: PHÒNG MÔ PHỎNG CẬN LÂM SÀNG ẢO (Diagnostic Lab - Ưu Tiên Xây Dựng Trước)

Chi tiết đã được chuẩn hóa tại 2 tài liệu đặc tả:
- 📈 [`ecg-simulator-spec.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/specs/ecg-simulator-spec.md)
- 🦇 [`ultrasound-3d-simulator-spec.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/specs/ultrasound-3d-simulator-spec.md)

#### 1. Hệ Thống Chạy Điện Tâm Đồ (ECG Simulator):
- **Toán học tổng hợp sóng:** $V(t) = \sum A_i \cdot \exp\left(-\frac{(t - \mu_i)^2}{2\sigma_i^2}\right) + V_{\text{baseline}}(t)$.
- **Dải nhịp thời gian thực 60 FPS:** Lưới y tế chuẩn $25\text{ mm/s}$ & $10\text{ mm/mV}$, âm thanh Beep theo nhịp tim.
- **Thư viện 15+ dạng sóng bệnh lý:** Nhịp xoang, Rung nhĩ (AFib), Cuồng nhĩ, SVT, Ngoại tâm thu thất (PVC), Nhanh thất (VTach), Rung thất (VFib), Block AV độ I/II/III, STEMI thành dưới / trước rộng, Tăng Kali máu.
- **Thước Calipers điện tử:** Đo chính xác PR, QRS, QT và tự động tính **QTc theo công thức Bazett** ($\text{QTc} = \text{QT}/\sqrt{\text{RR}}$).
- **Chế độ xem:** Dải nhịp kéo dài Lead II strip và Điện tâm đồ 12 chuyển đạo hoàn chỉnh ($3 \times 4 + 1$).

#### 2. Hệ Thống Siêu Âm Đầu Dò 3D Động (3D Ultrasound Simulator):
- **Viewport 3D tương tác tay (Three.js):**
  - Mô hình cơ thể bệnh nhân 3 chiều.
  - Đầu dò siêu âm 3D di chuyển bám mặt da bằng Surface Raycasting (vị trí $X, Y, Z$).
  - Xoay trục đầu dò $0^\circ - 360^\circ$ (chuyển đổi mặt cắt dọc $\leftrightarrow$ ngang).
  - Nghiêng góc chùm tia $\pm 45^\circ$ (Fanning / Tilting).
  - Đè ấn áp lực (Compression Depth).
  - Chuyển đổi 3 loại đầu dò: Đầu dò Cong (Convex), Đầu dò Tim (Phased Array), Đầu dò Thẳng (Linear).
- **Màn hình hiển thị hình ảnh siêu âm động thời gian thực:**
  - Đồng bộ chuyển động sinh học theo nhịp tim $\Phi_{\text{cardiac}}$ (thất trái/phải co bóp, van 2 lá/3 lá mở đóng) và nhịp thở $\Phi_{\text{resp}}$ (trượt màng phổi Lung Sliding).
  - Các vùng cắt FAST & Lung POCUS chuẩn:
    - Vùng Dưới mũi ức (Tim 4 buồng, tràn dịch màng ngoài tim, chèn ép tim cấp).
    - Vùng Siêu âm phổi (Dấu trượt màng phổi bình thường vs Dấu mã vạch trong tràn khí; đường A-line vs đường B-line trong phù phổi).
    - Vùng Hạ sườn phải (Khoang Morison gan - thận: dải dịch đen trong xuất huyết nội).
    - Vùng Hạ sườn trái (Khoang lách - thận).
    - Vùng Hạ vị (Bàng quang và dịch túi cùng Douglas).
- **Các chế độ chuyên nghiệp:** B-Mode (256 mức xám, Speckle noise), M-Mode (Seashore vs Barcode sign), Color Doppler (quy tắc quốc tế BART: Xanh ra xa, Đỏ lại gần), Calipers siêu âm & Freeze frame.

#### 3. Bộ Soi & Phân Tích Phim X-Quang Tương Tác (X-Ray Suite):
- Viewer xem phim X-quang ngực thẳng CXR, Bụng đứng, Gãy xương chi.
- Công cụ DICOM: Chỉnh sáng/tương phản (Window/Level), Zoom, Pan, Đảo âm bản/dương bản, Đo tỷ lệ bóng tim CTR.
- Lớp phủ tương tác: Bật/tắt giải phẫu và Bật/tắt chỉ điểm tổn thương (Đông đặc thùy phổi, Tràn dịch màng phổi đường cong Damoiseau, Tràn khí màng phổi, Liềm hơi dưới hoành).

#### 4. Bộ Cuộn Lát Cắt CT-Scanner Đa Tầng (CT Slice Viewer):
- Cuộn con lăn chuột duyệt chuỗi lát cắt giải phẫu Axial (CT Sọ não, CT Lồng ngực, CT Ổ bụng).
- Bộ ca bệnh kinh điển: Xuất huyết nhu mô não, Xuất huyết dưới nhện, Nhồi máu não diện rộng, Thuyên tắc phổi, Viêm ruột thừa cấp, Sỏi niệu quản.
- Chuyển đổi cửa sổ 1-click: Nhu mô (Soft Tissue) $\leftrightarrow$ Xương (Bone) $\leftrightarrow$ Phổi (Lung).
- Công cụ đo đậm độ Hounsfield (HU Tool): Rê chuột hiển thị giá trị HU và phân loại mô tức thì.

---

### 🏥 MODULE 3: MÔ PHỎNG ĐIỀU TRỊ LÂM SÀNG (Clinical Treatment & ER Ward)
- **Tiếp nhận & Màn hình giường bệnh:** Monitor sinh hiệu ECG động, SpO2, Huyết áp, Nhịp thở, Nhiệt độ, Tri giác Glasgow. Đồng hồ "Thời gian vàng" đếm ngược trong các ca tối khẩn.
- **Chu trình khám bệnh 5 bước khép kín:**
  1. *Hỏi bệnh & Bệnh sử (Anamnesis).*
  2. *Khám thực thể (Physical Exam):* Nghe tim, nghe phổi, sờ bụng.
  3. *Tái sử dụng ngay các công cụ từ Module 2 tại giường:* Bấm gọi máy ECG $\rightarrow$ Đọc dải nhịp; Cầm đầu dò siêu âm FAST quét ổ bụng; Bật phim X-quang/CT để chẩn đoán.
  4. *Ra y lệnh xử trí & Dược lý:* Oxy, dịch truyền, tiêm thuốc từ Dược thư, sốc điện, ép tim CPR.
  5. *Chẩn đoán & Chuyển khoa:* Xuất viện, nhập viện theo dõi, chuyển phòng can thiệp mạch vành PCI hoặc chuyển mổ cấp cứu.
- **Động cơ Sinh hiệu Biến thiên:** Sinh hiệu phản hồi tức thì theo thời gian trôi qua và tác động của thuốc.
- **Bộ Kiểm Tra An Toàn & Chống Chỉ Định (Safety Guard):** Bắt lỗi dị ứng thuốc, bắt lỗi chống chỉ định (Nitroglycerin trong nhồi máu thất phải, Beta-blocker trong hen cấp...). Kích hoạt báo động đỏ **Code Blue** nếu xảy ra sai sót nghiêm trọng!
- **Debriefing Lâm Sàng & Thăng Tiến Nghề Nghiệp:**
  - Chấm điểm 100 theo 4 trụ cột: Chẩn đoán (40%), An toàn (30%), Điều trị hiệu quả (20%), Tối ưu tài nguyên (10%).
  - Phân tích cơ chế bệnh sinh chi tiết, liên kết ngược lại bài học ở Module 1 để người học ôn tập lỗ hổng kiến thức.
  - Thăng cấp Bác sĩ: Sinh viên Y $\rightarrow$ Nội trú $\rightarrow$ Bác sĩ Cấp cứu $\rightarrow$ Trưởng khoa; Mở khóa Cây kỹ năng (Skill Tree).

---

## 4. LỘ TRÌNH THỰC THI 6 PHASE (ROADMAP)

| Phase | Tên Phase & Trọng tâm | Files thực thi chính | Deliverables kiểm thử |
|---|---|---|---|
| **Phase 01** | **Setup & 3-Module Core Infrastructure** | `package.json`, `layout.tsx`, `page.tsx`, `HospitalNavbar.tsx`, `gameSettingsStore.ts` | Next.js 14 chạy mượt mà, Hub 3 Modules hiển thị rõ nét trên Desktop và Tablet. |
| **Phase 02** | **Module 1 - Học Tập Kiến Thức (Academy)** | `academy/types.ts`, `lessons.ts`, `pharmacology.ts`, `quizzes.ts`, `academy/page.tsx` | Đọc giáo trình đa chuyên khoa, tra cứu 30+ thuốc, làm quiz có giải thích tức thì. |
| **Phase 03** | **Module 2A - ECG 60 FPS & X-Ray Simulators** | `ecgWaveforms.ts`, `EcgCanvasRunner.tsx`, `EcgCalipers.tsx`, `xrayCases.ts`, `XrayViewer.tsx` | Máy ECG chạy 15+ nhịp 60 FPS, đo Calipers tính QTc chuẩn; Soi phim X-quang Window/Level. |
| **Phase 04** | **Module 2B - Siêu Âm Đầu Dò 3D Động & CT Viewer** | `ThreeBodyViewport.tsx`, `ProbeController.tsx`, `DynamicUltrasoundScreen.tsx`, `CtSliceViewer.tsx` | Cầm đầu dò 3D di chuyển/xoay/nghiêng làm ảnh siêu âm đổi góc nhìn; Cuộn lát cắt CT đo HU. |
| **Phase 05** | **Module 3 - Mô Phỏng Điều Trị Lâm Sàng** | `treatmentStateMachine.ts`, `BedsideMonitor.tsx`, `ParaclinicalStation.tsx`, `MedicalOrderSheet.tsx` | Tiếp nhận bệnh nhân, gọi máy Module 2 tại giường, ra y lệnh thuốc, sinh hiệu đổi tức thì. |
| **Phase 06** | **Gamification, Debriefing & Verification** | `ClinicalDebriefingModal.tsx`, `careerEngine.ts`, `SkillTreeModal.tsx`, Unit Tests | Debriefing phân tích cơ chế, Thăng cấp Bác sĩ, 100% Unit test pass, build production thành công. |

---

## 5. CÁC TÀI LIỆU VÀ ĐƯỜNG DẪN TRONG DỰ ÁN

- 📄 **Bản kế hoạch Master:** [`plans/261021-1846-medical-simulation-game/plan.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/plan.md)
- 📄 **Đặc tả ECG:** [`specs/ecg-simulator-spec.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/specs/ecg-simulator-spec.md)
- 📄 **Đặc tả Siêu âm 3D:** [`specs/ultrasound-3d-simulator-spec.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/specs/ultrasound-3d-simulator-spec.md)
- 📄 **Phase 01 Setup:** [`phase-01-setup.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-01-setup.md)
- 📄 **Phase 02 Academy:** [`phase-02-database.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-02-database.md)
- 📄 **Phase 03 ECG & X-Ray:** [`phase-03-backend.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-03-backend.md)
- 📄 **Phase 04 Siêu âm 3D & CT:** [`phase-04-frontend.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-04-frontend.md)
- 📄 **Phase 05 Điều trị ER:** [`phase-05-integration.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-05-integration.md)
- 📄 **Phase 06 Debriefing & Test:** [`phase-06-testing.md`](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-06-testing.md)
- 📄 **Định danh hệ thống:** [`GameYhoc.json`](file:///d:/Downloads/Archives/GameYhoc/GameYhoc.json)
- 📄 **Tiến độ dự án:** [`project_progress.json`](file:///d:/Downloads/Archives/GameYhoc/project_progress.json)
- 📄 **Bộ nhớ phiên làm việc:** [`.brain/session.json`](file:///d:/Downloads/Archives/GameYhoc/.brain/session.json)

---

## 6. LỆNH BẮT ĐẦU THỰC THI (QUICK START)

Theo quy định nghiêm ngặt của **Trinity Protocol**, toàn bộ quá trình lập kế hoạch và đặc tả đã hoàn thành xuất sắc, hệ thống **chưa viết code thực thi** cho đến khi có lệnh xác nhận từ người dùng.

Để khởi động thực thi **Phase 01**:
👉 Gõ: `/code phase-01`
