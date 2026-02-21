# Homies

App para casais que moram juntos — controle de delivery, gastos no mercado, contas e lembretes.

## Funcionalidades

- **Delivery**: limite mensal, registro de pedidos e quem pediu
- **Mercado**: lançamentos de compras com atribuição por pessoa
- **Contas**: contas fixas com vencimento e status (pago/pendente)
- **Lembretes**: lista de lembretes com data e conclusão

## Tech Stack

- SvelteKit
- Tailwind CSS
- TypeScript

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/          # Button, Card, Input, Badge, Avatar, ProgressBar
│   │   ├── layout/      # Header, Sidebar, BottomNav
│   │   └── features/    # DeliveryLimitCard, BillCard, PersonBadge, etc.
│   ├── stores/          # Svelte stores com mock data
│   ├── types/
│   └── utils/
└── routes/
```
