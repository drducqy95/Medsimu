# Phase 04: Ánh Xạ Đầy Đủ Các Dãy Đạo Trình Cho Toàn Bộ 31 Bệnh Lý

## 1. Yêu Cầu Từ Bác Sĩ
> *"Các tiêu chuẩn phải được ánh xạ trên đầy đủ các dãy đạo trình"*

---

## 2. Đồng Bộ Hóa Dữ Liệu Lên Toàn Bộ 12 Chuyển Đạo & Dải Nhịp Lead II
- Cập nhật cả `scripts/seed_ecg_comprehensive_diagnoses.js`, `data/medsim.db` và `FALLBACK_ANNOTATIONS`:
  - Mỗi khi một tiêu chuẩn đề cập đến một vùng cơ tim (ví dụ thành dưới: DII, DIII, aVF), tất cả các chuyển đạo thuộc vùng đó ĐỒNG THỜI được gắn nhãn/thước đo.
  - Dải nhịp Lead II (Rhythm Strip) ở đáy giấy in luôn được gán nhãn dải nhịp tương ứng để người dùng theo dõi nhịp liên tục.
  - Đảm bảo 100% tiêu chuẩn trong 31 bệnh lý đều có ít nhất 2 đến 5 chuyển đạo liên kết (0 tiêu chuẩn bị mồ côi).

---

## 3. Tiêu Chuẩn Nghiệm Thu
- [ ] Bật tiêu chuẩn ST thành dưới -> DII, DIII, aVF và Lead II strip đồng loạt hiện thước đo ST chênh.
- [ ] Bật tiêu chuẩn T lều tăng kali -> V1 đến V6 đồng loạt hiện thước đo biên độ sóng T.
- [ ] Bật tiêu chuẩn R-R -> Dải nhịp Lead II và các chuyển đạo liên quan hiện thước kẹp calipers nối 2 đỉnh R.
