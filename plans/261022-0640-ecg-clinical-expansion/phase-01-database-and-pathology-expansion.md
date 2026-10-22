# Phase 01: Database Schema & 9-System Pathology Expansion (Mở Rộng CSDL & Nạp Toàn Bộ Bệnh Lý Theo 9 Hệ Thống Chuẩn)

Status: ✅ Complete
Dependencies: None

## 1. Mục Tiêu (Objective)
Nâng cấp cấu trúc lưu trữ của CSDL SQLite (`data/medsim.db`), bổ sung hệ thống phân loại 9 hệ thống bệnh học tim mạch chuẩn lâm sàng, thêm các trường lâm sàng chuyên sâu (triệu chứng, phác đồ, thuốc/liều, cạm bẫy cấm kỵ, ca bệnh mẫu, lưu đồ 7 bước), và nạp toàn bộ 31 bệnh lý điện tâm đồ chuẩn AHA/ESC/Hội Tim Mạch Việt Nam.

## 2. Yêu Cầu Kỹ Thuật & Y Khoa (Requirements)

### 2.1. Cấu Trúc Bảng `ecg_diagnoses`
- `system_id`: Khóa định danh hệ thống (`sinus_node`, `acute_coronary`, `conduction_blocks`, `supraventricular`, `ventricular_arrest`, `chamber_hypertrophy`, `channelopathies`, `cardiopulmonary_pericardial`, `metabolic_toxicology`)
- `system_name`: Tên tiếng Việt của hệ thống
- `anatomical_region`: Vùng giải phẫu tim / mạch vành liên quan (LAD, LCx, RCA, PDA, Nút xoang, Nút AV, Bó His, Nhánh Purkinje, Màng ngoài tim, Thất trái)
- `clinical_presentation_json`:
  - `symptoms`: Mảng triệu chứng cơ năng (đau ngực, khó thở, ngất, hồi hộp...)
  - `physical_signs`: Triệu chứng thực thể (huyết áp, mạch, SpO2, tiếng T3/T4, ran phổi, tĩnh mạch cổ...)
  - `risk_factors`: Yếu tố nguy cơ
- `emergency_management_json`:
  - `priority_level`: "Mức 1 - Tối khẩn (Code Red)" | "Mức 2 - Cấp cứu (15 phút)" | "Mức 3 - Khẩn trương (60 phút)"
  - `initial_stabilization`: Các bước ổn định ban đầu (ABCDE, Oxy, Monitor, đường truyền tĩnh mạch lớn...)
  - `medications`: Danh sách thuốc cụ thể (Tên thuốc, liều ban đầu, liều duy trì, đường dùng, lưu ý khi tiêm/truyền)
  - `interventions`: Can thiệp thủ thuật (Sốc điện đồng bộ, Khử rung phá rung, Đặt máy tạo nhịp tạm thời, Can thiệp PCI...)
- `approach_algorithm_json`:
  - `step_by_step_approach`: Hướng dẫn tiếp cận 7 bước cụ thể
  - `key_differential_features`: Điểm phân biệt mấu chốt so với các bệnh lý cùng hệ thống hoặc dễ nhầm lẫn
- `red_flags_json`:
  - `contraindications`: Thuốc hoặc can thiệp TUYỆT ĐỐI CHỐNG CHỈ ĐỊNH
  - `pitfalls`: Cạm bẫy thường gặp và hậu quả lâm sàng
- `patient_case_json`:
  - `age`, `gender`, `chief_complaint`, `history_of_present_illness`, `vitals`, `lab_results`

### 2.2. Danh Mục 31 Mặt Bệnh Lý Theo 9 Hệ Thống
1. **Hệ I - Nút Xoang & Nhịp Cơ Bản:** `normal_sinus`, `sinus_bradycardia`, `sinus_tachycardia`
2. **Hệ II - Hội Chứng Mạch Vành Cấp (Theo Vùng Cấp Máu):** `stemi_inferior` (RCA/LCx), `stemi_anterior` (LAD), `stemi_lateral` (LCx), `stemi_posterior` (PDA), `nemi_subendocardial`
3. **Hệ III - Rối Loạn Dẫn Truyền: Block AV & Phân Nhánh:** `av_block_first_degree`, `av_block_mobitz_1`, `av_block_mobitz_2`, `av_block_third_degree`, `rbbb`, `lbbb`, `lafb`
4. **Hệ IV - Rối Loạn Nhịp Trên Thất & Kích Thích Sớm:** `atrial_fibrillation`, `atrial_flutter`, `svt`, `wpw_syndrome`
5. **Hệ V - Loạn Nhịp Thất & Ngừng Tuần Hoàn:** `pvc_frequent`, `ventricular_tachycardia`, `torsades_de_pointes`, `ventricular_fibrillation`, `asystole`
6. **Hệ VI - Phì Đại Buồng Tim & Tăng Gánh:** `lvh_strain`
7. **Hệ VII - Bệnh Lý Kênh Ion & Nguy Cơ Đột Tử:** `brugada_type1`
8. **Hệ VIII - Cấp Cứu Tim Phổi & Màng Ngoài Tim:** `pulmonary_embolism`, `acute_pericarditis`
9. **Hệ IX - Rối Loạn Điện Giải & Nhiễm Độc Thuốc:** `hyperkalemia`, `hypokalemia`, `digoxin_toxicity`

## 3. Các Bước Triển Khai (Implementation Steps)
1. [x] Cập nhật schema SQLite trong `src/infrastructure/db/sqlite.ts` với các cột phân hệ và trường lâm sàng mới.
2. [x] Viết script `scripts/seed_ecg_comprehensive_diagnoses.js` tổng hợp 31 bệnh lý theo đúng 9 hệ thống bệnh học.
3. [x] Chạy seed script để nạp vào CSDL `data/medsim.db`.
4. [x] Cập nhật API route `src/app/api/simulators/ecg/diagnoses/[id]/route.ts`.
5. [x] Tạo API route `src/app/api/simulators/ecg/systems/route.ts` trả về danh mục 9 hệ thống kèm số lượng bệnh lý.

## 4. Tệp Cần Tạo / Chỉnh Sửa
- `src/infrastructure/db/sqlite.ts`
- `scripts/seed_ecg_comprehensive_diagnoses.js`
- `src/app/api/simulators/ecg/diagnoses/[id]/route.ts`
- `src/app/api/simulators/ecg/diagnoses/route.ts`
- `src/app/api/simulators/ecg/systems/route.ts`

## 5. Tiêu Chuẩn Nghiệm Thu
- [ ] SQLite chứa đủ 31 bản ghi bệnh lý tim mạch, phân loại chính xác vào 9 hệ thống.
- [ ] Mọi bản ghi đều có `system_id`, `system_name`, `criteria_json`, `lead_manifestations_json`, `annotations_json`, `clinical_presentation_json`, `emergency_management_json`, `red_flags_json`, `patient_case_json`.
- [ ] API trả về HTTP 200 JSON hợp lệ cho cả 31 bệnh lý và danh mục 9 hệ thống.
