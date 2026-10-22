const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "medsim.db");
const SOURCE_CHAPTERS_PATH = "D:\\Apps\\Portable\\Viable_Abdominal_Ultrasound_CD\\Viable_Abdominal_Ultrasound_CD\\web\\src\\data\\chapters.js";

console.log("🫀 Seeding Ultrasound Atlas from CD into SQLite at:", DB_PATH);

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS ultrasound_atlas (
    id TEXT PRIMARY KEY,
    number INTEGER NOT NULL,
    title TEXT NOT NULL,
    title_en TEXT NOT NULL,
    icon TEXT NOT NULL,
    color TEXT NOT NULL,
    topics_json TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Load chapters from source
const { chapters } = require(SOURCE_CHAPTERS_PATH);

const stmt = db.prepare(`
  INSERT INTO ultrasound_atlas (id, number, title, title_en, icon, color, topics_json)
  VALUES (?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    number=excluded.number,
    title=excluded.title,
    title_en=excluded.title_en,
    icon=excluded.icon,
    color=excluded.color,
    topics_json=excluded.topics_json
`);

let totalTopics = 0;
let totalImages = 0;

for (const c of chapters) {
  stmt.run(
    c.id,
    c.number,
    c.title,
    c.titleEn || c.title,
    c.icon || "🩺",
    c.color || "#0d9488",
    JSON.stringify(c.topics || [])
  );

  const imgCount = (c.topics || []).reduce((sum, t) => sum + (t.images ? t.images.length : 0), 0);
  totalTopics += (c.topics || []).length;
  totalImages += imgCount;

  console.log(`✅ Seeded Chapter ${c.number}: ${c.title} (${(c.topics || []).length} topics, ${imgCount} real images)`);
}

console.log(`🎉 Successfully seeded ${chapters.length} chapters, ${totalTopics} clinical topics, and ${totalImages} real ultrasound images into SQLite!`);

db.close();
