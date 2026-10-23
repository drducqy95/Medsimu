# Phase 02: Đồng Bộ Thước Đo R-R Trên Toàn Bộ 12 Chuyển Đạo Theo Đỉnh Sóng Thật

## 1. Mục tiêu
Sử dụng danh sách đỉnh sóng vật lý `PhysicalWavePeak[]` thu được từ Phase 01 để dựng thước kẹp $R-R$ trên từng ô chuyển đạo của 12 đạo trình độc lập và dải nhịp Lead II.

## 2. Đặc tả Logic Dựng Thước
1. **Trường hợp $\ge 3$ đỉnh sóng $R$ trong ô (ví dụ Cột 0: Leads I, II, III):**
   - Dựng Thước đoạn 1: $R_0 \rightarrow R_1$ (hiển thị đúng $970\,\text{ms}$).
   - Dựng Thước đoạn 2: $R_1 \rightarrow R_2$ (hiển thị đúng $890\,\text{ms}$, nối liền tại $R_1$).
   - Badge đối chiếu: `✓ R-R ngắn dần trước nhát rớt: 970ms → 890ms` hoặc trên 12 chuyển đạo: `✓ R-R: 970ms → 890ms`.
2. **Trường hợp có 2 đỉnh sóng $R$ trong ô (ví dụ Cột 1: aVR, aVL, aVF):**
   - Dựng 1 thước đơn giữa 2 đỉnh đó: $R_0 \rightarrow R_1 = 970\,\text{ms}$ (thay vì $1000\,\text{ms}$ vô lý như ảnh chụp).
3. **Trường hợp có khoảng dừng rớt nhát (ví dụ Cột 2: V1, V2, V3):**
   - Dựng thước đo khoảng dừng: $R_2 \rightarrow R_0 = 1540\,\text{ms}$ (ghi rõ: `|<- Khoảng rớt nhát: 1540ms ->|`).
4. **Vẽ Chấm Pinpoint Dots:**
   - Tại mọi mốc đo $(x, y)$, vẽ chấm tròn định vị chính xác vào tọa độ $(x, y)$ của đỉnh sóng thật đã phát hiện, vòng ngoài màu thước, tâm màu trắng tinh `#ffffff`.

## 3. Tiêu chí Nghiệm thu
- Không còn bất kỳ con số $1000\,\text{ms}$ sai lệch nào xuất hiện trên màn hình khi xem Wenckebach ở $60\,\text{bpm}$.
- Các chấm định vị cắm chính xác $100\%$ vào đỉnh nhọn sóng $R$ (hoặc đáy $QS$ trên aVR) trên tất cả 12 ô chuyển đạo.
