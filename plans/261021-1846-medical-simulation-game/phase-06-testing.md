# Phase 06: Gamification, Debriefing, Career Progression & Verification

Status: ⬜ Pending
Dependencies: Phase 02, Phase 03, Phase 04, Phase 05

## Objective
Hoàn thiện vòng lặp tổng thể: Hệ thống Debriefing lâm sàng phân tích cơ chế bệnh sinh sau điều trị, Hệ thống thăng cấp Bác sĩ (Career Progression: Sinh viên Y $\rightarrow$ Trưởng khoa), Cây kỹ năng (Skill Tree), Bộ Unit Test cho Simulation Engine và Kiểm thử End-to-End toàn bộ 3 Module.

## Requirements

### Functional
- [ ] **Clinical Debriefing Modal (Bảng Tổng Kết & Rút Kinh Nghiệm Lâm Sàng):**
  - Chấm điểm đa chiều (Tổng 100 điểm):
    - *Độ chính xác chẩn đoán (Diagnostic Accuracy 40%):* Xác định đúng bệnh chính và bệnh kèm theo.
    - *An toàn người bệnh (Patient Safety 30%):* Không phạm lỗi chống chỉ định, nhận diện kịp thời Red Flags.
    - *Hiệu quả điều trị (Treatment Efficacy 20%):* Chọn đúng phác đồ đầu tay, đúng liều lượng và thời điểm.
    - *Tối ưu tài nguyên (Resource & Time Efficiency 10%):* Không chỉ định xét nghiệm thừa thãi, hoàn thành trong thời gian vàng.
  - Phân tích cơ chế bệnh sinh chi tiết (Pathophysiology Breakdown): Giải thích tại sao bệnh nhân lại có triệu chứng đó, tại sao thuốc A lại có tác dụng, sai lầm lâm sàng đã mắc phải là gì.
  - Liên kết trực tiếp sang bài học ở **Module 1** để người chơi ôn lại kiến thức thiếu sót.
- [ ] **Hệ Thống Cấp Bậc & Cây Kỹ Năng Bác Sĩ:**
  - Bậc 1: Sinh viên Y thực tập (Medical Student)
  - Bậc 2: Bác sĩ Nội trú (Resident Physician)
  - Bậc 3: Bác sĩ Điều trị Cấp cứu (Attending Doctor)
  - Bậc 4: Trưởng khoa Lâm sàng (Chief of Medicine)
  - Cây kỹ năng y khoa:
    - Kỹ năng Đọc nhanh ECG: Tự động highlight đoạn ST bất thường.
    - Kỹ năng Cấp cứu vàng: Tăng tốc độ hồi phục sinh hiệu thêm 20%.
    - Kỹ năng Dược lý an toàn: Cảnh báo pop-up khi chuẩn bị kê thuốc có tương tác bất lợi.
- [ ] **Chế Độ Chơi Đa Tầng:**
  - *Guided Learning Mode:* Có gợi ý từ Bác sĩ hướng dẫn, không áp lực chết, phù hợp học sinh - sinh viên.
  - *Hardcore ER Mode:* Bệnh nhân suy sụp theo đồng hồ thực tế, không có gợi ý, kiểm tra phản xạ lâm sàng thực tế.

### Non-Functional & Testing
- [ ] **Unit Tests:**
  - Test thuật toán tạo sóng ECG và đo Calipers.
  - Test thuật toán biến thiên sinh hiệu (Vitals tick engine).
  - Test bộ lọc chống chỉ định y khoa (Safety validator).
  - Test thuật toán tính điểm và debriefing.
- [ ] **E2E Integration Testing:**
  - Kiểm thử trải nghiệm mượt mà xuyên suốt 3 Module:
    - Module 1: Xem bài giảng $\rightarrow$ Làm quiz.
    - Module 2: Thao tác máy ECG $\rightarrow$ Đặt đầu dò Siêu âm $\rightarrow$ Soi phim X-quang $\rightarrow$ Cuộn lát cắt CT.
    - Module 3: Khám ca bệnh $\rightarrow$ Mở máy Module 2 $\rightarrow$ Kê thuốc $\rightarrow$ Xem Debriefing.
- [ ] **Production Build:**
  - `npm run build` không lỗi type, không lỗi lint, dung lượng bundle tối ưu.

## Implementation Steps
1. [ ] Xây dựng Clinical Debriefing Modal: `src/components/debriefing/ClinicalDebriefingModal.tsx`.
2. [ ] Xây dựng Career Progression & Skill Tree: `src/domain/progression/careerEngine.ts` & `src/components/progression/`.
3. [ ] Viết Unit Tests cho Simulation & Diagnostic Engines: `src/domain/simulators/__tests__/`.
4. [ ] Viết tài liệu Hướng dẫn Vận hành & Sổ tay Y khoa: `docs/specs/medical_simulation_playbook.md`.
5. [ ] Chạy nghiệm thu toàn bộ hệ thống và ghi nhận kết quả vào `plans/261021-1846-medical-simulation-game/reports/test-report.md`.

## Files to Create/Modify
- `src/components/debriefing/ClinicalDebriefingModal.tsx`
- `src/domain/progression/careerEngine.ts`
- `src/components/progression/CareerProfileBadge.tsx`
- `src/components/progression/SkillTreeModal.tsx`
- `src/domain/simulators/__tests__/ecg.test.ts`
- `src/domain/simulation/__tests__/safety.test.ts`
- `docs/specs/medical_simulation_playbook.md`
- `plans/261021-1846-medical-simulation-game/reports/test-report.md`

## Test Criteria
- [ ] 100% Unit test pass.
- [ ] Vòng lặp 3 Module (Học $\rightarrow$ Thao tác máy cận lâm sàng $\rightarrow$ Điều trị ca bệnh) hoạt động trơn tru.
- [ ] `npm run build` thành công xuất sắc.

---
Next Phase: Hoàn tất Plan! Sẵn sàng thực thi Phase 01 với `/code phase-01`.
