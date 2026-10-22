# KẾ HOẠCH MILESTONE M15: COMPREHENSIVE 31-PATHOLOGY ECG METRICS, MULTI-LEAD PROJECTION & OMNIPRESENT RR REGULARITY CALIPERS

> **Yêu cầu trực tiếp từ Bác sĩ:** *"Với các tiêu chuẩn nhịp đều phải chỉ ra khoảng RR đều trên các đạo trình"*

## 1. Mở Rộng R-R Caliper Trên Toàn Bộ 12 Chuyển Đạo & 2 Chu Kỳ Dài Nhịp
- Gỡ bỏ hạn chế `normLead === "DII" || normLead === "II"` ở dòng 750 `RealisticPinkEcgPaper.tsx`.
- Hiển thị R-R caliper trên TẤT CẢ các chuyển đạo khi tick tiêu chuẩn nhịp đều.
- Trên Dải nhịp dài: Hiển thị 2 khoảng R-R liên tiếp ($R_1-R_2$ và $R_2-R_3$) chứng minh tính "đều đặn".

## 2. Chuẩn Hóa 100% 31 Bệnh Lý Trong computeEcgMetrics
- Sửa lỗi Header Monitor `PR: 156ms` ở Block AV độ I thành `PR: 260ms` (> 200ms).
- Bổ sung đủ 7 bệnh lý còn thiếu (Block AV I, Mobitz 1, Mobitz 2, Block AV III, Cuồng nhĩ, SVT, PVC dày).

## 3. Chiếu Vector Giải Phẫu 12 Chuyển Đạo
- Lead aVR luôn âm toàn diện (P âm, QRS âm, T âm).
- Lead V1 dạng $rS$ chuẩn mực.
- Căn chỉnh PR-Caliper từ $0.030\,\text{s}$ đến $0.290\,\text{s}$ ($260\,\text{ms}$).
- Giữ nguyên nhãn "Sóng P dẫn 1:1 sau mỗi nhát bóp" không bị ghi đè.

## 4. Kiểm Thử Tự Động & Đóng Gói
- Viết `tests/comprehensive_metrics_and_multilead_projection.test.js`.
- 100% tests pass, TypeScript 0 lỗi, Next.js build 13/13 static routes thành công.
