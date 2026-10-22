---
title: NextJS and Zustand Architecture for Medical Simulation
type: decision
slug: nextjs-and-zustand-architecture-for-medical-simulation
category: decisions
created: 2026-10-21T18:48:45
updated: 2026-10-21T18:48:45
status: active
source: /plan
tags: ["architecture", "decision", "nextjs", "zustand"]
---

# NextJS and Zustand Architecture for Medical Simulation

Context: Can xay dung mot Web App mo phong hoc tap y khoa tuong tac cao voi ECG song dong va trang thai benh nhan thay doi theo thoi gian. Rationale: Next.js 14 App Router ket hop cung Tailwind CSS va Zustand cho phep quan ly state benh nhan cuc ky nhanh, toi uu 60 FPS cho canvas ECG monitor ma khong bi re-render thua. Alternatives: Pure React Vite (thieu he thong routing va server actions mo rong sau nay), Python FastAPI (phuc tap hon khi deploy va can 2 servers). Impact: Codebase dong nhat TypeScript, de dang trien khai va dong goi.
