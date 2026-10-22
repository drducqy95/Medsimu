# Phase 04: Module 2B - Hệ Thống Siêu Âm Đầu Dò 3D & Màn Hình Động, Lát Cắt CT

Status: 🟡 In Progress
Dependencies: Phase 01
Specification: [ultrasound-3d-simulator-spec.md](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/specs/ultrasound-3d-simulator-spec.md)

## Objective
Xây dựng trọn vẹn 2 hệ thống mô phỏng chuyên sâu tiếp theo trong **Module 2**:
1. **Hệ thống siêu âm đầu dò 3D tương tác tay với màn hình hiển thị hình ảnh siêu âm động** theo vị trí $(x,y,z)$, góc xoay $\alpha$, góc nghiêng $\beta$ và áp lực $P$, hỗ trợ B-Mode, M-Mode, Color Doppler và giao thức FAST/Lung POCUS.
2. **Bộ cuộn lát cắt CT-Scanner đa tầng** với khả năng chuyển đổi cửa sổ Nhu mô / Xương / Phổi và đo giá trị Hounsfield (HU).

## Requirements

### Functional

#### 1. Hệ thống Siêu Âm Đầu Dò 3D & Màn Hình Động (3D Ultrasound Simulator):
- [ ] **Khung nhìn Thao tác Đầu dò 3D (Interactive 3D Probe Viewport):**
  - Render mô hình giải phẫu cơ thể người 3 chiều (Three.js / Canvas 3D).
  - Đầu dò 3D với chùm tia quét ảo (Virtual Scanning Cone/Sector) bám theo bề mặt cơ thể.
  - Thao tác tay tự do (Mouse Drag / Touch / Keyboard):
    - Di chuyển vị trí đầu dò $(X, Y, Z)$ trên bề mặt cơ thể (Surface Raycasting).
    - Xoay trục đầu dò $\alpha \in [0^\circ, 360^\circ]$: Chuyển đổi giữa mặt cắt dọc (Long axis) $\leftrightarrow$ mặt cắt ngang (Short axis) $\leftrightarrow$ mặt cắt chéo liên sườn.
    - Nghiêng góc đầu dò (Tilt / Fanning $\beta \in [-45^\circ, +45^\circ]$).
    - Áp lực tỳ đè (Compression depth).
  - Chuyển đổi 3 loại đầu dò: Đầu dò Cong (Convex), Đầu dò Tim (Phased Array), Đầu dò Thẳng (Linear).
- [ ] **Màn hình Hiển thị Hình ảnh Siêu Âm Động Thời Gian Thực (Dynamic Ultrasound Monitor):**
  - Hình ảnh cắt lớp động cập nhật tức thì theo đúng thao tác di chuyển/xoay đầu dò của tay.
  - Chuyển động sinh học theo nhịp tim ($\Phi_{\text{cardiac}}$) và nhịp thở ($\Phi_{\text{resp}}$):
    - *Tim dưới sườn (Subxiphoid):* Thất trái/phải co bóp tống máu, van 2 lá/3 lá mở đóng nhịp nhàng. Bệnh lý: Tràn dịch màng ngoài tim, đè sụp thất phải trong chèn ép tim cấp.
    - *Màng phổi (Lung POCUS):* Dấu trượt màng phổi (Lung sliding) lấp lánh theo nhịp thở. Bệnh lý: Mất trượt màng phổi trong Tràn khí; Xuất hiện các đường B-line dày đặc (đuôi sao chổi) trong Phù phổi cấp.
    - *Khoang Morison (RUQ):* Cắt dọc/ngang gan - thận. Bệnh lý: Dải dịch đen (Echo trống) len lỏi giữa bao gan và bao thận trong xuất huyết nội.
    - *Khoang Lách - Thận (LUQ):* Phát hiện dịch tự do quanh lách do vỡ lách trong chấn thương.
    - *Hạ vị (Suprapubic):* Bàng quang căng nước tiểu & dịch tự do túi cùng Douglas.
- [ ] **Chế độ B-Mode, M-Mode & Color Doppler:**
  - B-Mode: Thang xám 256 mức, điều chỉnh Depth ($5 - 25\text{ cm}$) và Gain, hiệu ứng nhiễu hạt siêu âm (Speckle Texture).
  - M-Mode: Đường con trỏ thời gian, phân tích Dấu bờ biển (Seashore Sign - bình thường) vs Dấu mã vạch (Barcode Sign - tràn khí màng phổi); Đo di động vòng van 2 lá (MAPSE).
  - Color Doppler: Hộp màu dòng chảy mạch máu tuân thủ quy tắc BART (Xanh ra xa, Đỏ về phía đầu dò).
  - Phím Freeze dừng hình và thước đo Calipers siêu âm.

#### 2. Bộ Cuộn Lát Cắt CT-Scanner Đa Tầng (Interactive CT Slice Viewer):
- [ ] Con lăn chuột (Wheel Scroll) / Thanh trượt cuộn mượt mà qua các lát cắt giải phẫu Axial.
- [ ] Các bộ ca bệnh CT điển hình:
  - CT Sọ não: Xuất huyết nhu mô não (tăng đậm độ trắng), Xuất huyết dưới nhện (hình ngôi sao), Nhồi máu não diện rộng (giảm đậm độ).
  - CT Ngực: Cửa sổ phổi, thuyên tắc phổi lớn.
  - CT Ổ bụng: Viêm ruột thừa cấp (ruột thừa giãn $>6\text{ mm}$, thâm nhiễm mỡ), sỏi niệu quản ứ nước thận.
- [ ] Chuyển đổi cửa sổ 1-Click: Nhu mô (Soft Tissue) $\leftrightarrow$ Xương (Bone) $\leftrightarrow$ Phổi (Lung).
- [ ] Công cụ đo đậm độ Hounsfield (HU Tool): Rê chuột hiển thị giá trị HU và loại mô tương ứng.

### Non-Functional
- [ ] Đạt chuẩn 60 FPS cho cả viewport 3D và màn hình siêu âm động.
- [ ] Tương thích responsive tốt cả trên Desktop (chuột) và Tablet (cảm ứng đa điểm chạm xoay đầu dò).

## Implementation Steps
1. [ ] Cấu hình thư viện 3D (`three`): Khởi tạo canvas 3D và mesh cơ thể giải phẫu: `src/components/simulators/ultrasound/ThreeBodyViewport.tsx`.
2. [ ] Xây dựng 3D Probe Model và Động học đầu dò (Kinematics & Surface Raycaster): `src/components/simulators/ultrasound/ProbeController.tsx`.
3. [ ] Xây dựng Dynamic Ultrasound Screen Shader & Animation Engine: `src/components/simulators/ultrasound/DynamicUltrasoundScreen.tsx`.
4. [ ] Xây dựng Bảng điều khiển siêu âm (Depth, Gain, Freeze, Calipers, M-Mode, Color Doppler): `src/components/simulators/ultrasound/UltrasoundControlDeck.tsx`.
5. [ ] Xây dựng Trang hoàn chỉnh Siêu âm 3D: `src/app/simulators/ultrasound/page.tsx`.
6. [ ] Xây dựng CT Slice Viewer & Windowing Engine: `src/components/simulators/ct/CtSliceViewer.tsx`.
7. [ ] Xây dựng Metadata ca bệnh CT và HU map: `src/data/simulators/ctCases.ts`.
8. [ ] Xây dựng Trang hoàn chỉnh CT Simulator: `src/app/simulators/ct/page.tsx`.

## Files to Create/Modify
- `src/components/simulators/ultrasound/ThreeBodyViewport.tsx`
- `src/components/simulators/ultrasound/ProbeController.tsx`
- `src/components/simulators/ultrasound/DynamicUltrasoundScreen.tsx`
- `src/components/simulators/ultrasound/UltrasoundControlDeck.tsx`
- `src/domain/simulators/ultrasoundEngine.ts`
- `src/data/simulators/ultrasoundCases.ts`
- `src/app/simulators/ultrasound/page.tsx`
- `src/components/simulators/ct/CtSliceViewer.tsx`
- `src/components/simulators/ct/CtControls.tsx`
- `src/data/simulators/ctCases.ts`
- `src/app/simulators/ct/page.tsx`

## Test Criteria
- [ ] Kéo chuột trên mô hình 3D: Đầu dò bám đúng bề mặt da; xoay và nghiêng đầu dò làm màn hình siêu âm thay đổi góc nhìn tương ứng.
- [ ] Màn hình siêu âm hiển thị chuyển động động học nhịp nhàng (tim đập, màng phổi trượt, dịch đọng ở khoang Morison).
- [ ] Chế độ M-Mode và Color Doppler hoạt động chuẩn xác; CT Slice Viewer cuộn mượt mà và đo đúng giá trị HU.

---
Next Phase: [Phase 05 - Module 3: Clinical Treatment Simulation](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-05-integration.md)
