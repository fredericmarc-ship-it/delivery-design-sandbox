import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C, F } from './tokens';

interface Tab {
  key: string;
  label: string;
  iconActive: string;
  iconInactive: string;
}

const TABS: Tab[] = [
  { key: 'Home', label: 'Home', iconActive: 'home', iconInactive: 'home-outline' },
  { key: 'Stores', label: 'Stores', iconActive: 'basket', iconInactive: 'basket-outline' },
  { key: 'Search', label: 'Search', iconActive: 'search', iconInactive: 'search-outline' },
  { key: 'DineOut', label: 'DineOut', iconActive: 'restaurant', iconInactive: 'restaurant-outline' },
  { key: 'Account', label: 'Account', iconActive: 'person-circle', iconInactive: 'person-circle-outline' },
];

interface BottomTabBarProps {
  activeTab?: string;
  bottomInset: number;
}

export function BottomTabBar({ activeTab = 'Home', bottomInset }: BottomTabBarProps) {
  return (
    <View style={[styles.container, { paddingBottom: bottomInset }]}>
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
            <Ionicons name={iconName as any} size={24} color={color} />
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
