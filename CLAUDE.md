# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
npm run check      # Type-check with svelte-check
```

There are no tests configured in this project.

## Architecture

**Homies** is a SvelteKit app (Portuguese UI) for couples to track delivery spending, grocery purchases, bills, and reminders.

### State management

All state lives in Svelte writable stores under `src/lib/stores/`. Each domain (delivery, market, bills, reminders, profiles) has its own store file that exports:
- The writable store itself
- Action functions (add, remove, toggle) that call `store.update()`

All stores are re-exported from `src/lib/stores/index.ts` — always import from `$lib/stores`, not individual store files.

Data is **in-memory mock data only** — there is no backend, database, or localStorage persistence. State resets on page refresh.

### Profiles

Two hardcoded profiles exist in `src/lib/stores/profiles.ts` (Zé and Naki). Every domain entity (`DeliveryOrder`, `MarketEntry`, `Bill`, `Reminder`) links to a profile via `profileId`. Pages look up the profile from the `$profiles` store by id when rendering.

### Routing

Routes map directly to features:
- `/` — dashboard overview
- `/delivery` — delivery orders + monthly limit
- `/mercado` — grocery entries
- `/contas` — bills
- `/lembretes` — reminders

### Component layers

- `src/lib/components/ui/` — generic, reusable primitives (Button, Card, Input, Badge, Avatar, ProgressBar, EmptyState, PageSection, ProfileSelect, RemoveButton)
- `src/lib/components/layout/` — shell components (Header, Sidebar for desktop, BottomNav for mobile)
- `src/lib/components/features/` — domain-specific display components (BillCard, DeliveryLimitCard, MarketEntryRow, PersonBadge, ReminderRow)

### Responsive layout

The app uses a responsive shell in `src/routes/+layout.svelte`:
- Mobile: fixed top `Header` + fixed bottom `BottomNav`
- Desktop (`lg:`): `Sidebar` on the left (fixed, `w-56`), no BottomNav

### Styling

Custom Tailwind color palette (`tailwind.config.js`):
- `cream-*` — background/surface tones
- `forest-*` — primary green (Zé's profile color, interactive elements)
- `velvet-*` — secondary rose/mauve (Naki's profile color)
- `ink-*` — text/neutral tones

### Utilities

`src/lib/utils/format.ts` provides `formatCurrency` (BRL), `formatDate`, `formatShortDate`, and `parseAmount` (handles Brazilian comma-decimal input like `"45,90"`).
