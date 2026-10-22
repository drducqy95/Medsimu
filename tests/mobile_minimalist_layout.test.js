const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("Phase 01 & 02: Waveform-First Layout & Elimination of 3000px Scroll on Mobile", () => {
  const ecgPagePath = path.join(__dirname, "../src/app/simulators/ecg/page.tsx");
  assert.ok(fs.existsSync(ecgPagePath), "ECG page file must exist");
  const content = fs.readFileSync(ecgPagePath, "utf-8");

  // 1. Mobile Micro Header exists
  assert.ok(
    content.includes("MOBILE MICRO HEADER") || content.includes("lg:hidden"),
    "Mobile micro header must be conditionally shown on small screens"
  );

  // 2. Waveform Viewport is rendered before the mobile quick bar
  const viewportPos = content.indexOf("PRIMARY SIMULATOR VIEWPORT");
  const quickBarPos = content.indexOf("MOBILE THUMB QUICK BAR");

  assert.ok(viewportPos > 0, "Primary simulator viewport must exist");
  assert.ok(quickBarPos > viewportPos, "Mobile quick bar must follow immediately after waveform viewport");

  // 3. Pathology catalog is converted to Dropdown List, eliminating bulky 3000px card grid
  assert.ok(
    content.includes("EcgPathologySelectDropdown"),
    "EcgPathologySelectDropdown must be integrated to replace bulky cards"
  );
  assert.ok(
    !content.includes("DESKTOP ONLY: 9 SYSTEMS TABS & 31 RHYTHM CARDS"),
    "31-card rhythm grid and category tabs must be decluttered and replaced by dropdown"
  );
});

test("Phase 02: EcgMobilePathologyDrawer Component & Search Capabilities", () => {
  const drawerPath = path.join(
    __dirname,
    "../src/components/simulators/ecg/EcgMobilePathologyDrawer.tsx"
  );
  assert.ok(fs.existsSync(drawerPath), "EcgMobilePathologyDrawer component must exist");
  const content = fs.readFileSync(drawerPath, "utf-8");

  // Verify slide-up bottom sheet structure
  assert.ok(content.includes("fixed inset-0 z-50"), "Drawer must use full viewport fixed overlay");
  assert.ok(content.includes("rounded-t-3xl"), "Drawer must have rounded top sheet styling");
  assert.ok(content.includes("CLINICAL_SYSTEMS"), "Drawer must use 9 clinical systems");
  assert.ok(content.includes("setSearchTerm"), "Drawer must have instant search capabilities");
  assert.ok(content.includes("onSelectRhythm"), "Drawer must invoke selection handler on rhythm tap");
});

test("Phase 03: EcgMobileSettingsSheet & EcgMobileQuickBar Architecture", () => {
  const settingsPath = path.join(
    __dirname,
    "../src/components/simulators/ecg/EcgMobileSettingsSheet.tsx"
  );
  const quickBarPath = path.join(
    __dirname,
    "../src/components/simulators/ecg/EcgMobileQuickBar.tsx"
  );

  assert.ok(fs.existsSync(settingsPath), "EcgMobileSettingsSheet must exist");
  assert.ok(fs.existsSync(quickBarPath), "EcgMobileQuickBar must exist");

  const settingsContent = fs.readFileSync(settingsPath, "utf-8");
  const quickBarContent = fs.readFileSync(quickBarPath, "utf-8");

  // Settings sheet controls: BPM, sweep speed (25/50), amplitude (5/10/20), calipers
  assert.ok(settingsContent.includes("sweepSpeed"), "Settings sheet must control sweep speed");
  assert.ok(settingsContent.includes("amplitude"), "Settings sheet must control amplitude");
  assert.ok(settingsContent.includes("calipersEnabled"), "Settings sheet must control calipers");

  // Quick bar: Single-thumb actionable bar
  assert.ok(quickBarContent.includes("onOpenPathologyDrawer"), "Quick bar must have pathology drawer trigger");
  assert.ok(quickBarContent.includes("onOpenSettingsSheet"), "Quick bar must have settings sheet trigger");
  assert.ok(quickBarContent.includes("onToggleCalipers"), "Quick bar must have direct 1-tap caliper toggle");
});

test("Phase 04: PatientBedsideView Collapsible Accordion on Mobile", () => {
  const bedsidePath = path.join(
    __dirname,
    "../src/components/treatment/PatientBedsideView.tsx"
  );
  assert.ok(fs.existsSync(bedsidePath), "PatientBedsideView must exist");
  const content = fs.readFileSync(bedsidePath, "utf-8");

  // Collapsible state
  assert.ok(content.includes("isCollapsed"), "PatientBedsideView must have collapsible accordion state");
  assert.ok(
    content.includes("isCollapsed ? \"hidden md:block\" : \"block\""),
    "Patient details must be collapsible on mobile while remaining visible on desktop"
  );
  assert.ok(content.includes("ChevronDown"), "Must render chevron toggle button");
});
