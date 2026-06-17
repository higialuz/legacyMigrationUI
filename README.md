# ERP Migration Showcase

**Live:** https://elmoluz.com  
**Author:** Emerson Yaegashi — Senior Full Stack & AI Engineer  
**Purpose:** Technical evaluation submission — Legacy ERP migration assessment

---

## What This Is

A live, interactive showcase built as a response to a 7-page technical evaluation for a Senior Software Engineer role. Instead of submitting a PDF, this is a deployed web application that answers all 8 questions + the eliminatory bonus as navigable living artifacts.

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16 + MUI v6 + TypeScript |
| Rendering | Static export (`output: 'export'`) |
| Hosting | cPanel — elmoluz.com (diana.tdnx.net) |
| Deploy | SSH key-based + scp + tar |

---

## Project Structure

```
erp-showcase/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Overview — system context + migration philosophy
│   │   ├── q1/page.tsx       # Reverse Engineering (150 tables, 300 SPs)
│   │   ├── q2/page.tsx       # 13 Minimum Artifacts before refactoring
│   │   ├── q3/page.tsx       # Multi-client business rules — Strategy Pattern
│   │   ├── q4/page.tsx       # Conflicting truth — ADR process
│   │   ├── q5/page.tsx       # Responsible AI usage — guardrails + knowledge base
│   │   ├── q6/page.tsx       # Observability — structured logs, tracing, LGPD
│   │   ├── q7/page.tsx       # Transitional Architecture — Strangler Fig SVG diagram
│   │   ├── q8/page.tsx       # First 90 Days — what to do and what NOT to do
│   │   ├── bonus/page.tsx    # Eliminatory bonus — "Can AI just generate the code?"
│   │   └── layout.tsx        # Root layout — MUI theme, Sidebar, StackSelector
│   ├── components/
│   │   ├── Sidebar.tsx       # Navigation — all 10 routes
│   │   ├── StackSelector.tsx # Stack switcher — re-renders code/diagrams per stack
│   │   ├── PageShell.tsx     # Reusable page wrapper with Q label + title
│   │   ├── ArtifactCard.tsx  # Card with number, title, risk, and owner chips
│   │   ├── CodeBlock.tsx     # Syntax-highlighted code with stack-aware label
│   │   └── MuiRegistry.tsx   # Emotion cache for MUI SSR
│   ├── context/
│   │   └── StackContext.tsx  # Stack selector state — 3 combos, React context
│   └── theme.ts              # MUI dark theme — blue/purple accent
├── out/                      # Static export output (deployed to public_html)
├── next.config.ts            # output: export, trailingSlash, unoptimized images
└── package.json
```

---

## The 3 Stack Combos

The stack selector at the top of every page re-renders all code examples, architecture diagrams, and deployment strategies in the chosen combination:

| # | Label | Frontend | Backend | DB | Infra |
|---|-------|----------|---------|-----|-------|
| 1 | SST v4 + Next.js *(recommended)* | Next.js 15 + MUI + TS | Python + Django + DRF | PostgreSQL (RDS) | AWS SST v4 — Lambda + CloudFront |
| 2 | React + Express | React 19 + Vite + TS | Node.js + Express + Zod | MySQL | cPanel / VPS |
| 3 | .NET 9 Minimal API | Next.js 15 + TS | .NET 9 Minimal API + EF Core | SQL Server | Azure App Service |

Combo 3 (`.NET 9 + SQL Server`) is the closest to their existing legacy stack — demonstrating migration within the Microsoft ecosystem, not only away from it.

---

## Key Design Decisions

- **Static export** — no server required, no Node.js runtime on cPanel, instant load
- **Stack selector is client-side only** — no API calls, no backend dependency
- **SVG architecture diagram** (Q7) — hand-coded, adapts stack labels dynamically
- **All answers are structured artifacts** — tables, ADR templates, code examples, checklists — not prose paragraphs
- **Bonus answer** is the most prominent page — because it's the eliminatory filter

---

## Local Dev

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # generates out/
```

## Deploy

```bash
npm run build
tar -czf /tmp/erp-showcase.tar.gz --exclude-from=.deployignore -C out .
scp /tmp/erp-showcase.tar.gz elmoluz:~/erp-showcase.tar.gz
ssh elmoluz "cd ~/public_html && tar -xzf ~/erp-showcase.tar.gz && rm ~/erp-showcase.tar.gz"
```

SSH config: `~/.ssh/config` → Host `elmoluz` → `diana.tdnx.net` — key: `~/.ssh/elmoluz_deploy`
