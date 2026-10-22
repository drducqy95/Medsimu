const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");

test("Phase 01: Mobile Bottom Navigation & Safe Area Architecture Integrity", () => {
  const bottomNavPath = path.join(__dirname, "../src/components/layout/MobileBottomNav.tsx");
  assert.ok(fs.existsSync(bottomNavPath), "MobileBottomNav.tsx must exist");
  const bottomNavContent = fs.readFileSync(bottomNavPath, "utf-8");

  // Must have 'use client'
  assert.ok(bottomNavContent.startsWith('"use client";') || bottomNavContent.startsWith("'use client';"), "MobileBottomNav must be a Client Component");

  // Must contain all 4 primary module routes
  assert.ok(bottomNavContent.includes('href: "/"'), "Must link to Home /");
  assert.ok(bottomNavContent.includes('href: "/academy"'), "Must link to Academy /academy");
  assert.ok(bottomNavContent.includes('href: "/simulators"'), "Must link to Simulators /simulators");
  assert.ok(bottomNavContent.includes('href: "/treatment"'), "Must link to Treatment /treatment");

  // Must have fixed bottom and md:hidden
  assert.ok(bottomNavContent.includes("fixed bottom-0") && bottomNavContent.includes("md:hidden"), "Must be sticky at mobile bottom and hidden on desktop");

  // Check Root Layout integration
  const layoutPath = path.join(__dirname, "../src/app/layout.tsx");
  const layoutContent = fs.readFileSync(layoutPath, "utf-8");
  assert.ok(layoutContent.includes("MobileBottomNav"), "Root layout must import and render MobileBottomNav");
  assert.ok(layoutContent.includes("viewportFit: \"cover\""), "Root layout viewport must have viewportFit cover for notch support");
});

test("Phase 02: ECG Dedicated Portrait Mode & Lead Focus Zoom Integrity", () => {
  const pinkPaperPath = path.join(__dirname, "../src/components/simulators/ecg/RealisticPinkEcgPaper.tsx");
  assert.ok(fs.existsSync(pinkPaperPath), "RealisticPinkEcgPaper.tsx must exist");
  const pinkPaperContent = fs.readFileSync(pinkPaperPath, "utf-8");

  // Must support both A4 and Portrait display modes
  assert.ok(pinkPaperContent.includes('displayMode, setDisplayMode'), "Must maintain displayMode state");
  assert.ok(pinkPaperContent.includes('portraitMatrixLeads'), "Must define 6x2 portrait matrix leads");
  assert.ok(pinkPaperContent.includes('a4MatrixLeads'), "Must define 3x4 A4 matrix leads");

  // Verify all 12 unique standard leads in portrait layout
  const standardLeads = ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
  standardLeads.forEach((lead) => {
    assert.ok(pinkPaperContent.includes(`id: "${lead}"`), `Portrait layout must include lead ${lead}`);
  });

  // Verify Lead Focus Modal exists and is wired
  const focusModalPath = path.join(__dirname, "../src/components/simulators/ecg/EcgLeadFocusModal.tsx");
  assert.ok(fs.existsSync(focusModalPath), "EcgLeadFocusModal.tsx must exist");
  assert.ok(pinkPaperContent.includes("EcgLeadFocusModal"), "RealisticPinkEcgPaper must import EcgLeadFocusModal");
});

test("Phase 03 & 04: Emergency Rescue Code Blue Sticky Action & Telemetry Portrait Grid", () => {
  const bayPath = path.join(__dirname, "../src/app/treatment/[caseId]/ResuscitationBayClient.tsx");
  const bayContent = fs.readFileSync(bayPath, "utf-8");

  // Must render sticky floating rescue button when Code Blue triggers
  assert.ok(bayContent.includes("fixed bottom-16 sm:bottom-6"), "Must render sticky floating Code Blue rescue bar");
  assert.ok(bayContent.includes("handleEmergencyDefibrillation"), "Sticky rescue bar must wire defibrillation handler");

  // Telemetry Monitor grid responsiveness
  const monitorPath = path.join(__dirname, "../src/components/treatment/BedsideMonitor.tsx");
  const monitorContent = fs.readFileSync(monitorPath, "utf-8");
  assert.ok(monitorContent.includes("grid-cols-2 sm:grid-cols-4 md:grid-cols-2"), "Bedside monitor must have responsive grid columns for portrait view");
});

test("Phase 05: Medical Academy Quick Lesson Switcher on Portrait Screens", () => {
  const lessonViewerPath = path.join(__dirname, "../src/components/academy/LessonViewer.tsx");
  const lessonViewerContent = fs.readFileSync(lessonViewerPath, "utf-8");

  // Must have mobile quick lesson switcher
  assert.ok(lessonViewerContent.includes("isMobileListOpen"), "Must have mobile drawer/dropdown state for quick lesson switching");
  assert.ok(lessonViewerContent.includes("lg:hidden flex items-center justify-between"), "Must render mobile quick switcher header");
  assert.ok(lessonViewerContent.includes("Đổi bài học"), "Must render quick switch button");
});
