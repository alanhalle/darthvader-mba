CREATE TABLE IF NOT EXISTS nominations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL,
  citation TEXT NOT NULL,
  nominator_name TEXT,
  stripe_session_id TEXT,
  status TEXT DEFAULT 'approved',
  created_at TEXT DEFAULT (datetime('now'))
);
