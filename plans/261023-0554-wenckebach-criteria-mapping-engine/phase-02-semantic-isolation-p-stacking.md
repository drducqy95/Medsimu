# Phase 02: Semantic Isolation & Elimination of P Stacking (Tiêu chuẩn 2)

Status: ⬜ Pending
Dependencies: Phase 01

## Objective
Khắc phục hiện tượng đè 3 nhãn lên nhau và hiển thị sai các nhãn trục sóng P ("P dương ở DI, DII, aVF", "P âm ở aVR", "P luôn đi trước mỗi QRS") khi người dùng chỉ tick Tiêu chuẩn 2: *"Cho đến khi có một sóng P hoàn toàn không dẫn được (rớt một phức bộ QRS)"*.

## Root Cause
- Trong `RealisticPinkEcgPaper.tsx` dòng 843, bộ lọc `isPActive` kiểm tra `c.includes("sóng p")` mà không loại trừ các ngữ cảnh rớt nhát / block AV. Vì Tiêu chuẩn 2 có chữ "sóng P hoàn toàn không dẫn được", nó vô tình kích hoạt toàn bộ hệ thống nhãn trục sóng P sinh lý bình thường.
- Kết quả: Nhãn trục P sinh lý (`P dương ở DII`, `P âm ở aVR`) cùng xuất hiện và đè lên nhãn `❌ Sóng P không dẫn (Rớt phức bộ QRS)` tại cùng một tọa độ.

## Implementation Steps
1. Sửa điều kiện `isPActive` trong `RealisticPinkEcgPaper.tsx`:
   - Bổ sung loại trừ nghiêm ngặt:
     ```ts
     if (
       c.includes("không dẫn") ||
       c.includes("rớt") ||
       c.includes("block") ||
       c.includes("nghẽn")
     ) {
       return false;
     }
     ```
2. Gắn nhãn Tiêu chuẩn 2 chuẩn xác:
   - Chỉ hiển thị duy nhất 1 nhãn nổi bật tại đỉnh sóng P đơn độc của nhát thứ 4 (Beat 3):
     `❌ Sóng P không dẫn (Rớt phức bộ QRS)`
   - Đường dóng từ đỉnh sóng P không dẫn lên badge rõ ràng, không bị bất kỳ nhãn nào khác đè lên.

## Test Criteria
- [ ] Khi tick Tiêu chuẩn 2, chỉ duy nhất nhãn rớt QRS xuất hiện.
- [ ] Không xuất hiện các nhãn "P dương ở DI", "P âm ở aVR", "P luôn đi trước mỗi QRS".
- [ ] 0 lỗi đè nhãn / badge stacking.
