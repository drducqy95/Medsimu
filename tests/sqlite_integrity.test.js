const test = require("node:test");
const assert = require("node:assert");
const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "medsim.db");

test("SQLite database contains all 5 critical tables and healthy data records", () => {
  const db = new Database(DB_PATH, { readonly: true });

  // 1. Lessons
  const lessonCount = db.prepare("SELECT COUNT(*) as count FROM lessons").get().count;
  assert.ok(lessonCount >= 6, `Expected at least 6 clinical lessons in SQLite, got ${lessonCount}`);

  // 2. Drugs
  const drugCount = db.prepare("SELECT COUNT(*) as count FROM drugs").get().count;
  assert.ok(drugCount >= 10, `Expected at least 10 emergency drugs in SQLite, got ${drugCount}`);

  // 3. Quizzes
  const quizCount = db.prepare("SELECT COUNT(*) as count FROM quizzes").get().count;
  assert.ok(quizCount >= 4, `Expected at least 4 quizzes in SQLite, got ${quizCount}`);

  // 4. Flashcards
  const flashcardCount = db.prepare("SELECT COUNT(*) as count FROM flashcards").get().count;
  assert.ok(flashcardCount >= 5, `Expected at least 5 flashcards in SQLite, got ${flashcardCount}`);

  // 5. Clinical Cases
  const caseCount = db.prepare("SELECT COUNT(*) as count FROM clinical_cases").get().count;
  assert.ok(caseCount >= 5, `Expected at least 5 clinical cases in SQLite, got ${caseCount}`);

  // Verify specific case query
  const stemiCase = db.prepare("SELECT * FROM clinical_cases WHERE id = 'case-inferior-stemi-rv'").get();
  assert.ok(stemiCase, "Case 'case-inferior-stemi-rv' must exist in SQLite");
  const profile = JSON.parse(stemiCase.patient_profile_json);
  assert.strictEqual(profile.name, "Nguyễn Văn Hải");

  db.close();
});
