# Plan: Nâng Cấp Mô Phỏng Siêu Âm Hình Ảnh Thật & Điện Tâm Đồ Giấy Hồng 12 Đạo Trình

Created: 2026-10-21T20:30:00+07:00
Status: 🟡 In Progress

## Overview
Dự án nâng cấp hệ thống mô phỏng y khoa MedSim RPG dựa trên 2 yêu cầu cụ thể của người dùng:
1. **Mô phỏng siêu âm hình ảnh thật:** Khai thác và tích hợp toàn bộ kho tài nguyên 1,245 hình ảnh siêu âm và 11 video lâm sàng thực tế từ đĩa CD "Viable Abdominal Ultrasound" (`D:\Apps\Portable\Viable_Abdominal_Ultrasound_CD\Viable_Abdominal_Ultrasound_CD`), phân loại theo 9 hệ cơ quan (Gan, Túi mật/Đường mật, Tụy, Thận/Niệu quản, Bàng quang, Tiền liệt tuyến/Bìu, Tuyến giáp/Cổ, Lồng ngực, Đường tiêu hóa/Ruột thừa). Đồng bộ hóa vị trí đầu dò 3D với hình ảnh siêu âm thực tế.
2. **Điện tâm đồ giấy hồng 12 đạo trình chuẩn y khoa:** Hiển thị trọn vẹn 12 đạo trình (DI, DII, DIII, aVR, aVL, aVF, V1 - V6) trên nền giấy kẻ điện tim màu hồng chuyên dụng (lưới nhỏ 1mm x 1mm, lưới lớn 5mm x 5mm), in kèm dải nhịp kéo dài (Long Lead II), xung chuẩn độ 1mV, cùng đầy đủ tiêu đề thông tin hành chính bệnh nhân, thông số máy (25mm/s, 10mm/mV, bộ lọc) và thông số tự động đo (HR, PR, QRS, QT/QTc Bazett, trục P-QRS-T, kết luận chẩn đoán máy) giống hệt tờ giấy in điện tim ngoài đời thực.

## Tech Stack
- Frontend: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Canvas 60 FPS
- Image Engine: High-resolution real ultrasound asset pipeline, DICOM-style canvas windowing
- ECG Print Engine: Canvas/SVG Pink Grid Paper renderer, Bazett QTc calculator, 12-lead matrix
- Database: Better-SQLite3 WAL (`data/medsim.db`) - lưu trữ động toàn bộ 10 chương Atlas siêu âm

## Phases

| Phase | Name | Status | Progress |
|-------|------|--------|----------|
| 01 | Ingestion & Storage: Tích Hợp Kho Ảnh Thật Viable Ultrasound Vào SQLite | ⬜ Pending | 0% |
| 02 | Realistic Pink ECG Paper: Giấy Kẻ Điện Tim Màu Hồng 12 Đạo Trình Chuẩn | ⬜ Pending | 0% |
| 03 | Real Ultrasound Workstation: Bộ Mô Phỏng Siêu Âm Đầu Dò 3D Gắn Ảnh Thật | ⬜ Pending | 0% |
| 04 | Integration: Tích Hợp Vào Buồng Cấp Cứu Module 3 & Ca Bệnh Lâm Sàng | ⬜ Pending | 0% |
| 05 | Verification, Export/Print & Testing | ⬜ Pending | 0% |

## Asset Summary
- Nguồn hình ảnh siêu âm: `D:\Apps\Portable\Viable_Abdominal_Ultrasound_CD\Viable_Abdominal_Ultrasound_CD\IMAGE` (1,245 file ảnh JPG/GIF)
- Nguồn video siêu âm: `D:\Apps\Portable\Viable_Abdominal_Ultrasound_CD\Viable_Abdominal_Ultrasound_CD\MOVIE` (11 file MPG)
- Nguồn cấu trúc bệnh học: `web/src/data/chapters.js` (9 cơ quan, 49 chuyên đề, 319 ca bệnh được map chuẩn)

## Quick Commands
- Bắt đầu: Xem qua các phase bên dưới và duyệt thực thi
