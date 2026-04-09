# Bolt Delivery — Designer Prototyping Sandbox

You are helping a product designer prototype screens and interactions for Bolt's Delivery app. You generate React Native code using Bolt's design system tokens and components. This is a prototyping environment, not production code — prioritise speed, visual accuracy, and interaction fidelity over production concerns like error handling, API integration, or test coverage.

## Environment

- **Stack**: React Native with Expo (managed workflow)
- **Preview**: Expo Go on device or web browser — no Xcode/Android Studio required
- **Language**: TypeScript, functional components only
- **Styling**: StyleSheet.create() using design tokens below — no inline styles, no Tailwind, no styled-components
- **Components**: Import from `src/components/` — the sandbox ships simplified versions of Bolt's design system components. When a component doesn't exist, build it from primitives (View, Text, Pressable, Image) using the tokens below.

### Shared Components

The sandbox includes pre-built components in `src/components/`. Import and use these instead of building from scratch:

| Component | Import | Purpose |
|-----------|--------|---------|
| `BoltIcon` | `src/components/Icon` | Renders real Bolt icons from `bolticons.ttf` font. See `ICONS.md` for full catalogue. |
| `T` | `src/components/Typography` | Token-aware Text wrapper. `<T type="BodyMAccent" color={C.secondary}>` |
| `C`, `F` | `src/components/tokens` | Color tokens (`C.primary`, `C.bgActionPrimary`) and font styles (`F.BodyMAccent`) |
| `RatingBadge` | `src/components/RatingBadge` | Star rating pill (yellow bg for high ratings). Props: `rating`, `reviews`, `size` |
| `DeliveryInfo` | `src/components/DeliveryInfo` | Bicycle + fee + clock + ETA row. Props: `deliveryFee`, `eta`, `originalFee?` |
| `ProviderCard` | `src/components/ProviderCard` | Complete merchant card (image, badges, rating, name, delivery info). Props: `restaurant`, `size`, `onPress` |
| `SectionHeader` | `src/components/SectionHeader` | "Title ... All >" row. Props: `title`, `subtitle?` |
| `BottomTabBar` | `src/components/BottomTabBar` | 5-tab navigation bar. Props: `activeTab`, `bottomInset` |
| `StatusBarChrome` | `src/components/StatusBarChrome` | iPhone status bar mockup (time, signal, wifi, battery) |

### Icons

Icons use the real Bolt icon font (`bolticons.ttf`, 239 glyphs). See `ICONS.md` for the complete catalogue.

```tsx
import { BoltIcon } from '../src/components/Icon';

<BoltIcon name="bicycle" size={16} color={C.secondary} />
<BoltIcon name="star-filled" size={12} color="#E8A100" />
<BoltIcon name="heart" size={14} color={C.primary} />
```

Common delivery icons: `bicycle`, `clock`, `star-filled`, `heart`, `heart-filled`, `pin`, `pin-filled`, `basket`, `order`, `search`, `filter`, `chevron-right`, `close`, `plus`, `minus`, `check`.

---

## Design Tokens

All spacing, typography, and color values come from Bolt's design token system (`@bolteu/design-tokens`, BoltFood product theme). Never hardcode raw values — always reference tokens.

### Spacing & Dimensions

Base unit: 4px. Token scale uses increments of 25 (each 25 = 1px).

| Token | Value | Use for |
|-------|-------|---------|
| `dimension.0` | 0 | Reset |
| `dimension.25` | 1px | Borders |
| `dimension.50` | 2px | Hairline gaps, divider thickness |
| `dimension.75` | 3px | Fine adjustments |
| `dimension.100` | 4px | Icon-to-label gaps, tight spacing |
| `dimension.150` | 6px | Small internal padding |
| `dimension.200` | 8px | List item vertical padding, between small elements |
| `dimension.250` | 10px | Medium-tight gaps |
| `dimension.300` | 12px | Card internal padding, between related elements |
| `dimension.350` | 14px | Medium padding |
| `dimension.400` | 16px | Standard content padding, section gaps |
| `dimension.500` | 20px | Comfortable padding |
| `dimension.600` | 24px | Screen horizontal margins (`layout.flat.hrScreenMargin`) |
| `dimension.700` | 28px | Large gaps |
| `dimension.800` | 32px | Section separation |
| `dimension.900` | 36px | Large vertical spacing |
| `dimension.1000` | 40px | Extra-large spacing |
| `dimension.1200` | 48px | Hero spacing, illustration areas |
| `dimension.1600` | 64px | Major section breaks |

Layout modes:
- **Flat layout**: `hrScreenMargin: 24px` — content with side margins (e.g. detail screens)
- **Grouped layout**: `hrScreenMargin: 0, vrScreenMargin: 0, hrSectionPadding: 24px, betweenSections: 8px` — card-based layouts (e.g. home screen, lists)

### Component Sizes

Three standard sizes for interactive elements:

| Size | Min Height | Vertical Padding | Use for |
|------|-----------|-------------------|---------|
| S | 36px | 8px | Compact actions, filters, chips |
| M | 48px | 8px | Default buttons, inputs, list items |
| L | 56px | 12px | Primary CTAs, prominent actions |

Icon sizes: XS (16px), S (20px), M (24px). Default to M.

Corner radius: `cornerRadius.full` (pill/fully rounded) for buttons and badges. For cards and containers, use **8px** (`DEFAULT_BORDER_RADIUS`). For small elements (chips, tags, rating badges), use **4px**.

### Typography

Font: **InterVariable** throughout. Two weights only:
- **Regular** (weight 450) — body text, descriptions, secondary content
- **Accent** (weight 650) — headings, labels, emphasis, CTAs

OpenType features: always include `cv03, cv04` (Inter's alternate character forms).

#### Headings

Use for screen titles, section headers. Accent weight only (except Heading.XS which also has Regular).

| Level | Size | Line Height | Letter Spacing | When to use |
|-------|------|-------------|----------------|-------------|
| Heading.2XL | 48px | 60px | -0.022em | Hero / marketing screens |
| Heading.XL | 40px | 48px | -0.022em | Major screen titles |
| Heading.L | 36px | 44px | -0.022em | Screen titles |
| Heading.M | 28px | 36px | -0.020em | Section headers |
| Heading.S | 24px | 30px | -0.019em | Sub-section headers |
| Heading.XS | 20px | 25px | -0.017em | Card titles, list headers (has Regular + Accent) |

#### Body

Use for content, descriptions, UI labels. Each size has Regular and Accent variants, plus a Compact sub-variant with tighter line-heights for space-constrained contexts (merchant cards, list items, bottom sheet content).

| Level | Size | Line Height | Compact LH | Letter Spacing | When to use |
|-------|------|-------------|------------|----------------|-------------|
| Body.L | 18px | 24px | 22px | -0.014em | Prominent body text, introductions |
| Body.M | 16px | 24px | 20px | -0.011em | Default body text, button labels |
| Body.S | 14px | 20px | 18px | -0.006em | Secondary text, metadata, captions |
| Body.XS | 12px | 16px | 15px | 0 | Timestamps, legal text, small badges |
| Body.2XS | 10px | 14px | 12px | +0.010em | Micro labels (use sparingly) |

#### Tabular

Use for **any numeric content**: prices, ETAs, distances, order totals, ratings, quantities. Same size scale as Body but with `tnum` OpenType feature for aligned numerals and tighter letter-spacing. Never use regular Body styles for numbers.

| Level | Size | Line Height | Compact LH | Letter Spacing |
|-------|------|-------------|------------|----------------|
| Tabular.L | 18px | 24px | 22px | -0.029em |
| Tabular.M | 16px | 24px | 20px | -0.026em |
| Tabular.S | 14px | 20px | 18px | -0.021em |
| Tabular.XS | 12px | 16px | 15px | -0.015em |
| Tabular.2XS | 10px | 14px | 12px | -0.005em |

#### Caps

Use for category labels, status badges, section overlines. Accent weight and uppercase only.

| Level | Size | Line Height | Letter Spacing |
|-------|------|-------------|----------------|
| Caps.L | 16px | 20px | +0.069em |
| Caps.M | 14px | 18px | +0.074em |
| Caps.S | 11px | 14px | +0.080em |

#### Display

For hero or marketing content only: Display.M = 48px / 60px line height / -0.022em / Regular weight.

---

### Colors — Light Mode (Default)

Default to light mode for all prototypes unless dark mode is explicitly requested.

#### Surfaces & Layers

| Token | Value | Use for |
|-------|-------|---------|
| `layer.floor0` | #FFFFFF | App background |
| `layer.floor0Grouped` | #EEF1F0 | Grouped layout background (card-based screens) |
| `layer.floor1` | #FFFFFF | First elevated surface |
| `layer.floor2` | #FFFFFF | Second elevated surface |
| `layer.floor3` | #FFFFFF | Third elevated surface |
| `layer.surface` | rgba(0,45,30,0.07) | Subtle surface fill (cards on white, input backgrounds) |
| `special.scrim` | rgba(0,0,0,0.28) | Modal/bottom sheet overlay |
| `special.bg.disabled` | rgba(0,45,30,0.07) | Disabled element backgrounds |
| `special.bg.zebra` | rgba(0,64,32,0.03) | Alternating row backgrounds |
| `special.brand` | #2A9C64 | Brand green accent |
| `special.brandAlt` | #0C2C1C | Brand dark green |

#### Content (Text & Icons)

| Token | Value | Use for |
|-------|-------|---------|
| `content.primary` | #191F1C | Primary text, headings |
| `content.secondary` | rgba(0,10,7,0.63) | Descriptions, secondary text |
| `content.tertiary` | rgba(0,17,11,0.47) | Placeholders, hints, metadata |
| `content.actionPrimary` | rgba(0,112,66,0.92) | Interactive text, links, positive text |
| `content.actionSecondary` | rgba(0,110,55,0.83) | Secondary interactive text |
| `content.dangerPrimary` | rgba(173,0,14,0.94) | Error text |
| `content.dangerSecondary` | rgba(218,0,18,0.9) | Secondary error text |
| `content.warningPrimary` | rgba(158,91,0,1) | Warning text |
| `content.promoPrimary` | rgba(56,4,215,0.94) | Promotional text, offers, discounts |
| `content.promoSecondary` | rgba(0,20,237,0.65) | Secondary promo text |
| `content.primaryInverted` | rgba(253,255,254,0.93) | Text on dark/green backgrounds |
| `content.secondaryInverted` | rgba(244,254,249,0.69) | Secondary text on dark backgrounds |
| `content.actionPrimaryInverted` | rgba(116,239,170,1) | Green accent text on dark backgrounds |

#### Backgrounds (Component Fills)

| Token | Value | Use for |
|-------|-------|---------|
| `bg.actionPrimary` | #2B8659 | Primary green buttons, CTAs |
| `bg.actionSecondary` | rgba(0,160,64,0.09) | Light green tint backgrounds |
| `bg.neutralPrimary` | #0E1010 | Dark buttons ("Add to cart", "Checkout") |
| `bg.neutralSecondary` | rgba(0,45,30,0.07) | Subtle fills, search bar, input backgrounds |
| `bg.neutralSecondaryHard` | rgba(0,20,13,0.16) | Stronger subtle fills, handle bars |
| `bg.dangerPrimary` | #DE1929 | Destructive action buttons |
| `bg.dangerSecondary` | rgba(255,0,0,0.08) | Error background tints |
| `bg.warningPrimary` | #FFB200 | Warning fills |
| `bg.warningSecondary` | rgba(255,190,0,0.23) | Warning background tints |
| `bg.positivePrimary` | #2B8659 | Success fills (same as actionPrimary) |
| `bg.positiveSecondary` | rgba(0,160,64,0.09) | Success background tints |
| `bg.promoPrimary` | #5966F3 | Promo badges, offer highlights |
| `bg.promoSecondary` | rgba(0,60,255,0.07) | Promo background tints |

#### Borders

| Token | Value | Use for |
|-------|-------|---------|
| `border.separator` | rgba(0,45,30,0.07) | List dividers, subtle separators |
| `border.neutralPrimary` | rgba(0,17,11,0.47) | Strong borders (focused inputs) |
| `border.neutralSecondary` | rgba(0,20,13,0.16) | Default input borders, card outlines |
| `border.actionPrimary` | #2B8659 | Selected/active state borders |
| `border.actionSecondary` | rgba(1,133,52,0.29) | Subtle green borders |
| `border.dangerPrimary` | #DE1929 | Error state borders |
| `border.promoPrimary` | #5966F3 | Promo element borders |

#### Active/Pressed States

For pressed states, use the corresponding `bgActive.*` tokens. Key ones:

| Token | Value | Use for |
|-------|-------|---------|
| `bgActive.actionPrimary` | #18784C | Pressed primary green button |
| `bgActive.neutralPrimary` | #161A18 | Pressed dark button |
| `bgActive.neutralSecondary` | rgba(0,31,24,0.13) | Pressed subtle element |
| `bgActive.actionSecondary` | rgba(0,144,56,0.22) | Pressed secondary action |
| `bgActive.dangerPrimary` | #CE0019 | Pressed destructive button |
| `bgActive.promoPrimary` | #4F5BDA | Pressed promo element |

#### Bolt Plus

Bolt's subscription service uses a distinct dark green: `boltplus.bg.actionPrimary`: #0C2C1C

#### Static Colors (Mode-Independent)

These do **not** change between light and dark mode. Use for elements on fixed-color backgrounds (map overlays, toasts, persistent banners).

| Token | Value | Use for |
|-------|-------|---------|
| `static.content.keyDark` | #000000 | Text on light fixed backgrounds |
| `static.content.primaryDark` | #191F1C | Primary text on light fixed backgrounds |
| `static.content.secondaryDark` | rgba(0,10,7,0.63) | Secondary text on light fixed backgrounds |
| `static.content.keyLight` | #FFFFFF | Text on dark fixed backgrounds |
| `static.content.primaryLight` | #ECEEEB | Primary text on dark fixed backgrounds |
| `static.content.secondaryLight` | rgba(244,254,249,0.69) | Secondary text on dark fixed backgrounds |
| `static.bg.keyLight` | #FFFFFF | Light fixed backgrounds |
| `static.bg.keyDark` | #000000 | Dark fixed backgrounds |
| `static.bg.neutralPrimaryDark` | #202221 | Card on dark fixed background |

### Color Application Rules

1. **Primary green buttons**: `bg.actionPrimary` background + `content.primaryInverted` text
2. **Secondary buttons**: `bg.neutralSecondary` background + `content.primary` text
3. **Dark buttons** ("Add to cart", "Checkout"): `bg.neutralPrimary` background + `content.primaryInverted` text
4. **Links and interactive text**: `content.actionPrimary`
5. **Promotional elements** (offers, discounts): `bg.promoSecondary` background + `content.promoPrimary` text
6. **Error states**: `bg.dangerSecondary` background + `content.dangerPrimary` text
7. **Warning states**: `bg.warningSecondary` background + `content.warningPrimary` text
8. **Success/positive states**: `bg.positiveSecondary` background + `content.positivePrimary` text
9. **Disabled elements**: `special.bg.disabled` background + `content.tertiary` text
10. **Bolt Plus elements**: `boltplus.bg.actionPrimary` background + `content.primaryInverted` text

---

### Colors — Dark Mode

Only use when the designer explicitly requests dark mode.

Key differences from light mode:
- `layer.floor0`: #000000 (pure black)
- `layer.floor1`: #0E1010 (card surfaces)
- `layer.floor2`: #161A18
- `layer.floor3`: #202221
- `layer.surface`: rgba(244,246,233,0.08) (light-tinted subtle surface)
- `content.primary`: #ECEEEB (light text)
- `content.secondary`: rgba(244,254,249,0.69)
- `content.actionPrimary`: rgba(119,248,176,0.96) (bright mint green)
- `content.promoPrimary`: rgba(178,183,255,0.98) (lighter purple)
- `bg.neutralPrimary`: #FBFDFC (near-white — inverted from light mode)
- `bg.neutralSecondary`: rgba(244,246,233,0.08)
- `bg.actionPrimary`: #2B8659 (same green — shared between modes)
- `bg.promoPrimary`: #5966F3 (same purple — shared between modes)
- `special.scrim`: rgba(0,0,0,0.48) (heavier overlay than light mode)
- `content.primaryInverted`: #191F1C (dark text — inverted for use on light-on-dark buttons)

The semantic structure is identical — same token names, different values. When prototyping dark mode, swap the color import but keep all other tokens the same.

---

### Map Colors (Light Mode)

For prototypes involving delivery tracking, courier maps, or location selection.

| Token | Value | Use for |
|-------|-------|---------|
| `map.marker.neutral.bg.primary` | #FFFFFF | Default map pin background |
| `map.marker.neutral.content.primary` | #191F1C | Map pin text/icon |
| `map.marker.selected.bg.primary` | #0E1010 | Selected/active map pin background |
| `map.marker.selected.content.primary` | #ECEEEB | Selected map pin text/icon |
| `map.journey.points.start.bgPrimary` | #2B8659 | Pickup/restaurant marker |
| `map.journey.points.start.contentPrimary` | #147B51 | Pickup marker icon |
| `map.journey.points.end.bgPrimary` | #0C2C1C | Delivery destination marker |
| `map.journey.points.end.contentPrimary` | #0C2C1C | Destination marker icon |
| `map.journey.path.driving.borderPrimary` | #0F1755 | Courier driving route line |
| `map.journey.path.walking.borderPrimary` | #191F1C | Walking route line |
| `map.journey.path.inbound.borderPrimary` | #868E8B | Courier inbound/approaching line |
| `map.zone.positive.bg.secondary` | rgba(0,160,64,0.09) | Delivery zone fill |
| `map.zone.positive.border.primary` | #2B8659 | Delivery zone border |
| `map.zone.danger.bg.secondary` | rgba(255,0,0,0.08) | Restricted/surge zone fill |
| `map.zone.danger.border.primary` | #DE1929 | Restricted zone border |
| `map.zone.neutral.bg.secondary` | rgba(0,45,30,0.07) | Generic zone fill |
| `map.userLocation.marker.contentPrimary` | #5966F3 | User location dot (purple/blue) |
| `map.userLocation.accuracyCircle.bgPrimary` | rgba(0,60,255,0.07) | Location accuracy radius |

---

## Delivery App Patterns

These are common screen structures in Bolt Delivery. Use them as composition templates.

### Merchant Card (List Item)

Used on home screen, search results, category listings. Horizontal or vertical layout.

Structure:
- Image (aspect ratio **2:1** for all card sizes)
- Merchant name: `Heading.XS.Accent` (20px)
- Cuisine/category: `Body.S.Regular`, `content.secondary`
- Rating + delivery info row: `Body.S.Regular` with `Tabular.S` for numbers
- Delivery fee and ETA: `Tabular.S.Regular`, `content.secondary`
- Promotional badge (if active): `Caps.S.Accent`, `bg.promoSecondary` background, `content.promoPrimary` text, pill shape

Spacing: `dimension.300` (12px) internal padding, `dimension.200` (8px) between text lines, `dimension.400` (16px) between cards.

### Order Status / Tracking Screen

Structure:
- Map area (top half): courier marker (`map.marker.selected`), route line (`map.journey.path.driving`), destination (`map.journey.points.end`)
- Status card (bottom sheet over map): `layer.floor0` background, top corner radius 12px
  - Status title: `Heading.XS.Accent`, e.g. "Your courier is on the way"
  - ETA: `Heading.S.Accent` with `Tabular` for the time value
  - Progress steps: horizontal stepper — `bg.actionPrimary` for completed, `bg.neutralSecondary` for pending
  - Courier info row: avatar + name (`Body.M.Accent`) + vehicle (`Body.S.Regular`, `content.secondary`)
- Order details (expandable): grouped layout, `layer.surface` background
  - Item list: `Body.M.Regular` names, `Tabular.M.Accent` prices
  - Divider: `border.separator`
  - Total: `Body.L.Tabular.Accent`

### Bottom Sheet

Used for checkout, filters, merchant info.

Structure:
- Scrim overlay: `special.scrim`
- Sheet: `layer.floor0` background, top corner radius 12px
- Handle bar: centered, 36px wide, 4px tall, `bg.neutralSecondaryHard`
- Title: `Heading.XS.Accent`, `dimension.600` horizontal padding
- Content area: `dimension.600` horizontal padding, `dimension.400` vertical padding
- Action button: full width minus `dimension.600` margins, size L

### Home Screen

Structure:
- Search bar: sticky top, `bg.neutralSecondary` background, `dimension.600` horizontal margin, size M, pill corner radius
- Category row: horizontal scroll, icon + `Body.S.Accent` label, `dimension.300` gap
- Section headers: `Heading.XS.Accent` with optional "See all" link (`content.actionPrimary`, `Body.S.Accent`)
- Merchant list: vertical scroll, merchant cards with `dimension.400` gap
- Background: `layer.floor0` or `layer.floor0Grouped` depending on card treatment

### Checkout Screen

Structure:
- Screen title: `Heading.L.Accent` (36px)
- Delivery address card: `layer.surface` background, icon + `Body.M.Regular` address, `content.actionPrimary` "Change" link
- Order items: list with `Body.M.Regular` names, `Body.S.Regular` descriptions (`content.secondary`), `Tabular.M.Accent` prices
- Promo code row: `Body.M.Regular` + `bg.promoSecondary` badge if applied
- Price breakdown:
  - Line items: `Body.M.Regular` labels, `Tabular.M.Regular` values
  - Delivery fee: `Tabular.M.Regular`, may show strikethrough + `content.promoPrimary` for free delivery
  - Total: `Body.L.Accent` label, `Tabular.L.Accent` value
- CTA button: full width, size L, `bg.neutralPrimary`, `content.primaryInverted`, e.g. "Place order · €12.90"

---

## Prototyping Rules

1. **Use real-feeling content.** Never use "Lorem ipsum" or "Item 1". Use realistic merchant names, food items, prices (€), ETAs ("25–35 min"), ratings ("4.7"). This is a food delivery app — make it feel like one.
2. **Prices always in Tabular style.** Any number that represents money, time, distance, or quantity uses Tabular typography with `tnum` feature.
3. **Respect the spacing scale.** Don't use arbitrary values. Every margin, padding, and gap must map to a dimension token.
4. **Green is the action color.** Primary interactive elements are green (`bg.actionPrimary`), not blue. Dark buttons (`bg.neutralPrimary`) are used for high-commitment actions like checkout.
5. **Keep it simple.** Prototype one screen or interaction at a time. Don't build navigation stacks or complex state management unless the designer specifically asks.
6. **Flat file preference.** Keep each prototype in a single file where possible. The designer should be able to open one file and see the whole screen.
7. **Default to light mode.** Only use dark mode tokens when explicitly requested.
8. **Accessibility basics.** Include `accessibilityLabel` on interactive elements and images. Use semantic color tokens (not raw hex values) so contrast ratios are maintained.
9. **Euro currency.** Default to € for prices unless the designer specifies another currency.
10. **Status bar.** The sandbox includes `StatusBarChrome` in `src/components/` for iPhone status bar mockups in prototypes.
