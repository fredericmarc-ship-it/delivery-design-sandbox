import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBasket } from '../src/basket';
import React from 'react';

import { C, SCREEN_PADDING_H } from '../src/components/tokens';
import { T } from '../src/components/Typography';
import { BoltIcon } from '../src/components/Icon';

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const basket = useBasket();

  const subtotal = basket.totalPrice;
  const delivery = basket.deliveryFee;
  const total = subtotal + delivery;

  const handlePlaceOrder = () => {
    router.replace('/tracking');
  };

  if (basket.items.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer, { paddingTop: insets.top }]}>
        <T type="HeadingXSAccent">Your basket is empty</T>
        <Pressable style={styles.backLink} onPress={() => router.back()}>
          <T type="BodyMAccent" color={C.actionPrimary}>
            Browse restaurants
          </T>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <BoltIcon name="arrow-left" size={24} color={C.primary} />
          </Pressable>
          <T type="HeadingL">Checkout</T>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <T type="BodySRegular" color={C.secondary}>
            Delivery address
          </T>
          <View style={styles.addressRow}>
            <View style={{ flex: 1 }}>
              <T type="BodyMAccent">Telliskivi 60a</T>
              <T type="BodySRegular" color={C.secondary}>
                Tallinn, 10412
              </T>
            </View>
            <Pressable>
              <T type="BodyMAccent" color={C.actionPrimary}>
                Change
              </T>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Delivery Time */}
        <View style={styles.section}>
          <T type="BodySRegular" color={C.secondary}>
            Delivery time
          </T>
          <View style={styles.addressRow}>
            <T type="BodyMAccent">As soon as possible</T>
            <T type="TabularM" color={C.secondary}>
              15–25 min
            </T>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Order Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <T type="HeadingXSAccent">{basket.restaurantName}</T>
          </View>

          {basket.items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <View style={styles.quantityBadge}>
                <T type="BodySAccent" color={C.primaryInverted}>
                  {item.quantity.toString()}
                </T>
              </View>
              <T type="BodyMRegular" style={{ flex: 1 }}>
                {item.name}
              </T>
              <T type="TabularMAccent">
                {(item.price * item.quantity).toFixed(2)} €
              </T>
            </View>
          ))}

          <Pressable style={styles.addMoreRow} onPress={() => router.back()}>
            <T type="BodyMAccent" color={C.actionPrimary}>
              + Add more items
            </T>
          </Pressable>
        </View>

        <View style={styles.sectionDivider} />

        {/* Promo Code */}
        <Pressable style={styles.section}>
          <View style={styles.addressRow}>
            <T type="BodyMRegular">Promo code</T>
            <T type="BodyMAccent" color={C.actionPrimary}>
              Add
            </T>
          </View>
        </Pressable>

        <View style={styles.sectionDivider} />

        {/* Price Breakdown */}
        <View style={styles.section}>
          <View style={styles.priceRow}>
            <T type="BodyMRegular">Subtotal</T>
            <T type="TabularM">{subtotal.toFixed(2)} €</T>
          </View>
          <View style={styles.priceRow}>
            <T type="BodyMRegular">Delivery</T>
            {delivery === 0 ? (
              <T type="TabularM" color={C.actionPrimary}>
                Free
              </T>
            ) : (
              <T type="TabularM">{delivery.toFixed(2)} €</T>
            )}
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <T type="BodyLAccent">Total</T>
            <T type="TabularLAccent">{total.toFixed(2)} €</T>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Place Order CTA */}
      <View style={[styles.ctaContainer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={styles.ctaButton} onPress={handlePlaceOrder}>
          <T type="BodyLAccent" color={C.primaryInverted}>
            Place order · {total.toFixed(2)} €
          </T>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.floor0,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  backLink: {
    padding: 8,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
  },
  section: {
    paddingHorizontal: SCREEN_PADDING_H,
    paddingVertical: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionDivider: {
    height: 8,
    backgroundColor: C.surface,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  quantityBadge: {
    backgroundColor: C.bgNeutralPrimary,
    borderRadius: 6,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMoreRow: {
    paddingTop: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: C.separator,
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SCREEN_PADDING_H,
    paddingTop: 12,
    backgroundColor: C.floor0,
    borderTopWidth: 1,
    borderTopColor: C.separator,
  },
  ctaButton: {
    backgroundColor: C.bgNeutralPrimary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
});
