import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { C, F } from './tokens';

interface Tab {
  key: string;
  label: string;
  icon: ImageSourcePropType;
}

const TABS: Tab[] = [
  { key: 'Home', label: 'Home', icon: require('../../assets/images/ic-home.png') },
  { key: 'Stores', label: 'Stores', icon: require('../../assets/images/ic-groceries.png') },
  { key: 'Search', label: 'Search', icon: require('../../assets/images/ic-search.png') },
  { key: 'DineOut', label: 'DineOut', icon: require('../../assets/images/ic-dineout.png') },
  { key: 'Account', label: 'Account', icon: require('../../assets/images/ic-user.png') },
];

interface BottomTabBarProps {
  activeTab?: string;
  bottomInset: number;
}

export function BottomTabBar({ activeTab = 'Home', bottomInset }: BottomTabBarProps) {
  return (
    <View style={[styles.container, { paddingBottom: Math.max(bottomInset, 34) }]}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        const color = isActive ? C.primary : C.tertiary;

        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            accessibilityLabel={tab.label}
            accessibilityRole="tab"
          >
            <Image
              source={tab.icon}
              style={[styles.tabIcon, { tintColor: color }]}
            />
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
  tabIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
