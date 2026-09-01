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
  is_ai INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS nominations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL,
  citation TEXT NOT NULL,
  nominator_name TEXT,
  stripe_session_id TEXT,
  status TEXT DEFAULT 'approved',
  is_ai INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Founding class (Admissions-Committee curated; citations at observable-fact standard)
INSERT OR IGNORE INTO nominees (slug, name, citation, total_votes) VALUES
  ('amazon', 'Amazon', 'Amazon sold Echo devices that worked with IFTTT, letting people automate their homes. In 2023 Amazon shut the integration down. The automations people built stopped working, and the devices bought to run them were not refunded.', 0),
  ('tesla', 'Tesla', 'Tesla has remotely disabled Autopilot and Full Self-Driving on used cars after they were resold — software the first owner paid thousands of dollars for. The second owner is told the features they saw advertised do not transfer.', 0),
  ('adobe', 'Adobe', 'In 2022 Pantone color books stopped working in Photoshop, Illustrator, and InDesign. Files that used those colors displayed them as black until the user paid for a separate monthly Pantone subscription. The files had already been made.', 0),
  ('john-deere', 'John Deere', 'John Deere equipment needs the company''s proprietary software tools to finish many repairs. Farmers cannot fully fix tractors they own without going through an authorized dealer. The 2023 right-to-repair agreement Deere signed is voluntary and unenforceable.', 0),
  ('ticketmaster', 'Ticketmaster', 'Ticketmaster shows a ticket price, then adds service, facility, and order-processing fees at checkout. Its dynamic pricing raises the listed price while you shop. The amount you actually pay is decided after you have committed to the seats.', 0),
  ('google', 'Google', 'An Android update rebound the hardware power button to open Gemini. The button that switched the phone off now launches an assistant, and the power menu moved. The same update turned airplane mode on, with no notice it had changed. The phone was sold with a power button that turned the phone off.', 0),
  ('hp', 'HP', 'HP printers receive "Dynamic Security" firmware updates that make them reject third-party ink and toner. Cartridges that printed before the update stop working after it. HP has paid to settle several lawsuits over the practice and still ships it.', 0),
  ('sonos', 'Sonos', 'A mandatory Sonos app update in May 2024 removed local library search, sleep timers, reliable alarms, and accessibility features from speakers people already owned. The previous app could not be reinstalled. Sonos later apologized and restored some features over months.', 0),
  ('roku', 'Roku', 'In 2024 Roku TVs and streaming players showed new legal terms on screen and stopped working until the owner tapped to accept. The terms removed the right to sue and to join a class action. There was no option to decline and keep using the device.', 0);
