import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBasket } from '../../src/basket';
import { getRestaurant, Dish } from '../../src/data';
import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

const C = {
  floor0: '#fff',
  surface: 'rgba(0,45,30,0.07)',
  primary: '#191F1C',
  secondary: 'rgba(0,10,7,0.63)',
  tertiary: 'rgba(0,17,11,0.47)',
  actionPrimary: 'rgba(0,112,66,0.92)',
  bgNeutralPrimary: '#0E1010',
  bgNeutralSecondary: 'rgba(0,45,30,0.07)',
  bgActionPrimary: '#2B8659',
  separator: 'rgba(0,45,30,0.07)',
  primaryInverted: 'rgba(253,255,254,0.93)',
  brand: '#2B8659',
  warningPrimary: 'rgba(158,91,0,1)',
};

const fontStyles: Record<string, TextStyle> = {
  'HeadingL': { fontSize: 36, lineHeight: 44, fontWeight: '600', letterSpacing: -0.352 },
  'HeadingS': { fontSize: 24, lineHeight: 30, fontWeight: '600', letterSpacing: -0.304 },
  'HeadingXS': { fontSize: 20, lineHeight: 24, fontWeight: '600', letterSpacing: -0.272 },
  'BodyLAccent': { fontSize: 18, lineHeight: 24, fontWeight: '600', letterSpacing: -0.224 },
  'BodyMRegular': { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: -0.176 },
  'BodyMAccent': { fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: -0.176 },
  'BodySRegular': { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: -0.096 },
  'BodySAccent': { fontSize: 14, lineHeight: 20, fontWeight: '600', letterSpacing: -0.096 },
  'BodyXSAccent': { fontSize: 12, lineHeight: 16, fontWeight: '600' },
  'BodyTabularMAccent': { fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: -0.416, fontVariant: ['tabular-nums'] },
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

function DishCard({ dish, onAdd }: { dish: Dish; onAdd: () => void }) {
  return (
    <View style={styles.dishCard}>
      <View style={styles.dishInfo}>
        {dish.popular && (
          <View style={styles.popularBadge}>
            <T type="BodyXSAccent" color={C.warningPrimary}>
              ⭐ Popular
            </T>
          </View>
        )}
        <T type="BodyMAccent">{dish.name}</T>
        <T type="BodySRegular" color={C.secondary} numberOfLines={2}>
          {dish.description}
        </T>
        <T type="BodyTabularMAccent" style={{ marginTop: 4 }}>
          €{dish.price.toFixed(2)}
        </T>
      </View>
      <View style={styles.dishImageContainer}>
        <Image source={{ uri: dish.image }} style={styles.dishImage} />
        <Pressable style={styles.addButton} onPress={onAdd}>
          <T type="BodyMAccent" color={C.primaryInverted}>
            +
          </T>
        </Pressable>
      </View>
    </View>
  );
}

export default function ProviderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const basket = useBasket();

  const restaurant = getRestaurant(id);
  if (!restaurant) return null;

  const handleAddDish = useCallback(
    (dish: Dish) => {
      basket.addItem({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
      });
    },
    [basket, restaurant],
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <T type="BodyLAccent" color={C.primaryInverted}>
          ←
        </T>
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <Image source={{ uri: restaurant.image }} style={styles.heroImage} />

        {/* Restaurant Info */}
        <View style={styles.aboutSection}>
          <T type="HeadingL">{restaurant.name}</T>
          <T type="BodyMRegular" color={C.secondary} style={{ marginTop: 4 }}>
            {restaurant.cuisine}
          </T>
          <View style={styles.metaRow}>
            <T type="BodyTabularSAccent">{restaurant.rating}</T>
            <T type="BodyTabularSRegular" color={C.secondary}>
              {' '}({restaurant.reviews} reviews)
            </T>
            <T type="BodySRegular" color={C.tertiary}>
              {'  ·  '}
            </T>
            <T type="BodyTabularSRegular" color={C.secondary}>
              {restaurant.eta}
            </T>
            <T type="BodySRegular" color={C.tertiary}>
              {'  ·  '}
            </T>
            <T
              type="BodyTabularSRegular"
              color={restaurant.deliveryFee === 'Free delivery' ? C.actionPrimary : C.secondary}
            >
              {restaurant.deliveryFee}
            </T>
          </View>
        </View>

        {/* Menu Sections */}
        {restaurant.menu.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <T type="HeadingXS" style={styles.menuSectionTitle}>
              {section.title}
            </T>
            {section.dishes.map((dish) => (
              <React.Fragment key={dish.id}>
                <DishCard dish={dish} onAdd={() => handleAddDish(dish)} />
                <View style={styles.divider} />
              </React.Fragment>
            ))}
          </View>
        ))}

        <View style={{ height: 120 }} />
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
          <T type="BodyTabularSAccent" color={C.primaryInverted}>
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
  backButton: {
    position: 'absolute',
    top: 52,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: {
    width: '100%',
    height: 240,
  },
  aboutSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  menuSection: {
    paddingTop: 8,
  },
  menuSectionTitle: {
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  dishCard: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
  },
  dishInfo: {
    flex: 1,
    gap: 2,
  },
  popularBadge: {
    marginBottom: 4,
  },
  dishImageContainer: {
    position: 'relative',
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: C.bgNeutralPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: C.separator,
    marginHorizontal: 24,
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
