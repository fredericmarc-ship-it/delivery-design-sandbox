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
import { BoltIcon } from '../src/components/Icon';
import {
  categories,
  orderAgain,
  restaurants,
  moreRestaurants,
  Restaurant,
} from '../src/data';

// ── Design Tokens (from CLAUDE.md) ───────────────────────────────
const C = {
  floor0: '#FFFFFF',
  floor0Grouped: '#EEF1F0',
  surface: 'rgba(0,45,30,0.07)',
  primary: '#191F1C',
  secondary: 'rgba(0,10,7,0.63)',
  tertiary: 'rgba(0,17,11,0.47)',
  actionPrimary: 'rgba(0,112,66,0.92)',
  dangerPrimary: '#DE1929',
  bgNeutralSecondary: 'rgba(0,45,30,0.07)',
  bgActionPrimary: '#2B8659',
  bgActiveActionPrimary: '#18784C',
  bgNeutralPrimary: '#0E1010',
  bgDangerPrimary: '#DE1929',
  bgWarningSecondary: '#FFF0C4',
  bgPromoSecondary: 'rgba(0,60,255,0.07)',
  separator: 'rgba(0,45,30,0.07)',
  primaryInverted: 'rgba(253,255,254,0.93)',
  secondaryInverted: 'rgba(244,254,249,0.69)',
  promoPrimary: 'rgba(56,4,215,0.94)',
  brandAlt: '#0C2C1C',
};

// ── Dimensions ───────────────────────────────────────────────────
const SCREEN_PADDING_H = 24;
const DEFAULT_BORDER_RADIUS = 8;

// ── Typography ───────────────────────────────────────────────────
const FONT_REGULAR = Platform.select({ web: 'InterVariable', default: 'System' });
const FONT_ACCENT = Platform.select({ web: 'InterVariable', default: 'System' });

const F: Record<string, TextStyle> = {
  HeadingL:     { fontSize: 36, lineHeight: 44, fontWeight: '650' as any, letterSpacing: -0.792 },
  HeadingM:     { fontSize: 28, lineHeight: 36, fontWeight: '650' as any, letterSpacing: -0.56 },
  HeadingS:     { fontSize: 24, lineHeight: 30, fontWeight: '650' as any, letterSpacing: -0.456 },
  HeadingXS:    { fontSize: 20, lineHeight: 25, fontWeight: '650' as any, letterSpacing: -0.34 },
  BodyLRegular: { fontSize: 18, lineHeight: 24, fontWeight: '450' as any, letterSpacing: -0.252 },
  BodyLAccent:  { fontSize: 18, lineHeight: 24, fontWeight: '650' as any, letterSpacing: -0.252 },
  BodyMRegular: { fontSize: 16, lineHeight: 24, fontWeight: '450' as any, letterSpacing: -0.176 },
  BodyMAccent:  { fontSize: 16, lineHeight: 24, fontWeight: '650' as any, letterSpacing: -0.176 },
  BodySRegular: { fontSize: 14, lineHeight: 20, fontWeight: '450' as any, letterSpacing: -0.084 },
  BodySAccent:  { fontSize: 14, lineHeight: 20, fontWeight: '650' as any, letterSpacing: -0.084 },
  BodyXSRegular:  { fontSize: 12, lineHeight: 16, fontWeight: '450' as any, letterSpacing: 0 },
  BodyXSAccent:   { fontSize: 12, lineHeight: 16, fontWeight: '650' as any, letterSpacing: 0 },
  Body2XSRegular: { fontSize: 10, lineHeight: 14, fontWeight: '450' as any, letterSpacing: 0.1 },
  Body2XSAccent:  { fontSize: 10, lineHeight: 14, fontWeight: '650' as any, letterSpacing: 0.1 },
  CapsS:          { fontSize: 11, lineHeight: 14, fontWeight: '650' as any, letterSpacing: 0.88, textTransform: 'uppercase' as any },
  TabLAccent:   { fontSize: 18, lineHeight: 24, fontWeight: '650' as any, letterSpacing: -0.522, fontVariant: ['tabular-nums'] },
  TabMRegular:  { fontSize: 16, lineHeight: 24, fontWeight: '450' as any, letterSpacing: -0.416, fontVariant: ['tabular-nums'] },
  TabMAccent:   { fontSize: 16, lineHeight: 24, fontWeight: '650' as any, letterSpacing: -0.416, fontVariant: ['tabular-nums'] },
  TabSRegular:  { fontSize: 14, lineHeight: 20, fontWeight: '450' as any, letterSpacing: -0.294, fontVariant: ['tabular-nums'] },
  TabSAccent:   { fontSize: 14, lineHeight: 20, fontWeight: '650' as any, letterSpacing: -0.294, fontVariant: ['tabular-nums'] },
  TabXSAccent:  { fontSize: 12, lineHeight: 16, fontWeight: '650' as any, letterSpacing: -0.18, fontVariant: ['tabular-nums'] },
  TabXSRegular: { fontSize: 12, lineHeight: 16, fontWeight: '450' as any, letterSpacing: -0.18, fontVariant: ['tabular-nums'] },
};

function T({ type, color, style, ...rest }: TextProps & { type: string; color?: string }) {
  return <RNText style={[{ color: color ?? C.primary }, F[type], style]} {...rest} />;
}

// ── Layout constants ─────────────────────────────────────────────
const SW = Dimensions.get('window').width;
const COL_GAP = 12;
const ROW_GAP = 16;
const CARD_W = (SW - SCREEN_PADDING_H * 2 - COL_GAP) / 2;

// Icons now come from bolticons.ttf via BoltIcon component

// StatusBarChrome removed — frame.html provides the device chrome

// ════════════════════════════════════════════════════════════════
// ── Hero Banner (top section from Figma) ─────────────────────
// ════════════════════════════════════════════════════════════════

const HERO_ILLUSTRATION = 'https://www.figma.com/api/mcp/asset/b4c99fc2-10da-4bc5-aee1-2990f72679b2';

function HeroBanner() {
  return (
    <View style={s.hero}>
      {/* Background illustration */}
      <Image source={{ uri: HERO_ILLUSTRATION }} style={s.heroIllustration} contentFit="cover" />

      {/* Address selector — overlaid top-left */}
      <Pressable style={s.addressBar} accessibilityLabel="Change delivery address">
        <BoltIcon name="pin-filled" size={20} color={C.primary} />
        <View style={s.addressText}>
          <T type="BodySAccent">Rotermanni 6</T>
          <T type="BodyXSRegular" color={C.secondary}>Tallinn, Estonia</T>
        </View>
      </Pressable>

      {/* Promo text — bottom-left */}
      <View style={s.heroPromo}>
        <T type="HeadingS">Free delivery{'\n'}with Bolt Plus</T>
        <Pressable style={s.heroAction} accessibilityLabel="Join Bolt Plus">
          <T type="BodySAccent">Join now</T>
          <BoltIcon name="chevron-right" size={16} color={C.primary} />
        </Pressable>
      </View>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Search Bar ───────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function SearchBar() {
  return (
    <View style={s.searchBarWrap}>
      <View style={s.searchBar}>
        <BoltIcon name="search" size={22} color={C.tertiary} />
        <T type="BodyMRegular" color={C.tertiary} style={s.searchPlaceholder}>
          Food, restaurants, stores...
        </T>
        <Pressable style={s.filterBtn} accessibilityLabel="Filters">
          <BoltIcon name="filter" size={20} color={C.primary} />
        </Pressable>
      </View>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Category Row ─────────────────────────────────────────────
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
          <T type="BodyXSRegular" style={s.catLabel}>{c.label}</T>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Section Header ───────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={s.sectionHdr}>
      <View style={s.sectionHdrLeft}>
        <T type="HeadingS">{title}</T>
        {subtitle != null && (
          <T type="BodyXSRegular" color={C.secondary} style={s.sectionSubtitle}>{subtitle}</T>
        )}
      </View>
      <Pressable style={s.allBtn} accessibilityLabel={`See all ${title}`}>
        <T type="BodySRegular" color={C.primary}>All</T>
        <BoltIcon name="chevron-right" size={16} color={C.primary} />
      </Pressable>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Bolt Plus Badge ──────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function BoltPlusBadge({ size = 16 }: { size?: number }) {
  return (
    <View style={[s.bpBadge, { width: size, height: size, borderRadius: 4 }]}>
      <RNText style={[s.bpPlus, { fontSize: size - 4, lineHeight: size - 2 }]}>+</RNText>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Rating Badge ─────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function RatingBadge({
  rating,
  reviews,
  size = 'small',
}: {
  rating: string;
  reviews: string;
  size?: 'small' | 'large';
}) {
  return (
    <View style={s.ratingBadge}>
      <BoltIcon name="star-filled" size={11} color="#E8A100" />
      <T type="TabXSAccent" color={C.primary} style={s.ratingValue}>
        {rating}
      </T>
      <T type="TabXSRegular" color={C.secondary}>
        ({reviews})
      </T>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Delivery Info ────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function DeliveryInfo({
  deliveryFee,
  originalFee,
  eta,
}: {
  deliveryFee: string;
  originalFee?: string;
  eta: string;
}) {
  const isFree =
    deliveryFee === 'Free delivery' ||
    deliveryFee === '0,00 €' ||
    deliveryFee === '€0.00';
  const feeLabel = isFree ? '0,00 €' : deliveryFee;

  return (
    <View style={s.deliveryRow}>
      <BoltIcon name="bicycle" size={14} color={C.secondary} />
      <T
        type="TabXSRegular"
        color={isFree ? C.actionPrimary : C.secondary}
        style={s.deliveryFeeText}
      >
        {feeLabel}
      </T>
      {originalFee != null && (
        <T
          type="TabXSRegular"
          color={C.tertiary}
          style={s.deliveryOriginalFee}
        >
          {originalFee}
        </T>
      )}
      <View style={s.deliveryDot} />
      <BoltIcon name="clock" size={14} color={C.secondary} />
      <T type="TabXSRegular" color={C.secondary} style={s.deliveryEtaText}>
        {eta}
      </T>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Order Again Row ──────────────────────────────────────────
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
            {item.boltPlus && <BoltPlusBadge size={14} />}
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Restaurant Card ──────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function RestaurantCard({ restaurant, onPress }: { restaurant: Restaurant; onPress: () => void }) {
  return (
    <Pressable style={s.card} onPress={onPress} accessibilityLabel={restaurant.name}>
      <View style={s.cardImgWrap}>
        <Image source={{ uri: restaurant.image }} style={s.cardImg} />

        {/* Heart icon - top right, white circle */}
        <View style={s.heart}>
          <BoltIcon name="heart" size={14} color={C.primary} />
        </View>

        {/* Campaign badge - top left, red */}
        {restaurant.promo != null && (
          <View style={s.campaignBadge}>
            <RNText style={s.campaignText}>{restaurant.promo}</RNText>
          </View>
        )}

        {/* Rating badge - bottom right, yellow bg */}
        <View style={s.ratingPillWrap}>
          <RatingBadge rating={restaurant.rating} reviews={restaurant.reviews} size="small" />
        </View>
      </View>

      {/* Card body below image */}
      <View style={s.cardBody}>
        <View style={s.nameRow}>
          <T type="BodyMAccent" numberOfLines={1} style={s.nameText}>
            {restaurant.name}
          </T>
          {restaurant.boltPlus && <BoltPlusBadge size={16} />}
        </View>
        <DeliveryInfo
          deliveryFee={restaurant.deliveryFee}
          originalFee={restaurant.originalFee}
          eta={restaurant.eta}
        />
      </View>
    </Pressable>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Restaurant Grid ──────────────────────────────────────────
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
          {row.length === 1 && <View style={s.gridSpacer} />}
        </View>
      ))}
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Promo Banner ─────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

const GROCERY_ITEMS = [
  { image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=200&h=200&fit=crop', discount: '-30%', price: '1,93 €' },
  { image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop', discount: '-20%', price: '1,40 €' },
  { image: 'https://images.unsplash.com/photo-1622485831930-6e9e5b13ae40?w=200&h=200&fit=crop', discount: '-25%', price: '2,39 €' },
];

function PromoBanner() {
  return (
    <View style={s.promoWrap}>
      <View style={s.promoHeader}>
        <T type="BodyMAccent" color={C.primary}>Full cart, happy wallet</T>
        <View style={s.promoBoltMarket}>
          <T type="BodyXSAccent" color={C.primary}>Bolt Market</T>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.promoItemsRow}
      >
        {GROCERY_ITEMS.map((item, i) => (
          <View key={i} style={s.promoItem}>
            <View style={s.promoItemImgWrap}>
              <Image source={{ uri: item.image }} style={s.promoItemImg} />
              <View style={s.promoDiscount}>
                <RNText style={s.promoDiscountText}>{item.discount}</RNText>
              </View>
            </View>
            <T type="TabXSAccent" color={C.primary} style={s.promoItemPrice}>{item.price}</T>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Basket Bar ───────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function BasketBar({
  restaurantName,
  totalPrice,
  onPress,
  bottomOffset,
}: {
  restaurantName: string | null;
  totalPrice: number;
  onPress: () => void;
  bottomOffset: number;
}) {
  return (
    <Pressable
      style={[s.basketBar, { bottom: bottomOffset }]}
      onPress={onPress}
      accessibilityLabel="View basket"
    >
      <T type="BodyMAccent" color={C.primaryInverted} numberOfLines={1} style={s.basketName}>
        {restaurantName ?? 'Your order'}
      </T>
      <T type="TabSRegular" color={C.primaryInverted}>
        {totalPrice.toFixed(2)} €
      </T>
    </Pressable>
  );
}

// Bottom tab bar imported from shared components
import { BottomTabBar } from '../src/components/BottomTabBar';

// ════════════════════════════════════════════════════════════════
// ── Home Screen ──────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const basket = useBasket();

  const go = useCallback((id: string) => router.push(`/provider/${id}`), [router]);

  // Curated sections from mock data
  const boltPlus = [moreRestaurants[7], moreRestaurants[8], moreRestaurants[3], moreRestaurants[1]];
  const spotlight = [moreRestaurants[4], moreRestaurants[2], restaurants[1], moreRestaurants[0]];
  const groceries = [moreRestaurants[5], moreRestaurants[6], restaurants[2], restaurants[0]];
  const recommended = [moreRestaurants[3], moreRestaurants[4], restaurants[0], moreRestaurants[2]];

  const tabBarHeight = 56 + Math.max(insets.bottom, 8);
  const basketBottom = tabBarHeight + 12;

  return (
    <View style={s.root}>
      {/* Safe area top spacer */}
      <View style={{ height: insets.top, backgroundColor: C.floor0 }} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
        <HeroBanner />
        <SearchBar />
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
        <BasketBar
          restaurantName={basket.restaurantName}
          totalPrice={basket.totalPrice}
          onPress={() => router.push('/checkout')}
          bottomOffset={basketBottom}
        />
      )}

      <BottomTabBar activeTab="Home" bottomInset={insets.bottom} />
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Styles ───────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.floor0 },
  scrollContent: { paddingBottom: 140 },

  /* ── Hero banner ── */
  hero: {
    height: 288,
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  heroIllustration: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  addressBar: {
    position: 'absolute',
    top: 54,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING_H,
    gap: 8,
  },
  addressText: {},
  heroPromo: {
    paddingHorizontal: SCREEN_PADDING_H,
    gap: 8,
  },
  heroAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  /* ── Search bar ── */
  searchBarWrap: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bgNeutralSecondary,
    borderRadius: DEFAULT_BORDER_RADIUS,
    paddingLeft: 12,
    paddingRight: 8,
    height: 48,
    gap: 10,
  },
  searchPlaceholder: { flex: 1 },
  filterBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── Categories ── */
  catRow: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 16,
  },
  catItem: { alignItems: 'center', width: 72 },
  catCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F2F4F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  catEmoji: { fontSize: 30 },
  catLabel: { textAlign: 'center' },

  /* ── Section header ── */
  sectionHdr: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 28,
    paddingBottom: 14,
  },
  sectionHdrLeft: { flex: 1 },
  sectionSubtitle: { marginTop: 2 },
  allBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  /* ── Bolt Plus badge ── */
  bpBadge: {
    backgroundColor: C.bgActionPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  bpPlus: { color: '#fff', fontWeight: '800', marginTop: -1 },

  /* ── Order again ── */
  oaRow: { paddingHorizontal: SCREEN_PADDING_H, gap: 12 },
  oaCard: { width: 86, alignItems: 'center' },
  oaImgWrap: {
    width: 86,
    height: 86,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: C.bgNeutralSecondary,
  },
  oaImg: { width: '100%', height: '100%' },
  oaPromoBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: C.bgDangerPrimary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  oaPromoText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  oaNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    flexWrap: 'wrap',
  },
  oaName: { textAlign: 'center' },

  /* ── Restaurant grid ── */
  grid: { paddingHorizontal: SCREEN_PADDING_H, gap: ROW_GAP },
  gridRow: { flexDirection: 'row', gap: COL_GAP },
  gridSpacer: { width: CARD_W },

  /* ── Restaurant card ── */
  card: { width: CARD_W },
  cardImgWrap: {
    width: '100%',
    aspectRatio: 2,
    borderRadius: DEFAULT_BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: C.bgNeutralSecondary,
  },
  cardImg: { width: '100%', height: '100%' },

  // Heart icon - white circle, top right
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Campaign badge - red, top left
  campaignBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: C.bgDangerPrimary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  campaignText: { color: '#fff', fontSize: 12, fontWeight: '800' },

  // Rating badge wrap - positioned bottom right of image
  ratingPillWrap: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bgWarningSecondary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    gap: 3,
  },
  ratingValue: { marginLeft: 1 },

  // Card body
  cardBody: { paddingTop: 4, paddingBottom: 4 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  nameText: { flexShrink: 1 },

  // Delivery info row
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryFeeText: { marginLeft: 3 },
  deliveryOriginalFee: {
    marginLeft: 4,
    textDecorationLine: 'line-through',
  },
  deliveryDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: C.tertiary,
    marginHorizontal: 6,
  },
  deliveryEtaText: { marginLeft: 3 },

  /* ── Promo banner ── */
  promoWrap: {
    marginHorizontal: SCREEN_PADDING_H,
    marginTop: 28,
    backgroundColor: '#F2F4F3',
    borderRadius: DEFAULT_BORDER_RADIUS,
    paddingTop: 16,
    paddingBottom: 12,
    overflow: 'hidden',
  },
  promoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  promoBoltMarket: {
    backgroundColor: C.bgNeutralSecondary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  promoItemsRow: {
    paddingHorizontal: 16,
    gap: 12,
  },
  promoItem: {
    width: 96,
    alignItems: 'center',
  },
  promoItemImgWrap: {
    width: 96,
    height: 96,
    borderRadius: DEFAULT_BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: C.floor0,
  },
  promoItemImg: { width: '100%', height: '100%' },
  promoDiscount: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: C.bgDangerPrimary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  promoDiscountText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  promoItemPrice: { marginTop: 4 },

  /* ── Basket bar ── */
  basketBar: {
    position: 'absolute',
    left: SCREEN_PADDING_H,
    right: SCREEN_PADDING_H,
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
  basketName: { flex: 1 },

  /* Tab bar styles are in BottomTabBar component */
});
