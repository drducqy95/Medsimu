---
title: HospitalNavbar - NextJsClientComponentError Pattern
type: pattern
slug: hospitalnavbar-nextjsclientcomponenterror-pattern
category: patterns
created: 2026-10-21T20:18:51
updated: 2026-10-21T20:18:51
status: active
source: /debug
tags: ["HospitalNavbar", "NextJsClientComponentError", "auto-generated"]
---

# HospitalNavbar - NextJsClientComponentError Pattern

> [!WARNING]
> **Origin:** `ERR_0001`
> **Module:** `HospitalNavbar` | **Type:** `NextJsClientComponentError`

## 🚨 The Issue

**Message:** 
```text
You're importing a component that needs useState in Server Component
```

**Root Cause:** 
HospitalNavbar.tsx lacked the 'use client' directive at line 1, causing Next.js App Router to treat it as a Server Component where client hooks (useState, usePathname) are disallowed

## 🛠️ The Fix

Prepended 'use client'; to line 1 of src/components/layout/HospitalNavbar.tsx

**Files Affected:**
- `src/components/layout/HospitalNavbar.tsx`

## 🛡️ Prevention

> [!TIP]
> - Check for similar issues in `HospitalNavbar` module
> - Add test case to prevent regression
