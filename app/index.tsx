import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBasket } from '../src/basket';
import { categories, restaurants } from '../src/data';

// ── Tokens (from CLAUDE.md) ──────────────────────────────────
// When @bolteu/rnc-react-uikit resolves, replace these with:
//   import { Colors, Text } from '@bolteu/rnc-react-uikit';
// and use <Text type="HeadingXS"> etc.
const C = {
  floor0: '#fff',
  floor0Grouped: '#EEF1F0',
  surface: 'rgba(0,45,30,0.07)',
  primary: '#191F1C',
  secondary: 'rgba(0,10,7,0.63)',
  tertiary: 'rgba(0,17,11,0.47)',
  actionPrimary: 'rgba(0,112,66,0.92)',
  promoPrimary: 'rgba(56,4,215,0.94)',
  promoSecondary: 'rgba(0,60,255,0.07)',
  bgNeutralPrimary: '#0E1010',
  bgNeutralSecondary: 'rgba(0,45,30,0.07)',
  separator: 'rgba(0,45,30,0.07)',
  primaryInverted: 'rgba(253,255,254,0.93)',
  brand: '#2B8659',
};

import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

// Minimal token-aware Text until UIKit resolves
const fontStyles: Record<string, TextStyle> = {
  'Heading2XL': { fontSize: 48, lineHeight: 56, fontWeight: '600', letterSpacing: -0.352 },
  'HeadingM': { fontSize: 28, lineHeight: 36, fontWeight: '600', letterSpacing: -0.32 },
  'HeadingXS': { fontSize: 20, lineHeight: 24, fontWeight: '600', letterSpacing: -0.272 },
  'BodyLAccent': { fontSize: 18, lineHeight: 24, fontWeight: '600', letterSpacing: -0.224 },
  'BodyMRegular': { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: -0.176 },
  'BodyMAccent': { fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: -0.176 },
  'BodySRegular': { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: -0.096 },
  'BodySAccent': { fontSize: 14, lineHeight: 20, fontWeight: '600', letterSpacing: -0.096 },
  'BodyXSAccent': { fontSize: 12, lineHeight: 16, fontWeight: '600' },
  'BodyTabularSRegular': { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: -0.336, fontVariant: ['tabular-nums'] },
  'BodyTabularSAccent': { fontSize: 14, lineHeight: 20, fontWeight: '600', letterSpacing: -0.336, fontVariant: ['tabular-nums'] },
};

function T({ type, color, style, ...props }: TextProps & { type: string; color?: string }) {
  return (
    <RNText
      style={[{ fontFamily: 'System', color: color || C.primary }, fontStyles[type], style]}
      {...props}
    />
  );
}

// ── Home Screen ──────────────────────────────────────────────

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const basket = useBasket();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const onMerchantPress = useCallback(
    (id: string) => {
      router.push(`/provider/${id}`);
    },
    [router],
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Search Bar */}
      <Pressable style={styles.searchBar}>
        <T type="BodyMRegular" color={C.tertiary}>
          Search restaurants, dishes...
        </T>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id && styles.categoryChipSelected,
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <T type="BodySRegular" style={styles.categoryIcon}>
                {cat.icon}
              </T>
              <T
                type="BodySAccent"
                color={selectedCategory === cat.id ? C.floor0 : C.primary}
              >
                {cat.label}
              </T>
            </Pressable>
          ))}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <T type="HeadingXS">Restaurants nearby</T>
        </View>

        {/* Merchant List */}
        <View style={styles.merchantList}>
          {restaurants.map((restaurant) => (
            <Pressable
              key={restaurant.id}
              style={styles.card}
              onPress={() => onMerchantPress(restaurant.id)}
            >
              <Image source={{ uri: restaurant.image }} style={styles.cardImage} />

              {restaurant.promo && (
                <View style={styles.promoBadge}>
                  <T type="BodyXSAccent" color={C.promoPrimary} style={{ textTransform: 'uppercase' }}>
                    {restaurant.promo}
                  </T>
                </View>
              )}

              <View style={styles.cardBody}>
                <T type="HeadingXS">{restaurant.name}</T>
                <T type="BodySRegular" color={C.secondary}>
                  {restaurant.cuisine}
                </T>
                <View style={styles.infoRow}>
                  <T type="BodyTabularSAccent">{restaurant.rating}</T>
                  <T type="BodyTabularSRegular" color={C.secondary}>
                    {' '}({restaurant.reviews})
                  </T>
                  <T type="BodySRegular" color={C.tertiary}>
                    {'  ·  '}
                  </T>
                  <T
                    type="BodyTabularSRegular"
                    color={
                      restaurant.deliveryFee === 'Free delivery'
                        ? C.actionPrimary
                        : C.secondary
                    }
                  >
                    {restaurant.deliveryFee}
                  </T>
                  <T type="BodySRegular" color={C.tertiary}>
                    {'  ·  '}
                  </T>
                  <T type="BodyTabularSRegular" color={C.secondary}>
                    {restaurant.eta}
                  </T>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Floating Basket Bar */}
      {basket.totalItems > 0 && (
        <Pressable
          style={[styles.basketBar, { bottom: insets.bottom + 16 }]}
          onPress={() => router.push('/checkout')}
        >
          <View style={styles.basketBarLeft}>
            <View style={styles.basketBadge}>
              <T type="BodySAccent" color={C.primaryInverted}>
                {basket.totalItems.toString()}
              </T>
            </View>
            <T type="BodyLAccent" color={C.primaryInverted}>
              View basket
            </T>
          </View>
          <T type="BodyTabularSAccent" color={C.primaryInverted} style={{ fontVariant: ['tabular-nums'] }}>
            €{basket.totalPrice.toFixed(2)}
          </T>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.floor0,
  },
  searchBar: {
    marginHorizontal: 24,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: C.bgNeutralSecondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  categoryRow: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.bgNeutralSecondary,
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
  },
  categoryChipSelected: {
    backgroundColor: C.bgNeutralPrimary,
  },
  categoryIcon: {
    fontSize: 16,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
  },
  merchantList: {
    paddingHorizontal: 24,
    gap: 16,
    paddingBottom: 120,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: C.separator,
  },
  cardImage: {
    width: '100%',
    height: 170,
  },
  promoBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: C.promoSecondary,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardBody: {
    padding: 12,
    gap: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  basketBar: {
    position: 'absolute',
    left: 24,
    right: 24,
    backgroundColor: C.bgNeutralPrimary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  basketBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  basketBadge: {
    backgroundColor: C.brand,
    borderRadius: 100,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
