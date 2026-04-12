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
const FONT_REGULAR = 'System';
const FONT_ACCENT = 'System';

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
const COL_GAP = 16;
const ROW_GAP = 24;
const CARD_W = (SW - SCREEN_PADDING_H * 2 - COL_GAP) / 2;

// Icons now come from bolticons.ttf via BoltIcon component

// StatusBarChrome removed — frame.html provides the device chrome

// ════════════════════════════════════════════════════════════════
// ── Hero Banner (top section from Figma) ─────────────────────
// ════════════════════════════════════════════════════════════════

const HERO_ILLUSTRATION = require('../assets/images/hero-illustration.png');

function HeroBanner() {
  return (
    <View style={s.hero}>
      {/* Background illustration */}
      <Image source={HERO_ILLUSTRATION} style={s.heroIllustration} contentFit="cover" />

      {/* Address selector — overlaid top-left */}
      <Pressable style={s.addressBar} accessibilityLabel="Change delivery address">
        <BoltIcon name="location-pin-filled" size={20} color={C.primary} />
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
          <BoltIcon name="arrow-circle-right" size={16} color={C.primary} />
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
        <BoltIcon name="search" size={22} color={C.secondary} />
        <T type="BodyMRegular" color={C.tertiary} style={s.searchPlaceholder}>
          Food, restaurants, stores...
        </T>
        <Pressable style={s.filterBtn} accessibilityLabel="Filters">
          <BoltIcon name="filter" size={20} color={C.secondary} />
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
        <T type="HeadingXS">{title}</T>
        {subtitle != null && (
          <T type="BodyXSRegular" color={C.secondary} style={s.sectionSubtitle}>{subtitle}</T>
        )}
      </View>
      <Pressable style={s.allBtn} accessibilityLabel={`See all ${title}`}>
        <T type="BodySAccent" color={C.primary}>All</T>
        <BoltIcon name="chevron-right" size={18} color={C.primary} />
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
}: {
  rating: string;
  reviews: string;
}) {
  const isGolden = parseFloat(rating) >= 4.6;
  return (
    <View style={s.ratingOuter}>
      <View style={[s.ratingInner, isGolden && s.ratingGolden]}>
        <BoltIcon name="star-filled" size={12} color={isGolden ? '#C89200' : C.primary} />
        <T type="BodyXSAccent" color={C.primary}>
          {rating}
        </T>
        <T type="BodyXSRegular" color={C.primary}>
          ({reviews})
        </T>
      </View>
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
      <View style={s.deliveryBlock}>
        <BoltIcon name="bicycle" size={12} color={C.secondary} />
        <T
          type="BodyXSRegular"
          color={isFree ? C.actionPrimary : C.secondary}
        >
          {feeLabel}
        </T>
        {originalFee != null && (
          <T
            type="BodyXSRegular"
            color={C.tertiary}
            style={s.deliveryOriginalFee}
          >
            {originalFee}
          </T>
        )}
      </View>
      <View style={s.deliveryBlock}>
        <BoltIcon name="clock" size={12} color={C.secondary} />
        <T type="BodyXSRegular" color={C.secondary}>
          {eta}
        </T>
      </View>
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
      {/* Image with 2:1 ratio */}
      <View style={s.cardImgWrap}>
        <Image source={{ uri: restaurant.image }} style={s.cardImg} />

        {/* Content layer — 12px margin from image edges (production L size) */}
        <View style={s.cardImgContent}>
          {/* Campaign badge — top left */}
          {restaurant.promo != null && (
            <View style={s.campaignBadge}>
              <RNText style={s.campaignText}>{restaurant.promo}</RNText>
            </View>
          )}

          {/* Heart — top right, 24px, white PNG */}
          <Pressable style={s.heart} accessibilityLabel="Save to favourites">
            <Image source={require('../assets/images/ic-heart.png')} style={s.heartIcon} />
          </Pressable>

          {/* Rating badge — bottom right */}
          <View style={s.ratingPillWrap}>
            <RatingBadge rating={restaurant.rating} reviews={restaurant.reviews} size="small" />
          </View>
        </View>
      </View>

      {/* Details below image — 8px top gap (production L size for grid) */}
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
// ── Retail Snippet (Bolt Market section from Figma) ──────────
// ════════════════════════════════════════════════════════════════

const STORE_LOGO = require('../assets/images/store-logo.png');

interface GroceryProduct {
  image: number;
  price: string;
  originalPrice?: string;
  name: string;
  unitPrice: string;
  labels?: { text: string; color: string; textColor: string }[];
}

const GROCERY_PRODUCTS: GroceryProduct[] = [
  {
    image: require('../assets/images/product-1.png'),
    price: '1,50 €', name: 'Bananas, 1 kg', unitPrice: '1,50 €/kg',
    labels: [{ text: 'New', color: '#FFB200', textColor: C.primary }],
  },
  {
    image: require('../assets/images/product-2.png'),
    price: '1,50 €', originalPrice: '3,50 €', name: 'Oddly Good Barista Oat', unitPrice: '200,78 lei/kg',
    labels: [
      { text: 'New', color: '#FFB200', textColor: C.primary },
      { text: '−25 %', color: C.bgDangerPrimary, textColor: '#fff' },
    ],
  },
  {
    image: require('../assets/images/product-3.png'),
    price: '1,50 €', name: 'Lemons, 500 g', unitPrice: '3,00 €/kg',
  },
  {
    image: require('../assets/images/product-4.png'),
    price: '1,50 €', originalPrice: '3,50 €', name: 'Greek Yogurt, 400 g', unitPrice: '3,75 €/kg',
    labels: [
      { text: 'New', color: '#FFB200', textColor: C.primary },
      { text: '−25 %', color: C.bgDangerPrimary, textColor: '#fff' },
    ],
  },
  {
    image: require('../assets/images/product-5.png'),
    price: '1,50 €', name: 'Chocolate Croissant', unitPrice: '200,78 lei/kg',
    labels: [{ text: 'Sweet', color: '#FFB200', textColor: C.primary }],
  },
];

function RetailSnippet() {
  return (
    <View style={rs.wrap}>
      {/* Store header */}
      <View style={rs.header}>
        <View style={rs.logoWrap}>
          <Image source={STORE_LOGO} style={rs.logo} />
          <View style={rs.logoOverlay} />
        </View>
        <View style={rs.headerText}>
          <T type="HeadingXS" numberOfLines={1}>Bolt Market Tulika</T>
          <View style={rs.headerMeta}>
            <BoltIcon name="bicycle" size={12} color={C.primary} />
            <T type="TabXSRegular" color={C.primary} style={{ marginLeft: 3 }}>1,50 €</T>
            <View style={rs.metaDot} />
            <BoltIcon name="clock" size={12} color={C.primary} />
            <T type="BodyXSRegular" color={C.primary} style={{ marginLeft: 3 }}>15–25 min</T>
            <View style={rs.metaDot} />
            <BoltIcon name="star-filled" size={12} color="#E8A100" />
            <T type="BodyXSRegular" color={C.primary} style={{ marginLeft: 2 }}>4.8</T>
            <T type="BodyXSRegular" color={C.primary}> (500+)</T>
          </View>
        </View>
      </View>

      {/* Product cards — horizontal scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={rs.productsRow}
      >
        {GROCERY_PRODUCTS.map((product, i) => (
          <View key={i} style={rs.productCard}>
            {/* Image block */}
            <View style={rs.imgBlock}>
              <Image source={product.image} style={rs.productImg} contentFit="cover" />
              <View style={rs.imgTint} />
              {/* Labels */}
              {product.labels != null && (
                <View style={rs.labelsWrap}>
                  {product.labels.map((label, j) => (
                    <View key={j} style={[rs.label, { backgroundColor: label.color }]}>
                      <T type="BodyXSAccent" color={label.textColor}>{label.text}</T>
                    </View>
                  ))}
                </View>
              )}
              {/* Quick-add button */}
              <Pressable style={rs.quickAdd} accessibilityLabel={`Add ${product.name}`}>
                <BoltIcon name="plus" size={20} color={C.primary} />
              </Pressable>
            </View>
            {/* Price */}
            {product.originalPrice != null ? (
              <View style={rs.priceCol}>
                <T type="BodySAccent" color={C.dangerPrimary}>{product.price}</T>
                <T type="BodyXSRegular" color={C.secondary} style={rs.strikePrice}>{product.originalPrice}</T>
              </View>
            ) : (
              <T type="BodySAccent" style={rs.priceText}>{product.price}</T>
            )}
            {/* Description */}
            <T type="BodyXSRegular" numberOfLines={2} style={rs.prodName}>{product.name}</T>
            <T type="Body2XSRegular" color={C.secondary}>{product.unitPrice}</T>
          </View>
        ))}

        {/* View more card */}
        <View style={rs.viewMoreCard}>
          <View style={rs.viewMoreCircle}>
            <BoltIcon name="chevron-right" size={24} color={C.primary} />
          </View>
          <T type="BodyXSAccent">View more</T>
        </View>
      </ScrollView>
    </View>
  );
}

const rs = StyleSheet.create({
  wrap: { paddingTop: 12 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING_H,
    gap: 12,
    height: 48,
  },
  logoWrap: {
    width: 48, height: 48,
    borderRadius: DEFAULT_BORDER_RADIUS,
    overflow: 'hidden',
  },
  logo: { width: '100%', height: '100%' },
  logoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,45,30,0.06)',
  },
  headerText: { flex: 1, gap: 4 },
  headerMeta: { flexDirection: 'row', alignItems: 'center' },
  metaDot: {
    width: 3, height: 3, borderRadius: 1.5,
    backgroundColor: C.tertiary, marginHorizontal: 6,
  },
  productsRow: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 12,
    gap: 12,
  },
  productCard: { width: 132 },
  imgBlock: {
    width: 132, height: 132,
    borderRadius: DEFAULT_BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: C.floor0,
  },
  productImg: { width: '100%', height: '100%' },
  imgTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,45,30,0.06)',
  },
  labelsWrap: {
    position: 'absolute', top: 4, left: 4, gap: 2,
  },
  label: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAdd: {
    position: 'absolute', bottom: 4, right: 4,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: C.floor0,
    borderWidth: 1, borderColor: C.separator,
    alignItems: 'center', justifyContent: 'center',
  },
  priceText: { marginTop: 4 },
  priceCol: { marginTop: 4, paddingBottom: 2 },
  strikePrice: { textDecorationLine: 'line-through' },
  prodName: { marginTop: 2 },
  viewMoreCard: {
    width: 132, height: 132,
    alignItems: 'center', justifyContent: 'center',
    gap: 8,
  },
  viewMoreCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: C.bgNeutralSecondary,
    alignItems: 'center', justifyContent: 'center',
  },
});

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
      {/* Safe area top spacer — min 54px so content clears the frame's dynamic island on web */}
      <View style={{ height: Math.max(insets.top, 54), backgroundColor: C.floor0 }} />

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

        <RetailSnippet />

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
    paddingBottom: 24,
    gap: 12,
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

  /* ── Section header (production: SectionHeader.tsx size M) ── */
  sectionHdr: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 28,
    paddingBottom: 14,
    gap: 12,
  },
  sectionHdrLeft: { flex: 1, gap: 4 },
  sectionSubtitle: {},
  allBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    gap: 4,
    marginTop: 4,
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

  /* ── Restaurant card (production: ProviderCard.tsx size M) ── */
  card: { width: CARD_W },
  cardImgWrap: {
    width: '100%',
    aspectRatio: 2,
    borderRadius: DEFAULT_BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: C.bgNeutralSecondary,
  },
  cardImg: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  cardImgContent: {
    ...StyleSheet.absoluteFillObject,
    margin: 12,
  },

  // Heart — absolute top:0 right:0 within 8px content margin, 24px
  heart: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },

  // Campaign badge — absolute top:0 left:0 within content margin
  campaignBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: C.bgDangerPrimary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
  },
  campaignText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  // Rating badge — absolute bottom:0 right:0 within content margin
  ratingPillWrap: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  ratingOuter: {
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  ratingInner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 6,
    paddingVertical: 4,
    gap: 4,
  },
  ratingGolden: {
    backgroundColor: C.bgWarningSecondary,
  },

  // Card body — 8px topGap (production L size for grid)
  cardBody: { paddingTop: 8 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: { flexShrink: 1, flexGrow: 0, minWidth: 0 },

  // Delivery info (production: DeliveryInfo.tsx size M — gap 8px, 12px icons)
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deliveryBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryOriginalFee: {
    textDecorationLine: 'line-through',
  },

  /* ── (retail snippet styles in rs StyleSheet above) ── */

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
