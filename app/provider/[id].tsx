import { useCallback } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBasket } from '../../src/basket';
import { getRestaurant, Dish } from '../../src/data';
import React from 'react';

import { C, SCREEN_PADDING_H, DEFAULT_BORDER_RADIUS } from '../../src/components/tokens';
import { T } from '../../src/components/Typography';
import { BoltIcon } from '../../src/components/Icon';

// ── Constants (from production constants.ts) ─────────────────
const SW = Dimensions.get('window').width;
const HERO_HEIGHT = Math.round(SW * 10 / 21);
const STICKY_HEADER_HEIGHT = 56;
const FLOATING_BUTTON_HEIGHT = 56;
const FLOATING_BUTTON_PADDING_BOTTOM = 12;
const INFO_BORDER_RADIUS = 16;
const DISH_IMAGE_WIDTH = 120;
const DISH_IMAGE_HEIGHT = 90;

// ════════════════════════════════════════════════════════════════
// ── Dish Card (from DishRow.tsx) ─────────────────────────────
// ════════════════════════════════════════════════════════════════

function DishCard({
  dish,
  quantity,
  onAdd,
}: {
  dish: Dish;
  quantity: number;
  onAdd: () => void;
}) {
  return (
    <View style={ds.row}>
      {/* Green accent bar when item is in basket */}
      {quantity > 0 && <View style={ds.amountIndicator} />}

      <Pressable style={ds.pressable} onPress={onAdd} accessibilityLabel={dish.name}>
        {/* Details — left side */}
        <View style={ds.details}>
          {dish.popular && (
            <View style={ds.tagRow}>
              <View style={ds.popularTag}>
                <T type="BodyXSAccent" color={C.dangerPrimary}>Popular</T>
              </View>
            </View>
          )}
          <T type="BodyMAccent" numberOfLines={2}>{dish.name}</T>
          {dish.description ? (
            <T type="BodySRegular" color={C.secondary} numberOfLines={2} style={ds.desc}>
              {dish.description}
            </T>
          ) : null}
          <T type="BodySAccent" style={ds.price}>{dish.price.toFixed(2)} €</T>
        </View>

        {/* Image — right side, 120x90 */}
        <View style={ds.imageWrap}>
          <Image source={{ uri: dish.image }} style={ds.image} contentFit="cover" />
          <View style={ds.imageTint} />
          {/* Quick-add button */}
          <Pressable style={ds.addBtn} onPress={onAdd} accessibilityLabel={`Add ${dish.name}`}>
            <BoltIcon name="plus" size={20} color={C.primaryInverted} />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const ds = StyleSheet.create({
  row: {
    position: 'relative',
  },
  amountIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: C.bgActionPrimary,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: SCREEN_PADDING_H,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: C.floor0,
  },
  details: {
    flex: 1,
  },
  tagRow: {
    marginBottom: 4,
  },
  popularTag: {
    alignSelf: 'flex-start',
  },
  desc: {
    marginTop: 4,
  },
  price: {
    marginTop: 4,
  },
  imageWrap: {
    width: DISH_IMAGE_WIDTH,
    height: DISH_IMAGE_HEIGHT,
    borderRadius: DEFAULT_BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: C.bgNeutralSecondary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,45,30,0.06)',
  },
  addBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: C.bgNeutralPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ════════════════════════════════════════════════════════════════
// ── Provider Detail Screen ───────────────────────────────────
// ════════════════════════════════════════════════════════════════

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

  const isFreeDelivery =
    restaurant.deliveryFee === 'Free delivery' ||
    restaurant.deliveryFee === '0,00 €';

  return (
    <View style={ps.container}>
      {/* Back button — floats above hero */}
      <Pressable
        style={[ps.backBtn, { top: Math.max(insets.top, 54) + 8 }]}
        onPress={() => router.back()}
        accessibilityLabel="Go back"
      >
        <BoltIcon name="arrow-left" size={24} color={C.primaryInverted} />
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image — dynamic height */}
        <View style={ps.heroWrap}>
          <Image source={{ uri: restaurant.image }} style={ps.heroImg} contentFit="cover" />
          {/* Top gradient overlay */}
          <View style={ps.heroGradient} />
        </View>

        {/* Provider info — overlaps hero with rounded top */}
        <View style={ps.infoSection}>
          <T type="HeadingS">{restaurant.name}</T>
          <T type="BodyMRegular" color={C.secondary} style={{ marginTop: 4 }}>
            {restaurant.cuisine}
          </T>

          {/* Rating + Delivery + ETA row */}
          <View style={ps.metaRow}>
            <View style={ps.metaBlock}>
              <BoltIcon name="star-filled" size={12} color="#C89200" />
              <T type="BodyXSAccent">{restaurant.rating}</T>
              <T type="BodyXSRegular" color={C.secondary}>({restaurant.reviews})</T>
            </View>
            <View style={ps.metaBlock}>
              <BoltIcon name="bicycle" size={12} color={C.secondary} />
              <T type="BodyXSRegular" color={isFreeDelivery ? C.actionPrimary : C.secondary}>
                {isFreeDelivery ? '0,00 €' : restaurant.deliveryFee}
              </T>
            </View>
            <View style={ps.metaBlock}>
              <BoltIcon name="clock" size={12} color={C.secondary} />
              <T type="BodyXSRegular" color={C.secondary}>{restaurant.eta}</T>
            </View>
          </View>
        </View>

        {/* Menu sections */}
        {restaurant.menu.map((section) => (
          <View key={section.title}>
            <T type="HeadingS" style={ps.sectionTitle}>{section.title}</T>
            {section.dishes.map((dish, i) => (
              <React.Fragment key={dish.id}>
                <DishCard
                  dish={dish}
                  quantity={0}
                  onAdd={() => handleAddDish(dish)}
                />
                {i < section.dishes.length - 1 && <View style={ps.divider} />}
              </React.Fragment>
            ))}
          </View>
        ))}

        {/* Bottom spacer for basket button */}
        <View style={{ height: FLOATING_BUTTON_HEIGHT + FLOATING_BUTTON_PADDING_BOTTOM * 2 + 40 }} />
      </ScrollView>

      {/* Floating basket button */}
      {basket.totalItems > 0 && (
        <Pressable
          style={[ps.basketBtn, { bottom: Math.max(insets.bottom, 8) + FLOATING_BUTTON_PADDING_BOTTOM }]}
          onPress={() => router.push('/checkout')}
          accessibilityLabel="View basket"
        >
          <View style={ps.basketLeft}>
            <View style={ps.basketBadge}>
              <T type="BodySAccent" color={C.primaryInverted}>{basket.totalItems.toString()}</T>
            </View>
            <T type="BodyLAccent" color={C.primaryInverted}>View basket</T>
          </View>
          <T type="BodyLAccent" color={C.primaryInverted}>
            {basket.totalPrice.toFixed(2)} €
          </T>
        </Pressable>
      )}
    </View>
  );
}

const ps = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.floor0,
  },

  // Back button
  backBtn: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Hero image
  heroWrap: {
    width: '100%',
    height: HERO_HEIGHT,
    backgroundColor: C.bgNeutralSecondary,
  },
  heroImg: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  // Info section — overlaps hero with rounded top
  infoSection: {
    backgroundColor: C.floor0,
    borderTopLeftRadius: INFO_BORDER_RADIUS,
    borderTopRightRadius: INFO_BORDER_RADIUS,
    marginTop: -INFO_BORDER_RADIUS,
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 20,
    paddingBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  metaBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  // Menu sections
  sectionTitle: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 24,
    paddingBottom: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: C.separator,
    marginHorizontal: SCREEN_PADDING_H,
  },

  // Floating basket button
  basketBtn: {
    position: 'absolute',
    left: SCREEN_PADDING_H,
    right: SCREEN_PADDING_H,
    height: FLOATING_BUTTON_HEIGHT,
    backgroundColor: C.bgNeutralPrimary,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  basketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  basketBadge: {
    backgroundColor: C.bgActionPrimary,
    borderRadius: 100,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
