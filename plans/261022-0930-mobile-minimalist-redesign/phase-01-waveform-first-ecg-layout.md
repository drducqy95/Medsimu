# Phase 01: Waveform-First Layout Cho Trang Điện Tim (ECG Simulator)

## 1. Mục Tiêu & Vấn Đề Cần Giải Quyết
- **Vấn đề**: Hiện tại trên mobile, khi người dùng mở trang `/simulators/ecg`, họ phải cuộn qua Header, Khối chế độ xem (ViewMode), Khối điều khiển BPM/Tốc độ/Biên độ, và Khối bộ lọc tiêu chuẩn (tổng cộng ~450-500px) mới nhìn thấy giấy in điện tim. Giấy in bị đẩy xuống bên dưới màn hình, gây cảm giác ngột ngạt và rườm rà.
- **Mục tiêu**: Tái cấu trúc trang ECG theo nguyên lý **Waveform-First**:
  - Màn hình giả lập (Giấy in ECG / Monitor) được đẩy ngay lên vị trí đầu tiên (First Fold).
  - Tích hợp một thanh Header siêu mỏng (Micro Top Bar) chứa nút Trở về, Tên màn hình, và Nút Audio nhịp tim.
  - Loại bỏ hoàn toàn sự chiếm chỗ của các Control Deck to lớn trên màn hình chính của mobile.

---

## 2. Các Thay Đổi Cụ Thể Trong Code

### File: `src/app/simulators/ecg/page.tsx`
1. **Tái cấu trúc bố cục Mobile vs Desktop**:
   - Sử dụng flex/grid với lớp ưu tiên thứ tự hiển thị:
     - Trên mobile (`< lg`):
       - Hàng 1: Micro Navigation Bar (Cao ~42px, chứa nút Back, Tên simulator, Quick Badge "Chuẩn 12 Cần", Âm thanh Beeper).
       - Hàng 2: Giấy in điện tim `RealisticPinkEcgPaper` (Hiển thị ngay tức thì, tỉ lệ chuẩn chân dung 6x2 hoặc monitor).
       - Hàng 3: Thumb Quick Bar (Nút chọn bệnh dạng Pill Button và nút Cài đặt nhanh).
     - Trên desktop (`>= lg`): Giữ nguyên trải nghiệm studio rộng rãi, đầy đủ các panel bên cạnh.
2. **Loại bỏ các khoảng đệm thừa**:
   - Giảm padding của container từ `px-4 py-8` xuống `px-2 py-2 sm:px-4 sm:py-6`.
   - Giảm khoảng cách margin `gap-6` thành `gap-2` trên mobile.

---

## 3. Tiêu Chuẩn Nghiệm Thu (Acceptance Criteria)
- [ ] Khi mở trang `/simulators/ecg` trên màn hình điện thoại (viewport width 375px - 414px), giấy in điện tim xuất hiện ngay trong 100vh đầu tiên mà **không cần cuộn tay**.
- [ ] Không có thanh điều khiển nào chiếm quá 50px chiều cao trước khi người dùng nhìn thấy đường sóng điện tim chạy.
- [ ] Giữ nguyên 100% tính năng âm thanh nhịp tim và hiển thị chuẩn y khoa.
