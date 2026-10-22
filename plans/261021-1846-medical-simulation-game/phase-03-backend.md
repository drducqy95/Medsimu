# Phase 03: Module 2A - Hệ Thống Mô Phỏng Điện Tâm Đồ (ECG) & X-Quang

Status: ✅ Complete
Dependencies: Phase 01
Specification: [ecg-simulator-spec.md](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/specs/ecg-simulator-spec.md)

## Objective
Xây dựng trọn vẹn 2 hệ thống mô phỏng đầu tiên trong **Module 2**:
1. **Hệ thống chạy Điện tâm đồ (ECG) thời gian thực** với mô hình hàm Gaussian toán học sinh lý, 15+ nhịp bệnh lý, giấy lưới chuẩn và bộ thước đo Calipers điện tử đo PR, QRS, QT/QTc.
2. **Bộ soi & phân tích phim X-quang tương tác** với tính năng Window/Level, Zoom/Pan, lớp phủ giải phẫu và chỉ điểm tổn thương bệnh lý.

## Requirements

### Functional

#### 1. Hệ thống Mô Phỏng Điện Tâm Đồ (ECG Simulator):
- [ ] Triển khai thuật toán tổng hợp sóng P-QRS-T bằng xung Gaussian toán học:
  $$V(t) = \sum_{i} A_i \cdot \exp\left(-\frac{(t - \mu_i)^2}{2\sigma_i^2}\right) + V_{\text{baseline}}(t)$$
- [ ] Dải nhịp Canvas quét liên tục 60 FPS từ trái sang phải, có vệt sáng quét trước (Lead II rhythm strip).
- [ ] Lưới kẻ ô chuẩn y khoa: $1\text{ mm} = 0.04s$, $5\text{ mm} = 0.20s$, $10\text{ mm} = 1.0\text{ mV}$. Chuyển đổi tốc độ quét $25\text{ mm/s} \leftrightarrow 50\text{ mm/s}$.
- [ ] Âm thanh Beep nhịp tim chân thực, tự động kích hoạt tại đỉnh sóng R (có công tắc Mute).
- [ ] Thư viện 15+ dạng sóng bệnh lý chuẩn:
  - Nhịp xoang bình thường, Nhịp nhanh/chậm xoang.
  - Rung nhĩ (AFib - sóng f lăn tăn, RR không đều), Cuồng nhĩ (AFlutter - sóng răng cưa 300 bpm).
  - Cơn nhịp nhanh trên thất (SVT), Ngoại tâm thu thất (PVC), Nhanh thất (VTach), Rung thất (VFib sóng thô/mịn), Vô tâm thu (Asystole).
  - Block AV độ I, Mobitz I (Wenckebach), Mobitz II, Block AV độ III hoàn toàn.
  - STEMI thành dưới (DII, DIII, aVF ST chênh lên) & STEMI trước rộng (V1-V6).
  - Tăng Kali máu (sóng T nhọn đối xứng, mất P, QRS dãn rộng).
- [ ] Thước kẹp Calipers ảo: Kéo thả 2 vạch đo thời gian và 2 vạch đo điện thế. Đo chính xác thời gian PR, độ rộng QRS, khoảng QT và tính tự động QTc theo công thức Bazett.
- [ ] Bộ hiển thị ECG 12 chuyển đạo hoàn chỉnh ($3 \times 4 + 1$).

#### 2. Bộ Soi & Phân Tích Phim X-Quang Tương Tác:
- [ ] Viewer đọc phim chuyên nghiệp: X-quang ngực thẳng CXR, Bụng đứng, Gãy xương chi.
- [ ] Công cụ DICOM tương tác: Tăng/giảm độ tương phản & độ sáng (Window/Level), Zoom, Pan, Đảo ngược màu (Invert).
- [ ] Thước đo Cardiothoracic Ratio (CTR) đo tỷ lệ bóng tim / lồng ngực.
- [ ] Lớp phủ tương tác: Bật/tắt giải phẫu (Vòm hoành, góc sườn hoành, bóng tim, quai ĐMC) và Bật/tắt tổn thương (Đông đặc thùy phổi, Tràn dịch màng phổi đường cong Damoiseau, Tràn khí màng phổi, Liềm hơi dưới vòm hoành).

### Non-Functional
- [ ] Đạt chuẩn 60 FPS, không rò rỉ bộ nhớ khi chạy máy đo nhịp tim liên tục.
- [ ] Độ chân thực cao về mặt sinh lý học tim mạch và hình thái học điện tâm đồ.

## Implementation Steps
1. [ ] Xây dựng Math Synthesis Engine: `src/domain/simulators/ecgWaveforms.ts`.
2. [ ] Xây dựng Canvas ECG Runner Component: `src/components/simulators/ecg/EcgCanvasRunner.tsx`.
3. [ ] Xây dựng Virtual Calipers Component: `src/components/simulators/ecg/EcgCalipers.tsx`.
4. [ ] Xây dựng Bộ chuyển đổi 12 chuyển đạo: `src/components/simulators/ecg/TwelveLeadGrid.tsx`.
5. [ ] Xây dựng Trang hoàn chỉnh ECG Simulator: `src/app/simulators/ecg/page.tsx`.
6. [ ] Xây dựng X-Ray Viewer với bộ lọc Canvas Filter: `src/components/simulators/xray/XrayViewer.tsx`.
7. [ ] Xây dựng Thư viện phim X-ray và Metadata: `src/data/simulators/xrayCases.ts`.
8. [ ] Xây dựng Trang hoàn chỉnh X-Ray Suite: `src/app/simulators/xray/page.tsx`.

## Files to Create/Modify
- `src/domain/simulators/ecgWaveforms.ts`
- `src/components/simulators/ecg/EcgCanvasRunner.tsx`
- `src/components/simulators/ecg/EcgCalipers.tsx`
- `src/components/simulators/ecg/EcgRhythmSelector.tsx`
- `src/components/simulators/ecg/TwelveLeadGrid.tsx`
- `src/app/simulators/ecg/page.tsx`
- `src/data/simulators/xrayCases.ts`
- `src/components/simulators/xray/XrayViewer.tsx`
- `src/components/simulators/xray/XrayControls.tsx`
- `src/app/simulators/xray/page.tsx`

## Test Criteria
- [ ] ECG chạy mượt mà trên Canvas, đổi được 15+ nhịp và tần số tim từ 30 đến 220 BPM.
- [ ] Thước đo Calipers tính đúng khoảng mili-giây và tự động tính chuẩn QTc theo công thức Bazett.
- [ ] Viewer X-quang thao tác mượt Window/Level, Zoom/Pan và bật/tắt đúng các lớp bệnh lý.

---
Next Phase: [Phase 04 - Module 2B: 3D Ultrasound & CT Simulators](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-04-frontend.md)
