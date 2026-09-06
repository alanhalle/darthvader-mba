import { EmailMessage } from "cloudflare:email";

const CSS = `
  *{margin:0;padding:0;box-sizing:border-box}
  :root{--bg:#1a1a1a;--surface:#242424;--text:#f3eee2;--muted:#cdc6b8;--red:#e05a4d;--red-dim:#8b2020;--gold:#e6c13f;--green:#2ee06f;--green-dim:#1e8449;--border:#303030}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;background:var(--bg);color:var(--text);line-height:1.6}
  a{color:var(--red);text-decoration:none}
  nav{max-width:860px;margin:0 auto;padding:1.25rem 2rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border)}
  .nav-logo{font-family:Georgia,serif;font-size:1rem;color:var(--muted);text-decoration:none}
  a.nav-logo:hover{color:var(--text)}
  .nav-logo span{color:var(--text)}
  .nav-cta{font-size:.82rem;font-weight:600;color:var(--red)}
  .ticker-wrap{max-width:860px;margin:0 auto;background:#111;border-bottom:1px solid var(--border);overflow:hidden;padding:.55rem 2rem}
  .ticker-inner{display:flex;gap:3rem;animation:ticker 30s linear infinite;white-space:nowrap;width:max-content}
  .ticker-inner span{font-size:.78rem;color:var(--muted)}
  .ticker-inner em{font-style:normal;color:var(--text)}
  @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
  main{max-width:860px;margin:0 auto;padding:3rem 2rem 5rem}
  .page-header{display:flex;align-items:center;gap:1rem;margin-bottom:.5rem}
  h1{font-family:Georgia,serif;font-size:2.2rem;font-weight:normal;color:var(--text)}
  .live-badge{display:flex;align-items:center;gap:.4rem;font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--red);padding:.25rem .6rem;border:1px solid var(--red-dim);border-radius:3px}
  .live-dot{width:6px;height:6px;background:var(--red);border-radius:50%;animation:pulse 1.4s ease-in-out infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}
  .page-sub{font-size:.9rem;color:var(--muted);margin-bottom:2.5rem}
  .nominee-list{display:flex;flex-direction:column;gap:1rem}
  .nominee-card{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:1.4rem 1.75rem;display:grid;grid-template-columns:2.5rem 1fr auto;gap:0 1.25rem;align-items:start}
  .nominee-card.rank-1{border-color:#4a3a10;background:#1f1d18}
  .rank{font-size:1.5rem;font-weight:700;color:#7a7264;padding-top:.15rem}
  .rank-1 .rank{color:var(--gold)}
  .nominee-name{font-family:Georgia,serif;font-size:1.35rem;color:var(--text);margin-bottom:.3rem}
  .nominee-citation{font-size:.85rem;color:var(--muted);line-height:1.5;margin-bottom:.85rem;max-width:520px}
  .new-badge{display:inline-block;font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:var(--red);border-radius:3px;padding:.15rem .4rem;margin-left:.5rem;vertical-align:middle;position:relative;top:-2px}
  .vote-bar-wrap{height:4px;background:var(--border);border-radius:2px;overflow:hidden;margin-bottom:.4rem}
  .vote-bar{height:100%;background:var(--red-dim);border-radius:2px}
  .rank-1 .vote-bar{background:var(--gold)}
  .vote-label{font-size:.72rem;color:var(--muted)}
  .nominee-right{display:flex;flex-direction:column;align-items:flex-end;gap:.75rem;padding-top:.1rem}
  .vote-count{font-size:1.6rem;font-weight:700;color:var(--gold);font-variant-numeric:tabular-nums;line-height:1}
  .vote-count-label{font-size:.68rem;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;text-align:right;margin-top:.15rem}
  .vote-pack-group{display:flex;gap:.4rem}
  .btn-vote-pack{font-size:.72rem;font-weight:700;padding:.45rem .7rem;background:transparent;color:var(--green);border:1px solid var(--green-dim);border-radius:4px;white-space:nowrap;line-height:1.3;text-align:center;text-decoration:none;display:inline-block}
  .btn-vote-pack:hover{background:var(--green);color:#fff}
  .bottom-cta{margin-top:3rem;text-align:center;padding-top:2.5rem;border-top:1px solid var(--border)}
  .bottom-cta p{font-size:.9rem;color:var(--muted);margin-bottom:1.25rem}
  .btn-nominate{display:inline-block;font-size:.95rem;font-weight:700;letter-spacing:.03em;padding:.9rem 2.25rem;background:var(--red);color:#fff;border-radius:4px;text-decoration:none}
  footer{max-width:860px;margin:0 auto;padding:2rem;font-size:.82rem;color:var(--muted);border-top:1px solid var(--border)}
  .vote-main{max-width:600px}
  .field{margin-bottom:1.5rem}
  .field label{display:block;font-size:.82rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--muted);margin-bottom:.5rem}
  .nominee-display{padding:.75rem 1rem;background:var(--surface);border:1px solid var(--border);border-radius:4px;font-family:Georgia,serif;font-size:1.1rem}
  .nominee-display .nominee-sub{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;font-size:.82rem;color:var(--muted);margin-top:.25rem}
  .pack-group{display:flex;gap:.75rem}
  .pack-option{flex:1}
  .pack-option input[type=radio]{display:none}
  .pack-option label{display:block;text-align:center;padding:.85rem;background:var(--surface);border:1px solid var(--border);border-radius:4px;cursor:pointer;font-size:.9rem;font-weight:600;color:var(--muted);text-transform:none;letter-spacing:0}
  .pack-option input[type=radio]:checked+label{border-color:var(--green);color:var(--green)}
  .pack-option label:hover{border-color:var(--green-dim);color:var(--green)}
  .pack-price{display:block;font-size:1.2rem;color:var(--gold);font-weight:700}
  .name-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
  input[type=text]{width:100%;padding:.75rem 1rem;background:var(--surface);border:1px solid var(--border);border-radius:4px;color:var(--text);font-size:1rem;font-family:inherit}
  input[type=text]:focus{outline:none;border-color:var(--muted)}
  .optional-note{font-size:.78rem;color:var(--muted);margin-top:.4rem}
  .btn-submit{width:100%;padding:1rem;background:var(--green);color:#fff;border:none;border-radius:4px;font-size:1rem;font-weight:700;cursor:pointer;letter-spacing:.03em;margin-top:1rem}
  .btn-submit:hover{background:var(--green-dim)}
  .back{display:block;text-align:center;margin-top:1.5rem;font-size:.85rem;color:var(--muted)}
  .error-page{max-width:600px;margin:4rem auto;padding:0 2rem;text-align:center}
  .error-page h1{font-family:Georgia,serif;font-size:1.8rem;margin-bottom:1rem}
  textarea{width:100%;padding:.75rem 1rem;background:var(--surface);border:1px solid var(--border);border-radius:4px;color:var(--text);font-size:1rem;font-family:inherit;resize:vertical;min-height:120px}
  textarea:focus{outline:none;border-color:var(--muted)}
  .fee-box{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:1.25rem 1.5rem;margin-bottom:2rem}
  .fee-box p{font-size:.85rem;color:var(--muted);line-height:1.6}
  .fee-box strong{color:var(--text)}
  .char-count{font-size:.72rem;color:var(--muted);text-align:right;margin-top:.3rem}
  .ai-field{display:flex;align-items:center;gap:.6rem}
  .ai-field input[type=checkbox]{width:1.1rem;height:1.1rem;flex-shrink:0}
  .ai-field label{text-transform:none;font-weight:400;letter-spacing:0;margin:0;font-size:.85rem;color:var(--muted)}
  .n-main{max-width:680px}
  .n-citation{font-size:1.15rem;line-height:1.7;color:var(--text);border-left:3px solid var(--red-dim);padding-left:1.25rem;margin:1.5rem 0 2rem}
  .stat-row{display:flex;align-items:baseline;gap:1.5rem;margin-bottom:.5rem}
  .stat-rank{font-size:.85rem;color:var(--muted)}
  .n-actions{margin:2rem 0 0}
  .n-actions .vote-pack-group{gap:.6rem;margin-top:.75rem}
  .n-actions .btn-vote-pack{font-size:.85rem;padding:.7rem 1.2rem}
  .share-box{background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:1.25rem 1.5rem;margin-top:2.5rem}
  .share-box h3{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:.35rem}
  .share-box .hint{font-size:.8rem;color:var(--muted);margin-bottom:.85rem}
  .share-text{width:100%;background:#111;border:1px solid var(--border);border-radius:4px;color:var(--text);font-family:inherit;font-size:.9rem;padding:.75rem 1rem;resize:vertical;min-height:120px;line-height:1.55}
  .btn-copy{margin-top:.75rem;padding:.55rem 1.1rem;background:transparent;color:var(--green);border:1px solid var(--green-dim);border-radius:4px;font-size:.8rem;font-weight:700;cursor:pointer;font-family:inherit}
  .btn-copy:hover{background:var(--green);color:#fff}
`;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function uniqueNomineeSlug(env, name) {
  const baseSlug = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  let slug = baseSlug || 'nominee';
  let suffix = 2;
  while (true) {
    const existing = await env.DB.prepare('SELECT id FROM nominees WHERE slug = ?').bind(slug).first();
    if (!existing) break;
    slug = `${baseSlug}-${suffix++}`;
  }
  return slug;
}

function tickerHtml(recent) {
  const items = recent.length > 0
    ? recent.map(v => {
        const who = v.display_name ? `${escapeHtml(v.display_name)}${v.display_city ? ' in ' + escapeHtml(v.display_city) : ''}` : 'Anon';
        const name = `<em>${who}${v.is_ai ? ' (AI agent)' : ''}</em>`;
        return `<span>${name} just cast <em>${v.pack_size} votes</em> for <em>${escapeHtml(v.nominee_name)}</em></span><span>·</span>`;
      }).join('')
    : '<span>The polls are open. Be the first to vote.</span><span>·</span>';

  const doubled = items + items;
  return `<div class="ticker-wrap"><div class="ticker-inner">${doubled}</div></div>`;
}

function pageShell({ title, nav, ticker = '', body, head = '' }) {
  return `<!doctype html><html lang="en"><head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  ${head}
  <style>${CSS}</style>
</head><body>
  ${nav}
  ${ticker}
  ${body}
  <footer>© 2026 darthvader.mba · <a href="/terms" style="color:inherit">Terms</a></footer>
</body></html>`;
}

async function handleLeaderboard(request, env) {
  const nominees = await env.DB.prepare(
    'SELECT slug, name, citation, total_votes FROM nominees ORDER BY total_votes DESC, id ASC'
  ).all();

  const recent = await env.DB.prepare(`
    SELECT v.pack_size, v.display_name, v.display_city, v.is_ai, n.name as nominee_name
    FROM votes v JOIN nominees n ON v.nominee_slug = n.slug
    ORDER BY v.created_at DESC LIMIT 10
  `).all();

  const maxVotes = (nominees.results[0]?.total_votes) || 1;

  const cards = nominees.results.map((n, i) => {
    const rank = i + 1;
    const barPct = maxVotes > 0 ? Math.round((n.total_votes / maxVotes) * 100) : 0;
    const label = rank === 1 && n.total_votes > 0 ? 'commanding lead'
      : rank === 2 && n.total_votes > 0 ? 'closing the gap'
      : n.total_votes === 0 ? 'no votes yet' : '';
    const isNew = n.total_votes === 0;

    return `
    <div class="nominee-card${rank === 1 ? ' rank-1' : ''}">
      <div class="rank">#${rank}</div>
      <div class="nominee-body">
        <div class="nominee-name"><a href="/n/${encodeURIComponent(n.slug)}" style="color:inherit">${escapeHtml(n.name)}</a>${isNew ? '<span class="new-badge">New</span>' : ''}</div>
        <div class="nominee-citation">"${escapeHtml(n.citation)}"</div>
        <div class="vote-bar-wrap"><div class="vote-bar" style="width:${barPct}%"></div></div>
        <div class="vote-label">${label}</div>
      </div>
      <div class="nominee-right">
        <div>
          <div class="vote-count">${n.total_votes.toLocaleString()}</div>
          <div class="vote-count-label">votes</div>
        </div>
        <div class="vote-pack-group">
          <a href="/vote?nominee=${encodeURIComponent(n.slug)}&pack=5" class="btn-vote-pack">5<br>$5</a>
          <a href="/vote?nominee=${encodeURIComponent(n.slug)}&pack=25" class="btn-vote-pack">25<br>$25</a>
          <a href="/vote?nominee=${encodeURIComponent(n.slug)}&pack=100" class="btn-vote-pack">100<br>$100</a>
        </div>
      </div>
    </div>`;
  }).join('');

  const nav = `<nav>
    <a href="/" class="nav-logo"><span>Darth Vader MBA</span> · darthvader.mba</a>
    <a class="nav-cta" href="/nominate">Nominate a Company →</a>
  </nav>`;

  const body = `<main>
    <div class="page-header">
      <h1>The Leaderboard</h1>
      <div class="live-badge"><div class="live-dot"></div> Live</div>
    </div>
    <p class="page-sub">Ranked by votes. Votes cost real money. Democracy.</p>
    <div class="nominee-list">${cards}</div>
    <div class="bottom-cta">
      <p>Don't see your nominee? Put them on the board.</p>
      <a class="btn-nominate" href="/nominate">Nominate a Company — $20</a>
    </div>
  </main>`;

  const html = pageShell({
    title: 'Leaderboard — Darth Vader MBA',
    nav,
    ticker: tickerHtml(recent.results),
    body,
  });

  // Auto-refresh every 60s
  const withRefresh = html.replace('</head>', '<meta http-equiv="refresh" content="60"></head>');

  return new Response(withRefresh, {
    headers: { 'Content-Type': 'text/html;charset=utf-8' }
  });
}

function firstSentence(text) {
  const m = String(text).match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : String(text)).trim();
}

function notFoundPage(title, message) {
  const nav = `<nav><a href="/" class="nav-logo"><span>Darth Vader MBA</span></a></nav>`;
  const body = `<div class="error-page">
    <h1>${escapeHtml(title)}</h1>
    <p style="color:var(--muted);margin-bottom:1.5rem">${escapeHtml(message)}</p>
    <a href="/leaderboard" class="btn-nominate" style="background:var(--red)">← Back to Leaderboard</a>
  </div>`;
  return new Response(pageShell({ title: `${title} — Darth Vader MBA`, nav, body }), {
    status: 404,
    headers: { 'Content-Type': 'text/html;charset=utf-8' }
  });
}

async function handleNomineePage(request, env) {
  const url = new URL(request.url);
  const slug = decodeURIComponent(url.pathname.replace(/^\/n\//, '').replace(/\/+$/, ''));

  const all = await env.DB.prepare(
    'SELECT slug, name, citation, total_votes FROM nominees ORDER BY total_votes DESC, id ASC'
  ).all();
  const idx = all.results.findIndex(n => n.slug === slug);

  if (idx === -1) {
    return notFoundPage('Nominee not found', "That nominee isn't on the board.");
  }

  const nominee = all.results[idx];
  const rank = idx + 1;
  const total = all.results.length;
  const maxVotes = all.results[0]?.total_votes || 1;
  const barPct = maxVotes > 0 ? Math.round((nominee.total_votes / maxVotes) * 100) : 0;

  const pageUrl = `${url.origin}/n/${encodeURIComponent(nominee.slug)}`;
  const desc = nominee.citation.length > 200
    ? nominee.citation.slice(0, 197) + '…'
    : nominee.citation;
  const ogTitle = `${nominee.name} — Darth Vader MBA`;

  const shareLine = `Congratulations, ${nominee.name}. You've earned your Darth Vader MBA.\n\n${firstSentence(nominee.citation)}\n\n${pageUrl}`;

  const head = `
  <meta name="description" content="${escapeHtml(desc)}">
  <link rel="canonical" href="${escapeHtml(pageUrl)}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="Darth Vader MBA">
  <meta property="og:title" content="${escapeHtml(ogTitle)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:url" content="${escapeHtml(pageUrl)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(ogTitle)}">
  <meta name="twitter:description" content="${escapeHtml(desc)}">`;

  const nav = `<nav>
    <a href="/" class="nav-logo"><span>Darth Vader MBA</span> · darthvader.mba</a>
    <a href="/leaderboard" style="font-size:.82rem;color:var(--muted)">← Leaderboard</a>
  </nav>`;

  const body = `<main class="n-main">
    <div class="page-header">
      <h1>${escapeHtml(nominee.name)}</h1>
    </div>
    <div class="stat-row">
      <span class="stat-rank">Rank #${rank} of ${total}</span>
      <span class="stat-rank">${nominee.total_votes.toLocaleString()} ${nominee.total_votes === 1 ? 'vote' : 'votes'}</span>
    </div>
    <div class="vote-bar-wrap"><div class="vote-bar" style="width:${barPct}%"></div></div>

    <p class="n-citation">${escapeHtml(nominee.citation)}</p>

    <div class="n-actions">
      <p style="font-size:.9rem;color:var(--muted)">$1 per vote. Half of every vote goes to the EFF.</p>
      <div class="vote-pack-group">
        <a href="/vote?nominee=${encodeURIComponent(nominee.slug)}&pack=5" class="btn-vote-pack">5 votes · $5</a>
        <a href="/vote?nominee=${encodeURIComponent(nominee.slug)}&pack=25" class="btn-vote-pack">25 votes · $25</a>
        <a href="/vote?nominee=${encodeURIComponent(nominee.slug)}&pack=100" class="btn-vote-pack">100 votes · $100</a>
      </div>
    </div>

    <div class="share-box">
      <h3>Share this graduate</h3>
      <p class="hint">Copy and post it anywhere.</p>
      <textarea class="share-text" id="shareText" readonly>${escapeHtml(shareLine)}</textarea>
      <button class="btn-copy" id="copyBtn" type="button">Copy</button>
    </div>

    <div class="bottom-cta">
      <p>Know a company that belongs on this board?</p>
      <a class="btn-nominate" href="/nominate">Nominate a Company — $20</a>
    </div>

    <a href="/leaderboard" class="back">← Back to the leaderboard</a>
  </main>

  <script>
    document.getElementById('copyBtn').addEventListener('click', async function () {
      const el = document.getElementById('shareText');
      try {
        await navigator.clipboard.writeText(el.value);
      } catch (err) {
        el.select();
        document.execCommand('copy');
      }
      this.textContent = 'Copied';
      setTimeout(() => { this.textContent = 'Copy'; }, 1800);
    });
  </script>`;

  return new Response(pageShell({ title: ogTitle, nav, body, head }), {
    headers: { 'Content-Type': 'text/html;charset=utf-8' }
  });
}

async function handleSitemap(request, env) {
  const origin = new URL(request.url).origin;
  const nominees = await env.DB.prepare('SELECT slug FROM nominees ORDER BY id ASC').all();

  const urls = [
    `${origin}/`,
    `${origin}/leaderboard`,
    `${origin}/nominate`,
    `${origin}/terms`,
    ...nominees.results.map(n => `${origin}/n/${encodeURIComponent(n.slug)}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${escapeHtml(u)}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml;charset=utf-8' }
  });
}

function handleRobots(request) {
  const origin = new URL(request.url).origin;
  const body = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /checkout
Disallow: /checkout-nominate
Disallow: /webhook/

Sitemap: ${origin}/sitemap.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain;charset=utf-8' } });
}

async function handleVotePage(request, env) {
  const url = new URL(request.url);
  const nomineeSlug = url.searchParams.get('nominee') || '';
  const packParam = url.searchParams.get('pack') || '';

  const nominee = nomineeSlug
    ? await env.DB.prepare('SELECT slug, name, citation FROM nominees WHERE slug = ?').bind(nomineeSlug).first()
    : null;

  if (!nominee) {
    const nav = `<nav><a href="/" class="nav-logo"><span>Darth Vader MBA</span></a></nav>`;
    const body = `<div class="error-page">
      <h1>Nominee not found</h1>
      <p style="color:var(--muted);margin-bottom:1.5rem">That nominee doesn't exist.</p>
      <a href="/leaderboard" class="btn-nominate" style="background:var(--red)">← Back to Leaderboard</a>
    </div>`;
    return new Response(pageShell({ title: 'Not Found — Darth Vader MBA', nav, body }), {
      status: 404,
      headers: { 'Content-Type': 'text/html;charset=utf-8' }
    });
  }

  const packs = [5, 25, 100];

  const packOptions = packs.map(p => {
    const checked = String(p) === packParam ? ' checked' : '';
    return `<div class="pack-option">
      <input type="radio" name="pack" id="pack${p}" value="${p}"${checked}>
      <label for="pack${p}">${p} votes<span class="pack-price">$${p}</span></label>
    </div>`;
  }).join('');

  const nav = `<nav>
    <a href="/" class="nav-logo"><span>Darth Vader MBA</span></a>
    <a href="/leaderboard" style="font-size:.82rem;color:var(--muted)">← Leaderboard</a>
  </nav>`;

  const body = `<main class="vote-main">
    <h1>Cast Your Votes</h1>
    <p class="page-sub" style="margin-top:.5rem">$1 per vote. Votes go to the leaderboard immediately. 50% of proceeds to EFF.</p>

    <form id="voteForm">
      <input type="hidden" name="nominee" value="${escapeHtml(nominee.slug)}">

      <div class="field">
        <label>Voting for</label>
        <div class="nominee-display">
          ${escapeHtml(nominee.name)}
          <div class="nominee-sub">"${escapeHtml(nominee.citation)}"</div>
        </div>
      </div>

      <div class="field">
        <label>Vote Pack</label>
        <div class="pack-group">${packOptions}</div>
      </div>

      <div class="field">
        <label>Display name for the ticker <span style="font-weight:400;text-transform:none;letter-spacing:0">(optional)</span></label>
        <div class="name-row">
          <input type="text" name="display_name" placeholder="Kim" maxlength="40">
          <input type="text" name="display_city" placeholder="Oklahoma City" maxlength="40">
        </div>
        <p class="optional-note">Leave blank to appear as Anon in the ticker.</p>
      </div>

      <div class="field ai-field">
        <input type="checkbox" name="is_ai" id="is_ai" value="1">
        <label for="is_ai">This vote is cast by an AI agent, on behalf of a human payer.</label>
      </div>

      <button type="submit" class="btn-submit">Pay &amp; Vote →</button>
    </form>

    <a href="/leaderboard" class="back">← Back to leaderboard</a>
  </main>

  <script>
    document.getElementById('voteForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const pack = document.querySelector('input[name=pack]:checked')?.value;
      if (!pack) { alert('Please select a vote pack.'); return; }

      const btn = e.target.querySelector('.btn-submit');
      btn.disabled = true;
      btn.textContent = 'Redirecting to payment…';

      const body = new URLSearchParams(new FormData(e.target));
      body.set('pack', pack);

      try {
        const res = await fetch('/checkout', { method: 'POST', body });
        if (res.redirected) { window.location.href = res.url; return; }
        const data = await res.json();
        if (data.url) { window.location.href = data.url; return; }
        throw new Error(data.error || 'Unknown error');
      } catch (err) {
        alert('Payment setup failed: ' + err.message);
        btn.disabled = false;
        btn.textContent = 'Pay & Vote →';
      }
    });
  </script>`;

  return new Response(pageShell({ title: `Vote for ${nominee.name} — Darth Vader MBA`, nav, body }), {
    headers: { 'Content-Type': 'text/html;charset=utf-8' }
  });
}

async function handleCheckout(request, env) {
  if (!env.STRIPE_SECRET_KEY) {
    return new Response(JSON.stringify({ error: 'Stripe not configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  const formData = await request.formData();
  const nomineeSlug = formData.get('nominee') || '';
  const pack = parseInt(formData.get('pack') || '0');
  const displayName = (formData.get('display_name') || '').trim().slice(0, 40);
  const displayCity = (formData.get('display_city') || '').trim().slice(0, 40);
  const isAi = formData.get('is_ai') === '1' ? '1' : '0';

  const validPacks = [5, 25, 100];
  if (!nomineeSlug || !validPacks.includes(pack)) {
    return new Response(JSON.stringify({ error: 'Invalid nominee or pack size' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  const nominee = await env.DB.prepare('SELECT slug, name FROM nominees WHERE slug = ?').bind(nomineeSlug).first();
  if (!nominee) {
    return new Response(JSON.stringify({ error: 'Nominee not found' }), {
      status: 404, headers: { 'Content-Type': 'application/json' }
    });
  }

  const priceCents = pack * 100;
  const origin = new URL(request.url).origin;
  const e = encodeURIComponent;

  const bodyParts = [
    `line_items[0][price_data][currency]=usd`,
    `line_items[0][price_data][product_data][name]=${e(`${pack} votes for ${nominee.name} — Darth Vader MBA`)}`,
    `line_items[0][price_data][unit_amount]=${priceCents}`,
    `line_items[0][quantity]=1`,
    `mode=payment`,
    `success_url=${e(`${origin}/leaderboard`)}`,
    `cancel_url=${e(`${origin}/vote?nominee=${e(nomineeSlug)}&pack=${pack}`)}`,
    `metadata[nominee_slug]=${e(nomineeSlug)}`,
    `metadata[pack_size]=${pack}`,
    `metadata[price_cents]=${priceCents}`,
    `metadata[is_ai]=${isAi}`,
  ];
  if (displayName) bodyParts.push(`metadata[display_name]=${e(displayName)}`);
  if (displayCity) bodyParts.push(`metadata[display_city]=${e(displayCity)}`);

  const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyParts.join('&'),
  });

  const responseText = await stripeRes.text();
  let session;
  try {
    session = JSON.parse(responseText);
  } catch {
    return new Response(JSON.stringify({ error: `Stripe HTTP ${stripeRes.status}: ${responseText.slice(0, 300)}` }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!stripeRes.ok) {
    return new Response(JSON.stringify({ error: `Stripe error: ${session.error?.message}` }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleNominatePage(request, env) {
  const nav = `<nav>
    <a href="/" class="nav-logo"><span>Darth Vader MBA</span></a>
    <a href="/leaderboard" style="font-size:.82rem;color:var(--muted)">← Leaderboard</a>
  </nav>`;

  const body = `<main class="vote-main">
    <h1>Nominate a Company</h1>
    <p class="page-sub" style="margin-top:.5rem">Put a bad actor on the board. They deserve it.</p>

    <div class="fee-box">
      <p><strong>$20 nomination fee.</strong> This keeps the board signal-to-noise. Once approved, your nominee appears on the leaderboard with 0 votes and opens to public voting. We review within 48 hours. <strong>If we reject the nomination, the $20 is refunded in full.</strong> 50% of all proceeds go to the EFF.</p>
    </div>

    <form id="nominateForm">
      <div class="field">
        <label>Company name <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--red)">*</span></label>
        <input type="text" name="company_name" placeholder="Acme Corp" maxlength="80" required>
      </div>

      <div class="field">
        <label>What did they do? <span style="font-weight:400;text-transform:none;letter-spacing:0;color:var(--red)">*</span></label>
        <textarea name="citation" maxlength="400" placeholder="Be specific. One paragraph. The best citations name the product, the broken promise, and the customer left holding it." required></textarea>
        <div class="char-count"><span id="charCount">0</span> / 400</div>
      </div>

      <div class="field">
        <label>Your name <span style="font-weight:400;text-transform:none;letter-spacing:0">(optional — credited when it goes live)</span></label>
        <input type="text" name="nominator_name" placeholder="Kim in Oklahoma City" maxlength="60">
      </div>

      <div class="field ai-field">
        <input type="checkbox" name="is_ai" id="is_ai" value="1">
        <label for="is_ai">This nomination is submitted by an AI agent, on behalf of a human payer.</label>
      </div>

      <button type="submit" class="btn-submit" style="background:var(--red)">Nominate — $20 →</button>
    </form>

    <a href="/leaderboard" class="back">← Back to leaderboard</a>
  </main>

  <script>
    const textarea = document.querySelector('textarea[name=citation]');
    const counter = document.getElementById('charCount');
    textarea.addEventListener('input', () => { counter.textContent = textarea.value.length; });

    document.getElementById('nominateForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const companyName = e.target.company_name.value.trim();
      const citation = e.target.citation.value.trim();
      if (!companyName || !citation) { alert('Company name and citation are required.'); return; }

      const btn = e.target.querySelector('.btn-submit');
      btn.disabled = true;
      btn.textContent = 'Redirecting to payment…';

      try {
        const res = await fetch('/checkout-nominate', {
          method: 'POST',
          body: new URLSearchParams(new FormData(e.target)),
        });
        const data = await res.json();
        if (data.url) { window.location.href = data.url; return; }
        throw new Error(data.error || 'Unknown error');
      } catch (err) {
        alert('Payment setup failed: ' + err.message);
        btn.disabled = false;
        btn.textContent = 'Nominate — $20 →';
      }
    });
  </script>`;

  return new Response(pageShell({ title: 'Nominate a Company — Darth Vader MBA', nav, body }), {
    headers: { 'Content-Type': 'text/html;charset=utf-8' }
  });
}

async function handleCheckoutNominate(request, env) {
  if (!env.STRIPE_SECRET_KEY) {
    return new Response(JSON.stringify({ error: 'Stripe not configured' }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  const formData = await request.formData();
  const companyName = (formData.get('company_name') || '').trim().slice(0, 80);
  const citation = (formData.get('citation') || '').trim().slice(0, 400);
  const nominatorName = (formData.get('nominator_name') || '').trim().slice(0, 60);
  const isAi = formData.get('is_ai') === '1' ? '1' : '0';

  if (!companyName || !citation) {
    return new Response(JSON.stringify({ error: 'Company name and citation are required' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  const origin = new URL(request.url).origin;
  const e = encodeURIComponent;

  const bodyParts = [
    `line_items[0][price_data][currency]=usd`,
    `line_items[0][price_data][product_data][name]=${e(`Nomination: ${companyName} — Darth Vader MBA`)}`,
    `line_items[0][price_data][unit_amount]=2000`,
    `line_items[0][quantity]=1`,
    `mode=payment`,
    `success_url=${e(`${origin}/nominated`)}`,
    `cancel_url=${e(`${origin}/nominate`)}`,
    `metadata[type]=nomination`,
    `metadata[company_name]=${e(companyName)}`,
    `metadata[citation]=${e(citation)}`,
    `metadata[is_ai]=${isAi}`,
  ];
  if (nominatorName) bodyParts.push(`metadata[nominator_name]=${e(nominatorName)}`);

  const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyParts.join('&'),
  });

  const responseText = await stripeRes.text();
  let session;
  try {
    session = JSON.parse(responseText);
  } catch {
    return new Response(JSON.stringify({ error: `Stripe HTTP ${stripeRes.status}: ${responseText.slice(0, 300)}` }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  if (!stripeRes.ok) {
    return new Response(JSON.stringify({ error: `Stripe error: ${session.error?.message}` }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleNominatedPage() {
  const nav = `<nav>
    <a href="/" class="nav-logo"><span>Darth Vader MBA</span></a>
    <a href="/leaderboard" style="font-size:.82rem;color:var(--muted)">← Leaderboard</a>
  </nav>`;

  const body = `<div class="error-page" style="text-align:left;max-width:500px;margin:5rem auto;padding:0 2rem">
    <h1 style="font-family:Georgia,serif;font-size:2rem;margin-bottom:1rem">Nomination received.</h1>
    <p style="color:var(--muted);margin-bottom:.75rem">We'll review it within 48 hours. If approved, it goes on the leaderboard with 0 votes and opens to public voting. If we reject it, your $20 is refunded in full.</p>
    <p style="color:var(--muted);margin-bottom:2rem">Thank you for holding them accountable.</p>
    <a href="/leaderboard" class="btn-nominate" style="background:var(--red)">Back to Leaderboard →</a>
  </div>`;

  return new Response(pageShell({ title: 'Nomination Received — Darth Vader MBA', nav, body }), {
    headers: { 'Content-Type': 'text/html;charset=utf-8' }
  });
}

async function sendNominationAlert(env, n) {
  if (!env.SEND_EMAIL) {
    console.log('webhook: SEND_EMAIL binding not configured, skipping alert');
    return;
  }
  const from = 'alerts@darthvader.mba';
  const to = 'alanhalley@gmail.com';
  const text = [
    'A paid nomination is waiting for review in /admin.',
    '',
    `Company:       ${n.companyName}`,
    `Nominator:     ${n.nominatorName || '(anonymous)'}`,
    `AI-submitted:  ${n.isAi ? 'yes' : 'no'}`,
    `Stripe session: ${n.sessionId || '(none)'}`,
    '',
    'Citation:',
    n.citation,
    '',
    'Review: https://darthvader.mba/admin (append your admin key)',
    'Rejecting a nomination = refund the $20 in the Stripe dashboard.',
  ].join('\r\n');
  const mime = [
    `From: Darth Vader MBA <${from}>`,
    `To: ${to}`,
    `Subject: Nomination pending review: ${n.companyName}`,
    `Message-ID: <${crypto.randomUUID()}@darthvader.mba>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    '',
    text,
  ].join('\r\n');
  try {
    await env.SEND_EMAIL.send(new EmailMessage(from, to, mime));
    console.log(`webhook: nomination alert emailed for ${n.companyName}`);
  } catch (err) {
    console.error(`webhook: nomination alert email failed: ${err.message}`);
  }
}

async function handleStripeWebhook(request, env) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (env.STRIPE_WEBHOOK_SECRET) {
    const valid = await verifyStripeSignature(body, sig, env.STRIPE_WEBHOOK_SECRET);
    if (!valid) {
      return new Response('Invalid signature', { status: 400 });
    }
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch {
    console.error('webhook: invalid JSON body');
    return new Response('Invalid payload', { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return new Response('ok', { status: 200 });
  }

  const session = event.data.object;
  const meta = session.metadata || {};

  try {
    if (meta.type === 'nomination') {
      // Idempotency: Stripe retries deliveries, so skip if already recorded
      const already = await env.DB.prepare('SELECT id FROM nominations WHERE stripe_session_id = ?').bind(session.id).first();
      if (already) {
        console.log(`webhook: nomination ${session.id} already processed, skipping`);
        return new Response('ok', { status: 200 });
      }

      const companyName = meta.company_name;
      const citation = meta.citation;
      const nominatorName = meta.nominator_name || null;
      const isAi = meta.is_ai === '1' ? 1 : 0;

      if (companyName && citation) {
        // Hold for manual review — does NOT hit the leaderboard until approved in /admin
        await env.DB.prepare(
          'INSERT INTO nominations (company_name, citation, nominator_name, stripe_session_id, status, is_ai) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(companyName, citation, nominatorName, session.id, 'pending', isAi).run();
        console.log(`webhook: nomination received for ${companyName} (pending review)`);
        await sendNominationAlert(env, {
          companyName, citation, nominatorName, isAi, sessionId: session.id,
        });
      }
    } else {
      const nomineeSlug = meta.nominee_slug;
      const pack = parseInt(meta.pack_size || '0');
      const priceCents = parseInt(meta.price_cents || '0');
      const displayName = meta.display_name || null;
      const displayCity = meta.display_city || null;
      const isAi = meta.is_ai === '1' ? 1 : 0;

      if (nomineeSlug && pack > 0) {
        // Idempotency: Stripe retries deliveries, so skip if this payment was already recorded
        const already = await env.DB.prepare('SELECT id FROM votes WHERE stripe_session_id = ?').bind(session.id).first();
        if (already) {
          console.log(`webhook: vote ${session.id} already processed, skipping`);
          return new Response('ok', { status: 200 });
        }

        // Insert + tally atomically so they can't drift apart
        await env.DB.batch([
          env.DB.prepare(
            'INSERT INTO votes (nominee_slug, pack_size, price_cents, display_name, display_city, stripe_session_id, is_ai) VALUES (?, ?, ?, ?, ?, ?, ?)'
          ).bind(nomineeSlug, pack, priceCents, displayName, displayCity, session.id, isAi),
          env.DB.prepare(
            'UPDATE nominees SET total_votes = total_votes + ? WHERE slug = ?'
          ).bind(pack, nomineeSlug),
        ]);
        console.log(`webhook: ${pack} votes recorded for ${nomineeSlug} (${session.id})`);
      }
    }
  } catch (err) {
    // Return 500 so Stripe retries; the idempotency guards above prevent double-counting
    console.error(`webhook: error processing ${session.id}: ${err.message}`);
    return new Response('Processing error', { status: 500 });
  }

  return new Response('ok', { status: 200 });
}

async function verifyStripeSignature(payload, sigHeader, secret) {
  if (!sigHeader) return false;
  const parts = Object.fromEntries(sigHeader.split(',').map(p => p.split('=')));
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const mac = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(signedPayload));
  const computed = Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2, '0')).join('');
  return computed === signature;
}

function adminUnauthorized() {
  return new Response('Unauthorized — append ?key=YOUR_ADMIN_KEY to the URL.', {
    status: 401, headers: { 'Content-Type': 'text/plain' }
  });
}

async function handleAdminPage(request, env) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) return adminUnauthorized();

  const pending = await env.DB.prepare(
    "SELECT id, company_name, citation, nominator_name, is_ai, stripe_session_id, created_at FROM nominations WHERE status = 'pending' ORDER BY created_at ASC"
  ).all();

  const rows = pending.results.map(n => `
    <div class="nominee-card">
      <div class="nominee-body">
        <div class="nominee-name">${escapeHtml(n.company_name)}${n.is_ai ? '<span class="new-badge" style="background:var(--muted);color:#1a1a1a">AI agent</span>' : ''}</div>
        <div class="nominee-citation">"${escapeHtml(n.citation)}"</div>
        <div class="vote-label">${n.nominator_name ? 'by ' + escapeHtml(n.nominator_name) + ' · ' : ''}${escapeHtml(n.created_at || '')}</div>
        <div class="vote-label" style="margin-top:.35rem">Reject = refund $20 in Stripe.${n.stripe_session_id ? ` <a href="https://dashboard.stripe.com/payments?query=${escapeHtml(n.stripe_session_id)}" target="_blank" rel="noopener" style="color:var(--muted);text-decoration:underline">${escapeHtml(n.stripe_session_id)}</a>` : ''}</div>
      </div>
      <div class="nominee-right">
        <form method="POST" action="/admin/action" style="display:flex;gap:.5rem">
          <input type="hidden" name="key" value="${escapeHtml(key)}">
          <input type="hidden" name="id" value="${n.id}">
          <button type="submit" class="btn-vote-pack" name="action" value="approve">Approve</button>
          <button type="submit" class="btn-vote-pack" name="action" value="reject" style="color:var(--red);border-color:var(--red-dim)">Reject</button>
        </form>
      </div>
    </div>`).join('');

  const nav = `<nav>
    <a href="/" class="nav-logo"><span>Darth Vader MBA</span> · admin</a>
    <a href="/leaderboard" style="font-size:.82rem;color:var(--muted)">Leaderboard →</a>
  </nav>`;

  const body = `<main>
    <div class="page-header"><h1>Pending Nominations</h1></div>
    <p class="page-sub">${pending.results.length} awaiting review. Approve to publish to the leaderboard; reject to discard.</p>
    <div class="nominee-list">${rows || '<p style="color:var(--muted)">Nothing pending. The board is clean.</p>'}</div>
  </main>`;

  return new Response(pageShell({ title: 'Admin — Darth Vader MBA', nav, body }), {
    headers: { 'Content-Type': 'text/html;charset=utf-8', 'X-Robots-Tag': 'noindex' }
  });
}

async function handleAdminAction(request, env) {
  const form = await request.formData();
  const key = form.get('key') || '';
  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) return adminUnauthorized();

  const id = parseInt(form.get('id') || '0');
  const action = form.get('action') || '';
  if (!id) return new Response('Bad request', { status: 400 });

  const nom = await env.DB.prepare(
    'SELECT id, company_name, citation, status FROM nominations WHERE id = ?'
  ).bind(id).first();

  if (nom && nom.status === 'pending' && action === 'approve') {
    const slug = await uniqueNomineeSlug(env, nom.company_name);
    await env.DB.batch([
      env.DB.prepare('INSERT INTO nominees (slug, name, citation) VALUES (?, ?, ?)').bind(slug, nom.company_name, nom.citation),
      env.DB.prepare("UPDATE nominations SET status = 'approved' WHERE id = ?").bind(id),
    ]);
    console.log(`admin: approved nomination ${id} -> ${slug}`);
  } else if (nom && nom.status === 'pending' && action === 'reject') {
    await env.DB.prepare("UPDATE nominations SET status = 'rejected' WHERE id = ?").bind(id).run();
    console.log(`admin: rejected nomination ${id}`);
  }

  return new Response(null, { status: 303, headers: { Location: `/admin?key=${encodeURIComponent(key)}` } });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/admin') {
      return handleAdminPage(request, env);
    }

    if (url.pathname === '/admin/action' && request.method === 'POST') {
      return handleAdminAction(request, env);
    }

    if (url.pathname === '/leaderboard' || url.pathname === '/leaderboard/') {
      return handleLeaderboard(request, env);
    }

    if (url.pathname.startsWith('/n/')) {
      return handleNomineePage(request, env);
    }

    if (url.pathname === '/sitemap.xml') {
      return handleSitemap(request, env);
    }

    if (url.pathname === '/robots.txt') {
      return handleRobots(request);
    }

    if (url.pathname === '/vote') {
      return handleVotePage(request, env);
    }

    if (url.pathname === '/checkout' && request.method === 'POST') {
      return handleCheckout(request, env);
    }

    if (url.pathname === '/nominate') {
      return handleNominatePage(request, env);
    }

    if (url.pathname === '/checkout-nominate' && request.method === 'POST') {
      return handleCheckoutNominate(request, env);
    }

    if (url.pathname === '/nominated') {
      return handleNominatedPage();
    }

    if (url.pathname === '/webhook/stripe' && request.method === 'POST') {
      return handleStripeWebhook(request, env);
    }

    return env.ASSETS.fetch(request);
  }
};
