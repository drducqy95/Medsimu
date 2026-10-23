# Phase 01: Xây Dựng Physical Waveform Peak Detector Engine

## 1. Mục tiêu
Thay thế hoàn toàn cách tính toán vị trí đỉnh sóng dựa trên lưới lý thuyết $k \times cycleDuration$ bằng thuật toán lấy mẫu trực tiếp trên hàm sóng `calculateLeadEcgVoltage`.

## 2. Đặc tả Thuật toán
```typescript
interface PhysicalWavePeak {
  t: number;      // Thời gian thực của đỉnh (giây)
  x: number;      // Tọa độ canvas X
  y: number;      // Tọa độ canvas Y
  v: number;      // Điện thế tại đỉnh (mV)
  polarity: "positive" | "negative";
}

function detectPhysicalRPeaksOnTrace(
  tMin: number,
  leadDuration: number,
  calcLead: string,
  rhythm: string,
  bpm: number,
  traceStart: number,
  pixelsPerSecond: number,
  midY: number,
  voltageScale: number
): PhysicalWavePeak[] {
  // Lấy mẫu tín hiệu mỗi 2ms (tần số 500 Hz)
  // Xác định cực tính chuyển đạo (aVR hoặc V1 không phải RBBB -> dò cực tiểu âm)
  // Thu nhận các đỉnh cục bộ có biên độ vượt ngưỡng sinh lý (|v| > 0.35 mV)
  // Loại trừ hiện tượng phát hiện trùng lặp đỉnh trong khoảng cách tối thiểu refractory period (200ms)
  // Trả về danh sách đỉnh đã sắp xếp theo thứ tự thời gian tăng dần
}
```

## 3. Tiêu chí Nghiệm thu (Acceptance Criteria)
- Tại $60\,\text{bpm}$ trên nhịp `av_block_mobitz_1`:
  - Trong khoảng $0 - 2.5\,\text{s}$ (Cột 0): Thu nhận chính xác 3 đỉnh tại $0.220\,\text{s}$, $1.190\,\text{s}$, $2.080\,\text{s}$.
  - Trong khoảng $2.5 - 5.0\,\text{s}$ (Cột 1): Thu nhận chính xác 2 đỉnh tại $3.620\,\text{s}$ và $4.590\,\text{s}$.
  - Trong khoảng $5.0 - 7.5\,\text{s}$ (Cột 2): Thu nhận chính xác 2 đỉnh tại $5.480\,\text{s}$ và $7.020\,\text{s}$ (cách nhau $1540\,\text{ms}$, ghi nhận khoảng rớt).
- Chuyển đạo $\text{aVR}$ bắt dính chính xác cực tiểu âm nhọn $-1.25\,\text{mV}$ tại cùng các mốc thời gian đó.
