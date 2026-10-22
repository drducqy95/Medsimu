---
title: Three-Module Medical Learning and Simulation Architecture
type: decision
slug: three-module-medical-learning-and-simulation-architecture
category: decisions
created: 2026-10-21T19:21:58
updated: 2026-10-21T19:21:58
status: active
source: /plan
tags: ["architecture", "3-modules", "simulation", "paraclinical"]
---

# Three-Module Medical Learning and Simulation Architecture

Context: Yeu cau he thong phai phan tach ro rang 3 module: Hoc tap kien thuc, Trai nghiem mo phong can lam sang (ECG, Sieu am, X-quang, CT - uu tien lam truoc), va Mo phong dieu tri lam sang. Rationale: Viec tach Module 2 thanh phong thiet bi ao (Diagnostic Lab) giup nguoi hoc luyen tap doc lap ky nang doc dien tim, cam dau do sieu am, soi X-quang va cuon lat cat CT truoc khi buoc vao phong cap cuu Module 3. Khi sang Module 3, cac thiet bi cua Module 2 duoc tai su dung truc tiep ngay tai giuong benh nhan, giup trai nghiem dong nhat va cuc ky chuyen nghiep. Impact: Codebase module hoa cao, de dang mo rong them ca benh va thiet bi moi ma khong gay anh huong cheo.
