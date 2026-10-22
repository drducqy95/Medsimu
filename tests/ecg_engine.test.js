const test = require("node:test");
const assert = require("node:assert");

// Test Bazett QTc Formula: QTc = QT / sqrt(RR)
function calculateBazettQTc(qtIntervalMs, heartRateBpm) {
  if (heartRateBpm <= 0) return 0;
  const rrIntervalSeconds = 60 / heartRateBpm;
  return Math.round(qtIntervalMs / Math.sqrt(rrIntervalSeconds));
}

// Test Gaussian ECG wave equation V(t)
function calculateGaussianBeat(phase, isStemi) {
  let v = 0;
  // P wave
  if (phase > 0.1 && phase < 0.22) {
    v = -Math.sin(((phase - 0.1) / 0.12) * Math.PI) * 0.2;
  }
  // R peak
  else if (phase >= 0.38 && phase < 0.44) {
    v = -Math.sin(((phase - 0.38) / 0.06) * Math.PI) * 1.5;
  }
  // ST elevation
  else if (phase >= 0.48 && phase < 0.62) {
    v = isStemi ? -0.4 : 0.0;
  }
  return v;
}

test("Bazett QTc calculation matches clinical standards", () => {
  // At 60 bpm, RR = 1.0s, QTc should equal QT
  const qtcNormal = calculateBazettQTc(400, 60);
  assert.strictEqual(qtcNormal, 400);

  // At 100 bpm, RR = 0.6s, QTc should be prolonged relative to QT
  const qtcTachy = calculateBazettQTc(360, 100);
  assert.ok(qtcTachy > 360, "QTc must be corrected upwards when heart rate is fast");
  assert.strictEqual(qtcTachy, 465); // 360 / sqrt(0.6) = 464.75 -> 465
});

test("Gaussian ECG synthesis renders distinct STEMI vs Normal waveforms", () => {
  const normalST = calculateGaussianBeat(0.55, false);
  const stemiST = calculateGaussianBeat(0.55, true);

  assert.strictEqual(normalST, 0.0, "Normal ST segment must be isoelectric");
  assert.strictEqual(stemiST, -0.4, "STEMI ST segment must exhibit elevation");
});
