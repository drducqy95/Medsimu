# Phase 01: Giới Hạn Tần Số Tim Chuẩn Sinh Lý Cho 31 Bệnh Lý

## 1. Vấn Đề & Mục Tiêu
- **Vấn đề**: Hiện tại thanh trượt BPM cho phép người dùng kéo từ 30 đến 220 bpm cho bất kỳ bệnh nào. Bác sĩ phản ánh: *"không thể nhịp xoang nhanh mà tần số chỉ có 40 được, chỉ cho dao động trong tần số cho phép tương ứng với bệnh lý."*
- **Mục tiêu**:
  - Mở rộng cấu trúc dữ liệu `EcgRhythmDefinition` trong `src/domain/simulators/ecgWaveforms.ts` để bổ sung thuộc tính:
    ```typescript
    allowedBpmRange: {
      min: number;
      max: number;
      step?: number;
    };
    ```
  - Cập nhật chuẩn xác giới hạn sinh lý theo khuyến cáo AHA/ESC cho toàn bộ 31 mặt bệnh lý:
    1. `normal_sinus`: 60 - 100 bpm (mặc định 75)
    2. `sinus_tachycardia`: 101 - 160 bpm (mặc định 125) (Tuyệt đối không dưới 101)
    3. `sinus_bradycardia`: 35 - 59 bpm (mặc định 45) (Tuyệt đối không vượt 59)
    4. `stemi_inferior`: 50 - 130 bpm (mặc định 85)
    5. `stemi_anterior`: 60 - 140 bpm (mặc định 95)
    6. `stemi_lateral`: 60 - 130 bpm (mặc định 90)
    7. `stemi_posterior`: 50 - 120 bpm (mặc định 80)
    8. `nemi_subendocardial`: 60 - 130 bpm (mặc định 88)
    9. `av_block_first_degree`: 50 - 100 bpm (mặc định 65)
    10. `av_block_mobitz_1`: 40 - 90 bpm (mặc định 55)
    11. `av_block_mobitz_2`: 35 - 75 bpm (mặc định 48)
    12. `av_block_third_degree`: 25 - 45 bpm (mặc định 36) (Nhịp thoát thất nội tại, luôn chậm)
    13. `rbbb`: 50 - 110 bpm (mặc định 78)
    14. `lbbb`: 50 - 110 bpm (mặc định 82)
    15. `lafb`: 50 - 100 bpm (mặc định 72)
    16. `atrial_fibrillation`: 60 - 180 bpm (mặc định 115)
    17. `atrial_flutter`: 75 - 150 bpm (mặc định 150)
    18. `svt`: 140 - 240 bpm (mặc định 180) (Không thể < 140)
    19. `wpw_syndrome`: 60 - 200 bpm (mặc định 95)
    20. `pvc_frequent`: 55 - 110 bpm (mặc định 76)
    21. `ventricular_tachycardia`: 130 - 220 bpm (mặc định 165) (Không thể < 120)
    22. `torsades_de_pointes`: 150 - 250 bpm (mặc định 200)
    23. `ventricular_fibrillation`: 0 - 0 bpm (vô mạch, không đo được tần số)
    24. `asystole`: 0 - 0 bpm (vô tâm thu, đường đẳng điện)
    25. `lvh_strain`: 50 - 100 bpm (mặc định 72)
    26. `brugada_type1`: 50 - 100 bpm (mặc định 70)
    27. `pulmonary_embolism`: 90 - 140 bpm (mặc định 110)
    28. `acute_pericarditis`: 70 - 120 bpm (mặc định 92)
    29. `hyperkalemia`: 40 - 90 bpm (mặc định 54)
    30. `hypokalemia`: 60 - 110 bpm (mặc định 86)
    31. `digoxin_toxicity`: 45 - 85 bpm (mặc định 58)

## 2. Đồng Bộ Hóa UI Slider & Điều Khiển
- Slider tần số tim tự động thiết lập `min={currentRhythm.allowedBpmRange.min}` và `max={currentRhythm.allowedBpmRange.max}`.
- Hiển thị nhãn rõ ràng: `Khoảng cho phép: [min - max] BPM`.
- Khi người dùng đổi mặt bệnh:
  - Nếu BPM hiện tại nằm ngoài khoảng mới → tự động đưa về `defaultBpm` của bệnh mới.
  - Vô hiệu hóa slider hoặc hiển thị "0 BPM (Vô mạch)" đối với `asystole` và `ventricular_fibrillation`.

## 3. Tiêu Chuẩn Nghiệm Thu
- [ ] Không thể chỉnh tần số 40 BPM đối với `sinus_tachycardia` (chỉ được trong 101 - 160).
- [ ] Không thể chỉnh tần số 120 BPM đối với `sinus_bradycardia` (chỉ được trong 35 - 59).
- [ ] Slider tự thích ứng ngay khi đổi bệnh.
