---
title: RealisticPinkEcgPaper / Canvas RR Caliper Engine - VISUAL_CALIPER_BADGE_DUPLICATION_AND_LEADER_OVERFLOW Pattern
type: pattern
slug: realisticpinkecgpaper-canvas-rr-caliper-engine-visual-caliper-badge-duplication-and-leader-overflow-pattern
category: patterns
created: 2026-10-23T07:44:09
updated: 2026-10-23T07:44:09
status: active
source: /debug
tags: ["RealisticPinkEcgPaper / Canvas RR Caliper Engine", "VISUAL_CALIPER_BADGE_DUPLICATION_AND_LEADER_OVERFLOW", "auto-generated"]
---

# RealisticPinkEcgPaper / Canvas RR Caliper Engine - VISUAL_CALIPER_BADGE_DUPLICATION_AND_LEADER_OVERFLOW Pattern

> [!WARNING]
> **Origin:** `ERR_0004`
> **Module:** `RealisticPinkEcgPaper / Canvas RR Caliper Engine` | **Type:** `VISUAL_CALIPER_BADGE_DUPLICATION_AND_LEADER_OVERFLOW`

## 🚨 The Issue

**Message:** 
```text
Ghost mid-air pinpoint dot, leader line, and duplicate comparison badge on rhythm strip
```

**Root Cause:** 
1) RR_COMPARISON_BADGE lacked isComparisonBadge flag in RenderItem, causing canvas renderer to treat it as standard wave annotation and draw an extraneous pinpoint dot in mid-air with a dashed vertical leader line; 2) Legacy comparison badge block at lines 2142-2180 remained after M19/M20 unification, causing duplicate badge rendering with 6px vertical offset on rhythm strip for all non-Mobitz 1 rhythms.

## 🛠️ The Fix

1) Added isComparisonBadge to RenderItem interface; 2) Added dedicated renderer branch in itemsToRender loop rendering clean centered header pill with no leader line and no mid-air pinpoint dot; 3) Removed legacy duplicate badge drawing block at lines 2142-2180; 4) Updated tests to guard against regressions.

**Files Affected:**
- `src/components/simulators/ecg/RealisticPinkEcgPaper.tsx`
- `tests/physical_wave_peak_caliper.test.js`

## 🛡️ Prevention

> [!TIP]
> - Check for similar issues in `RealisticPinkEcgPaper / Canvas RR Caliper Engine` module
> - Add test case to prevent regression
