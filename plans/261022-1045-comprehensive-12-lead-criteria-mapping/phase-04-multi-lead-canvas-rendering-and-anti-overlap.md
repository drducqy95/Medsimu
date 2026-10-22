# Phase 04: Thuật Toán Chống Đè Lấn Nhãn & Render 12 Chuyển Đạo

## 1. Mục Tiêu Hiển Thị
- Khi một tiêu chuẩn được kích hoạt và xuất hiện trên nhiều chuyển đạo (ví dụ ST chênh ở DII, DIII, aVF và Lead II Strip), các nhãn phải:
  1. Hiển thị sắc nét, rõ ràng trên đúng vị trí pha sóng (ST, sóng P, QRS hay T).
  2. Không đè lấn lên đường kẻ lưới milimet hồng hay chữ ghi tên đạo trình (DI, V1...).
  3. Không va chạm nhau nếu 1 chuyển đạo có nhiều nhãn (ví dụ vừa có Sóng Q hoại tử vừa có ST chênh vòm ở DIII).
  4. Hiển thị mượt mà trên cả 2 chế độ:
     - 📱 **Chế độ Dọc (Portrait 6x2)**: 6 hàng x 2 cột.
     - 📄 **Chế độ Ngang A4 EMR (3x4)**: 3 hàng x 4 cột + Dải Lead II liên tục.

---

## 2. Giải Pháp Thuật Toán Anti-Collision
- `RealisticPinkEcgPaper.tsx` đã có cơ chế phân tầng (multi-level vertical stacking) cho các nhãn `top` và `bottom`.
- Đảm bảo trong hàm `drawWaveAnnotations`:
  - Nhãn `top` được đẩy lên phía trên đỉnh sóng (tránh thân sóng R/ST).
  - Nhãn `bottom` được đặt bên dưới chân sóng Q/S.
  - Nhãn `interval` (khoảng PR, QT) vẽ đường thước kẻ 2 đầu mũi tên `|<--->|` rõ ràng.

---

## 3. Tiêu Chuẩn Nghiệm Thu
- [ ] Các nhãn xuất hiện đồng thời trên nhiều chuyển đạo mà không bị chồng chéo hay che khuất thông tin chuyển đạo.
