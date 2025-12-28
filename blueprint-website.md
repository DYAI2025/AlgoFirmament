File (index.html) mit:

Fixed 60vh p5.js WEBGL Background (3D Astrowheel + Starfield + Orbit-Stars + Swarm Particles)

4 States (LANDING / AUTH / DASHBOARD / CHAT) ohne Router

Heritage Tabs (Corpus / Spiritus / Anima / Celestial)

Profile Compute Stub (JSON Snapshot)

Chat UI inkl. Loading Dots, Enter/Shift+Enter, Auto-Scroll

Agent Selection + Disclosure

Ambience Toggle (WebAudio minimal, sehr leise)

Speichere das als index.html und öffne es (am besten über einen lokalen Server, aber es klappt oft auch direkt im Browser).

html
Code kopieren
<!doctype html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>astro.ai — Sanctuary Skeleton</title>

  <!-- p5.js (WEBGL) -->
  <script src="https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js"></script>

  <style>
    :root{
      --ink:#06070A;
      --ink2:#0B0D12;
      --gold:#D4AF37;
      --gold2:#B89A4A;
      --ivory:#E8E1D6;

      --emerald: rgba(46,61,47,0.30);
      --glass: rgba(11,13,18,0.62);
      --border: rgba(212,175,55,0.22);
      --border2: rgba(212,175,55,0.12);
      --shadow: 0 20px 80px rgba(0,0,0,0.55);
      --radius: 22px;
      --t: 500ms;
    }

    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, "Helvetica Neue", Arial;
      background: var(--ink);
      color: var(--ivory);
      overflow-x:hidden;
    }

    /* Background layer */
    #bg-root{
      position:fixed;
      inset:0;
      z-index:-1;
      pointer-events:none;
    }
    #wheel-canvas{
      position:absolute;
      top:0; left:0; right:0;
      height:60vh;
    }
    .bg-gradient{
      position:absolute;
      left:0; right:0;
      top:50vh;
      height:50vh;
      background: linear-gradient(180deg, rgba(6,7,10,0) 0%, rgba(6,7,10,0.92) 45%, rgba(6,7,10,1) 100%);
    }
    .bg-grain{
      position:absolute;
      inset:0;
      opacity:0.08;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E");
      mix-blend-mode: overlay;
    }

    /* Topbar */
    .topbar{
      position:fixed;
      top:0; left:0; right:0;
      z-index:20;
      padding: 18px 22px;
      display:flex;
      align-items:center;
      justify-content:space-between;
      background: linear-gradient(180deg, rgba(6,7,10,0.85) 0%, rgba(6,7,10,0.35) 70%, rgba(6,7,10,0) 100%);
      backdrop-filter: blur(10px);
    }
    .brand{
      appearance:none;
      border:none;
      background:transparent;
      color:var(--ivory);
      cursor:pointer;
      padding:8px 10px;
      border-radius:12px;
      transition: transform var(--t), background var(--t);
    }
    .brand:hover{ transform: translateY(-1px); background: rgba(212,175,55,0.06); }
    .brand-mark{
      font-family: ui-serif, "Iowan Old Style", "Palatino", "Garamond", serif;
      letter-spacing: .18em;
      text-transform: uppercase;
      font-size: 14px;
    }
    .nav{ display:flex; gap:10px; }
    .nav-link{
      appearance:none;
      border: 1px solid rgba(212,175,55,0.10);
      background: rgba(11,13,18,0.15);
      color: var(--ivory);
      padding: 10px 12px;
      border-radius: 999px;
      font-size: 12px;
      letter-spacing: .16em;
      text-transform: uppercase;
      cursor:pointer;
      transition: background var(--t), border var(--t), transform var(--t);
    }
    .nav-link:hover{ background: rgba(212,175,55,0.06); border-color: rgba(212,175,55,0.22); transform: translateY(-1px); }

    /* Shell / Views */
    .shell{ padding-top: 92px; min-height: 100vh; }
    .view{ display:none; }
    .view-active{ display:block; }

    .content{
      width:min(1060px, calc(100% - 44px));
      margin: 0 auto;
      padding: 28px 0 90px;
    }
    .center{
      min-height: calc(100vh - 92px);
      display:grid;
      place-items:center;
      padding: 40px 22px 90px;
    }

    .hero{
      min-height: calc(100vh - 92px);
      display:grid;
      place-items:center;
      padding: 50px 22px 90px;
    }
    .hero-inner{
      width:min(900px, 100%);
      text-align:center;
    }
    .hero-title{
      font-family: ui-serif, "Iowan Old Style", "Palatino", "Garamond", serif;
      letter-spacing: .20em;
      text-transform: uppercase;
      font-size: clamp(46px, 7.2vw, 96px);
      margin: 0 0 8px;
      color: var(--ivory);
    }
    .hero-tagline{
      margin: 0 0 22px;
      color: var(--gold2);
      font-size: 18px;
    }
    .hero-cta{ display:flex; justify-content:center; gap:14px; flex-wrap:wrap; margin: 18px 0 26px; }

    .headline{ margin: 20px 0 28px; }
    .section-title{
      font-family: ui-serif, "Iowan Old Style", "Palatino", "Garamond", serif;
      letter-spacing: .22em;
      text-transform: uppercase;
      font-size: 16px;
      color: var(--gold);
      margin: 0;
    }
    .divider{
      height:1px;
      background: linear-gradient(90deg, rgba(212,175,55,0.0) 0%, rgba(212,175,55,0.45) 25%, rgba(212,175,55,0.12) 70%, rgba(212,175,55,0.0) 100%);
      margin-top: 14px;
    }

    /* Cards */
    .card{
      position:relative;
      border-radius: var(--radius);
      border: 1px solid var(--border2);
      background: var(--glass);
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
    }
    .card-glass{ background: rgba(11,13,18,0.62); }
    .card-auth{
      width: min(520px, 100%);
      padding: 26px 22px 18px;
      border: 1px solid var(--border);
      background: rgba(11,13,18,0.70);
    }
    .card-title{
      font-size: 12px;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: var(--gold);
      margin: 0 0 10px;
    }
    .card-header{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap: 12px;
      margin-bottom: 10px;
    }
    .card-corner{
      position:absolute;
      width:14px;height:14px;
      border-color: rgba(212,175,55,0.38);
      border-style: solid;
      border-width:0;
    }
    .card-corner.tl{top:10px; left:10px; border-top-width:1px; border-left-width:1px; border-top-left-radius:6px;}
    .card-corner.tr{top:10px; right:10px; border-top-width:1px; border-right-width:1px; border-top-right-radius:6px;}
    .card-corner.bl{bottom:10px; left:10px; border-bottom-width:1px; border-left-width:1px; border-bottom-left-radius:6px;}
    .card-corner.br{bottom:10px; right:10px; border-bottom-width:1px; border-right-width:1px; border-bottom-right-radius:6px;}

    .hero-note{
      width: min(720px, 100%);
      margin: 0 auto;
      padding: 18px 18px;
    }

    /* Buttons / inputs */
    .btn{
      appearance:none;
      border: 1px solid rgba(212,175,55,0.18);
      background: rgba(11,13,18,0.35);
      color: var(--ivory);
      padding: 12px 16px;
      border-radius: 999px;
      cursor:pointer;
      transition: transform var(--t), background var(--t), border var(--t);
      letter-spacing: .18em;
      text-transform: uppercase;
      font-size: 12px;
    }
    .btn:hover{ transform: translateY(-1px); background: rgba(212,175,55,0.06); border-color: rgba(212,175,55,0.30); }
    .btn:active{ transform: translateY(0px); }
    .btn-primary{ border-color: rgba(212,175,55,0.42); background: rgba(212,175,55,0.08); }
    .btn-secondary{ border-color: rgba(212,175,55,0.18); background: rgba(11,13,18,0.45); }
    .w-full{ width:100%; }

    .form{ display:grid; gap: 14px; margin-top: 16px; }
    .form.compact{ margin-top: 10px; }
    .row{ display:grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items:end; }
    @media (max-width: 720px){ .row{ grid-template-columns:1fr; } }

    .label span{
      display:block;
      font-size: 11px;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: rgba(232,225,214,0.78);
      margin-bottom: 8px;
    }
    .input{
      width:100%;
      border:none;
      outline:none;
      background: transparent;
      color: var(--ivory);
      padding: 10px 2px;
      border-bottom: 1px solid rgba(212,175,55,0.18);
      transition: border var(--t);
    }
    .input:focus{ border-bottom-color: rgba(212,175,55,0.68); }

    .select, .textarea{
      width:100%;
      background: rgba(11,13,18,0.55);
      color: var(--ivory);
      border: 1px solid rgba(212,175,55,0.18);
      border-radius: 14px;
      padding: 10px 10px;
      outline:none;
      transition: border var(--t), background var(--t);
    }
    .select:focus, .textarea:focus{ border-color: rgba(212,175,55,0.55); background: rgba(11,13,18,0.70); }

    .form-footer{
      display:flex;
      align-items:center;
      justify-content:center;
      gap: 10px;
      margin-top: 2px;
    }
    .link{
      appearance:none;
      border:none;
      background:transparent;
      color: var(--gold2);
      cursor:pointer;
      letter-spacing: .14em;
      text-transform: uppercase;
      font-size: 11px;
      padding: 6px 8px;
      transition: color var(--t);
    }
    .link:hover{ color: var(--gold); }
    .dot{ opacity:.4; }

    .badge{
      display:inline-flex;
      align-items:center;
      gap: 8px;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid rgba(212,175,55,0.22);
      background: rgba(212,175,55,0.06);
      color: var(--gold);
      font-size: 11px;
      letter-spacing: .14em;
      text-transform: uppercase;
    }
    .badge.subtle{
      border-color: rgba(212,175,55,0.14);
      background: rgba(11,13,18,0.45);
      color: rgba(232,225,214,0.75);
    }
    .muted{ color: rgba(232,225,214,0.72); line-height: 1.6; }
    .small{ font-size: 12px; }
    .fineprint{ margin: 6px 0 0; font-size: 12px; color: rgba(232,225,214,0.62); line-height:1.6; }
    .gold{ color: var(--gold2); }
    .italic{ font-style: italic; }

    .grid{ display:grid; }
    .gap-24{ gap: 24px; }

    .serif-title{
      font-family: ui-serif, "Iowan Old Style", "Palatino", "Garamond", serif;
      font-size: 26px;
      letter-spacing: .02em;
      margin: 10px 0 12px;
    }
    .body{ margin: 0 0 12px; line-height: 1.7; }

    .pill-row{ display:flex; flex-wrap:wrap; gap:10px; padding-top: 6px; }
    .pill{
      border: 1px solid rgba(212,175,55,0.16);
      background: rgba(6,7,10,0.55);
      padding: 8px 12px;
      border-radius: 999px;
      letter-spacing: .18em;
      text-transform: uppercase;
      font-size: 11px;
      color: rgba(232,225,214,0.80);
    }

    /* Tabs */
    .tabs{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      padding: 16px 16px 0;
    }
    .tab{
      appearance:none;
      border: 1px solid rgba(212,175,55,0.14);
      background: rgba(11,13,18,0.35);
      color: rgba(232,225,214,0.80);
      padding: 9px 12px;
      border-radius: 999px;
      cursor:pointer;
      letter-spacing: .18em;
      text-transform: uppercase;
      font-size: 11px;
      transition: background var(--t), border var(--t), transform var(--t);
    }
    .tab:hover{ transform: translateY(-1px); border-color: rgba(212,175,55,0.22); background: rgba(212,175,55,0.06); }
    .tab.active{
      border-color: rgba(212,175,55,0.38);
      background: rgba(212,175,55,0.08);
      color: var(--gold);
    }
    .tabpanes{ padding: 14px 16px 16px; }
    .tabpane{ display:none; }
    .tabpane.active{ display:block; }

    .two-col{
      display:grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }
    @media (max-width: 920px){ .two-col{ grid-template-columns:1fr; } }

    .code{
      margin: 0;
      padding: 14px 12px;
      border-radius: 14px;
      border: 1px solid rgba(212,175,55,0.16);
      background: rgba(6,7,10,0.65);
      color: rgba(232,225,214,0.86);
      overflow:auto;
      min-height: 220px;
    }

    /* Agents */
    .agent-grid{
      display:grid;
      grid-template-columns: repeat(2, minmax(0,1fr));
      gap: 12px;
      margin-top: 14px;
    }
    @media (max-width: 820px){ .agent-grid{ grid-template-columns:1fr; } }
    .agent-card{
      padding: 14px 14px;
      border-radius: 18px;
      border: 1px solid rgba(212,175,55,0.16);
      background: rgba(6,7,10,0.35);
      transition: transform var(--t), border var(--t), background var(--t);
      cursor:pointer;
    }
    .agent-card:hover{ transform: translateY(-1px); border-color: rgba(212,175,55,0.26); background: rgba(212,175,55,0.04); }
    .agent-card.active{ border-color: rgba(212,175,55,0.42); }
    .agent-name{ font-size: 12px; letter-spacing:.22em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
    .agent-desc{ margin:0; color: rgba(232,225,214,0.72); line-height:1.6; font-size: 13px; }

    /* Codex */
    .codex{
      display:grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 14px;
    }
    @media (max-width: 980px){ .codex{ grid-template-columns:1fr; } }
    .codex-card{
      padding: 14px;
      border-radius: 18px;
      border: 1px solid rgba(212,175,55,0.14);
      background: rgba(6,7,10,0.45);
    }
    .codex-head{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap: 10px;
    }
    .codex-label{
      font-size: 11px;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: rgba(232,225,214,0.70);
    }
    .codex-body{ margin: 10px 0 0; font-size: 13px; line-height:1.65; color: rgba(232,225,214,0.78); }
    .codex-body b{ color: var(--gold2); }

    /* Panel */
    .panel{
      border-radius: 18px;
      border: 1px solid rgba(212,175,55,0.14);
      background: rgba(6,7,10,0.35);
      padding: 14px;
    }
    .panel-row{
      display:flex;
      gap: 10px;
      flex-wrap:wrap;
      align-items:center;
    }
    .label-mini{
      font-size: 10px;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: rgba(232,225,214,0.65);
      margin-right: 4px;
    }

    /* Chat */
    .chat-top{
      display:grid;
      grid-template-columns: 1fr auto 1fr;
      align-items:center;
      margin-bottom: 14px;
    }
    .chat-title{
      font-family: ui-serif, "Iowan Old Style", "Palatino", "Garamond", serif;
      letter-spacing: .22em;
      text-transform: uppercase;
      font-size: 13px;
      color: var(--gold);
    }
    .spacer{ justify-self:end; opacity:0; }
    .chat-card{ padding: 14px; }
    .chat-card-header{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap: 14px;
      padding: 4px 2px 10px;
    }
    .chat-agent{ display:grid; gap:6px; min-width: 190px; }
    .chat-messages{
      height: 44vh;
      min-height: 320px;
      overflow:auto;
      padding: 12px 8px;
      border-top: 1px solid rgba(212,175,55,0.12);
      border-bottom: 1px solid rgba(212,175,55,0.12);
      margin: 8px 0 10px;
      scroll-behavior:smooth;
    }
    .msg{
      max-width: 78%;
      padding: 10px 12px;
      border-radius: 16px;
      margin: 10px 0;
      line-height: 1.6;
      font-size: 13px;
      border: 1px solid rgba(212,175,55,0.14);
      white-space: pre-wrap;
    }
    .msg.user{
      margin-left:auto;
      background: var(--emerald);
      color: var(--ivory);
      border-color: rgba(46,61,47,0.55);
    }
    .msg.oracle{
      margin-right:auto;
      background: rgba(6,7,10,0.80);
      color: var(--gold2);
      border-color: rgba(212,175,55,0.22);
    }
    .loading{
      display:inline-flex;
      gap: 6px;
      padding: 10px 12px;
      border-radius: 16px;
      background: rgba(6,7,10,0.80);
      border: 1px solid rgba(212,175,55,0.22);
      color: var(--gold2);
      margin: 10px 0;
    }
    .dot-anim{
      width: 6px; height: 6px;
      border-radius: 50%;
      background: rgba(212,175,55,0.75);
      animation: bounce 1.1s infinite;
    }
    .dot-anim:nth-child(2){ animation-delay: .15s; }
    .dot-anim:nth-child(3){ animation-delay: .30s; }
    @keyframes bounce{
      0%, 80%, 100%{ transform: translateY(0); opacity: .55; }
      40%{ transform: translateY(-5px); opacity: 1; }
    }

    .chat-input{
      display:grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      align-items:end;
    }
    .chat-disclosure{
      display:flex;
      gap: 10px;
      align-items:center;
      margin-top: 10px;
      flex-wrap:wrap;
    }

    /* Footer */
    .footer{
      padding: 22px;
      text-align:center;
      color: rgba(232,225,214,0.55);
    }
  </style>
</head>

<body>
  <!-- Background -->
  <div id="bg-root" aria-hidden="true">
    <div id="wheel-canvas"></div>
    <div class="bg-gradient"></div>
    <div class="bg-grain"></div>
  </div>

  <!-- Header -->
  <header class="topbar">
    <button class="brand" id="nav-home" title="Home"><span class="brand-mark">astro.ai</span></button>
    <nav class="nav">
      <button class="nav-link" data-nav="DASHBOARD">Daily</button>
      <button class="nav-link" data-nav="DASHBOARD" data-tab="celestial">Charts</button>
      <button class="nav-link" data-nav="CHAT">Oracle</button>
    </nav>
  </header>

  <main class="shell">
    <!-- LANDING -->
    <section class="view view-active" id="view-LANDING" aria-label="Landing">
      <div class="hero">
        <div class="hero-inner">
          <h1 class="hero-title">ASTRO.AI</h1>
          <p class="hero-tagline"><em>Your constellation, interpreted.</em></p>
          <div class="hero-cta">
            <button class="btn btn-primary" data-action="go-auth">Enter Sanctuary</button>
            <button class="btn btn-secondary" data-action="go-learn">Learn More</button>
          </div>

          <div class="hero-note card card-glass">
            <div class="card-corner tl"></div><div class="card-corner tr"></div>
            <div class="card-corner bl"></div><div class="card-corner br"></div>
            <h3 class="card-title">DATA, NOT DOGMA</h3>
            <p class="muted">
              Berechnungen sind deterministisch. Deutungen sind reflektierende KI-Synthesen – keine Vorhersagen.
              <span class="badge">AI Conversational Agents</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- AUTH -->
    <section class="view" id="view-AUTH" aria-label="Auth">
      <div class="center">
        <div class="card card-auth">
          <div class="card-corner tl"></div><div class="card-corner tr"></div>
          <div class="card-corner bl"></div><div class="card-corner br"></div>

          <h2 class="section-title" id="auth-title">ENTER SANCTUARY</h2>

          <form class="form" id="auth-form">
            <label class="label"><span>EMAIL</span><input class="input" type="email" placeholder="you@domain.com" required /></label>
            <label class="label"><span>PASSWORD</span><input class="input" type="password" placeholder="••••••••" required /></label>

            <button class="btn btn-primary w-full" type="submit" id="auth-submit">Enter Sanctuary</button>

            <div class="form-footer">
              <button type="button" class="link" id="auth-toggle">Join the Circle</button>
              <span class="dot">•</span>
              <button type="button" class="link" data-action="go-landing">Return</button>
            </div>

            <p class="fineprint">Hinweis: Dieses Auth-Formular ist ein visueller Übergang. Keine Daten werden gespeichert.</p>
          </form>
        </div>
      </div>
    </section>

    <!-- DASHBOARD -->
    <section class="view" id="view-DASHBOARD" aria-label="Dashboard">
      <div class="content">
        <div class="headline">
          <h2 class="section-title">YOUR DAILY ALIGNMENT</h2>
          <div class="divider"></div>
        </div>

        <div class="grid gap-24">
          <section class="card card-glass" style="padding:16px;">
            <div class="card-header">
              <span class="italic gold" id="today-date">—</span>
              <span class="badge subtle">Computed Snapshot</span>
            </div>
            <h3 class="serif-title">Today, the moon enters your sector of reflection.</h3>
            <p class="body">
              A quiet heat moves beneath the surface — not to burn, but to forge.
              In the spaces between intention and action, your clarity is tempered.
            </p>
            <div class="pill-row">
              <span class="pill">☽ MOON</span>
              <span class="pill">♂ MARS</span>
              <span class="pill">♃ JUPITER</span>
            </div>
          </section>

          <section class="card card-glass">
            <div class="tabs">
              <button class="tab active" data-tab="corpus">CORPUS</button>
              <button class="tab" data-tab="spiritus">SPIRITUS</button>
              <button class="tab" data-tab="anima">ANIMA</button>
              <button class="tab" data-tab="celestial">CELESTIAL</button>
            </div>

            <div class="tabpanes">
              <!-- CORPUS -->
              <div class="tabpane active" id="tab-corpus">
                <div class="two-col">
                  <div>
                    <h3 class="card-title">PROFILE — MATHEMATICAL IDENTITY</h3>
                    <p class="muted">
                      West (astronomisch) + Ost (Ba Zi) werden aus berechneten Werten abgeleitet.
                      Interpretation erfolgt getrennt durch AI-Agents.
                    </p>

                    <form class="form compact" id="profile-form">
                      <div class="row">
                        <label class="label"><span>DATE OF BIRTH</span><input class="input" type="date" id="dob" required /></label>
                        <label class="label"><span>TIME</span><input class="input" type="time" id="tob" required /></label>
                      </div>

                      <div class="row">
                        <label class="label"><span>LAT</span><input class="input" type="number" step="0.0001" id="lat" placeholder="48.1371" required /></label>
                        <label class="label"><span>LON</span><input class="input" type="number" step="0.0001" id="lon" placeholder="11.5754" required /></label>
                      </div>

                      <div class="row">
                        <label class="label"><span>TIMEZONE OFFSET</span><input class="input" type="number" step="0.25" id="tz" value="1" required /></label>
                        <button class="btn btn-secondary" type="button" id="profile-example">Use Example</button>
                      </div>

                      <button class="btn btn-primary w-full" type="submit">Compute Profile</button>
                    </form>
                  </div>

                  <div>
                    <h3 class="card-title">COMPUTED SNAPSHOT</h3>
                    <pre class="code" id="profile-output">{}</pre>
                    <p class="fineprint">Diese Werte sind <span class="gold">berechnet</span>. Deutung erfolgt im Oracle Chamber.</p>
                  </div>
                </div>
              </div>

              <!-- SPIRITUS -->
              <div class="tabpane" id="tab-spiritus">
                <h3 class="card-title">VOICE ASTRO AI AGENTS</h3>
                <p class="muted">Wähle einen Agenten. Jede Antwort wird als KI-Interpretation gekennzeichnet.</p>
                <div class="agent-grid" id="agent-grid"></div>
                <div class="row">
                  <button class="btn btn-primary" data-action="go-chat">Begin Consultation</button>
                  <button class="btn btn-secondary" id="toggle-ambience">Ambience: Off</button>
                </div>
                <p class="fineprint">Voice ist hier als UI-Skeleton vorhanden (TTS/STT Integration folgt).</p>
              </div>

              <!-- ANIMA -->
              <div class="tabpane" id="tab-anima">
                <h3 class="card-title">CHARACTER CODEX</h3>
                <p class="muted">Jede Karte folgt: <span class="gold">Claim</span> → <span class="gold">Data Anchor</span> → <span class="gold">Action</span>.</p>
                <div class="codex" id="codex"></div>
              </div>

              <!-- CELESTIAL -->
              <div class="tabpane" id="tab-celestial">
                <h3 class="card-title">CELESTIAL INSTRUMENTS</h3>
                <p class="muted">Placeholder für Charts/Transits. Der Astrowheel bleibt der konstante Anker im Raum.</p>
                <div class="panel">
                  <div class="panel-row">
                    <span class="label-mini">MODULE</span>
                    <span class="badge subtle">Zi Dou (V2)</span>
                    <span class="badge subtle">Transits (V2)</span>
                    <span class="badge subtle">Aspects (V2)</span>
                  </div>
                  <div class="divider"></div>
                  <p class="body">
                    Dieses Skeleton priorisiert die Sanctuary-Experience und die Trennung von
                    <span class="gold">Berechnung</span> und <span class="gold">Interpretation</span>.
                  </p>
                </div>
              </div>

            </div>
          </section>

          <section class="card card-glass" style="padding:16px;">
            <h3 class="card-title">CONSULT THE ORACLE</h3>
            <p class="muted">
              Speak with an AI Conversational Agent trained to synthesize West + Ba Zi from computed values.
              No predictions. No dogma. Only reflective guidance.
            </p>
            <button class="btn btn-primary" data-action="go-chat">Begin Consultation</button>
          </section>
        </div>
      </div>
    </section>

    <!-- CHAT -->
    <section class="view" id="view-CHAT" aria-label="Oracle Chamber">
      <div class="content">
        <div class="chat-top">
          <button class="btn btn-secondary" data-action="go-dashboard">← Return</button>
          <div class="chat-title">ORACLE CHAMBER</div>
          <div class="spacer"></div>
        </div>

        <section class="card card-glass chat-card">
          <div class="chat-card-header">
            <div>
              <div class="card-title">ORACLE AGENT</div>
              <div class="muted small">Live Connection <span class="badge">AI</span></div>
            </div>
            <div class="chat-agent">
              <label class="label-mini" for="agent-select">AGENT</label>
              <select id="agent-select" class="select"></select>
            </div>
          </div>

          <div class="chat-messages" id="chat-messages" aria-live="polite"></div>

          <div class="chat-input">
            <textarea id="chat-text" class="textarea" rows="2" placeholder="Ask the Oracle… (Shift+Enter for newline)"></textarea>
            <button class="btn btn-primary" id="chat-send">Send</button>
          </div>

          <div class="chat-disclosure">
            <span class="badge subtle">Disclosure</span>
            <span class="fineprint">This is an AI Conversational Agent. Calculations are deterministic; interpretations are reflective guidance.</span>
          </div>
        </section>
      </div>
    </section>

  </main>

  <footer class="footer">
    <span class="muted small">astro.ai Sanctuary Skeleton • Dark/Gold • 3D Astrowheel + Particles • State-based SPA</span>
  </footer>

  <script type="module">
    // -------------------------
    // 0) App State
    // -------------------------
    const AppState = Object.freeze({ LANDING:'LANDING', AUTH:'AUTH', DASHBOARD:'DASHBOARD', CHAT:'CHAT' });

    let state = AppState.LANDING;
    let activeTab = 'corpus';
    let activeAgentId = 'synthesis';
    let profile = null;

    const views = {
      [AppState.LANDING]: document.getElementById('view-LANDING'),
      [AppState.AUTH]: document.getElementById('view-AUTH'),
      [AppState.DASHBOARD]: document.getElementById('view-DASHBOARD'),
      [AppState.CHAT]: document.getElementById('view-CHAT'),
    };

    function setState(next){
      state = next;
      Object.values(views).forEach(v => v?.classList.remove('view-active'));
      views[state]?.classList.add('view-active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function setTab(tabId){
      activeTab = tabId;
      document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
      document.querySelectorAll('.tabpane').forEach(p => p.classList.toggle('active', p.id === `tab-${tabId}`));
    }

    // -------------------------
    // 1) Agents
    // -------------------------
    const AGENTS = [
      { id:'astronomer', name:'The Astronomer (AI)', desc:'Explains what was computed — time basis, boundaries, sanity checks.' },
      { id:'bazi',       name:'The BaZi Strategist (AI)', desc:'Interprets the Four Pillars as a resource model — strengths, frictions, timing.' },
      { id:'synthesis',  name:'The Synthesis Oracle (AI)', desc:'Bridges West + Ba Zi — ceremonial language, grounded in computed anchors.' },
      { id:'auditor',    name:'The Skeptic Auditor (AI)', desc:'Prevents overreach — reduces certainty, returns you to choices.' },
    ];

    function renderAgents(){
      const grid = document.getElementById('agent-grid');
      const select = document.getElementById('agent-select');
      if (!grid || !select) return;

      grid.innerHTML = '';
      for (const a of AGENTS){
        const card = document.createElement('div');
        card.className = 'agent-card' + (a.id === activeAgentId ? ' active' : '');
        card.tabIndex = 0;
        card.innerHTML = `<div class="agent-name">${escapeHtml(a.name)}</div><p class="agent-desc">${escapeHtml(a.desc)}</p>`;
        card.addEventListener('click', () => { activeAgentId = a.id; renderAgents(); });
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { activeAgentId = a.id; renderAgents(); }});
        grid.appendChild(card);
      }

      select.innerHTML = '';
      for (const a of AGENTS){
        const opt = document.createElement('option');
        opt.value = a.id;
        opt.textContent = a.name;
        select.appendChild(opt);
      }
      select.value = activeAgentId;
      select.onchange = () => { activeAgentId = select.value; renderAgents(); };
    }

    // -------------------------
    // 2) Profile compute stub
    // -------------------------
    function simpleHash(str){
      let h = 2166136261;
      for (let i=0;i<str.length;i++){
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return Math.abs(h >>> 0);
    }

    function computeProfile(input){
      const seedKey = `${input.dob}T${input.tob}|${input.lat}|${input.lon}|${input.tz}`;
      const hash = simpleHash(seedKey);

      const zodiac = ['♈ Aries','♉ Taurus','♊ Gemini','♋ Cancer','♌ Leo','♍ Virgo','♎ Libra','♏ Scorpio','♐ Sagittarius','♑ Capricorn','♒ Aquarius','♓ Pisces'];
      const animal = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];

      return {
        meta: {
          computedAt: new Date().toISOString(),
          input,
          disclaimer: "Computed values only. Interpretation is produced by AI agents.",
          sanity: { ok: true, notes: ["Placeholder output. Replace with real BaZi/VSOP engines."] }
        },
        west: {
          sunSign: zodiac[hash % 12],
          ascendant: zodiac[(hash * 7) % 12],
          mc: zodiac[(hash * 11) % 12],
        },
        east: {
          bazi: {
            pillars: [
              { name:"Year",  stem:"甲", branch:"子" },
              { name:"Month", stem:"乙", branch:"丑" },
              { name:"Day",   stem:"丙", branch:"寅" },
              { name:"Hour",  stem:"丁", branch:"卯" },
            ]
          },
          chineseZodiac: animal[(hash * 3) % 12]
        }
      };
    }

    function renderCodex(){
      const el = document.getElementById('codex');
      if (!el) return;
      const west = profile?.west || {};
      const east = profile?.east || {};

      const cards = [
        { label:'CLAIM', badge:'Anchor', body:`You stabilize when you treat attention like a resource — not a mood.` },
        { label:'DATA ANCHOR', badge:'Computed', body:`Sun: <b>${escapeHtml(west.sunSign || '—')}</b><br/>ASC: <b>${escapeHtml(west.ascendant || '—')}</b><br/>BaZi Day: <b>${escapeHtml(east?.bazi?.pillars?.[2]?.stem || '—')}${escapeHtml(east?.bazi?.pillars?.[2]?.branch || '')}</b>` },
        { label:'ACTION', badge:'1–3 Steps', body:`Choose one constraint for the day. Protect it. Then move.` },
        { label:'PRIME DIRECTIVE', badge:'Ethics', body:`No predictions. No dogma. Focus on growth potential and decisions.` },
        { label:'SYNTHESIS', badge:'Bridge', body:`Translate the same tension across two symbol systems — keep the anchor visible.` },
        { label:'AUDIT', badge:'Skeptic', body:`If the interpretation feels absolute, reduce it to options and probabilities.` },
      ];

      el.innerHTML = '';
      for (const c of cards){
        const card = document.createElement('div');
        card.className = 'codex-card';
        card.innerHTML = `
          <div class="codex-head">
            <div class="codex-label">${escapeHtml(c.label)}</div>
            <span class="badge subtle">${escapeHtml(c.badge)}</span>
          </div>
          <div class="codex-body">${c.body}</div>
        `;
        el.appendChild(card);
      }
    }

    // -------------------------
    // 3) Chat engine stub
    // -------------------------
    const chat = {
      history: [],
      add(role, content){
        this.history.push({ role, content, ts: Date.now() });
        renderChatMessage({ role, content });
      },
      async send(text){
        const t = (text||'').trim();
        if (!t) return;

        this.add('user', t);
        setChatLoading(true);

        try{
          const reply = await oracleReply({ text: t, agentId: activeAgentId, profile });
          this.add('oracle', reply);
        } finally {
          setChatLoading(false);
        }
      }
    };

    function oracleReply({ text, agentId, profile }){
      const agentVoices = {
        astronomer: "I will speak only of what is computed and what is uncertain.",
        bazi: "We will treat symbols as a resource model: inputs, outputs, frictions.",
        synthesis: "I will bridge two maps with one anchor: your computed values.",
        auditor: "I will reduce certainty, and return you to choices."
      };
      const preface = agentVoices[agentId] || agentVoices.synthesis;
      const anchor = profile?.west?.sunSign ? `Anchor: Sun ${profile.west.sunSign}.` : "Anchor: (no profile computed yet).";

      return new Promise(res => {
        setTimeout(() => {
          res(`${preface}\n${anchor}\n\nYour question: “${text}”.\n\nI will not predict. I will offer one reflective lens and one pragmatic step:\n• Lens: Identify the single tension you avoid naming.\n• Step: Write one sentence that turns it into an action you can take today.`);
        }, 900);
      });
    }

    function renderChatMessage(msg){
      const box = document.getElementById('chat-messages');
      const div = document.createElement('div');
      div.className = 'msg ' + (msg.role === 'user' ? 'user' : 'oracle');
      div.textContent = msg.content;
      box.appendChild(div);
      box.scrollTop = box.scrollHeight;
    }

    let loadingEl = null;
    function setChatLoading(v){
      const box = document.getElementById('chat-messages');
      const textEl = document.getElementById('chat-text');
      const sendBtn = document.getElementById('chat-send');

      if (v){
        if (loadingEl) return;
        loadingEl = document.createElement('div');
        loadingEl.className = 'loading';
        loadingEl.innerHTML = `<span class="dot-anim"></span><span class="dot-anim"></span><span class="dot-anim"></span>`;
        box.appendChild(loadingEl);
        box.scrollTop = box.scrollHeight;
        textEl.disabled = true;
        sendBtn.disabled = true;
      } else {
        loadingEl?.remove();
        loadingEl = null;
        textEl.disabled = false;
        sendBtn.disabled = false;
        textEl.focus();
      }
    }

    // Initial greeting
    chat.add('oracle', 'Greetings. I am the Astro.ai Oracle (AI Agent). How may the stars illuminate your path today?');

    // -------------------------
    // 4) Ambience (WebAudio minimal)
    // -------------------------
    function createAmbience(){
      let ctx=null, running=false;
      async function start(){
        if (running) return;
        ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
        if (ctx.state === 'suspended') await ctx.resume();

        const master = ctx.createGain();
        master.gain.value = 0.05;
        master.connect(ctx.destination);

        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 110;

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 220;

        const padGain = ctx.createGain();
        padGain.gain.value = 0.6;
        osc.connect(padGain); osc2.connect(padGain); padGain.connect(master);

        const noise = ctx.createBufferSource();
        const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i=0;i<data.length;i++) data[i] = (Math.random()*2-1)*0.1;
        noise.buffer = buf; noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 380;

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.12;

        noise.connect(filter); filter.connect(noiseGain); noiseGain.connect(master);

        const lfo = ctx.createOscillator();
        lfo.type = 'sine'; lfo.frequency.value = 0.08;

        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.02;

        lfo.connect(lfoGain); lfoGain.connect(master.gain);

        osc.start(); osc2.start(); noise.start(); lfo.start();

        ctx.__astro = { osc, osc2, noise, lfo, master };
        running = true;
      }

      function stop(){
        if (!running || !ctx?.__astro) return;
        const { osc, osc2, noise, lfo, master } = ctx.__astro;
        try{ osc.stop(); }catch{}
        try{ osc2.stop(); }catch{}
        try{ noise.stop(); }catch{}
        try{ lfo.stop(); }catch{}
        try{ master.disconnect(); }catch{}
        ctx.__astro = null;
        running = false;
      }

      async function toggle(){ if (!running) await start(); else stop(); }
      function isRunning(){ return running; }
      return { toggle, isRunning };
    }

    const ambience = createAmbience();

    // -------------------------
    // 5) p5.js 3D Astrowheel + Particles
    // -------------------------
    function mountWheel(){
      const container = document.getElementById('wheel-canvas');
      if (!container || !window.p5) return;

      const getW = () => container.clientWidth || window.innerWidth;
      const getH = () => Math.floor(window.innerHeight * 0.60);

      const P = {
        seed: 12345,
        ink:'#06070A',
        gold:'#D4AF37',
        gold2:'#B89A4A',
        ivory:'#E8E1D6',

        wheelRadius: 260,
        wheelTube: 12,
        innerScale: 0.85,

        rotSpeed: 0.0008,
        driftAmp: 0.22,
        driftFreqs: [0.11,0.23,0.13,0.29],

        starfieldCount: 4500,
        depth: 1200,

        orbitCount: 60,
        orbitSize: 2.1,
        orbitSpeedMin: 0.0007,
        orbitSpeedMax: 0.0022,

        swarmCount: 100,
        swarmSize: 5,
        swarmNoiseScale: 0.006,
        swarmOpacity: 0.6,

        glyphs: ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'],
      };

      const sketch = (p) => {
        let orbitStars=[], swarm=[], starfield=[];

        const hexToRgb = (hex) => {
          const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          if (!m) return { r:255,g:255,b:255 };
          return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
        };

        const mapRange = (v,inMin,inMax,outMin,outMax) =>
          outMin + (outMax-outMin) * ((v-inMin)/(inMax-inMin));

        const computeDrift = (t) => {
          const f = P.driftFreqs, a = P.driftAmp;
          const rx = a * (Math.sin(t*f[0])*0.6 + Math.cos(t*f[1])*0.4);
          const ry = a * (Math.sin(t*f[2])*0.6 + Math.cos(t*f[3])*0.4);
          const rz = a * (Math.sin(t*(f[0]+f[2])*0.5) * 0.25);
          return { rx,ry,rz };
        };

        class OrbitStar{
          constructor(){
            this.axis = p5.Vector.random3D();
            this.angle = p.random(p.TWO_PI);
            this.speed = p.random(P.orbitSpeedMin, P.orbitSpeedMax);
            this.radius = P.wheelRadius * p.random(1.05,1.35);
            this.phase = p.random(1000);
          }
          update(){ this.angle += this.speed; }
          display(){
            const px = Math.cos(this.angle) * this.radius;
            const py = Math.sin(this.angle) * this.radius;
            p.push();
            p.rotateX(this.axis.x * Math.PI);
            p.rotateY(this.axis.y * Math.PI);
            p.rotateZ(this.axis.z * Math.PI);
            p.translate(px,py, Math.sin((p.frameCount+this.phase)*0.01)*18);
            const g = hexToRgb(P.gold);
            p.noStroke(); p.fill(g.r,g.g,g.b,180);
            p.sphere(P.orbitSize,6,6);
            p.pop();
          }
        }

        class SwarmParticle{
          constructor(){
            this.base = p5.Vector.random3D().mult(p.random(120,520));
            this.offset = p.random(1000);
            this.size = p.random(P.swarmSize*0.7, P.swarmSize*1.3);
          }
          update(){
            const tt = (p.frameCount*0.01) + this.offset;
            const ns = P.swarmNoiseScale;
            this.pos = p.createVector(
              (p.noise(this.base.x*ns, tt) - 0.5) * 900,
              (p.noise(this.base.y*ns, tt+50) - 0.5) * 900,
              (p.noise(this.base.z*ns, tt+100) - 0.5) * 900
            );
          }
          display(){
            const m = hexToRgb(P.gold2);
            p.push();
            p.translate(this.pos.x,this.pos.y,this.pos.z);
            p.noStroke(); p.fill(m.r,m.g,m.b, 255*P.swarmOpacity);
            p.sphere(this.size,6,6);
            p.pop();
          }
        }

        function initStarfield(){
          starfield = [];
          for (let i=0;i<P.starfieldCount;i++){
            starfield.push({
              x: p.random(-1000,1000),
              y: p.random(-1000,1000),
              z: p.random(-P.depth,P.depth),
              tw: p.random(0.2,1.0),
            });
          }
        }
        function initOrbit(){
          orbitStars = [];
          for (let i=0;i<P.orbitCount;i++) orbitStars.push(new OrbitStar());
        }
        function initSwarm(){
          swarm = [];
          for (let i=0;i<P.swarmCount;i++) swarm.push(new SwarmParticle());
        }

        function renderStarfield(){
          const iv = hexToRgb(P.ivory);
          p.noStroke();
          for (const s of starfield){
            const dz = Math.abs(s.z);
            const a = mapRange(dz, 200, P.depth, 220, 0);
            p.push();
            p.translate(s.x,s.y,s.z);
            p.fill(iv.r,iv.g,iv.b, Math.max(0,a) * s.tw);
            p.sphere(0.9,4,4);
            p.pop();
          }
        }

        function renderWheel(){
          const g = hexToRgb(P.gold);
          const m = hexToRgb(P.gold2);

          // Glow layer
          p.push();
          p.noStroke(); p.fill(g.r,g.g,g.b,40);
          p.torus(P.wheelRadius, P.wheelTube*1.9, 40, 18);
          p.pop();

          // Main ring
          p.push();
          p.noStroke(); p.fill(g.r,g.g,g.b,160);
          p.torus(P.wheelRadius, P.wheelTube, 48, 22);
          p.pop();

          // Inner ring
          p.push();
          p.noStroke(); p.fill(m.r,m.g,m.b,90);
          p.torus(P.wheelRadius*P.innerScale, Math.max(4,P.wheelTube*0.35), 36, 16);
          p.pop();

          // Glyphs
          p.push();
          p.textAlign(p.CENTER,p.CENTER);
          p.textSize(22);
          p.fill(g.r,g.g,g.b,205);
          for (let i=0;i<12;i++){
            const ang = (i/12)*p.TWO_PI;
            const x = Math.cos(ang)*P.wheelRadius;
            const y = Math.sin(ang)*P.wheelRadius;
            const z = Math.sin(ang*3.0 + p.frameCount*0.005)*14;
            p.push();
            p.translate(x,y,z);
            p.rotateZ(ang + p.HALF_PI);
            p.rotateY(-0.25);
            p.text(P.glyphs[i],0,0);
            p.pop();
          }
          p.pop();
        }

        function resize(){
          const w = getW(), h = getH();
          p.resizeCanvas(w,h);
          P.wheelRadius = Math.min(w,h) * 0.36;
          P.wheelTube = Math.max(9, Math.min(w,h) * 0.018);
        }

        p.setup = () => {
          p.createCanvas(getW(), getH(), p.WEBGL);
          p.pixelDensity(1);
          p.randomSeed(P.seed);
          p.noiseSeed(P.seed);

          P.wheelRadius = Math.min(getW(),getH) * 0.36;
          P.wheelTube = Math.max(9, Math.min(getW(),getH) * 0.018);

          initStarfield(); initOrbit(); initSwarm();
          window.addEventListener('resize', resize);
        };

        p.draw = () => {
          // Ink overlay for trails
          p.push();
          p.resetMatrix();
          p.translate(-p.width/2, -p.height/2);
          const bg = hexToRgb(P.ink);
          p.noStroke(); p.fill(bg.r,bg.g,bg.b,18);
          p.rect(0,0,p.width,p.height);
          p.pop();

          renderStarfield();

          const t = p.frameCount;
          const d = computeDrift(t);

          p.push();
          p.rotateX(d.rx);
          p.rotateY(d.ry);
          p.rotateZ(d.rz);

          p.rotateZ(t * P.rotSpeed);
          renderWheel();

          for (const s of orbitStars){ s.update(); s.display(); }
          for (const sp of swarm){ sp.update(); sp.display(); }

          p.pop();
        };
      };

      // instance mode
      // eslint-disable-next-line no-new
      new p5(sketch, container);
    }

    // -------------------------
    // 6) Bindings
    // -------------------------
    function bindNav(){
      document.getElementById('nav-home')?.addEventListener('click', () => setState(AppState.LANDING));

      document.querySelectorAll('[data-nav]').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.nav;
          if (target === 'CHAT') setState(AppState.CHAT);
          if (target === 'DASHBOARD') setState(AppState.DASHBOARD);
          if (btn.dataset.tab) setTab(btn.dataset.tab);
        });
      });

      document.querySelectorAll('[data-action]').forEach(btn => {
        const a = btn.dataset.action;
        btn.addEventListener('click', () => {
          if (a === 'go-auth') setState(AppState.AUTH);
          if (a === 'go-landing') setState(AppState.LANDING);
          if (a === 'go-dashboard') setState(AppState.DASHBOARD);
          if (a === 'go-chat') setState(AppState.CHAT);
          if (a === 'go-learn') setState(AppState.DASHBOARD);
        });
      });
    }

    function bindAuth(){
      const form = document.getElementById('auth-form');
      const toggle = document.getElementById('auth-toggle');
      const title = document.getElementById('auth-title');
      const submit = document.getElementById('auth-submit');

      let mode = 'login';
      const renderMode = () => {
        if (mode === 'login'){
          title.textContent = 'ENTER SANCTUARY';
          submit.textContent = 'Enter Sanctuary';
          toggle.textContent = 'Join the Circle';
        } else {
          title.textContent = 'JOIN THE CIRCLE';
          submit.textContent = 'Join the Circle';
          toggle.textContent = 'Enter Sanctuary';
        }
      };
      renderMode();

      toggle?.addEventListener('click', () => { mode = (mode === 'login') ? 'signup' : 'login'; renderMode(); });
      form?.addEventListener('submit', (e) => { e.preventDefault(); setState(AppState.DASHBOARD); });
    }

    function bindTabs(){
      document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => setTab(btn.dataset.tab)));
      setTab(activeTab);
    }

    function bindProfile(){
      const form = document.getElementById('profile-form');
      const out = document.getElementById('profile-output');

      document.getElementById('profile-example')?.addEventListener('click', () => {
        document.getElementById('dob').value = '1991-11-08';
        document.getElementById('tob').value = '21:15';
        document.getElementById('lat').value = '48.1371';
        document.getElementById('lon').value = '11.5754';
        document.getElementById('tz').value = '1';
      });

      form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = {
          dob: document.getElementById('dob').value,
          tob: document.getElementById('tob').value,
          lat: Number(document.getElementById('lat').value),
          lon: Number(document.getElementById('lon').value),
          tz: Number(document.getElementById('tz').value),
        };
        profile = computeProfile(input);
        out.textContent = JSON.stringify(profile, null, 2);
        renderCodex();
      });

      out.textContent = JSON.stringify({}, null, 2);
    }

    function bindChat(){
      const textEl = document.getElementById('chat-text');
      const sendBtn = document.getElementById('chat-send');

      async function doSend(){
        const t = textEl.value;
        textEl.value = '';
        await chat.send(t);
      }

      sendBtn.addEventListener('click', doSend);
      textEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey){
          e.preventDefault();
          doSend();
        }
      });
    }

    function bindAmbience(){
      const btn = document.getElementById('toggle-ambience');
      const update = () => btn.textContent = ambience.isRunning() ? 'Ambience: On' : 'Ambience: Off';

      btn?.addEventListener('click', async () => { await ambience.toggle(); update(); });
      update();
    }

    function setTodayDate(){
      const el = document.getElementById('today-date');
      if (!el) return;
      const d = new Date();
      el.textContent = d.toLocaleDateString(undefined, { weekday:'long', year:'numeric', month:'long', day:'numeric' });
    }

    function escapeHtml(str){
      return String(str ?? '')
        .replaceAll('&','&amp;')
        .replaceAll('<','&lt;')
        .replaceAll('>','&gt;')
        .replaceAll('"','&quot;')
        .replaceAll("'","&#039;");
    }

    // -------------------------
    // Init
    // -------------------------
    document.addEventListener('DOMContentLoaded', () => {
      mountWheel();
      setTodayDate();
      bindNav();
      bindAuth();
      bindTabs();
      bindProfile();
      bindChat();
      bindAmbience();
      renderAgents();
      renderCodex();
    });
  </script>
</body>
</html>
Wenn du mir sagst, ob du Multi-File Struktur willst (z.B. app.js, wheel_engine.js, profile_engine.js etc.), splitte ich dir das 1:1 sauber in Module (gleiches Skeleton, nur auf Dateien verteilt).