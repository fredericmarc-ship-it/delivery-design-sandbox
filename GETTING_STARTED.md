# Getting Started — Delivery React Native Sandbox

Prototype Bolt Delivery screens using real design system components, powered by Claude Code. This sandbox uses **React Native** with Expo — the same component library as the production Delivery app.

> **New to Git?** Read the [Git & GitHub fundamentals for designers](link-to-mos-guide) guide first. This guide assumes you're comfortable with the basics.

## What you'll need

- A Mac with Terminal access
- VPN connected (required to pull Bolt packages)
- An iPhone with [Expo Go](https://apps.apple.com/app/expo-go/id982107779) installed (or use the web preview)
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) installed
- GitHub access to Boltable org

## 1. One-time machine setup

Open Terminal and run each block in order. Skip anything you've already done.

**Install Homebrew:**
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Install Node version manager:**
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc
nvm install 22
```

**Set up your SSH key for GitHub** (skip if you already have one):
```
ssh-keygen -t ed25519 -C "your.name@bolt.eu"
```
Press Enter three times. Then:
```
pbcopy < ~/.ssh/id_ed25519.pub
```
Go to [github.com/settings/ssh/new](https://github.com/settings/ssh/new), paste the key, save. Then at [github.com/settings/keys](https://github.com/settings/keys), click **Configure SSO** and **Authorize** for both `bolteu` and `boltable`.

## 2. Clone and install

Make sure your VPN is connected, then:
```
git clone git@github.com:boltable/delivery-design-sandbox.git
cd delivery-design-sandbox
npm install
```

That's it. No pnpm, no workspace setup, no native builds.

## 3. Run the sandbox

```
npm start
```

A QR code appears:

- **Phone**: Open Expo Go and scan the QR code (same WiFi required)
- **Web**: Press `w` to open in your browser

You'll see the sandbox home screen with any existing prototype screens listed. Tap **Merchant List** to see the example prototype.

## 4. Prototype with Claude Code

Open a new terminal tab:
```
cd ~/delivery-design-sandbox
claude
```

Claude Code automatically reads `CLAUDE.md` (design tokens, spacing, Delivery patterns) and `COMPONENTS.md` (component APIs, prop types). It knows Bolt's design system.

**Try a prompt:**

> "Create a checkout screen with a delivery address card, order items list with prices, a promo code row, price breakdown with delivery fee, and a Place Order button. Add it to the prototypes list on the home screen."

Claude Code will create a new `.tsx` file in `app/`, add it to the home screen list, and use real `@bolteu/rnc-react-uikit` components. The preview updates automatically.

## 5. More prompts to try

- "Build a bottom sheet for restaurant filters with cuisine chips and a sort option"
- "Create an order tracking screen with a map placeholder, progress stepper, and courier info"
- "Make a restaurant detail screen with a hero image, menu sections, and an Add to Cart button"
- "Add dark mode support to the checkout screen"

## 6. Save and share your work

```
git checkout -b your-name/what-youre-building
git add .
git commit -m "checkout screen prototype"
git push origin your-name/what-youre-building
```

Example: `sofia/order-tracking-exploration`

## Quick reference

| What | Where |
|---|---|
| Design tokens, colours, spacing, patterns | `CLAUDE.md` |
| Component APIs and prop types | `COMPONENTS.md` |
| Example prototype | `app/merchant-list.tsx` |
| Your prototypes go here | `app/your-screen-name.tsx` |

## Troubleshooting

**"command not found: nvm"** — Close and reopen terminal, or run `source ~/.zshrc`.

**npm install fails with registry errors** — Check your VPN is connected. The `@bolteu` packages come from an internal registry that requires VPN.

**"Permission denied (publickey)"** — Redo the SSH key steps. Make sure SSO is authorized for the `boltable` org.

**Phone can't scan QR code** — Use the Expo Go app, not the camera. Both devices need the same WiFi. If blocked, restart with `npm run tunnel`.

**Stuck?** Paste the error into Claude Code. It almost always knows what's wrong.
