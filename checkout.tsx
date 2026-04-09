import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useBasket } from '../src/basket';
import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

const C = {
  floor0: '#fff',
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
  dangerPrimary: 'rgba(173,0,14,0.94)',
};

const fontStyles: Record<string, TextStyle> = {
  'HeadingL': { fontSize: 36, lineHeight: 44, fontWeight: '600', letterSpacing: -0.352 },
  'HeadingXS': { fontSize: 20, lineHeight: 24, fontWeight: '600', letterSpacing: -0.272 },
  'BodyLAccent': { fontSize: 18, lineHeight: 24, fontWeight: '600', letterSpacing: -0.224 },
  'BodyMRegular': { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: -0.176 },
  'BodyMAccent': { fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: -0.176 },
  'BodySRegular': { fontSize: 14, lineHeight: 20, fontWeight: '400', letterSpacing: -0.096 },
  'BodyTabularLAccent': { fontSize: 18, lineHeight: 24, fontWeight: '600', letterSpacing: -0.464, fontVariant: ['tabular-nums'] },
  'BodyTabularMRegular': { fontSize: 16, lineHeight: 24, fontWeight: '400', letterSpacing: -0.416, fontVariant: ['tabular-nums'] },
  'BodyTabularMAccent': { fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: -0.416, fontVariant: ['tabular-nums'] },
};

function T({ type, color, style, ...props }: TextProps & { type: string; color?: string }) {
  return (
    <RNText
      style={[{ fontFamily: 'System', color: color || C.primary }, fontStyles[type], style]}
      {...props}
    />
  );
}

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
        <T type="HeadingXS">Your basket is empty</T>
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
            <T type="BodyLAccent">←</T>
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
            <T type="BodyTabularMRegular" color={C.secondary}>
              15–25 min
            </T>
          </View>
        </View>

        <View style={styles.sectionDivider} />

        {/* Order Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <T type="HeadingXS">{basket.restaurantName}</T>
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
              <T type="BodyTabularMAccent">
                €{(item.price * item.quantity).toFixed(2)}
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
            <T type="BodyTabularMRegular">€{subtotal.toFixed(2)}</T>
          </View>
          <View style={styles.priceRow}>
            <T type="BodyMRegular">Delivery</T>
            {delivery === 0 ? (
              <T type="BodyTabularMRegular" color={C.actionPrimary}>
                Free
              </T>
            ) : (
              <T type="BodyTabularMRegular">€{delivery.toFixed(2)}</T>
            )}
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <T type="BodyLAccent">Total</T>
            <T type="BodyTabularLAccent">€{total.toFixed(2)}</T>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Place Order CTA */}
      <View style={[styles.ctaContainer, { paddingBottom: insets.bottom + 16 }]}>
        <Pressable style={styles.ctaButton} onPress={handlePlaceOrder}>
          <T type="BodyLAccent" color={C.primaryInverted}>
            Place order · €{total.toFixed(2)}
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
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 20,
    gap: 12,
  },
  section: {
    paddingHorizontal: 24,
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
    paddingHorizontal: 24,
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
