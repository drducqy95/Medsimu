# Phase 02: In Tiêu Chuẩn Trực Tiếp Trên Giấy Hồng & Click Dòng Bật/Tắt Ánh Xạ

## 1. Yêu Cầu Từ Bác Sĩ
> *"Ghi tiêu chuẩn chẩn đoán trực tiếp trên giấy hồng, cỡ chữ tương đương với thông tin hành chính, mỗi dòng đều có thể click vào được, click dòng sẽ kích hoạt chế độ hiển thị hoặc không hiển thị ánh xạ tiêu chuẩn đó lên đường điện tim."*

---

## 2. Thiết Kế Bản In Trên Giấy Hồng (`RealisticPinkEcgPaper.tsx`)

### 2.1. Cấu Trúc Khối Tiêu Chuẩn Trong Giấy In
- Vị trí: Đặt ngay bên dưới Dải thông tin hành chính bệnh nhân (bệnh viện, tên, tuổi, máy in) và ngay phía trên dải sóng 12 chuyển đạo.
- Kiểu chữ & Cỡ chữ:
  - Font monospace in máy y tế chuẩn (`font-mono text-[9.5px]` hoặc `text-[10px]`, tương đương dòng thông tin hành chính).
  - Màu mực in chuẩn: Mực đen/xám đậm y khoa (`text-slate-900` hoặc `text-rose-950`).
- Cấu trúc từng dòng tiêu chuẩn:
  - Dòng tiêu đề kết luận:
    `KẾT LUẬN: [TÊN BỆNH LÝ TIẾNG VIỆT IN HOA] (TÊN TIẾNG ANH)`
  - Các dòng tiêu chuẩn đánh số:
    `[✓] TC 1: ST chênh lên dạng vòm >= 1mm ở DII, DIII, aVF`
    `[✓] TC 2: ST chênh xuống soi gương ở DI, aVL`
    `[✓] TC 3: Sóng Q hoại tử rộng >= 0.04s ở DIII, aVF`
  - Chú thích nhỏ: `(Chạm vào từng dòng để bật/tắt ánh xạ tương ứng trên sóng)`

### 2.2. Cơ Chế Tương Tác 1 Chạm & Mặc Định Không Ánh Xạ
- **MẶC ĐỊNH (DEFAULT CLEAN STATE):**
  - Khi mở bất kỳ bệnh lý nào, **tất cả các dòng tiêu chuẩn đều ở trạng thái MẶC ĐỊNH TẮT ÁNH XẠ `[ ]`**.
  - Đường sóng điện tim 12 chuyển đạo hiển thị thuần khiết, sạch sẽ 100%, không bị các mũi tên hay nhãn dán che khuất (giống hệt một tờ giấy in ECG thực tế cầm trên tay tại phòng cấp cứu).
  - Trạng thái khởi tạo: `activeCriteriaIndices = new Set<number>()` (tập rỗng).

- **TƯƠNG TÁC BẬT/TẮT THEO YÊU CẦU (ON-DEMAND PEDAGOGICAL MAPPING):**
  - Từng dòng tiêu chuẩn in trên giấy hồng đóng vai trò như một phím bật/tắt:
    - Khi Bác sĩ click vào dòng TC $k$:
      - Dòng đó chuyển sang trạng thái kích hoạt `[✓]` (nổi bật với màu mực y khoa / chỉ thị màu).
      - Các mũi tên, vùng chênh ST, thước đo của **riêng tiêu chuẩn $k$ đó** mới xuất hiện chính xác trên các chuyển đạo liên quan!
    - Khi Bác sĩ click lại vào dòng TC $k$:
      - Tiêu chuẩn đó tắt `[ ]`, các nhãn ánh xạ tương ứng lập tức biến mất, trả lại đường sóng sạch sẽ.
  - Có thể click chọn 1 hoặc nhiều tiêu chuẩn cùng lúc để quan sát đối chiếu.
  - Bổ sung nút bấm nhỏ tiện ích ngay cạnh tiêu đề kết luận: `[Bật tất cả ánh xạ]` / `[Tắt tất cả]`.

---

## 3. Tiêu Chuẩn Nghiệm Thu
- [ ] Tiêu chuẩn chẩn đoán được in trực tiếp ngay trên mặt giấy hồng, cỡ chữ đồng điệu với thông tin hành chính.
- [ ] **Mặc định khi tải bệnh lý: hoàn toàn KHÔNG hiển thị ánh xạ nhãn trên đường sóng (sóng sạch sẽ 100%)**.
- [ ] Khi click vào bất kỳ dòng tiêu chuẩn nào: nhãn ánh xạ tương ứng trên dải sóng 12 chuyển đạo mới xuất hiện tức thì; click lại sẽ biến mất.
- [ ] Hỗ trợ cả in ấn A4 và lưu ảnh PNG (giữ trọn vẹn văn bản tiêu chuẩn đã in trên giấy).
