# Phase 04: Authentic 12-Lead Vector Projection for Mobitz I & Verification

Status: ⬜ Pending
Dependencies: Phase 03

## Objective
Hoàn thiện chiếu vector giải phẫu 12 chuyển đạo cho `av_block_mobitz_1` trong `ecgWaveforms.ts` và thiết lập suite kiểm thử tự động toàn diện.

## Implementation Steps
1. Cập nhật `src/domain/simulators/ecgWaveforms.ts`:
   - Bổ sung ánh xạ chuyển đạo cho `av_block_mobitz_1`:
     - `aVR`: QRS âm toàn diện ($rAmp = -1.30$, $pAmp = -0.14$, $tAmp = -0.30$).
     - `V1`: dạng $rS$ chuẩn sinh lý ($rAmp = 0.35$, $sAmp = -1.10$, $tAmp = 0.15$).
     - `V5, V6`: R cao dương ($rAmp = 1.85$, $pAmp = 0.15$, $tAmp = 0.40$).
     - `DI, aVL`: $rAmp = 1.35$.
2. Viết suite kiểm thử tự động `tests/wenckebach_criteria_mapping.test.js`:
   - Kiểm tra Tiêu chuẩn 1: PR dài dần qua 3 chu kỳ ($160\text{ms} \rightarrow 240\text{ms} \rightarrow 320\text{ms}$).
   - Kiểm tra Tiêu chuẩn 2: Sóng P không dẫn đơn độc, không lẫn nhãn trục P.
   - Kiểm tra Tiêu chuẩn 3: PR ngắn nhất sau nhát rớt ($160\text{ms}$).
   - Kiểm tra Tiêu chuẩn 4: R-R ngắn dần trước nhát rớt, không có nhãn "Đều đặn".
   - Kiểm tra vector 12 chuyển đạo: aVR âm, V1 rS.
3. Chạy toàn bộ test suite (đạt 100% pass), chạy type-check (`tsc --noEmit`), build Next.js, cập nhật `project_progress.json` và commit/push lên GitHub.

## Test Criteria
- [ ] aVR của Mobitz I có sóng R âm $\le -1.0\text{mV}$.
- [ ] V1 của Mobitz I có dạng rS sinh lý.
- [ ] 100% unit tests pass.
- [ ] 0 lỗi TypeScript.
