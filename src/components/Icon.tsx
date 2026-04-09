import React from 'react';
import { Ionicons } from '@expo/vector-icons';

/**
 * Maps Bolt's @bolteu/kalep-react-icons names to Ionicons equivalents.
 * Usage: <BoltIcon name="bicycle" size={16} color={C.secondary} />
 */
const ICON_MAP: Record<string, string> = {
  'home': 'home',
  'home-outlined': 'home-outline',
  'search': 'search',
  'groceries-outlined': 'basket-outline',
  'receipt-outlined': 'receipt-outline',
  'user-alt-outlined': 'person-circle-outline',
  'user-alt': 'person-circle',
  'heart': 'heart',
  'heart-outlined': 'heart-outline',
  'bicycle': 'bicycle-outline',
  'timer-outlined': 'time-outline',
  'star-filled': 'star',
  'pin': 'location',
  'chevron-right': 'chevron-forward',
  'chevron-left': 'chevron-back',
  'close': 'close',
  'info': 'information-circle-outline',
  'search-extra': 'options-outline',
};

interface BoltIconProps {
  name: string;
  size?: number;
  color?: string;
}

export function BoltIcon({ name, size = 24, color = '#191F1C' }: BoltIconProps) {
  const ionName = ICON_MAP[name] ?? name;
  return (
    <Ionicons
      name={ionName as any}
      size={size}
      color={color}
      accessibilityLabel={name}
    />
  );
}
