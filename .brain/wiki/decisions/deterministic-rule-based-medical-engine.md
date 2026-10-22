---
title: Deterministic Rule-Based Medical Engine
type: decision
slug: deterministic-rule-based-medical-engine
category: decisions
created: 2026-10-21T18:48:52
updated: 2026-10-21T18:48:52
status: active
source: /plan
tags: ["architecture", "decision", "medical-engine", "safety"]
---

# Deterministic Rule-Based Medical Engine

Context: Y khoa doi hoi tinh chinh xac tuyet doi ve phac do, chong chi dinh, lieu luong va sinh ly benh hoc. Rationale: Su dung Deterministic Rule-Based Engine dam bao 100% tinh on dinh, khong bi hallucination, khong phu thuoc vao API Key ngoai hay mang Internet, cho phep nguoi hoc tiep can chuan kien thuc Y khoa cua Bo Y Te va Quoc Te (AHA, GINA, Harrison). Alternatives: AI LLM sandbox (co nguy co ao giac kien thuc y khoa nguy hiem, chi phi API cao). Impact: Kiem thu unit test de dang, tin cay cao va tai su dung lau dai.
