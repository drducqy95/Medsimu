# Phase 05: Tối Ưu Viện Hàn Lâm & Dược Thư Cho Màn Hình Dọc (Academy Portrait Architecture)

Status: ⬜ Pending
Dependencies: Phase 01

---

## 1. Mục Tiêu (Objective)
Cải tiến trải nghiệm đọc giáo trình bệnh học, tra cứu dược thư cấp cứu, làm trắc nghiệm tình huống và ôn tập thẻ ghi nhớ flashcard trên màn hình dọc của điện thoại di động, loại bỏ việc cuộn thừa qua danh sách bài học dài.

---

## 2. Yêu Cầu Kỹ Thuật (Requirements)

### 2.1. Giáo Trình Bệnh Học (`LessonViewer.tsx`)
- [ ] **Bộ Chọn Bài Học Dọc (Quick Lesson Drawer / Dropdown Selector)**:
  - Trên màn hình dọc (`< lg`), thay vì hiển thị danh sách 10 bài học xếp chồng phía trên nội dung (chiếm hơn 500px chiều cao cuộn), tạo **Thanh Chọn Bài Học Nhanh** ở đầu trang.
  - Người dùng bấm vào để mở menu chọn bài (hoặc trượt danh sách bài dạng ngang/drawer).
  - Nội dung bài giảng được đưa lên vị trí ưu tiên số 1, người dùng vào trang là đọc được ngay bài học hiện tại mà không phải cuộn.
- [ ] **Các Khối Dấu Hiệu Đỏ & Phác Đồ**:
  - Hộp "Red Flags" và các bước xử trí khẩn cấp được trình bày với phông chữ sắc nét, bullet point rõ ràng, icon phân biệt dễ nhìn.

### 2.2. Dược Thư Lâm Sàng (`PharmacologyCatalog.tsx`)
- [ ] Dải nút chọn nhóm thuốc chuyển thành thanh cuộn ngang mượt mà (Snap horizontal pill carousel).
- [ ] Thẻ thuốc dạng Accordion tối ưu hóa cho màn hình hẹp: Tiêu đề hoạt chất + biệt dược hiển thị trên 1 dòng, chạm vào mở rộng nội dung chi tiết (Cơ chế, Sai lầm chết người, Liều lượng cấp cứu).

### 2.3. Trắc Nghiệm Tình Huống (`InteractiveQuiz.tsx`) & Flashcards (`FlashcardDeck.tsx`)
- [ ] **Quiz**: Câu hỏi tình huống lâm sàng (Vignette) và 4 phương án trả lời được căn chỉnh tỉ lệ vừa khít chiều cao màn hình dọc thông dụng (~667px - 844px), giúp người học đọc câu hỏi và chọn đáp án trong cùng 1 tầm mắt mà không cần cuộn lên xuống.
- [ ] **Flashcards**: Thẻ lật 3D có chiều cao co giãn linh hoạt (`h-56` đến `h-64`), nút lật thẻ và đánh dấu đã nhớ đặt ngay dưới tầm ngón cái.

---

## 3. Các File Cần Chỉnh Sửa / Tạo Mới
- `src/components/academy/LessonViewer.tsx`
- `src/components/academy/PharmacologyCatalog.tsx`
- `src/components/academy/InteractiveQuiz.tsx`
- `src/components/academy/FlashcardDeck.tsx`
- `src/app/academy/page.tsx`

---

## 4. Tiêu Chí Kiểm Thử (Test Criteria)
- [ ] Mở bài giảng trên mobile dọc hiển thị ngay nội dung bài học mà không bị đẩy xuống dưới danh sách bài.
- [ ] Thẻ Flashcard và bài Quiz vừa khít khung nhìn portrait không cần cuộn dọc.
