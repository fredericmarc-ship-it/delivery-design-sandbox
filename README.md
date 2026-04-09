# Delivery Design Sandbox

A React Native prototyping environment for Bolt Delivery designers. Build and test screens using real design system tokens with Claude Code.

## Quick start

See [GETTING_STARTED.md](./GETTING_STARTED.md) for the full setup guide.

```
npm install   # VPN required for @bolteu packages
npm start     # opens Expo
```

## What's inside

A complete four-screen Delivery flow that works as a baseline for prototyping:

```
Home (restaurant list)
  ↓ tap restaurant
Restaurant Detail (menu, add to basket)
  ↓ tap basket
Checkout (order summary, price breakdown)
  ↓ place order
Order Tracking (progress stepper, courier info, live ETA)
```

The flow includes shared basket state — add a dish on the restaurant screen, see it in checkout, see it in order tracking. This is what Figma can't do.

The tracking screen simulates order progression: it moves through "Order placed → Preparing → On the way → Delivered" automatically, with the ETA counting down.

## How to prototype

Use Claude Code to modify any screen or build new ones. Claude reads two reference files:

- **CLAUDE.md** — Design tokens (colours, spacing, typography), Delivery screen patterns, prototyping rules
- **COMPONENTS.md** — UIKit component APIs, prop types, usage examples

**Examples of what to try:**

- "Redesign the checkout screen with a different price breakdown layout"
- "Add a dish customisation bottom sheet when tapping a menu item"
- "Create a re-order flow from the tracking screen"
- "Add a horizontal restaurant carousel above the main list"
- "Build a search screen with live filtering"

## Structure

```
delivery-design-sandbox/
├── app/
│   ├── _layout.tsx          # Root layout with BasketProvider
│   ├── index.tsx            # Home — search, categories, merchant list
│   ├── provider/[id].tsx    # Restaurant detail — menu, add to basket
│   ├── checkout.tsx         # Checkout — order summary, place order
│   └── tracking.tsx         # Order tracking — stepper, courier, ETA
├── src/
│   ├── basket.tsx           # Shared basket state (React Context)
│   └── data.tsx             # Mock restaurants and menu data
├── CLAUDE.md                # Design tokens & patterns (Claude reads this)
├── COMPONENTS.md            # Component API reference (Claude reads this)
├── GETTING_STARTED.md       # Setup guide for designers
├── .npmrc                   # Internal package registry config
└── package.json
```

## Maintainers

Frédéric Marc — Head of Product Design, Delivery
