# Phase 01: Ingestion & Storage - Tích Hợp Kho Ảnh Thật Viable Ultrasound Vào SQLite

Status: ⬜ Pending
Dependencies: None

## Objective
Sao chép tài nguyên hình ảnh thực tế từ CD Viable Ultrasound (`D:\Apps\Portable\Viable_Abdominal_Ultrasound_CD\Viable_Abdominal_Ultrasound_CD\IMAGE`), nạp toàn bộ cấu trúc dữ liệu 10 chương chuyên khoa siêu âm vào SQLite database (`data/medsim.db`), và xây dựng API RESTful phục vụ truy xuất hình ảnh siêu âm thật theo cơ quan và bệnh học.

## Requirements

### Functional
- [ ] Sao chép có chọn lọc hoặc toàn bộ thư viện ảnh thật sang `public/ultrasound/viable_images/`.
- [ ] Tạo bảng `ultrasound_atlas` trong cơ sở dữ liệu SQLite `data/medsim.db`:
  - `id`: Mã chương (ví dụ `liver`, `gb-biliary`, `pancreas`, `kidneys`, `gi-tract`,...)
  - `chapter_number`: Thứ tự chương (1 - 10)
  - `title_vi`: Tên tiếng Việt (Gan, Túi mật, Tụy, Thận,...)
  - `title_en`: Tên tiếng Anh (Liver, Gallbladder, Pancreas,...)
  - `icon`: Biểu tượng tạng
  - `topics_json`: Mảng các chủ đề bệnh lý (id, title, titleEn, description y khoa, images, videos)
- [ ] Xây dựng seeder script `scripts/seed_ultrasound_atlas.js` đọc dữ liệu từ `chapters.js` nạp vào SQLite.
- [ ] Xây dựng REST API:
  - `GET /api/ultrasound/atlas`: Lấy danh sách 9 chương cơ quan.
  - `GET /api/ultrasound/atlas/[chapterId]`: Lấy chi tiết các chủ đề bệnh lý và danh sách hình ảnh siêu âm thật của chương đó.
  - `GET /api/ultrasound/image/[filename]`: API phục vụ ảnh hoặc tĩnh từ `public/ultrasound/viable_images/`.

### Non-Functional
- [ ] Đảm bảo toàn bộ 1,245 ảnh được phục vụ nhanh chóng (<50ms).
- [ ] Thuật ngữ y khoa Việt hóa chuẩn xác (Viêm túi mật cấp, Sỏi mật, U gan HCC, Viêm ruột thừa, Thận ứ nước, Áp xe thận,...).

## Implementation Steps
1. [ ] Chạy script copy ảnh từ `D:\Apps\Portable\Viable_Abdominal_Ultrasound_CD\Viable_Abdominal_Ultrasound_CD\IMAGE` sang `public/ultrasound/viable_images/`.
2. [ ] Mở rộng schema SQLite trong `src/infrastructure/db/sqlite.ts` bổ sung bảng `ultrasound_atlas`.
3. [ ] Tạo và chạy script `scripts/seed_ultrasound_atlas.js`.
4. [ ] Viết API routes: `src/app/api/ultrasound/atlas/route.ts` & `src/app/api/ultrasound/atlas/[chapterId]/route.ts`.

## Files to Create/Modify
- `scripts/seed_ultrasound_atlas.js`
- `src/infrastructure/db/sqlite.ts`
- `src/domain/simulators/ultrasoundAtlasTypes.ts`
- `src/app/api/ultrasound/atlas/route.ts`
- `src/app/api/ultrasound/atlas/[chapterId]/route.ts`

---
Next Phase: [Phase 02: Realistic Pink ECG Paper](file:///d:/Downloads/Archives/GameYhoc/plans/261021-2030-real-ultrasound-and-pink-ecg/phase-02-database.md)
