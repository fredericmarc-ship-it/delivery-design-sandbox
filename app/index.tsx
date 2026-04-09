import React, { useCallback } from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Text as RNText,
  TextProps,
  TextStyle,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBasket } from '../src/basket';
import {
  categories,
  orderAgain,
  restaurants,
  moreRestaurants,
  Restaurant,
} from '../src/data';

// ── Tokens (CLAUDE.md) ────────────────────────────────────────
const C = {
  floor0: '#FFFFFF',
  surface: 'rgba(0,45,30,0.07)',
  primary: '#191F1C',
  secondary: 'rgba(0,10,7,0.63)',
  tertiary: 'rgba(0,17,11,0.47)',
  actionPrimary: 'rgba(0,112,66,0.92)',
  dangerPrimary: '#DE1929',
  bgNeutralSecondary: 'rgba(0,45,30,0.07)',
  bgActionPrimary: '#2B8659',
  bgDangerPrimary: '#DE1929',
  separator: 'rgba(0,45,30,0.07)',
  primaryInverted: 'rgba(253,255,254,0.93)',
};

// ── Typography ─────────────────────────────────────────────────
const F: Record<string, TextStyle> = {
  HeadingS:   { fontSize: 24, lineHeight: 30, fontWeight: '600', letterSpacing: -0.456 },
  HeadingXS:  { fontSize: 20, lineHeight: 25, fontWeight: '600', letterSpacing: -0.34 },
  BodyMRegular: { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: -0.176 },
  BodyMAccent:  { fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: -0.176 },
  BodySRegular: { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: -0.084 },
  BodySAccent:  { fontSize: 14, lineHeight: 20, fontWeight: '600', letterSpacing: -0.084 },
  BodyXSRegular: { fontSize: 12, lineHeight: 16, fontWeight: '400' },
  BodyXSAccent:  { fontSize: 12, lineHeight: 16, fontWeight: '600' },
  Body2XSRegular: { fontSize: 10, lineHeight: 14, fontWeight: '400', letterSpacing: 0.1 },
  TabSRegular: { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: -0.294, fontVariant: ['tabular-nums'] },
  TabXSAccent: { fontSize: 12, lineHeight: 16, fontWeight: '600', letterSpacing: -0.18, fontVariant: ['tabular-nums'] },
  TabXSRegular: { fontSize: 12, lineHeight: 16, fontWeight: '400', letterSpacing: -0.18, fontVariant: ['tabular-nums'] },
};

function T({ type, color, style, ...rest }: TextProps & { type: string; color?: string }) {
  return <RNText style={[{ color: color ?? C.primary }, F[type], style]} {...rest} />;
}

// ── Layout ─────────────────────────────────────────────────────
const SW = Dimensions.get('window').width;
const HP = 16;
const COL_GAP = 12;
const ROW_GAP = 16;
const CARD_W = (SW - HP * 2 - COL_GAP) / 2;

// ════════════════════════════════════════════════════════════════
// ── iPhone Status Bar Chrome ───────────────────────────────────
// ════════════════════════════════════════════════════════════════

function StatusBarChrome() {
  return (
    <View style={sb.bar}>
      {/* Left: time */}
      <View style={sb.left}>
        <RNText style={sb.time}>15:31</RNText>
      </View>

      {/* Center: dynamic island notch */}
      <View style={sb.island} />

      {/* Right: signal + wifi + battery */}
      <View style={sb.right}>
        {/* Cellular dots */}
        <View style={sb.signal}>
          <View style={[sb.dot, sb.dotFilled]} />
          <View style={[sb.dot, sb.dotFilled]} />
          <View style={[sb.dot, sb.dotEmpty]} />
          <View style={[sb.dot, sb.dotEmpty]} />
        </View>
        {/* Wifi */}
        <View style={sb.wifi}>
          <View style={sb.wifiArc3} />
          <View style={sb.wifiArc2} />
          <View style={sb.wifiDot} />
        </View>
        {/* Battery */}
        <View style={sb.batteryWrap}>
          <View style={sb.batteryBody}>
            <View style={sb.batteryFill} />
          </View>
          <View style={sb.batteryTip} />
        </View>
      </View>
    </View>
  );
}

const sb = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    paddingHorizontal: 20,
  },
  left: { width: 80, alignItems: 'flex-start' },
  time: { fontSize: 16, fontWeight: '600', color: C.primary, letterSpacing: 0.2 },
  island: {
    width: 126,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000',
  },
  right: { width: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 6 },
  // Signal
  signal: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  dot: { width: 4, height: 4, borderRadius: 2 },
  dotFilled: { backgroundColor: C.primary },
  dotEmpty: { backgroundColor: 'rgba(0,0,0,0.2)' },
  // Wifi
  wifi: { width: 14, height: 10, alignItems: 'center', justifyContent: 'flex-end' },
  wifiArc3: {
    position: 'absolute', top: 0, width: 14, height: 8,
    borderTopLeftRadius: 7, borderTopRightRadius: 7,
    borderWidth: 1.5, borderBottomWidth: 0, borderColor: C.primary,
  },
  wifiArc2: {
    position: 'absolute', top: 3, width: 8, height: 5,
    borderTopLeftRadius: 5, borderTopRightRadius: 5,
    borderWidth: 1.5, borderBottomWidth: 0, borderColor: C.primary,
  },
  wifiDot: {
    width: 3, height: 3, borderRadius: 1.5, backgroundColor: C.primary,
  },
  // Battery
  batteryWrap: { flexDirection: 'row', alignItems: 'center' },
  batteryBody: {
    width: 22, height: 11, borderRadius: 2.5,
    borderWidth: 1, borderColor: C.primary,
    padding: 1.5, overflow: 'hidden',
  },
  batteryFill: {
    width: '65%', height: '100%', borderRadius: 1,
    backgroundColor: '#F5A623',
  },
  batteryTip: {
    width: 1.5, height: 5, backgroundColor: C.primary,
    borderTopRightRadius: 1, borderBottomRightRadius: 1, marginLeft: 0.5,
  },
});

// ════════════════════════════════════════════════════════════════
// ── Address Bar ────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function AddressBar() {
  return (
    <Pressable style={s.addressBar} accessibilityLabel="Change delivery address">
      {/* Map pin */}
      <View style={s.pinWrap}>
        <View style={s.pinHead} />
        <View style={s.pinPoint} />
      </View>
      <View style={{ flex: 1 }}>
        <T type="BodyMAccent">Veerenni Tänav 24/1</T>
        <T type="BodyXSRegular" color={C.secondary}>Tallinn</T>
      </View>
    </Pressable>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Search Bar ─────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function SearchBar() {
  return (
    <View style={s.searchBar}>
      {/* Magnifying glass */}
      <View style={s.magWrap}>
        <View style={s.magLens} />
        <View style={s.magHandle} />
      </View>
      <T type="BodyMRegular" color={C.tertiary} style={{ flex: 1 }}>
        Food, restaurants, stores...
      </T>
      {/* Filter icon */}
      <Pressable style={s.filterBtn} accessibilityLabel="Filters">
        <View style={s.fLine1} />
        <View style={s.fLine2} />
        <View style={s.fLine3} />
      </Pressable>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Category Row ───────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function CategoryRow() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.catRow}
    >
      {categories.map((c) => (
        <Pressable key={c.id} style={s.catItem} accessibilityLabel={c.label}>
          <View style={s.catCircle}>
            <RNText style={s.catEmoji}>{c.icon}</RNText>
          </View>
          <T type="BodyXSRegular" style={{ textAlign: 'center' }}>{c.label}</T>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Section Header ─────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={s.sectionHdr}>
      <View style={{ flex: 1 }}>
        <T type="HeadingS">{title}</T>
        {subtitle != null && (
          <T type="BodyXSRegular" color={C.secondary} style={{ marginTop: 2 }}>{subtitle}</T>
        )}
      </View>
      <Pressable style={s.allBtn} accessibilityLabel={`See all ${title}`}>
        <T type="BodySRegular" color={C.primary}>All</T>
        <View style={s.chevron}>
          <View style={s.chevronArm1} />
          <View style={s.chevronArm2} />
        </View>
      </Pressable>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Bolt Plus Badge (small green square with +) ────────────────
// ════════════════════════════════════════════════════════════════

function BoltPlusBadge() {
  return (
    <View style={s.bpBadge}>
      <RNText style={s.bpPlus}>+</RNText>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Order Again Row ────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function OrderAgainRow({ onPress }: { onPress: (id: string) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.oaRow}
    >
      {orderAgain.map((item) => (
        <Pressable
          key={item.id}
          style={s.oaCard}
          onPress={() => onPress(item.id)}
          accessibilityLabel={item.name.replace('\n', ' ')}
        >
          <View style={s.oaImgWrap}>
            <Image source={{ uri: item.image }} style={s.oaImg} />
            {item.promo != null && (
              <View style={s.oaPromoBadge}>
                <RNText style={s.oaPromoText}>{item.promo}</RNText>
              </View>
            )}
          </View>
          <View style={s.oaNameRow}>
            <T type="BodyXSRegular" numberOfLines={2} style={s.oaName}>
              {item.name}
            </T>
            {item.boltPlus && <BoltPlusBadge />}
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Restaurant Card ────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function RestaurantCard({ restaurant, onPress }: { restaurant: Restaurant; onPress: () => void }) {
  const isFree =
    restaurant.deliveryFee === 'Free delivery' ||
    restaurant.deliveryFee === '0,00 €' ||
    restaurant.deliveryFee === '€0.00';
  const feeLabel = isFree ? 'From 0,00 €' : restaurant.deliveryFee;

  return (
    <Pressable style={s.card} onPress={onPress} accessibilityLabel={restaurant.name}>
      <View style={s.cardImgWrap}>
        <Image source={{ uri: restaurant.image }} style={s.cardImg} />

        {/* Heart — top right (white circle) */}
        <View style={s.heart}>
          <RNText style={s.heartTxt}>{'♡'}</RNText>
        </View>

        {/* Discount % badge — top left (red rounded square) */}
        {restaurant.promo != null && (
          <View style={s.discBadge}>
            <RNText style={s.discTxt}>{restaurant.promo}</RNText>
          </View>
        )}

        {/* Rating pill — bottom right (yellow bg) */}
        <View style={s.ratingPill}>
          <RNText style={s.ratingStar}>{'★'}</RNText>
          <T type="TabXSAccent" color={C.primary} style={{ marginLeft: 3 }}>
            {restaurant.rating}
          </T>
          <T type="TabXSRegular" color={C.secondary} style={{ marginLeft: 2 }}>
            ({restaurant.reviews})
          </T>
        </View>
      </View>

      {/* Text below image */}
      <View style={s.cardBody}>
        <View style={s.nameRow}>
          <T type="BodyMAccent" numberOfLines={1} style={{ flexShrink: 1 }}>
            {restaurant.name}
          </T>
          {restaurant.boltPlus && <BoltPlusBadge />}
        </View>
        <View style={s.infoRow}>
          {/* Scissors icon */}
          <RNText style={s.infoIcon}>{'✂'}</RNText>
          <T type="TabXSRegular" color={isFree ? C.actionPrimary : C.secondary} style={{ marginLeft: 3 }}>
            {feeLabel}
          </T>
          {restaurant.originalFee != null && (
            <T
              type="TabXSRegular"
              color={C.tertiary}
              style={{ marginLeft: 4, textDecorationLine: 'line-through' }}
            >
              {restaurant.originalFee}
            </T>
          )}
          {/* Clock icon */}
          <RNText style={[s.infoIcon, { marginLeft: 10 }]}>{'⏱'}</RNText>
          <T type="TabXSRegular" color={C.secondary} style={{ marginLeft: 3 }}>
            {restaurant.eta}
          </T>
        </View>
      </View>
    </Pressable>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Restaurant Grid ────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function RestaurantGrid({ items, onPress }: { items: Restaurant[]; onPress: (id: string) => void }) {
  const rows: Restaurant[][] = [];
  for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
  return (
    <View style={s.grid}>
      {rows.map((row, i) => (
        <View key={i} style={s.gridRow}>
          {row.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} onPress={() => onPress(r.id)} />
          ))}
          {row.length === 1 && <View style={{ width: CARD_W }} />}
        </View>
      ))}
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Promo Banner ───────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function PromoBanner() {
  return (
    <View style={s.promoBanner}>
      <View style={{ flex: 1 }}>
        <T type="BodyMAccent" color="#FFFFFF">Get a Red Bull for a chance to win!</T>
        <T type="BodyXSRegular" color="rgba(255,255,255,0.8)" style={{ marginTop: 4 }}>
          Add a Red Bull to your meal and enter automatically to win 100€ of Red Bull shop credit
        </T>
      </View>
      <View style={s.promoCta}>
        <T type="BodySAccent" color={C.primary}>See offers</T>
      </View>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Bottom Tab Bar ─────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

const TABS = [
  { key: 'home',    label: 'Home',    icon: '🏠', active: true },
  { key: 'stores',  label: 'Stores',  icon: '🏪', active: false },
  { key: 'search',  label: 'Search',  icon: '🔍', active: false },
  { key: 'dineout', label: 'DineOut', icon: '🍽', active: false },
  { key: 'account', label: 'Account', icon: '👤', active: false },
];

function BottomTabBar({ bottom }: { bottom: number }) {
  return (
    <View style={[s.tabBar, { paddingBottom: Math.max(bottom, 8) }]}>
      <View style={s.tabBorder} />
      <View style={s.tabInner}>
        {TABS.map((t) => (
          <Pressable key={t.key} style={s.tab} accessibilityLabel={t.label}>
            <RNText style={{ fontSize: 22 }}>{t.icon}</RNText>
            <T
              type="Body2XSRegular"
              color={t.active ? C.primary : C.tertiary}
              style={{ marginTop: 2 }}
            >
              {t.label}
            </T>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Home Screen ────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const basket = useBasket();

  const go = useCallback((id: string) => router.push(`/provider/${id}`), [router]);

  const boltPlus = [moreRestaurants[7], moreRestaurants[8], moreRestaurants[3], moreRestaurants[1]];
  const spotlight = [moreRestaurants[4], moreRestaurants[2], restaurants[1], moreRestaurants[0]];
  const groceries = [moreRestaurants[5], moreRestaurants[6], restaurants[2], restaurants[0]];
  const recommended = [moreRestaurants[3], moreRestaurants[4], restaurants[0], moreRestaurants[2]];

  return (
    <View style={s.root}>
      {/* iPhone status bar chrome */}
      <View style={{ height: insets.top, backgroundColor: C.floor0 }} />
      <StatusBarChrome />

      {/* Sticky header */}
      <AddressBar />
      <SearchBar />

      {/* Scrollable content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        <CategoryRow />

        <SectionHeader title="Order again" />
        <OrderAgainRow onPress={go} />

        <SectionHeader title="Bolt Plus offers" />
        <RestaurantGrid items={boltPlus} onPress={go} />

        <SectionHeader title="In the spotlight" subtitle="Sponsored" />
        <RestaurantGrid items={spotlight} onPress={go} />

        <PromoBanner />

        <SectionHeader title="Groceries and more" />
        <RestaurantGrid items={groceries} onPress={go} />

        <SectionHeader title="Recommended for you" subtitle="Based on past orders" />
        <RestaurantGrid items={recommended} onPress={go} />
      </ScrollView>

      {/* Floating basket bar */}
      {basket.totalItems > 0 && (
        <Pressable
          style={[s.basketBar, { bottom: Math.max(insets.bottom, 8) + 56 + 12 }]}
          onPress={() => router.push('/checkout')}
          accessibilityLabel="View basket"
        >
          <T type="BodyMAccent" color={C.primaryInverted} numberOfLines={1} style={{ flex: 1 }}>
            {basket.restaurantName ?? 'Your order'}
          </T>
          <T type="TabSRegular" color={C.primaryInverted}>
            {basket.totalPrice.toFixed(2)} €
          </T>
        </Pressable>
      )}

      <BottomTabBar bottom={insets.bottom} />
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Styles ─────────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.floor0 },

  /* ── Address bar ── */
  addressBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: HP, paddingTop: 4, paddingBottom: 8, gap: 10,
  },
  pinWrap: { width: 20, height: 26, alignItems: 'center' },
  pinHead: {
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: C.primary,
    borderWidth: 3, borderColor: C.primary,
  },
  pinPoint: {
    width: 0, height: 0,
    borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 8,
    borderLeftColor: 'transparent', borderRightColor: 'transparent',
    borderTopColor: C.primary,
    marginTop: -1,
  },

  /* ── Search bar ── */
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: HP, marginBottom: 4,
    backgroundColor: C.bgNeutralSecondary,
    borderRadius: 12, paddingLeft: 16, paddingRight: 8, height: 48,
  },
  magWrap: { width: 22, height: 22, marginRight: 10 },
  magLens: {
    width: 14, height: 14, borderRadius: 7,
    borderWidth: 2.2, borderColor: C.primary,
    position: 'absolute', top: 0, left: 0,
  },
  magHandle: {
    width: 2.2, height: 8, backgroundColor: C.primary,
    position: 'absolute', bottom: 0, right: 2, borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
  filterBtn: {
    width: 36, height: 36, alignItems: 'center', justifyContent: 'center',
  },
  fLine1: { width: 18, height: 2, backgroundColor: C.primary, borderRadius: 1, marginBottom: 4 },
  fLine2: { width: 12, height: 2, backgroundColor: C.primary, borderRadius: 1, marginBottom: 4 },
  fLine3: { width: 6,  height: 2, backgroundColor: C.primary, borderRadius: 1 },

  /* ── Categories ── */
  catRow: { paddingHorizontal: HP, paddingTop: 12, paddingBottom: 4, gap: 16 },
  catItem: { alignItems: 'center', width: 72 },
  catCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#F2F4F3',
    alignItems: 'center', justifyContent: 'center', marginBottom: 6,
  },
  catEmoji: { fontSize: 30 },

  /* ── Section header ── */
  sectionHdr: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HP, paddingTop: 28, paddingBottom: 14,
  },
  allBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  chevron: { width: 8, height: 14, justifyContent: 'center' },
  chevronArm1: {
    position: 'absolute', width: 7, height: 1.8, backgroundColor: C.primary,
    borderRadius: 1, top: 3, transform: [{ rotate: '45deg' }],
  },
  chevronArm2: {
    position: 'absolute', width: 7, height: 1.8, backgroundColor: C.primary,
    borderRadius: 1, bottom: 3, transform: [{ rotate: '-45deg' }],
  },

  /* ── Bolt Plus badge ── */
  bpBadge: {
    width: 16, height: 16, borderRadius: 4,
    backgroundColor: C.bgActionPrimary,
    alignItems: 'center', justifyContent: 'center', marginLeft: 4,
  },
  bpPlus: { color: '#fff', fontSize: 12, fontWeight: '800', lineHeight: 14, marginTop: -1 },

  /* ── Order again ── */
  oaRow: { paddingHorizontal: HP, gap: 12 },
  oaCard: { width: 120, alignItems: 'center' },
  oaImgWrap: {
    width: 120, height: 120, borderRadius: 12,
    overflow: 'hidden', backgroundColor: C.bgNeutralSecondary,
  },
  oaImg: { width: '100%', height: '100%' },
  oaPromoBadge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: C.bgDangerPrimary, borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  oaPromoText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  oaNameRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', marginTop: 6,
    flexWrap: 'wrap',
  },
  oaName: { textAlign: 'center' },

  /* ── Restaurant grid ── */
  grid: { paddingHorizontal: HP, gap: ROW_GAP },
  gridRow: { flexDirection: 'row', gap: COL_GAP },

  /* ── Restaurant card ── */
  card: { width: CARD_W },
  cardImgWrap: {
    width: '100%', aspectRatio: 4 / 3,
    borderRadius: 16, overflow: 'hidden',
    backgroundColor: C.bgNeutralSecondary,
  },
  cardImg: { width: '100%', height: '100%' },

  // Heart — white circle
  heart: {
    position: 'absolute', top: 10, right: 10,
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center', justifyContent: 'center',
  },
  heartTxt: { color: C.primary, fontSize: 16, lineHeight: 20 },

  // Discount badge — red rounded square with "%"
  discBadge: {
    position: 'absolute', top: 10, left: 10,
    backgroundColor: C.bgDangerPrimary, borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 3,
    minWidth: 26, alignItems: 'center',
  },
  discTxt: { color: '#fff', fontSize: 12, fontWeight: '800' },

  // Rating pill — yellow bg, bottom right
  ratingPill: {
    position: 'absolute', bottom: 10, right: 10,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF0C2',
    borderRadius: 100,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  ratingStar: { color: '#E8A100', fontSize: 12 },

  // Card body
  cardBody: { paddingTop: 8, paddingBottom: 4 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoIcon: { fontSize: 12, color: C.secondary },

  /* ── Promo banner ── */
  promoBanner: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: HP, marginTop: 28,
    padding: 16, borderRadius: 16,
    backgroundColor: '#003366',
    gap: 12,
  },
  promoCta: {
    backgroundColor: '#C8E6FF', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8,
  },

  /* ── Basket bar ── */
  basketBar: {
    position: 'absolute', left: HP, right: HP,
    backgroundColor: C.bgActionPrimary,
    borderRadius: 100,
    paddingHorizontal: 20, paddingVertical: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    shadowColor: '#000', shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 }, shadowRadius: 12, elevation: 8,
  },

  /* ── Tab bar ── */
  tabBar: { backgroundColor: C.floor0 },
  tabBorder: { height: StyleSheet.hairlineWidth, backgroundColor: C.separator },
  tabInner: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 6 },
  tab: { alignItems: 'center', paddingVertical: 4, minWidth: 56 },
});
