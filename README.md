# MedSim - Game Y Học & Mô Phỏng Lâm Sàng Tương Tác

> **Hệ sinh thái đào tạo y khoa lâm sàng thế hệ mới dưới dạng MedSim RPG**  
> Kết hợp mô phỏng cận lâm sàng chuẩn mực (Điện tâm đồ giấy hồng 12 đạo trình, Siêu âm đầu dò 3D ảnh thực, X-Quang, CT) và xử trí cấp cứu thời gian thực.

---

## 🌟 Điểm Nhấn Kiến Trúc (3 Modules Cốt Lõi)

### Module 1: Học Viện Y Khoa (Medical Academy)
- **Flashcards ghi nhớ chủ động:** Lặp lại ngắt quãng (Spaced Repetition) cho các ca bệnh, triệu chứng học và hình ảnh học.
- **Dược thư lâm sàng tương tác:** Phân loại nhóm thuốc, liều dùng cấp cứu, chỉ định và chống chỉ định tuyệt đối.
- **Bài học lâm sàng & Trắc nghiệm chẩn đoán:** Tích hợp giải thích sinh lý bệnh chi tiết theo chuẩn Y Hà Nội & ESC/AHA.

### Module 2: Bộ Mô Phỏng Cận Lâm Sàng Chuyên Sâu (Paraclinical Simulators)
1. **Realistic 12-Lead Pink Paper ECG (Bản In Giấy Hồng Chuẩn Lâm Sàng):**
   - Lưới milimet chuẩn 60 FPS Canvas (25 mm/s, 10 mm/mV), chế độ cuộn sóng (Rolling) và quét nhịp (Sweep).
   - **9 Hệ thống tim mạch AHA/ESC toàn diện** với **31 mặt bệnh lý** thực tế.
   - **Ánh xạ tiêu chuẩn lên sóng (Physical Wave-Mapped Annotations):** Ghim trực tiếp từng tiêu chuẩn chẩn đoán vàng vào đúng vị trí cơ học trên sóng tim (sóng P, phức bộ QRS, đoạn ST, sóng T, sóng U, khoảng PR, R-R).
   - **Bộ lọc tiêu chuẩn độc lập & Thuật toán chống chồng lấn (Anti-Collision):** Lọc chiếu riêng từng tiêu chuẩn, tự động căn chỉnh bậc thang độ cao và triệt tiêu trùng lặp badge trên dải nhịp chuẩn Lead II.
   - **Trợ lý đọc ECG 7 bước hệ thống:** Hướng dẫn sinh viên từng bước từ Tần số, Nhịp, Trục, Sóng P, Khoảng PR, Phức bộ QRS đến ST-T.
   - **Bảng phác đồ xử trí cấp cứu & Red Flags:** Cảnh báo đỏ các sai lầm tử vong (ví dụ: cấm Nitrates trong NMCT thất phải, cấm ức chế AV trong AFib + WPW, cấm Sốc điện trong Vô tâm thu).
2. **Real Clinical Ultrasound Workstation (Siêu Âm Đầu Dò 3D Động):**
   - Điều hướng đầu dò thời gian thực, tích hợp kho **1200+ ảnh siêu âm lâm sàng thật** từ đĩa CD chuyên khoa.
   - 10 chương bệnh học toàn diện (Gan, Mật, Thận, Tim mạch, Sản phụ khoa,...).
3. **Mô Phỏng X-Quang Lồng Ngực & Lát Cắt CT Scanner:**
   - Cửa sổ đo đạc, chỉnh sáng tối (Windowing), phóng to thu nhỏ và đánh dấu tổn thương giải phẫu.

### Module 3: Buồng Cấp Cứu & Xử Trí Lâm Sàng (Treatment & ER Ward)
- **Màn hình sinh hiệu đa thông số (Bedside Monitor):** Nhịp tim, Huyết áp, SpO2, Nhịp thở, Nhiệt độ cập nhật theo thời gian thực.
- **Hệ thống can thiệp cấp cứu:** Bơm tiêm điện (Infusion Pump), Máy sốc điện khử rung (Defibrillator), Máy thở cơ học (Mechanical Ventilator).
- **Cơ chế chuyển ca 1-Click từ ECG sang Buồng Cấp Cứu:** Nạp ngay hồ sơ bệnh án, men tim Trop-I/CK-MB và sinh hiệu của bệnh nhân có ECG bệnh lý vào kịch bản hồi sức.
- **State Machine phản ứng sinh lý & Báo động Code Blue:** Tự động phản hồi huyết động theo y lệnh; kích hoạt ngừng tuần hoàn Code Blue nếu người chơi phạm phải chống chỉ định gây tử vong.

---

## 🛠️ Công Nghệ Phát Triển

- **Frontend & Server:** Next.js 14+ (App Router), React 18, TypeScript 5.x.
- **Styling & UI:** Tailwind CSS, Lucide React Icons.
- **Rendering Engine:** HTML5 Canvas 2D (60 FPS tối ưu Offscreen Canvas).
- **Cơ sở dữ liệu:** SQLite 3 (thông qua `better-sqlite3` với cơ chế WAL).
- **Testing:** Node.js native test runner (`node --test`), đảm bảo 100% test pass.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Yêu cầu môi trường
- Node.js version 18.x hoặc 20.x trở lên.
- Trình quản lý gói `npm`.

### Các bước khởi chạy

1. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

2. **Nạp dữ liệu mẫu vào CSDL SQLite:**
   ```bash
   node scripts/seed_database.js
   node scripts/seed_clinical_cases.js
   node scripts/seed_ultrasound_atlas.js
   node scripts/seed_ecg_comprehensive_diagnoses.js
   ```

3. **Khởi chạy môi trường phát triển (Development):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt tại: [http://localhost:3000](http://localhost:3000)

4. **Chạy kiểm thử tự động (Automated Test Suite):**
   ```bash
   npm test
   ```

5. **Đóng gói phiên bản Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Cấu Trúc Dự Án

```
├── data/                  # File CSDL SQLite (medsim.db)
├── docs/specs/            # Tài liệu đặc tả chuẩn y khoa lâm sàng
├── public/                # Ảnh siêu âm thật, tài nguyên tĩnh, service worker
├── scripts/               # Bộ script seed CSDL tự động
├── src/
│   ├── app/               # Next.js App Router (Pages & REST APIs)
│   ├── components/        # UI Components (ECG, Siêu âm, Monitor, Modal)
│   ├── domain/            # Core Business Logic & State Machines
│   ├── infrastructure/    # Database repository (SQLite Adapter)
│   └── store/             # State management
└── tests/                 # Bộ unit tests kiểm chứng y khoa và toán học
```

---

## 📜 Bản Quyền & Giấy Phép
Dự án được phát triển phục vụ công tác nghiên cứu, học tập và rèn luyện kỹ năng lâm sàng y khoa.
- Repository: [drducqy95/Medsimu](https://github.com/drducqy95/Medsimu)
