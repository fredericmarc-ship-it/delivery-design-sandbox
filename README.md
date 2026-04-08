# Delivery Design Sandbox

A React Native prototyping environment for Bolt Delivery designers. Build and test screens using real UIKit components with Claude Code.

## Quick start

See [GETTING_STARTED.md](./GETTING_STARTED.md) for the full setup guide.

```
npm install   # VPN required
npm start     # opens Expo
```

## How it works

This is a standalone Expo app with Bolt's design system (`@bolteu/rnc-react-uikit`) as a dependency. Designers use Claude Code to generate prototype screens. Claude reads two reference files:

- **CLAUDE.md** — Design tokens (colours, spacing, typography), Delivery screen patterns, prototyping rules
- **COMPONENTS.md** — UIKit component APIs, prop types, usage examples

Each prototype is a single `.tsx` file in `app/`. The home screen lists all available prototypes.

## Structure

```
delivery-design-sandbox/
├── app/
│   ├── _layout.tsx          # Root layout (don't modify)
│   ├── index.tsx            # Home screen — lists all prototypes
│   └── merchant-list.tsx    # Example prototype (golden reference)
├── CLAUDE.md                # Design tokens & patterns (Claude reads this)
├── COMPONENTS.md            # Component API reference (Claude reads this)
├── GETTING_STARTED.md       # Setup guide for designers
├── .npmrc                   # Internal package registry config
└── package.json
```

## Adding a prototype

1. Open Claude Code: `claude`
2. Describe the screen you want to build
3. Claude creates a `.tsx` file in `app/` and adds it to the home screen
4. The Expo preview updates automatically

## Maintainers

Frédéric Marc — Head of Product Design, Delivery
