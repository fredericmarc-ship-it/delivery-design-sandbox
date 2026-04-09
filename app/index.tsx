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
import Svg, { Path, Circle as SvgCircle, Rect, Line } from 'react-native-svg';

import { useBasket } from '../src/basket';
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
  bgWarningSecondary: 'rgba(255,190,0,0.23)',
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

// ════════════════════════════════════════════════════════════════
// ── SVG Icons ─────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function IconPin({ size = 24, color = C.primary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill={color}
      />
      <SvgCircle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
    </Svg>
  );
}

function IconSearch({ size = 24, color = C.primary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <SvgCircle cx="11" cy="11" r="6" stroke={color} strokeWidth="2.2" />
      <Line x1="16" y1="16" x2="21" y2="21" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </Svg>
  );
}

function IconFilter({ size = 24, color = C.primary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="6" x2="20" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="7" y1="12" x2="17" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="10" y1="18" x2="14" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

function IconStar({ size = 12, color = '#E8A100' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </Svg>
  );
}

function IconHeart({ size = 14, color = C.primary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function IconBicycle({ size = 14, color = C.secondary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <SvgCircle cx="5.5" cy="17.5" r="3.5" stroke={color} strokeWidth="1.8" />
      <SvgCircle cx="18.5" cy="17.5" r="3.5" stroke={color} strokeWidth="1.8" />
      <Path d="M15 6h2l3 11.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5.5 17.5L9 8h5l2 4H9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IconClock({ size = 14, color = C.secondary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <SvgCircle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
      <Path d="M12 7v5l3 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IconChevronRight({ size = 16, color = C.primary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 5l7 7-7 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// Tab bar icons
function IconHome({ size = 24, filled = false, color = C.primary }: { size?: number; filled?: boolean; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {filled ? (
        <Path d="M3 12l2-2V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10l2 2 1.4-1.4L12 1 1.6 10.6 3 12z" fill={color} />
      ) : (
        <Path d="M3 12l2-2m0 0V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10m-14 0l7-7 7 7m0 0l2 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </Svg>
  );
}

function IconBasket({ size = 24, color = C.tertiary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.8" />
      <Path d="M16 10a4 4 0 01-8 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function IconSearchTab({ size = 24, color = C.tertiary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <SvgCircle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.8" />
      <Line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

function IconStore({ size = 24, color = C.tertiary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 21V10l1.5-7h15L21 10v11" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3 10c0 1.66 1.34 3 3 3s3-1.34 3-3m0 0c0 1.66 1.34 3 3 3s3-1.34 3-3m0 0c0 1.66 1.34 3 3 3s3-1.34 3-3" stroke={color} strokeWidth="1.8" />
      <Rect x="9" y="15" width="6" height="6" rx="1" stroke={color} strokeWidth="1.8" />
    </Svg>
  );
}

function IconAccount({ size = 24, color = C.tertiary }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <SvgCircle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
      <SvgCircle cx="12" cy="10" r="3" stroke={color} strokeWidth="1.8" />
      <Path d="M6.17 18.35A7 7 0 0112 15a7 7 0 015.83 3.35" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

// ════════════════════════════════════════════════════════════════
// ── iPhone Status Bar Chrome ─────────────────────────────────
// ════════════════════════════════════════════════════════════════

function StatusBarChrome() {
  return (
    <View style={sb.bar}>
      <View style={sb.left}>
        <RNText style={sb.time}>15:31</RNText>
      </View>
      <View style={sb.island} />
      <View style={sb.right}>
        <View style={sb.signal}>
          <View style={[sb.dot, sb.dotFilled]} />
          <View style={[sb.dot, sb.dotFilled]} />
          <View style={[sb.dot, sb.dotEmpty]} />
          <View style={[sb.dot, sb.dotEmpty]} />
        </View>
        <View style={sb.wifi}>
          <View style={sb.wifiArc3} />
          <View style={sb.wifiArc2} />
          <View style={sb.wifiDot} />
        </View>
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
  signal: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  dot: { width: 4, height: 4, borderRadius: 2 },
  dotFilled: { backgroundColor: C.primary },
  dotEmpty: { backgroundColor: 'rgba(0,0,0,0.2)' },
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
// ── Address Bar ──────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function AddressBar() {
  return (
    <Pressable style={s.addressBar} accessibilityLabel="Change delivery address">
      <IconPin size={24} color={C.primary} />
      <View style={s.addressText}>
        <T type="BodyMAccent">Veerenni Tänav 24/1</T>
        <T type="BodyXSRegular" color={C.secondary}>Tallinn</T>
      </View>
    </Pressable>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Search Bar ───────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

function SearchBar() {
  return (
    <View style={s.searchBar}>
      <IconSearch size={22} color={C.tertiary} />
      <T type="BodyMRegular" color={C.tertiary} style={s.searchPlaceholder}>
        Food, restaurants, stores...
      </T>
      <Pressable style={s.filterBtn} accessibilityLabel="Filters">
        <IconFilter size={20} color={C.primary} />
      </Pressable>
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
        <IconChevronRight size={16} color={C.primary} />
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
      <IconStar size={11} color="#E8A100" />
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
      <IconBicycle size={14} color={C.secondary} />
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
      <IconClock size={14} color={C.secondary} />
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
          <IconHeart size={14} color={C.primary} />
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

function PromoBanner() {
  return (
    <View style={s.promoBanner}>
      <View style={s.promoContent}>
        <T type="BodyMAccent" color="#FFFFFF">Get a Red Bull for a chance to win!</T>
        <T type="BodyXSRegular" color="rgba(255,255,255,0.8)" style={s.promoDesc}>
          Add a Red Bull to your meal and enter automatically to win 100 EUR of Red Bull shop credit
        </T>
      </View>
      <View style={s.promoCta}>
        <T type="BodySAccent" color={C.primary}>See offers</T>
      </View>
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

// ════════════════════════════════════════════════════════════════
// ── Bottom Tab Bar ───────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

const TAB_ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'stores', label: 'Stores' },
  { key: 'search', label: 'Search' },
  { key: 'dineout', label: 'DineOut' },
  { key: 'account', label: 'Account' },
] as const;

function TabIcon({ tabKey, active }: { tabKey: string; active: boolean }) {
  const color = active ? C.primary : C.tertiary;
  switch (tabKey) {
    case 'home':
      return <IconHome size={24} filled={active} color={color} />;
    case 'stores':
      return <IconStore size={24} color={color} />;
    case 'search':
      return <IconSearchTab size={24} color={color} />;
    case 'dineout':
      return <IconStore size={24} color={color} />;
    case 'account':
      return <IconAccount size={24} color={color} />;
    default:
      return null;
  }
}

function BottomTabBar({ activeTab, bottomInset }: { activeTab: string; bottomInset: number }) {
  return (
    <View style={[s.tabBar, { paddingBottom: Math.max(bottomInset, 8) }]}>
      <View style={s.tabBorder} />
      <View style={s.tabInner}>
        {TAB_ITEMS.map((t) => {
          const isActive = t.key === activeTab;
          return (
            <Pressable key={t.key} style={s.tab} accessibilityLabel={t.label}>
              <TabIcon tabKey={t.key} active={isActive} />
              <T
                type="Body2XSRegular"
                color={isActive ? C.primary : C.tertiary}
                style={s.tabLabel}
              >
                {t.label}
              </T>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

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
      <StatusBarChrome />

      {/* Sticky header */}
      <AddressBar />
      <SearchBar />

      {/* Scrollable content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s.scrollContent}
      >
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

      <BottomTabBar activeTab="home" bottomInset={insets.bottom} />
    </View>
  );
}

// ════════════════════════════════════════════════════════════════
// ── Styles ───────────────────────────────────────────────────
// ════════════════════════════════════════════════════════════════

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.floor0 },
  scrollContent: { paddingBottom: 140 },

  /* ── Address bar ── */
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 4,
    paddingBottom: 8,
    gap: 10,
  },
  addressText: { flex: 1 },

  /* ── Search bar ── */
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_PADDING_H,
    marginBottom: 4,
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
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SCREEN_PADDING_H,
    marginTop: 28,
    padding: 16,
    borderRadius: DEFAULT_BORDER_RADIUS,
    backgroundColor: '#003366',
    gap: 12,
  },
  promoContent: { flex: 1 },
  promoDesc: { marginTop: 4 },
  promoCta: {
    backgroundColor: '#C8E6FF',
    borderRadius: DEFAULT_BORDER_RADIUS,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

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

  /* ── Tab bar ── */
  tabBar: { backgroundColor: C.floor0 },
  tabBorder: { height: StyleSheet.hairlineWidth, backgroundColor: C.separator },
  tabInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 6,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 4,
    minWidth: 56,
  },
  tabLabel: { marginTop: 2 },
});
