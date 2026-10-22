# Phase 02: Module 1 - Học Tập Kiến Thức (Medical Academy)

Status: ✅ Complete
Dependencies: Phase 01

## Objective
Xây dựng toàn bộ **Module 1: Học tập kiến thức** với giáo trình Y khoa tương tác, phân tích cơ chế bệnh sinh, dược lý học lâm sàng, hướng dẫn nguyên lý đọc cận lâm sàng và hệ thống câu hỏi trắc nghiệm kiểm tra hiểu bài.

## Requirements

### Functional
- [ ] **Thư viện Kiến thức Y khoa Đa chuyên khoa:**
  - *Tim mạch:* Cơ chế điện sinh lý cơ tim, các sóng P-QRS-T, các dạng rối loạn nhịp, cơ chế thiếu máu cơ tim & STEMI/NSTEMI.
  - *Hô hấp:* Sinh lý thông khí, cơ chế co thắt phế quản trong hen/COPD, cơ chế suy hô hấp giảm oxy máu và tăng CO2 máu.
  - *Tiêu hóa - Ngoại khoa:* Cơ chế viêm phúc mạc, ruột thừa tắc nghẽn, xuất huyết tiêu hóa trên/dưới.
  - *Cấp cứu - Hồi sức:* Sốc phản vệ (phản ứng dị ứng type I qua IgE, giãn mạch ồ ạt), Toan ceton đái tháo đường (DKA - thiếu insulin tuyệt đối, tạo thể ceton), hồi sinh tim phổi nâng cao (ACLS).
- [ ] **Dược lý học lâm sàng tương tác (Interactive Pharmacology):**
  - Danh mục 30+ thuốc thiết yếu chia theo nhóm: Vận mạch (Adrenalin, Noradrenalin), Kháng đông/Chống kết tập tiểu cầu (Aspirin, Clopidogrel, Heparin), Giãn phế quản (Salbutamol, Ipratropium), Corticoid, Kháng sinh, Giảm đau (Morphin, Paracetamol), Hạ áp...
  - Mỗi thuốc có chi tiết: Cơ chế thụ thể (Receptor Mechanism), Liều chuẩn, Đường dùng, Thời gian khởi phát, Chống chỉ định tuyệt đối/tương đối, Tác dụng phụ nguy hiểm.
- [ ] **Sổ tay Nguyên lý Đọc Cận lâm sàng:**
  - Hướng dẫn đọc điện tâm đồ theo 7 bước (Nhịp, Tần số, Trục, Sóng P, Khoảng PR, Phức bộ QRS, Đoạn ST & Sóng T).
  - Hướng dẫn nguyên lý siêu âm (Đầu dò tần số cao vs thấp, Echo trống, kém, dày, bóng lưng).
  - Quy trình đọc X-quang chuẩn (A-B-C-D-E).
  - Hướng dẫn đọc CT và thang điểm Hounsfield (Nước 0 HU, Mỡ -100 HU, Xương > +400 HU, Xuất huyết mới +60 đến +80 HU).
- [ ] **Hệ thống Kiểm tra Nhanh (Interactive Knowledge Check):**
  - Trắc nghiệm tình huống ngắn sau mỗi bài học (Instant Feedback giải thích tại sao đúng/sai).
  - Flashcards y khoa thông minh hỗ trợ ghi nhớ nhanh.

### Non-Functional
- [ ] Kiến thức y học chuẩn hóa theo giáo trình Đại học Y Dược, phác đồ Bộ Y Tế, AHA và Harrison.
- [ ] Giao diện đọc trực quan, có sơ đồ mindmap và minh họa sinh động.

## Implementation Steps
1. [ ] Xây dựng Types cho Academy: `src/domain/academy/types.ts`.
2. [ ] Tạo cơ sở dữ liệu bài học: `src/data/academy/lessons.ts`.
3. [ ] Tạo cơ sở dữ liệu dược thư lâm sàng: `src/data/academy/pharmacology.ts`.
4. [ ] Tạo ngân hàng câu hỏi trắc nghiệm & flashcards: `src/data/academy/quizzes.ts`.
5. [ ] Xây dựng giao diện xem bài học và trắc nghiệm: `src/app/academy/page.tsx` và `src/components/academy/`.

## Files to Create/Modify
- `src/domain/academy/types.ts`
- `src/data/academy/lessons.ts`
- `src/data/academy/pharmacology.ts`
- `src/data/academy/quizzes.ts`
- `src/app/academy/page.tsx`
- `src/components/academy/LessonViewer.tsx`
- `src/components/academy/PharmacologyCatalog.tsx`
- `src/components/academy/InteractiveQuiz.tsx`

## Test Criteria
- [ ] Người dùng xem được toàn bộ danh mục bài học và dược thư.
- [ ] Trắc nghiệm hiển thị kết quả và giải thích cơ chế ngay lập tức khi chọn đáp án.

---
Next Phase: [Phase 03 - Module 2A: ECG & X-Ray Simulators](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-03-backend.md)
