# Momofolio

An interactive visualizer for the [Jupiter Lending Protocol](https://jup.ag) token ecosystem on Solana. Place tokens on a canvas, reveal their lending and liquidity relationships, and get an AI-generated analysis of the network configuration.

## Features

- **Token palette** — JLP, SOL, USDC, JTO, USDT, mSOL, jitoSOL, bSOL
- **Interactive canvas** — click to position tokens anywhere on screen
- **Animated connections** — glowing lines drawn between related token pairs with labeled relationship types
- **AI analysis** — network configuration analyzed by Claude via `window.claude.complete()`
- **Network stats** — token count, connection count, and network density

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Linting | ESLint 9 (flat config) |
| Formatting | Prettier |

## Project Structure

```
src/
├── components/
│   ├── JupiterLendingViz.jsx   # Main orchestrator component
│   ├── TokenPalette.jsx        # Left sidebar token selector
│   ├── PlacedToken.jsx         # Individual token on the canvas
│   ├── ConnectionCanvas.jsx    # Animated SVG connection lines
│   └── AnalysisPanel.jsx       # Bottom analysis card with stats
├── constants/
│   ├── tokens.js               # Token definitions (id, name, color, type)
│   └── relationships.js        # Relationship map and connection colors
├── hooks/
│   └── useTokenNetwork.js      # All state and animation logic
├── lib/
│   ├── supabase.js             # Supabase client initialization
│   └── data.js                 # Database query helpers
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project

### Setup

```bash
# 1. Clone the repo
git clone <repo-url>
cd Momofolio

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# 4. Start the dev server
npm run dev
```

### Environment Variables

| Variable | Description | Where to find |
|----------|-------------|---------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Supabase → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Supabase → Project Settings → API |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint on `src/` |
| `npm run format` | Auto-format `src/` with Prettier |

## How the Visualizer Works

1. **Select** a token from the palette on the left
2. **Click** anywhere on the dark canvas to place it
3. Repeat for at least two tokens
4. Click **Reveal Network** — connection lines animate between related token pairs
5. An AI analysis of the configuration appears at the bottom

Relationships are defined in `src/constants/relationships.js`. Each pair has a `type` (e.g. `lending-pair`, `derivative`, `governance`), a `strength` (0–1, maps to line thickness), and a description used in the AI prompt.

> **Note:** The AI analysis panel requires `window.claude.complete()` to be available in the runtime (i.e. running inside a Claude artifact). In a standalone dev server it falls back to a summary generated from the connection data.
