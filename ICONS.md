# Bolt Icons (bolticons.ttf)

The `bolticons.ttf` font is extracted from the real Bolt Food app and contains 239 glyphs covering navigation, commerce, delivery, transport, status indicators, and more. Icons are rendered via the `BoltIcon` component, which maps icon names to font codepoints.

Many icons have a **filled** variant (suffix `-filled`) for use in active/selected states (e.g. tab bars, toggles).

---

## Usage

```tsx
import { BoltIcon } from '../src/components/Icon';

// Default: 24px, #191F1C (content.primary)
<BoltIcon name="bicycle" size={24} color="#191F1C" />

// Smaller, secondary color
<BoltIcon name="clock" size={16} color="rgba(0,10,7,0.63)" />
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | (required) | Icon name from the catalogue below |
| `size` | `number` | `24` | Icon size in pixels (matches M icon size) |
| `color` | `string` | `'#191F1C'` | Icon color -- use design token values |

**Recommended sizes:** XS = 16px, S = 20px, M = 24px (default).

---

## Quick Reference -- Delivery App Essentials

The ~30 icons you will reach for most often when prototyping eater-facing screens.

### Navigation & Tab Bar

| Icon | Filled Variant | Use |
|------|---------------|-----|
| `home` | `home-filled` | Home tab |
| `search` | `search-filled` | Search tab / search action |
| `basket` | `basket-filled` | Cart tab / basket |
| `order` | `order-filled` | Orders tab |
| `user` | `user-filled` | Profile / account tab |

### Merchant Cards & Listings

| Icon | Use |
|------|-----|
| `heart` / `heart-filled` | Favourite toggle |
| `star-filled` | Rating display |
| `bicycle` | Delivery by bike |
| `clock` / `clock-filled` | Delivery ETA |
| `pin` / `pin-filled` | Distance / address |
| `chevron-right` | Drill-in affordance |
| `discount` / `discount-filled` | Active promotion |

### Actions & Controls

| Icon | Use |
|------|-----|
| `plus` | Add item / increase quantity |
| `minus` | Decrease quantity |
| `close` | Dismiss / remove |
| `check` / `checkmark` | Confirm / selected state |
| `arrow-left` | Back navigation |
| `arrow-right` | Forward / next |
| `filter` / `filter-filled` | Filter toggle |
| `share` | Share merchant or order |
| `edit` / `edit-filled` | Edit address / order |

### Commerce & Payment

| Icon | Use |
|------|-----|
| `cash` / `cash-filled` | Cash payment |
| `cc` / `cc-filled` | Credit card payment |
| `wallet` | Wallet / Bolt Pay |
| `mobile-payment` | Mobile payment |
| `shopping-bag` / `shopping-bag-filled` | Order bag |
| `offer` / `offer-filled` | Promo / offer |
| `high-price` / `high-price-filled` | Surge / price level |

### Status & Communication

| Icon | Use |
|------|-----|
| `bell` / `bell-filled` | Notifications |
| `bubble` / `bubble-filled` | Chat / message |
| `info` / `info-filled` | Info tooltip |
| `alert` / `alert-filled` | Warning |
| `error` | Error state |
| `call` / `call-filled` | Call courier |

---

## Complete Catalogue

All 239 icons organised by category. The "Filled Variant" column shows the `-filled` counterpart where one exists.

---

### Navigation (Arrows, Chevrons, Menu)

| Icon Name | Filled Variant |
|-----------|---------------|
| `arrow-down` | -- |
| `arrow-left` | `arrow-left-filled` |
| `arrow-right` | `arrow-right-filled` |
| `arrow-up` | -- |
| `arrow-circle-right` | -- |
| `chevron-down` | -- |
| `chevron-left` | `chevron-left-filled` |
| `chevron-right` | `chevron-right-filled` |
| `chevron-up` | -- |
| `dropdown` | -- |
| `burger` | `burger-filled` |
| `menu-horizontal` | -- |
| `menu-vertical` | -- |
| `home` | `home-filled` |
| `logout` | -- |

---

### Commerce & Payment

| Icon Name | Filled Variant |
|-----------|---------------|
| `basket` | `basket-filled` |
| `cash` | `cash-filled` |
| `cc` | `cc-filled` |
| `discount` | `discount-filled` |
| `high-price` | `high-price-filled` |
| `mobile-payment` | `mobile-payment-filled` |
| `offer` | `offer-filled` |
| `order` | `order-filled` |
| `reorder` | -- |
| `shopping-bag` | `shopping-bag-filled` |
| `wallet` | -- |
| `chart-up` | `chart-up-filled` |
| `stats` | -- |

---

### Food & Delivery

| Icon Name | Filled Variant |
|-----------|---------------|
| `box` | `box-filled` |
| `store` | -- |
| `warehouse` | -- |
| `pickup` | -- |
| `arrival` | -- |
| `departure` | -- |
| `finish` | -- |
| `route` | -- |
| `on-foot` | -- |
| `walk` | -- |

---

### Communication

| Icon Name | Filled Variant |
|-----------|---------------|
| `bell` | `bell-filled` |
| `bubble` | `bubble-filled` |
| `call` | `call-filled` |
| `comment-add` | -- |
| `comment-remove` | -- |
| `email` | `email-filled` |
| `sound-off` | -- |
| `sound-on` | -- |
| `vibration` | -- |

---

### Actions & Controls

| Icon Name | Filled Variant |
|-----------|---------------|
| `check` | `check-filled` |
| `check-strong` | -- |
| `check-circle-filled` | -- |
| `checkmark` | -- |
| `circle-check` | `circle-check-filled` |
| `circle-minus-filled` | -- |
| `circle-plus` | `circle-plus-filled` |
| `circle-times` | `circle-times-filled` |
| `close` | `close-filled` |
| `copy` | -- |
| `edit` | `edit-filled` |
| `empty` | `empty-filled` |
| `filter` | `filter-filled` |
| `flash` | `flash-filled` |
| `list` | -- |
| `list-ul` | -- |
| `minus` | -- |
| `pause` | -- |
| `play` | -- |
| `play-no` | -- |
| `plus` | `plus-filled` |
| `print` | -- |
| `refresh` | `refresh-filled` |
| `scan` | `scan-filled` |
| `search` | `search-filled` |
| `setting` | `setting-filled` |
| `share` | -- |
| `stop` | -- |
| `trash` | `trash-filled` |
| `upload` | `upload-filled` |
| `qr-code` | -- |

---

### Status & Information

| Icon Name | Filled Variant |
|-----------|---------------|
| `alert` | `alert-filled` |
| `error` | -- |
| `error-one` | -- |
| `error-three` | -- |
| `help` | `help-filled` |
| `info` | `info-filled` |
| `eye` | -- |
| `eye-crossed` | -- |
| `hidden` | -- |
| `shield` | -- |
| `lock` | -- |
| `unlock` | -- |
| `none` | -- |

---

### Places & Location

| Icon Name | Filled Variant |
|-----------|---------------|
| `earth` | `earth-filled` |
| `globe` | `globe-filled` |
| `location-pin` | `location-pin-filled` |
| `my-location` | `my-location-filled` |
| `nearme` | `nearme-filled` |
| `north` | -- |
| `parking` | `parking-filled` |
| `parking-circle` | -- |
| `parking-circle-no` | -- |
| `pin` | `pin-filled` |
| `company` | -- |

---

### User & Account

| Icon Name | Filled Variant |
|-----------|---------------|
| `user` | `user-filled` |
| `id` | `id-filled` |
| `heart` | `heart-filled` |
| `star` | `star-filled` |
| `thumbs-up` | -- |
| `thumbs-down` | -- |
| `calendar` | -- |
| `case` | `case-filled` |
| `history` | -- |
| `history-alt` | -- |

---

### Media & Content

| Icon Name | Filled Variant |
|-----------|---------------|
| `camera` | `camera-filled` |
| `photo` | `photo-filled` |
| `pic-alt` | -- |
| `sticker` | -- |
| `torch` | `torch-filled` |

---

### Transport & Vehicles

| Icon Name | Filled Variant |
|-----------|---------------|
| `bicycle` | -- |
| `bike` | -- |
| `car` | `car-filled` |
| `motorcycle` | -- |
| `scooter` | -- |
| `clock` | `clock-filled` |

---

### Tags (Dietary / Category)

Used for food item labels and filter chips.

| Icon Name | Description |
|-----------|-------------|
| `tag-alcohol` | Alcoholic items |
| `tag-children` | Kid-friendly |
| `tag-extra-hot` | Very spicy |
| `tag-gluten` | Contains gluten |
| `tag-halal` | Halal certified |
| `tag-hot` | Hot / spicy |
| `tag-kosher` | Kosher certified |
| `tag-lactose` | Contains lactose |
| `tag-spicy` | Spicy |
| `tag-vegan` | Vegan |
| `tag-vegetarian` | Vegetarian |

---

### Hardware & IoT (Scooter Fleet)

These icons relate to Bolt's micro-mobility fleet operations. Less relevant for eater-facing prototypes, but available if needed.

| Icon Name | Description |
|-----------|-------------|
| `acceleration` | Acceleration sensor |
| `battery` | Battery indicator |
| `battery-charging` | Charging state |
| `battery-charging-no` | Not charging |
| `battery-empty` | Empty battery |
| `battery-full` | Full battery |
| `battery-half` | Half battery |
| `battery-not-closed` | Battery bay open |
| `battery-replaceable` | Swappable battery |
| `battery-replaceable-issue` | Battery swap issue |
| `brakes` | Brake system |
| `broken-bolt` | Broken fastener |
| `damaged` | Damaged vehicle |
| `dashboard` | Dashboard / instrument |
| `dead` | Non-functional unit |
| `deck` | Scooter deck |
| `display` | Display screen |
| `fault-code` | Diagnostic code |
| `handlebar` | Handlebar |
| `helmet` | Helmet |
| `iot` | IoT module |
| `iot-add` | Register IoT device |
| `iot-remove` | Remove IoT device |
| `iot-software` | IoT firmware |
| `kickstand` | Kickstand |
| `lights` | Lights |
| `loose-joint` | Loose connection |
| `missing` | Missing part |
| `mudguard` | Mudguard / fender |
| `not-charging` | Not charging |
| `not-responding` | Unresponsive unit |
| `not-turning-on` | Won't power on |
| `nut` | Nut / fastener |
| `patrol` | Fleet patrol |
| `radar` | Radar / proximity |
| `repair` | Needs repair |
| `repair-add` | Create repair task |
| `repair-done` | Repair complete |
| `repair-remove` | Cancel repair |
| `reserve` | Reserved vehicle |
| `reserve-no` | Unreservable |
| `scooter-collect` | Collect scooter |
| `scooter-deploy` | Deploy scooter |
| `scooter-issue` | Scooter issue report |
| `throttle` | Throttle |
| `tube` | Inner tube |
| `wheels` | Wheels |
