# Phase 01: Setup & 3-Module Core Infrastructure

Status: ✅ Complete
Dependencies: None

## Objective
Khởi tạo nền tảng Next.js 14+ (App Router, TypeScript, Tailwind CSS, Zustand, Lucide Icons) và cấu trúc kiến trúc Clean Architecture phục vụ cho **3 Module lớn**:
1. `/academy` - Học tập kiến thức y khoa
2. `/simulators` - Phòng thí nghiệm mô phỏng cận lâm sàng (ECG, Siêu âm, X-quang, CT)
3. `/treatment` - Mô phỏng điều trị lâm sàng (Phòng cấp cứu & Giường bệnh)

## Requirements

### Functional
- [ ] Khởi tạo dự án Next.js 14+ với TypeScript, Tailwind CSS, PostCSS.
- [ ] Thiết lập bảng màu chuyên nghiệp Y khoa:
  - Medical Navy (`#0f172a`), Clinical Slate (`#1e293b`), Surgical Cyan (`#06b6d4`), Monitor Lime (`#22c55e`), Warning Amber (`#f59e0b`), Critical Red (`#ef4444`).
- [ ] Xây dựng Navigation Hub trung tâm tại trang chủ (`/`), cho phép người dùng lựa chọn:
  - Cổng 1: 📚 **Học tập kiến thức** (Academy)
  - Cổng 2: 🔬 **Trải nghiệm mô phỏng cận lâm sàng** (ECG, Siêu âm, X-quang, CT)
  - Cổng 3: 🏥 **Mô phỏng điều trị lâm sàng** (Thực chiến ca bệnh)
- [ ] Cấu hình Zustand store cho Session, User Profile, Level Bác sĩ và Âm thanh thiết bị y tế.

### Non-Functional
- [ ] Tuân thủ Clean Architecture: Tách biệt rõ `domain/`, `use_cases/`, `infrastructure/`, `components/`, `data/`.
- [ ] Giao diện Responsive hoàn hảo trên Desktop và Tablet.

## Implementation Steps
1. [ ] Cấu hình `package.json`, `tsconfig.json`, `tailwind.config.js`.
2. [ ] Thiết lập Root Layout (`src/app/layout.tsx`) với Header y tế (Doctor Badge, XP Bar, Audio Mute toggle).
3. [ ] Xây dựng Trang chủ Portal (`src/app/page.tsx`) với 3 Module cards sống động.
4. [ ] Tạo Zustand store cài đặt (`src/store/gameSettingsStore.ts`).

## Files to Create/Modify
- `package.json`
- `tsconfig.json`
- `tailwind.config.js`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/layout/HospitalNavbar.tsx`
- `src/store/gameSettingsStore.ts`

## Test Criteria
- [ ] Khởi động dev server thành công không có lỗi type.
- [ ] Trang chủ hiển thị 3 cổng Module rõ ràng, điều hướng mượt mà.

---
Next Phase: [Phase 02 - Module 1: Medical Academy](file:///d:/Downloads/Archives/GameYhoc/plans/261021-1846-medical-simulation-game/phase-02-database.md)
