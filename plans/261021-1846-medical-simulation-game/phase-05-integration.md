# Phase 05: Module 3 - Mô Phỏng Điều Trị Lâm Sàng (Clinical Treatment & ER Simulation)

Status: ⬜ Pending
Dependencies: Phase 03, Phase 04

## Objective
Xây dựng **Module 3: Mô phỏng điều trị lâm sàng** - nơi người chơi đóng vai Bác sĩ điều trị/cấp cứu thực chiến, tích hợp và tận dụng trực tiếp toàn bộ các công cụ đã xây dựng từ **Module 2** (Máy chạy ECG, Đầu dò siêu âm POCUS, Soi X-quang, Cuộn lát cắt CT) vào quá trình khám, chẩn đoán và ra y lệnh điều trị bệnh nhân.

## Requirements

### Functional
- [ ] **Màn hình Giường bệnh & Monitor Sinh hiệu (Bedside Workstation):**
  - Màn hình monitor hiển thị sóng ECG thời gian thực, SpO2, Huyết áp, Nhịp thở, Nhiệt độ và Thang điểm tri giác Glasgow.
  - Hình ảnh bệnh nhân phản ánh sinh động trạng thái: Đau ngực ôm ngực, Khó thở thở co kéo, Tím tái, Hôn mê.
  - Đồng hồ "Thời gian vàng" (Gold Standard Timer) đếm ngược đối với các ca cấp cứu tối khẩn.
- [ ] **Quy trình Lâm sàng 5 Bước Khép Kín:**
  1. *Hỏi bệnh & Bệnh sử (Anamnesis):* Chọn các câu hỏi khai thác triệu chứng chính, tiền sử dị ứng, tiền sử dùng thuốc, hoàn cảnh khởi phát.
  2. *Khám thực thể (Physical Exam):* Khám theo từng hệ cơ quan: Nghe tim (tiếng tim T1, T2, tiếng thổi), Nghe phổi (ran rít, ran ngáy, ran ẩm), Sờ nắn bụng (điểm đau McBurney, phản ứng thành bụng, dấu hiệu Murphy).
  3. *Chỉ định & Thao tác Cận lâm sàng (Tận dụng Module 2):*
     - Bấm nút **"Mắc ECG tại giường"** $\rightarrow$ Mở ngay bộ chạy ECG từ Module 2 để đọc dải nhịp.
     - Bấm nút **"Siêu âm tại giường (POCUS)"** $\rightarrow$ Cầm đầu dò siêu âm quét tìm dịch tự do ổ bụng/màng tim.
     - Bấm nút **"Xem phim X-quang"** $\rightarrow$ Mở viewer X-quang với công cụ chỉnh sáng/tối để phát hiện tổn thương phổi/xương.
     - Bấm nút **"Xem phim CT-Scanner"** $\rightarrow$ Mở bộ cuộn lát cắt CT để xác định chính xác tổn thương sọ/ngực/bụng.
     - Bảng kết quả xét nghiệm máu (Công thức máu CBC, Men tim Troponin, Khí máu động mạch ABG, Sinh hóa gan thận).
  4. *Ra Y Lệnh Xử Trí & Điều Trị (Interventions & Pharmacology):*
     - Các biện pháp hỗ trợ hô hấp: Thở oxy kính mũi, Mặt nạ thở oxy có túi khí, Đặt ống nội khí quản & thở máy.
     - Lập đường truyền tĩnh mạch (IV line), Truyền dịch bù thể tích (NaCl 0.9%, Ringer Lactate).
     - Kê đơn thuốc từ Dược thư: Chọn thuốc, chỉnh liều (mg/ml), chọn đường dùng (Tiêm tĩnh mạch, Tiêm bắp, Uống, Phun khí dung).
     - Can thiệp hồi sức nâng cao: Ép tim ngoài lồng ngực (CPR), Sốc điện đồng bộ / Khử rung tim phá rung thất.
  5. *Chẩn đoán & Chuyển khoa (Final Diagnosis & Disposition):*
     - Chọn chẩn đoán xác định và chẩn đoán phân biệt.
     - Đưa ra quyết định: Cho xuất viện, Nhập khoa Nội theo dõi, Chuyển thẳng phòng Can thiệp mạch vành PCI, hay Chuyển mổ cấp cứu.
- [ ] **Động Cơ Sinh Hiệu Biến Thiên (Dynamic Physiological State Machine):**
  - Sinh hiệu thay đổi từng giây dựa trên:
    - Diễn tiến tự nhiên của bệnh (nếu không xử trí kịp thời $\rightarrow$ suy sụp tuần hoàn/hô hấp).
    - Đáp ứng với y lệnh đúng (ví dụ: Adrenalin làm tăng HA và nhịp tim trong sốc phản vệ; Thở oxy làm tăng SpO2).
- [ ] **Bộ Kiểm Tra An Toàn & Chống Chỉ Định (Medical Safety Guard):**
  - Tự động phát hiện các vi phạm nguy hiểm (Kê thuốc bệnh nhân bị dị ứng, cho Nitroglycerin khi nhồi máu cơ tim thất phải, cho thuốc giãn phế quản sai liều gây ngộ độc).
  - Kích hoạt sự cố lâm sàng: Bệnh nhân ngừng tim, chuyển sang Rung thất (VFib) trên monitor, còi báo động đỏ **Code Blue** réo vang!

### Non-Functional
- [ ] Trải nghiệm liền mạch (Seamless UX): Việc mở các công cụ ECG, Siêu âm, X-quang, CT từ giường bệnh diễn ra tức thì dưới dạng modal/drawer chuyên nghiệp, không làm mất ngữ cảnh phiên cấp cứu.

## Implementation Steps
1. [ ] Xây dựng Simulation State Machine: `src/domain/simulation/treatmentStateMachine.ts`.
2. [ ] Xây dựng Bedside Monitor và Khung nhìn bệnh nhân: `src/components/treatment/BedsideMonitor.tsx` & `PatientView.tsx`.
3. [ ] Tích hợp các bộ công cụ từ Module 2 vào Bedside Drawer: `src/components/treatment/ParaclinicalStation.tsx`.
4. [ ] Xây dựng Bàn ra y lệnh điều trị (Order Sheet): `src/components/treatment/MedicalOrderSheet.tsx`.
5. [ ] Xây dựng Trang ca bệnh điều trị: `src/app/treatment/[caseId]/page.tsx`.

## Files to Create/Modify
- `src/domain/simulation/treatmentStateMachine.ts`
- `src/components/treatment/BedsideMonitor.tsx`
- `src/components/treatment/PatientBedsideView.tsx`
- `src/components/treatment/ParaclinicalStation.tsx`
- `src/components/treatment/MedicalOrderSheet.tsx`
- `src/components/treatment/ClinicalLogTimeline.tsx`
- `src/app/treatment/page.tsx`
- `src/app/treatment/[caseId]/page.tsx`

## Test Criteria
- [ ] Khi ở màn hình điều trị, người dùng có thể mở và sử dụng trọn vẹn cả 4 công cụ (ECG, Siêu âm, X-quang, CT).
- [ ] Sinh hiệu phản hồi chính xác khi tiêm thuốc hoặc thở oxy; báo động đỏ kích hoạt đúng khi vi phạm chống chỉ định.

---
Next Phase: [Phase 06 - Gamification, Debriefing & Testing](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-06-testing.md)
