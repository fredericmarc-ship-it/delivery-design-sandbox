# Bolt UIKit — Component Reference

Import all components from `@bolteu/rnc-react-uikit` unless otherwise noted.

```tsx
import { Text, Button, Icon, ListItem, Badge, Chip, SearchInput, TextInput } from '@bolteu/rnc-react-uikit';
```

Bottom sheet is a separate package:
```tsx
import { BottomSheet } from '@bolteu/uikit-bottom-sheet';
```

---

## Text

The primary typography component. Wraps React Native's `Text` with the design token type system.

```tsx
<Text type="HeadingXS">Restaurant Name</Text>
<Text type="BodyMRegular" color={Colors.content.secondary}>Description text</Text>
<Text type="BodyTabularSAccent">€12.90</Text>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `type` | `FontTypeName` | Typography style (see full list below). If omitted, inherits parent style. |
| `color` | `Colors` | Semantic color token. If omitted, defaults to `content.primary`. |
| `intlId` | `string` | Translation key (for production i18n — skip in prototypes, use children instead). |
| `animated` | `boolean` | Use Animated.Text internally. |
| `noDefaults` | `boolean` | Skip default text styling. |

### FontTypeName — Complete List

**Headings** (Accent/Semibold weight only):

| Type Name | Size | Line Height | Use for |
|-----------|------|-------------|---------|
| `HeadingXS` | 20px | 24px | Card titles, list headers |
| `HeadingS` | 24px | 30px | Sub-section headers |
| `HeadingM` | 28px | 36px | Section headers |
| `HeadingL` | 36px | 44px | Screen titles |
| `HeadingXL` | 40px | 48px | Major screen titles |
| `Heading2XL` | 48px | 56px | Hero / marketing |

**Body** (Regular = weight 450, Accent = weight 650):

| Type Name | Size | Line Height | Use for |
|-----------|------|-------------|---------|
| `BodyLRegular` | 18px | 24px | Prominent body text |
| `BodyLAccent` | 18px | 24px | Emphasised body text, button labels (regular size) |
| `BodyMRegular` | 16px | 24px | Default body text, descriptions |
| `BodyMAccent` | 16px | 24px | Labels, emphasised inline text, button labels (small size) |
| `BodySRegular` | 14px | 20px | Secondary text, metadata |
| `BodySAccent` | 14px | 20px | Small labels, emphasised metadata |
| `BodyXSRegular` | 12px | 16px | Timestamps, legal text |
| `BodyXSAccent` | 12px | 16px | Small badges, emphasised micro text |
| `Body2XSRegular` | 10px | 14px | Micro labels (use sparingly) |
| `Body2XSAccent` | 10px | 14px | Micro labels emphasised |

**Body Compact** (tighter line-height for space-constrained contexts):

| Type Name | Size | Line Height | Use for |
|-----------|------|-------------|---------|
| `BodyCompactLRegular` | 18px | 22px | Compact large body |
| `BodyCompactLAccent` | 18px | 22px | Compact large emphasised |
| `BodyCompactMRegular` | 16px | 20px | Merchant cards, list items |
| `BodyCompactMAccent` | 16px | 20px | Merchant card titles in lists |
| `BodyCompactSRegular` | 14px | 18px | Compact metadata |
| `BodyCompactSAccent` | 14px | 18px | Compact emphasised metadata |
| `BodyCompactXSRegular` | 12px | 15px | Compact micro text |
| `BodyCompactXSAccent` | 12px | 15px | Compact micro emphasised |
| `BodyCompact2XSRegular` | 10px | 12px | Smallest compact text |
| `BodyCompact2XSAccent` | 10px | 12px | Smallest compact emphasised |

**Body Tabular** (for prices, ETAs, ratings — all numeric content):

Always use Tabular types for numbers. They enable `tabular-nums` for aligned digits.

| Type Name | Size | Line Height | Use for |
|-----------|------|-------------|---------|
| `BodyTabularLRegular` | 18px | 24px | Large prices, totals |
| `BodyTabularLAccent` | 18px | 24px | Emphasised totals, order total |
| `BodyTabularMRegular` | 16px | 24px | Standard prices |
| `BodyTabularMAccent` | 16px | 24px | Emphasised prices, line item totals |
| `BodyTabularSRegular` | 14px | 20px | Delivery fees, small prices |
| `BodyTabularSAccent` | 14px | 20px | Emphasised small prices |
| `BodyTabularXSRegular` | 12px | 16px | Micro prices, timestamps |
| `BodyTabularXSAccent` | 12px | 16px | Emphasised micro prices |
| `BodyTabular2XSRegular` | 10px | 14px | Tiny numeric labels |
| `BodyTabular2XSAccent` | 10px | 14px | Tiny numeric labels emphasised |

**Body Tabular Compact** (tabular nums + tight line-height):

| Type Name | Size | Line Height |
|-----------|------|-------------|
| `BodyTabularLCompactRegular` | 18px | 22px |
| `BodyTabularLCompactAccent` | 18px | 22px |
| `BodyTabularMCompactRegular` | 16px | 20px |
| `BodyTabularMCompactAccent` | 16px | 20px |
| `BodyTabularSCompactRegular` | 14px | 18px |
| `BodyTabularSCompactAccent` | 14px | 18px |
| `BodyTabularXSCompactRegular` | 12px | 15px |
| `BodyTabularXSCompactAccent` | 12px | 15px |
| `BodyTabular2XSCompactRegular` | 10px | 12px |
| `BodyTabular2XSCompactAccent` | 10px | 12px |

**Not in the UIKit (style manually using CLAUDE.md tokens):**
- Caps (uppercase labels, badges) — apply `textTransform: 'uppercase'` + `BodySAccent` or `BodyXSAccent`
- Display (hero text) — use `Heading2XL` as closest alternative

---

## Button

```tsx
<Button type="Primary" onPress={handlePress}>Place order</Button>
<Button type="Secondary" iconName="arrow-left" onPress={goBack}>Back</Button>
<Button type="Ghost" onPress={handleLink}>See details</Button>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `ButtonTypeName` | `'Primary'` | Visual style and size (see below) |
| `iconName` | `IconName` | — | Icon to display alongside label |
| `iconSize` | `number` | — | Custom icon size |
| `pressed` | `boolean` | — | Force pressed appearance |
| `pending` | `boolean` | — | Show spinner, apply pending style |
| `disabled` | `boolean` | — | Disable interaction |
| `onPress` | `() => void` | — | Press handler |

### ButtonTypeName

| Type | Style | Size | Font | Use for |
|------|-------|------|------|---------|
| `Primary` | Green bg, white text | Regular (16px padding) | `BodyLAccent` (18px) | Main CTAs |
| `PrimarySmall` | Green bg, white text | Small (12px padding) | `BodyMAccent` (16px) | Compact CTAs |
| `Secondary` | Subtle gray bg, dark text | Regular | `BodyLAccent` | Secondary actions |
| `SecondarySmall` | Subtle gray bg, dark text | Small | `BodyMAccent` | Compact secondary |
| `Danger` | Red bg, white text | Regular | `BodyLAccent` | Destructive actions |
| `DangerSmall` | Red bg, white text | Small | `BodyMAccent` | Compact destructive |
| `Ghost` | Transparent, green text | Regular | `BodyLAccent` | Links, tertiary actions |
| `GhostSmall` | Transparent, green text | Small | `BodyMAccent` | Compact links |
| `Floating` | White bg, elevation shadow | Regular | `BodyMRegular` | Map overlay buttons |
| `FloatingSmall` | White bg, elevation shadow | Small (8px padding) | `BodyMRegular` | Compact map buttons |

**Note:** There is no "Dark" button type (`bg.neutralPrimary` dark background) in the shared UIKit. For high-commitment dark CTAs ("Add to cart", "Place order · €12.90"), build from a `Pressable` with `bg.neutralPrimary` background + `content.primaryInverted` text, or override the Primary button's `contentStyle`. This is an app-specific pattern in the Delivery eater app, not a shared component.

### Button states (handled automatically)

Each button type has five states: `normal`, `hovering`, `pressed`, `pending`, `disabled`. These apply the correct color shifts from the token system. You don't need to manage them manually.

---

## Icon

```tsx
<Icon name="arrow-right" size={24} color={Colors.content.primary} />
<Icon name="star-filled" size={16} color={Colors.content.warningPrimary} />
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `name` | `IconName` | Icon identifier from the Bolt icon set |
| `size` | `number` | Icon dimensions in px (default 24) |
| `color` | `Colors` | Semantic color token |

Standard sizes: 16px (XS), 20px (S), 24px (M).

Note: The full `IconName` list is extensive. Common Delivery icons include: `arrow-left`, `arrow-right`, `chevron-right`, `close`, `search`, `star-filled`, `star-outline`, `clock`, `location`, `bag`, `heart`, `heart-filled`, `filter`, `sort`. Check the Icon demo screen in the sample app for the complete set.

---

## ListItem / BoltListItem

```tsx
<ListItem
  title="Margherita Pizza"
  subtitle="Classic tomato, mozzarella, basil"
  rightContent={<Text type="BodyTabularMAccent">€9.90</Text>}
/>
```

Use `ListItem` for standard list rows. `BoltListItem` may be a Bolt-specific variant — check the sample app demo for differences.

---

## Badge

```tsx
<Badge type="promo" label="20% OFF" />
<Badge type="info" label="New" />
```

For promotional badges, status indicators, and small labels.

---

## Chip

```tsx
<Chip label="Pizza" selected={isSelected} onPress={toggleFilter} />
```

For filter chips, cuisine category selectors, horizontal scrollable tag rows.

---

## SearchInput

```tsx
<SearchInput
  placeholder="Search restaurants, dishes..."
  value={query}
  onChangeText={setQuery}
/>
```

The home screen search bar. Comes with the search icon and clear button built in.

---

## TextInput / PlainTextInput

```tsx
<TextInput
  label="Delivery address"
  value={address}
  onChangeText={setAddress}
  placeholder="Enter your address"
/>
```

`TextInput` includes a floating label. `PlainTextInput` is a simpler variant without the label.

---

## SnackBar

```tsx
<SnackBar message="Added to cart" type="success" />
```

Toast notification component for transient feedback.

---

## Toggle / CheckBox / RadioButton

```tsx
<Toggle value={isEnabled} onValueChange={setIsEnabled} />
<CheckBox checked={isChecked} onPress={toggleCheck} label="Extra sauce" />
<RadioButton selected={isSelected} onPress={selectOption} label="Standard delivery" />
```

For settings, customisation options, and selection lists.

---

## InfoBox

```tsx
<InfoBox type="info" message="Free delivery on orders over €15" />
```

Informational banner for notices, promotions, and contextual information.

---

## NavigationHeader

```tsx
<NavigationHeader title="Checkout" onBackPress={goBack} />
```

Standard screen header with back navigation.

---

## Bottom Sheet (separate package)

```tsx
import { BottomSheet } from '@bolteu/uikit-bottom-sheet';

<BottomSheet isOpen={isOpen} onClose={close}>
  {/* Sheet content */}
</BottomSheet>
```

Used for checkout, filters, merchant info, and contextual actions.

---

## Layout Primitives

The sample app uses `Row` and `Column` from the blocks:

```tsx
import { Row, Column } from '@bolteu/rnc-react-uikit';
```

These are simple flex wrappers — `Row` = `flexDirection: 'row'`, `Column` = `flexDirection: 'column'`.

---

## Colors Import

To apply colors directly (for custom-built components or overrides):

```tsx
import { Colors } from '@bolteu/rnc-react-uikit';

// Use in styles:
{ backgroundColor: Colors.bg.actionPrimary }
{ color: Colors.content.secondary }
{ borderColor: Colors.border.separator }
```

The `Colors` object follows the exact same structure as the semantic color tokens in CLAUDE.md (`Colors.bg.*`, `Colors.content.*`, `Colors.border.*`, `Colors.layer.*`, `Colors.special.*`, etc.).

---

## Components NOT in the shared UIKit

Build these from primitives (`View`, `Pressable`, `Image`, `ScrollView`) + the design tokens in CLAUDE.md:

- **Card / Surface**: Use `View` with `layer.surface` background + 12px border radius
- **ProgressBar / Stepper**: Use `View` with `bg.actionPrimary` (completed) / `bg.neutralSecondary` (pending)
- **Dark CTA button**: Use `Pressable` with `bg.neutralPrimary` background + `content.primaryInverted` text
- **Merchant Card**: Compose from `Image` + `Text` + `Badge` following the pattern in CLAUDE.md
- **Map / Tracking**: Use `react-native-maps` or a placeholder view with map tokens from CLAUDE.md
- **TabBar**: Use `@react-navigation/bottom-tabs` (already in sample app dependencies)
- **Caps text**: Use `Text` with a Body type + `style={{ textTransform: 'uppercase' }}`
