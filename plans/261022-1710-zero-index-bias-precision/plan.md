# Plan: Milestone M13 - Zero Index Bias & Exact Semantic Precision

Created: 2026-10-22T17:10:00+07:00
Status: 🟡 In Progress

## Overview
Khắc phục hiện tượng định vị sai sóng và sai tiêu chuẩn khi tick chọn trên dải giấy hồng điện tim 12 chuyển đạo. Triệt tiêu hoàn toàn các điều kiện hard-coded index (`idx === 0, 1, 2, 3`), đồng bộ dữ liệu khởi tạo của cả 31 mặt bệnh lý (Single Source of Truth), đảm bảo khi tick tiêu chuẩn nào thì CHỈ hiển thị đúng thước đo / nhãn sóng của tiêu chuẩn đó.

## Phases

| Phase | Name | Status | Progress |
|-------|------|--------|----------|
| 01 | Triệt tiêu 100% Hard-Coded Indices trong Matcher & Baseline Synthesizer | ⬜ Pending | 0% |
| 02 | Đồng bộ hóa Dữ liệu Khởi tạo 31 Bệnh lý (Single Source of Truth) | ⬜ Pending | 0% |
| 03 | Tinh chỉnh Độ chính xác Điểm ngắm Sóng (Q, ST, Soi gương, T) | ⬜ Pending | 0% |
| 04 | Bộ Kiểm thử Tự động & Production Build | ⬜ Pending | 0% |
