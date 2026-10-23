# Phase 03: Tái Cấu Trúc Bố Cục Không Gian & Triệt Tiêu Đè Lấn Badge Lên Thước Kẹp

## 1. Mục tiêu
Giải quyết dứt điểm hiện tượng badge kết luận dài $\sim 340\,\text{px}$ `[✓ R-R ngắn dần trước nhát rớt: 970ms → 890ms (QRS hẹp 88ms)]` đè trực tiếp lên thanh thước kẹp số 2 `|<- R-R₂: 890ms ->|` trên dải nhịp Lead II kéo dài.

## 2. Giải Pháp Bố Cục (Spatial Layout Rules)
1. **Căn giữa toàn dải chuỗi đo thay vì đặt lệch tại điểm nối:**
   - Đặt tọa độ $X$ của badge tại tâm trung bình của toàn chuỗi thước:
     $$x_{center} = \frac{x_0 + x_2}{2}$$
   - Điều này tạo sự đối xứng tuyệt đối: Caliper 1 bên trái, Caliper 2 bên phải, Badge nằm cân đối chính giữa phía trên.
2. **Nâng cao độ an toàn (Safe Clearance Y):**
   - Thay vì $calY - 16$ (chỉ cách thanh thước 16px, đè vào chữ của thước), nâng độ cao badge lên:
     $$badgeY = calY - 24$$
   - Giữ khoảng hở tối thiểu $8\,\text{px}$ giữa đáy của badge và đỉnh của text thước kẹp.
3. **Phòng vệ biên màn hình:**
   - Đảm bảo badge luôn được kẹp trong khoảng $[traceStart + 4, leadEndX - badgeW - 4]$.

## 3. Tiêu chí Nghiệm thu
- Badge kết luận và 2 thanh thước kẹp hiển thị hoàn toàn tách biệt, rõ ràng, không chạm vào nhau dù chỉ $1\,\text{px}$.
- Thước kẹp $R-R_1$ và $R-R_2$ đọc rõ các giá trị $970\,\text{ms}$ và $890\,\text{ms}$ mà không bị che khuất.
