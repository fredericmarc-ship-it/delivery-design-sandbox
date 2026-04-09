import React, { useCallback } from 'react';
import {
  Dimensions,
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

// ── Tokens (from CLAUDE.md) ────────────────────────────────────
const C = {
  floor0: '#FFFFFF',
  floor0Grouped: '#EEF1F0',
  surface: 'rgba(0,45,30,0.07)',
  primary: '#191F1C',
  secondary: 'rgba(0,10,7,0.63)',
  tertiary: 'rgba(0,17,11,0.47)',
  actionPrimary: 'rgba(0,112,66,0.92)',
  promoPrimary: 'rgba(56,4,215,0.94)',
  promoSecondary: 'rgba(0,60,255,0.07)',
  dangerPrimary: '#DE1929',
  bgNeutralPrimary: '#0E1010',
  bgNeutralSecondary: 'rgba(0,45,30,0.07)',
  bgActionPrimary: '#2B8659',
  bgDangerPrimary: '#DE1929',
  separator: 'rgba(0,45,30,0.07)',
  primaryInverted: 'rgba(253,255,254,0.93)',
  brand: '#2B8659',
  warningPrimary: 'rgba(158,91,0,1)',
  warningBg: '#FFF8E7',
};

// ── Typography helper ──────────────────────────────────────────
const fontStyles: Record<string, TextStyle> = {
  HeadingS:  { fontSize: 24, lineHeight: 30, fontWeight: '650' as any, letterSpacing: -0.456 },
  HeadingXS: { fontSize: 20, lineHeight: 25, fontWeight: '650' as any, letterSpacing: -0.34 },
  BodyLAccent:  { fontSize: 18, lineHeight: 24, fontWeight: '650' as any, letterSpacing: -0.252 },
  BodyMRegular: { fontSize: 16, lineHeight: 24, fontWeight: '450' as any, letterSpacing: -0.176 },
  BodyMAccent:  { fontSize: 16, lineHeight: 24, fontWeight: '650' as any, letterSpacing: -0.176 },
  BodySRegular: { fontSize: 14, lineHeight: 20, fontWeight: '450' as any, letterSpacing: -0.084 },
  BodySAccent:  { fontSize: 14, lineHeight: 20, fontWeight: '650' as any, letterSpacing: -0.084 },
  BodyXSRegular: { fontSize: 12, lineHeight: 16, fontWeight: '450' as any },
  BodyXSAccent:  { fontSize: 12, lineHeight: 16, fontWeight: '650' as any },
  Body2XSRegular: { fontSize: 10, lineHeight: 14, fontWeight: '450' as any, letterSpacing: 0.1 },
  TabularSRegular: { fontSize: 14, lineHeight: 20, fontWeight: '450' as any, letterSpacing: -0.294, fontVariant: ['tabular-nums'] },
  TabularSAccent:  { fontSize: 14, lineHeight: 20, fontWeight: '650' as any, letterSpacing: -0.294, fontVariant: ['tabular-nums'] },
  TabularXSRegular: { fontSize: 12, lineHeight: 16, fontWeight: '450' as any, letterSpacing: -0.18, fontVariant: ['tabular-nums'] },
  TabularXSAccent:  { fontSize: 12, lineHeight: 16, fontWeight: '650' as any, letterSpacing: -0.18, fontVariant: ['tabular-nums'] },
};

function T({ type, color, style, ...props }: TextProps & { type: string; color?: string }) {
  return (
    <RNText
      style={[{ color: color ?? C.primary }, fontStyles[type], style]}
      {...props}
    />
  );
}

// ── Layout constants ───────────────────────────────────────────
const SCREEN_W = Dimensions.get('window').width;
const H_PAD = 16; // horizontal screen padding
const COL_GAP = 12;
const ROW_GAP = 16;
const CARD_W = (SCREEN_W - H_PAD * 2 - COL_GAP) / 2;

// ── Address Bar ────────────────────────────────────────────────
function AddressBar() {
  return (
    <Pressable style={s.addressBar} accessibilityLabel="Change delivery address">
      <View style={s.locationPin}>
        <View style={s.locationPinDot} />
        <View style={s.locationPinStick} />
      </View>
      <View style={{ flex: 1 }}>
        <T type="BodySAccent">Veerenni Tänav 24/1</T>
        <T type="BodyXSRegular" color={C.secondary}>Tallinn</T>
      </View>
    </Pressable>
  );
}

// ── Search Bar ─────────────────────────────────────────────────
function SearchBar() {
  return (
    <View style={s.searchBar}>
      {/* Magnifying glass */}
      <View style={s.searchIcon}>
        <View style={s.searchLens} />
        <View style={s.searchHandle} />
      </View>
      <T type="BodyMRegular" color={C.tertiary} style={{ flex: 1 }}>
        Food, restaurants, stores...
      </T>
      {/* Filter button */}
      <Pressable style={s.filterBtn} accessibilityLabel="Filters">
        <View style={s.filterLine1} />
        <View style={s.filterLine2} />
        <View style={s.filterLine3} />
        <View style={s.filterDot} />
      </Pressable>
    </View>
  );
}

// ── Category Row ───────────────────────────────────────────────
function CategoryRow() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.categoryRow}
    >
      {categories.map((cat) => (
        <Pressable key={cat.id} style={s.categoryItem} accessibilityLabel={cat.label}>
          <View style={s.categoryCircle}>
            <RNText style={s.categoryEmoji}>{cat.icon}</RNText>
          </View>
          <T type="BodyXSRegular" style={{ textAlign: 'center' }}>
            {cat.label}
          </T>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// ── Section Header ─────────────────────────────────────────────
function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={s.sectionHeader}>
      <View style={{ flex: 1 }}>
        <T type="HeadingXS">{title}</T>
        {subtitle != null && (
          <T type="BodyXSRegular" color={C.secondary} style={{ marginTop: 2 }}>
            {subtitle}
          </T>
        )}
      </View>
      <Pressable style={s.seeAllBtn} accessibilityLabel={`See all ${title}`}>
        <T type="BodySAccent" color={C.actionPrimary}>All</T>
        <T type="BodySAccent" color={C.actionPrimary}> {'>'}</T>
      </Pressable>
    </View>
  );
}

// ── Order Again Row ────────────────────────────────────────────
function OrderAgainRow({ onPress }: { onPress: (id: string) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.orderAgainRow}
    >
      {orderAgain.map((item) => (
        <Pressable
          key={item.id}
          style={s.orderAgainCard}
          onPress={() => onPress(item.id)}
          accessibilityLabel={item.name}
        >
          <Image source={{ uri: item.image }} style={s.orderAgainImage} />
          <T type="BodyXSRegular" numberOfLines={2} style={s.orderAgainName}>
            {item.name}
          </T>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// ── Restaurant Card (2-column grid) ────────────────────────────
function RestaurantCard({
  restaurant,
  onPress,
}: {
  restaurant: Restaurant;
  onPress: () => void;
}) {
  const isFree = restaurant.deliveryFee === 'Free delivery' || restaurant.deliveryFee === '€0.00';

  return (
    <Pressable style={s.card} onPress={onPress} accessibilityLabel={restaurant.name}>
      {/* Image */}
      <View style={s.cardImgWrap}>
        <Image source={{ uri: restaurant.image }} style={s.cardImg} />

        {/* Favourite heart — top right */}
        <View style={s.heart}>
          <RNText style={s.heartIcon}>{'♡'}</RNText>
        </View>

        {/* Discount badge — top left */}
        {restaurant.promo != null && (
          <View style={s.discountBadge}>
            <RNText style={s.discountText}>{restaurant.promo}</RNText>
          </View>
        )}

        {/* Rating pill — bottom right */}
        <View style={s.ratingPill}>
          <RNText style={s.ratingStar}>{'★'}</RNText>
          <T type="TabularXSAccent" color="#FFFFFF" style={{ marginLeft: 2 }}>
            {restaurant.rating}
          </T>
          <T type="TabularXSRegular" color="rgba(255,255,255,0.75)" style={{ marginLeft: 2 }}>
            ({restaurant.reviews})
          </T>
        </View>
      </View>

      {/* Text content below image */}
      <View style={s.cardBody}>
        {/* Name row with optional Bolt Plus icon */}
        <View style={s.nameRow}>
          <T type="BodyMAccent" numberOfLines={1} style={{ flexShrink: 1 }}>
            {restaurant.name}
          </T>
          {isFree && <View style={s.boltPlusDot} />}
        </View>

        {/* Delivery info row */}
        <View style={s.infoRow}>
          {/* Bike icon (delivery) */}
          <View style={s.bikeIcon}>
            <View style={s.bikeWheel1} />
            <View style={s.bikeWheel2} />
            <View style={s.bikeFrame} />
          </View>
          <T
            type="TabularXSRegular"
            color={isFree ? C.actionPrimary : C.secondary}
            style={{ marginLeft: 4 }}
          >
            {isFree ? 'From 0,00 €' : restaurant.deliveryFee}
          </T>

          {/* Clock icon (ETA) */}
          <View style={s.clockIcon}>
            <View style={s.clockFace} />
            <View style={s.clockHand} />
          </View>
          <T type="TabularXSRegular" color={C.secondary} style={{ marginLeft: 3 }}>
            {restaurant.eta}
          </T>
        </View>
      </View>
    </Pressable>
  );
}

// ── Restaurant Grid ────────────────────────────────────────────
function RestaurantGrid({
  items,
  onPress,
}: {
  items: Restaurant[];
  onPress: (id: string) => void;
}) {
  const rows: Restaurant[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return (
    <View style={s.grid}>
      {rows.map((row, idx) => (
        <View key={idx} style={s.gridRow}>
          {row.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} onPress={() => onPress(r.id)} />
          ))}
          {row.length === 1 && <View style={{ width: CARD_W }} />}
        </View>
      ))}
    </View>
  );
}

// ── Promo Banner ───────────────────────────────────────────────
function PromoBanner() {
  return (
    <View style={s.promoBanner}>
      <View style={{ flex: 1 }}>
        <T type="BodyMAccent">Full cart, happy wallet</T>
        <T type="BodyXSRegular" color={C.secondary} style={{ marginTop: 2 }}>
          Save on everyday essentials
        </T>
      </View>
      <View style={s.promoBannerBadge}>
        <T type="BodyXSAccent">Bolt Market</T>
      </View>
    </View>
  );
}

// ── Bottom Tab Bar ─────────────────────────────────────────────
const TABS = [
  { key: 'home', label: 'Home', icon: '🏠', active: true },
  { key: 'stores', label: 'Stores', icon: '🏪', active: false },
  { key: 'search', label: 'Search', icon: '🔍', active: false },
  { key: 'dineout', label: 'DineOut', icon: '🍽️', active: false },
  { key: 'account', label: 'Account', icon: '👤', active: false },
];

function BottomTabBar({ bottom }: { bottom: number }) {
  return (
    <View style={[s.tabBar, { paddingBottom: bottom }]}>
      <View style={s.tabBarBorder} />
      <View style={s.tabBarInner}>
        {TABS.map((t) => (
          <Pressable key={t.key} style={s.tab} accessibilityLabel={t.label}>
            <RNText style={{ fontSize: 20 }}>{t.icon}</RNText>
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

// ── Home Screen ────────────────────────────────────────────────

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const basket = useBasket();

  const go = useCallback(
    (id: string) => router.push(`/provider/${id}`),
    [router],
  );

  // Build section lists from available data
  const boltPlus = [restaurants[0], ...moreRestaurants.slice(0, 3)];
  const recommended = [moreRestaurants[3], moreRestaurants[1], ...restaurants.slice(1)];
  const explore = [moreRestaurants[0], moreRestaurants[4], moreRestaurants[2], restaurants[2]];
  const saveDel = [moreRestaurants[5], moreRestaurants[6], restaurants[0], moreRestaurants[3]];

  return (
    <View style={[s.root, { paddingTop: insets.top }]}>
      {/* Fixed header */}
      <AddressBar />
      <SearchBar />

      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <CategoryRow />

        <SectionHeader title="Order again" />
        <OrderAgainRow onPress={go} />

        <SectionHeader title="Bolt Plus offers" />
        <RestaurantGrid items={boltPlus} onPress={go} />

        <PromoBanner />

        <SectionHeader title="Recommended for you" subtitle="Based on past orders" />
        <RestaurantGrid items={recommended} onPress={go} />

        <SectionHeader title="Explore offers" />
        <RestaurantGrid items={explore} onPress={go} />

        <SectionHeader title="Save on delivery" />
        <RestaurantGrid items={saveDel} onPress={go} />
      </ScrollView>

      {/* Floating basket bar (green pill, above tab bar) */}
      {basket.totalItems > 0 && (
        <Pressable
          style={[s.basketBar, { bottom: insets.bottom + 56 + 12 }]}
          onPress={() => router.push('/checkout')}
          accessibilityLabel="View basket"
        >
          <T type="BodyMAccent" color={C.primaryInverted} numberOfLines={1} style={{ flex: 1 }}>
            {basket.restaurantName ?? 'Your order'}
          </T>
          <T type="TabularSAccent" color={C.primaryInverted}>
            {basket.totalPrice.toFixed(2)} €
          </T>
        </Pressable>
      )}

      {/* Tab bar */}
      <BottomTabBar bottom={insets.bottom} />
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: C.floor0,
  },

  /* ── Address bar ── */
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: H_PAD,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 8,
  },
  locationPin: { width: 24, height: 24, alignItems: 'center', justifyContent: 'flex-end' },
  locationPinDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: C.primary,
  },
  locationPinStick: {
    width: 2,
    height: 6,
    backgroundColor: C.primary,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },

  /* ── Search bar ── */
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: H_PAD,
    marginTop: 4,
    marginBottom: 4,
    backgroundColor: C.bgNeutralSecondary,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 6,
    height: 48,
  },
  searchIcon: { width: 20, height: 20, marginRight: 10 },
  searchLens: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: C.secondary,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchHandle: {
    width: 2,
    height: 7,
    backgroundColor: C.secondary,
    position: 'absolute',
    bottom: 1,
    right: 3,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },
  filterBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.floor0,
    borderWidth: 1,
    borderColor: 'rgba(0,45,30,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterLine1: { width: 14, height: 1.5, backgroundColor: C.secondary, borderRadius: 1, marginBottom: 3 },
  filterLine2: { width: 10, height: 1.5, backgroundColor: C.secondary, borderRadius: 1, marginBottom: 3 },
  filterLine3: { width: 6, height: 1.5, backgroundColor: C.secondary, borderRadius: 1 },
  filterDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: C.bgActionPrimary,
  },

  /* ── Categories ── */
  categoryRow: {
    paddingHorizontal: H_PAD,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 20,
  },
  categoryItem: {
    alignItems: 'center',
    width: 64,
  },
  categoryCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F2F4F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  categoryEmoji: {
    fontSize: 24,
  },

  /* ── Section header ── */
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: H_PAD,
    paddingTop: 24,
    paddingBottom: 12,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },

  /* ── Order again ── */
  orderAgainRow: {
    paddingHorizontal: H_PAD,
    gap: 12,
  },
  orderAgainCard: {
    width: 100,
    alignItems: 'center',
  },
  orderAgainImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: C.bgNeutralSecondary,
  },
  orderAgainName: {
    textAlign: 'center',
    marginTop: 6,
    width: 100,
  },

  /* ── Restaurant grid ── */
  grid: {
    paddingHorizontal: H_PAD,
    gap: ROW_GAP,
  },
  gridRow: {
    flexDirection: 'row',
    gap: COL_GAP,
  },

  /* ── Restaurant card ── */
  card: {
    width: CARD_W,
  },
  cardImgWrap: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: C.bgNeutralSecondary,
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },

  // Heart
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 18,
  },

  // Discount badge
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: C.bgDangerPrimary,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  // Rating pill
  ratingPill: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 100,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  ratingStar: {
    color: '#FFB800',
    fontSize: 11,
    lineHeight: 14,
  },

  // Card body
  cardBody: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  boltPlusDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: C.bgActionPrimary,
  },

  // Delivery info row
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Minimal bike icon built from views
  bikeIcon: {
    width: 14,
    height: 12,
    justifyContent: 'flex-end',
  },
  bikeWheel1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: C.secondary,
  },
  bikeWheel2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: C.secondary,
  },
  bikeFrame: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 8,
    height: 1.5,
    backgroundColor: C.secondary,
    borderRadius: 1,
    transform: [{ rotate: '-15deg' }],
  },
  // Minimal clock icon
  clockIcon: {
    width: 13,
    height: 13,
    marginLeft: 10,
  },
  clockFace: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    borderWidth: 1.2,
    borderColor: C.secondary,
    position: 'absolute',
    top: 1,
    left: 1,
  },
  clockHand: {
    position: 'absolute',
    top: 4,
    left: 6,
    width: 1.2,
    height: 4,
    backgroundColor: C.secondary,
    borderRadius: 1,
    transformOrigin: 'top center',
    transform: [{ rotate: '45deg' }],
  },

  /* ── Promo banner ── */
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: H_PAD,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFF5E0',
  },
  promoBannerBadge: {
    backgroundColor: C.floor0,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: C.separator,
  },

  /* ── Basket bar ── */
  basketBar: {
    position: 'absolute',
    left: H_PAD,
    right: H_PAD,
    backgroundColor: C.bgActionPrimary,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 8,
  },

  /* ── Tab bar ── */
  tabBar: {
    backgroundColor: C.floor0,
  },
  tabBarBorder: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: C.separator,
  },
  tabBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 6,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 4,
    minWidth: 56,
  },
});
