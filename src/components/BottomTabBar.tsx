import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BoltIcon } from './Icon';
import { C, F } from './tokens';

interface Tab {
  key: string;
  label: string;
  iconActive: string;
  iconInactive: string;
}

const TABS: Tab[] = [
  { key: 'Home', label: 'Home', iconActive: 'home-filled', iconInactive: 'home' },
  { key: 'Stores', label: 'Stores', iconActive: 'basket-filled', iconInactive: 'basket' },
  { key: 'Search', label: 'Search', iconActive: 'search-filled', iconInactive: 'search' },
  { key: 'DineOut', label: 'DineOut', iconActive: 'order-filled', iconInactive: 'order' },
  { key: 'Account', label: 'Account', iconActive: 'user-filled', iconInactive: 'user' },
];

interface BottomTabBarProps {
  activeTab?: string;
  bottomInset: number;
}

export function BottomTabBar({ activeTab = 'Home', bottomInset }: BottomTabBarProps) {
  return (
    <View style={[styles.container, { paddingBottom: Math.max(bottomInset, 8) }]}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        const color = isActive ? C.primary : C.tertiary;
        const iconName = isActive ? tab.iconActive : tab.iconInactive;

        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            accessibilityLabel={tab.label}
            accessibilityRole="tab"
          >
            <BoltIcon name={iconName} size={24} color={color} />
            <Text style={[F.BodyXSRegular, { color, marginTop: 2 }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    backgroundColor: C.floor2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: C.separator,
    paddingTop: 8,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    flex: 1,
  },
});
