import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBasket } from '../../src/basket';
import { getRestaurant, Dish } from '../../src/data';
import React from 'react';

import { C, SCREEN_PADDING_H } from '../../src/components/tokens';
import { T } from '../../src/components/Typography';
import { BoltIcon } from '../../src/components/Icon';

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
        <T type="TabularMAccent" style={{ marginTop: 4 }}>
          €{dish.price.toFixed(2)}
        </T>
      </View>
      <View style={styles.dishImageContainer}>
        <Image source={{ uri: dish.image }} style={styles.dishImage} />
        <Pressable style={styles.addButton} onPress={onAdd}>
          <BoltIcon name="plus" size={20} color={C.primaryInverted} />
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
        <BoltIcon name="arrow-left" size={24} color={C.primaryInverted} />
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
            <T type="TabularSAccent">{restaurant.rating}</T>
            <T type="TabularS" color={C.secondary}>
              {' '}({restaurant.reviews} reviews)
            </T>
            <T type="BodySRegular" color={C.tertiary}>
              {'  ·  '}
            </T>
            <T type="TabularS" color={C.secondary}>
              {restaurant.eta}
            </T>
            <T type="BodySRegular" color={C.tertiary}>
              {'  ·  '}
            </T>
            <T
              type="TabularS"
              color={restaurant.deliveryFee === 'Free delivery' ? C.actionPrimary : C.secondary}
            >
              {restaurant.deliveryFee}
            </T>
          </View>
        </View>

        {/* Menu Sections */}
        {restaurant.menu.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <T type="HeadingXSAccent" style={styles.menuSectionTitle}>
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
          <T type="TabularSAccent" color={C.primaryInverted}>
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
    paddingHorizontal: SCREEN_PADDING_H,
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
    paddingHorizontal: SCREEN_PADDING_H,
    paddingBottom: 12,
  },
  dishCard: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_PADDING_H,
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
    marginHorizontal: SCREEN_PADDING_H,
  },
  basketBar: {
    position: 'absolute',
    left: SCREEN_PADDING_H,
    right: SCREEN_PADDING_H,
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
