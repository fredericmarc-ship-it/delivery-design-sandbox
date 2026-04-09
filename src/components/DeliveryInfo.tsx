import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BoltIcon } from './Icon';
import { C, F } from './tokens';

interface DeliveryInfoProps {
  deliveryFee: string;
  originalFee?: string;
  eta: string;
  size?: 'M' | 'L';
  isFree?: boolean;
}

export function DeliveryInfo({
  deliveryFee,
  originalFee,
  eta,
  size = 'M',
  isFree,
}: DeliveryInfoProps) {
  const isLarge = size === 'L';
  const iconSize = isLarge ? 16 : 12;
  const textStyle = isLarge ? F.BodySRegular : F.BodyXSRegular;
  const free = isFree || deliveryFee.toLowerCase().includes('free') || deliveryFee === '0,00 \u20AC';

  return (
    <View style={[styles.container, { gap: isLarge ? 12 : 8 }]}>
      {/* Delivery fee */}
      <View style={styles.block}>
        <BoltIcon
          name="bicycle"
          size={iconSize}
          color={free ? C.actionPrimary : C.secondary}
        />
        <Text
          style={[
            textStyle,
            styles.text,
            free && styles.freeText,
          ]}
          accessibilityLabel={`Delivery fee ${deliveryFee}`}
        >
          {deliveryFee}
        </Text>
        {originalFee != null && (
          <Text style={[textStyle, styles.text, styles.strikethrough]}>
            {originalFee}
          </Text>
        )}
      </View>

      {/* ETA */}
      <View style={styles.block}>
        <BoltIcon
          name="timer-outlined"
          size={iconSize}
          color={C.secondary}
        />
        <Text
          style={[textStyle, styles.text]}
          accessibilityLabel={`Estimated delivery ${eta}`}
        >
          {eta}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: C.secondary,
    marginLeft: 4,
  },
  freeText: {
    color: C.actionPrimary,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
});
