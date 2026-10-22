# Phase 03: Wenckebach Mathematical RR Shortening

## Mục tiêu
Chuẩn hóa toán học dạng sóng Wenckebach (Mobitz I) để các khoảng R-R trước nhát rớt thực sự ngắn dần trên đồ thị điện tim:
1. **Bản chất sinh lý chu kỳ Wenckebach (AHA/ESC)**:
   - Khoảng PR dài dần ra qua từng chu kỳ liên tiếp, nhưng **gia số kéo dài của PR giảm dần** qua các nhát bóp:
     $\Delta PR_1 > \Delta PR_2$.
   - Vì khoảng cách giữa 2 sóng P ($PP$) là cố định do nút xoang phát nhịp đều đặn:
     $RR_1 = PP + (PR_1 - PR_0) = PP + \Delta PR_1$.
     $RR_2 = PP + (PR_2 - PR_1) = PP + \Delta PR_2$.
   - Do $\Delta PR_1 > \Delta PR_2$ nên $RR_1 > RR_2$ $\rightarrow$ **Khoảng R-R ngắn dần trước nhát rớt**!
2. **Cập nhật công thức trong `src/domain/simulators/ecgWaveforms.ts`**:
   - Thiết lập các khoảng PR chuẩn:
     - Beat 0: $PR_0 = 160\text{ms}$ ($qrsMu = 0.220\text{s}$).
     - Beat 1: $PR_1 = 280\text{ms}$ ($qrsMu = 0.340\text{s}$, gia số $\Delta PR_1 = +120\text{ms}$).
     - Beat 2: $PR_2 = 320\text{ms}$ ($qrsMu = 0.380\text{s}$, gia số $\Delta PR_2 = +40\text{ms}$).
     - Beat 3: Rớt hoàn toàn QRS (sóng P không dẫn).
   - Khi đó:
     - $R_0 = 0.220\text{s}$.
     - $R_1 = 0.850 + 0.340 = 1.190\text{s} \rightarrow R-R_1 = 1.190 - 0.220 = 0.970\text{s} = 970\text{ms}$.
     - $R_2 = 1.700 + 0.380 = 2.080\text{s} \rightarrow R-R_2 = 2.080 - 1.190 = 0.890\text{s} = 890\text{ms}$.
     - Kết quả: $R-R_1 (970\text{ms}) > R-R_2 (890\text{ms})$! Đồ thị phản ánh chính xác 100% tính chất ngắn dần!
3. **Cập nhật thước kẹp và badge của Mobitz I trong `RealisticPinkEcgPaper.tsx`**:
   - Thước 1 đo chính xác: $|<\text{R-R}_1 = 970\text{ms}>|$.
   - Thước 2 đo chính xác: $|<\text{R-R}_2 = 890\text{ms}>|$.
   - Badge đối chiếu: `[✓ R-R ngắn dần trước nhát rớt: 970ms → 890ms (QRS hẹp 88ms)]`.
   - Triệt tiêu hoàn toàn sự mâu thuẫn giữa số đo thực tế và badge kết luận!
