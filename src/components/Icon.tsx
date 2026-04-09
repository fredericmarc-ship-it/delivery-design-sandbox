import React from 'react';
import { Text, StyleSheet } from 'react-native';

/**
 * Real Bolt icons from bolticons.ttf (extracted from food-delivery-eater-app).
 * Font must be loaded via expo-font in _layout.tsx.
 *
 * Usage: <BoltIcon name="bicycle" size={16} color={C.secondary} />
 */

const GLYPHS: Record<string, number> = {
  'arrow-left': 0xe932,
  'arrow-right': 0xe934,
  'basket': 0xe9eb,
  'basket-filled': 0xe9ea,
  'bell': 0xe936,
  'bicycle': 0xe97b,
  'calendar': 0xe99b,
  'call': 0xe93e,
  'check': 0xe94c,
  'chevron-down': 0xe975,
  'chevron-left': 0xe94e,
  'chevron-right': 0xe950,
  'chevron-up': 0xe974,
  'clock': 0xe956,
  'close': 0xe958,
  'discount': 0xe9e3,
  'edit': 0xe95c,
  'filter': 0xe962,
  'heart': 0xe968,
  'heart-filled': 0xe967,
  'help': 0xe96a,
  'home': 0xe96c,
  'home-filled': 0xe96b,
  'info': 0xe970,
  'location-pin': 0xe972,
  'minus': 0xe977,
  'offer': 0xe984,
  'order': 0xe97a,
  'order-filled': 0xe97e,
  'pickup': 0xe9e5,
  'pin': 0xe98a,
  'pin-filled': 0xe989,
  'plus': 0xe98c,
  'search': 0xe927,
  'search-filled': 0xe992,
  'setting': 0xe928,
  'share': 0xe921,
  'shopping-bag': 0xe929,
  'shopping-bag-filled': 0xe994,
  'star': 0xe92a,
  'star-filled': 0xe995,
  'store': 0xe9e4,
  'trash': 0xe92c,
  'user': 0xe92e,
  'user-filled': 0xe999,
  'wallet': 0xe90b,
};

interface BoltIconProps {
  name: string;
  size?: number;
  color?: string;
}

export function BoltIcon({ name, size = 24, color = '#191F1C' }: BoltIconProps) {
  const code = GLYPHS[name];
  if (code == null) {
    // Fallback: render name as text for debugging
    return <Text style={{ fontSize: size * 0.5, color }}>{name}</Text>;
  }
  return (
    <Text
      style={[styles.icon, { fontSize: size, lineHeight: size, color }]}
      accessibilityLabel={name}
    >
      {String.fromCharCode(code)}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'bolticons',
    textAlign: 'center',
  },
});
