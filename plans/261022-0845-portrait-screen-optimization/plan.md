# Plan: Phân Tích & Tối Ưu Hóa Toàn Diện Cho Màn Hình Dọc (Portrait Screen Optimization)

Created: 2026-10-22T08:45:00+07:00
Status: 🟢 COMPLETED (100% Tested & Verified)
Author: Trinity Architect & System Kernel
Milestone Tracking: Milestone M5 in `project_progress.json`

---

## 1. Executive Summary & Vibe Analysis

### 1.1. Bối cảnh & Yêu cầu của Bác Sĩ (Vibe Capture)
Người dùng yêu cầu: **"Phân tích, tối ưu hiển thị cho màn hình dọc"**.
Trong môi trường thực tế, các bác sĩ nội trú, sinh viên y khoa và nhân viên cấp cứu thường sử dụng smartphone (iPhone, Samsung) hoặc máy tính bảng ở tư thế cầm dọc bằng 1 tay khi đi buồng bệnh hoặc trực cấp cứu.

### 1.2. Thách thức cốt lõi của Game Y Học trên Màn hình Dọc
1. **Tỷ lệ khung hình hẹp (360px - 428px)**:
   - Bản in điện tim 12 cần (`RealisticPinkEcgPaper`) vốn được thiết kế theo khổ giấy ngang A4 (tỉ lệ 3:2 hoặc 16:9). Trên màn hình dọc, canvas bị ép hoặc phải cuộn ngang (`min-w-[900px]`), khiến bác sĩ khó quan sát tổng thể.
2. **Khu vực thao tác ngón cái (Thumb Zone)**:
   - Các nút điều hướng và chuyển module nằm ở đỉnh màn hình (`HospitalNavbar`), khiến ngón tay cái rất khó với tới khi cầm điện thoại một tay.
3. **Màn hình theo dõi Telemetry & Thiết bị Cận lâm sàng**:
   - Màn hình monitor 12 cột, máy siêu âm 3D, máy CT đa lát cắt cần được bố cục lại: Hình ảnh chuẩn đoán ở nửa trên (Center Stage), công cụ tương tác ở nửa dưới (Thumb Control Deck).
4. **Giáo trình Viện Hàn Lâm (Academy)**:
   - Bố cục 2 cột (Danh sách bài học bên trái, Nội dung bên phải) trên màn hình dọc bị xếp chồng, buộc người dùng cuộn qua danh sách dài mới đọc được nội dung bài học.

---

## 2. Tech Stack & Responsive Standards

- **Framework**: Next.js 14+ (App Router), React 18, TypeScript 5.x
- **Styling**: Tailwind CSS với Mobile-First Architecture, Dynamic Viewport Units (`100dvh`), Safe-Area Insets (`pb-safe`)
- **Graphics & Synthesis**: HTML5 Canvas 2D Context, Bézier/Gaussian Waveform Generators
- **State & Storage**: Zustand Stores (`userCareerStore`, `gameSettingsStore`), SQLite (`medsim.db`)
- **Target Viewports**:
  - Compact Mobile Portrait: `360px - 390px` (iPhone SE, Galaxy S-series, Pixel)
  - Standard Mobile Portrait: `393px - 430px` (iPhone 14/15/16 Pro / Pro Max)
  - Tablet Portrait: `768px - 834px` (iPad Mini / Air portrait)

---

## 3. Detailed Phase Breakdown

| Phase | Tên Giai Đoạn | Mục Tiêu Chính | Trạng Thái | Tiến Độ |
|:-----:|:--------------|:---------------|:----------:|:-------:|
| **01** | [Kiến Trúc Màn Hình Dọc & Thanh Điều Hướng Đáy](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0845-portrait-screen-optimization/phase-01-analysis-and-mobile-framework.md) | Thêm Mobile Bottom App Bar, xử lý Thumb Zone & Safe Area Insets | ✅ Complete | 100% |
| **02** | [Chế Độ Điện Tim Màn Hình Dọc Chuyên Dụng](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0845-portrait-screen-optimization/phase-02-ecg-portrait-mode.md) | Bổ sung Portrait Lead Mode, Lead Focus Zoom & Virtual Landscape | ✅ Complete | 100% |
| **03** | [Tối Ưu Monitor Sinh Hiệu & Cận Lâm Sàng Dọc](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0845-portrait-screen-optimization/phase-03-telemetry-and-simulators-portrait.md) | Xếp chồng tối ưu Telemetry, Siêu âm 3D, CT Scrubber trên mobile | ✅ Complete | 100% |
| **04** | [Tối Ưu Quy Trình Cấp Cứu Buồng Hồi Sức Dọc](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0845-portrait-screen-optimization/phase-04-treatment-er-portrait-ux.md) | 5 bước lâm sàng dạng Segmented Tab & Sticky Code Blue Button | ✅ Complete | 100% |
| **05** | [Tối Ưu Viện Hàn Lâm & Dược Thư Cho Màn Hình Dọc](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0845-portrait-screen-optimization/phase-05-academy-and-responsive-navigation.md) | Dropdown Drawer chọn bài nhanh, Flashcard & Quiz chuẩn 100dvh | ✅ Complete | 100% |
| **06** | [Kiểm Thử Tự Động & Xác Thực Quy Chuẩn Y Khoa](file:///d:/Downloads/Archives/GameYhoc/plans/261022-0845-portrait-screen-optimization/phase-06-verification-and-testing.md) | Bộ test tự động kiểm tra responsive, compile 0 lỗi & push GitHub | ✅ Complete | 100% |

---

## 4. Quick Execution Commands (Dành cho Phase 2)

- Phê duyệt & bắt đầu Phase 1: Gõ `/code` hoặc xác nhận để thực thi.
- Lưu tiến trình Second Brain: `/save-brain`
- Kiểm tra trạng thái: `/next`
