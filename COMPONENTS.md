# Shared Components

Import these from `src/components/` in your screen files.

## BoltIcon

Renders real Bolt icons from the `bolticons.ttf` font (239 glyphs available).

```tsx
import { BoltIcon } from '../src/components/Icon';

<BoltIcon name="bicycle" size={16} color={C.secondary} />
<BoltIcon name="star-filled" size={12} color="#E8A100" />
<BoltIcon name="home-filled" size={24} color={C.primary} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Icon name from bolticons — see ICONS.md |
| `size` | `number` | `24` | Icon size in px |
| `color` | `string` | `'#191F1C'` | Icon color |

## T (Typography)

Token-aware Text wrapper. Uses font styles from `tokens.ts`.

```tsx
import { T } from '../src/components/Typography';

<T type="HeadingS">Section Title</T>
<T type="BodyMRegular" color={C.secondary}>Description text</T>
<T type="TabSRegular" color={C.actionPrimary}>€12.90</T>
```

Available types (see tokens.ts for full list):
- **Headings**: HeadingXS (20px), HeadingS (24px), HeadingM (28px), HeadingL (36px)
- **Body**: BodyLAccent/Regular (18px), BodyMAccent/Regular (16px), BodySAccent/Regular (14px), BodyXSAccent/Regular (12px)
- **Tabular** (for numbers): TabLAccent/Regular, TabMAccent/Regular, TabSAccent/Regular, TabXSAccent/Regular
- Weight: Regular = 450, Accent = 650

## C (Colors) and F (Font Styles)

```tsx
import { C, F, SCREEN_PADDING_H, DEFAULT_BORDER_RADIUS } from '../src/components/tokens';

// Colors
C.primary           // #191F1C — primary text
C.secondary         // rgba(0,10,7,0.63) — descriptions
C.tertiary          // rgba(0,17,11,0.47) — placeholders
C.actionPrimary     // rgba(0,112,66,0.92) — green interactive text
C.bgActionPrimary   // #2B8659 — green button bg
C.bgNeutralPrimary  // #0E1010 — dark button bg
C.bgNeutralSecondary // rgba(0,45,30,0.07) — search bar, input bg
C.bgDangerPrimary   // #DE1929 — red badges, destructive
C.primaryInverted   // rgba(253,255,254,0.93) — white text on dark bg

// Layout constants
SCREEN_PADDING_H    // 24px
DEFAULT_BORDER_RADIUS // 8px
```

## RatingBadge

Star rating pill with yellow background for high ratings (>= 4.6).

```tsx
import { RatingBadge } from '../src/components/RatingBadge';

<RatingBadge rating="4.8" reviews="500+" size="small" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rating` | `string` | required | Rating value |
| `reviews` | `string` | required | Review count label |
| `size` | `'small' \| 'medium'` | `'small'` | Badge size |

## DeliveryInfo

Delivery fee + ETA row with bicycle and clock icons.

```tsx
import { DeliveryInfo } from '../src/components/DeliveryInfo';

<DeliveryInfo deliveryFee="Free delivery" eta="15–25 min" size="M" />
<DeliveryInfo deliveryFee="0,00 €" originalFee="1,90 €" eta="25–40 min" size="L" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `deliveryFee` | `string` | required | Fee text (green if free) |
| `originalFee` | `string?` | — | Strikethrough original price |
| `eta` | `string` | required | Delivery time estimate |
| `size` | `'M' \| 'L'` | `'M'` | M = 12px icons, L = 16px icons |
| `isFree` | `boolean?` | — | Force free delivery styling |

## ProviderCard

Complete merchant card matching production Bolt Food layout.

```tsx
import { ProviderCard } from '../src/components/ProviderCard';

<ProviderCard restaurant={restaurant} size="M" onPress={() => navigate(restaurant.id)} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `restaurant` | `Restaurant` | required | From src/data.tsx |
| `size` | `'M' \| 'L'` | `'L'` | M = 210px grid card, L = full-width |
| `onPress` | `() => void` | — | Tap handler |

Card structure:
- Image: **2:1 aspect ratio**, **8px** border radius
- Campaign badge: red (#DE1929), top-left, 4px radius
- Heart icon: white circle, top-right
- Rating badge: bottom-right (yellow for high ratings)
- Name: BodyMAccent (M) / BodyLAccent (L) + optional Bolt Plus badge
- DeliveryInfo row below

## SectionHeader

Section title with "All >" link.

```tsx
import { SectionHeader } from '../src/components/SectionHeader';

<SectionHeader title="Bolt Plus offers" />
<SectionHeader title="Recommended for you" subtitle="Based on past orders" />
```

## BottomTabBar

5-tab navigation bar with real Bolt icons.

```tsx
import { BottomTabBar } from '../src/components/BottomTabBar';

<BottomTabBar activeTab="Home" bottomInset={insets.bottom} />
```

Tabs: Home, Stores, Search, DineOut, Account.

## StatusBarChrome

iPhone status bar mockup for prototype fidelity.

```tsx
import { StatusBarChrome } from '../src/components/StatusBarChrome';

<StatusBarChrome />
```

Renders time (15:31), Dynamic Island, signal/wifi/battery indicators.
