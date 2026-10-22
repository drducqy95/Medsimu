---
title: Gaussian Pulse ECG Synthesis and Digital Calipers Engine
type: decision
slug: gaussian-pulse-ecg-synthesis-and-digital-calipers-engine
category: decisions
created: 2026-10-21T19:25:25
updated: 2026-10-21T19:25:25
status: active
source: /plan
tags: ["ecg", "math-synthesis", "calipers", "cardiology"]
---

# Gaussian Pulse ECG Synthesis and Digital Calipers Engine

Context: Can xay dung may mo phong dien tam do chay thoi gian thuc 60 FPS voi 15+ nhip benh ly va thuoc do calipers chinh xac. Rationale: Mo hinh hoa song P-QRS-T bang chuoi ham Gaussian V(t) = sum A_i * exp(-(t - mu_i)^2 / (2 * sigma_i^2)) cho phep tuy bien bien do, thoi gian, ST chen len/xuong va song T nhon mot cach toan hoc chinh xac tuyet doi. Luoi giay tieu chuan 25mm/s va 10mm/mV. Calipers dien tu keo tha tu dong tinh QTc theo cong thuc Bazett. Impact: Tin hieu dien tim muot ma 60 FPS, khong ton dung luong luu video/audio, de dang mo phong moi benh ly tim mach.
