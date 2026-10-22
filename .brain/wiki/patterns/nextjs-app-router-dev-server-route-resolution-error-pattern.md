---
title: Next.js App Router / Dev Server - ROUTE_RESOLUTION_ERROR Pattern
type: pattern
slug: nextjs-app-router-dev-server-route-resolution-error-pattern
category: patterns
created: 2026-10-21T20:43:35
updated: 2026-10-21T20:43:35
status: active
source: /debug
tags: ["Next.js App Router / Dev Server", "ROUTE_RESOLUTION_ERROR", "auto-generated"]
---

# Next.js App Router / Dev Server - ROUTE_RESOLUTION_ERROR Pattern

> [!WARNING]
> **Origin:** `ERR_0002`
> **Module:** `Next.js App Router / Dev Server` | **Type:** `ROUTE_RESOLUTION_ERROR`

## 🚨 The Issue

**Message:** 
```text
GET /sw.js 500 Internal Server Error
```

**Root Cause:** 
Trinh duyet luu Service Worker cu tu du an khac tren localhost:3000 yeu cau /sw.js khong ton tai; ket hop voi webpack cache .next bi loi chunk sau khi chay npm run build trong luc dev server dang mo dan den not-found rot vao 500 Cannot find module

## 🛠️ The Fix

1. Tao public/sw.js xu ly lifecycle tu dong unregister va xoa cache ton du cua trinh duyet; 2. Tao src/app/not-found.tsx render 404 chuan thay vi fall-back chunk loi; 3. Khoi dong lai dev server Next.js.

**Files Affected:**
- `public/sw.js`
- `src/app/not-found.tsx`

## 🛡️ Prevention

> [!TIP]
> - Check for similar issues in `Next.js App Router / Dev Server` module
> - Add test case to prevent regression
