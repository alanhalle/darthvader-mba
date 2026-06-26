CREATE TABLE IF NOT EXISTS nominees (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  citation TEXT NOT NULL,
  total_votes INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nominee_slug TEXT NOT NULL,
  pack_size INTEGER NOT NULL,
  price_cents INTEGER NOT NULL,
  display_name TEXT,
  display_city TEXT,
  stripe_session_id TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS nominations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL,
  citation TEXT NOT NULL,
  nominator_name TEXT,
  stripe_session_id TEXT,
  status TEXT DEFAULT 'approved',
  created_at TEXT DEFAULT (datetime('now'))
);

-- Founding class
INSERT OR IGNORE INTO nominees (slug, name, citation, total_votes) VALUES
  ('amazon', 'Amazon', 'Sold millions of Alexa devices with IFTTT integration. Killed it without warning, without refund. The Alexa you bought is not the Alexa you have.', 0),
  ('tesla', 'Tesla', 'Sold software upgrades — acceleration boost, enhanced autopilot — for thousands of dollars. Sell the car and those features disappear. Tesla calls this a feature.', 0),
  ('adobe', 'Adobe', 'Remotely altered your Photoshop files. Not the software — your files. Colors deleted from your own work because of a licensing dispute you weren''t party to.', 0),
  ('john-deere', 'John Deere', 'Sells you a tractor you cannot fix. The software is locked. The diagnostic tools belong to them. You bought your equipment. You are renting the right to use it.', 0),
  ('ticketmaster', 'Ticketmaster', 'Dynamic pricing. Hidden fees revealed at checkout. Service fees on top of facility fees on top of order fees. The ticket you saw is not the ticket you paid for.', 0);
